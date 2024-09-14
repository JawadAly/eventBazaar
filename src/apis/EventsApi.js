import axios from "axios";
import { getAuthToken } from "./UserProfileApi";

export const fetchAllEvents = async (authToken,incomingLocation) =>{
    try{
        const resp = await axios.get(`/api/v1/eventify/event/list?filter=${incomingLocation}`,{
            headers:{
                "Content-Type":"application/json",
                // "Authorization":`Bearer ${authToken}`
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

export const addEvent = async (incomingEvent) =>{
    try{
        const authToken = getAuthToken();
        const dateTime = new Date(`${incomingEvent.eventDate}T${incomingEvent.eventTime}`);
        const eventObj = {
            "listing_visibile": true,
            "name": incomingEvent.eventTitle,
            "description": incomingEvent.eventDesc,
            "date_time": dateTime,
            "address": incomingEvent.eventLocation,
            "city": "",
            "latitude": incomingEvent.locationCenterCords.lat,
            "longitude": incomingEvent.locationCenterCords.lng,
            "max_capacity": incomingEvent.eventCapacity,
            "price_type": incomingEvent.isFreeEvent ? 'free':'paid',
            "price_starts_from": incomingEvent.eventStartsFrom,
            "price_goes_upto": incomingEvent.eventGoesUpto,
            "images": [incomingEvent.eventBanner],
            "pass_ids": incomingEvent.passDetails,
            "category_id": incomingEvent.eventCategory,
            "contact": {
                "name": incomingEvent.eventAdderName,
                "phone": incomingEvent.eventAdderPhone,
                "email": incomingEvent.organizerEmail,
                "whatsapp": incomingEvent.organizerWhtsappNum,
                "organization": incomingEvent.organizerName
            }
        }
        const resp = await axios.post('/api/v1/eventify/event/create',eventObj,{
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
        console.log(`Unexpected error occured at addEventApifunc. Details: ${error.message}`);
        throw error;
    }
}

