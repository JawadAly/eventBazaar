import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import {events} from '../apis/EventsData';
import { BkMarkIcon } from '../components/Socials';
import { getCentralStoreData } from '../components/MainContext';
import { toast } from 'react-toastify';
import { getSavedEvents } from '../apis/PersonalEventsApi';
import MUIProgress from '../components/MUIProgress';

const SavedEvents = () =>{
    const [loadingState,setLoadingState] = useState(true);
    const [errorState,setErrorState] = useState(false);
    const [savedEvents,setSavedEvents] = useState([]);
    const{isLoggedIn,navigate,separateDateAndTime} = getCentralStoreData();
    
    const fetchSavedEvents = async () =>{
        try{
            const resp = await getSavedEvents();
            if(resp){
                if(resp.success && resp.message === ''){
                    setSavedEvents(resp.data.events);
                    // console.log(resp.data.events);
                }
            }
        }
        catch(error){
            console.log(`Error occured at apihandlerfunc at saved events comp. Error: ${error.message}`);
            setErrorState(true);
        }
        finally{
            // turning off loading sate after successful response
            setLoadingState(false);
        }
    }
    useEffect(()=>{
        if(!isLoggedIn()){
            toast.error('You must be logged in in-order to continue!');
            navigate('/eventBazaar/login');   
            return;
        }
        fetchSavedEvents();
    },[isLoggedIn()]);
    return(
        <>
            <section className='savedEventsSection'>
                <div className='container'>
                    <h3 className='mt-4'>
                        Saved Events
                        <span className='ms-2'>
                            <BkMarkIcon font='medium'/>
                        </span>
                    </h3>
                    <hr/>
                    {/* <div className='savedEventsContainer'></div> */}
                    {
                        errorState ? (
                            <>
                                <div className='errorSvgHolder pt-4'> 
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                </div>
                                <p className='text-center themeColor'>An Error Occured at our end please refresh page or try again later!</p>
                            </>
                        ):(
                            loadingState ? (
                                <div className='w-100 text-center p-4'>
                                    <MUIProgress/>
                                </div>
                            ):(
                                savedEvents.length === 0  ? (
                                    <>
                                        <div className='errorSvgHolder pt-4'> 
                                            <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                        </div>
                                        <p className='text-center themeColor'>Currently there are no events to show!</p>
                                    </>
                                    ):
                                (
                                    <div className='cardsHolder p-2 mb-5'>
                                    {savedEvents.map((value,index)=>{
                                        return(
                                            <EventCard key={index} id={value.id} name={value.name} dateTime={value.date_time} organizer={value.contact.name} cost={value.price_type} bgImg={value.images[0]}/>
                                        );
                                    })}   
                                    </div>
                                )
                    
                            )
                        )
                    }
                    
                </div>
            </section>
        </>
    );
}
export default SavedEvents;