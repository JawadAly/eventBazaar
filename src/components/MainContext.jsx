import React,{useState,useEffect,createContext,useContext} from 'react';
import { fetchCategs } from '../apis/CategoriesApi';
import { fetchNotifications } from '../apis/NotificationsApi';
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const centeralStore = createContext();

const MainContext = ({children}) =>{
    const [eventCategs,setEventCategs] = useState([]);
    const [notification,setNotification] = useState([]);
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
                console.log(resp.data.events);
            }
        }
        catch(error){
            console.log(`Error at apihandlerfunc for notification in maincontext component. Error:${error}`);
        }
    }
    
    useEffect(() => {
        getAllCateg();
        isLoggedIn() ? getAllNotificaton(): null;
        // 
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

    const getAuthToken = () =>{
        if(isLoggedIn()){
            const localStorageObj = JSON.parse(localStorage.getItem('authUserSpecs'));
            const authToken = localStorageObj.authToken;
            return authToken;
        }
        return null;
    }

    const navigate = useNavigate();
    
    const signout = () =>{
        // clearing local storage data
        if(isLoggedIn()){
            localStorage.removeItem('authUserSpecs');
            navigate('/');
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
    return(
        <>
            <centeralStore.Provider value={{isLoggedIn,getLoggedInPerson,signout,eventCategs,getAllNotificaton,notification,separateDateAndTime}}>
                {children}
            </centeralStore.Provider>
        </>
    );
}
export default MainContext;
// export {centeralStore};

export const getCentralStoreData = () =>{
    return useContext(centeralStore);
}