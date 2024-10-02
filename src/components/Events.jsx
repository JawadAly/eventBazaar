import React, { useEffect, useState } from 'react';
import axios from 'axios';
// incoming events api data
import { events } from '../apis/EventsData';
import EventCard from './EventCard';
import { CalendarIcon, ClockIcon, LocationIcon, ProfileIcon, TagIcon, } from './Socials';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Categories from './Categories';  
import { Link, NavLink } from 'react-router-dom';
import MUIProgress from './MUIProgress';
import ModalWindow from './MUIModelWindow';
import MUITextField from './MUITextField';
import SearchIcon from '@mui/icons-material/Search';
import { jsonCityList } from '../apis/CitiesList';
import { getCentralStoreData } from './MainContext';

const Events = () =>{
    const{currentLocation,setCurrentLocation,allEvents,loadingState,setLoadingState,errorState} = getCentralStoreData();
    const[allEventsEnable,allEventsEnableSet] = useState(15);
    // const[currentLocation,setCurrentLocation] = useState('karachi');
    // const[incomingEvents,setIncomingEvents] = useState([]);
    const[searchItem,setSearchItem] = useState('');
    const[citiesData,setCitiesData] = useState(jsonCityList);
    // const[loadingState,setLoadingState] = useState(false);
    // const fetchIncomingEvents = async () =>{
    //     try{
    //         setLoadingState(true);
    //         const resp = await axios.get(`/api/v1/eventify/event/list?filter=${currentLocation}`);
    //         if(resp.data.success){
    //             setIncomingEvents(resp.data.data.events);
    //             // console.log(resp.data.data.events);
    //         }
    //         // console.log(resp.data);
    //         // setLoadingState(false);
    //     }
    //     catch(error){
    //         console.log(`Error at apihandlerfunc in events component. Error:${error}`);
    //         setErrorState(true);
    //     }
    //     finally{
    //         //turning of the loading state
    //         setLoadingState(false);
    //     }
    // }
    // useEffect(()=>{
    //     fetchIncomingEvents();
    // },[currentLocation]);
    const filteredData = citiesData.filter(item =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     responsive: [
    //         {
    //             breakpoint: 1400,
    //             settings: {
    //               slidesToShow: 3,
    //               slidesToScroll: 3,
    //               infinite: true,
    //             }
    //           },
    //         {
    //             breakpoint: 1200,
    //             settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 3,
    //             infinite: true,
    //             }
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2,
    //             infinite: true,
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
                
    //             }
    //         }
    // ]
    //   };
    return(
        <>
            <section className='eventsSection pb-5 mt-4'>
                <div className='container'>
                {/* categories section */}
                {/* <Categories/> */}
                {/* categories section */}

                {/* featured events section */}
                    {/* <h3 className='eventsSecHeading ps-3 mb-3' style={{color:'#bc2649'}}>Featured</h3>
                    <div className='featuredCardsHolder w-100 pb-5'>
                    
                    <Slider {...settings}>
                    {
                        events.map((value,index)=>{
                            return(
                                <>
                                <Link to={`/eventBazaar/events/${value.eventName}`}  className='featCardAnchor'>
                                    <div className='cardCenterer d-flex justify-content-center'>
                                        <div key={index} className='featuredCard'>
                                            <img className='img-fluid featCardImg' src={value.backgroundImage} alt={value.eventName}/>
                                            <div className='featCardData pt-2 ps-3'>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='featEventName'>{value.eventName}</p>
                                                    <span className='featEventCost me-2 p-2 text-center d-flex align-items-center justify-content-center'><TagIcon font='small'/> Rs. {value.price} </span>
                                                </div>
                                                <p className='featEventDateTime mb-2'><CalendarIcon font='small' /> {value.eventDate} . {value.eventTime}</p>
                                                
                                                <p className='featEventLocation'><ProfileIcon font='small' /> {value.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                </>
                            );
                        })
                    }
                            
                    </Slider>
                        
                    </div> */}
                    {/* featured events section */}

                    <div className='d-flex align-items-center justify-content-between mb-2 pe-3'>
                        <h3 className='eventsSecHeading ps-3 '>Near You</h3>
                        <div 
                        className='currentLocationHolder'
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        >
                            <LocationIcon colorClass='themeColor'/> {currentLocation}
                        </div>
                    </div>
                    
                    {
                        errorState ? (
                            <div className="eventViewSec pb-5 mb-3">
                                <div className='errorSvgHolder pt-4'> 
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_error_ocurred.svg" className='emptySvg'/>
                                    <p className='text-center themeColor'>No events to show!</p>
                                </div>
                            </div> 
                        ) : (

                            loadingState ? (<div className='text-center w-100 p-4'>
                                    <MUIProgress/>
                                    </div>):
                            (allEvents.length === 0 ? (
                                <div className="eventViewSec pb-5 mb-3">
                                    <div className='errorSvgHolder pt-4'> 
                                        <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                        <p className='text-center themeColor'>No events to show!</p>
                                    </div>
                                </div>                    
                            ) : (
                                <div className='cardsHolder p-3 mb-5'>
                                    {allEvents.filter((value,index)=> index < allEventsEnable).map((value,index)=>{
                                        return(
                                            <EventCard key={index} id={value.id} name={value.name} dateTime={value.date_time} organizer={value.contact.organization} cost={value.price_type} bgImg={value.images[0]}/>
                                        );
                                    })}   
                                </div>
                            )
                            )
                        )
                        
                    }
                    <div className='eventPagesData'>
                        <p className='text-center'>Showing <span className='themeColor'>{allEventsEnable}</span> out <span className='themeColor'>{allEvents.length}</span> Events  {allEventsEnable != 15 ? <NavLink onClick={()=> allEventsEnableSet(12)} style={{color:'#bc2649'}}>See Less</NavLink> : <NavLink onClick={()=> allEventsEnableSet(allEvents.length)} style={{color:'#bc2649'}}>See All</NavLink>}</p>
                    </div>
                    <ModalWindow>
                    <button
                        id="passModalCloseBtn"
                        type="button"
                        className="btn-close d-none"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                        <div className="modal-body p-4 pe-5">
                          <MUITextField
                            label='Search for a city'
                            startAdornmentIcon={SearchIcon}
                            val={searchItem}
                            changeEvent={(e)=>setSearchItem(e.target.value)}
                          />
                          <div className='citiesListHolder'>
                            <ul className='citiesListHolderUL'>
                            {
                                filteredData.map((value,index)=>{
                                    return(
                                        <li 
                                        key={index}
                                        onClick={()=>{
                                            setSearchItem(value.name);
                                            setCurrentLocation(value.name);
                                            document.getElementById('passModalCloseBtn').click();
                                        }}
                                        >{value.name}</li>
                                    ); 
                                        
                                })
                            }
                            
                            </ul>
                          </div>
                        </div>
                    </ModalWindow>
                </div>
            </section>
        </>
    );
}
export default Events;