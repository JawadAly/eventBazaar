import React from "react";
import { CalendarIcon, ClockIcon, ProfileIcon, TagIcon } from "./Socials";
import { Link } from "react-router-dom";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ListerEventCard = ({ name, date, time, location, cost, bgImg, eventOrg,approvalStatus}) => {
  const bgImgStyle = {
    backgroundImage: `url(${bgImg})`,
  };
  // background-image: url('/images/event1.jpg');
  return (
    <>
      <Link to={`/eventBazaar/listerEvents/${name}`} style={{textDecoration:'none'}}>
        <div className="myCard p-2" style={bgImgStyle}>
            <div className="d-flex justify-content-between">
                <div className="eventDateTime d-flex flex-column justify-content-center ps-1">
                    <span className="mb-1">
                    <CalendarIcon font="small" /> {date}
                    </span>
                    <span>
                    <ClockIcon font="small" /> {time}
                    </span>
                </div>
                {
                  !approvalStatus ? (
                    <div className="eventApprovalStatus themeColor p-1">
                        <p className="mb-0"><WarningAmberIcon fontSize="small"/> Pending Approval</p>
                    </div>
                  ) : null
                }
            </div>
          <div className="locationAndPricingArea w-100 d-flex align-items-center justify-content-between">
            <span className="locationArea d-flex align-items-center justify-content-center p-1">
              <ProfileIcon font="small" /> {eventOrg}
            </span>
            <span className="pricingArea d-flex align-items-center justify-content-center flex-wrap p-1 me-2">
              <TagIcon font="small" className='text-white'/> {cost}
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
export default ListerEventCard;
