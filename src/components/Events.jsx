import React, { useEffect, useState } from 'react';
// incoming events api data
import { events } from '../apis/EventsData';
import EventCard from './EventCard';
import { CalendarIcon, ClockIcon, ProfileIcon, TagIcon, } from './Socials';
import { fetchCategsList } from '../apis/ListsService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Categories from './Categories';
import SimpleMUIButton from './SimpleMUIButton';
import { Link, NavLink } from 'react-router-dom';

const Events = () =>{
    const[allEventsEnable,allEventsEnableSet] = useState(3);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                }
              },
            {
                breakpoint: 1200,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                
                }
            }
    ]
      };
    // const[eventCategs,setEventCategs] = useState([
    //     'Concert',
    //     'Conference',
    //     'Seminar',
    //     'Party',
    //     'Festival',
    //     'Sports',
    //     'Comedy',
    //     'Stage Show',
    //     'Qawali'
    // ]);
    // const getCategsList = async() =>{
    //     try{
    //         const resp = await fetchCategsList();
    //         setEventCategs(()=>{
    //             return[
    //                 ...resp
    //             ];
    //         });
    //     }
    //     catch(error){
    //         alert(error);
    //     }
    // }
    // useEffect(()=>{
    //     getCategsList();
    // },[]);
    return(
        <>
            <section className='eventsSection pb-5'>
                <div className='container'>
                {/* categories section */}
                <Categories/>
                {/* categories section */}
                {/* featured events section */}
                    <h3 className='eventsSecHeading ps-3 mb-3' style={{color:'#bc2649'}}>Featured</h3>
                    <div className='featuredCardsHolder p-2 w-100 pb-5'>
                    
                    <Slider {...settings}>
                    {
                        events.map((value,index)=>{
                            return(
                                <>
                                <Link to={`/events/${value.eventName}`}  className='featCardAnchor'>
                                    <div key={index} className='featuredCard me-5'>
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
                                </Link>
                                </>
                            );
                        })
                    }
                            
                    </Slider>
                        
                    </div>
                    {/* featured events section */}

                    <h3 className='eventsSecHeading ps-3 mb-3'>Coming Up Next</h3>
                    <div className='cardsHolder p-3 mb-5'>
                        {events.filter((value,index)=> index < allEventsEnable).map((value,index)=>{
                            return(
                                <EventCard key={index} id={value.eventId} name={value.eventName} date={value.eventDate} time={value.eventTime} location={value.location} cost={value.price} bgImg={value.backgroundImage}/>
                            );
                        })}   
                    </div>
                    <div className='eventPagesData'>
                        <p className='text-center'>Showing <span className='themeColor'>{allEventsEnable}</span> out <span className='themeColor'>{events.length}</span> Events  {allEventsEnable != 3 ? <NavLink onClick={()=> allEventsEnableSet(3)} style={{color:'#bc2649'}}>See Less</NavLink> : <NavLink onClick={()=> allEventsEnableSet(events.length)} style={{color:'#bc2649'}}>See All</NavLink>}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Events;