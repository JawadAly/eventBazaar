import React, { useContext } from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import { eventCategs } from "../apis/Categs";

const Step6 = () => {
  const { currentStep, setCurrentStep, eventData,senseEventDataChange } = useContext(stepContext);

  return (
    <>
      <h4 className="mt-4">Want to describe your event to attendees?</h4>
      <div className="row">
        <div className="col-md-5 col-12 mt-2 pe-4">
            <MUITextField 
            label='Description' 
            isMultiline={true}
            name='eventDesc'    
            val={eventData.eventDesc}    
            changeEvent={senseEventDataChange}
            />
        </div>
      </div>
      <h5 className="mt-3">Categories</h5>
      <div className="row">
        <div className="col-md-5 col-12 mt-2 pe-4">
            {eventCategs.map((val,index)=>{
                return(
                    <label className="radioInputHolder mb-3" key={index}>
                        <input 
                        id="paidEvent"
                        type="radio"
                        name="eventCategory"
                        value={val.categName} 
                        onChange={senseEventDataChange}
                        />
                        <label htmlFor="paidEvent" className="ms-3">
                            {val.categName}
                        </label>
                    </label>
                );
            })}
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
export default Step6;
