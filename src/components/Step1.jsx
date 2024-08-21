import React, { useContext } from "react";
import MUITextField from "../components/MUITextField";
import { CalendarIcon, ClockIcon } from "../components/Socials";
import SimpleMUIButton from "../components/SimpleMUIButton";
import { stepContext } from "./EventsContext";
import { Link } from "react-router-dom";

const Step1 = () => {
  const { currentStep, setCurrentStep, eventData, setEventData ,senseEventDataChange} =
    useContext(stepContext);
  return (
    <>
      <h4 className="mt-4">When is it going to happen?</h4>
      <div className="row">
        <div className="col-md-5 col-12 pe-4">
          <MUITextField 
          label="Date"
          startAdornmentIcon={CalendarIcon} 
          type='date'  
          name='eventDate'
          val={eventData.eventDate}
          changeEvent={senseEventDataChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 pe-4">
          <MUITextField 
          label="Time"
          startAdornmentIcon={ClockIcon}
          type='time'
          name='eventTime'
          val={eventData.eventTime}
          changeEvent={senseEventDataChange}
           />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-between">
        <div className="continueBtnHolder p-2 mt-2">
            <SimpleMUIButton
            passesFunc={(e) => {
              e.preventDefault();
              eventData.eventDate === '' || eventData.eventTime === '' ? alert('Please fill out the required fields!') : setCurrentStep(currentStep + 1);
            }}
            type="contained"
            content="Continue"
            />
        </div>
        <div className="abortBtnHolder p-2 mt-2">
            <Link to="/eventBazaar/account">
            <SimpleMUIButton type="contained" content="Abort" />
            </Link>
        </div>
      </div>
    </>
  );
};
export default Step1;
