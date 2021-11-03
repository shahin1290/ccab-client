import React, { useState , useEffect } from "react";
import Rodal from "rodal";
// include styles
import "rodal/lib/rodal.css";
import ContactForm from "./ContactForm";
import { Row, Col } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const ContactSection = () => {
  useEffect(()=>{
    AOS.init();
  },[])

  const [showModal, setShowModal] = useState({ visible: false });

  return (
    <section
      style={{
        backgroundColor: "#fff",
        padding: " 0",
      }}
    >
      <div className='auto-container'>
        <Row className='d-flex justify-content-center'>
          <Col data-aos="fade-down" data-aos-delay="200" md={4} className='advisor-image mt-3 px-0' ></Col>
          <Col data-aos="zoom-in-up" md={6} className="px-0">
            <div
              className='advisor-text1 p-4 w-100'
              style={{ fontWeight: "400" }}
            >
              <div className='ml-1' style={{ color: "#2d9c6b" }}>
                &#123; <span className='p-2'>Unsure which course fits you</span>{" "}
                &#125;{" "}
              </div>
              <div className='pt-2'>
                <span style={{ color: "red" }}>&#9552;&#62;</span>
                <span style={{ color: "#F5B600" }}>
                  Talk to our advisor to craft the ideal course plan
                </span>

                <div class='inner mt-3 ml-4'>
                  <a
                    class='button fb'
                    onClick={() => setShowModal({ visible: true })}
                  >
                    <div className='d-flex align-items-center w-100 justify-content-center pb-1 pl-3 overflow-auto' style={{height:'40px'}}>
                      <i class='far fa-user-circle fa-4x advisor-icon'></i>
                      <span className='fs-2  '>Ask an advisor</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className='advisor-text2'></div>
          </Col>
        </Row>
      </div>

      {/* <div className='auto-container'>
        <Row className='d-flex justify-content-center'>
          <Col md={4} className='advisor-image mb-3'></Col>
          <Col md={6}>
            <div
              className='advisor-text1 pt-3 pl-3'
              style={{ fontWeight: "400" }}
            >
              <div className='ml-1' style={{ color: "#2d9c6b" }}>
                &#123; <span className='p-2'>Unsure which course fits you</span>{" "}
                &#125;{" "}
              </div>
              <div className='pt-2'>
                <span style={{ color: "red" }}>&#9552;&#62;</span>
                <span style={{ color: "#F5B600" }}>
                  Talk to our advisor to craft the ideal course plan
                </span>

                <div class='inner mt-3 ml-4'>
                  <a
                    class='button fb'
                    onClick={() => setShowModal({ visible: true })}
                  >
                    <span className='d-flex'>
                      <i class='far fa-user-circle fa-4x advisor-icon'></i>
                      <span className='px-1 pt-2 pl-5'>Ask an advisor</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className='advisor-text2'></div>
          </Col>
        </Row>
      </div> */}
      <Rodal
        animation='rotate'
        visible={showModal.visible}
        onClose={() => setShowModal({ visible: false })}
        width='900'
      >
        <ContactForm />
      </Rodal>
    </section>
  );
};

export default ContactSection;
