import React, { useContext } from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";

const Step7 = () => {
  const { currentStep, setCurrentStep, eventData, setEventData } =
    useContext(stepContext);

  return (
    <>
      <h4 className="mt-4">Where should we contact for inquiries?</h4>
      <div className="row">
        <div className="col-md-5 col-12">
          <MUITextField label="Name" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12">
          <MUITextField label="Phone number" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12">
          <MUITextField label="Whatsapp number" type='number' />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12">
          <MUITextField label="Email" type='email' />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12">
          <MUITextField label="Event Organizer" type='text' />
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
        <div className="abortBtnHolder p-2 mt-2">
          {/* <Link to="/eventBazaar/account"> */}
            <SimpleMUIButton type="contained" content="Publish" />
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};
export default Step7;
