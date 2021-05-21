import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rodal from 'rodal'
import VideoImage from './../../assets/images/videosImage.gif'
import ModalVideo from 'react-modal-video'

// include styles
import 'rodal/lib/rodal.css'
import ContactForm from './ContactForm'

const OnlineEducationProspect = () => {
  const [isOpen, setOpen] = useState(false)
  const [showModal, setShowModal] = useState({ visible: false })
  const switchUpRatting = 4.6
  const facebookRating = 4.7
  const googleRating = 4.8
  const courseReportRating = 4.3

  return (
    <>
      <section
        style={{
          backgroundColor: 'white',
          padding: '80px 0',
          fontFamily: 'Montserrat'
        }}
      >
        <div className="auto-container">
          <div className="title text-center p-4 ">
            Redefining Online Education
          </div>
          <hr className="block-seperator" />
          <Row className="mt-5 pt-3">
            <Col md={1}>
              <i className="fa-online-education fas fa-code"></i>
            </Col>
            <Col md={5} className="pl-4">
              <div className="sub-title ">Skills for your new career</div>
              <div className="sub-text">
                Learn the most in-demand programming languages: Python,
                JavaScript and much more.
              </div>
            </Col>

            <Col md={1}>
              <i className="fa-online-education fas fa-user-tie"></i>
            </Col>
            <Col md={5} className="pl-4">
              <div className="sub-title ">Employment Matchmaking</div>
              <div className="sub-text">
                Over 1000 employment partners worldwide. We strive to match you
                to the right career.
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={1}>
              <i className="fa-online-education fas fa-chalkboard-teacher"></i>
            </Col>
            <Col md={5} className="pl-4">
              <div className="sub-title ">Supported Learning</div>
              <div className="sub-text">
                24/5 + Weekend Tutor Support, Student Care, Personalised Career
                Support, 1:1 Mentoring, and more.
              </div>
            </Col>

            <Col md={1}>
              <i className="fa-online-education far fa-chart-bar"></i>
            </Col>
            <Col md={5} className="pl-4">
              <div className="sub-title ">Learning Analytics</div>
              <div className="sub-text">
                We track and monitor your progression with our custom-built
                analytics software. If needed, we intervene with human support.
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={1}>
              <i className="fa-online-education fas fa-university"></i>
            </Col>
            <Col md={5} className="pl-4">
              <div className="sub-title ">Academic Qualification</div>
              <div className="sub-text">
                Europe’s only university credit-rated online coding Bootcamp.
                EQF & RQF, Level 5.
              </div>
            </Col>

            <Col md={1}>
              <i className="fa-online-education fas fa-history"></i>
            </Col>
            <Col md={5} className="pl-4">
              <div className="sub-title ">
                Industry-Validated Every Six Months
              </div>
              <div className="sub-text">
                The Industry Advisory Council (IAC) comprises industry
                employers, recruiters, academics, enterprise organisations, and
                startups.
              </div>
            </Col>
          </Row>

          {/* Setting The Standard In Online Education */}

          <div className="title text-center p-4 mt-5">
            Setting The Standard In Online Education
          </div>
          <hr className="block-seperator" />
          <div className="sub-text text-center">
            We are setting the global standard for online education. We are the
            only University Credit-Rated Bootcamp in Europe. Some of our
            education partners include:
          </div>
          <Row className="mt-5 pt-3">
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/eu.jpg" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/eu.png" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/scqf.png" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/gateway.jpg" />
            </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/csn.jpg" />
            </Col>
          </Row>

          <section
            style={{
              backgroundColor: 'white',
              padding: '80px 0',
              fontFamily: ''
            }}
          >
            <div className="auto-container">
              <Row className="mt-5 p-5">
                <Col xs={6}>
                  {' '}
                  {/* Video Section Two */}
                  <div className="video-section-two">
                    {/*Video Box*/}
                    <div
                      className="video-boxed"
                      style={{
                        width: '500px',
                        height: '250px',
                        backgroundImage: 'url(' + VideoImage + ')'
                      }}
                    >
                      <a
                        className="lightbox-image overlay-box"
                        onClick={() => setOpen(true)}
                      >
                        <span className="fa fa-play">
                          <i className="ripple" />
                        </span>
                      </a>
                      <div className="sub-title ">
                        Watch Intro <br /> Video
                      </div>
                      <div onContextMenu="return false">
                        <ModalVideo
                          channel="youtube"
                          youtube={{
                            controls: 1,
                            modestbranding: 1,
                            showinfo: 0
                          }}
                          isOpen={isOpen}
                          videoId="Uqn5LJd_6gU"
                          onClose={() => setOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* End Video Section Two */}
                </Col>
                <Col xs={6}>
                  <div className="title">90%</div>
                  <hr
                    style={{
                      width: '10%',
                      height: '2px',
                      backgroundColor: '#e84d1b'
                    }}
                  />
                  <div className="sub-title">
                    Of Our Grads Are Employed Within Six Months
                  </div>
                  <div className="sub-text">
                    Your career is our mission. Code Institute has redefined
                    education – offering online, on-demand, supported learning
                    that helps you change career to software development. With
                    1000+ global hiring partners, our focus is to find you the
                    right job and prepare you for interviews with our 1:1 Career
                    Support and Mentor sessions.
                  </div>
                  <Link
                    activeClass="active"
                    className="theme-btn btn-style-six"
                    to="HOW-IT-WORKS"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                  >
                    <span className="txt">Find Out More</span>
                  </Link>
                </Col>
              </Row>
            </div>
          </section>
        </div>
      </section>
      <section
        style={{
          backgroundColor: '#fff',
          fontFamily: ''
        }}
      >
        <div className="auto-container text-center">
          <Row className="mb-5 pb-5">
            <Col md={{ span: 1, offset: 1 }}>
              <img src="images/switchup.png" />
              <div className="sub-text">{switchUpRatting}/5 Rating</div>

              <div class="star-ratings-sprite">
                <span
                  style={{
                    width: ` ${Math.round((switchUpRatting / 5) * 100)}%`
                  }}
                  class="star-ratings-sprite-rating"
                ></span>
              </div>
            </Col>
            <Col md={{ span: 1, offset: 2 }}>
              <img src="images/facebook.png" />
              <div className="sub-text">{facebookRating}/5 Rating</div>
              <div class="star-ratings-sprite">
                <span
                  style={{
                    width: ` ${Math.round((facebookRating / 5) * 100)}%`
                  }}
                  class="star-ratings-sprite-rating"
                ></span>
              </div>
            </Col>
            <Col md={{ span: 1, offset: 2 }}>
              <img src="images/google.png" />
              <div className="sub-text">{googleRating}/5 Rating</div>
              <div class="star-ratings-sprite">
                <span
                  style={{
                    width: ` ${Math.round((googleRating / 5) * 100)}%`
                  }}
                  class="star-ratings-sprite-rating"
                ></span>
              </div>
            </Col>
            <Col md={{ span: 1, offset: 2 }}>
              <img src="images/coursereport.png" />
              <div className="sub-text">{courseReportRating}/5 Rating</div>
              <div class="star-ratings-sprite">
                <span
                  style={{
                    width: ` ${Math.round((courseReportRating / 5) * 100)}%`
                  }}
                  class="star-ratings-sprite-rating"
                ></span>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section
        style={{
          backgroundColor: '#445261',
          padding: '80px 0'
        }}
      >
        <div className="auto-container text-center contact-text">
          <div className="title buttons-box">
            Speak with an Education Advisor
          </div>
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
          width="1000"
          height="700"
        >
          <ContactForm />
        </Rodal>
      </section>
    </>
  )
}

export default OnlineEducationProspect
