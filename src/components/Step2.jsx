import React,{useContext} from "react";
import MUITextField from "../components/MUITextField";
import { LocationIcon } from "./Socials";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";

const Step2 = () => {
    const{currentStep,setCurrentStep,eventData,setEventData,senseEventDataChange} = useContext(stepContext);
  return (
    <>
      <h4 className="mt-4">Where is it going to happen?</h4>
      <div className="row">
        <div className="col-md-5 col-12">
          <MUITextField 
          label="Location"
          startAdornmentIcon={LocationIcon} 
          name='eventLocation'  
          val={eventData.eventLocation}
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
export default Step2;
