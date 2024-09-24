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

export const insertEventImages = async (imagesList) => {
    const uploadPromises = imagesList.map(async (imageFile) => {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('timestamp', Date.now().toString());
      formData.append('api_key', '334784716684813');
      formData.append('upload_preset', 'ynkswnyt');
  
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/djhgeh6nt/image/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        return {
          success: false,
          error: error.toString(),
        };
      }
    });
  
    return Promise.all(uploadPromises); // Wait for all image uploads to complete
  };


  export const addPasses = async (incomingPasses) =>{
    //making passes acc to api request format
    const passes = incomingPasses.map((value) =>{
        return {
            "name": value.passTitle,
            "full_price": value.passFullPrice,
            "discount": {
                "discounted_price": value.passPrice,
                "percentage": value.passDiscount,
                "last_date": value.passExpiryDate

            }
        };
    });
    const requestBody = {passes};
    try{
        const authToken = getAuthToken();
        const resp = await axios.post('/api/v1/eventify/pass/create/all',requestBody,{
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
        console.log(`Unexpected error occured at addPassesApifunc. Details: ${error.message}`);
        throw error;
    }
} 

export const addEvent = async (incomingEvent,incomingImagesAndPasses) =>{
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
            "images": incomingImagesAndPasses.eventImagesUrls,
            "pass_ids": incomingImagesAndPasses.passDetails,
            "category_id": incomingEvent.eventCategory,
            "contact": {
                "name": incomingEvent.eventAdderName,
                "phone": incomingEvent.eventAdderPhone,
                "email": incomingEvent.organizerEmail,
                "whatsapp": incomingEvent.organizerWhtsappNum,
                "organization": incomingEvent.organizerName
            }
        }
        console.log(eventObj);
        // const resp = await axios.post('/api/v1/eventify/event/create',eventObj,{
        //     headers:{
        //         "Content-Type" : "application/json",
        //         "Authorization" : `Bearer ${authToken}`
        //     }
        // });
        // if(resp.status >= 400){
        //     throw new Error(resp.statusText);
        // }
        // return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at addEventApifunc. Details: ${error.message}`);
        throw error;
    }
}

