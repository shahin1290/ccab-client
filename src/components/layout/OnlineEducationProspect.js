import React from 'react'
import { Row, Col } from 'react-bootstrap'

const OnlineEducationProspect = () => {
  return (
    <section
      style={{ backgroundColor: 'white', padding: '80px 0', fontFamily: '' }}
    >
      <div className="auto-container">
        <h2 className=" text-center p-4 ">Redefining Online Education</h2>
        <hr className="block-seperator" />
        <Row className="mt-5 pt-3">
          <Col md={1}>
            <i className="fa-online-education fas fa-code"></i>
          </Col>
          <Col md={5} className="pl-4">
            <h4>Skills for your new career</h4>
            <p>
              Learn the most in-demand programming languages: Python, JavaScript
              and much more.
            </p>
          </Col>

          <Col md={1}>
            <i className="fa-online-education fas fa-user-tie"></i>
          </Col>
          <Col md={5} className="pl-4">
            <h4>Employment Matchmaking</h4>
            <div>
              Over 1000 employment partners worldwide. We strive to match you to
              the right career.
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={1}>
            <i className="fa-online-education fas fa-chalkboard-teacher"></i>
          </Col>
          <Col md={5} className="pl-4">
            <h4>Supported Learning</h4>
            <div>
              24/5 + Weekend Tutor Support, Student Care, Personalised Career
              Support, 1:1 Mentoring, and more.
            </div>
          </Col>

          <Col md={1}>
            <i className="fa-online-education far fa-chart-bar"></i>
          </Col>
          <Col md={5} className="pl-4">
            <h4>Learning Analytics</h4>
            <div>
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
            <div>
              Europe’s only university credit-rated online coding Bootcamp. EQF
              & RQF, Level 5.
            </div>
          </Col>

          <Col md={1}>
            <i className="fa-online-education fas fa-history"></i>
          </Col>
          <Col md={5} className="pl-4">
            <h4>Industry-Validated Every Six Months</h4>
            <div>
              The Industry Advisory Council (IAC) comprises industry employers,
              recruiters, academics, enterprise organisations, and startups.
            </div>
          </Col>
        </Row>

        {/* Setting The Standard In Online Education */}

        <h2 className=" text-center mt-5 p-4">
          Setting The Standard In Online Education
        </h2>
        <hr className="block-seperator" />
        <div>
          We are setting the global standard for online education. We are the
          only University Credit-Rated Bootcamp in Europe. Some of our education
          partners include:
        </div>
        <Row className="mt-5 pt-3">
          <Col md={{ span: 1, offset: 1 }}>
            <img src="images/csn.png" />
          </Col>
          <Col md={{ span: 1, offset: 1 }}>
            <img src="images/csn.png" />
          </Col>
          <Col md={{ span: 1, offset: 1 }}>
            <img src="images/csn.png" />
          </Col>
          <Col md={{ span: 1, offset: 1 }}>
            <img src="images/csn.png" />
          </Col>
          <Col md={{ span: 1, offset: 1 }}>
            <img src="images/csn.png" />
          </Col>
        </Row>

        <Row className="mt-5 pt-3">
          <Col xs={6}>xs=6</Col>
          <Col xs={6}>xs=6</Col>
        </Row>
      </div>
    </section>
  )
}

export default OnlineEducationProspect
