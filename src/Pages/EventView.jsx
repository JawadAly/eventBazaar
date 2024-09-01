import React, { useEffect, useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { events } from '../apis/EventsData';
import Error from './Error';
import { CalendarIcon, ChatIcon, ClockIcon, GroupIcon, LocationIcon, MailIcon, MoreTags, PhoneIcon, ReduIcon, WhtsappIcon } from '../components/Socials';
import 'animate.css';
import { getCentralStoreData } from '../components/MainContext';
import { toast } from 'react-toastify';

const EventView = () =>{
    const[event,setEvent] = useState(null);
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
    const{allEvents,separateDateAndTime,isLoggedIn} = getCentralStoreData();
    const {eventName} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn()){
            toast.error('You must be logged in in-order to continue!');
            navigate('/eventBazaar/login');
            return;
        }
        if(allEvents.length > 0 && eventName){
            const incomingEvent = allEvents.filter((value) => eventName.trim().toLowerCase() === value.name.trim().toLowerCase());
            setEvent(incomingEvent[0]);
        }
    },[allEvents,isLoggedIn()]);

    if(event){
        const bgMimicStyle = {
            backgroundImage: `url(${event.images[0]})`
        }
        return(
            <>
                <section className='eventViewSec'>
                    <div className='container'>
                        <div className='eventViewHolder p-2 mt-3'>
                            <div className='eventViewImgHolder mb-4'>
                                <div className='bgMimic' style={bgMimicStyle}></div>
                                <img className='eventViewImg img-fluid' src={event.images[0]} alt={event.name}/>
                            </div>
                            <div className='eventViewDetails'>
                                <p className='eventViewDate mb-1'><CalendarIcon /> {separateDateAndTime(event.date_time).date }</p>
                                <div className='d-flex align-items-center justify-content-between mb-2 flex-wrap'>
                                    <h1 className='eventViewNameHeading'>{event.name}</h1>
                                    <span className='eventViewPrice d-flex align-items-center justify-content-center flex-wrap p-1 animate_animated animate__heartBeat'>{event.price > 0 ? 'Rs.' : ''} {event.price}</span>
                                </div>
                                <p className='eventSalutation mb-4 text-dark'>Hey there! Join us at the upcoming {event.name} Event at {event.location} and book your {event.price > 0 ? 'Rs' :''} {event.price} ticket now for a chance to explore excitement and joy.</p>
                                <form className='custInterestForm mb-4 bg-secondary p-3'>
                                    <input id='amInterested' type='radio' name='userInterest' onChange={detectInterestChange} value='true'/>
                                    <label htmlFor='amInterested' className='ms-3 mb-2'>I am interested in this event</label>
                                    <br/>
                                    <input id='amGoing' type='radio' name='userInterest' onChange={detectInterestChange} value='true' />
                                    <label htmlFor='amGoing' className='ms-3'>I am going in this event</label>
                                </form>
                                <h4 className='eventViewDateTime mb-4'>Contact</h4>
                                <div className='contactArea p-3 mb-5'>
                                    <p className='addLister text-center'>{event.contact.name} -Ad Lister</p>
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
                                <p className='eventSalutation mb-4'><ClockIcon /> <span className='text-dark'> {separateDateAndTime(event.date_time).date} {separateDateAndTime(event.date_time).time} </span></p>
                                <h4 className='eventViewDateTime'>Location</h4>
                                <p className='eventSalutation mb-4'><LocationIcon /> <span className='text-dark'> {event.location} </span><Link style={{marginLeft:'10px',color:'#bc2649'}}> Veiw Location <ReduIcon/> </Link> </p>
                                <h4 className='eventViewDateTime'>Event Type and Max Capacity</h4>
                                <p className='eventSalutation mb-4'><MoreTags /> <span className='text-dark me-4'> Public Event </span> <GroupIcon font='large'/> <span className='text-dark'> 300 </span></p>
                                <h4 className='eventViewDateTime'>Description</h4>
                                <details className='eventViewDesc mb-4'>
                                    <summary className='pb-2'>Click to View</summary>
                                    <p>{event.description}</p>
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