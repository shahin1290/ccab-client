import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import image1 from "../../assets/images/services/chat.jpeg";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const ServiceVideoChat = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className=''>
      <div className='auto-container bg-white'>
        <Row
          className='py-4 d-flex justify-content-between'
          style={{ overflow: "hidden" }}
        >
          <Col
            data-aos='fade-down-right'
            data-aos-delay='300'
            md={5}
            xs={12}
            className='text-center-small-screen'
          >
            <div className='sub-title pl-3 py-2 '>
              Remote supervised self-paced training
            </div>
            <div className='pl-3 py-2 sub-text'>
              Choose a start date and register on this page to secure your
              spot.  To prepare for the Bootcamp, get the pre-course materials.
              If you have no prior experience with JavaScript, HTML, or CSS, we
              estimate it will take you 20-30 hours
            </div>
          </Col>
          <Col data-aos='fade-up-left' data-aos-delay='300' md={5} xs={12}>
            <img src={image1} class='img-fluid' alt='Responsive image' />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ServiceVideoChat;
