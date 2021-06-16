import React, { useEffect } from 'react'
import 'malihu-custom-scrollbar-plugin'
import TopCourses from './../layout/TopCourses'
import Pricing from './../../components/screens/Pricing';
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
import CurriculamStepsBar from '../layout/CurriculamStepsBar';
export default function HomeScreen({ match }) {
  const dispatch = useDispatch()
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  const { userDetail } = useSelector((state) => state.userLogin)

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
              <div className="image-column  col-lg-6 col-md-12 col-sm-12">
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
              <div className="content-column mt-2 col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2 className="text-center-small-screen">Learn new skills with Codify College</h2>
                  <div className="text header-text text-center-small-screen">
                    With Codify College, you will learn the most in-demand
                    skills to flourish in your carrer.
                  </div>

                  {/* <Link
                    activeclassName="active"
                    className="theme-btn btn-style-three"
                    to="HOW-IT-WORKS"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                  >
                    <span className="txt">Learn More</span>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* End Banner Section */}
        {/* End Education Section Two */}
        <TopCourses></TopCourses>

        <CurriculamStepsBar />

        
        <OnlineEducationProspect />

        <HomeVideoSection />

        {/* Pricing section */}
        <Pricing/>

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
                  <div className="title">Who is this course for?</div>
                  <hr className="block-seperator mt-4" />
                  <div className="text">
                    <div className="sub-text">
                      If you're looking to transition to a career as a
                      developer, or add a tech stack to your existing skill,
                      then this course is for you.
                    </div>
                    <div className="sub-text">
                      If you're looking for the most efficient way to learn,
                      come this way
                    </div>
                  </div>

                  <Link
                    activeclassName="active"
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
          id="HOW-IT-WORKS"
          style={{
            backgroundColor: '#fff',
            padding: '40px 0'
          }}
        >
          <div className="auto-container">
            <div className="title text-center p-4 ">How It Works</div>
            <hr className="block-seperator mb-5" />
            <div className="row  center">
              <div className=" F-box col-sm s12 l3 offset-l1  ">
                <i className="fas fa-calendar-alt big_icon purple text-center-small-screen"></i>

                <div className="sub-title pb-1 text-center-small-screen">When does bootcamp start?</div>
                <div className="sub-text text-center-small-screen">
                  When does bootcamp start? We start in February 2021. We're
                  teaching both full-time and part-time, using the best modern
                  teaching methods and technology. The main instruction language
                  is English, but have support in Arabic, German, Hindi and
                  Swedish.
                </div>
                <a
                  href="https://meetings.hubspot.com/sl-melad"
                  target="_blank"
                  className="btn rounded bg-success p-2 text-light text-center-small-screen"
                >
                  Book a Free Phone Call{' '}
                </a>
              </div>

              <div className=" F-box col-sm s12 l3">
                <i className="fas fa-gem big_icon purple text-center-small-screen"></i>
                <div className="sub-title pb-1 text-center-small-screen">
                  Flexible and affordable payment
                </div>
                <div className="sub-text text-center-small-screen">
                  We offer flexible payment plans through our partners, so you
                  can spread the cost and pay as you learn
                </div>
                <a
                  href="https://meetings.hubspot.com/sl-melad"
                  target="_blank"
                  className="btn rounded bg-info  p-2 text-light text-center-small-screen"
                >
                  Book an Interview!{' '}
                </a>
              </div>

              <div className=" F-box col-sm s12 l3">
                <i className="fab fa-free-code-camp big_icon purple text-center-small-screen"></i>
                <div className="sub-title pb-1 text-center-small-screen">
                  How do I know it's right for me?
                </div>
                <div className="sub-text text-center-small-screen">
                  We run a free Codify Foundation course, so you can dip your
                  toes without commitment. It's also a great way to learn the
                  basics and build your own website.
                </div>
                <a
                  href={userDetail.token ? '/profile' : '/get-start'}
                  className="btn rounded bg-warning p-2 text-dark text-center-small-screen"
                >
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


        <div className="auto-container text-center  mb-3 mt-5">
          <img
            width="75"
            className="pr-3"
            src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.png"
          />
          <img
            width="250"
            src="https://cdn.jotfor.ms/images/credit-card-logo.png"
          />
        </div>
      </div>
    </>
  )
}
