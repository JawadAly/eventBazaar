import React from 'react';
import {eventsNotifications} from '../apis/Notifications'
import { ProfileIcon } from '../components/Socials';
import ListerEventCard from '../components/ListerEventCard';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const MyEvents = () =>{
    return(
        <>
            <section className='myEventsSection position-relative'>
                <div className='container'>
                    <h3 className='mt-4'>
                        Your Events
                        <span className='ms-2'>
                            <ProfileIcon font='large' colorClass='themeColor'/>
                        </span>
                    </h3>
                    <hr/>
                    {/* <div className='savedEventsContainer'></div> */}
                    <div className='cardsHolder p-2 mb-5'>
                        {eventsNotifications.map((value,index)=>{
                            return(
                                <ListerEventCard key={index} id={value.eventId} name={value.eventName} date={value.eventDate} time={value.eventTime} location={value.location} cost={value.price} bgImg={value.backgroundImage} eventOrg={value.eventOrganizer} />
                            );
                        })}   
                    </div>
                    <div className="eventAdditioAnotherBtn text-end pb-4">
                        <Link to='/eventBazaar/addEvent'>
                            <IconButton aria-label="delete" size="large" style={{backgroundColor:'#bc2649',color:'white'}}>
                            <AddIcon fontSize="inherit" />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
export default MyEvents;