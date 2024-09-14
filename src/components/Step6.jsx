import React, { useContext } from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
// import { eventCategs } from "../apis/Categs";
import { getCentralStoreData } from "./MainContext";
import CompleteLoader from "./CompleteLoader";

const Step6 = () => {
  const { currentStep, setCurrentStep, eventData,senseEventDataChange,toast } = useContext(stepContext);
  const {eventCategs,loadingState,errorState} = getCentralStoreData();

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
          {
            errorState ? (  
                  <p className='text-center themeColor'>An Error Occurred at our end, please try again later!</p>
            ) : (
              loadingState ? (
                <CompleteLoader/>
              ) : (
                eventCategs.map((val,index)=>{
                return(
                    <label className="radioInputHolder mb-3" key={index}>
                        <input 
                        id="paidEvent"
                        type="radio"
                        checked = {eventData.eventCategory === val.id}
                        name="eventCategory"
                        value={val.id} 
                        onChange={senseEventDataChange}
                        />
                        <label htmlFor="paidEvent" className="ms-3">
                            {val.name}
                        </label>
                    </label>
                );
                })
              ) 
            )
          }
            
        </div>
      </div>
      <div className="col-2 d-flex justify-content-between">
        <div className="continueBtnHolder p-2 mt-2">
          <SimpleMUIButton
            passesFunc={(e) => {
              e.preventDefault();
              eventData.eventDesc === '' || eventData.eventCategory === '' ? toast.error('Please fill out the required fields!') : setCurrentStep(currentStep + 1);
            }}
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
