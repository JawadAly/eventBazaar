import React from "react";
import { CalendarIcon, ClockIcon, ProfileIcon, TagIcon, } from './Socials';

const EventCard = ({date,time,location,cost,bgImg}) => {
    const bgImgStyle = {
        backgroundImage: `url(${bgImg})`
    }
    // background-image: url('/images/event1.jpg');
  return (
    <>
      <div className="myCard p-2" style={bgImgStyle}> 
        <div className="eventDateTime d-flex flex-column justify-content-center ps-1">
          <span className="mb-1">
            <CalendarIcon font="small" />
            {date}
          </span>
          <span>
            <ClockIcon font="small" />
            {time}
          </span>
        </div>
        <div className="locationAndPricingArea w-100 d-flex align-items-center justify-content-between">
          <span className="locationArea d-flex align-items-center justify-content-center p-1">
            <ProfileIcon font="small" />
            {location}
          </span>
          <span className="pricingArea d-flex align-items-center justify-content-center p-1 me-2">
            <TagIcon font="small" />
            {cost}
          </span>
        </div>
      </div>
    </>
  );
};
export default EventCard;
