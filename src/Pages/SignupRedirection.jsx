import React, { useEffect } from 'react';
import { getCentralStoreData } from '../components/MainContext';
import { toast } from 'react-toastify';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

const SignupRedirection = () =>{
    const{isLoggedIn,navigate} = getCentralStoreData();
    useEffect(()=>{
        if(!isLoggedIn()){
            toast.error('You must be logged in in order to continue!');
            navigate('/eventBazaar/login');
            return;
        }
    },[isLoggedIn]);
    return(
        <>
            <section className='signupRedirectionSection'>
                <div className='container'>
                    <h3 className='mt-4'>
                        What are you looking for ?
                    </h3>
                    <hr/>
                    <div className='alighner d-flex align-items-center justify-content-center mb-4'>
                        <div className='boxesHolder w-100 p-2'>
                                <div 
                                className='signUpRedirectBox'
                                onClick={()=>{
                                    navigate('/eventBazaar/');
                                    toast('🎉 Welcome to Event Bazaar!');   
                                }}
                                >
                                    <div className='signUpRedirectBoxContent'>
                                        <h4>I am someone who is here to discover events</h4>
                                        <TravelExploreIcon style={{fontSize:'60px'}}/>
                                    </div>
                                </div>
                                <div 
                                className='signUpRedirectBox'
                                onClick={()=>{
                                    navigate('/eventBazaar/account');
                                    toast('🎉 Welcome to Event Bazaar!');   
                                }}
                                >
                                    <div className='signUpRedirectBoxContent'>
                                        <h4>I am someone looking to post events</h4>
                                        <StarIcon style={{fontSize:'60px'}}/>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default SignupRedirection;