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
                                    easyevent.digital@gmail.com
                                </span>
                                
                            </p>
                            <p className='ms-2'>
                                <PhoneIcon font='small'/>
                                <span className='ms-2'>
                                    +92 3032162790
                                </span>
                                
                            </p>
                        </div>
                        <div className='topBarSocials'>
                            <ul className='list'>
                                {/* <li>
                                    <a href='#'>
                                        <TwittIcon font='small'/>
                                    </a>
                                </li> */}
                                <li>
                                    <a href='https://www.facebook.com/share/oY6ZYjwnrCBmHCTR/?mibextid=qi2Omg'>
                                        <FacebIcon font='small'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='https://www.linkedin.com/company/event-bazaarpk/'>
                                        <LinkedIcon font='small'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='https://www.instagram.com/event.bazaar/'>
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