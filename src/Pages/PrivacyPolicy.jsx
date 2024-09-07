import React, { useEffect, useState } from 'react';
import CompleteLoader from '../components/CompleteLoader';
import PolicyIcon from '@mui/icons-material/Policy';
import { getPrivacyPOrTerms } from '../apis/Docs';
import { toast } from 'react-toastify';
import { getCentralStoreData } from '../components/MainContext';

const PrivacyPolicy = () =>{
    const [privacyPolicy,setPrivacyPolicy] = useState('');
    const[errorState,setErrorState] = useState(false);
    const{loadingState,setLoadingState} = getCentralStoreData();
    const getPrivacyPolicy = async () =>{
        try{
            setLoadingState(true);
            const type = 'privacy';
            const resp = await getPrivacyPOrTerms(type);
            if(resp){
                const{success,message,data} = resp;
                if(success && message === '' && data.doc){
                    setPrivacyPolicy(data.doc.text);
                }
                else{
                    toast.error(message);
                }
            }
        }
        catch(error){
            setErrorState(true);
            console.log(`getPrivacyPolicy Error at apihandler at privacy policy page. Details: ${error.message}`);
        }
        finally{
            setLoadingState(false);
        }
    }

    useEffect(()=>{
        getPrivacyPolicy();
    },[]);
    return(
        <>
            <section className='privacyPolicySection'>
                <div className='container'>
                    <h3 className="mt-4">
                        Privacy Policy
                        <span className="ms-2">
                            <PolicyIcon fontSize='large' className='themeColor' />
                        </span>
                    </h3>
                    <hr/>
                    {
                        errorState ? (
                            <>
                                <div className='errorSvgHolder pt-4'> 
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                </div>
                                <p className='text-center themeColor'>An Error Occured at our end please refresh page or try again later!</p>
                            </>
                        ) : (
                            loadingState ? (
                                <CompleteLoader/>
                            ) : (
                                <div dangerouslySetInnerHTML={{__html:privacyPolicy}}/>
                            )
                        )
                        
                    }
                </div>
            </section>
        </>
    );
}
export default PrivacyPolicy;