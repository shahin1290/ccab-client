import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'




const OnlineEducationProspect = () => {
  
  return (
    <>
      <section
        style={{
          backgroundColor: '#F8F9FD',
          padding: '50px 0'
        }}
      >
        <div className="auto-container">
          <div className="title text-center p-4 ">
            Redefining Online Education
          </div>
          <hr className="block-seperator" />
          <Row className="mt-5 pt-3">
            <Col md={1}>
              <i className="fa-online-education fas fa-code"></i>
            </Col>
            <Col md={5} className="pl-4">
              <h4>Skills for your new career</h4>
              <div className="sub-text">
                Learn the most in-demand programming languages: Python,
                JavaScript and much more.
              </div>
            </Col>

            <Col md={1}>
              <i className="fa-online-education fas fa-user-tie"></i>
            </Col>
            <Col md={5} className="pl-4">
              <h4>Employment Matchmaking</h4>
              <div className="sub-text">
                Over 1000 employment partners worldwide. We strive to match you
                to the right career.
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={1}>
              <i className="fa-online-education fas fa-chalkboard-teacher"></i>
            </Col>
            <Col md={5} className="pl-4">
              <h4>Supported Learning</h4>
              <div className="sub-text">
                24/5 + Weekend Tutor Support, Student Care, Personalised Career
                Support, 1:1 Mentoring, and more.
              </div>
            </Col>

            <Col md={1}>
              <i className="fa-online-education far fa-chart-bar"></i>
            </Col>
            <Col md={5} className="pl-4">
              <h4>Learning Analytics</h4>
              <div className="sub-text">
                We track and monitor your progression with our custom-built
                analytics software. If needed, we intervene with human support.
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={1}>
              <i className="fa-online-education fas fa-university"></i>
            </Col>
            <Col md={5} className="pl-4">
              <h4>Academic Qualification</h4>
              <div className="sub-text">
                Europe’s only university credit-rated online coding Bootcamp.
                EQF & RQF, Level 5.
              </div>
            </Col>

            <Col md={1}>
              <i className="fa-online-education fas fa-history"></i>
            </Col>
            <Col md={5} className="pl-4">
              <h4>
                Industry-Validated Every Six Months
              </h4>
              <div className="sub-text">
                The Industry Advisory Council (IAC) comprises industry
                employers, recruiters, academics, enterprise organisations, and
                startups.
              </div>
            </Col>
          </Row>

          {/* Setting The Standard In Online Education */}

          <div className="title text-center p-4 mt-5">
            Setting The Standard In Online Education
          </div>
          <hr className="block-seperator mb-4" />
          <div className="sub-text text-center">
            We are setting the global standard for online education. We are the
            only University Credit-Rated Bootcamp in Europe. Some of our
            education partners include:
          </div>
          <Row className="mt-5 pt-3">
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/eu.jpg" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/eu.png" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/scqf.png" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/gateway.jpg" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/csn.jpg" />
            </Col>
          </Row>

         
        </div>
      </section>
      
      
    </>
  )
}

export default OnlineEducationProspect
