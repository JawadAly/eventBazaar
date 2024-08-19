import React from 'react';
import EventCard from '../components/EventCard';
import {events} from '../apis/EventsData';
import { BkMarkIcon } from '../components/Socials';

const SavedEvents = () =>{
    return(
        <>
            <section className='savedEventsSection'>
                <div className='container'>
                    <h3 className='mt-4'>
                        Saved Events
                        <span className='ms-2'>
                            <BkMarkIcon font='medium'/>
                        </span>
                    </h3>
                    <hr/>
                    {/* <div className='savedEventsContainer'></div> */}
                    <div className='cardsHolder p-2 mb-5'>
                        {events.map((value,index)=>{
                            return(
                                <EventCard key={index} id={value.eventId} name={value.eventName} date={value.eventDate} time={value.eventTime} location={value.location} cost={value.price} bgImg={value.backgroundImage}/>
                            );
                        })}   
                    </div>
                </div>
            </section>
        </>
    );
}
export default SavedEvents;