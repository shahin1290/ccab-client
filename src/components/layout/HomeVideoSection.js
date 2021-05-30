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
        backgroundColor: '#F8F9FD', padding : '100px 0'
      }}
    >
      <div className="auto-container">
        <div className="row clearfix ">
          <div className="text-center col-lg-6 col-md-6 col-sm-12" >
            {' '}
            {/* Video Section Two */}
            <div className="video-section-two mb-5" >
              {/*Video Box*/}
              <div
                className="video-boxed "
                style={{
                  width: '500px',
                  height: '250px',
                  backgroundImage: 'url(' + VideoImage + ')',
                  'border-radius': '50px 0',
                  overflow: 'hidden'
                }}
              >
                <a
                  className="lightbox-image overlay-box "
                  onClick={() => setOpen(true)}
                >
                  <span className="fa fa-play" >
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
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12" >
            <div className="title">90%</div>
            <hr
              style={{
                width: '10%',
                height: '2px',
                backgroundColor: '#e84d1b'
              }}
            />
            <div className="sub-title pb-3">
              Of Our Grads Are Employed Within Six Months
            </div>
            <div className="sub-text pb-5">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeVideoSection
