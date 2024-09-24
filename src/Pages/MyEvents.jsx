import React, { useState,useEffect } from 'react';
// import {eventsNotifications} from '../apis/Notifications'
import { ProfileIcon } from '../components/Socials';
import ListerEventCard from '../components/ListerEventCard';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { getCentralStoreData } from '../components/MainContext';
import { toast } from 'react-toastify';
import { getPersonallyAddedEvents } from '../apis/PersonalEventsApi';
import MUIProgress from '../components/MUIProgress';

const MyEvents = () =>{
    const [loadingState,setLoadingState] = useState(true);
    const [errorState,setErrorState] = useState(false);
    const [pAddedEvents,setPAddedEvents] = useState([]);
    const{isLoggedIn,navigate,separateDateAndTime} = getCentralStoreData();

    const fetchPersonallyAddedEvents = async () =>{
        try{
            const resp = await getPersonallyAddedEvents();
            if(resp){
                if(resp.success && resp.message === ''){
                    setPAddedEvents(resp.data.events);
                    // console.log(resp.data.events);
                }
            }
        }
        catch(error){
            console.log(`Error occured at apihandlerfunc at my events comp. Error: ${error.message}`);
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
        fetchPersonallyAddedEvents();
    },[isLoggedIn()]);
    return(
        <>
            <section className='myEventsSection position-relative'>
                <div className='container'>
                    <h3 className='mt-4'>
                        Your Events
                        <span className='ms-2'>
                            <ProfileIcon font='large' colorClass='themeColor'/>
                        </span>
                    </h3>
                    <hr/>
                    {/* <div className='savedEventsContainer'></div> */}

                    {
                        errorState ? (
                            <>
                                <div className='errorSvgHolder pt-4'> 
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_error_ocurred.svg" className='emptySvg'/>
                                </div>
                                <p className='text-center themeColor'>An Error Occured at our end please refresh page or try again later!</p>
                            </>
                        ):(
                            loadingState ? (
                                <div className='w-100 text-center p-4'>
                                    <MUIProgress/>
                                </div>
                            ):(
                                pAddedEvents.length === 0 ? (
                                    <>
                                        <div className='errorSvgHolder pt-4'> 
                                            <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                        </div>
                                        <p className='text-center themeColor'>Currently there are no events to show!</p>
                                    </>
                                ):(
                                    <div className='cardsHolder p-2 mb-5'>
                                        {pAddedEvents.map((value,index)=>{
                                            return(
                                                <ListerEventCard key={index} id={value.id} name={value.name} date={separateDateAndTime(value.date_time).date} time={separateDateAndTime(value.date_time).time} cost={value.price_type} bgImg={value.images[0]} eventOrg={value.contact.name} approvalStatus={value.approved_on}/>
                                            );
                                        })}   
                                    </div>
                                )
                            )
                        )
                    }
                    <div className="eventAdditioAnotherBtn text-end pb-4">
                        <Link to='/eventBazaar/addEvent'>
                            <IconButton aria-label="delete" size="large" style={{backgroundColor:'#bc2649',color:'white'}}>
                            <AddIcon fontSize="inherit" />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
export default MyEvents;