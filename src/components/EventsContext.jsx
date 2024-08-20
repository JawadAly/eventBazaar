import React, { createContext, useState } from 'react';

const stepContext = createContext();
const EventsContext = ({children}) =>{
    const[currentStep,setCurrentStep] = useState(1);
    const[eventData,setEventData] = useState({
        eventDate:'',
        eventTime:'',
        eventLocation:'',
        eventCapacity:'',
        isFreeEvent: true,
        eventStartsFrom:'',
        eventGoesUpto:'',
        passDetails:{},
        eventBanner:'',
        eventTitle:'',
        eventDesc:'',
        eventCategory:'',
        userName:'',
        userPhone:'',
        organizerWhtsappNum:'',
        organizerEmail:'',
        organizerName:'',
    });
    const senseEventDataChange = (event) =>{
        const name =  event.target.name;
        const val =  event.target.value;
        setEventData((prevVal)=>{
            return{
                ...prevVal,
                [name] : val
            };
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