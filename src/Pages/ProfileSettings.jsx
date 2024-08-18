import React, { useState } from 'react';
import MUITextField from '../components/MUITextField';
import SimpleMUIButton from '../components/SimpleMUIButton';
import { Link } from 'react-router-dom';

const ProfileSettings = () =>{
    const[userProfileInfo,setUserProfileInfo] = useState({
        firstName:'',
        lastName:'',
        contactNum:'',
        age: '',
        email: ''
    });
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
    return(
        <>
            <section className='profileSettingsSection'>
                <div className='container pb-5'>
                    <div className='editArea p-3 pe-4 mt-4'>
                        <div className='settingsHeader d-flex align-items-center justify-content-between'>
                            <h3 className='editProfileHeading'>Edit Profile</h3>
                            <div className='userEditProfileInitialsHolder d-flex align-items-center justify-content-center'>
                                <h2 className='editProfileUserInitials themeColor'>JS</h2>
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
                </div>
            </section>
        </>
    );
}
export default ProfileSettings;