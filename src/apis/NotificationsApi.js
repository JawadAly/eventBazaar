import axios from "axios";

export const fetchNotifications = async (authToken) =>{
    try{
        const resp = await axios.get('/api/v1/eventify/event/list?filter=alerted',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            }
        });
        // console.log(resp.data);
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at fetchNotification. Details: ${error.message}`);
    }
}