import React, { useContext } from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import {addEvent} from '../apis/EventsApi';

const Step7 = () => {
  const { currentStep, setCurrentStep, eventData, senseEventDataChange, toast ,Zoom } = useContext(stepContext);

  const performEventAddition = async (incomingEvent) =>{
    try{
      const resp = await addEvent(incomingEvent);
      if(resp){
        const{success,message} = resp;
        if(success){
          console.log(resp);
        }
        else{
          toast.error(message);
        }
      }
    }
    catch(error){
      console.log(`performEventAddition Error at apihandler at step7 component. Details: ${error.message}`);
    }
  }

  return (
    <>
      <h4 className="mt-4">Where should we contact for inquiries?</h4>
      <div className="row">
        <div className="col-md-5 col-12 pe-4">
          <MUITextField 
          label="Name"
          type='text'
          name='eventAdderName'
          val={eventData.eventAdderName}
          changeEvent={senseEventDataChange}
           />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 pe-4">
          <MUITextField 
          label="Phone number"
          type='number'
          name='eventAdderPhone'
          val={eventData.eventAdderPhone}
          changeEvent={senseEventDataChange}
           />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 pe-4">
          <MUITextField 
          label="Whatsapp number"
          type='number' 
          name='organizerWhtsappNum'  
          val={eventData.organizerWhtsappNum}
          changeEvent={senseEventDataChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 pe-4">
          <MUITextField
          label="Email" 
          type='email' 
          name='organizerEmail'  
          val={eventData.organizerEmail}
          changeEvent={senseEventDataChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 pe-4">
          <MUITextField
          label="Event Organizer" 
          type='text' 
          name='organizerName'  
          val={eventData.organizerName}
          changeEvent={senseEventDataChange}
          />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-between">
        <div className="abortBtnHolder p-2 mt-2">
          <SimpleMUIButton
            type="contained"
            content="Back"
            passesFunc={() => setCurrentStep(currentStep - 1)}
          />
        </div>
        <div className="continueBtnHolder p-2 mt-2">
          <SimpleMUIButton
            passesFunc={(e) => {
              e.preventDefault();
              (eventData.eventAdderName === '' ||
               eventData.eventAdderPhone === '' ||
               eventData.organizerWhtsappNum === ''||
               eventData.organizerEmail === '' ||
               eventData.organizerName === ''
              ) ? toast.error('Please fill out the required fields!') : performEventAddition(eventData);
            }}
            type="contained"
            content="Publish"
          />
        </div>
      </div>
    </>
  );
};
export default Step7;
