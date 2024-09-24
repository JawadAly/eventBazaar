import React from "react";
import { FacebIcon, InstaIcon, LinkedIcon, TwittIcon } from "./Socials";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <section className="footerSection p-3">
        <div className="container">
          <div className="footerFlexer d-flex justify-content-between pb-3">
            <div className="footerLogo">
                <a href="#">
                  <img 
                  src="/eventBazaar/images/eventBazarLogo.png" 
                  alt="brandLogo"
                  className="img-fluid"
                  />
                </a>
            </div>
            <div className="middleContent mb-3 pt-4">
              <ul>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/eventBazaar/termsandconds">Terms and Conditions</NavLink>
                </li>
                <li>
                  <NavLink to="">Email : easyevent.digital@gmail.com</NavLink>
                </li>
                <li>
                  <NavLink to="">Phone : +92 3032162790</NavLink>
                </li>
              </ul>
            </div>
            <div className="middleContent mb-3 pt-4">
              <ul>
                <li>
                  <NavLink to="/eventBazaar/privacypolicy">Privacy Policy</NavLink>
                </li>
                <li>
                  <NavLink to="/eventBazaar/termsandconds">Terms and Conditions</NavLink>
                </li>
                <li>
                  <NavLink to="/eventBazaar/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/eventBazaar/signup">Signup</NavLink>
                </li>
              </ul>
            </div>
            <div className="brandSocials d-flex align-items-center">
              <ul>
                <li>
                  <a href='https://www.facebook.com/share/oY6ZYjwnrCBmHCTR/?mibextid=qi2Omg' className="text-dark">
                    <FacebIcon font="large" />
                  </a>
                </li>
                <li>
                  <a href='https://www.instagram.com/event.bazaar/' className="text-dark">
                    <InstaIcon font="large" />
                  </a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/company/event-bazaarpk/' className="text-dark">
                    <LinkedIcon font="large" />
                  </a>
                </li>
                {/* <li>
                  <a href='#' className="text-dark">
                    <TwittIcon font="large" />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="footerLowerBar">
          <div className="container">
            <p className="text-center mt-1">
              CopyRight © {currentYear} Event-Bazaar. All Rights Reserved |
              Terms and Conditions applied. Developed by
              <a
                className="text-info ms-1"
                href="https://jawadaly.github.io/CODESOFT/#home-section"
              >
                JS Dev.
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;
