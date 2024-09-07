import React, { useState } from 'react';
import ForgotPassStep1 from './ForgotPassStep1';
import ForgotPassStep2 from './ForgotPassStep2';
import ForgotPassStep3 from './ForgotPassStep3';
import { getCentralStoreData } from '../components/MainContext';

const ForgotPass = () =>{
    const[forgotPassStep,setForgotPassStep] = useState(1);
    const[verifEmail,setVerifEmail] = useState('');
    const{loadingState,setLoadingState} = getCentralStoreData();
    const renderForgotPassSteps = (incomingStep) =>{
        switch(incomingStep){
            case 1:
                return <ForgotPassStep1 loading={loadingState} setLoading={setLoadingState} setEmail={setVerifEmail} currentStep={forgotPassStep} setCurrentStep={setForgotPassStep}/>;
            case 2:
                return <ForgotPassStep2 loading={loadingState} setLoading={setLoadingState} email={verifEmail} currentStep={forgotPassStep} setCurrentStep={setForgotPassStep}/>;
            case 3:
                return <ForgotPassStep3 loading={loadingState} setLoading={setLoadingState} email={verifEmail} currentStep={forgotPassStep} setCurrentStep={setForgotPassStep}/>;
            default:
                return null;
        }
    }
    return(
        <>
            <section className='forgotPassSection'>
                <div className='container'>
                    {
                        renderForgotPassSteps(forgotPassStep)
                    }
                </div>
            </section>
        </>
    );
}
export default ForgotPass;