import React, { useState } from 'react';
import MUIPasswordField from '../components/MUIPasswordField';
import SimpleMUIButton from '../components/SimpleMUIButton';
import { Link } from 'react-router-dom';

const AccountChangePass = () =>{
    const[userPasswords,setUserPasswords] = useState({
        currentPass : '',
        newPass : '',
        confirmPass : ''
    });
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
    const submitPassChange = (event) =>{
        event.preventDefault();
        console.log(userPasswords);
    }
    return(
        <>
            <section className='accountChangePassSection'>
                <div className='container pb-5'>
                    <div className='editArea p-3 pe-4 mt-4'>
                        <div className='settingsHeader d-flex align-items-center justify-content-between'>
                            <h3 className='editProfileHeading'>Update Password</h3>
                            <div className='userEditProfileInitialsHolder d-flex align-items-center justify-content-center'>
                                <h2 className='editProfileUserInitials themeColor'>JS</h2>
                            </div>
                        </div>
                        <hr/>
                        <form onSubmit={submitPassChange}>
                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <MUIPasswordField
                                        label='Current Password'
                                        val={userPasswords.currentPass}
                                        name='currentPass'
                                        changeEvent={sensePassChanges}
                                    />
                                </div>
                                <div className='col-md-6 col-12'>
                                    <MUIPasswordField
                                        label='New Password'
                                        val={userPasswords.newPass}
                                        name='newPass'
                                        changeEvent={sensePassChanges}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <MUIPasswordField
                                        label='Confirm Password'
                                        val={userPasswords.confirmPass}
                                        name='confirmPass'
                                        changeEvent={sensePassChanges}
                                    />
                                    {userPasswords.newPass != userPasswords.confirmPass ? <span className='ps-2 themeColor'>Passwords dont match!</span>: null}
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