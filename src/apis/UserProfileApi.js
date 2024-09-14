import axios from "axios";

export const getAuthToken = () =>{
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

export const getProfileInfo = async () =>{
    try{
        const token = getAuthToken();
        const resp = await axios.get('/api/v1/eventify/user/detail',{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at getUserProfileApifunc. Details: ${error.message}`);
        throw error;
    }
}

export const updateUserProfileInfo = async (updatedUserData) =>{
    try{
        const token = getAuthToken();
        const resp = await axios.put('/api/v1/eventify/user/edit-profile',updatedUserData,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}` 
            }
        });
        if(resp.status >= 400 ){
            throw new Error(resp.statusText); 
        }
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at updateUserProfileInfoApifunc. Details: ${error.message}`);
        throw error;
    }
}
