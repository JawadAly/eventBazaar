import React,{useState,useEffect} from 'react';
import { getCentralStoreData } from '../components/MainContext';
import CompleteLoader from '../components/CompleteLoader';
import { getPrivacyPOrTerms } from '../apis/Docs';
import GavelIcon from '@mui/icons-material/Gavel';

const TermsAndConds = () =>{
    const [terms,setTerms] = useState('');
    const[errorState,setErrorState] = useState(false);
    const{loadingState,setLoadingState} = getCentralStoreData();
    const getTermsAndCond = async () =>{
        try{
            setLoadingState(true);
            const type = 'terms';
            const resp = await getPrivacyPOrTerms(type);
            if(resp){
                const{success,message,data} = resp;
                if(success && message === '' && data.doc){
                    setTerms(data.doc.text);
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
        getTermsAndCond();
    },[]);
    return(
        <>
             <section className='privacyPolicySection'>
                <div className='container'>
                    <h3 className="mt-4">
                        Terms and Conditions
                        <span className="ms-3">
                            <GavelIcon fontSize='large' className='themeColor' />
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
                                <div dangerouslySetInnerHTML={{__html:terms}}/>
                            )
                        )
                        
                    }
                </div>
            </section>
        </>
    );
}
export default TermsAndConds;