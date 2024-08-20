import React,{useContext} from "react";
import MUITextField from "../components/MUITextField";
import { GroupIcon } from "./Socials";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Step3 = () => {
    const{currentStep,setCurrentStep,eventData,setEventData,senseEventDataChange} = useContext(stepContext);
  return (
    <>
      <h4 className="mt-4">How much space is there?</h4>
      <p className="text-secondary "><ErrorOutlineIcon/> This represents the amount of available space there is at your event</p>
      <div className="row">
        <div className="col-md-5 col-12 mt-2">
          <MUITextField 
          label="Capacity"
          type='number'
          startAdornmentIcon={GroupIcon} 
          name='eventCapacity'
          val={eventData.eventCapacity}
          changeEvent={senseEventDataChange}
          />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-between">
        <div className="continueBtnHolder p-2 mt-2">
            <SimpleMUIButton
            passesFunc={() => setCurrentStep(currentStep + 1)}
            type="contained"
            content="Continue"
            />
        </div>
        <div className="abortBtnHolder p-2 mt-2">
            <SimpleMUIButton 
            type="contained"
            content="Back" 
            passesFunc={() => setCurrentStep(currentStep - 1)}
            />
        </div>
      </div>
    </>
  );
};
export default Step3;
