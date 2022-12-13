import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Row, Col, ProgressBar } from "react-bootstrap";
import RegisterScreen from "../screens/authScreen/RegisterScreen";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const CurriculamStepsBar = (props) => {
  const [value, setValue] = useState(6);
  const weeks = 30;

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      style={{
        padding: "50px 0",
        background: " rgb(234, 246, 255)",
      }}
      id='Curriculum'
    >
      <div className='curriculum no-gutter auto-container'>
        <div
          data-aos='fade-right'
          data-aos-delay='200'
          className='title text-center pb-1 w-100'
        >
          Comprehensive Curriculum
        </div>
        <hr className='block-seperator mb-3' />

        <div
          data-aos='fade-left'
          data-aos-delay='400'
          className='sub-text text-center mb-5 w-100'
        >
          Our Full Stack Developer Courses are made to give you an easy and fast
          path in web development. By the end these courses you will be able to
          build web applications from scratch.
        </div>

        <div
          data-aos='flip-right'
          className='curriculmTitle   d-flex justify-content-between w-100 '
        >
          <div>
            <a
              onClick={() => setValue(6)}
              className='curriculum'
              style={value === 6 ? { color: "#ea5573", fontWeight: "800" } : {}}
            >
              Fundamentals of Web apps
              <div className='text-center text-muted'>2 weeks</div>
            </a>
          </div>

          <div>
            <a
              onClick={() => setValue(23)}
              className='curriculum'
              style={
                value === 23 ? { color: "#ea5573", fontWeight: "800" } : {}
              }
            >
              Basic Frontend
              <div className='text-center text-muted'>5 weeks</div>
            </a>
          </div>

          <div>
            <a
              onClick={() => setValue(40)}
              className='curriculum'
              style={
                value === 40 ? { color: "#ea5573", fontWeight: "800" } : {}
              }
            >
              Advanced Frontend
              <div className='text-center text-muted'>5 weeks</div>
            </a>
          </div>

          <div>
            <a
              onClick={() => setValue(57)}
              className='curriculum'
              style={
                value === 57 ? { color: "#ea5573", fontWeight: "800" } : {}
              }
            >
              Basic Backend & Database
              <div className='text-center text-muted'>5 weeks</div>
            </a>
          </div>

          <div>
            <a
              onClick={() => setValue(73)}
              className='curriculum'
              style={
                value === 73 ? { color: "#ea5573", fontWeight: "800" } : {}
              }
            >
              Advanced Backend & Database
              <div className='text-center text-muted'>5 weeks</div>
            </a>
          </div>

          <div>
            <a
              onClick={() => setValue(90)}
              className='curriculum'
              style={
                value === 90 ? { color: "#ea5573", fontWeight: "800" } : {}
              }
            >
              Native mobile app
              <div className='text-center text-muted'>5 weeks</div>
            </a>
          </div>

          <div>
            <a
              onClick={() => setValue(100)}
              className='curriculum'
              style={
                value === 100 ? { color: "#ea5573", fontWeight: "800" } : {}
              }
            >
              Projects
              <div className='text-center text-muted'>3 weeks</div>
            </a>
          </div>
        </div>
        <div className='meter'>
          <span style={{ width: `${value}%` }}></span>
        </div>
        <div className='row no-gutter'></div>
        <div className='row  mb-5'>
          <div className=' col-lg-12 col-md-8 col-sm-12 mt-2  d-flex justify-content-around '>
            <a
              onClick={() => setValue(6)}
              className='curriculum'
              style={value === 6 ? { color: "#ea5573" } : {}}
            >
              <span style={{ paddingRight: "20px" }}>1</span>
            </a>

            {/* {[...Array(10).keys()].map((week, index) => (
              <span>{(index + 1) * 3}</span>
            ))} */}
            <a
              onClick={() => setValue(23)}
              className='curriculum '
              style={value === 23 ? { color: "#ea5573" } : {}}
            >
              <span>5</span>
            </a>

            <a
              onClick={() => setValue(40)}
              className='curriculum '
              style={value === 40 ? { color: "#ea5573" } : {}}
            >
              <span>10</span>
            </a>

            <a
              onClick={() => setValue(57)}
              className='curriculum '
              style={value === 57 ? { color: "#ea5573" } : {}}
            >
              <span>15</span>
            </a>

            <a
              onClick={() => setValue(73)}
              className='curriculum '
              style={value === 73 ? { color: "#ea5573" } : {}}
            >
              <span>20</span>
            </a>

            <a
              onClick={() => setValue(90)}
              className='curriculum '
              style={value === 90 ? { color: "#ea5573" } : {}}
            >
              <span>25</span>
            </a>

            <a
              onClick={() => setValue(100)}
              className='curriculum '
              style={value === 100 ? { color: "#ea5573" } : {}}
            >
              <span>30</span>
            </a>
          </div>
        </div>

        {value === 6 && (
          <>
            <Row data-aos='fade-up' className='mb-5'>
              <Col md={6}>
                <div className='d-flex'>
                  <span
                    style={{
                      backgroundColor: "#F09300",
                      borderRadius: "3px 3px 3px 3px",
                    }}
                  >
                    <img alt="ccab" width='50' src='/images/developer.png' />
                  </span>
                  <span className='sub-title pl-3 pt-1'>
                    Developer Tools & workflow
                  </span>
                </div>

                <div className='sub-text mt-3'>
                  Work with the right developer tools and workflow.
                </div>
              </Col>

              <Col md={6} className='p-3'>
                <div className='d-flex'>
                  <img alt="ccab" width='45' src='/images/html.png' />{" "}
                  <div className='sub-title pl-3 pt-3'>HTML5 Basics </div>
                </div>
                <div className='sub-text'>
                  Design your first web page from scratch. Learn the principles
                  of web design and how to write HTML code.
                </div>
              </Col>
            </Row>

            <Row data-aos='fade-up'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='45' src='/images/js.png' />

                  <div className='sub-title pl-3 pt-3'>JavaScript Basics </div>
                </div>
                <div className='sub-text'>
                  Write programs manipulating variables,Math operation and
                  logical conditions. Change the HTML Doucment and make your
                  first project with JavaScript , HTML5 and CSS3
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='45' src='/images/css.png' />

                  <div className='sub-title pl-3 pt-3'>Css3 Basics </div>
                </div>
                <div className='sub-text'>
                  Be Creative with new Css3 styling. CSS will give you the
                  flexibility to make modern and responsive web page
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 23 && (
          <>
            <Row data-aos='fade-up' className='mb-5'>
              <Col md={6}>
                <div className='d-flex'>
                  <div>
                    <img alt="ccab" width='50' src='/images/internet.png' />
                  </div>
                  <div className='sub-title pl-3 pt-2'>Internet theory</div>
                </div>

                <div className='sub-text '>
                  At begning you will learn Web Basics, How the Internet Works.
                  HTTP Request and Response Cycle, Client and Server
                  Architecture and Terminologies
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='45' src='/images/js.png' />{" "}
                  <div className='sub-title pl-3 pt-3'>JavaScript </div>
                </div>
                <div className='sub-text'>
                  Create responsive web pages for modern browsers using HTML,
                  CSS, and JavaScript. JavaScript, ECMAScript 6, DOM
                  Manipulation, Regular Expressions, Object Oriented
                  Programming, Data Structures & Algorithms.
                </div>
              </Col>
            </Row>

            <Row data-aos='fade-up'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='50' src='/images/bootstrap.png' />

                  <div className='sub-title pl-3 pt-3'>
                    Advanced Style Technology
                  </div>
                </div>
                <div className='sub-text'>
                  Build fast, responsive sites with Bootstrap4, Learn how to use
                  Bootstrap, and build websites in couple of hours,Advanced Css3
                  using flexbox and Grid System technology, animation and
                  transition. Sass extension, Sass module, and variables, write
                  optmized and resuable style using Sass.
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='45' src='/images/screen.png' />

                  <div className='sub-title pl-3 pt-3'>
                    Building Modren Website{" "}
                  </div>
                </div>
                <div className='sub-text'>
                  Build a richly interactive, a modern front end application
                  using advanced Css3,Bootstrap4 and HTML5. Collaborate as a
                  team using Git and GitHub, widely accepted collaboration
                  practices, and Agile development workflows.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 40 && (
          <>
            <Row data-aos='fade-up' className='mb-5'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='50' src='/images/react.png' />

                  <div className='sub-title pl-3 pt-3'>React JS </div>
                </div>
                <div className='sub-text'>
                  Optimize the functionality of apps using React Router. Learn
                  up to date advanced React programming with React Hooks, Custom
                  API, and NextJS.
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='45' src='/images/es6.svg' />{" "}
                  <div className='sub-title pl-3 pt-3'>Event-Driven APIs </div>
                </div>
                <div className='sub-text'>
                  Implementing asynchronous APIs to send multiple responses to a
                  single request. API security that is categorized into
                  authentication and authorization. Using event-driven APIs has
                  become key to meet customer demand and provide a better user
                  experience. Since there are several fundamental differences
                  between REST and async APIs
                </div>
              </Col>
            </Row>

            <Row data-aos='fade-up'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='50' src='/images/redux.png' />

                  <div className='sub-title pl-3 pt-3'>Redux </div>
                </div>
                <div className='sub-text'>
                  Master an open-source JavaScript library for managing
                  application state. Redux is most commonly used with libraries
                  such as React or Angular for building user interfaces.
                  Centralizing your application's state and logic enables
                  powerful capabilities like undo/redo, state persistence, and
                  much more.
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='45' src='/images/building.png' />

                  <div className='sub-title pl-3 pt-3'>
                    Building Web products{" "}
                  </div>
                </div>
                <div className='sub-text'>
                  Build a richly interactive, front end single page application
                  using a modern framework library like React. Collaborate as a
                  team using Git and GitHub, widely accepted collaboration
                  practices, and Agile development workflows.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 57 && (
          <>
            <Row data-aos='fade-up' className='mb-5'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='50' src='/images/internet.png' />
                  <span className='sub-title pl-3 pt-3 pr-3'>
                    Communicating with server{" "}
                  </span>
                </div>
                <div className='sub-text'>
                  How JavaScript code in the browser can fetch and handle data
                  stored in a remote backend server.
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <div>
                    <img alt="ccab" width='50' src='/images/node.png' />
                  </div>
                  <div className='sub-title pl-3 pt-3'>Node JS</div>
                </div>

                <div className='sub-text '>
                  Introduction Nodejs, Node File System (FS), Node Package
                  Manager (NPM), Asynchronous Programming, Network requests
                  using Fetch/Axios API.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 73 && (
          <>
            <Row data-aos='fade-up' className='mb-5'>
              <Col md={6}>
                <div className='d-flex'>
                  <span className='sub-title pl-3 pt-3 pr-3'>Express </span>
                  <img alt="ccab" width='45' src='/images/js.png' />{" "}
                </div>
                <div className='sub-text'>
                  Introduction ExpressJS, Routes with Express, Static server
                  with ExpressJS, next() & Multer middleware, Templates Engines,
                  Data Structures & Algorithms. Advanced NodeJS & ExpressJS,
                  Nodemailer, express validator, Bcrypt and JSON Web Tokens
                  (JWT).
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='60' src='/images/mongo.png' />

                  <div className='sub-title pl-2 pt-3'>Mongo DB </div>
                </div>
                <div className='sub-text'>
                  Introduction to Database Management, MongoDB, Mongoose CURD
                  operations, and Mongo Atlas.
                </div>
              </Col>
            </Row>

            <Row data-aos='fade-up'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='55' src='/images/heroku.png' />

                  <div className='sub-title pl-3 pt-3'>
                    Production with Heroku
                  </div>
                </div>
                <div className='sub-text'>
                  Deploying applications on Heroku. introduction to Cloud
                  Computing.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 90 && (
          <>
            <Row data-aos='fade-up' className='mb-5'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='50' src='/images/react.png' />

                  <div className='sub-title pl-3 pt-3'>
                    Introduction to React Native
                  </div>
                </div>

                <div className='sub-text '>
                  During this part, we will learn how to build an actual React
                  Native application from bottom up. We will learn concepts such
                  what are React Native's core components, how to create
                  beautiful user interfaces, how to communicate with a server
                  and how to test a React Native application.
                </div>
              </Col>

              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='50' src='/images/react.png' />

                  <span className='sub-title pl-3 pt-3 pr-3'>
                    React Native basics{" "}
                  </span>
                </div>
                <div className='sub-text'>
                  In this section, we will learn how to build user interfaces
                  with React Native's core components, how to add style
                  properties to these core components, how to transition between
                  views, and how to manage form's state efficiently.
                </div>
              </Col>
            </Row>

            <Row data-aos='fade-up'>
              <Col md={6}>
                <div className='d-flex'>
                  <img alt="ccab" width='50' src='/images/internet.png' />

                  <div className='sub-title pl-2 pt-3'>
                    Communicating with server{" "}
                  </div>
                </div>
                <div className='sub-text'>
                  In this section, we will learn how to communicate with a
                  server using HTTP requests, how to use Apollo Client in a
                  React Native application, and how to store data in the user's
                  device.
                </div>
              </Col>
            </Row>
          </>
        )}

        {value === 100 && (
          <Row data-aos='fade-up' className='curriculum-project p-3'>
            <div className='sub-title'>
              <img alt="ccab" width='55' src='/images/rocket.png' />
              <span className='pl-3'>
                Turn an idea into a product in 2 weeks
              </span>
            </div>
            <div className='sub-text p-2'>
              Projects Stage is the ultimate experience of the course: produce,
              cast, design, code and deploy a full project in teams during the
              two final weeks you going to work on 2 final project.
            </div>
            <ul className='sub-text p-4'>
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
      </div>
    </section>
  );
};

export default CurriculamStepsBar;
