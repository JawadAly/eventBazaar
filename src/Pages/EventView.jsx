import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { events } from '../apis/EventsData';
import Error from './Error';
import { CalendarIcon, TagIcon, CardIcon, ChatIcon, ClockIcon, GroupIcon, LocationIcon, MailIcon, MoreTags, PhoneIcon, ReduIcon, WhtsappIcon } from '../components/Socials';
import 'animate.css';
import { getCentralStoreData } from '../components/MainContext';
import { toast,Zoom } from 'react-toastify';
import { markInterestedOrGoingOrBookmarkOrUnbookmark } from '../apis/EventsApi';
import ToggleButton from '@mui/material/ToggleButton';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { getSavedEvents } from '../apis/PersonalEventsApi';
import MUIProgress from '../components/MUIProgress';
import MUIModelWindow from "../components/MUIModelWindow";
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

const EventView = () =>{
    const[event,setEvent] = useState(null);
    const [selected, setSelected] = useState(false);
    const[userInterest,setUserInterest] = useState({
        amInterested : false,
        amGoing : false
    });
    const [modalData, setModalData] = useState({});
    const changePreference = async (incomingPreference) =>{
        try{
            const prefObj = {
                "preference": incomingPreference,
            };
            const resp = await markInterestedOrGoingOrBookmarkOrUnbookmark(event.id,prefObj);
            if(resp){
                const{success,message} = resp;
                if(success){
                    toast.success(`Event successfully marked as ${incomingPreference}!`,{transition:Zoom});
                }
                else{
                    toast.error(message);
                }
            }

        }
        catch(error){
            console.log(`changePreference Error at apihandler at event view page. Details: ${error.message}`);
        }
    }
    const detectInterestChange = (event) =>{
        // console.log(event.target.id);
        // console.log(event.target.value);
        const id = event.target.id;
        // const value = event.target.value;
        setUserInterest(()=>{
            if(id === 'amInterested'){
                // api contact to mark this event interested for user
                changePreference("interested");
                return{
                    amInterested:true,
                    amGoing:false
                };
            }
            else{
                // api contact to mark this event going for user
                changePreference("going");
                return{
                    amInterested:false,
                    amGoing:true
                };
            }
        });
    }
    const handleBookmarkStatusChange = async (bookmarkPref) =>{
        try{
            const prefObj = {
                "bookmarked": bookmarkPref
            };
            const resp = await markInterestedOrGoingOrBookmarkOrUnbookmark(event.id,prefObj);
            if(resp){
                const{success,message} = resp;
                if(success){
                    toast.success(!selected ? `Event added to saved collections of your profile!`:`Event removed from saved collections of your profile!`,{transition:Zoom});
                }
                else{
                    toast.error(message);
                }
            }
        }
        catch(error){
            console.log(`handleBookmarkStatusChange Error at apihandler at event view page. Details: ${error.message}`);
        }
    }
    const isSaved = async () =>{
        try{
            const resp = await getSavedEvents();
            if(resp){
                const{message,success,data} = resp;
                if(success && message === ''){
                    const incomingSavedEvents = data.events;
                    if(incomingSavedEvents.length > 0){
                        const answer = incomingSavedEvents.find((val,index)=> val.id === event.id);
                        if(answer){
                            setSelected(true);
                            // console.log(answer);
                            if(answer.preference.preference){
                                setUserInterest(
                                    answer.preference.preference === 'interested' ?  {
                                        amInterested : true,
                                        amGoing : false
                                    }:{
                                        amInterested : false,
                                        amGoing : true
                                    }
                                );
                            }
                        }
                        // else{
                        //     console.log('not marked!');
                        // }
                    }
                }
            }
        }
        catch(error){
            console.log(`Error occured at apihandlerfunc at saved events comp. Error: ${error.message}`);
        }
        
    }
    // const changeBookmarkPref = () =>{
    //     if(selected){
    //         setSelected(false);
    //     }
    //     else{
    //         setSelected(true);
    //     }
    // }
    const{allEvents,separateDateAndTime,isLoggedIn,navigate,loadingState,errorState,isJsonDesc} = getCentralStoreData();
    const {eventName} = useParams();
    useEffect(()=>{
        if(!isLoggedIn()){
            toast.error('You must be logged in in-order to continue!');
            navigate('/eventBazaar/login');
            return;
        }
        if(allEvents.length > 0 && eventName){
            const incomingEvent = allEvents.filter((value) => eventName.trim().toLowerCase() === value.name.trim().toLowerCase());
            // console.log(incomingEvent);
            setEvent(incomingEvent[0]);
        }
    },[allEvents,isLoggedIn()]);
    useEffect(()=>{
        if(event){
            isSaved();
        }
    },[event]);

    if(errorState){
        return(
            <section className="eventViewSec">
                <div className="container">
                    <div className='errorSvgHolder pt-4'> 
                        <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                        <p className='text-center themeColor'>An Error Occurred at our end, please refresh the page or try again later!</p>
                    </div>
                </div>
            </section>
        );
    }
    if(loadingState){
        return(
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
            backgroundImage: `url(${event.images[0]})`
        }
        const eventDesc = isJsonDesc(event.description);
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
                                <div className='d-flex align-items-center justify-content-between mb-2 flex-wrap'>
                                    <p className='eventViewDate mb-1'><CalendarIcon /> {separateDateAndTime(event.date_time).date }</p>
                                    <div>
                                        <Tooltip title="Passes" arrow placement='left'>
                                            <ToggleButton
                                            className='me-2'
                                            id="modalOpener"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={()=>{
                                                setModalData({
                                            modalTitle: "Passes",
                                            modalContent: 'show passes',
                                            });
                                            }}
                                            >
                                                <CardIcon colorClass='themeColor'/> 
                                            </ToggleButton>
                                        </Tooltip>
                                        <ToggleButton
                                        value="check"
                                        selected={selected}
                                        onChange={()=>{
                                            const newSelected = !selected;
                                            setSelected(newSelected);
                                            handleBookmarkStatusChange(newSelected);
                                        }}
                                        >
                                            <BookmarksIcon className={selected && 'themeColor'}/>
                                        </ToggleButton>
                                    </div>
                                </div>

                                <div className='d-flex align-items-center justify-content-between mb-2 flex-wrap'>
                                    <h1 className='eventViewNameHeading'>{event.name}</h1>
                                    <span className='eventViewPrice d-flex align-items-center justify-content-center flex-wrap p-1 animate_animated animate__heartBeat'>{event.price_type === 'free' ? event.price_type : `Rs. ${event.price_starts_from}`}</span>
                                </div>
                                <p className='eventSalutation mb-4 text-dark'>Hey there! Join us at the upcoming {event.name} Event at {event.location} and book your {event.price > 0 ? 'Rs' :''} {event.price} ticket now for a chance to explore excitement and joy.</p>
                                <form className='custInterestForm mb-4 bg-secondary p-3'>
                                    <input id='amInterested' type='radio' name='userInterest' onChange={detectInterestChange} checked={userInterest.amInterested} value={userInterest.amInterested}/>
                                    <label htmlFor='amInterested' className='ms-3 mb-2'>I am interested in this event</label>
                                    <br/>
                                    <input id='amGoing' type='radio' name='userInterest' onChange={detectInterestChange} checked={userInterest.amGoing} value={userInterest.amGoing} />
                                    <label htmlFor='amGoing' className='ms-3'>I am going in this event</label>
                                </form>
                                <h4 className='eventViewDateTime mb-4'>Contact</h4>
                                <div className='contactArea p-3 mb-5'>
                                    <p className='addLister text-center'>{event.contact.name} -Ad Lister</p>
                                    <div className='d-flex align-items-center justify-content-around w-100'>
                                        <div 
                                        className='socialHolder'
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
                                <h4 className='eventViewDateTime'> Date and Time</h4>
                                <p className='eventSalutation mb-4'><ClockIcon /> <span className='text-dark'> {separateDateAndTime(event.date_time).date} {separateDateAndTime(event.date_time).time} </span></p>
                                <h4 className='eventViewDateTime'>Location</h4>
                                <p className='eventSalutation mb-4'>
                                    <LocationIcon /> 
                                    <span className='text-dark'> {event.location} </span>
                                    <Link style={{marginLeft:'10px',color:'#bc2649'}}>
                                    Veiw Location <ReduIcon/> 
                                    </Link> 
                                </p>
                                <h4 className='eventViewDateTime'>Event Type and Max Capacity</h4>
                                <p className='eventSalutation mb-4'>
                                    <MoreTags /> 
                                    <span className='text-dark me-4'> Public Event </span>
                                    <GroupIcon font='large'/>
                                    <span className='text-dark me-4'> {event.max_capacity} </span>
                                </p>
                                <h4 className='eventViewDateTime'>Description</h4>
                                <details className='eventViewDesc mb-4'>
                                    <summary className='pb-2'>Click to View</summary>
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
                              <div className="modal-body p-4 text-center">
                              {
                                modalData.modalContent === 'show passes' ? (
                                    event.passes.length > 0  ? (
                                        event.passes.map((value,index)=>{
                                            return (
                                            <div className="eventPass p-3 mb-3">
                                                <div className="passTitle text-start">{value.name}</div>
                                                <div className="passDetails d-flex mt-2">
                                                <p className="mb-0">
                                                    <TagIcon font="small" /> {value.discount.discounted_price}
                                                </p>
                                                <s className="percentage ms-3">{value.full_price}</s>
                                                <p className="ms-3 mb-0">
                                                    <ClockIcon font="small" incomingClass="themeColor" />{" "}
                                                    {separateDateAndTime(value.discount.last_date).date}
                                                </p>
                                                </div>
                                            </div>)    
                                        })
                                    ) : (
                                        <h5 className="themeColor">No Passes to show!</h5>
                                    )
                                ) : (
                                        <h5 className="themeColor">{modalData.modalContent}</h5>
                                )
                              }
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
export default EventView;