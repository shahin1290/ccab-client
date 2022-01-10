import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const OnlineEducationProspect = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section
        style={{
          backgroundColor: "#fff",
          paddingTop: "50px",
        }}
      >
        <div className='auto-container'>
          <div data-aos='zoom-out-right' className='title text-center  '>
            What Stands Us Out
          </div>
          <hr className='block-seperator mb-5' />
          <Row data-aos='fade-down' className='pt-3 pb-1'>
            <Col md={1} className='mt-3 text-center'>
              <i className='fa-online-education fas fa-code '></i>
            </Col>
            <Col md={5} className='mt-3 text-center-small-screen'>
              <div className='sub-title pb-1 '>
                Build skills for a new career
              </div>
              <div className='sub-text'>
                We start with the languages that you'll need most to work :
                JavaScript, Express JS and more...
              </div>
            </Col>

            <Col md={1} className='mt-3 text-center'>
              <i className='fa-online-education fas fa-user-tie'></i>
            </Col>
            <Col md={5} className='mt-3 text-center-small-screen'>
              <div className='sub-title pb-1'>Match-up with an employer</div>
              <div className='sub-text'>
                Our students' skills are in demand so we have employment
                partners over the globe. We work hard to find a place that suits
                you.
              </div>
            </Col>
          </Row>

          <Row data-aos='fade-down'>
            <Col md={1} className='mt-3 text-center'>
              <i className='fa-online-education fas fa-chalkboard-teacher'></i>
            </Col>
            <Col md={5} className='mt-3 text-center-small-screen'>
              <div className='sub-title pb-1'>We’re here to support you</div>
              <div className='sub-text'>
                We offer 24-hour weekday support plus help throughout the
                weekend, a student care package, individual career support,
                mentoring and more…
              </div>
            </Col>

            <Col md={1} className='mt-3 text-center'>
              <i className='fa-online-education far fa-chart-bar'></i>
            </Col>
            <Col md={5} className='mt-3 text-center-small-screen'>
              <div className='sub-title pb-1'>We know your strengths</div>
              <div className='sub-text'>
                We monitor your progress with our custom software so we can
                support you exactly where you need it.
              </div>
            </Col>
          </Row>

          {/* Setting The Standard In Online Education */}
          {/* 
          <div className="auto-container pt-5 mt-5">
            <div data-aos="flip-down" className="title text-center ">
              We Partner With The Best In The Industry
            </div>
            <hr className="block-seperator mt-2 mb-4" />
            <div data-aos="flip-down" data-aos-delay="300" className="sub-text text-center">
              All our courses are developed in partnership with the world's most
              innovative tech companies to meet the highest standards and taught
              by industry leaders.
            </div>
            <div data-aos="fade-up" className="row clearfix d-flex ">
              <div   data-aos="fade-up" className=" partnerImage   col-12 col-md-6 col-lg-2 d-flex justify-content-center ">
                <img src="images/paypal-f.png" className=" " />
              </div>

              <div   data-aos="fade-up" className="  partnerImage   col-12 col-md-6 col-lg-2 d-flex justify-content-center">
                <img src="images/facebook-f.png" className="" />
              </div>

              <div   data-aos="fade-up" className="  partnerImage   col-12 col-md-6 col-lg-2 d-flex justify-content-center">
                <img src="images/hubspot-f.png" className="" />
              </div>

              <div   data-aos="fade-up" className="  partnerImage   col-12 col-md-6 col-lg-2 d-flex justify-content-center">
                <img src="images/google-f.png" className="" />
              </div>

              <div   data-aos="fade-up" className="  partnerImage   col-12 col-md-6 col-lg-2 d-flex justify-content-center">
                <img src="images/apple-f.png" className=" " />
              </div>

              <div   data-aos="fade-up" className="  partnerImage   col-12 col-md-6 col-lg-2 d-flex justify-content-center">
                <img src="images/klarna-f.png" className=" h-75 " />
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default OnlineEducationProspect;
