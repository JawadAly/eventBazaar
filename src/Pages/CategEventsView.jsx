import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCentralStoreData } from '../components/MainContext';
import EventCard from '../components/EventCard';
import CompleteLoader from '../components/CompleteLoader';
import Error from './Error';

const CategEventsView = () =>{
    const{eventCategName} = useParams();
    const {eventCategs,allEvents,errorState,loadingState} = getCentralStoreData();
    const[doesCategExists,setDoesCategExists] = useState(true);
    const[categEvents,setCategEvents] = useState([]);

    const fetchCategEvents = (incomingCategId) =>{
        const filteredCategEvents = allEvents.filter((val,index)=> val.category.id === incomingCategId);
        if(filteredCategEvents){
            setCategEvents(filteredCategEvents);
            // console.log(filteredCategEvents);
        }
    }
    useEffect(()=>{
        if(eventCategs && eventCategName && allEvents){
            const incomingCateg = eventCategs.find((val,index)=> eventCategName === val.name);
            if(incomingCateg){
                const incomingCategId = incomingCateg.id;
                fetchCategEvents(incomingCategId);
            }
            else{
                setDoesCategExists(false);
            }
        }
    },[eventCategName,eventCategs,allEvents]);
    if(doesCategExists){
        return(
            <section className='savedEventsSection'>
                <div className='container'>
                    <h3 className='mt-4'>
                        {`${eventCategName} Events`}
                        {/* <span className='ms-2'>
                            <BkMarkIcon font='medium'/>
                        </span> */}
                    </h3>
                    <hr/>
                    {
                        errorState ? (
                            <>
                                <div className='errorSvgHolder pt-4'> 
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                </div>
                                <p className='text-center themeColor'>An Error Occured at our end please refresh page or try again later!</p>
                            </>
                        ) : (
                            loadingState ? (
                                <CompleteLoader/>
                            ) : (
                                categEvents.length === 0 ? (
                                    <>
                                        <div className='errorSvgHolder pt-4'> 
                                            <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                        </div>
                                        <p className='text-center themeColor'>Currently there are no events to show!</p>
                                    </>
                                ) : (
                                    <div className='cardsHolder p-2 mb-5'>
                                        {
                                            categEvents.map((value,index)=>{
                                            return(
                                                <EventCard key={index} id={value.id} name={value.name} dateTime={value.date_time} organizer={value.contact.name} cost={value.price_type} bgImg={value.images[0]}/>
                                                );
                                            })
                                        }   
                                    </div>
                                )
                            )
                        )
                    }
                </div>    
            </section>                    
        );
    }
    else{
        return <Error/>;
    }
}
export default CategEventsView;