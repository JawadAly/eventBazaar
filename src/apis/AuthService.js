import axios from 'axios';
const baseUrl = import.meta.env.VITE_BACKENDSERVER_BASEURL;

export const signUp = async (userSignUpData) =>{
    try{
        const jsonData = JSON.stringify(userSignUpData);
        const resp = await axios.post('/api/v1/eventify/user/sign-up',jsonData,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(resp.status >= 400){
            throw new Error(resp.statusText);
        }
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at signUpApiFunction. Details: ${error.message}`);
        throw error;
    }
};

export const signIn = async (userCredentials) =>{
    try{
        const resp = await axios.post('/api/v1/eventify/user/sign-in',userCredentials,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(resp.status >= 400){
            throw new Error(resp.statusText);
        }
        // console.log(resp.data);
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at signInApiFunction. Details: ${error.message}`);
        throw error;
    }
}

export const signOut = async (authtoken) =>{
    try{
        const resp = await axios.delete('/api/v1/eventify/user/sign-out',{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authtoken}`
            }
        });
        if(resp.status >= 400){
            throw new Error(resp.statusText);
        }
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at signoutApiFunction. Details: ${error.message}`);
        throw error;
    }
}

export const verifyUserEmailOrPass = async (verifObj) =>{
    try{
        const jsonObj = JSON.stringify(verifObj);
        const resp = await axios.post('/api/v1/eventify/user/verify',jsonObj,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(resp.status >= 400){
            throw new Error(resp.statusText);
        }
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at verifyUserEmailOrPassFunction. Details: ${error.message}`);
        throw error;
    }

}

export const sendVerification = async (verifEmailOrPass) =>{
    try{
        const jsonData = JSON.stringify(verifEmailOrPass);
        const resp = await axios.post('/api/v1/eventify/user/verify/send',jsonData,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(resp.status >= 400){
            throw new Error(resp.statusText);
        }
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at sendVerificationFunction. Details: ${error.message}`);
        throw error;
    }
}

export const handleForgotPass = async (forgotPassObj) =>{
    try{
        const jsonData = JSON.stringify(forgotPassObj);
        const resp = await axios.post('/api/v1/eventify/user/forgot-password',jsonData,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(resp.status >= 400){
            throw new Error(resp.statusText);
        }
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at handleForgotPassFunction. Details: ${error.message}`);
        throw error;
    }
}