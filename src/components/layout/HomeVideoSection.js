import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VideoImage from './../../assets/images/videoBg.jpg'
import ModalVideo from 'react-modal-video'
import { Row, Col } from 'react-bootstrap'

const HomeVideoSection = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <section
      style={{
        backgroundColor: '#F8F9FD',
        padding: '0px 0px 40px 0'
      }}
    >
      <div className="auto-container">
        <div className="row clearfix ">
          <div className="text-center col-lg-6 col-md-6 col-sm-12">
            {' '}
            {/* Video Section Two */}
            <div className="video-section-two mb-5">
              {/*Video Box*/}
              <div
                className="video-boxed "
                style={{
                  maxWidth: '500px',
                  height: '250px',
                  backgroundImage: 'url(' + VideoImage + ')',
                  borderRadius: '50px 0',
                  overflow: 'hidden'
                }}
              >
                <a
                  className="lightbox-image overlay-box "
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
                    videoId="UDkFztrDrys"
                    onClose={() => setOpen(false)}
                  />
                </div>
              </div>
            </div>
            {/* End Video Section Two */}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="sub-title">Success Story</div>

            <div className="sub-title pb-3 pt-3 ">
              90% of our graduates were employed after 6 months upon graduation
            </div>
            <div className="sub-text pb-5 ">
              Everything we do is designed to make you employable in the modern
              workplace. We offer online, on-demand, and fully-supported
              practical education. Our courses are convenient so you can make
              the most of your time, learn at your own pace and not lose hours
              to travel. We have 1000+ partners who need employees with the
              skill you'll have at the end of our course. This means we can find
              you the right job.
            </div>
            {/* <Link
              activeClass="active"
              className="theme-btn btn-style-three"
              to="/course-grid"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <span className="txt">Find Out More</span>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeVideoSection
