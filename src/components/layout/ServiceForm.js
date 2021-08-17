import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import logo from './../../assets/images/logoBody.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'
import Message from './Message'

export const serviceSchema = Yup.object().shape({
  message: Yup.string()
    .required('First Name is required')
    .min(2, 'First must be at least 2 characters')
    .max(15, 'First must not exceed 15 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),

  service: Yup.string().required('Please choose an option'),
  phone: Yup.string().required('Phone number is missing')
})

const ServiceForm = () => {
  const [response, setResponse] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(serviceSchema)
  })

  const submitHandler = async ({ message, service, phone, email }) => {
    try {
      const res = await axios.post('http://localhost:5001/contact', {
        message,
        service,
        phone,
        email
      })
      setResponse(res.data)
      reset()
    } catch (error) {
      setResponse(error)
    }
  }

  return (
    <section
      className="mb-5 pt-5 pb-5"
      style={{ background: '#FAFAFA', width: '100%', height: '800px' }}
    >
      <div className="text-center">
        <div className="title" style={{ color: '#EB6C85' }}>
          Contact us now for more information
        </div>
        <div className="sub-title">
          We are happy to tell you more about our services!
        </div>
      </div>
      <Row className="auto-container mx-auto pt-5">
        <Col md={3}>
          <div className="mt-5 pt-5">
            <img src={logo} width="80%" alt="logo" />
          </div>
        </Col>
        <Col md={5}>
          <form
            onSubmit={handleSubmit(submitHandler)}
            style={{ width: '400px', height: '300px' }}
          >
            <div
              className="bg-white p-3"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                borderRadius: '3px'
              }}
            >
              {response && <Message>{response}</Message>}

              <div class="form-group">
                <label for="exampleFormControlSelect3">
                  How can we help you ?
                </label>
                <select
                  {...register('service')}
                  className={`form-control ${
                    errors.service ? 'is-invalid' : ''
                  }`}
                  id="exampleFormControlSelect3"
                >
                  <option value="" selected>
                    Select an option
                  </option>
                  <option value="1">
                    I want to know more about your services
                  </option>
                  <option value="2">
                    I am looking for a job and have a question
                  </option>
                  <option value="3">
                    I have your service and have a question
                  </option>
                  <option value="4">I'm an employee and have a question</option>
                </select>
                <div className="invalid-feedback">
                  {errors.service?.message}
                </div>
              </div>

              <div class="form-group">
                <label for="exampleFormControlInput1">Mobile Number</label>
                <input
                  id="exampleFormControlInput1"
                  placeholder="Mobile number"
                  {...register('phone')}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.phone?.message}</div>
              </div>

              <div class="form-group">
                <label for="exampleFormControlInput2">Email Address</label>
                <input
                  id="exampleFormControlInput2"
                  placeholder="Email"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div class="form-group">
                <label for="exampleFormControlTextarea1">Message</label>
                <textarea
                  {...register('message')}
                  className={`form-control ${
                    errors.message ? 'is-invalid' : ''
                  }`}
                  rows="3"
                  placeholder="Your message"
                  id="exampleFormControlTextarea1"
                ></textarea>

                <div className="invalid-feedback">
                  {errors.message?.message}
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <button
                type="submit"
                className="theme-btn btn-style-three  mt-4 mb-5"
              >
                <span className="txt">
                  Contact Me <i className="fa fa-angle-right" />
                </span>
              </button>
            </div>
          </form>
        </Col>
        <Col md={3}>
          <div className="service-list p-4">
            <div className="sub-title pb-2">
              Homework help that gives results:
            </div>
            <ul>
              <li>Own certified private teacher Available in all subjects</li>
              <li> Start with a try-out lesson</li>
              <li>Satisfaction guarantee</li>
              <li>Strong motivation & study technique</li>
              <li>9 out of 10 reach their study goals!</li>
              <li>All times & days of the week </li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default ServiceForm
