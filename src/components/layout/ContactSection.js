import React, { useState } from 'react'
import Rodal from 'rodal'
// include styles
import 'rodal/lib/rodal.css'
import ContactForm from './ContactForm'

const ContactSection = () => {
  const [showModal, setShowModal] = useState({ visible: false })

  return (
    <section
      style={{
        backgroundColor: '#445261',
        padding: '80px 0'
      }}
    >
      <div className="auto-container text-center contact-text">
        <div className="title buttons-box">Speak with an Education Advisor</div>
        <div className="sub-text">
          Take the first step to change your life and become a Software
          Developer
        </div>

        <div className="buttons-box">
          <button
            className="theme-btn btn-style-one"
            onClick={() => setShowModal({ visible: true })}
          >
            <span className="txt">Contact</span>
          </button>
        </div>
      </div>
      <Rodal
        animation="rotate"
        visible={showModal.visible}
        onClose={() => setShowModal({ visible: false })}
        width="900"
      >
        <ContactForm />
      </Rodal>
    </section>
  )
}

export default ContactSection
