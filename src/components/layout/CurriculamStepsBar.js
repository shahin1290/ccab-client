import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Row, Col } from 'react-bootstrap'
import RegisterScreen from '../screens/RegisterScreen'

const CurriculamStepsBar = (props) => {
  const [value, setValue] = useState(0)

  console.log(value)

  const handleChange = (value) => {
    setValue(value)
  }

  return (
    <section
      style={{
        backgroundColor: '#fff',
        padding: '50px 0'
      }}
    >
      <div className="no-gutter auto-container">
        <div className="title text-center p-4">
          Full Stack Developer curriculm
        </div>
        <hr className="block-seperator mb-3" />
        <div className="sub-text text-center mb-5">
          Our Full Stack Developer Courses is made to give you an easy and fast
          path in Web Development. you can build your own web application from
          scratch step by step.{' '}
        </div>
        <div className="row d-flex justify-content-between col-lg-9 col-md-8 col-sm-12 mb-2">
          <div className="sub-title">Preparation</div>
          <div>
            <div className="sub-title">
              Foundation 
            </div>
            <div className="text-center">1 week</div>
          </div>
          <div>
            <div className="sub-title">
              Frontend 
            </div>
            <div className="text-center">18 weeks</div>
          </div>
          <div>
            <div className="sub-title">
              Backend & Database 
            </div>
            <div className="text-center">9 weeks</div>
          </div>
          <div>
            <div className="sub-title">
              Projects 
            </div>
            <div className="text-center">2 weeks</div>
          </div>
        </div>
        <div className="d-flex">
          <Slider
            dots={false}
            value={value}
            onChange={handleChange}
            className="mb-5"
            trackStyle={{backgroundColor: '#F09300'}}
          />
          <span className="pl-2" style={{ whiteSpace: 'nowrap' }}>
            Full Stack Developer
          </span>
        </div>
        {value >= 0 && value <= 20 && (
          <>
            <div className="sub-title">
              {' '}
              <img
                className="svg"
                width="30"
                src="/images/resource/chalkboard-teacher-solid.svg"
              />
              Get Ready for the bootcamp
            </div>
            <div className="title2">
              Our web development course is designed to save time from the
              beginning. our students must register in our platform to start
              your coding journey.{' '}
            </div>
            <ul>
              <li>Our education advisors are ready to help you get started</li>
              <li>
                Take your chance and sign up in our platform for free course now
              </li>
              <li>
                Start your journey to become full stack developer and change
                your life
              </li>
            </ul>
          </>
        )}

        {value > 20 && value <= 42 && (
          <>
            <Row>
              <Col md={1} className="mt-3 text-center">
                <img
                  className="svg"
                  width="30"
                  src="/images/resource/chalkboard-teacher-solid.svg"
                />{' '}
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Developer Tools & workflow</div>
                <div className="sub-text">
                  We offer 24-hour weekday support plus help throughout the
                  weekend, a student care package, individual career support,
                  mentoring and more…
                </div>
              </Col>

              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education far fa-chart-bar"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">HTML5 Basics </div>
                <div className="sub-text">
                  Design your first web page from scratch. Learn the principles
                  of web design and how to write HTML code.
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education fas fa-history"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">JavaScript Basics </div>
                <div className="sub-text">
                  Write programs manipulating variables,Math operation and
                  logical conditions. Change the HTML Doucment and make your
                  first project with JavaScript , HTML5 and CSS3
                </div>
              </Col>

              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education fas fa-university"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Css3 Basics </div>
                <div className="sub-text">
                  Be Creative with new Css3 styling. CSS will give you the
                  flexibility to make modern and responsive web page
                </div>
              </Col>
            </Row>
          </>
        )}

        {value > 42 && value <= 61 && (
          <>
            <Row>
              <Col md={1} className="mt-3 text-center">
                <img
                  className="svg"
                  width="30"
                  src="/images/resource/chalkboard-teacher-solid.svg"
                />{' '}
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Internet theory</div>
                <div className="sub-text">
                  At begning you will learn Web Basics, How the Internet Works.
                  HTTP Request and Response Cycle, Client and Server
                  Architecture and Terminologies
                </div>
              </Col>

              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education far fa-chart-bar"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">JavaScript </div>
                <div className="sub-text">
                  Create responsive web pages for modern browsers using HTML,
                  CSS, and JavaScript. JavaScript, ECMAScript 6, DOM
                  Manipulation, Regular Expressions, Object Oriented
                  Programming, Data Structures & Algorithms. ReactJS, JSX.
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education fas fa-history"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">React JS </div>
                <div className="sub-text">
                  Optimize the functionality of apps using React Router and
                  Redux. Learn up to date advanced React programming with React
                  Hooks, Custom API, and NextJS.
                </div>
              </Col>

              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education fas fa-university"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Building Web products </div>
                <div className="sub-text">
                  Build a richly interactive, front end single page application
                  using a modern framework library like React. Collaborate as a
                  team using Git and GitHub, widely accepted collaboration
                  practices, and Agile development workflows.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value > 62 && value <= 90 && (
          <>
            <Row>
              <Col md={1} className="mt-3 text-center">
                <img
                  className="svg"
                  width="30"
                  src="/images/resource/chalkboard-teacher-solid.svg"
                />{' '}
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Node JS</div>
                <div className="sub-text">
                  Introduction Nodejs, Node File System (FS), Node Package
                  Manager (NPM), Asynchronous Programming, Network requests
                  using Fetch/Axios API.
                </div>
              </Col>

              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education far fa-chart-bar"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Express </div>
                <div className="sub-text">
                  Introduction ExpressJS, Routes with Express, Static server
                  with ExpressJS, next() & Multer middleware, Templates Engines,
                  Data Structures & Algorithms. Advanced NodeJS & ExpressJS,
                  Nodemailer, express validator, Bcrypt and JSON Web Tokens
                  (JWT).
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education fas fa-history"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Mongo DB </div>
                <div className="sub-text">
                  Introduction to Database Management, MongoDB, Mongoose CURD
                  operations, and Mongo Atlas.
                </div>
              </Col>

              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education fas fa-university"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Production with Heroku </div>
                <div className="sub-text">
                  Deploying applications on Heroku. introduction to Cloud
                  Computing.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value > 91 && value <= 99 && (
          <>
            <div className="sub-title">
              {' '}
              <img
                className="svg"
                width="30"
                src="/images/resource/chalkboard-teacher-solid.svg"
              />
              Turn an idea into a product in 2 weeks
            </div>
            <div className="title2">
              Projects Stage is the ultimate experience of the course: produce,
              cast, design, code and deploy a full project in teams during the
              two final weeks you going to work on 2 final project.
            </div>
            <ul>
              <li>Build a creative prototype with Figma to validate the UX</li>
              <li>
                Code the Project from scratch: from the back end to the user
                interface
              </li>
              <li>Deploy your application on a production environment</li>
              <li>Represent your Project during the Demo Day!</li>
            </ul>
          </>
        )}

        {value === 100 && (
          <>
            <Row>
              <Col md={6} className="mt-3 text-center">
                <div className="title pb-1">Get Start Now</div>
              </Col>

              <Col md={1} className="mt-3 text-center">
                <i className="fa-online-education far fa-chart-bar"></i>
              </Col>
              <Col md={5} className="mt-3 text-center-small-screen">
                <div className="sub-title pb-1">Career Serviceability </div>
                <div className="sub-text">
                  We help our graduates to find a job by preparaing them for
                  technical interviews, set up a suitable resume and solid
                  GitHub account.
                </div>
              </Col>
            </Row>

            <div className="mt-5">
              <RegisterScreen />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default CurriculamStepsBar
