import React from "react";
import { Row, Col } from "react-bootstrap";
import image1 from "../../assets/images/services/chat.jpeg";

const ServiceVideoChat = () => {
  return (
    <section className=''>
      <div className='auto-container bg-white'>
        <Row className='py-4 d-flex justify-content-between'>
          <Col md={5} xs={12} className='text-center-small-screen'>
            <div className='sub-title pl-3 py-2 '>High-Quality Video Chat</div>
            <div className='pl-3 py-2 sub-text'>
              Speak face-to-face in a Zoom-like environment, easily accessible
              no matter where you are in the world
            </div>
            <div className='pl-3 py-2 sub-text'>
              Save the travelling time and invest them into your learning
            </div>
          </Col>
          <Col md={5} xs={12}>
            <img src={image1} class='img-fluid' alt='Responsive image' />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ServiceVideoChat;
