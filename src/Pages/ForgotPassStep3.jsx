import React,{useState} from "react";
import MUIPasswordField from '../components/MUIPasswordField';
import { MailIcon } from '../components/Socials';
import SimpleMUIButton from '../components/SimpleMUIButton';
import { toast } from "react-toastify";
import { handleForgotPass } from "../apis/AuthService";
import { getCentralStoreData } from "../components/MainContext";
import CompleteLoader from "../components/CompleteLoader";

const ForgotPassStep3 = ({ currentStep, setCurrentStep, email ,loading ,setLoading}) => {
    const[userPasses,setUserPasses] = useState({
        pass : '',
        confirmPass : '',
    });
    const{navigate,getAllNotificaton,getAllEvents} = getCentralStoreData();
    const sensePassChanges = (e) =>{
        const{name,value} = e.target;
        setUserPasses((prevVal)=>{
            return{
                ...prevVal,
                [name]:value
            };
        });
    }

    const performForgotPassOperation = async (forgotPassObj) =>{
        try {
            setLoading(true);
            const resp = await handleForgotPass(forgotPassObj);          
            if(resp){
                const{success,message,data} = resp;
                if(success && message === '' && data.user){
                  const{first_name,last_name,auth_token} = data.user;
                  //performing necessary login operations
                  //creatingUserName
                  const userName = first_name.charAt(0)+"."+last_name;
                  // saving token and some usefulInfoin local storage
                  localStorage.setItem('authUserSpecs',JSON.stringify({
                      authToken : auth_token,
                      usrName: userName
                  }));
                  //fetching notifications and allEvents only on login
                  await getAllNotificaton(); 
                  await getAllEvents(); 
                  toast(`${userName} your pass has been successfully updated!`);
                  navigate('/eventBazaar/');
                }
                else{
                  toast.error(message);
                }
            }
        } catch (error) {
            console.log(`forgotPass Error at apihandler at forgotpassstep3 component. Details: ${error.message}`);
        }
        finally{
          setLoading(false);
        }
    }
    const performPassChange = () =>{
      if(userPasses.pass === '' ||
        userPasses.confirmPass === ''){
          toast.error('Please fill out the required fields to proceed with password change!');
      }
      else{
        console.log(userPasses);
        //creating forgotPassApi object
        const forgotPassApiObj = {
          "email": email,
          "password": userPasses.pass,
          "confirm_password": userPasses.confirmPass
        }
        //api contact here
        performForgotPassOperation(forgotPassApiObj); 
      }
    }
  return (
    <>
      {
        loading && <CompleteLoader/>
      }
      <h3 className="mt-4 mb-4">Set New Password</h3>
      <hr />
      <p className="text-secondary mt-4">
        You're almost there! Choose a new password for your account.Make sure its strong and unique!
      </p>
      <div className="col-md-4 col-11">
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
            passesFunc={performPassChange}
          />
        </div>
      </div>
    </>
  );
};
export default ForgotPassStep3;
