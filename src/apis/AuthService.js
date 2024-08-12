import axios from 'axios';
const baseUrl = 'http://localhost:3000';

export const signUp = async (userSignUpData) =>{
    try{
        const resp = await axios.post(`${baseUrl}/user/sign-up`,userSignUpData);
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at signUpApiFunction. Details: ${error}`);
        throw error;
    }
};

export const signIn = async (userCredentials) =>{
    try{
        const resp = await axios.post(`${baseUrl}/user/sign-in`,userCredentials);
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at signInApiFunction. Details: ${error}`);
        throw error;
    }
}