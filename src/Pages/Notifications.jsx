import React from "react";
import { BellIcon } from "../components/Socials";
import {eventsNotifications} from '../apis/Notifications';
import NotificationCard from "../components/NotificationCard";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <>
      <section className="notificationsSection">
        <div className="container">
          <h3 className="mt-4">
            Notifications
            <span className="ms-2">
              <BellIcon font="large" colorClass="themeColor" />
            </span>
          </h3>
          <hr />
          <div className="cardsHolder p-2 mb-5">
            {eventsNotifications.map((value, index) => {
              return (
                <Link to={`/eventBazaar/events/${value.eventName}`} className="text-decoration-none">
                    <NotificationCard
                        key={index}
                        id={value.eventId}
                        name={value.eventName}
                        date={value.eventDate}
                        time={value.eventTime}
                        location={value.location}
                        cost={value.price}
                        bgImg={value.backgroundImage}
                        eventOrg={value.eventOrganizer}
                    />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default Notifications;
{/* <EventCard
                  key={index}
                  id={value.eventId}
                  name={value.eventName}
                  date={value.eventDate}
                  time={value.eventTime}
                  location={value.location}
                  cost={value.price}
                  bgImg={value.backgroundImage}
                /> */}