import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import arrow from './../../assets/images/services/arrow.png'

export default function ServiceSteps() {
  return (
    <section style={{ height: '350px' }}>
      <div class="service-step-overlay">
        <div class="banner">
          <h1 className="mt-5 text-white">
            Hur fungerar läxhjälpen? Enkelt att komma igång!
          </h1>
          <Row className="service-steps bg-white auto-container mx-auto mt-3 ">
            <Col md={3} className="pt-3 pb-3 d-flex">
              <Col md={11}>
                Steg 1 More information It is important for us to understand
                your needs to find the best tutor for you. Call us on 0774 – 21
                88 00
              </Col>
              <div>
                <img src={arrow} style={{ width: '100%', height: '150px' }} />
              </div>
            </Col>
            <Col md={3} className="pt-3 pb-3 d-flex">
              <Col md={11}>
                Steg 1 More information It is important for us to understand
                your needs to find the best tutor for you. Call us on 0774 – 21
                88 00
              </Col>
              <div>
                <img src={arrow} style={{ width: '100%', height: '150px' }} />
              </div>
            </Col>
            <Col md={3} className="pt-3 pb-3 d-flex">
              <Col md={11}>
                Steg 1 More information It is important for us to understand
                your needs to find the best tutor for you. Call us on 0774 – 21
                88 00
              </Col>
            </Col>
            <Col
              md={3}
              className="pt-3 pb-3 d-flex"
              style={{ background: '#fdf1cd' }}
            >
              <div>
                Steg 1 More information It is important for us to understand
                your needs to find the best tutor for you. Call us on 0774 – 21
                88 00
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  )
}
