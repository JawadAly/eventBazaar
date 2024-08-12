import axios from 'axios';
const baseUrl = 'http://localhost:3000';

export const fetchCategsList = async () =>{
    try{
        const resp = await axios.get(`${baseUrl}/category/list`);
        return resp.data;
    }
    catch(error){
        console.log(`Unexpected error occured at fetchCategsFunction. Details: ${error}`);
        throw error;
    }
}