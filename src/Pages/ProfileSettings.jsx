import React, { useEffect, useState } from 'react';
import MUITextField from '../components/MUITextField';
import SimpleMUIButton from '../components/SimpleMUIButton';
import { Link } from 'react-router-dom';
import { getProfileInfo, updateUserProfileInfo } from '../apis/UserProfileApi';
import { getCentralStoreData } from '../components/MainContext';
import { toast,Zoom } from 'react-toastify';
import MUIProgress from '../components/MUIProgress';
import PhoneInput from 'react-phone-input-2';

const ProfileSettings = () =>{
    const[errorState,setErrorState] = useState(false);
    const[userProfileInfo,setUserProfileInfo] = useState({
        first_name:'',
        last_name:'',
        phone:'',
        age: '',
        email: '',
        country_code: ''
    });
    const{navigate,isLoggedIn,getShortName,loadingState,setLoadingState} = getCentralStoreData();
    // const senseProfileChange = (event) =>{
    //     const name = event.target.name;
    //     const val = event.target.value;
    //     setUserProfileInfo((prevVal)=>{
    //         return{
    //             ...prevVal,
    //             [name] : val
    //         };
    //     });
    // }
    
    const senseProfileChange = (event, countryData) =>{
        if (event && event.target) {
            const name = event.target.name;
            const val = event.target.value;
            setUserProfileInfo((prevVal)=>{
                return{
                    ...prevVal,
                    [name] : val
                };
            });
        }
        else{
            const phone = event.replace(countryData.dialCode, ''); // Remove country code to get the actual phone number
            const country_code = countryData.dialCode; // Get country dial code (like +92)
            setUserProfileInfo((prevVal) => ({
                ...prevVal,
                phone: phone,
                country_code: `+${country_code}`
            }));
        }
    }
    const updateUserProfile = async(updatedUserData) =>{
        try{
            const resp = await updateUserProfileInfo(updatedUserData);
            if(resp){
                const{success,message,data} = resp;
                if(success && message === '' && data.user){
                    const{first_name,last_name} = data.user;
                    //creatingUserName
                    const userName = first_name.charAt(0)+"."+last_name;
                    //updating userName in local storage
                    const authUserSpecs = JSON.parse(localStorage.getItem('authUserSpecs'));
                    authUserSpecs.usrName = userName;
                    localStorage.setItem('authUserSpecs',JSON.stringify(authUserSpecs));

                    toast.success('User profile successfully updated!',{transition:Zoom});
                    navigate('/eventBazaar/account');
                }
                else{
                    toast.error(message);
                }
            }
        }
        catch(error){
            console.log(`Error occured at updateUserProfilefunc at profile settings comp. Error: ${error.message}`);
        }
    }
    const submitPersonalInfo = (event) =>{
        event.preventDefault();
        if(userProfileInfo.first_name === '' ||
            userProfileInfo.last_name === '' ||
            userProfileInfo.phone === '' ||
            userProfileInfo.age === '' ||
            userProfileInfo.email === '' )
        {
            toast.error('Please fill out the required fields!');
        }
        else{
            console.log(userProfileInfo);
            // api contact here
            updateUserProfile(userProfileInfo);
        }
    }
    const getUserProfileInfo = async() =>{
        try{
            setLoadingState(true);
            const resp = await getProfileInfo();
            if(resp){
                if(resp.success && resp.message === ''){
                    //destructuring requiredData
                    const{first_name,last_name,phone,age,email,country_code} = resp.data.user;
                    //now setting this data to textfields
                    setUserProfileInfo({
                        first_name: first_name,
                        last_name: last_name,
                        phone: phone,
                        age: age,
                        email: email,
                        country_code: country_code
                    });
                    console.log(resp);

                }
            }
        }
        catch(error){
            console.log(`Error occured at apihandlerfunc at profile settings comp. Error: ${error.message}`);
            setErrorState(true);
        }
        finally{
            setLoadingState(false);
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
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_error_ocurred.svg" className='emptySvg'/>
                                </div>
                                <p className='text-center themeColor'>An Error Occured at our end please refresh page or try again later!</p>
                            </>
                        ) : (
                            loadingState ? (
                                <section className="eventViewSec">
                                    <div className="container">
                                        <div className='w-100 text-center p-5'>
                                            <MUIProgress/>
                                        </div>
                                    </div>
                                </section>
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
                                            val={userProfileInfo.first_name}
                                            name='first_name'
                                            changeEvent = {senseProfileChange}
                                            />
                                        </div>
                                        <div className='col-md-6 col-12'>
                                            <MUITextField 
                                            type='text'
                                            label='Last Name'
                                            val={userProfileInfo.last_name}
                                            name='last_name'
                                            changeEvent = {senseProfileChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 col-12 pe-0'>
                                            {/* <MUITextField 
                                            type='text'
                                            label='Contact Number'
                                            val={userProfileInfo.phone}
                                            name='phone'
                                            changeEvent = {senseProfileChange}
                                            /> */}
                                            <PhoneInput 
                                            value={`${userProfileInfo.country_code}${userProfileInfo.phone}`}
                                            onChange={senseProfileChange}
                                            containerStyle={{padding:'8px'}}
                                            inputStyle={{width:'100%',height:'56px'}}
                                            country={'pk'}
                                            name='phone'
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
                        )
                    }
                </div>
            </section>
        </>
    );
}
export default ProfileSettings;

