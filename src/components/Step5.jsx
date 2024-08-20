import React,{useContext} from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";

const Step5 = () => {
    const{currentStep,setCurrentStep,eventData,setEventData,senseEventDataChange} = useContext(stepContext);

  return (
    <>
      <h4 className="mt-4">Have a name and photo for your event?</h4>
      <div className="row">
        <div className="col-md-5 col-12 mt-2">
            <div class="custom-file-input-holder p-2" onClick={()=>document.getElementById('formFile').click()}>
                <p>Upload Image</p>
                <input
                className="custom-file-input d-none"
                type="file"
                id="formFile"
                accept="image/*"
                name="eventBanner"    
                value={eventData.eventBanner}
                onChange={senseEventDataChange}
                />
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 mt-3 pe-4">
          <MUITextField 
          label="Name" 
          name='eventTitle'  
          val={eventData.eventTitle}
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
export default Step5;
