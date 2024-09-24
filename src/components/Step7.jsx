import React, { useContext, useEffect, useState } from "react";
import MUITextField from "../components/MUITextField";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import {insertEventImages,addPasses, addEvent} from '../apis/EventsApi';
import { getCentralStoreData } from "./MainContext";
import CompleteLoader from "./CompleteLoader";

const Step7 = () => {
  const { currentStep, setCurrentStep, eventData , setEventData, senseEventDataChange, toast ,Zoom } = useContext(stepContext);
  const{loadingState,setLoadingState} = getCentralStoreData();
  const[finalPassesAndImages,setFinalPassesAndImages] = useState({
    eventImagesUrls:[],
    passDetails:[]
  });

  useEffect(()=>{
    if(finalPassesAndImages.eventImagesUrls.length > 0 && finalPassesAndImages.passDetails.length > 0){
      furtherEventAddition(eventData,finalPassesAndImages);
    }
  },[finalPassesAndImages]);
  const eventImagesAddition = async (incomingImages) =>{
    try{
      const resp = await insertEventImages(incomingImages);
      if(resp){
        const imagesUrls = resp.map((result, index)=>{
          if (!result.success) {
            throw new Error(`Error uploading image ${index + 1}`);
          }
          return result.data.url;
        });
        if(imagesUrls.length !== 0){
          setFinalPassesAndImages({
            eventImagesUrls : imagesUrls,
            passDetails : []
        });
          // setEventData((prevVal)=>{
          //   return{
          //     ...prevVal,
          //     eventImagesUrls : imagesUrls
          //   };
          // });
        }
        
      }
    }
    catch(error){
      toast.error('Error uploading event images.Try again in a moment!');
      console.log(`Unexpected error occured at eventImagesAddition function in Step7 comp.Error: ${error.message}`);
      throw error;
    }
  }

  const executeParallelOperations = async (imagesList, passesList) => {
    console.log('executeParallelOperations occured!');
    try {
      // Use Promise.all to run both operations concurrently
      const [imageResults, passesResults] = await Promise.all([
        insertEventImages(imagesList),  // Image upload function
        addPasses(passesList),  // Passes upload function
      ]);
      console.log(imageResults);
      console.log(passesResults);
      // handle passes errors
      if (!passesResults.success){
        throw new Error('Error uploading passes');
      } 
      // Handle image results
      const imageUrls = imageResults.map((result, index) => {
        if (!result.success) {
          throw new Error(`Error uploading image ${index + 1}`);
        } 
          return result.data.url;
      });
      if(imageUrls.length !== 0 && passesResults.data.pass_ids.length !== 0){
        setFinalPassesAndImages({
            eventImagesUrls : imageUrls,
            passDetails : passesResults.data.pass_ids
        });
        // setEventData((prevVal)=>{
        //   return{
        //     ...prevVal,
        //     eventImagesUrls : imageUrls,
        //     passDetails : passesResults.data.pass_ids
        //   };
        // });
      }

    } catch (error) {
      console.log('Error executing parallel operations:', error.message);
      toast.error(`Operation failed: ${error.message}`);
      throw error;
    }
  };

  const furtherEventAddition = async (incomingEvent,incomingImagesAndPasses) =>{
    // console.log(incomingEvent);
    // console.log(finalPassesAndImages);
    try{
      const resp = await addEvent(incomingEvent,incomingImagesAndPasses);
      if(resp){
        const{success,message} = resp;
        if(success){
          toast.success('Event Added Successfully!');
          console.log(resp);
        }
        else{
          toast.error(message);
        }
      }
    }
    catch(error){
      console.log(`Unexpected error occured at furtherEventAddition at component Step7. Error:${error.message}`);
      toast.error(`Event addition failed: ${error.message}`);
    }
  }
  const performEventAddition = async () =>{
    try{
      setLoadingState(true);
      if(eventData.passDetails.length > 0){
        await executeParallelOperations(eventData.eventImages,eventData.passDetails);
      }
      else{
        await eventImagesAddition(eventData.eventImages);
      }
      //event addition here
      // await furtherEventAddition(eventData);
    }
    catch(error){
      console.log(`Unexpected error occured at performEventAddition at component Step7. Error:${error.message}`);
      toast.error(`Event addition failed: ${error.message}`);
      return; 
    }
    finally{
      setLoadingState(false);
    }
  }

  return (
    <>
      {
        loadingState && <CompleteLoader/>
      }
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
                disabled = {loadingState ? true : false}
                passesFunc={(e) => {
                  e.preventDefault();
                  (eventData.eventAdderName === '' ||
                  eventData.eventAdderPhone === '' ||
                  eventData.organizerWhtsappNum === ''||
                  eventData.organizerEmail === '' ||
                  eventData.organizerName === ''
                  ) ? toast.error('Please fill out the required fields!') : performEventAddition();
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
