import React, { useState } from "react";
import { toast,Zoom } from "react-toastify";
import { verifyUserEmailOrPass } from "../apis/AuthService";
import CompleteLoader from "../components/CompleteLoader";

const ForgotPassStep2 = ({ currentStep, setCurrentStep ,email ,loading ,setLoading}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
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
      // setTimeout(() => {
      //   if(updatedOtp.every(value=>value!='')){
      //     document.getElementById('continueBtn').click();
      //   }
      // }, 0); 
    }
  };
  const hangleBackSpaceBehaviour = (e) =>{
      const{value,previousSibling} = e.target;
      if(e.key === 'Backspace' && !value && previousSibling){
          previousSibling.focus();
      }
  } 
  const verifyOtp = async (incomingVerifObj) =>{
    try{
      setLoading(true);
      const resp = await verifyUserEmailOrPass(incomingVerifObj);
      if(resp){
        const{success,message} = resp;
        if(success){
          console.log('verification success!');
          toast.success(message,{transition:Zoom});
          //redirection logic
          setCurrentStep(currentStep+1);
        }
        else{
          toast.error(message);
        }
      }
    }
    catch(error){
      console.log(`verifyOtp Error at apihandler at forgotpassstep2 component. Details: ${error.message}`);
    }
    finally{
      setLoading(false);
    }
  }

  const submitOtp = () =>{
    if(otp.every(value=>value!='')){
      const finalOtp = otp.join('');
      // api contact logic here
      const apiCodeVerifObj = {
        "type": "password", 
        "email": email,
        "code": finalOtp
      }
      // console.log(apiCodeVerifObj);
      // api contact
      verifyOtp(apiCodeVerifObj);
    }
    else{
      toast.error('Please provide complete 6 digit OTP!');
    }
  }
  return (
    <>
    {
      loading && <CompleteLoader/>
    }
      <h3 className="mt-4 mb-4">Verification Code</h3>
      <hr />
      <p className="text-secondary mt-4 mb-1">
        Enter the verification code sent to your email.If you haven't recieved
        it ,click "Resend Code".
      </p>
      <p className="noteText">
        Note: The email might take a few minutes to arrive.If you dont see it
        ,check your spam folder.
      </p>
      <div className="d-flex justify-content-center col-md-7 col-12 mt-4">
        <div className="p-1">
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
      </div>
      <div className="d-flex justify-content-center col-md-7 col-12 mt-4">
          <button 
          // id="continueBtn"
          className="btn btn-warning continueBtn"
          onClick={submitOtp}
          >
          Verify
          </button>
      </div>
    </>
  );
};
export default ForgotPassStep2;
