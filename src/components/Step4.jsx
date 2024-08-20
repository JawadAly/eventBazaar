import React, { useContext } from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import { TagIcon } from "./Socials";

const Step4 = () => {
  const { currentStep, setCurrentStep, eventData, setEventData,senseEventDataChange } = useContext(stepContext);
  return (
    <>
      <h4 className="mt-4">What is the price range of your pass?</h4>
      <div className="row">
        <div className="col-md-5 col-12 mt-2 ps-4">
          <label className="radioInputHolder mb-3">
            <input 
            id="freeEvent"
            type="radio"
            value={true} 
            checked = {eventData.isFreeEvent === true}
            name="isFreeEvent"
            onChange={senseEventDataChange}
            />
            <label htmlFor="freeEvent" className="ms-3">
              This is a free event
            </label>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 mt-2 ps-4">
          <label className="radioInputHolder">
            <input
            id="paidEvent"
            type="radio"
            value={false} 
            name="isFreeEvent"
            onChange={senseEventDataChange}
            />
            <label htmlFor="paidEvent" className="ms-3">
              This is a paid event
            </label>
          </label>
        </div>
      </div>
      {eventData.isFreeEvent === "false" && (
        <>
          <div className="row">
            <div className="col-md-5 col-12 mt-2 ps-3 pe-4">
              <MUITextField
                label="Starts From"
                type="number"
                startAdornmentIcon={TagIcon}
                name='eventStartsFrom'
                val={eventData.eventStartsFrom}
                changeEvent={senseEventDataChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-12 mt-2 ps-3 pe-4">
              <MUITextField
                label="Goes Upto"
                type="number"
                startAdornmentIcon={TagIcon}
                name='eventGoesUpto'
                val={eventData.eventGoesUpto}
                changeEvent={senseEventDataChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-12">
              <div className="d-flex align-items-center justify-content-between p-2 mt-4 pb-1">
                <h5>Pass Details</h5>
                <button className="themeColor addPassBtn">Add Pass</button>
              </div>
              <p className="ps-3 pe-3 text-center">
                You need to add atleast one type of pass for paid events.
              </p>
            </div>
          </div>
        </>
      )}

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
export default Step4;
