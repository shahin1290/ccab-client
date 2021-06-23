import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { createJob } from '../../redux/actions/jobAction';

const Jobs = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [cv, setCv] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [doc, setDoc] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('phone', phone)
    data.append('subject', subject)
    data.append('message', message)
    data.append('cv_path', cv)
    data.append('doc_path', doc)

    dispatch(createJob(data))
  }
  

  return (
    <section
    className="mt-5"
    >
      <div className="auto-container">
        <Row className="pt-3 pb-1">
          <Col md={6} className="mt-3">
            <div className="sub-title text-danger">CONTACT DETAILS</div>
            <div className="title">Apply For An Internship</div>
            <p className="sub-text">
              We know that anyone can learn to Code, all you need to do is to
              take the First Step. Contact us!
            </p>
            <div></div>
          </Col>
          <Col
            md={6}
            className="mt-3 text-center-small-screen p-3 mb-2 bg-info text-white"
          >
            <div className="sub-title pb-1 ">Ready to Get Started?</div>
            <div className="sub-text">
              Your email address will not be published. Required fields are
              marked *
            </div>

            {/* Login Form */}
            <div className="styled-form col-lg-12 col-md-12 col-sm-12">
              <form onSubmit={submitHandler}>
                <div className="row clearfix">
                  {/* Form Group */}
                  <div className="form-group col-lg-7 col-md-12 col-sm-12">
                    <label>Your Name (required)</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-7 col-md-12 col-sm-12">
                    <label>Your Email (required)</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-7 col-md-12 col-sm-12">
                    <label>Your Phone Number (required)</label>
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  {/* Form Group */}
                  <div className="form-group col-lg-7 col-md-12 col-sm-12">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  {/* Form Group */}
                  <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label>Upload your CV</label>
                    <input
                      type="file"
                      name="cv"
                      onChange={(e) => setCv(e.target.files[0])}
                    />
                  </div>

                  {/* Form Group */}
                  <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label>Other Documents</label>
                    <input
                      type="file"
                      name="doc"
                      onChange={(e) => setDoc(e.target.files[0])}
                    />
                  </div>

                  {/* Form Group */}
                  <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <label>Message</label>
                    <textarea
                      type="text"
                      value={message}
                      placeholder="Your Message here"
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                    <button type="submit" className="theme-btn btn-style-three">
                      <span className="txt">
                        Send <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Jobs
