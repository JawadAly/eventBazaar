import axios from "axios";
import { getAuthToken } from "./UserProfileApi";

export const getSavedEvents = async () =>{
    try{
        const token = getAuthToken();
        const resp = await axios.get('/api/v1/eventify/event/list?filter=bookmarked',{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}` 
            }
        });
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at getSavedEventsApifunc. Details: ${error.message}`);
        throw error;
    }
}

export const getPersonallyAddedEvents = async () =>{
    try{
        const token = getAuthToken();
        const resp = await axios.get('/api/v1/eventify/event/list?filter=user',{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}` 
            }
        });
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at getPersonallyAddedEventsApifunc. Details: ${error.message}`);
        throw error;
    }
}