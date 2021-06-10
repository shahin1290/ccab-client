import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

const OnlineEducationProspect = () => {
  return (
    <>
      <section
        style={{
          backgroundColor: '#fff',
          padding: '50px 0'
        }}
      >
        <div className="auto-container">
          <div className="title text-center p-4 ">Great online education</div>
          <hr className="block-seperator mb-5" />
          <Row className="pt-3 pb-1">
            <Col md={1} className="mt-3 text-center">
              <i className="fa-online-education fas fa-code "></i>
            </Col>
            <Col md={5} className="mt-3 text-center-small-screen">
              <div className="sub-title pb-1 ">
                Build skills for a new career
              </div>
              <div className="sub-text">
                We start with the languages that you'll need most: JavaScript,
                Python and more...
              </div>
            </Col>

            <Col md={1} className="mt-3 text-center">
              <i className="fa-online-education fas fa-user-tie"></i>
            </Col>
            <Col md={5} className="mt-3 text-center-small-screen">
              <div className="sub-title pb-1">Match-up with an employer</div>
              <div className="sub-text">
                Our students' skills are in demand so we have over 1000
                employment partners over the globe. We work hard to find a place
                that suits you.
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={1} className="mt-3 text-center">
              <i className="fa-online-education fas fa-chalkboard-teacher"></i>
            </Col>
            <Col md={5} className="mt-3 text-center-small-screen">
              <div className="sub-title pb-1">We’re here to support you</div>
              <div className="sub-text">
                We offer 24-hour weekday support plus help throughout the
                weekend, a student care package, individual career support,
                mentoring and more…
              </div>
            </Col>

            <Col md={1} className="mt-3 text-center">
              <i className="fa-online-education far fa-chart-bar"></i>
            </Col>
            <Col md={5} className="mt-3 text-center-small-screen">
              <div className="sub-title pb-1">We know your strengths</div>
              <div className="sub-text">
                We monitor your progress with our custom software so we can
                support you exactly where you need it.
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={1} className="mt-3 text-center">
              <i className="fa-online-education fas fa-university"></i>
            </Col>
            <Col md={5} className="mt-3 text-center-small-screen">
              <div className="sub-title pb-1">Academic qualification</div>
              <div className="sub-text">
                We are Europe’s only online coding Bootcamp that offers
                university credits. Including EQF & RQF Level 5.
              </div>
            </Col>

            <Col md={1} className="mt-3 text-center">
              <i className="fa-online-education fas fa-history"></i>
            </Col>
            <Col md={5} className="mt-3 text-center-small-screen">
              <div className="sub-title pb-1">Industry compliant</div>
              <div className="sub-text">
                We're re-accredited every six months to ensure the quality of
                our course remains high. The Industry Advisory Council (IAC) is
                a board of start-ups and entrepreneurs who make sure we're
                teaching the skills they need.
              </div>
            </Col>
          </Row>

          {/* Setting The Standard In Online Education */}

          {/* <div className="auto-container pt-5 mt-5">
            <div className="title text-center ">
            Ahead of the pack in online education

            </div>
            <hr className="block-seperator mt-4 mb-4" />
            <div className="sub-text text-center">
            We make sure all our courses meet the highest standards, which is why we're the only university credit-rated coding bootcamp within Europe. Our education partners are listed below:
            </div>
            <div className="row clearfix mt-5">
              <div className="text-center col-lg-3 col-md-6 col-sm-12 pb-5">
                <img src="images/eu.jpg" className=" w-50 h-75" />
              </div>

              <div className=" text-center col-lg-3 col-md-6 col-sm-12 pb-5">
                <img src="images/scqf.png" className="w-50 h-75" />
              </div>

              <div className=" text-center col-lg-3 col-md-6 col-sm-12 pb-5">
                <img src="images/gateway.jpg" className="w-50 h-75" />
              </div>

              <div className=" text-center col-lg-3 col-md-6 col-sm-12 pb-5">
                <img src="images/csn.jpg" className="w-50 h-75" />
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default OnlineEducationProspect
