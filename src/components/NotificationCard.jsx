import React from 'react';
import { CalendarIcon, ClockIcon, ProfileIcon } from './Socials';

const NotificationCard = ({id,name,date,time,location,cost,bgImg,eventOrg}) =>{
    const bgStyle = {
        backgroundImage: `url(${bgImg})`
    }
    return(
        <>
            <div className='notifCard p-2'>
                <div className='d-flex justify-content-between notifCardFlexer'>
                    <div className='notifiPageImgHolder' style={bgStyle}>
                        {/* <img src={bgImg} className='notifiPageImg' alt={name}/> */}
                    </div>
                    <div className='notifInfoArea w-100 p-1 ps-2 d-flex flex-column'>
                        <h5 className='pageNotifTitle mb-0 text-dark'>{name}</h5>
                        <p className='pageNotifOrg mb-0 fw-bold text-dark'>
                            <ProfileIcon font='small' colorClass='themeColor'/> {eventOrg}
                        </p>
                        <p className='mb-0 text-end themeColor'>
                            <ClockIcon font='small'/> {time}
                        </p>
                        <p className='mb-0 text-end themeColor'>
                            <CalendarIcon font='small'/> {date}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default NotificationCard;