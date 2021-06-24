import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { createJob } from '../../redux/actions/jobAction'
import Loader from './Loader'
import Message from './Message'

const Jobs = () => {
  const dispatch = useDispatch()

  const { success, loading, error } = useSelector((state) => state.jobCreate)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [cv, setCv] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [doc, setDoc] = useState('')
  const [res, setRes] = useState('')

  useEffect(() => {
    if (success) {
      setRes('Request sent Successfully')
    }
  }, [success])

  useEffect(() => {
    const timer = setTimeout(() => {
      setRes('')
      setName('')
      setEmail('')
      setMessage('')
      setPhone('')
      setSubject('')
      setDoc('')
      setCv('')
    }, 5000)
    return () => clearTimeout(timer)
  }, [res])

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
    <section className=" bg-white  mb-5">
      <div className="auto-container">
        <Row className="">
          <Col md={6} className="pr-5">
            <div className="sub-title text-danger text-center-small-screen pb-3">
              CONTACT DETAILS
            </div>
            <div className="title text-center-small-screen pb-3">
              Apply For An Internship
            </div>
            <p className="sub-text text-center-small-screen mb-5">
              We know that anyone can learn to Code, all you need to do is to
              take the First Step. Contact us!
            </p>
            <Row className="address">
              <Col md={2} className="job-icon">
                <i className="fas fa-map-marker-alt"></i>
              </Col>

              <Col>
                <div className="sub-title">Address</div>
                <div className="sub-text">
                  Röntgenvägen 1 141 52, Huddinge, Stockholm, Sweden
                </div>
              </Col>
            </Row>
            <Row className="address mb-3">
              <Col md={2} className="job-icon">
                <i class="far fa-envelope"></i>
              </Col>

              <Col>
                <div className="sub-title">E-mail</div>
                <div className="sub-text">
                  Mail:{' '}
                  <span style={{ color: '#fe4a55', fontWeight: 'bold' }}>
                    info@codifycollege.se
                  </span>
                </div>
              </Col>
            </Row>

            <Row className="address mb-3">
              <Col md={2} className="job-icon">
                <i class="fas fa-phone-volume"></i>
              </Col>

              <Col>
                <div className="sub-title">Contact</div>
                <div className="sub-text">
                  Mobile:{' '}
                  <span style={{ color: '#fe4a55', fontWeight: 'bold' }}>
                    +46-72 33 33 8 99
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="address">
              <Col md={2} className="job-icon">
                <i class="far fa-clock"></i>
              </Col>

              <Col>
                <div className="sub-title">Hours of Operation</div>
                <div className="sub-text">
                  Mon - Fri: 09:00am - 05:00pm Sunday: 09:00am - 05:00pm
                  Saturday: Closed
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
            className="job-contact mt-3 text-center-small-screen p-3 mb-2"
          >
            <div className="title pb-1 ">Ready to Get Started?</div>
            <div className="sub-text">
              Your email address will not be published. Required fields are
              marked *
            </div>

            {loading && <Loader />}
            {error && <Message>{error}</Message>}

            {/* Login Form */}
            {!res ? (
              <div className="styled-form col-lg-12 col-md-12 col-sm-12">
                <form onSubmit={submitHandler}>
                  <div className="row clearfix">
                    {/* Form Group */}
                    <div className="form-group col-lg-7 col-md-12 col-sm-12">
                      <label className="text-white">Your Name (required)</label>
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
                      <label className="text text-white">
                        Your Email (required)
                      </label>
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
                      <label className="text text-white">
                        Your Phone Number (required)
                      </label>
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
                      <label className="text text-white">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    {/* Form Group */}
                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <label className="text text-white">Upload your CV</label>
                      <input
                        type="file"
                        name="cv"
                        onChange={(e) => setCv(e.target.files[0])}
                      />
                    </div>

                    {/* Form Group */}
                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <label className="text text-white">Other Documents</label>
                      <input
                        type="file"
                        name="doc"
                        onChange={(e) => setDoc(e.target.files[0])}
                      />
                    </div>

                    {/* Form Group */}
                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <label className="text text-white">Message</label>
                      <textarea
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />

                      <button className=" pt-3 pb-3 text-white form-group col-lg-12 col-md-12 col-sm-12">
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <Message>{res}</Message>
            )}
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Jobs
