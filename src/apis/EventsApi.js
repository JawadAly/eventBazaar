import axios from "axios";
import { getAuthToken } from "./UserProfileApi";

export const fetchAllEvents = async (authToken,incomingLocation) =>{
    try{
        const resp = await axios.get(`/api/v1/eventify/event/list?filter=${incomingLocation}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            }
        });
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at fetchAllEventsApifunc. Details: ${error.message}`);
    }
}

export const markInterestedOrGoingOrBookmarkOrUnbookmark = async (id,incomingResp) =>{
    try{
        const authToken = getAuthToken();
        const resp = await axios.put(`/api/v1/eventify/stats/update?id=${id}`,incomingResp,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}` 
            }
        });
        if(resp.status >= 400){
            throw new Error(resp.statusText);
        }
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at fetchAllEventsApifunc. Details: ${error.message}`);
        throw error;
    }
}

