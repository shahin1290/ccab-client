import React from 'react'
import { Row, Col } from 'react-bootstrap'
import arrow from './../../assets/images/services/arrow.png'

export default function ServiceSteps() {
  return (
    <section style={{ height: '350px' }}>
      <div class="service-step-overlay">
        <div class="banner">
          <h1 className="mt-5 text-white">
            How does homework help work? Easy to get started!
          </h1>
          <Row className="service-steps bg-white auto-container mx-auto mt-3  no-gutters text-align-left text-center-small-screen">
            <Col lg={3} className="d-flex pt-3 no-letter-spacing no-gutters ">
              <Col lg={11} className="no-gutters ">
                <div className="sub-title  pl-4">
                  <span className="text-warning ">Step 1</span>
                  <span> More information</span>
                </div>
                <div className="sub-text  pl-4 ">
                  It is important for us to understand you and what you want
                  help with. Contact us at 0774-218800!
                </div>
              </Col>
              <div className="hide-on-small-screen">
                <img src={arrow} style={{ width: '100%', height: '130px' }} />
              </div>
            </Col>
            <Col lg={3} className="d-flex pt-3 no-letter-spacing no-gutters ">
              <Col lg={11} className="no-gutters">
                <div className="sub-title pl-2">
                  <span className="text-warning">Step 2</span>
                  <span> We select your teacher</span>
                </div>
                <div className="sub-text pl-3">
                  We hand-pick one of our teachers for homework help that suits
                  your personality and your goals.
                </div>
              </Col>
              <div className="hide-on-small-screen">
                <img src={arrow} style={{ width: '100%', height: '130px' }} />
              </div>
            </Col>
            <Col
              lg={3}
              className="triangle no-letter-spacing d-flex no-gutters "
            >
              <Col lg={11} className="pt-3 no-gutters">
                <div className="sub-title pl-3">
                  <span className="text-warning">Step 3</span>
                  <span> Try-out lesson</span>
                </div>
                <div className="sub-text  pl-3">
                  You will meet your teacher who has been selected for your
                  homework help for a try-out lesson without commitment.
                </div>
              </Col>
              <div className=" triangle hide-on-small-screen">
                <span id="triangle-down"></span>
                <span id="triangle-up"></span>
              </div>
            </Col>
            <Col
              lg={3}
              className=" text-center no-letter-spacing no-gutters pb-5"
              style={{ background: '#fdf1cd' }}
            >
              <div className="sub-title pt-3">
                <span> More information</span>
              </div>
              <div className="sub-text">Book a meeting</div>
              <div className="d-flex jutify-content-center ">
                <a
                  activeclassName="active"
                  className="theme-btn btn-style-three mx-auto mt-1"
                  href="https://meetings.hubspot.com/sl-melad"
                  target="_blank"
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  <span className="txt">Video Call</span>
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  )
}
