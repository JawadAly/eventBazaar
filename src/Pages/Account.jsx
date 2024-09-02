import React, { useEffect, useState } from 'react';
import LockResetIcon from '@mui/icons-material/LockReset';
import IOSSwitch from '../components/IOSswitch';
import { ArrowNextIcon, BkMarkIcon, ProfileIcon } from '../components/Socials';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link,useNavigate } from 'react-router-dom';
import { getCentralStoreData } from '../components/MainContext';
import { toast,Zoom} from 'react-toastify';

const Account = () =>{
    const[profileState,setProfileState] = useState(false);
    // const[notificationState,setNotificationState] = useState(true);
    const{isLoggedIn,notificationState,setNotificationState,signout,getShortName,getLoggedInPerson} = getCentralStoreData();
    const changeProfileType = () =>{
        setProfileState(!profileState);
        toast.success(profileState ? 'Lister Mode turned off!' : 'Lister Mode turned on!',{
            transition:Zoom
        });
    }
    const changeNotificationsState = () =>{
        setNotificationState(!notificationState);
        toast.success(notificationState ? 'Notifications turned off!' : 'Notifications turned on!',{
            transition:Zoom
        });
    }
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn()){
            toast.error('You must be logged in in-order to continue!');
            navigate('/eventBazaar/login');   
            return;
        }
    },[isLoggedIn()]);
    return(
        <>
            <section className='accountSection'>
                <div className='container'>
                    <div className='headingPart d-flex align-items-center justify-content-between mt-4 flex-wrap'>
                        <h3 className='accountHeading'>Account</h3>
                        <div className='accountBtnsArea'>
                            {profileState && <Link to='/eventBazaar/addEvent'><button className='btn rounded-pill signOutBtn me-2'>Add Event</button></Link>}
                            <button 
                            className='btn rounded-pill signOutBtn'
                            onClick={()=>{
                                signout();
                            }}
                            >Sign out</button>
                        </div>
                    </div>
                    <hr/>
                    <div className='personalInfoSection pb-5'>
                        <div className='upperInfoContainer'>
                            <div className='userInitialsHolder d-flex align-items-center justify-content-center'>
                                <h1 className='userInitials'>{isLoggedIn() && getShortName()}</h1>
                            </div>
                            <h4 className='userAccName text-center mt-2 mb-0'>{getLoggedInPerson()}</h4>
                            {/* <p className='userAccEmail'>jawad@gmail.com</p> */}
                        </div>
                        <div className='lowerInfoContainer'>
                            <h3 className='personalInfoHeading mt-4'>Personal Information</h3>
                            <p className='personalInfoStatement'>Manage your personal information ,including phone numbers and email address where you can be contacted.</p>
                            <div className='profileOptionsHolder p-1'>
                                <Link to='/eventBazaar/changepassword' className='text-decoration-none'>
                                    <div className='profileOption p-4'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h5 className='text-dark'>Change Password</h5>
                                            <LockResetIcon className='themeColor' fontSize='large'/>
                                        </div>
                                        <p className='themeColor'>**********</p>
                                    </div>
                                </Link>
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
                                <Link to='/eventBazaar/profilesettings' className='text-decoration-none'>
                                    <div className='profileOption p-4'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h5 className='text-dark'>Profile Settings</h5>
                                            <ManageAccountsIcon className='themeColor' fontSize='large'/>
                                        </div>
                                        <p className='themeColor'>Options to edit your profile</p>
                                    </div>
                                </Link>
                                <Link to='/eventBazaar/savedEvents' className='text-decoration-none'>
                                    <div className='profileOption p-4 d-flex align-items-center justify-content-between'>
                                        {/* <div className='d-flex align-items-center justify-content-between'> */}
                                            <h5 className='text-dark'>Saved Events</h5>
                                            <BkMarkIcon font='large'/>    
                                        {/* </div> */}
                                    </div>
                                </Link>
                                {
                                    profileState && 
                                    (<Link to='/eventBazaar/myevents' className='text-decoration-none'>
                                        <div className='profileOption p-4 d-flex align-items-center justify-content-between'>
                                            {/* <div className='d-flex align-items-center justify-content-between'> */}
                                                <h5 className='text-dark'>My Events</h5>
                                                <ProfileIcon font='large' colorClass='themeColor'/>    
                                            {/* </div> */}
                                        </div>
                                   </Link>)
                                }
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