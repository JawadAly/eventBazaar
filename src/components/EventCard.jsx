import React from "react";
import { AnotherTagIcon, CalendarIcon, ClockIcon, ProfileIcon, TagIcon } from "./Socials";
import { Link } from "react-router-dom";

const EventCard = ({ name, dateTime, organizer, cost, bgImg }) => {
  const bgImgStyle = {
    backgroundImage: `url(${bgImg})`,
  };
  
  //extracting date and time separatley
  const datetimeObj = new Date(dateTime);
  const date = datetimeObj.toLocaleDateString('en-US', {
        month: 'short',   
        day: '2-digit',   
        year: 'numeric'   
    });
  const time = datetimeObj.toLocaleTimeString('en-US', {
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
    });
  return (
    <>
      <Link to={`/eventBazaar/events/${name}`} style={{textDecoration:'none'}}>
        <div className="myCard p-2" style={bgImgStyle}>
          <div className="eventDateTime d-flex flex-column justify-content-center ps-1">
            <span className="mb-1">
              <CalendarIcon font="small" /> {date}
            </span>
            <span>
              <ClockIcon font="small" /> {time}  
            </span>
          </div>
          <div className="locationAndPricingArea w-100 d-flex align-items-center justify-content-between">
            <span className="locationArea d-flex align-items-center justify-content-center p-1">
              <ProfileIcon font="small" /> {organizer}
            </span>
            <span className="pricingArea d-flex align-items-center justify-content-center flex-wrap p-1 me-2">
              <AnotherTagIcon incomingClass='me-1' font='small' /> {cost}
            </span>
          </div>
          <div className="eventNameHolder">
            <p className="eventNameText">{name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default EventCard;
