import React,{useState,useEffect,createContext,useContext} from 'react';
import { fetchCategs } from '../apis/CategoriesApi';
import { fetchNotifications } from '../apis/NotificationsApi';
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { fetchAllEvents } from '../apis/EventsApi';
import { signOut } from '../apis/AuthService';
import { toast,Zoom } from 'react-toastify';
import { auth } from '../Firebase/firebase';

const centeralStore = createContext();

const MainContext = ({children}) =>{
    const [eventCategs,setEventCategs] = useState([]);
    const[mainSearch,setMainSearch] = useState('');
    const [notification,setNotification] = useState([]);
    const[currentLocation,setCurrentLocation] = useState('karachi');
    const[allEvents,setAllEvents] = useState([]);
    const[notificationState,setNotificationState] = useState(true);
    const[loadingState,setLoadingState] = useState(false);
    const[errorState,setErrorState] = useState(false);
    const[token,setToken] = useState('');
    const getAllCateg = async () =>{
        try{
            setLoadingState(true);
            const resp = await fetchCategs();
            if(resp){
                const{success,message,data} = resp;
                if(success){
                    setEventCategs(data.categories);
                    // console.log(data.categories);
                }
            }
        }
        catch(error){
            console.log(`Error at apihandlerfunc for categories in maincontext component. Error:${error}`);
            setErrorState(true);
        }
        finally{
            setLoadingState(false);
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
            setLoadingState(true);
            const resp = await fetchAllEvents(getAuthToken(),currentLocation);
            if(resp){
                const{success,message,data} = resp;
                if(success && message === ''){
                    setAllEvents(data.events);
                    // console.log(data.events);
                }
            }
        }
        catch(error){
            console.log(`Error at apihandlerfunc for all events in maincontext component. Error:${error.message}`);
            setErrorState(true);
        }
        finally{
            setLoadingState(false);
        }
    }
    
    useEffect(() => {
        getAllCateg();
        if(isLoggedIn()){
            getAllNotificaton();
            // getAllEvents();
        }
    },[]);
    useEffect(()=>{
        // if(isLoggedIn()){
            // getAllNotificaton();
            getAllEvents();
        // }
    },[currentLocation]);

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
        // checking for google signin
        const authUserSpecs = JSON.parse(localStorage.getItem('authUserSpecs'));
        if(authUserSpecs.googleAuth){
            console.log('triggered!');
            try{
                await auth.signOut();
            }   
            catch(error){
                console.log(error.message);
            }
        }
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
            <centeralStore.Provider value={{isLoggedIn,getLoggedInPerson,signout,eventCategs,getAllNotificaton,notification,separateDateAndTime,limitWords,getAllEvents,allEvents,currentLocation,setCurrentLocation,notificationState,setNotificationState,navigate,getShortName,loadingState,setLoadingState,errorState,setErrorState,mainSearch,setMainSearch}}>
                {children}
            </centeralStore.Provider>
        </>
    );
}
export default MainContext;

export const getCentralStoreData = () =>{
    return useContext(centeralStore);
}