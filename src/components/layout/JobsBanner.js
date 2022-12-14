import React from "react";
import { Row, Col } from "react-bootstrap";
import ServiceParticles from "./ServiceParticles";

const JobsBanner = () => {
  return (
    <section>
      <div class='job-banner '>
        <div className=' '>
          {" "}
          <span className='banner-text'>
            Working with us
          </span>
        </div>
        <ServiceParticles />
      </div>
      <div className='auto-container'>
        <Row className='mt-5 mb-5 pr-5'>
          <Col md={4} xs={12} className='sub-title p-5'>
            We offer Internships:
          </Col>
          <Col md={8} xs={12} className='sub-text'>
            <p>
              Do you already have a background in development? Are you just
              starting out as a developer but feel like you need more
              experience? As a developer just starting out you too are eligible
              to enroll in our Career Development plan. Submit your application
              below!{" "}
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
  );
};

export default JobsBanner;
