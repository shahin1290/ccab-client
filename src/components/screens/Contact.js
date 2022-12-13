import React from "react";
import { Link } from "react-scroll";

import logo from "./../../assets/images/CF.png";
export default function Contact() {
  return (
    <div>
      {/*Navbar Start*/}
      <nav className="navbar navbar-expand-lg p-1 fixed-top navbar-custom sticky sticky-dark">
        <div className="container">
          {/* LOGO */}

          <a className="navbar-brand logo" href="/">
            <img src={logo} alt="ccab" className height={10} />
          </a>

          <button
            className="navbar-toggler p-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto navbar-center" id="mySidenav">
              <li className="nav-item">
                <Link
                  className="nav-link pointer"
                  activeClass="activeItem"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link pointer"
                  activeClass="activeItem"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link pointer"
                  activeClass="activeItem"
                  to="features"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link pointer"
                  activeClass="activeItem"
                  to="clients"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                >
                  Clients
                </Link>
              </li>
            </ul>
            <div className="call-no">
              <a
                href="#"
                className="nav-link pointer "
                style={{ color: "#E55369", fontSize: "small" }}
              >
                <i className="mdi mdi-phone mr-1" /> +00 1234 5678 90
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Navbar End */}

      {/* Sidebar Page Container */}
      <div className="sidebar-page-container" style={{ paddingTop: "100px" }}>
        <div className="auto-container">
          <div className="row clearfix">
            {/* Content Side */}
            <div className="content-side col-lg-12 col-md-12 col-sm-12">
              {/* Sec Title */}
              <div className="sec-title">
                <h4>Contact Us</h4>
              </div>
              <div className="contact-info-section">
                <h6>Address</h6>
                <div className="row clearfix">
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <div className="text">
                      Röntgenvägen 1<br /> 141 52, Huddinge <br />
                      Stockholm, Sweden
                    </div>
                    <ul className="social-box">
                      <li className="facebook">
                        <a
                          href="https://www.facebook.com/CodifyCollege"
                          target="_blank"
                          className="fa fa-facebook"
                        />
                      </li>
                      <li className="twitter">
                        <a
                          href="https://twitter.com/CodifyCollege"
                          target="_blank"
                          className="fa fa-twitter"
                        />
                      </li>
                      <li className="linkedin">
                        <a
                          href="https://www.linkedin.com/company/codifycollege/about/"
                          target="_blank"
                          className="fa fa-linkedin"
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="contact-info-list">
                      <li>
                        <span className="icon">
                          <img src="images/icons/email.png" alt />
                        </span>
                        <a href="mailto:infoakamidia@gmail.com">
                          info@codifycollege.se
                        </a>
                      </li>
                      <li>
                        <span className="icon">
                          <img src="images/icons/phone.png" alt />
                        </span>
                        <a href="tel:+1-123-456-7890">+46-72 33 38 723</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="contact-info-section">
                <h6>Hours of Operation</h6>
                <div className="row clearfix">
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    Monday - Friday: 09:00am - 05:00pm
                    <br />
                    Sunday 09:00am - 05:00pm
                    <br />
                    Saturday: Closed
                  </div>
                </div>
              </div>
              {/* Map Boxed */}
              <div className="map-boxed">
                {/*Map Outer*/}
                <div className="map-outer">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2041.5038870931612!2d17.934236716151343!3d59.22430752648074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f711fbb14c925%3A0xfd193c3f6b55b909!2sR%C3%B6ntgenv%C3%A4gen%201%2C%20141%2052%20Huddinge!5e0!3m2!1sen!2sse!4v1619612330018!5m2!1sen!2sse"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
