import React, { createContext, useState } from 'react';

const stepContext = createContext();
const EventsContext = ({children}) =>{
    const[currentStep,setCurrentStep] = useState(1);
    const[eventData,setEventData] = useState({
        eventDate:'',
        eventTime:'',
        eventLocation:'',
        eventCapacity:'',
        isFreeEvent: '',
        eventStartsFrom:'',
        eventGoesUpto:'',
        passDetails:[],
        eventBanner:'',
        eventBannerUrl:'',
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
            if(name === 'eventBanner'){
                const incomingFile = files[0];
                const imageUrl = URL.createObjectURL(incomingFile);
                return{
                    ...prevVal,
                    [name] : files[0],
                    eventBannerUrl : imageUrl
                };
            }
            else{
                return{
                    ...prevVal,
                    [name] : value
                };
            }
            
        });
    }
    return(
        <>
            <stepContext.Provider value={{currentStep,setCurrentStep,eventData,setEventData,senseEventDataChange}}>
                {children}
            </stepContext.Provider>
        </>
    );
}
export default EventsContext;
export {stepContext};