import axios from "axios";

const getAuthToken = () =>{
    const localStorageObj = JSON.parse(localStorage.getItem('authUserSpecs'));
    if(localStorageObj){
        const authToken = localStorageObj.authToken;
        return authToken;
    }
    return null;
}

export const userChangePass = async (changePassData) =>{
    try{
        const authToken = getAuthToken();
        const resp = await axios.post('/api/v1/eventify/user/change-password',changePassData,{ 
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at changePassApifunc. Details: ${error.message}`);
    }
}