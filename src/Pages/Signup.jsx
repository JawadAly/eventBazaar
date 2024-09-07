import React, { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { sendVerification, signUp,verifyUserEmailOrPass } from '../apis/AuthService';
import { toast,Zoom } from 'react-toastify';
import { getCentralStoreData } from '../components/MainContext';
import MUIModelWindow from '../components/MUIModelWindow';

const Signup = () =>{
    const[registerData,setRegisterData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        age:'',
        country_code:"+92",
        phone:'',
        password:'',
        confirm_password:'',
        termsCondsCheck:false,
        fcm_token:"x"
    });
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const[otpEmail,setOtpEmail] = useState('');
    const[passwordMatchState,setPasswordMatchState] = useState('');
    const[continueVerif,setContinueVerif] = useState(false);
    const{navigate,getAllNotificaton,getAllEvents} = getCentralStoreData();
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
        if (name === 'password' || name === 'confirm_password') {
            const newPassword = name === 'password' ? value : registerData.password;
            const newconfirm_password = name === 'confirm_password' ? value : registerData.confirm_password;
            setPasswordMatchState(newPassword !== newconfirm_password);
        }
    }
    
    const handleOtpSubmission = async (incomingOtpObj) =>{
        try{
            const resp = await verifyUserEmailOrPass(incomingOtpObj);
            if(resp){   
                const{success,message,data} = resp;
                if(success && message === 'Verified successfully' && data.user){
                    // closing modalWindow
                    document.getElementById('modalCloseBtn').click();
                    //performing some necessary login operations
                    const {first_name,last_name,auth_token} = data.user;
                    const userName = first_name.charAt(0)+"."+last_name;
                    // saving token and some usefulInfoin local storage
                    localStorage.setItem('authUserSpecs',JSON.stringify({
                        authToken : auth_token,
                        usrName: userName
                    }));
                    //fetching notifications and allEvents only on login
                    await getAllNotificaton(); 
                    await getAllEvents(); 

                    toast.success(message,{transition:Zoom});
                    //navigation here after verification
                    navigate('/eventBazaar/signupRedirect');

                }
                else{
                    toast.error(message);
                }
            }
        }
        catch(error){
            console.log(`handleOtpSubmission Error at apihandler at signUp component. Details: ${error.message}`);
        }
    }
    // signUp Handler to api
    const handleSignUp = async (incomingSignUpData) =>{
        try{
            const resp = await signUp(incomingSignUpData);
            if(resp){
                const {success,message,data} = resp;
                if(success && message === '' && data.user){
                    //adding button in DOM so that click can be performed for modal opening
                    setContinueVerif(true);
                    toast.success('Email Verification Sent!',{transition:Zoom});
                    //setting OTP email
                    setOtpEmail(data.user.email);
                    // opening modal for verification with a little delay part so above email state gets updated
                    setTimeout(() => {
                        document.getElementById('modalOpener').click();
                    }, 1000);
                    //emptying textfields
                    setRegisterData({
                        first_name:'',
                        last_name:'',
                        email:'',
                        age:'',
                        country_code:"+92",
                        phone:'',
                        password:'',
                        confirm_password:'',
                        termsCondsCheck:false,
                        fcm_token:"x"
                    });
                }
                else{
                    toast.error(message);
                    // console.log(resp);
                }
            }
        }
        catch(error){
            console.log(`SignUp Error at apihandler at signUp component. Details: ${error.message}`);
        }
    }
    const submitRegisterData = (e) =>{
        e.preventDefault();
        if(registerData.first_name === '' ||
           registerData.last_name === ''  ||
           registerData.age === ''  ||
           registerData.phone === ''  ||
           registerData.email === ''  ||
           registerData.password === ''  ||
           registerData.confirm_password === ''
        ){
            toast.error('Please fill out the required fields');
        }
        else{
            if(registerData.termsCondsCheck === false){
                toast.error('You must read and accept the terms and coditions of Event Bazaar to continue further!');
            }
            else{
                if(registerData.password !== registerData.confirm_password || passwordMatchState){
                    toast.error('Your provided passwords do not match!');
                }
                else{
                    // removing termAndCondsCheck property from state obj
                    const{termsCondsCheck,...remainingData} = registerData;
                    console.log(remainingData);
                    handleSignUp(registerData);
                }
            }
        }
    }

    
  const handleOtpChange = (e, indx) => {
    const { value, nextSibling, previousSibling } = e.target;

    if (isNaN(value)) {
      alert("Please type in a number to continue with your verification!");
    } else {
    //   setOtp([...otp.map((data, index) => (index === indx ? value : data))]);
      const updatedOtp = otp.map((data, index) => (index === indx ? value : data))
      setOtp(updatedOtp);
      if (value && nextSibling) {
        nextSibling.focus();
      }
      //autoSubmitFunctionality
    //   setTimeout(() => {
    //     if(updatedOtp.every(value=>value!='')){
    //       document.getElementById('continueBtn').click();
    //     }
    //   }, 0); 
    }
  };
  const hangleBackSpaceBehaviour = (e) =>{
      const{value,previousSibling} = e.target;
      if(e.key === 'Backspace' && !value && previousSibling){
          previousSibling.focus();
      }
  } 
  const submitOtp = () =>{
        if(otp.every(value=>value!='')){
            const finalOtp = otp.join('');
            toast.success(finalOtp);
            //creating required object for otp submission and sending it
            const otpObj = {
                "type": "email",
                "email": otpEmail,
                "code": finalOtp
            };
            handleOtpSubmission(otpObj);
        }
        else{
            toast.error('Please provide complete 6 digit OTP.');
        }
  }
  const resendVerification = async () =>{
    try{
        const verifObj = {
            "type": "email",
            "email": otpEmail
        };
        const resp = await sendVerification(verifObj);
        if(resp){
            const{success,message} = resp;
            if(success){
                toast.success(message,{transition:Zoom});
            }
            else{
                toast.error(message);
            }
        }
    }
    catch(error){
        console.log(`resendVerification Error at apihandler at signUp component. Details: ${error.message}`);
    }
  }
