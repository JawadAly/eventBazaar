import React, { useState } from "react";

const ForgotPassStep2 = ({ currentStep, setCurrentStep }) => {
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
      setTimeout(() => {
        if(updatedOtp.every(value=>value!='')){
          document.getElementById('continueBtn').click();
        }
      }, 0); 
    }
  };
  const hangleBackSpaceBehaviour = (e) =>{
      const{value,previousSibling} = e.target;
      if(e.key === 'Backspace' && !value && previousSibling){
          previousSibling.focus();
      }
  } 
  const submitOtp = () =>{
    const finalOtp = otp.join('');
    alert(finalOtp);
    setCurrentStep(currentStep+1);
  }
  return (
    <>
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
          id="continueBtn"
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
