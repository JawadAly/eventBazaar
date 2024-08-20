import React,{useContext} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Step5 from '../components/Step5';
import Step6 from '../components/Step6';
import Step7 from '../components/Step7';
import { stepContext } from '../components/EventsContext';

const AddEvent = () =>{
    const{currentStep,setCurrentStep} = useContext(stepContext);
    const renderStep = (step) =>{
        switch(step){
            case 1:
                return <Step1/>;
            case 2:
                return <Step2/>;
            case 3:
                return <Step3/>;
            case 4:
                return <Step4/>;
            case 5:
                return <Step5/>;
            case 6:
                return <Step6/>;
            case 7:
                return <Step7/>;
            default:
                return null;
        }
    }
    return(
        <>
            <section className='addEventSection'>
                <div className='container pb-5'>
                    <h3 className='mt-4'>Add Event</h3>
                    <hr/>
                    <div className='stepperHolder w-100 p-3'>
                        <Stepper activeStep={currentStep-1} alternativeLabel orientation='horizontal'>
                            <Step>
                                <StepLabel>DateTime</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Location</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Capcity</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Pricing</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Name & Photo</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Description</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Contact</StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <form>
                        {renderStep(currentStep)}  
                    </form>
                </div>
            </section>
        </>
    );
}
export default AddEvent;