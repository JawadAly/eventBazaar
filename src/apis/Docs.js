import axios from "axios";

export const getPrivacyPOrTerms = async (type) =>{
    try{
        const resp = await axios.get(`/api/v1/eventify//utility/docs?type=${type}`,{
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
        console.log(`Unexpected error occured at getPrivacyPOrTermsFunction. Details: ${error.message}`);
        throw error;
    }
}