import React from 'react';
// incoming events api data
import { events } from '../apis/EventsData';
import EventCard from './EventCard';

const Events = () =>{
    return(
        <>
            <section className='eventsSection pb-5'>
                <div className='container'>
                    <h3 className='eventsSecHeading ps-3 mb-3'>Coming Up Next</h3>
                    <div className='cardsHolder p-3'>
                        {events.map((value,index)=>{
                            return(
                                <EventCard key={index} id={value.eventId} date={value.eventDate} time={value.eventTime} location={value.location} cost={value.price} bgImg={value.backgroundImage}/>
                            );
                        })}   
                    </div>
                </div>
            </section>
        </>
    );
}
export default Events;