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
import image0 from './../../assets/images/header/image-1-rec.png'
import image1 from './../../assets/images/header/image-2-rec.png'
import image2 from './../../assets/images/header/image-3-rec.png'
import image3 from './../../assets/images/header/image-4-rec.png'
import image4 from './../../assets/images/header/image-5-rec.png'
import image5 from './../../assets/images/header/image-6-rec.png'
import image6 from './../../assets/images/header/image-7-rec.png'
import image7 from './../../assets/images/header/image-8-rec.png'

const HomeCaousel = () => {
  return (
    <div className="container">
      <section
          className="education-section-two"
          style={{
            backgroundColor: '#fff'
          }}
        >
          <div className="auto-container">
            <div className="row clearfix ">
              {/* Image Column */}
              <div className="image-column  offset-1 d-lg-block d-sm-none col-lg-5 col-md-10 col-sm-10">
                <div className="inner-column ">
                  <div className="image titlt " data-tilt data-tilt-max={4}>
                    {/* Slider Section */}
                    <div
                      className="container carouselContainer overflow-hidden"
                      style={{ marginTop: '60px' }}
                    >
                      <Carousel indicators={true}>
                        <Carousel.Item>
                          <div className="hero-image-box ">
                              <img
                                    className="d-block m-auto w-100 rounded"
                                    src={image0}
                                    alt="First slide"
                                  />

                          </div>
    
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
                        <Carousel.Item>
                          <img
                            className="d-block  w-60  mx-auto w-100"
                            src={image3}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block  w-60  mx-auto w-100"
                            src={image4}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block  w-60  mx-auto w-100"
                            src={image5}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block  w-60  mx-auto w-100"
                            src={image6}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block  w-60  mx-auto w-100"
                            src={image7}
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
              <div className="content-column mt-5 col-lg-6 col-md-12 col-sm-12 hero-text-box ">
               
                  <h1 className="">
                    learn to code, <br />
                    With a New Digital Life
                  </h1>
                  <div className="text header-text ">
                    Start your new Work with our weekly remotely
                    <br /> Tech programs in Web Development.
                    <br />
                    We have a new course every month.
                  </div>
                  <div className="d-flex jutify-content-center ">
        
                    <Link  className="btn btn-warning mt-4 pointer text-white"  
                    activeClass="active"  
                    to="pricing"
                    target="_blank"
                    spy={true} smooth={true} offset={-25} duration={600}>
                      Learn More<span className="ml-2 right-icon">→</span>
                      </Link>
                  </div>
            
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default HomeCaousel
