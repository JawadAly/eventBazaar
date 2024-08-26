import React from 'react';
import { useParams } from 'react-router-dom';
import { eventsNotifications } from '../apis/Notifications';
import Error from './Error';
import { CalendarIcon, MailIcon,ChatIcon,WhtsappIcon,PhoneIcon,ClockIcon,LocationIcon,ReduIcon,MoreTags,GroupIcon, ProfileIcon } from '../components/Socials';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import LightbulbCircleOutlinedIcon from '@mui/icons-material/LightbulbCircleOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { Link } from 'react-router-dom';

const ListerEventView = () =>{
    const {eventName} = useParams();
    const incomingEvent = eventsNotifications.find((value,index)=> (value.eventName === eventName) ? value : null);
    const bgMimicStyle = {
        backgroundImage: `url(${incomingEvent.backgroundImage})`
    }
    if(incomingEvent){
        return(
            <>
                <section className='eventViewSec'>
                    <div className='container'>
                        <div className='eventViewHolder p-2 mt-3'>
                            <div className='eventViewImgHolder mb-4'>
                                <div className='bgMimic' style={bgMimicStyle}></div>
                                <img className='eventViewImg img-fluid' src={incomingEvent.backgroundImage} alt={incomingEvent.eventName}/>
                            </div>
                            <div className='eventViewDetails'>
                                <p className='eventViewDate mb-1'><CalendarIcon /> {incomingEvent.eventDate}</p>
                                <div className='d-flex align-items-center justify-content-between mb-2 flex-wrap'>
                                    <h1 className='eventViewNameHeading'>{incomingEvent.eventName}</h1>
                                    <span className='eventViewPrice d-flex align-items-center justify-content-center flex-wrap p-1 animate_animated animate__heartBeat'>{incomingEvent.price > 0 ? 'Rs.' : ''} {incomingEvent.price}</span>
                                </div>
                                <p className='eventSalutation mb-4 text-dark'>
                                    <ProfileIcon/> {incomingEvent.eventOrganizer}
                                </p>
                                <div className='eventMetricsArea mb-4'>
                                    <div className='eventMetric'>
                                        <RemoveRedEyeOutlinedIcon fontSize='large' className='themeColor'/>
                                        <p className='metricText'>0 people viewed</p>
                                    </div>
                                    <div className='eventMetric'>
                                        <BookmarkAddOutlinedIcon fontSize='large' className='themeColor'/>
                                        <p className='metricText'>0 people saved</p>
                                    </div>
                                    <div className='eventMetric'>
                                        <LightbulbCircleOutlinedIcon fontSize='large' className='themeColor'/>
                                        <p className='metricText'>0 are interested</p>
                                    </div>
                                    <div className='eventMetric'>
                                        <DoneAllOutlinedIcon fontSize='large' className='themeColor'/>
                                        <p className='metricText'>0 are coming</p>
                                    </div>
                                </div>
                                <h4 className='eventViewDateTime mb-4'>Contact</h4>
                                <div className='contactArea p-3 mb-5'>
                                    <p className='addLister text-center'>{incomingEvent.eventOrganizer} -Ad Lister</p>
                                    <div className='d-flex align-items-center justify-content-around w-100'>
                                        <div className='socialHolder'>
                                            <MailIcon />
                                        </div>
                                        <div className='socialHolder'>
                                            <ChatIcon />
                                        </div>
                                        <div className='socialHolder'>
                                            <WhtsappIcon />
                                        </div>
                                        <div className='socialHolder'>
                                            <PhoneIcon />
                                        </div>
                                    </div>
                                </div>
                                <h4 className='eventViewDateTime'> Date and Time</h4>
                                <p className='eventSalutation mb-4'><ClockIcon /> <span className='text-dark'> {`${incomingEvent.eventDate} ${incomingEvent.eventTime}`} </span></p>
                                <h4 className='eventViewDateTime'>Location</h4>
                                <p className='eventSalutation mb-4'><LocationIcon /> <span className='text-dark'> {incomingEvent.location} </span><Link style={{marginLeft:'10px',color:'#bc2649'}}> Veiw Location <ReduIcon/> </Link> </p>
                                <h4 className='eventViewDateTime'>Event Type and Max Capacity</h4>
                                <p className='eventSalutation mb-4'><MoreTags /> <span className='text-dark me-4'> Public Event </span> <GroupIcon font='large'/> <span className='text-dark'> 300 </span></p>
                                <h4 className='eventViewDateTime'>Description</h4>
                                <details className='eventViewDesc mb-4'>
                                    <summary className='pb-2'>Click to View</summary>
                                    <p>This is the content inside the details element. It will be visible when you click on the summary above.</p>
                                </details>
                            </div>
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