import React, { useState } from 'react';
import MUIPasswordField from '../components/MUIPasswordField';
import MUITextField from '../components/MUITextField';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';

const Login = () =>{
    const[loginData,setLoginData] = useState({
        userEmail:'',
        userPass:''
    });
    const detectChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setLoginData((prevVal)=>{
            return {
                ...prevVal,
                [name] : value
            };
        });
        
    }
    const submitLoginData = (e) =>{
        e.preventDefault();
        if(loginData.userEmail === '' || loginData.userPass === ''){
            alert('Please fill out the required fields');
        }
        else{
            console.log(loginData.userEmail,loginData.userPass);
        }
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
                                <form onSubmit={submitLoginData} className='w-100 d-flex justify-content-center flex-column p-3'>
                                    <MUITextField 
                                        val={loginData.userEmail}
                                        changeEvent={detectChange}
                                        name='userEmail'
                                        type='email'
                                        label='Email'
                                        startAdornmentIcon={PersonIcon}
                                    />
                                    <MUIPasswordField 
                                    val={loginData.userPass}
                                    changeEvent={detectChange}
                                    name='userPass' 
                                    label='Password'
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
export default Login;