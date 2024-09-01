import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import CustomButton from "./CustomMUIBtn";
import Search from "./Search";
import { eventCategs } from "../apis/Categs";
import { BellIcon, ProfileIcon } from "./Socials";
import { eventsNotifications } from "../apis/Notifications";
import { getCentralStoreData } from "./MainContext";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { isLoggedIn,getLoggedInPerson, signout, eventCategs,notification,separateDateAndTime,limitWords,notificationState } = getCentralStoreData();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
    
  return (
    <>
      <div className={`navbar ${isSticky ? "stickyNav" : ""}`} id="navbar">
        <div className="container">
          <div className="navInner w-100 d-flex align-items-center justify-content-between">
            <div className="navLogo">
              <NavLink to="/eventBazaar/">
                <img
                  src="/eventBazaar/images/eventBazarLogo.png"
                  alt="brandLogo"
                  className="img-fluid"
                />
              </NavLink>
            </div>
            <input
              type="checkbox"
              id="navSideBar"
              className="d-none checkBoxSider"
            />
            <label
              htmlFor="navSideBar"
              className="d-none navSideBarBtn d-flex align-items-center justify-content-center flex-column"
            >
              <div className="upperLine"></div>
              <div className="middleLine"></div>
              <div className="lowerLine"></div>
            </label>
            <div className="sideBar pt-2">
              <ul className="navUl d-flex align-items-center">
                <li>
                  <Search />
                </li>
                <li>
                  <NavLink to="/eventBazaar/">Home</NavLink>
                </li>
                <li className="categoriesDropdown d-none">
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle categsDropdownToggler text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Categories
                    </button>
                    <div className="collapse" id="collapseExample">
                      <ul className="categDropUl">
                        {eventCategs &&
                          eventCategs.map((value, index) => {
                            return <li key={index}>{value.name}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="notoficationsLi">
                  <NavLink to="/eventBazaar/notifications">
                    Notifications
                  </NavLink>
                  {(isLoggedIn() && notificationState) && (  
                    <>
                        <div className="notificationsDropdown">
                            <div className="navNotificationsHolder w-100">
                            {
                                notification && notification.filter((value, index) => index < 5)
                                .map((value, index) => {
                                return (
                                    <NavLink
                                    to={`/eventBazaar/events/${value.name}`}
                                    >
                                    <div
                                        key={index}
                                        className="navNotification d-flex justify-content-around align-items-center"
                                    >
                                        <div className="notificationImgHolder">
                                        <img
                                            className="notificationImg"
                                            src={value.images[0]}
                                            alt={value.name}
                                        />
                                        <span className="notificationImgBell">
                                            <BellIcon font="small" />
                                        </span>
                                        </div>
                                        <div className="notificationDesc w-100 ps-3 pe-0">
                                        <p className="notificationTitle mb-0 pt-2">
                                            {limitWords(value.name,3) }
                                        </p>
                                        <p className="notificationEventOrganizer mb-0">
                                            <ProfileIcon font="small" />
                                            <span className="innerNotificationText ms-1">
                                            {limitWords(value.contact.name,3)}
                                            </span>
                                        </p>
                                        <p className="text-end mb-0 notificationDateTime pb-1">
                                            {separateDateAndTime(value.date_time).time}{" "}
                                            <span className="ms-1">
                                            {separateDateAndTime(value.date_time).date}
                                            </span>{" "}
                                        </p>
                                        </div>
                                    </div>
                                    </NavLink>
                                );
                                })}
                            <p className="text-end mb-0 navNotificationsSeeAllText p-1 pe-2">
                                <NavLink to="/eventBazaar/notifications">
                                See All
                                </NavLink>
                            </p>
                            </div>
                        </div>
                        <span className="badge rounded-pill bg-danger notificationsCounter">
                            {eventsNotifications.length}
                            {/* <span class="visually-hidden">unread messages</span> */}
                        </span>
                    </>
                  )}
                </li>
                <li>
                  <NavLink to="/eventBazaar/login">Account</NavLink>
                </li>
                {isLoggedIn() && (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {getLoggedInPerson()}
                    </button>
                    <ul className="dropdown-menu p-1 navDropDownMenu">
                      {/* <li><a className="dropdown-item">My Account</a></li>
                                    <li><a className="dropdown-item">Logout</a></li> */}
                      <li>
                        <NavLink
                          className="text-dark"
                          to="/eventBazaar/account"
                        >
                          My Account
                        </NavLink>
                      </li>
                      <li>
                        <NavLink 
                        className="text-dark"
                        onClick={()=>signout()}
                        >Logout</NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
