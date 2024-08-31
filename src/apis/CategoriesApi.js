import axios from "axios";

export const fetchCategs = async () =>{
    try{
        const resp = await axios.get('/api/v1/eventify/category/list',{
            headers:{
                "Content-Type":"application/json"
            }           
        });
        // console.log(resp.data);
        return resp.data;

    }
    catch(error){
        console.log(`Unexpected error occured at fetchCategApifunc. Details: ${error.message}`);
        throw error;
    }
}
