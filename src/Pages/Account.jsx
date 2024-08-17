import React, { useState } from 'react';
import LockResetIcon from '@mui/icons-material/LockReset';
import IOSSwitch from '../components/IOSswitch';
import { ArrowNextIcon } from '../components/Socials';
import { Link } from 'react-router-dom';

const Account = () =>{
    const[profileState,setProfileState] = useState(false);
    const[notificationState,setNotificationState] = useState(true);
    const changeProfileType = () =>{
        setProfileState(!profileState);
    }
    const changeNotificationsState = () =>{
        setNotificationState(!notificationState);
    }
    return(
        <>
            <section className='accountSection'>
                <div className='container'>
                    <div className='headingPart d-flex align-items-center justify-content-between mt-4'>
                        <h3 className='accountHeading'>Account</h3>
                        <button className='btn rounded-pill signOutBtn'>Sign out</button>
                    </div>
                    <hr/>
                    <div className='personalInfoSection pb-5'>
                        <div className='upperInfoContainer'>
                            <div className='userImgHolder'></div>
                            <h4 className='userAccName text-center mt-2 mb-0'>Jawad S</h4>
                            <p className='userAccEmail'>jawad@gmail.com</p>
                        </div>
                        <div className='lowerInfoContainer'>
                            <h3 className='personalInfoHeading mt-4'>Personal Information</h3>
                            <p className='personalInfoStatement'>Manage your personal information ,including phone numbers and email address where you can be contacted.</p>
                            <div className='profileOptionsHolder p-1'>
                                <div className='profileOption p-4'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h5>Change Password</h5>
                                        <LockResetIcon className='themeColor' fontSize='large'/>
                                    </div>
                                    <p className='themeColor'>**********</p>
                                </div>
                                <div className='profileOption p-4'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h5>Switch to lister mode</h5>
                                        <IOSSwitch passedFunc = {changeProfileType}/>
                                    </div>
                                    <p className='themeColor'>Current Mode: {profileState ? 'Lister' : 'User'}</p>
                                </div>
                                <div className='profileOption p-4'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h5>Notifications</h5>
                                        <IOSSwitch checked={notificationState ? true : false} passedFunc = {changeNotificationsState}/>
                                    </div>
                                    <p className='themeColor'>Current Notifications State: {notificationState ? 'On' : 'Off'}</p>
                                </div>
                                <Link to='/eventBazaar/termsandconds' className='text-decoration-none'>
                                    <div className='profileOption p-4 d-flex align-items-center justify-content-between'>
                                        {/* <div className='d-flex align-items-center justify-content-between'> */}
                                            <h5 className='text-dark'>Terms and Conditions</h5>
                                            <ArrowNextIcon font='large'/>    
                                        {/* </div> */}
                                    </div>
                                </Link>
                                <Link to='/eventBazaar/privacypolicy' className='text-decoration-none'>
                                    <div className='profileOption p-4 d-flex align-items-center justify-content-between'>
                                        {/* <div className='d-flex align-items-center justify-content-between'> */}
                                            <h5 className='text-dark'>PrivacyPolicy</h5>
                                            <ArrowNextIcon font='large'/>    
                                        {/* </div> */}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Account;