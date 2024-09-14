import React, { useState, useContext, useEffect } from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import { CalendarIcon, ClockIcon, TagIcon } from "./Socials";
import ModalWindow from "./MUIModelWindow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Step4 = () => {
  const [passDetails, setPassDetails] = useState({
    passTitle: "",
    passFullPrice: "",
    passPrice: "",
    passDiscount: "",
    passExpiryDate: "",
  });
  const [addOrUpdatePass, setAddOrUpdatePass] = useState(true);
  const[updationKey,setUpdationKey] = useState('');
  const sensePassChange = (e) => {
    const { name, value } = e.target;
    setPassDetails((prevVal) => {
      if (name === "passPrice" && passDetails.passFullPrice !== "") {
        const discountPercent =
          ((passDetails.passFullPrice - value) / passDetails.passFullPrice) *
          100;
        const roundedDiscount = Math.round(discountPercent);
        return {
          ...prevVal,
          [name]: value,
          passDiscount: roundedDiscount,
        };
      }
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };
  const deletePass = (deletionKey) => {
    setEventData((prevVal) => {
      return {
        ...prevVal,
        passDetails: prevVal.passDetails.filter(
          (value, index) => index !== deletionKey
        ),
      };
    });
    toast.success('Pass Deleted!',{transition:Zoom});
  };
  
  const updatePass = (updationKey) => {
    // turning on updation btn in modal
    setAddOrUpdatePass(false);
    const toBeUpdatedPass = eventData.passDetails.find(
      (value, index) => updationKey === index
    );
    console.log(toBeUpdatedPass);
    setPassDetails(() => {
      return toBeUpdatedPass;
    });
    document.getElementById('modalOpener').click();
    // saving this updation key in a state for further updation process
    setUpdationKey(updationKey);
  };
  const {
    currentStep,
    setCurrentStep,
    eventData,
    setEventData,
    senseEventDataChange,
    toast,
    Zoom
  } = useContext(stepContext);
  // const [open, setOpen] = useState(false);
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
                name="eventStartsFrom"
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
                name="eventGoesUpto"
                val={eventData.eventGoesUpto}
                changeEvent={senseEventDataChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-12">
              <div className="d-flex align-items-center justify-content-between p-2 mt-4 pb-1">
                <h5>Pass Details</h5>
                <button
                  id="modalOpener"
                  className="d-none"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Pass
                </button>
                <button
                  // id="modalOpener"
                  className="themeColor addPassBtn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={()=>setAddOrUpdatePass(true)}
                >
                  Add Pass
                </button>
              </div>
              <p className="ps-3 pe-3 text-center">
                You need to add atleast one type of pass for paid events.
              </p>
              {eventData.passDetails.map((value, index) => {
                return (
                  <div className="eventPass p-3 mb-3" key={index}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="passTitle">{value.passTitle}</div>
                      <div className="actions">
                        <EditNoteIcon
                          className="themeColor me-2"
                          onClick={() => updatePass(index)}
                        />
                        <DeleteOutlineIcon
                          className="themeColor"
                          onClick={() => deletePass(index)}
                        />
                      </div>
                    </div>
                    <div className="passDetails d-flex mt-2">
                      <p className="mb-0">
                        <TagIcon font="small" /> {value.passPrice}
                      </p>
                      {
                        value.passPrice ? 
                        <s className="percentage ms-3">{value.passFullPrice}</s> 
                        : <p className="percentage ms-3 mb-0">{value.passFullPrice}</p>
                      }
                      
                      {
                        value.passExpiryDate && (
                          <p className="ms-3 mb-0">
                            <ClockIcon font="small" incomingClass="themeColor" />{" "}
                            {value.passExpiryDate}
                          </p>
                        )
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ModalWindow>
            <div className="modal-header">
              <h5 className="modal-title text-center w-100">Pass Details</h5>
              <button
                id="passModalCloseBtn"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4 pe-5">
              <MUITextField
                label="Pass Name"
                type="text"
                name="passTitle"
                val={passDetails.passTitle}
                changeEvent={sensePassChange}
              />
              <MUITextField
                label="Full Price"
                type="number"
                name="passFullPrice"
                val={passDetails.passFullPrice}
                changeEvent={sensePassChange}
              />
              <p className="p-2">Discount (Optional)</p>
              <div className="row">
                <div className="col-md-6 col-6">
                  <MUITextField
                    label="Price"
                    type="number"
                    name="passPrice"
                    val={passDetails.passPrice}
                    changeEvent={sensePassChange}
                  />
                </div>
                <div className="col-md-6 col-6">
                  <MUITextField
                    label="Percentage"
                    type="number"
                    name="passDiscount"
                    val={passDetails.passDiscount}
                    changeEvent={sensePassChange}
                  />
                </div>
              </div>
              <MUITextField
                startAdornmentIcon={CalendarIcon}
                label="Ending On"
                type="date"
                name="passExpiryDate"
                val={passDetails.passExpiryDate}
                changeEvent={sensePassChange}
              />
              <div className="d-flex align-items-center justify-content-around mt-3">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
                {addOrUpdatePass ? (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{ backgroundColor: "#bc2649" }}
                    onClick={() => {
                      if(passDetails.passTitle === '' || passDetails.passFullPrice === ''){
                        toast.error('Please add title and price for the pass!');
                      }
                      else{
                          setEventData((prevVal) => {
                            return {
                              ...prevVal,
                              passDetails: [...prevVal.passDetails, passDetails],
                            };
                          });
                          toast.success("Pass added successfully",{transition:Zoom});
                          //closing model
                          document.getElementById('passModalCloseBtn').click();
                        }}
                      }
                  >
                    Add Pass
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{ backgroundColor: "#bc2649" }}
                    onClick={(e) => {
                      setEventData((prevVal)=>{
                      const updatedPassArray = prevVal.passDetails.map((value,index)=>{
                        if(index === updationKey){
                            return passDetails;
                        }
                        return value;
                      });
                        return{
                          ...prevVal,
                          passDetails:updatedPassArray
                        };
                      });
                      toast.success('Pass updated successfully!',{transition:Zoom});
                    }}
                  >
                    Update Pass
                  </button>
                )}
              </div>
            </div>
          </ModalWindow>
        </>
      )}

      <div className="col-2 d-flex justify-content-between">
        <div className="continueBtnHolder p-2 mt-2">
          <SimpleMUIButton
            passesFunc={(e) => {
              e.preventDefault();
              if (eventData.isFreeEvent === "") {
                toast.error("Please decide weather your event is free or paid!");
              } else {
                if (eventData.isFreeEvent === "false") {
                  if (
                    eventData.eventStartsFrom === "" ||
                    eventData.eventGoesUpto === ""
                  ) {
                    toast.error(
                      "Please provide lower and upper price for your event"
                    );
                  } else {
                    if(eventData.passDetails.length === 0){
                      toast.error('You need to add atleast one type of pass for paid events.');
                    }
                    else{
                      setCurrentStep(currentStep + 1);
                    }
                  }
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }
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
export default Step4;


