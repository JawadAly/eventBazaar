import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { events } from '../apis/EventsData';
import Error from './Error';
import { CalendarIcon, ChatIcon, ClockIcon, GroupIcon, LocationIcon, MailIcon, MoreTags, PhoneIcon, ReduIcon, WhtsappIcon } from '../components/Socials';
import 'animate.css';

const EventView = () =>{
    const[userInterest,setUserInterest] = useState({
        amInterested : false,
        amGoing : false
    });
    const detectInterestChange = (event) =>{
        // console.log(event.target.id);
        // console.log(event.target.value);
        const id = event.target.id;
        const value = event.target.value;
        setUserInterest(()=>{
            if(id === 'amInterested'){
                return{
                    amInterested:value,
                    amGoing:false
                };
            }
            else{
                return{
                    amInterested:false,
                    amGoing:value
                };
            }
        });
    }
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
                                <div className='d-flex align-items-center justify-content-between mb-2 flex-wrap'>
                                    <h1 className='eventViewNameHeading'>{incomingEvent.eventName}</h1>
                                    <span className='eventViewPrice d-flex align-items-center justify-content-center flex-wrap p-1 animate_animated animate__heartBeat'>{incomingEvent.price > 0 ? 'Rs.' : ''} {incomingEvent.price}</span>
                                </div>
                                <p className='eventSalutation mb-4 text-dark'>Hey there! Join us at the upcoming {incomingEvent.eventName} Event at {incomingEvent.location} and book your {incomingEvent.price > 0 ? 'Rs' :''} {incomingEvent.price} ticket now for a chance to explore excitement and joy.</p>
                                <form className='custInterestForm mb-4 bg-secondary p-3'>
                                    <input id='amInterested' type='radio' name='userInterest' onChange={detectInterestChange} value='true'/>
                                    <label htmlFor='amInterested' className='ms-3 mb-2'>I am interested in this event</label>
                                    <br/>
                                    <input id='amGoing' type='radio' name='userInterest' onChange={detectInterestChange} value='true' />
                                    <label htmlFor='amGoing' className='ms-3'>I am going in this event</label>
                                </form>
                                <h4 className='eventViewDateTime mb-4'>Contact</h4>
                                <div className='contactArea p-3 mb-5'>
                                    <p className='addLister text-center'>arts council of pakistan -Ad Lister</p>
                                    <div className='d-flex align-items-center justify-content-around w-100'>
                                        <div className='socialHolder'>
                                            <MailIcon />
                                        </div>
                                        <div className='socialHolder'>
                                            <ChatIcon />
                                        </div>
                                        <div className='socialHolder'>
                                            <WhtsappIcon />
                                        </div>
                                        <div className='socialHolder'>
                                            <PhoneIcon />
                                        </div>
                                    </div>
                                </div>
                                <h4 className='eventViewDateTime'> Date and Time</h4>
                                <p className='eventSalutation mb-4'><ClockIcon /> <span className='text-dark'> {`${incomingEvent.eventDate} ${incomingEvent.eventTime}`} </span></p>
                                <h4 className='eventViewDateTime'>Location</h4>
                                <p className='eventSalutation mb-4'><LocationIcon /> <span className='text-dark'> {incomingEvent.location} </span><Link style={{marginLeft:'10px',color:'#bc2649'}}> Veiw Location <ReduIcon/> </Link> </p>
                                <h4 className='eventViewDateTime'>Event Type and Max Capacity</h4>
                                <p className='eventSalutation mb-4'><MoreTags /> <span className='text-dark me-4'> Public Event </span> <GroupIcon font='large'/> <span className='text-dark'> 300 </span></p>
                                <h4 className='eventViewDateTime'>Description</h4>
                                <details className='eventViewDesc mb-4'>
                                    <summary className='pb-2'>Click to View</summary>
                                    <p>This is the content inside the details element. It will be visible when you click on the summary above.</p>
                                </details>
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