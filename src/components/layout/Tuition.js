import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const TuitionSection = function (props) {
  return (
    <section
      className='py-5 gradient-background'
      style={{ background: " rgb(234, 246, 255)" }}
    >
      <div className='auto-container'>
        <div className='title text-center'>Tuition</div>
        <hr className='block-seperator mt-1 mb-3' />
        <div className='text text-center mb-3'>
          We conduct discount programs from time to time, so the price may be
          lower.
        </div>
        <Row>
          <Col md={12} className='text-center pt-4'>
            <h3 style={{ color: "#F09300" }}>Course Fees</h3>
            <div>2 000€ / 3-5 months**</div>
            <div>3 000€ / 4-6 months**</div>
            <div>optional weekly extensions after that</div>
          </Col>
        </Row>

        <h3 className='text-center pt-4' style={{ color: "#F09300" }}>
          Fully flexible self-paced online learning
        </h3>

        <Row className='d-flex justify-content-center'>
          <Col md={5}>
            <div>
              Interest-free payment option of 5-6 months Alternatively, you may
              sign up for up to 36 months with Klarna, which includes complete
              access to the materials for 6 months and 9-15 weeks of mentor
              assistance, which includes access to the support platform, 1:1
              sessions, and our Slack chat group.
            </div>
          </Col>

          <Col md={5}>
            <div>
              If you require additional time and mentor help to complete the
              bootcamp, you may extend it on a weekly basis for 99€ each week,
              allowing you to study at your own speed while still receiving all
              of the support and direction we give.
            </div>
          </Col>
        </Row>

        <Row className='mx-auto mt-4 text-muted'>
          <Col md={{ span: 6, offset: 3 }}>
            <div>
              As a result, you may finish the bootcamp according to your
              schedule and learning pace – from a full-time intense 3-6 months
              to a longer period, just as we do with our in-person group on
              campus.
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default TuitionSection;
