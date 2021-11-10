import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./../../assets/images/logoBody.png";
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
            <p className="text-muted mt-4 mb-2">Yourcompanyemailid@gmail.com</p>
            <h6 className="text-muted font-weight-normal">+00 1234-5678-90</h6>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row">
            <div className="col-md-4">
              <h6 className="footer-list-title text-dark mb-3">Services</h6>
              <ul className="list-unstyled company-sub-menu">
                <li><a href="#">Digital Marketing</a></li>
                <li><a href="#">Business Analysis</a></li>
                <li><a href="#">How It Work</a></li>
                <li><a href="#">Fix &amp; Flip</a></li>
                <li><a href="#">Social Activation</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="footer-list-title text-dark mb-3">About Us</h6>
              <ul className="list-unstyled company-sub-menu">
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="footer-list-title text-dark mb-3">Our Address</h6>
              <p className="text-muted f-14">4806 Spring Haven Trail South Orange, NJ 07079</p>
              <h6 className="text-muted pb-2">Email: Support@gamil.com</h6>
              <ul className="list-unstyled footer-social-list mt-4">
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-instagram" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-linkedin" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="text-center text-muted">
            <p className="mb-0 f-15">2020 © Deoxa. Design by Themesdesign</p>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
