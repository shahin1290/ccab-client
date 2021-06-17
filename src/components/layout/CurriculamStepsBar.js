import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Row, Col, ProgressBar } from 'react-bootstrap'
import RegisterScreen from '../screens/RegisterScreen'

const CurriculamStepsBar = (props) => {
  const [value, setValue] = useState(3)
  const weeks = 30

  return (
    <section
      style={{
        backgroundColor: '#fff',
        padding: '50px 0'
      }}
    >
      <div className="curriculum no-gutter auto-container">
        <div className="title text-center p-4">
          Full Stack Developer curriculm
        </div>
        <hr className="block-seperator mb-3" />
        <div className="sub-text text-center mb-5">
          Our Full Stack Developer Courses is made to give you an easy and fast
          path in Web Development. you can build your own web application from
          scratch step by step.{' '}
        </div>

        <div className=" row d-flex justify-content-between col-lg-12 col-md-10 col-sm-10 mb-2">
          <div>
            <a
              onClick={() => setValue(3)}
              className="curriculum"
              style={value === 3 ? { color: '#ea5573' } : {}}
            >
              Foundation
            </a>
            <div className="text-center">1 week</div>
          </div>
          <div>
            <a
              onClick={() => setValue(32)}
              className="curriculum"
              style={value === 32 ? { color: '#ea5573' } : {}}
            >
              Basic Frontend
            </a>
            <div className="text-center">9 weeks</div>
          </div>

          <div>
            <a
              onClick={() => setValue(61)}
              className="curriculum "
              style={value === 61 ? { color: '#ea5573' } : {}}
            >
              Advanced Frontend
            </a>
            <div className="text-center">9 weeks</div>
          </div>
          <div>
            <a
              onClick={() => setValue(90)}
              className="curriculum "
              style={value === 90 ? { color: '#ea5573' } : {}}
            >
              Backend & Database
            </a>
            <div className="text-center">9 weeks</div>
          </div>
          <div>
            <a
              onClick={() => setValue(97)}
              className="curriculum "
              style={value === 97 ? { color: '#ea5573' } : {}}
            >
              Projects
            </a>
            <div className="text-center">2 weeks</div>
          </div>

          <span className=" mt-2 pl-2">
            <a
              onClick={() => setValue(100)}
              className="curriculum "
              style={value === 100 ? { color: '#ea5573' } : {}}
            >
              Full-Stack-Developer
            </a>
          </span>
        </div>
        <div className="row no-gutter">
          <ProgressBar className="col-lg-10 col-md-10 col-sm-10  mt-3 mb-2">
            <ProgressBar variant="warning" now={value} />
          </ProgressBar>
        </div>
        <div className="row  mb-5">
          <div className=" col-lg-11 col-md-8 col-sm-12 mt-2 pl-2 d-flex justify-content-around">
          <span>1</span>
            {[...Array(10).keys()].map((week, index) => (
              <span>{(index + 1) * 3}</span>
            ))}
            <span>∞</span>
          </div>
        </div>

        {value === 3 && (
          <>
            <Row className="mb-5">
              <Col md={6}>
                <div className="d-flex">
                  <span
                    style={{
                      backgroundColor: '#F09300',
                      borderRadius: '3px 3px 3px 3px'
                    }}
                  >
                    <img width="50" src="/images/developer.png" />
                  </span>
                  <span className="sub-title pl-3 pt-1">
                    Developer Tools & workflow
                  </span>
                </div>

                <div className="sub-text mt-3">
                  Work with the right developer tools and workflow.
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <img width="45" src="/images/html.png" />{' '}
                  <div className="sub-title pl-3 pt-3">HTML5 Basics </div>
                </div>
                <div className="sub-text">
                  Design your first web page from scratch. Learn the principles
                  of web design and how to write HTML code.
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="d-flex">
                  <img width="45" src="/images/js.png" />

                  <div className="sub-title pl-3 pt-3">JavaScript Basics </div>
                </div>
                <div className="sub-text">
                  Write programs manipulating variables,Math operation and
                  logical conditions. Change the HTML Doucment and make your
                  first project with JavaScript , HTML5 and CSS3
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <img width="45" src="/images/css.png" />

                  <div className="sub-title pl-3 pt-3">Css3 Basics </div>
                </div>
                <div className="sub-text">
                  Be Creative with new Css3 styling. CSS will give you the
                  flexibility to make modern and responsive web page
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 32 && (
          <>
            <Row className="mb-5">
              <Col md={6}>
                <div className="d-flex">
                  <div>
                    <img width="50" src="/images/internet.png" />
                  </div>
                  <div className="sub-title pl-3 pt-2">Internet theory</div>
                </div>

                <div className="sub-text ">
                  At begning you will learn Web Basics, How the Internet Works.
                  HTTP Request and Response Cycle, Client and Server
                  Architecture and Terminologies
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <img width="45" src="/images/js.png" />{' '}
                  <div className="sub-title pl-3 pt-3">JavaScript </div>
                </div>
                <div className="sub-text">
                  Create responsive web pages for modern browsers using HTML,
                  CSS, and JavaScript. JavaScript, ECMAScript 6, DOM
                  Manipulation, Regular Expressions, Object Oriented
                  Programming, Data Structures & Algorithms. ReactJS, JSX.
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="d-flex">
                  <img width="50" src="/images/react.png" />

                  <div className="sub-title pl-3 pt-3">React JS </div>
                </div>
                <div className="sub-text">
                  Optimize the functionality of apps using React Router and
                  Redux. Learn up to date advanced React programming with React
                  Hooks, Custom API, and NextJS.
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <img width="45" src="/images/building.png" />

                  <div className="sub-title pl-3 pt-3">
                    Building Web products{' '}
                  </div>
                </div>
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

        {value === 61 && (
          <>
            <Row className="mb-5">
              <Col md={6}>
                <div className="d-flex">
                  <div>
                    <img width="50" src="/images/internet.png" />
                  </div>
                  <div className="sub-title pl-3 pt-2">Internet theory</div>
                </div>

                <div className="sub-text ">
                  At begning you will learn Web Basics, How the Internet Works.
                  HTTP Request and Response Cycle, Client and Server
                  Architecture and Terminologies
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <img width="45" src="/images/js.png" />{' '}
                  <div className="sub-title pl-3 pt-3">JavaScript </div>
                </div>
                <div className="sub-text">
                  Create responsive web pages for modern browsers using HTML,
                  CSS, and JavaScript. JavaScript, ECMAScript 6, DOM
                  Manipulation, Regular Expressions, Object Oriented
                  Programming, Data Structures & Algorithms. ReactJS, JSX.
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="d-flex">
                  <img width="50" src="/images/react.png" />

                  <div className="sub-title pl-3 pt-3">React JS </div>
                </div>
                <div className="sub-text">
                  Optimize the functionality of apps using React Router and
                  Redux. Learn up to date advanced React programming with React
                  Hooks, Custom API, and NextJS.
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <img width="45" src="/images/building.png" />

                  <div className="sub-title pl-3 pt-3">
                    Building Web products{' '}
                  </div>
                </div>
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

        {value === 90 && (
          <>
            <Row className="mb-5">
              <Col md={6}>
                <div className="d-flex">
                  <div>
                    <img width="50" src="/images/node.png" />
                  </div>
                  <div className="sub-title pl-3 pt-3">Node JS</div>
                </div>

                <div className="sub-text ">
                  Introduction Nodejs, Node File System (FS), Node Package
                  Manager (NPM), Asynchronous Programming, Network requests
                  using Fetch/Axios API.
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <span className="sub-title pl-3 pt-3 pr-3">Express </span>
                  <img width="45" src="/images/js.png" />{' '}
                </div>
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
              <Col md={6}>
                <div className="d-flex">
                  <img width="60" src="/images/mongo.png" />

                  <div className="sub-title pl-2 pt-3">Mongo DB </div>
                </div>
                <div className="sub-text">
                  Introduction to Database Management, MongoDB, Mongoose CURD
                  operations, and Mongo Atlas.
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <img width="55" src="/images/heroku.png" />

                  <div className="sub-title pl-3 pt-3">
                    Production with Heroku
                  </div>
                </div>
                <div className="sub-text">
                  Deploying applications on Heroku. introduction to Cloud
                  Computing.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 97 && (
          <Row className="curriculum-project">
            <div className="sub-title">
              <img width="55" src="/images/rocket.png" />
              <span className="pl-3">
                Turn an idea into a product in 2 weeks
              </span>
            </div>
            <div className="sub-text">
              Projects Stage is the ultimate experience of the course: produce,
              cast, design, code and deploy a full project in teams during the
              two final weeks you going to work on 2 final project.
            </div>
            <ul className="sub-text pl-3">
              <li>Build a creative prototype with Figma to validate the UX</li>
              <li>
                Code the Project from scratch: from the back end to the user
                interface
              </li>
              <li>Deploy your application on a production environment</li>
              <li>Represent your Project during the Demo Day!</li>
            </ul>
          </Row>
        )}

        {value === 100 && (
          <>
            <Row>
              <Col md={6} className="mt-3 text-center">
                <div className="title pb-1">Get Start Now</div>
              </Col>

              <Col>
                <img width="45" src="/images/career.png" />

                <span className="sub-title  pl-3 ">Career Serviceability </span>
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
