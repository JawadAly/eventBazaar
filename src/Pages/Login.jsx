import React, { useState } from 'react';
import MUIPasswordField from '../components/MUIPasswordField';
import MUITextField from '../components/MUITextField';
import { Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { signIn } from '../apis/AuthService';
import { GogleIcon, PhoneIcon } from '../components/Socials';

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
    // signIn handelr to api
    // const signin = async (incomingUsrCredentials) =>{
    //     try{
    //         const resp = await signIn(incomingUsrCredentials);
    //         alert('SignIn successful',resp);
    //     }
    //     catch(error){
    //         alert(`SignIn Error at apihandler at signIn component. Details: ${error}`);
    //     }
    // }
    const submitLoginData = (e) =>{
        e.preventDefault();
        if(loginData.userEmail === '' || loginData.userPass === ''){
            alert('Please fill out the required fields');
        }
        else{
            console.log(loginData.userEmail,loginData.userPass);
            // signin(loginData);
        }
    }
    return(
        <>
            <section className='loginSection'>
                <div className='container'>
                    <div className='flexer d-flex align-items-center justify-content-center py-5'>
                        <div className='loginCard'>
                            <div className='circle'>
                                <h3 className='text-white circleText'>Event Bazaar</h3>
                            </div>
                            <div className='loginFormSection p-2'>
                                <form onSubmit={submitLoginData}>
                                    <div className='inputHolder pe-3'>
                                        <MUITextField 
                                            val={loginData.userEmail}
                                            changeEvent={detectChange}
                                            name='userEmail'
                                            type='email'
                                            label='Email'
                                            startAdornmentIcon={PersonIcon}
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUIPasswordField 
                                        val={loginData.userPass}
                                        changeEvent={detectChange}
                                        name='userPass' 
                                        label='Password'
                                        />
                                    </div>
                                    <div className='inputHolder p-2 mb-2'>
                                        <p className='text-end'>
                                            <Link to='#' className='officialTextColor text-decoration-none'>Forgot Password</Link>
                                        </p>
                                        <Button type='submit' variant="contained" style={{backgroundColor:'#bc2649',width:'100%'}}>Sign In</Button>
                                    </div>
                                    <div className='otherSignInOptionsHolder text-center'>
                                        <p>
                                            Other Signin Options
                                        </p>
                                        <IconButton aria-label="delete" size="large" style={{backgroundColor:'#FFC3D4',color:'#bc2649'}}>
                                            <PhoneIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" style={{backgroundColor:'#FFC3D4',color:'#bc2649',marginLeft:'20px'}}>
                                            <GogleIcon fontSize="inherit" />
                                        </IconButton>
                                    </div>
                                    <p className='text-end mt-4 pe-2'>
                                        <Link to='/eventBazaar/signup' className='officialTextColor'>
                                            Dont have an account? Signup!
                                        </Link>
                                    </p>
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