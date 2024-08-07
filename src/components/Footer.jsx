import React from "react";
import { FacebIcon, InstaIcon, LinkedIcon, TwittIcon } from "./Socials";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <section className="footerSection p-3">
        <div className="container">
          <div className="footerFlexer d-flex  justify-content-between">
            <div className="navLogo">
                <a href="#">
                  <img 
                  src="/images/eventBazarLogo.png" 
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
                  <NavLink to="/termsandconds">Terms and Conditions</NavLink>
                </li>
                <li>
                  <NavLink to="">Email : info@event-bazaar.pk</NavLink>
                </li>
                <li>
                  <NavLink to="">Phone : +92 3463654223</NavLink>
                </li>
              </ul>
            </div>
            <div className="middleContent mb-3 pt-4">
              <ul>
                <li>
                  <NavLink to="/privacypolicy">Privacy Policy</NavLink>
                </li>
                <li>
                  <NavLink to="/termsandconds">Terms and Conditions</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </ul>
            </div>
            <div className="brandSocials d-flex align-items-center">
              <ul>
                <li>
                  <NavLink to="#" className="text-dark">
                    <FacebIcon font="large" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="text-dark">
                    <InstaIcon font="large" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="text-dark">
                    <LinkedIcon font="large" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" className="text-dark">
                    <TwittIcon font="large" />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footerLowerBar">
          <div className="container">
            <p className="text-center mt-1">
              CopyRight © {currentYear} Event-Bazaar. All Rights Reserved |
              Terms and Conditions applied. Developed by
              <NavLink
                className="text-info ms-1"
                to="https://jawadaly.github.io/CODESOFT/#home-section"
              >
                JS Dev.
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;
