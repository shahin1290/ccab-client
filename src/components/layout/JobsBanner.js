import React from 'react'
import { Row, Col } from 'react-bootstrap'

const JobsBanner = () => {
  return (
    <section>
      <div className="auto-container">
        <div class="banner-container row align-items-center">
          <span className="banner-text col-6 mx-auto">Working with us</span>
        </div>
        <Row className="mt-5 mb-5 pr-5">
          <Col md={4} className="sub-title p-5">We offer Internships:</Col>
          <Col md={8} className="sub-text p-5">
            <p>
              Do you already have a background in development? Are you just
              starting out as a developer but feel like you need more
              experience? As a developer just starting out you too are eligible
              to enroll in our Career Development plan. Submit your application
              below!{' '}
            </p>
            <p>
              We offer our graduate students Career development plans: a 3
              months long internship working with real-life projects,
              frameworks, libraries and technologies that are in demand. Via our
              Personal Development Program we offer CV guidance, Networking
              Events, Technical Interviews/Mock Interviews, coaching and
              updating your GitHub and LinkedIn accounts.
            </p>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default JobsBanner
