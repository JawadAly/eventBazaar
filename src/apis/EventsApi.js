import axios from "axios";

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