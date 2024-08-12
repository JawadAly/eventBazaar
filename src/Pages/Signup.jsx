import React, { useState } from 'react';
import MUIPasswordField from '../components/MUIPasswordField';
import MUITextField from '../components/MUITextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FormControlLabel from '@mui/material/FormControlLabel';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { NavLink } from 'react-router-dom';
import { signUp } from '../apis/AuthService';

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
    const[passwordMatchState,setPasswordMatchState] = useState('');
    const senseChange = (event) =>{
        const name = event.target.name;
        // working for both checkbox and textfields
        const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
        setRegisterData((prevVal)=>{
            return {
                ...prevVal,
                [name] : value
            };
        });
        if (name === 'password' || name === 'confirmPassword') {
            const newPassword = name === 'password' ? value : registerData.password;
            const newConfirmPassword = name === 'confirmPassword' ? value : registerData.confirmPassword;
            setPasswordMatchState(newPassword !== newConfirmPassword);
        }
    }
    // signUp Handler to api
    // const handleSignUp = async (incomingSignUpData) =>{
    //     try{
    //         const resp = await signUp(incomingSignUpData);
    //         alert('SignUp Successful!',resp);
    //     }
    //     catch(error){
    //         alert(`SignUp Error at apihandler at signUp component. Details: ${error}`);
    //     }
    // }
    const submitRegisterData = (e) =>{
        e.preventDefault();
        if(registerData.firstName === '' ||
           registerData.lastName === ''  ||
           registerData.age === ''  ||
           registerData.phone === ''  ||
           registerData.email === ''  ||
           registerData.password === ''  ||
           registerData.confirmPassword === ''
        ){
            alert('Please fill out the required fields');
        }
        else{
            if(registerData.termsCondsCheck === false){
                alert('You must read and accept the terms and coditions of Event Bazaar to continue further!');
            }
            else{
                if(registerData.password !== registerData.confirmPassword || passwordMatchState){
                    alert('Your provided passwords do not match!');
                }
                else{
                    console.log(registerData);
                    // handleSignUp(registerData);
                }
            }
        }
    }
    return(
        <>
            <section className='loginSection'>
                <div className='container'>
                    <div className='flexer d-flex align-items-center justify-content-center '>
                        <div className='signupCard'>
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
                                    {passwordMatchState && <span className='text-danger ps-2'>Passwords don't match</span>}
                                    <div className='checkBoxHolder w-100'>
                                        <FormControlLabel 
                                        control={
                                            <Checkbox
                                            onChange={senseChange}
                                            value={registerData.termsCondsCheck}
                                            name='termsCondsCheck'
                                            sx={{
                                            m:1,
                                            color: pink[800],
                                            '&.Mui-checked': {
                                                color: pink[600],
                                            },
                                            }}
                                        />
                                        } 
                                        label={
                                        <>
                                            I agree to the {' '}
                                            <NavLink to='/termsandconds' style={{color:'#bc2649'}}>terms and coditions</NavLink>
                                        </>
                                        }

                                        />
                                    </div>
                                    <Button type='submit' variant="contained" style={{backgroundColor:'#bc2649'}}>Sign Up</Button>
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