import React from 'react'
import { Row, Col } from 'react-bootstrap'
import arrow from './../../assets/images/services/arrow.png'

export default function ServiceSteps() {
  return (
    <section className="mt-2">
      <div
        className="title text-center pb-3 "
        style={{ color: '#ec6f77' }}
      >
        Expertly Designed Learning Experiences For All Grades
      </div>
      <div style={{ height: 'auto', backgroundColor: '#ec6f77' }}>
        <div className="sub-title auto-container py-5 text-white h2">
          <div>
            Our goal was to create universal access to learning experiences that
            are high quality, interactive, and affordable for all students. We
            did this with the best instructors, media, and technology available.
          </div>
        </div>
      </div>
    </section>
  )
}
