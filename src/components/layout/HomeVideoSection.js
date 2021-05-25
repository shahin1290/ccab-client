import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VideoImage from './../../assets/images/videosImage.gif'
import ModalVideo from 'react-modal-video'
import { Row, Col } from 'react-bootstrap'

const HomeVideoSection = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <section
      style={{
        backgroundColor: 'white', padding : '50px 0'
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
                  backgroundImage: 'url(' + VideoImage + ')',
                  'border-radius': '50px 0',
                  overflow: 'hidden'
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
            <h4>
              Of Our Grads Are Employed Within Six Months
            </h4>
            <div className="sub-text">
              Your career is our mission. Code Institute has redefined education
              – offering online, on-demand, supported learning that helps you
              change career to software development. With 1000+ global hiring
              partners, our focus is to find you the right job and prepare you
              for interviews with our 1:1 Career Support and Mentor sessions.
            </div>
            <Link
              activeClass="active"
              className="theme-btn btn-style-three"
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
  )
}

export default HomeVideoSection
