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
        backgroundColor: '#252841',
        padding: '80px 0'
      }}
    >
      <div className="auto-container text-center contact-text">
        <div className="title buttons-box">Our education advisor are ready to help you get started</div>
        <div className="sub-text">
        Fill the contact form, ask your questions and get feedback from an education advisor 
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
