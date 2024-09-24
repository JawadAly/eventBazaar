import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { eventsNotifications } from "../apis/Notifications";
import Error from "./Error";
import {
  CalendarIcon,
  MailIcon,
  ChatIcon,
  WhtsappIcon,
  PhoneIcon,
  ClockIcon,
  LocationIcon,
  ReduIcon,
  MoreTags,
  GroupIcon,
  ProfileIcon,
  TagIcon,
} from "../components/Socials";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LightbulbCircleOutlinedIcon from "@mui/icons-material/LightbulbCircleOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { Link } from "react-router-dom";
import { getCentralStoreData } from "../components/MainContext";
import { toast } from "react-toastify";
import { getPersonallyAddedEvents } from "../apis/PersonalEventsApi";
import MUIModelWindow from "../components/MUIModelWindow";
import MUIProgress from "../components/MUIProgress";

const ListerEventView = () => {
  const [event, setEvent] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [pAddedEvents, setPAddedEvents] = useState([]);
  const [modalData, setModalData] = useState({});
  const { separateDateAndTime, isLoggedIn, navigate,isJsonDesc } = getCentralStoreData();
  const { eventName } = useParams();
  // const incomingEvent = eventsNotifications.find((value,index)=> (value.eventName === eventName) ? value : null);

  const fetchPersonallyAddedEvents = async () => {
    try {
      const resp = await getPersonallyAddedEvents();
      if (resp) {
        if (resp.success && resp.message === "") {
          setPAddedEvents(resp.data.events);
        //   console.log(resp.data.events);
        }
      }
    } catch (error) {
      console.log(
        `Error occured at apihandlerfunc at my events comp. Error: ${error.message}`
      );
      setErrorState(true);
    } finally {
      // turning off loading sate after successful response
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      toast.error("You must be logged in in-order to continue!");
      navigate("/eventBazaar/login");
      return;
    }
    fetchPersonallyAddedEvents();
  }, [isLoggedIn()]);

  useEffect(()=>{
    if (pAddedEvents.length > 0 && eventName) {
        const incomingEvent = pAddedEvents.filter(
          (value) =>
            eventName.trim().toLowerCase() === value.name.trim().toLowerCase()
        );
        setEvent(incomingEvent[0]); 
      }
  },[pAddedEvents,eventName]);

  if (errorState){
    return (
        <section className="eventViewSec">
            <div className="container">
                <div className='errorSvgHolder pt-4'> 
                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_error_ocurred.svg" className='emptySvg'/>
                    <p className='text-center themeColor'>An Error Occurred at our end, please refresh the page or try again later!</p>
                </div>
            </div>
        </section>
    );
  }
  if (loadingState) {
    return (
        <section className="eventViewSec">
            <div className="container">
                <div className='w-100 text-center p-5'>
                    <MUIProgress />
                </div>
            </div>
        </section>
    );
}

