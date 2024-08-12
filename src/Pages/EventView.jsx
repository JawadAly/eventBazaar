import React from 'react';
import { useParams } from 'react-router-dom';
import { events } from '../apis/EventsData';
import Error from './Error';
import { CalendarIcon, ClockIcon, LocationIcon } from '../components/Socials';
import 'animate.css';

const EventView = () =>{
    const {eventName} = useParams();
    const incomingEvent = events.find((value) => (eventName === value.eventName) ? value : null);
    const bgMimicStyle = {
        backgroundImage: `url(${incomingEvent.backgroundImage})`
    }
    if(incomingEvent){
        return(
            <>
                <section className='eventViewSec'>
                    <div className='container'>
                        <div className='eventViewHolder p-2 mt-3'>
                            <div className='eventViewImgHolder mb-4'>
                                <div className='bgMimic' style={bgMimicStyle}></div>
                                <img className='eventViewImg img-fluid' src={incomingEvent.backgroundImage} alt={incomingEvent.eventName}/>
                            </div>
                            <div className='eventViewDetails'>
                                <p className='eventViewDate mb-1'><CalendarIcon /> {incomingEvent.eventDate}</p>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h1 className='eventViewNameHeading'>{incomingEvent.eventName}</h1>
                                    <span className='eventViewPrice d-flex align-items-center justify-content-center flex-wrap p-1 animate_animated animate__heartBeat'>{incomingEvent.price > 0 ? 'Rs.' : ''} {incomingEvent.price}</span>
                                </div>
                                <p className='eventSalutation mb-4'>Hey there! Join us at the upcoming {incomingEvent.eventName} Event at {incomingEvent.location} and book your {incomingEvent.price > 0 ? 'Rs' :''} {incomingEvent.price} ticket now for a chance to explore excitement and joy.</p>
                                <h4 className='eventViewDateTime'> Date and Time</h4>
                                <p className='eventSalutation mb-4'><ClockIcon/> {`${incomingEvent.eventDate} ${incomingEvent.eventTime}`}</p>
                                <h4 className='eventViewDateTime'>Location</h4>
                                <p className='eventSalutation'><LocationIcon/> {incomingEvent.location}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
    else{
        return <Error/>;
    }
}
export default EventView;