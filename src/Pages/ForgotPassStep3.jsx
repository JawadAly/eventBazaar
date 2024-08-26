import React,{useState} from "react";
import MUIPasswordField from '../components/MUIPasswordField';
import { MailIcon } from '../components/Socials';
import SimpleMUIButton from '../components/SimpleMUIButton';

const ForgotPassStep3 = ({ currentStep, setCurrentStep }) => {
    const[userPasses,setUserPasses] = useState({
        pass : '',
        confirmPass : '',
    });
    const sensePassChanges = (e) =>{
        const{name,value} = e.target;
        setUserPasses((prevVal)=>{
            return{
                ...prevVal,
                [name]:value
            };
        });
    }
  return (
    <>
      <h3 className="mt-4 mb-4">Set New Password</h3>
      <hr />
      <p className="text-secondary mt-4">
        You're almost there! Choose a new password for your account.Make sure its strong and unique!
      </p>
      <div className="col-md-4 col-10">
        <MUIPasswordField
          type="password"
          label="Password"
          name='pass'
          val={userPasses.pass}
          changeEvent={sensePassChanges}
          isIconColored={true}
        />
        <MUIPasswordField
          type="password"
          label="Confirm Password"
          name='confirmPass'
          val={userPasses.confirmPass}
          changeEvent={sensePassChanges}
          isIconColored={true}
        />
        {
            userPasses.pass !== userPasses.confirmPass && <span className="themeColor">Passwords dont match!</span>
        }
        <div className="p-2 pt-3">
          <SimpleMUIButton
            variant="contained"
            content="Update Password"
            type="button"
          />
        </div>
      </div>
    </>
  );
};
export default ForgotPassStep3;
