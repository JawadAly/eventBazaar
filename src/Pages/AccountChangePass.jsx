import React, { useState,useEffect } from 'react';
import MUIPasswordField from '../components/MUIPasswordField';
import SimpleMUIButton from '../components/SimpleMUIButton';
import { Link } from 'react-router-dom';
import { getCentralStoreData } from '../components/MainContext';
import { toast,Zoom} from 'react-toastify';
import {userChangePass} from '../apis/UserProfileApi';

const AccountChangePass = () =>{
    const[userPasswords,setUserPasswords] = useState({
        old_password : '',
        password : '',
        confirm_password : ''
    });
    const{isLoggedIn,navigate,getShortName} = getCentralStoreData();
    const sensePassChanges = (event) =>{
        const name = event.target.name;
        const val = event.target.value;
        setUserPasswords((prevVal)=>{
            return{
                ...prevVal,
                [name] : val
            };
        });
    }
    const performPassChange = async (changePassData) =>{
        try{
            const resp = await userChangePass(changePassData);
            if(resp.success && resp.data.user && resp.message === ""){
                const{data} = resp;
                // creating userName
                const userName = data.user.first_name.charAt(0)+"."+data.user.last_name;
                //overriding old token with new one in local storage to keep session continued..
                const authUserSpecs = JSON.parse(localStorage.getItem('authUserSpecs'));
                if(authUserSpecs){
                    authUserSpecs.authToken = data.user.auth_token;
                    //updating authToken
                    localStorage.setItem('authUserSpecs',JSON.stringify(authUserSpecs))
                }
                toast.success(`Congrats! ${userName} your account password has been changed!`,{transition:Zoom});
                //empty text fields
                setUserPasswords({
                    old_password : '',
                    password : '',
                    confirm_password : ''
                });
                navigate('/eventBazaar/account');
            }
            else{
                toast.error(message);
            }
        }
        catch(error){
            console.log(`Error occured at apihandlerfunc at changepass comp. Error: ${error.message}`);
        }
    }
    const submitPassChange = (event) =>{
        event.preventDefault();
        if(userPasswords.old_password === '' ||
        userPasswords.password === '' ||
        userPasswords.confirm_password === ''
        ){
            toast.error('Please fill out the required fields!');
        }
        else{
            if(userPasswords.password !== userPasswords.confirm_password){
                toast.error('You provided passwords dont match!');
            }
            else{
                // perform pass change here
                performPassChange(userPasswords);
            }
        }
    }
    
    useEffect(()=>{
        if(!isLoggedIn()){
            toast.error('You must be logged in in-order to continue!');
            navigate('/eventBazaar/login');   
            return;
        }
    },[isLoggedIn()]);
    return(
        <>
            <section className='accountChangePassSection'>
                <div className='container pb-5'>
                    <div className='editArea p-3 pe-4 mt-4'>
                        <div className='settingsHeader d-flex align-items-center justify-content-between'>
                            <h3 className='editProfileHeading'>Update Password</h3>
                            <div className='userEditProfileInitialsHolder d-flex align-items-center justify-content-center'>
                                <h2 className='editProfileUserInitials themeColor'>{isLoggedIn() && getShortName()}</h2>
                            </div>
                        </div>
                        <hr/>
                        <form onSubmit={submitPassChange}>
                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <MUIPasswordField
                                        label='Current Password'
                                        val={userPasswords.old_password}
                                        name='old_password'
                                        changeEvent={sensePassChanges}
                                    />
                                </div>
                                <div className='col-md-6 col-12'>
                                    <MUIPasswordField
                                        label='New Password'
                                        val={userPasswords.password}
                                        name='password'
                                        changeEvent={sensePassChanges}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <MUIPasswordField
                                        label='Confirm Password'
                                        val={userPasswords.confirm_password}
                                        name='confirm_password'
                                        changeEvent={sensePassChanges}
                                    />
                                    {userPasswords.password != userPasswords.confirm_password ? <span className='ps-2 themeColor'>Passwords dont match!</span>: null}
                                </div>
                            </div>
                            <div className='btnsFlexer mt-3 w-25 d-flex ms-2'>
                                <div>
                                    <SimpleMUIButton type='submit' variant='contained' content='Update'/>
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
export default AccountChangePass;