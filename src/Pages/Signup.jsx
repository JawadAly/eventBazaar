import React, { useState } from 'react';
import MUIPasswordField from '../components/MUIPasswordField';
import MUITextField from '../components/MUITextField';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const Signup = () =>{
    const[registerData,setRegisterData] = useState({
        firstName:'',
        lastName:'',
        age:'',
        phone:'',
        email:'',
        password:'',
        confirmPassword:'',
        termsCondsCheck:false
    });
    const senseChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setRegisterData((prevVal)=>{
            return {
                ...prevVal,
                [name] : value
            };
        });
        
    }
    const submitRegisterData = (e) =>{
        e.preventDefault();
        // if(loginData.userEmail === '' || loginData.userPass === ''){
        //     alert('Please fill out the required fields');
        // }
        // else{
        //     console.log(loginData.userEmail,loginData.userPass);
        // }
        console.log(registerData);
    }
    return(
        <>
            <section className='loginSection'>
                <div className='container'>
                    <div className='flexer d-flex align-items-center justify-content-center'>
                        <div className='loginCard'>
                            <div className='circle'>
                                <h3 className='text-white circleText'>Event Bazaar</h3>
                            </div>
                            <div className='formSection p-2'>
                                <form onSubmit={submitRegisterData} className='w-100 d-flex justify-content-center flex-column p-3'>
                                    <MUITextField 
                                    val={registerData.firstName}
                                    changeEvent={senseChange}
                                    name='firstName'
                                    type='text'
                                    label='First Name'
                                    startAdornmentIcon={PersonIcon}
                                     />
                                     <MUITextField 
                                    val={registerData.lastName}
                                    changeEvent={senseChange}
                                    name='lastName'
                                    type='text'
                                    label='Last Name'
                                    startAdornmentIcon={PersonIcon}
                                     />
                                     <MUITextField 
                                    val={registerData.age}
                                    changeEvent={senseChange}
                                    name='age'
                                    type='number'
                                    label='Age'
                                    startAdornmentIcon={CalendarTodayIcon}
                                     />
                                     <MUITextField 
                                    val={registerData.phone}
                                    changeEvent={senseChange}
                                    name='phone'
                                    type='tel'
                                    label='Phone'
                                    startAdornmentIcon={LocalPhoneIcon}
                                     />
                                     <MUITextField 
                                    val={registerData.email}
                                    changeEvent={senseChange}
                                    name='email'
                                    type='email'
                                    label='Email'
                                    startAdornmentIcon={EmailIcon}
                                     />
                                    <MUIPasswordField 
                                    val={registerData.password}
                                    changeEvent={senseChange}
                                    name='password'
                                    label='Password'
                                    />
                                    <MUIPasswordField 
                                    val={registerData.confirmPassword}
                                    changeEvent={senseChange}
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    />
                                    
                                    <NavLink to='#' className='text-end officialTextColor text-decoration-none mb-4'>Forgot Password</NavLink>
                                    <Button type='submit' variant="contained" style={{backgroundColor:'#bc2649'}}>Sign In</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Signup;