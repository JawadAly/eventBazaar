import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import CustomButton from './CustomMUIBtn';
const Navbar = () =>{
    const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return(
        <>
            
    <div className={`navbar ${isSticky ? 'stickyNav' : ''}`} id='navbar'>
        <div className="container">
            <div className="navInner w-100 d-flex align-items-center justify-content-between">
                <div className="navLogo">
                    <a href="#">
                        <img src='/images/eventBazarLogo.png' alt='brandLogo' className='img-fluid'/>
                    </a>
                </div>
                <input type="checkbox" id="navSideBar" className="d-none checkBoxSider"/>
                <label htmlFor="navSideBar" className="d-none navSideBarBtn d-flex align-items-center justify-content-center flex-column">
                    <div className="upperLine"></div>
                    <div className="middleLine"></div>
                    <div className="lowerLine"></div>
                </label>
                <div className="sideBar pt-2">
                    <ul className="navUl d-flex">
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <NavLink to='/login'>Account</NavLink>
                        </li>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-regular fa-user me-2"></i>
                                    Jawad
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item">Logout</a></li>
                                    <li><a className="dropdown-item">My Dash</a></li>
                                </ul>
                            </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
        </>
    );
}
export default Navbar;