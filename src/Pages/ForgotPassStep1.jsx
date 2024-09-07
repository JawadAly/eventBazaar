import React,{useState} from "react";
import MUITextField from '../components/MUITextField';
import { MailIcon } from '../components/Socials';
import SimpleMUIButton from '../components/SimpleMUIButton';
import { toast,Zoom } from "react-toastify";
import { sendVerification } from "../apis/AuthService";
import CompleteLoader from "../components/CompleteLoader";

const ForgotPassStep1 = ({ currentStep, setCurrentStep ,setEmail ,loading ,setLoading}) => {
    const[otpEmail,setOtpEmail] = useState('');

    const sendPassVerification = async (passObj) =>{
        try{
            setLoading(true);//turning loader on
            const resp = await sendVerification(passObj);
            if(resp){
              const{success,message} = resp;
                if(success){
                  toast.success(message,{transition:Zoom});
                  // redirection logic
                  setCurrentStep(currentStep+1);
                }
                else{
                  toast.error(message);
                }
            }
        }
        catch(error){
            console.log(`sendPassVerification Error at apihandler at forgotpassstep1 component. Details: ${error.message}`);
        }
        finally{
          setLoading(false);//turning loader off
        }
    }

    const submitEmail = () =>{
        // email submission logic here
        if(otpEmail === ''){
          toast.error('Please provide your email!');
          // setCurrentStep(currentStep+1);
        }
        else{
          //setting email to be accessed in next step
          setEmail(otpEmail);
          // api contact logic
          const verifApiObj = {
            "type": "password", 
            "email": otpEmail
          }
          sendPassVerification(verifApiObj);
        }
    }
  return (
    <>
    {
      loading && <CompleteLoader/>
    }
      <h3 className="mt-4 mb-4">Forgot Password?</h3>
      <hr />
      <p className="text-secondary mt-4">
        Please enter the email address associated with your account. We'll send
        you a verification code to update your password.
      </p>
      <div className="col-md-5 col-11">
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
