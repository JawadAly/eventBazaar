import React from 'react';
import { TwittIcon,LinkedIcon,FacebIcon,InstaIcon } from './Socials';
import { MailIcon,PhoneIcon } from './Socials';

const Infobar = () =>{
    return(
        <>
            <div className='informationBar'>
                <div className='container'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='emailAndPhone d-flex align-items-center'>
                            <p>
                                <MailIcon font='small'/>
                                <span className='ms-2'>
                                    info@event-bazaar.pk
                                </span>
                                
                            </p>
                            <p className='ms-2'>
                                <PhoneIcon font='small'/>
                                <span className='ms-2'>
                                    +92 3463654223
                                </span>
                                
                            </p>
                        </div>
                        <div className='topBarSocials'>
                            <ul className='list'>
                                <li>
                                    <a href='#'>
                                        <TwittIcon font='small'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <FacebIcon font='small'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <LinkedIcon font='small'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <InstaIcon font='small'/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Infobar;