if(event){
    const bgMimicStyle = {
        backgroundImage: `url(${event.images[0]})`,
      };
      const eventDesc = isJsonDesc(event.description);
      return (
        <>
          <section className="eventViewSec">
            <div className="container">
                        <div className="eventViewHolder p-2 mt-3">
                          <div className="eventViewImgHolder mb-4">
                              <div className="bgMimic" style={bgMimicStyle}></div>
                              <img
                              className="eventViewImg img-fluid"
                              src={event.images[0]}
                              alt={event.name}
                              />
                          </div>
                          <div className="eventViewDetails">
                              <p className="eventViewDate mb-1">
                              <CalendarIcon /> {separateDateAndTime(event.date_time).date}
                              </p>
                              <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap">
                              <h1 className="eventViewNameHeading">{event.name}</h1>
                              <span className="eventViewPrice d-flex align-items-center justify-content-center flex-wrap p-1 animate_animated animate__heartBeat">
                                  <TagIcon/> {event.price_type === 'free' ? event.price_type : `Rs. ${event.price_starts_from}`}
                              </span>
                              </div>
                              <p className="eventSalutation mb-4 text-dark">
                              <ProfileIcon /> {event.contact.name}
                              </p>
                              <div className="eventMetricsArea mb-4">
                              <div className="eventMetric">
                                  <RemoveRedEyeOutlinedIcon
                                  fontSize="large"
                                  className="themeColor"
                                  />
                                  <p className="metricText">
                                  {event.stats.viewed} people viewed
                                  </p>
                              </div>
                              <div className="eventMetric">
                                  <BookmarkAddOutlinedIcon
                                  fontSize="large"
                                  className="themeColor"
                                  />
                                  <p className="metricText">
                                  {event.stats.bookmarked} people saved
                                  </p>
                              </div>
                              <div className="eventMetric">
                                  <LightbulbCircleOutlinedIcon
                                  fontSize="large"
                                  className="themeColor"
                                  />
                                  <p className="metricText">
                                  {event.stats.interested} are interested
                                  </p>
                              </div>
                              <div className="eventMetric">
                                  <DoneAllOutlinedIcon
                                  fontSize="large"
                                  className="themeColor"
                                  />
                                  <p className="metricText">{event.stats.going} are coming</p>
                              </div>
                              </div>
                              <h4 className="eventViewDateTime mb-4">Contact</h4>
                              <div className="contactArea p-3 mb-5">
                              <p className="addLister text-center">
                                  {event.contact.name} -Ad Lister
                              </p>
                              <div className="d-flex align-items-center justify-content-around w-100">
                                  <div
                                  className="socialHolder"
                                  id="modalOpener"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                      setModalData({
                                      modalTitle: "Ad Lister Email",
                                      modalContent: `${event.contact.email}`,
                                      });
                                  }}
                                  >
                                  <MailIcon />
                                  </div>
                                  <div
                                  className="socialHolder"
                                  // id="modalOpener"
                                  // type="button"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#exampleModal"
                                  >
                                  <ChatIcon />
                                  </div>
                                  <div
                                  className="socialHolder"
                                  id="modalOpener"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                      setModalData({
                                      modalTitle: "Ad Lister Whatsapp Number",
                                      modalContent: `+92 ${event.contact.whatsapp}`,
                                      });
                                  }}
                                  >
                                  <WhtsappIcon />
                                  </div>
                                  <div
                                  className="socialHolder"
                                  id="modalOpener"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                      setModalData({
                                      modalTitle: "Ad Lister Phone Number",
                                      modalContent: `+92 ${event.contact.phone}`,
                                      });
                                  }}
                                  >
                                  <PhoneIcon />
                                  </div>
                              </div>
                              </div>
                              <h4 className="eventViewDateTime"> Date and Time</h4>
                              <p className="eventSalutation mb-4">
                              <ClockIcon /> <span className="text-dark"> {separateDateAndTime(event.date_time).date} {separateDateAndTime(event.date_time).time} </span>
                              </p>
                              <h4 className="eventViewDateTime">Location</h4>
                              <p className="eventSalutation mb-4">
                              <LocationIcon />
                              <span className="text-dark"> {event.address} </span>
                              {/* <br/> */}
                              <Link style={{ marginLeft: "10px", color: "#bc2649" }}>
                                  <ReduIcon /> View Location
                              </Link>
                              </p>
                              <h4 className="eventViewDateTime">
                              Event Type and Max Capacity
                              </h4>
                              <p className="eventSalutation mb-4">
                              <MoreTags />
                              <span className="text-dark me-4"> Public Event </span>
                              <GroupIcon font="large" />
                              <span className="text-dark"> {event.max_capacity} </span>
                              </p>
                              <h4 className="eventViewDateTime">Description</h4>
                              <details className="eventViewDesc mb-4">
                              <summary className="pb-2">Click to View</summary>
                              <p>{eventDesc}</p>
                              </details>
                          </div>
                          <MUIModelWindow>
                              <div className="modal-header">
                              <h5 className="modal-title text-center w-100">
                                  {modalData.modalTitle}
                              </h5>
                              <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                              ></button>
                              </div>
                              <div className="modal-body p-2 text-center">
                              <h5 className="themeColor">{modalData.modalContent}</h5>
                              </div>
                          </MUIModelWindow>
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

export default ListerEventView;