//   useEffect(()=>{
//     toast.success('Type Phone without country code as default is set',{transition:Zoom});
//   },[]);
    return(
        <>
            <section className='signupSection'>
                <div className='container'>
                    <div className='signUpFlexer d-flex align-items-center justify-content-center py-5'>
                        <div className='signUpCard'>
                            <div className='signupCircle'>
                                <h3 className='text-white signUpCircleText'>Event Bazaar</h3>
                            </div>
                            <div className='signupFormArea p-2'>
                                <form onSubmit={submitRegisterData}>
                                    <div className='inputHolder pe-3'>
                                        <MUITextField 
                                        val={registerData.first_name}
                                        changeEvent={senseChange}
                                        name='first_name'
                                        type='text'
                                        label='First Name'
                                        startAdornmentIcon={PersonIcon}
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUITextField 
                                        val={registerData.last_name}
                                        changeEvent={senseChange}
                                        name='last_name'
                                        type='text'
                                        label='Last Name'
                                        startAdornmentIcon={PersonIcon}
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUITextField 
                                        val={registerData.age}
                                        changeEvent={senseChange}
                                        name='age'
                                        type='number'
                                        label='Age'
                                        startAdornmentIcon={CalendarTodayIcon}
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUITextField 
                                        val={registerData.phone}
                                        changeEvent={senseChange}
                                        name='phone'
                                        type='tel'
                                        label='Phone'
                                        startAdornmentIcon={LocalPhoneIcon}
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUITextField 
                                        val={registerData.email}
                                        changeEvent={senseChange}
                                        name='email'
                                        type='email'
                                        label='Email'
                                        startAdornmentIcon={EmailIcon}
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUIPasswordField 
                                        val={registerData.password}
                                        changeEvent={senseChange}
                                        name='password'
                                        label='Password'
                                        />
                                    </div>
                                    <div className='inputHolder pe-3'>
                                        <MUIPasswordField 
                                        val={registerData.confirm_password}
                                        changeEvent={senseChange}
                                        name='confirm_password'
                                        label='Confirm Password'
                                        />
                                        {passwordMatchState && <span className='text-danger ps-2'>Passwords don't match</span>}
                                    </div>
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
                                            <Link to='/termsandconds' style={{color:'#bc2649'}}>terms and coditions</Link>
                                        </>
                                        }

                                        />
                                    </div>
                                    <div className='inputHolder p-2'>
                                        <Button type='submit' variant="contained" style={{backgroundColor:'#bc2649',width:'100%'}}>Sign Up</Button>
                                    </div>
                                    {
                                        continueVerif && 
                                            (<p 
                                            className='text-end themeColor underline mt-2 mb-0'                
                                            id="modalOpener"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                                Continue Verification..
                                            </p>)
                                    }
                                    <p className='text-end mt-3 pe-2'>
                                        <Link to='/eventBazaar/login' className='officialTextColor'>
                                            Already have an account? Login!
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <MUIModelWindow>
                        <div className="modal-header">
                            <h4 className="modal-title text-center w-100 themeColor">Verification</h4>
                            <button
                                id='modalCloseBtn'
                                type="button"
                                className="btn-close d-none"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body p-2">
                            <p className='text-center mb-2' style={{fontSize:'15px'}}>We've sent you an email on <span className='themeColor'>{`<${otpEmail}>`}</span> to verify it's really you please check your inbox and enter the code</p>
                            <p className='text-center themeColor mb-2' style={{fontSize:'13px'}}>(Dont miss the spam folder)</p>
                            <div className="p-2 d-flex justify-content-center mb-3">
                                {otp.map((data, index) => { 
                                    return (
                                        <input
                                        key={index}
                                        className="otpInput"
                                        maxLength="1"
                                        value={data}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e)=> hangleBackSpaceBehaviour(e) }
                                        />
                                    );
                                })}
                            </div>
                            <p className='text-center mb-2' style={{fontSize:'13px'}}>Did not get a code? <span className='themeColor' style={{cursor:'pointer'}} onClick={resendVerification}>Resend</span> </p>
                            <div className='p-2'>
                                <Button id='continueBtn' onClick={submitOtp} type='button' variant='contained' style={{backgroundColor:'#bc2649',width:'100%'}}>Verify</Button>
                            </div>
                        </div>

                    </MUIModelWindow>
                    
                </div>
            </section>
        </>
    );
}
export default Signup;

