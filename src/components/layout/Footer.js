import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./../../assets/images/logoBody.png";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      {/*Main Footer*/}
      <footer className='main-footer style-two'>
        {/* Upper Box */}

        {/* Pattern Layer Three */}
        <div
          className='pattern-layer-three'
          style={{ backgroundImage: "url(images/background/pattern-2.png)" }}
        />
        <div className='auto-container'>
          {/* Widgets Section */}
          <div className='widgets-section'>
            <div className='row clearfix'>
              {/* Big Column */}
              <div className='big-column col-lg-4 col-md-12 col-sm-12'>
                <div className='row clearfix'>
                  {/*Footer Column*/}
                  <div className='footer-column col-lg-9 col-md-6 col-sm-12'>
                    <div className='footer-widget logo-widget'>
                      <div className='logo'>
                        <a href='/l'>
                          <img src={logo} width='30%' />
                        </a>
                      </div>

                      <div className='social-box'>
                        <a
                          href='https://www.facebook.com/CfCollegezz'
                          className='fa fa-facebook'
                        />
                        <a
                          href='https://www.instagram.com/cf.college/'
                          className='fa fa-instagram'
                        />
                        <a
                          href='https://www.twitter.com/CodifyCollege/'
                          className='fa fa-twitter'
                        />

                        <a
                          href='https://www.linkedin.com/company/cf-college/'
                          className='fa fa-linkedin'
                        />
                      </div>
                    </div>
                  </div>
                  {/*Footer Column*/}
                </div>
              </div>
              {/* Big Column */}
              <div className='big-column col-lg-6 col-md-12 col-sm-12'>
                <div className='row clearfix'>
                  {/*Footer Column*/}
                  <div className='footer-column col-lg-6 col-md-6 col-sm-12'>
                    <div className='footer-widget links-widget'>
                      <h4>Resource</h4>
                      <ul className='links-widget'>
                        <li>
                          <a href='/privacy'>Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*Footer Column*/}
                  <div className='footer-column col-lg-6 col-md-6 col-sm-12'>
                    <div className='footer-widget links-widget'>
                      <h4>Quick Links</h4>
                      <ul className='links-widget'>
                        <li>
                          <a href='/'>Home</a>
                        </li>
                        <li>
                          <a href='/course-grid'>Courses</a>
                        </li>
                        <li>
                          <a href='/contact'>Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className='footer-bottom text-center'>
            <div className='copyright'>Copyright © 2021 cc CF College AB</div>
          </div>
        </div>
      </footer>
    </>
  );
}
