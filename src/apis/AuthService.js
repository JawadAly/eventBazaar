import axios from 'axios';
const baseUrl = import.meta.env.VITE_BACKENDSERVER_BASEURL;

export const signUp = async (userSignUpData) =>{
    try{
        const resp = await axios.post(`${baseUrl}/user/sign-up`,userSignUpData);
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at signUpApiFunction. Details: ${error.message}`);
        throw error;
    }
};

export const signIn = async (userCredentials) =>{
    try{
        const jsonData = JSON.stringify({
            "email":userCredentials.userEmail,
            "password":userCredentials.userPass
        });
        // const resp = await axios.post(`${baseUrl}/user/sign-in`,jsonData,{
        const resp = await axios.post('/api/v1/eventify/user/sign-in',jsonData,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        // console.log(resp.data);
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at signInApiFunction. Details: ${error.message}`);
        throw error;
    }
}