import React, { createContext, useState } from 'react';
import { toast,Zoom } from 'react-toastify';

const stepContext = createContext();
const EventsContext = ({children}) =>{
    const[currentStep,setCurrentStep] = useState(1);
    const[eventData,setEventData] = useState({
        eventDate:'',
        eventTime:'',
        eventLocation:'',
        locationCenterCords:{
            lat: 30.3894007,
            lng: 69.3532207
        },
        eventCapacity:'',
        isFreeEvent: '',
        eventStartsFrom:'',
        eventGoesUpto:'',
        passDetails:[],
        // eventBanner:'',
        eventImages:[],
        // eventBannerUrl:'',
        eventImagesUrls:[],
        eventTitle:'',
        eventDesc:'',
        eventCategory:'',
        eventAdderName:'',
        eventAdderPhone:'',
        organizerWhtsappNum:'',
        organizerEmail:'',
        organizerName:'',
    });
    const senseEventDataChange = (event) =>{
        const{name,value,files} = event.target;
        setEventData((prevVal)=>{
            if(name === 'eventImages'){
                const incomingFiles = Array.from(files);
                const incomingImagesUrls = incomingFiles.map(file => URL.createObjectURL(file));
                return{
                    ...prevVal,
                    // [name] : incomingFiles,
                    // eventImagesUrls : incomingImagesUrls

                    [name]: [...(prevVal[name] || []), ...incomingFiles],
                    eventImagesUrls: [...(prevVal.eventImagesUrls || []), ...incomingImagesUrls] 
                };
                // const incomingFile = files[0];
                // const imageUrl = URL.createObjectURL(incomingFile);
                // return{
                //     ...prevVal,
                //     [name] : files[0],
                //     eventBannerUrl : imageUrl
                // };
            }
            else{
                return{
                    ...prevVal,
                    [name] : value
                };
            }
            
        });
    }
    const removeEventImage = (eventImageId) =>{
        setEventData((prevVal)=>{
            return{
                ...prevVal,
                eventImages : prevVal.eventImages.filter((val,index) => index !== eventImageId),
                eventImagesUrls : prevVal.eventImagesUrls.filter((val,index) => index !== eventImageId)
            };
        });
    }
    return(
        <>
            <stepContext.Provider value={{currentStep,setCurrentStep,eventData,setEventData,senseEventDataChange,removeEventImage,toast,Zoom}}>
                {children}
            </stepContext.Provider>
        </>
    );
}
export default EventsContext;
export {stepContext};