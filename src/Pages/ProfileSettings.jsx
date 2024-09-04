import React, { useEffect, useState } from 'react';
import MUITextField from '../components/MUITextField';
import SimpleMUIButton from '../components/SimpleMUIButton';
import { Link } from 'react-router-dom';
import { getProfileInfo } from '../apis/UserProfileApi';
import { getCentralStoreData } from '../components/MainContext';
import { toast } from 'react-toastify';

const ProfileSettings = () =>{
    const[errorState,setErrorState] = useState(false);
    const[userProfileInfo,setUserProfileInfo] = useState({
        firstName:'',
        lastName:'',
        contactNum:'',
        age: '',
        email: ''
    });
    const{navigate,isLoggedIn,getShortName} = getCentralStoreData();
    const senseProfileChange = (event) =>{
        const name = event.target.name;
        const val = event.target.value;
        setUserProfileInfo((prevVal)=>{
            return{
                ...prevVal,
                [name] : val
            };
        });
    }
    const submitPersonalInfo = (event) =>{
        event.preventDefault();
        console.log(userProfileInfo);
    }
    const getUserProfileInfo = async() =>{
        try{
            const resp = await getProfileInfo();
            if(resp){
                if(resp.success && resp.message === ''){
                    //destructuring requiredData
                    const{first_name,last_name,phone,age,email} = resp.data.user;
                    //now setting this data to textfields
                    setUserProfileInfo({
                        firstName: first_name,
                        lastName: last_name,
                        contactNum: 0+phone,
                        age: age,
                        email: email
                    });
                    // console.log(resp);

                }
            }
        }
        catch(error){
            console.log(`Error occured at apihandlerfunc at profile settings comp. Error: ${error.message}`);
            setErrorState(true);
        }
    }
    useEffect(()=>{
        if(!isLoggedIn()){
            toast.error('You must be logged in in-order to continue!');
            navigate('/eventBazaar/login');   
            return;
        }
        getUserProfileInfo();
    },[isLoggedIn()]);
    return(
        <>
            <section className='profileSettingsSection'>
                <div className='container pb-5'>
                    {
                        errorState ? (
                            <>
                                <div className='errorSvgHolder pt-4'> 
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                </div>
                                <p className='text-center themeColor'>An Error Occured at our end please refresh page or try again later!</p>
                            </>
                        ) : (
                            <div className='editArea p-3 pe-4 mt-4'>
                                <div className='settingsHeader d-flex align-items-center justify-content-between'>
                                    <h3 className='editProfileHeading'>Edit Profile</h3>
                                    <div className='userEditProfileInitialsHolder d-flex align-items-center justify-content-center'>
                                        <h2 className='editProfileUserInitials themeColor'>{isLoggedIn() && getShortName()}</h2>
                                    </div>
                                </div>
                                <hr/>
                                <form onSubmit={submitPersonalInfo}>
                                    <div className='row'>
                                        <div className='col-md-6 col-12'>
                                            <MUITextField 
                                            type='text'
                                            label='First Name'
                                            val={userProfileInfo.firstName}
                                            name='firstName'
                                            changeEvent = {senseProfileChange}
                                            />
                                        </div>
                                        <div className='col-md-6 col-12'>
                                            <MUITextField 
                                            type='text'
                                            label='Last Name'
                                            val={userProfileInfo.lastName}
                                            name='lastName'
                                            changeEvent = {senseProfileChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 col-12'>
                                            <MUITextField 
                                            type='text'
                                            label='Contact Number'
                                            val={userProfileInfo.contactNum}
                                            name='contactNum'
                                            changeEvent = {senseProfileChange}
                                            />
                                        </div>
                                        <div className='col-md-6 col-12'>
                                            <MUITextField 
                                            type='number'
                                            label='Age'
                                            val={userProfileInfo.age}
                                            name='age'
                                            changeEvent = {senseProfileChange}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className='row'>
                                        <div className='col'>
                                            <MUITextField 
                                            type='email'
                                            label='Email'
                                            readonly={true}
                                            val={userProfileInfo.email}
                                            name='email'
                                            changeEvent = {senseProfileChange}
                                            // focusFunc = {()=> }
                                            />
                                        </div>
                                    </div>
                                    <div className='btnsFlexer mt-2 w-25 d-flex ms-2'>
                                        <div>
                                            <SimpleMUIButton type='submit' variant='contained' content='Save'/>
                                        </div>
                                        <div className='ms-3'>
                                            <Link to='/eventBazaar/account'>
                                                <SimpleMUIButton variant='contained' content='Back'/>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
}
export default ProfileSettings;