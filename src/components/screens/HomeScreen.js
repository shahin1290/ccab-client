import React, { useEffect } from 'react'
import 'malihu-custom-scrollbar-plugin'
import TopCourses from './../layout/TopCourses'
import { Carousel } from 'react-bootstrap'
import CountUp from 'react-countup'
import { useSelector, useDispatch } from 'react-redux'
import { getUesrsNumbers } from './../../redux/actions/userAction'

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
import image3 from './../../assets/images/image-3.png'
import image4 from './../../assets/images/image-4.png'
import OnlineEducationProspect from '../layout/OnlineEducationProspect'
import RatingSection from '../layout/RatingSection'
import ContactSection from '../layout/ContactSection'
import HomeVideoSection from '../layout/HomeVideoSection'
export default function HomeScreen({ match }) {
  const dispatch = useDispatch()
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  const { usersCount } = useSelector((state) => state.userNumbers)

  useEffect(() => {
    dispatch(getUesrsNumbers())
  }, [dispatch])
  console.log(usersCount)

  return (
    <>
      <div className="home">
        {/* Education Section Two */}
        <section
          className="education-section-two"
          style={{
            backgroundColor: '#fff'
          }}
        >
          <div className="auto-container">
            <div className="row clearfix">
              {/* Image Column */}
              <div className="image-column  col-lg-7 col-md-12 col-sm-12">
                <div className="inner-column ">
                  <div className="image titlt " data-tilt data-tilt-max={4}>
                    {/* Slider Section */}
                    <div
                      className="container carouselContainer"
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
              <div className="content-column mt-0 col-lg-5 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2>
                    Learn Full-Stack <br /> Web Development
                  </h2>
                  <div className="text header-text">
                    Codify College’s Full Stack Web Development Bootcamp is a
                    remote bootcamp for anyone who wants to build apps to solve
                    real-world problems on the web.
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
                    <span className="txt">Learn More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* End Banner Section */}
        {/* End Education Section Two */}
        <TopCourses></TopCourses>

        <OnlineEducationProspect />

        <HomeVideoSection />

        {/* Achievement Section Two */}
        <section className="achievements-section-two">
          {/* Pattern Layer */}
          <div
            className="pattern-layer"
            style={{ backgroundImage: 'url(images/background/pattern-1.png)' }}
          />
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title style-two light centered mb-5">
              <h2>Our achievements</h2>
            </div>
            {/* Fact Counter */}
            <div className="fact-counter-two ">
              <div className="row clearfix">
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInLeft"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-course" />
                      </div>
                      <h4 className="counter-title">Total Courses</h4>
                      <div className="count-outer count-box">
                        <CountUp
                          start={-2}
                          end={courseList.length}
                          duration={2.75}
                          separator=" "
                          decimal=","
                          suffix="+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInUp"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-course-1" />
                      </div>
                      <h4 className="counter-title">Total Student</h4>
                      <div className="count-outer count-box alternate">
                        <CountUp
                          start={-2}
                          end={usersCount ? usersCount : 0}
                          duration={2.75}
                          separator=" "
                          decimal=","
                          suffix="+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInRight"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-world" />
                      </div>
                      <h4 className="counter-title">Global Position</h4>
                      <div className="count-outer count-box">
                        <CountUp
                          start={-2}
                          end={4}
                          duration={1.5}
                          separator=" "
                          decimal=","
                          suffix="+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Achievement Section */}

        {/* Program Section */}
        <section className="program-section mt-5 pt-5">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Content Column */}
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column text-center">
                  <div className="title">Who is this program for ?</div>
                  <hr className="block-seperator mt-4" />
                  <div className="text">
                    <div className="sub-text">
                      People who wish to transition to a career as a Developer
                      or looking to add the latest tech stack to their current
                      skills.
                    </div>
                    <div className="sub-text">
                      Do you want to accelerate your learning process in a
                      intense and efficient way?
                    </div>
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
                    <span className="txt">Learn More</span>
                  </Link>
                </div>
              </div>
              {/* Image Column */}
              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="image titlt" data-tilt data-tilt-max={4}>
                    <img src={image4} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Education Section Two */}

        {/* How IT Works Section */}
        <section
          style={{
            backgroundColor: '#fff',
            padding: '40px 0'
          }}
          
        >
          <div className="auto-container">
            <div className="title text-center p-4 ">How It Works</div>
            <hr className="block-seperator mb-5" />
            <div className="row  center">
              <div className=" F-box col-sm s12 l3 offset-l1 ">
                <i className="fas fa-calendar-alt big_icon purple"></i>

                <div className="sub-title pb-1">Bootcamp schedule</div>
                <div className="sub-text">
                  Bootcamp starting date: February 2021. Be it Full time or Part
                  time, we offer teaching using modern technologies. Main
                  teaching language is English, however we offer support in
                  Swedish, Arabic, Hindi & German
                </div>
                <a
                  href="https://meetings.hubspot.com/sl-melad"
                  target="_blank"
                  className="btn rounded bg-success p-2 text-light"
                >
                  Book a Free Phone Call{' '}
                </a>
              </div>

              <div className=" F-box col-sm s12 l3">
                <i className="fas fa-gem big_icon purple"></i>
                <div className="sub-title pb-1">Payment Plan</div>
                <div className="sub-text">
                  Flexible Payment plans with our partners, also you can benefit
                  from.
                </div>
                <a
                  href="https://meetings.hubspot.com/sl-melad"
                  target="_blank"
                  className="btn rounded bg-info  p-2 text-light"
                >
                  Book an Interview!{' '}
                </a>
              </div>

              <div className=" F-box col-sm s12 l3">
                <i className="fab fa-free-code-camp big_icon purple"></i>
                <div className="sub-title pb-1">Start with our free course</div>
                <div className="sub-text">
                  Start with Codify Foundation course, which is currently free.
                  Codify's foundation course is a great opportunity to learn the
                  basics and to enjoy building your first website.
                </div>
                <a href="#" className="btn rounded bg-warning p-2 text-dark">
                  Start Now!
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*End How IT Works Section */}
        <ContactSection />

        {/* Rating section */}
        <RatingSection />
      </div>
    </>
  )
}
