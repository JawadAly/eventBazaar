import React,{useState} from "react";
import MUITextField from '../components/MUITextField';
import { MailIcon } from '../components/Socials';
import SimpleMUIButton from '../components/SimpleMUIButton';

const ForgotPassStep1 = ({ currentStep, setCurrentStep }) => {
    const[otpEmail,setOtpEmail] = useState('');
    const submitEmail = () =>{
        // email submission logic here
        // redirection logic
        setCurrentStep(currentStep+1);
    }
  return (
    <>
      <h3 className="mt-4 mb-4">Forgot Password?</h3>
      <hr />
      <p className="text-secondary mt-4">
        Please enter the email address associated with your account. We'll send
        you a verification code to update your password.
      </p>
      <div className="col-md-5 col-10">
          <MUITextField
            type="email"
            label="Email"
            startAdornmentIcon={MailIcon}
            value={otpEmail}
            changeEvent={(e)=> setOtpEmail(e.target.value)}
            isIconColored={true}
          />
          <div className="p-2 pt-3">
            <SimpleMUIButton
              variant="contained"
              content="Continue"
              type="button"
              passesFunc={submitEmail}
            />
          </div>
      </div>
    </>
  );
};
export default ForgotPassStep1;
