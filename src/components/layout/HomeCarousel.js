import React from 'react'
import { Carousel } from 'react-bootstrap'
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll'

// images
import image0 from './../../assets/images/header/image-1.jpg'
import image1 from './../../assets/images/header/image-2.jpg'
import image2 from './../../assets/images/header/image-3.jpg'

const HomeCaousel = () => {
  return (
    <div>
      <section
          className="education-section-two"
          style={{
            backgroundColor: '#fff'
          }}
        >
          <div className="auto-container">
            <div className="row clearfix">
              {/* Image Column */}
              <div className="image-column  col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column ">
                  <div className="image titlt " data-tilt data-tilt-max={4}>
                    {/* Slider Section */}
                    <div
                      className="container carouselContainer overflow-hidden"
                      style={{ marginTop: '110px' }}
                    >
                      <Carousel>
                        <Carousel.Item>
                          <img
                            className="d-block m-auto w-100"
                            src={image0}
                            alt="First slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block m-auto w-100"
                            src={image1}
                            alt="Second slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block  w-60  mx-auto w-100"
                            src={image2}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                      </Carousel>
                    </div>
                    {/* <img src={image3} className="w-100" /> */}
                  </div>
                </div>
              </div>
              {/* Content Column */}
              <div className="content-column mt-2 col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2 className="text-center-small-screen">
                    learn to code, <br />
                    With a New digital life
                  </h2>
                  <div className="text header-text text-center-small-screen">
                    Start your new Work with our weekly remotely
                    <br /> Tech programs in Web Development.
                    <br />
                    We have a new course every month.
                  </div>
                  <div className="d-flex jutify-content-center ">
                    <a
                      activeclassName="active"
                      className="theme-btn btn-style-three mx-auto mb-5"
                      href="https://meetings.hubspot.com/sl-melad"
                      target="_blank"
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      <span className="txt">Video Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default HomeCaousel
