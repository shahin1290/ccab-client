import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./../../assets/images/logoBody.png";
import {Link } from 'react-scroll'
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      {/*Main Footer*/}
      <section className="footer  bg-light">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="mb-4">
            <a href="layout-one-1.html"><img src="images/CF-footer.gif" alt='photo' className="logo-dark" height={26} /></a>
            <p className="text-muted mt-4 mb-2">info@codifycollege.se</p>
            <h6 className="text-muted font-weight-normal">+46-72 33 38 723</h6>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row">
            <div className="col-md-4">
              <h6 className="footer-list-title text-dark mb-3">Services</h6>
              <ul className="list-unstyled company-sub-menu">
                <li><a target="_blank" href="https://ccab.tech/courses/60c379d0e246b913b0fb70c7">Foundation Course</a></li>
                <li><a target="_blank" href="https://ccab.tech/courses/60c382b17e4ded3b249c3c39">Front-End Full Course</a></li>
                <li><a target="_blank" href="https://ccab.tech/courses/60c36c14e246b913b0fb6ff4">Mern Full-Stack Developer</a></li>
                <li><a target="_blank"  href="/#Career-support">Career Support</a></li>
                 <li><a target="_blank"  href="/#Curriculum">Comprehensive <br/> Curriculum</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="footer-list-title text-dark mb-3">About Us</h6>
              <ul className="list-unstyled company-sub-menu">
                <li><a target="_blank"  href="/contact">Contact Us</a></li>
                <li><a target="_blank"  href="/#afq">FAQs</a></li>
                <li><a target="_blank"  href="/privacy">Privacy Policy</a></li>
              </ul>
            </div>
       
            <div className="col-md-4">
              <h6 className="footer-list-title text-dark mb-3">Our Address</h6>
              <p className="text-muted f-14">Röntgenvägen 1,141 52, Huddinge, Stockholm, Sweden</p>
              <h6 className="text-muted pb-2">Email: info@codifycollege.se</h6>
              <ul className="list-unstyled footer-social-list mt-4">
                <li className="list-inline-item"><a target="_blank" href="https://www.facebook.com/CfCollegezz"><i className="mdi mdi-facebook" /></a></li>
                <li className="list-inline-item"><a target="_blank" href="https://twitter.com/CodifyCollege"><i className="mdi mdi-twitter" /></a></li>
                <li className="list-inline-item"><a target="_blank" href="https://www.linkedin.com/company/codifycollege/about/"><i className="mdi mdi-linkedin" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="text-center text-muted">
            <p className="mb-0 f-15">2021 © CF College AB. Design by CF College AB  </p>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
