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
          <div className="title text-center p-4 ">
            Redefining Online Education
          </div>
          <hr className="block-seperator mb-5" />
          <Row className="pt-3 pb-1">
            <Col md={1} className="mt-3">
              <i className="fa-online-education fas fa-code "></i>
            </Col>
            <Col md={5} className="mt-3">
              <div className="sub-title pb-1">Skills for your new career</div>
              <div className="sub-text">
                Learn the most in-demand programming languages: Python,
                JavaScript and much more.
              </div>
            </Col>

            <Col md={1} className="mt-3">
              <i className="fa-online-education fas fa-user-tie"></i>
            </Col>
            <Col md={5} className="mt-3">
              <div className="sub-title pb-1">Employment Matchmaking</div>
              <div className="sub-text">
                Over 1000 employment partners worldwide. We strive to match you
                to the right career.
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={1} className="mt-3">
              <i className="fa-online-education fas fa-chalkboard-teacher"></i>
            </Col>
            <Col md={5} className="mt-3">
              <div className="sub-title pb-1">Supported Learning</div>
              <div className="sub-text">
                24/5 + Weekend Tutor Support, Student Care, Personalised Career
                Support, 1:1 Mentoring, and more.
              </div>
            </Col>

            <Col md={1} className="mt-3">
              <i className="fa-online-education far fa-chart-bar"></i>
            </Col>
            <Col md={5} className="mt-3">
              <div className="sub-title pb-1">Learning Analytics</div>
              <div className="sub-text">
                We track and monitor your progression with our custom-built
                analytics software. If needed, we intervene with human support.
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={1} className="mt-3">
              <i className="fa-online-education fas fa-university"></i>
            </Col>
            <Col md={5} className="mt-3">
              <div className="sub-title pb-1">Academic Qualification</div>
              <div className="sub-text">
                Europe’s only university credit-rated online coding Bootcamp.
                EQF & RQF, Level 5.
              </div>
            </Col>

            <Col md={1} className="mt-3">
              <i className="fa-online-education fas fa-history"></i>
            </Col>
            <Col md={5} className="mt-3">
              <div className="sub-title pb-1">Industry-Validated Every Six Months</div>
              <div className="sub-text">
                The Industry Advisory Council (IAC) comprises industry
                employers, recruiters, academics, enterprise organisations, and
                startups.
              </div>
            </Col>
          </Row>

          {/* Setting The Standard In Online Education */}

          <div className="auto-container pt-5 mt-5">
            {/* Sec Title */}
            <div className="title text-center ">
              Setting The Standard In Online Education
            </div>
            <hr className="block-seperator mt-4 mb-4" />
            <div className="sub-text text-center">
              We are setting the global standard for online education. We are
              the only University Credit-Rated Bootcamp in Europe. Some of our
              education partners include:
            </div>
            <div className="row clearfix mt-5">
              <div className="text-center col-lg-3 col-md-6 col-sm-12 ">
                <img src="images/eu.jpg" className=" w-50 h-75" />
              </div>

              <div className=" text-center col-lg-3 col-md-6 col-sm-12">
                <img src="images/scqf.png" className="w-50 h-75" />
              </div>

              <div className=" text-center col-lg-3 col-md-6 col-sm-12">
                <img src="images/gateway.jpg" className="w-50 h-75" />
              </div>

              <div className=" text-center col-lg-3 col-md-6 col-sm-12">
                <img src="images/csn.jpg" className="w-50 h-75" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineEducationProspect
