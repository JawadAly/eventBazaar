import React,{useState,useEffect,createContext,useContext} from 'react';
import { fetchCategs } from '../apis/CategoriesApi';
import { fetchNotifications } from '../apis/NotificationsApi';
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { fetchAllEvents } from '../apis/EventsApi';
import { signOut } from '../apis/AuthService';
import { toast,Zoom } from 'react-toastify';

const centeralStore = createContext();

const MainContext = ({children}) =>{
    const [eventCategs,setEventCategs] = useState([]);
    const [notification,setNotification] = useState([]);
    const[currentLocation,setCurrentLocation] = useState('karachi');
    const[allEvents,setAllEvents] = useState([]);
    const[notificationState,setNotificationState] = useState(true);
    const[token,setToken] = useState('');
    const getAllCateg = async () =>{
        try{
            const resp = await fetchCategs();
            setEventCategs(resp.data.categories);
            // console.log(resp.data.categories);
        }
        catch(error){
            console.log(`Error at apihandlerfunc for categories in maincontext component. Error:${error}`);
        }
    }
    // this function is fired in login page when login occurs
    const getAllNotificaton = async () =>{
        try{
            const bearerToken = getAuthToken();
            const resp = await fetchNotifications(bearerToken);
            if(resp.success && resp.message === ''){
                setNotification(resp.data.events);
                // console.log(resp.data.events);
            }
        }
        catch(error){
            console.log(`Error at apihandlerfunc for notification in maincontext component. Error:${error}`);
        }
    }
    const getAllEvents = async () =>{
        try{
            const resp = await fetchAllEvents(getAuthToken(),currentLocation);
            if(resp.success && resp.message === ''){
                setAllEvents(resp.data.events);
            }
            // console.log(resp.data.events);
        }
        catch(error){
            console.log(`Error at apihandlerfunc for all events in maincontext component. Error:${error.message}`);
        }
    }
    
    useEffect(() => {
        getAllCateg();
        if(isLoggedIn()){
            getAllNotificaton();
            getAllEvents();
        }
    },[]);

    const isLoggedIn = () =>{
        const localStorageObj = JSON.parse(localStorage.getItem('authUserSpecs'));
        if(localStorageObj){
            const authToken = localStorageObj.authToken;
            return !!authToken;
        }
        return false;
    }
    
    const getLoggedInPerson = ()=>{
        if(isLoggedIn()){
            const localStorageObj = JSON.parse(localStorage.getItem('authUserSpecs'));
            const authUser = localStorageObj.usrName;
            return authUser;
        }
        return null;
    }
    const getShortName = () => {
        const name = getLoggedInPerson();
        const parts = name.split('.');
        const initials = parts.map(part => part.charAt(0));
        return initials.join('');
    }
    

    const getAuthToken = () =>{
        if(isLoggedIn()){
            const localStorageObj = JSON.parse(localStorage.getItem('authUserSpecs'));
            const authToken = localStorageObj.authToken;
            return authToken;
        }
        return null;
    }

    const navigate = useNavigate();
    
    const signOutHandler = async() =>{
        try{
            const authToken = getAuthToken();
            const resp = await signOut(authToken);
            if(resp){
                const{success,message} = resp;
                if(success){
                    localStorage.removeItem('authUserSpecs');
                    toast.success('Successfully Signed out!',{transition:Zoom});
                    navigate('/eventBazaar/');
                }
                else{
                    toast.error(message);
                }
            }
        }
        catch(error){
            console.log(`Error at signOutHandlerfunc in maincontext component. Error:${error.message}`);
        }
    }

    const signout = () =>{
        // clearing local storage data
        if(isLoggedIn()){
            signOutHandler();
            localStorage.removeItem('authUserSpecs');
            navigate('/eventBazaar/');
        }
    }
    const separateDateAndTime = (dateTime) =>{
        const dateTimeObj = new Date(dateTime);
        const time = dateTimeObj.toLocaleTimeString('en-US', {
            hour: 'numeric', 
            minute: 'numeric',
            hour12: true 
        });
        const date = dateTimeObj.toLocaleDateString('en-US', {
            month: 'short',   
            day: '2-digit',   
            year: 'numeric'   
        });
        return {date,time};
    }
    const limitWords = (text, wordLimit) => {
        const wordsArray = text.split(' ');  
        if (wordsArray.length <= wordLimit) {
            return text;  
        }
        return wordsArray.slice(0, wordLimit).join(' ') + '...';  
        };
    return(
        <>
            <centeralStore.Provider value={{isLoggedIn,getLoggedInPerson,signout,eventCategs,getAllNotificaton,notification,separateDateAndTime,limitWords,getAllEvents,allEvents,currentLocation,setCurrentLocation,notificationState,setNotificationState,navigate,getShortName}}>
                {children}
            </centeralStore.Provider>
        </>
    );
}
export default MainContext;

export const getCentralStoreData = () =>{
    return useContext(centeralStore);
}