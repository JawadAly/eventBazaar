import React, { useState ,useEffect } from "react";
import { BellIcon } from "../components/Socials";
import {eventsNotifications} from '../apis/Notifications';
import NotificationCard from "../components/NotificationCard";
import { Link, useNavigate } from "react-router-dom";
import { getCentralStoreData } from "../components/MainContext";
import { toast } from 'react-toastify';
import MUIProgress from "../components/MUIProgress";

const Notifications = () => {
  const{isLoggedIn,notification,separateDateAndTime,limitWords,notificationState} = getCentralStoreData();
  const navigate = useNavigate();
  // const[screenWidth,setScreenWidth] = useState(window.innerWidth);
  

  // const limitWords = (text, wordLimit) => {
  //     const wordsArray = text.split(' ');  
  //     if (wordsArray.length <= wordLimit) {
  //         return text;  
  //     }
  //     return wordsArray.slice(0, wordLimit).join(' ') + '...';  
  //     };
    

  useEffect(()=>{
    if(!isLoggedIn()){
        toast.error('You must be logged in in-order to continue!');
        navigate('/eventBazaar/login');
    }
    if(!notificationState){
      toast.error('Your notification state is off kindly turn it on from account settings!');
      navigate('/eventBazaar/account');
    }
  },[isLoggedIn,navigate]);
  
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
              {
                notification.length === 0 ? (
                  <div className='text-center w-100 p-4'>
                    <MUIProgress/>
                  </div>
                  ):(
                <div className="cardsHolder p-2 mb-5">
                    {
                notification.map((value, index) => {
                return (
                  <Link to={`/eventBazaar/events/${value.name}`} className="text-decoration-none">
                      <NotificationCard
                          key={index}
                          id={value.id}
                          name={window.innerWidth<=576 ?  limitWords(value.name,2) : limitWords(value.name,3)}
                          date={separateDateAndTime(value.date_time).date}
                          time={separateDateAndTime(value.date_time).time}
                          // location={event}
                          cost={value.price_type}
                          bgImg={value.images[0]}
                          eventOrg={window.innerWidth<=576 ? limitWords(value.contact.name,2):limitWords(value.contact.name,3) }
                      />
                  </Link>
                );
              })
                    }
            </div>
            )
              }
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