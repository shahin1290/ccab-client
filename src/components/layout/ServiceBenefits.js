import React from 'react'
import { Row, Col } from 'react-bootstrap'
import arrow from './../../assets/images/services/arrow.png'

export default function ServiceSteps() {
  return (
    <section className="mt-3">
      <div className="title text-center pb-3" style={{ color: '#ec6f77' }}>
        What Stands Out Our Learning Platform
      </div>
      <div style={{ height: 'auto', backgroundColor: '#ec6f77' }}>
        <div className="sub-title3 auto-container py-3">
          <div className="service-circle">100% Online Classes</div>
          <div className="service-circle">Join daily live classes</div>
          <div className="service-circle">
            Test Yourself with Practice Questions
          </div>
          <div className="service-circle">
            Ask a Question and Get Instant Solutions
          </div>
          <div className="service-circle">
            Video lessons, quizzes, and exams are available
          </div>
        </div>
      </div>
    </section>
  )
}
