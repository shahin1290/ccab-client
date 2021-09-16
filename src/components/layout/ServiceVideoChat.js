import React from "react";
import { Row, Col } from "react-bootstrap";
import image1 from "../../assets/images/services/chat3.jpeg";

const ServiceVideoChat = () => {
  return (
    <section className=''>
      <div className='auto-container bg-white'>
        <Row className='py-4'>
          <Col md={6} xs={12} className="pl-5">
            <div className='sub-title pl-3 py-2'>High-Quality Video Chat</div>
            <div className="pl-3 py-2 sub-text">
              Speak face-to-face in a Zoom-like environment, easily accessible
              no matter where you are in the world
            </div>
            <div className="pl-3 py-2 sub-text">
              Save the travelling time and invest them into your learning
            </div>
          </Col>
          <Col md={5} xs={12} className="ml-5">
            <img src={image1} alt='' />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ServiceVideoChat;
