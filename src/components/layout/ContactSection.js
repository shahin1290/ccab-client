import React, { useState } from "react";
import Rodal from "rodal";
// include styles
import "rodal/lib/rodal.css";
import ContactForm from "./ContactForm";
import { Row, Col } from "react-bootstrap";

const ContactSection = () => {
  const [showModal, setShowModal] = useState({ visible: false });

  return (
    <section
      style={{
        backgroundColor: "#fff",
        padding: "80px 0",
      }}
    >
      <div className='auto-container'>
        <div className='d-flex'>
          <div className='advisor-image'></div>
          <div>
            <div
              className='advisor-text1 pt-3 pl-3'
              style={{ fontWeight: "400" }}
            >
              <div className='ml-1' style={{ color: "#2d9c6b" }}>
                &#123; <span className='p-2'>Unsure which course fits you</span>{" "}
                &#125;{" "}
              </div>
              <div className=''>
                <span style={{ color: "red" }}>&#9552;&#62;</span>
                <span style={{ color: "#F5B600" }}>
                  Talk to our advisor to craft the ideal course plan
                </span>

                <div class='inner mt-2 ml-4'>
                  <a
                    class='button fb'
                    onClick={() => setShowModal({ visible: true })}
                  >
                    <span className='d-flex'>
                      <i class='far fa-user-circle advisor-icon'></i>
                      <span className='px-1 pt-2'>Ask an advisor</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className='advisor-text2'></div>
          </div>
        </div>
      </div>
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
