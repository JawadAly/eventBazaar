import React, { useState } from 'react';
import MUIPasswordField from '../components/MUIPasswordField';
import MUITextField from '../components/MUITextField';
import {Link,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { signIn } from '../apis/AuthService';
import { GogleIcon, PhoneIcon } from '../components/Socials';
import { toast, Zoom } from 'react-toastify';
import { getCentralStoreData } from '../components/MainContext';
import CompleteLoader from '../components/CompleteLoader';
import MUIModelWindow from '../components/MUIModelWindow';
import PhoneInput from 'react-phone-input-2';
import {auth,provider} from '../Firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const Login = () =>{
    const[loginData,setLoginData] = useState({
        email:'',
        password:'',
        phoneSignInPass: '',
        country_code: '',
        phone: '',
    });
    const[googleSignInData,setGoogleSignInData] = useState({
        email: '',
        name: '',
        google_id: '',
    });
    const detectChange = (event,countryData) =>{
        if(event && event.target){
            const name = event.target.name;
            const value = event.target.value;
            setLoginData((prevVal)=>{
                return {
                    ...prevVal,
                    [name] : value
                };
            });
        }
        else{
            const phone = event.replace(countryData.dialCode, ''); // Remove country code to get the actual phone number
            const country_code = countryData.dialCode; // Get country dial code (like +92)
            setLoginData((prevVal) => ({
                ...prevVal,
                phone: phone,
                country_code: `+${country_code}`
            }));
        }
        
    }
    const{getAllNotificaton,getAllEvents,loadingState,setLoadingState} = getCentralStoreData();
    const navigate = useNavigate();
    // signIn handler to api
    const signin = async (incomingUsrCredentials) =>{
        try{
            setLoadingState(true);
            const resp = await signIn(incomingUsrCredentials);
            if(resp){
                const {success,message} = resp;
                if(success && message === '' && resp.data.user){
                    const {first_name,last_name,auth_token} = resp.data.user;
                    //creatingUserName
                    const userName = first_name.charAt(0)+"."+last_name;
                    // saving token and some usefulInfoin local storage
                    localStorage.setItem('authUserSpecs',JSON.stringify({
                        authToken : auth_token,
                        usrName: userName
                    }));
                    //fetching notifications and allEvents only on login
                    getAllNotificaton(); 
                    getAllEvents();

                    toast.success('Success!',{
                        transition:Zoom
                    });
                    //navigation here
                    navigate('/eventBazaar/');
                }
                else{
                    toast.error(message);
                }
            }
        }
        catch(error){
            console.log(`SignIn Error at apihandler at signIn component. Details: ${error.message}`);
        }
        finally{
            setLoadingState(false);
        }
    }
    const submitLoginData = (e) =>{
        e.preventDefault();
        if(loginData.email === '' || loginData.password === ''){
            toast.error('Please fill out the required fields');
        }
        else{
            // console.log(loginData.email,loginData.password);
            //filtering only the required data
            const {phoneSignInpass,country_code,phone,...emailSignInCredentials} = loginData;
            signin(emailSignInCredentials);
        }
    }
    const submitPhoneLoginData = () =>{
        if(loginData.country_code === '' ||
        loginData.phone === '' ||
        loginData.phoneSignInPass === ''
        ){  
            toast.error('Please fill out the required fiedls!');
        }
        else{
            //creating the required obj to perform phoneSignIn
            const phoneSignInCredentials = {
                password : loginData.phoneSignInPass,
                country_code : loginData.country_code,
                phone: loginData.phone
            };
            signin(phoneSignInCredentials);
            document.getElementById('modalCloseBtn').click();
        }
    }
    const sso = async () =>{
        try{
            const resp = await axios.post('/api/v1/eventify/user/sso',googleSignInData,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(resp.data){
                const{success,message,user} = resp.data;
                if(success && user){
                    const {first_name,last_name,auth_token} = user;
                    //creatingUserName
                    const userName = first_name.charAt(0)+"."+last_name;
                    // saving token and some usefulInfoin local storage
                    localStorage.setItem('authUserSpecs',JSON.stringify({
                        authToken : auth_token,
                        usrName: userName,
                        googleAuth : true
                    }));
                    //fetching notifications and allEvents only on login
                    getAllNotificaton(); 
                    getAllEvents();

                    toast.success('Success!',{ transition:Zoom});
                    //navigation here
                    navigate('/eventBazaar/');
                }
                else{
                    toast.error(message);
                }
            }
        }
        catch(error){
            console.log(`Unexpected error occured while performing google signin.Error ${error.message}`);
        }
    }
    const performSocialSignIn = async () =>{
        try{
            const resp = await signInWithPopup(auth,provider);
            if(resp){
                const{user} = resp;
                if(user && user.providerData){
                    setGoogleSignInData({
                        email: user.providerData.email ,
                        name: user.providerData.displayName,
                        google_id: user.providerData.uid,
                    });
                    // console.log(user);
                    //further sign in process
                    sso();
                    
                }
                else{
                    toast.error('Error signing in with google! Try again later');
                }
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    return(
        <>
            <section className='loginSection'>
                <div className='container'>
                {
                    loadingState && <CompleteLoader/>
                }
                    <div className='flexer d-flex align-items-center justify-content-center py-5'>
                        <div className='loginCard'>
                            <div className='circle'>
                                <h3 className='text-white circleText'>Event Bazaar</h3>
                            </div>
                            <div className='loginFormSection p-2'>
                                <form onSubmit={submitLoginData}>
                                    <div className='inputHolder pe-3'>
                                        <MUITextField 
                                            val={loginData.email}
                                            changeEvent={detectChange}
                                            name='email'
                                            type='email'
                                            label='Email'
                                            startAdornmentIcon={PersonIcon}
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUIPasswordField 
                                        val={loginData.password}
                                        changeEvent={detectChange}
                                        name='password' 
                                        label='Password'
                                        />
                                    </div>
                                    <div className='inputHolder p-2 mb-2'>
                                        <p className='text-end'>
                                            <Link to='/eventBazaar/forgotpassword' className='officialTextColor text-decoration-none'>Forgot Password</Link>
                                        </p>
                                        <Button type='submit' variant="contained" style={{backgroundColor:'#bc2649',width:'100%'}}>Sign In</Button>
                                    </div>
                                    <div className='otherSignInOptionsHolder text-center'>
                                        <p>
                                            Other Signin Options
                                        </p>
                                        <IconButton 
                                        aria-label="delete"
                                        size="large"
                                        style={{backgroundColor:'#FFC3D4',color:'#bc2649'}}
                                        id="modalOpener"                      
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        >
                                            <PhoneIcon fontSize="inherit" />
                                        </IconButton>

                                        <IconButton 
                                        aria-label="delete"
                                        size="large" 
                                        style={{backgroundColor:'#FFC3D4',color:'#bc2649',marginLeft:'20px'}}
                                        onClick={performSocialSignIn}
                                        >
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
                    <MUIModelWindow>
                        <div className="modal-header">
                            <h5 className="modal-title text-center w-100">Sign In With Phone</h5>
                            <button
                                id='modalCloseBtn'
                                type="button"
                                className="btn-close d-none"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body p-4" style={{overflowX:'hidden'}}>
                            <PhoneInput
                                containerStyle={{padding:'8px'}}
                                inputStyle={{width:'100%',height:'56px'}}
                                country={'pk'}
                                onChange={detectChange}
                            />
                            <div className='pe-3'>  
                                <MUIPasswordField
                                    label='Password'
                                    val={loginData.phoneSignInPass}
                                    name='phoneSignInPass' 
                                    changeEvent={detectChange}
                                />
                            </div>
                            <div className='p-2 pt-3'>
                                <Button type='button' onClick={submitPhoneLoginData} variant='contained' style={{backgroundColor:'#bc2649',width:'100%'}}>Sign In</Button>
                            </div>
                        </div>

                    </MUIModelWindow>
                </div>
            </section>
        </>
    );
}
export default Login;