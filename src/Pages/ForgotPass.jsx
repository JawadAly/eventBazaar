import React, { useState } from 'react';
import ForgotPassStep1 from './ForgotPassStep1';
import ForgotPassStep2 from './ForgotPassStep2';
import ForgotPassStep3 from './ForgotPassStep3';

const ForgotPass = () =>{
    const[forgotPassStep,setForgotPassStep] = useState(1);

    const renderForgotPassSteps = (incomingStep) =>{
        switch(incomingStep){
            case 1:
                return <ForgotPassStep1 currentStep={forgotPassStep} setCurrentStep={setForgotPassStep}/>;
            case 2:
                return <ForgotPassStep2 currentStep={forgotPassStep} setCurrentStep={setForgotPassStep}/>;
            case 3:
                return <ForgotPassStep3 currentStep={forgotPassStep} setCurrentStep={setForgotPassStep}/>;
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