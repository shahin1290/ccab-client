import React, { useState , useEffect } from "react";
import "malihu-custom-scrollbar-plugin";
import TopCourses from "./../layout/TopCourses";
import Pricing from "./../../components/screens/Pricing";
import { Row, Col, ProgressBar, Container } from "react-bootstrap";
import RegisterScreen from "../screens/RegisterScreen";
import homeBanner from "./../../assets/images/background/home-banner.jpg";
import OnlineEducationProspect from "../layout/OnlineEducationProspect";
import HomeCarousel from "../layout/HomeCarousel";
import RatingSection from "../layout/RatingSection";
import ContactSection from "../layout/ContactSection";
import HomeVideoSection from "../layout/HomeVideoSection";
import CurriculamStepsBar from "../layout/CurriculamStepsBar";
import StudentReview from "../layout/StudentReview";
import AchievementSection from "../layout/AchievementSection";
import ProgramSection from "../layout/ProgramSection";
import FaqSection from "../layout/FaqSection";
import Particles from "../layout/Particles";
import { Link } from "react-router-dom";
import Rodal from "rodal";
// include styles
import "rodal/lib/rodal.css";
import ContactForm from "../layout/ContactForm";
import Typewriter from "typewriter-effect";
import Reviews from "../layout/Reviews";
import ServiceVideoChat from './../layout/ServiceVideoChat';

import ServiceAssistance from './../layout/ServiceAssistance';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
//AOS.init();

export default function HomeScreen({ match }) {
  useEffect(()=>{
    AOS.init();
  },[])
  const [showModal, setShowModal] = useState({ visible: false });

  return (
    <>
      <div className='home'>
        {/* <HomeCarousel /> */}

        <section className='home-hero-banner '>
          {/* <div class="quote--container banner-quote">
            <p class="quote">
              Your future is created by what you do{' '}
              <span class="quote--highlight">TODAY</span> not tomorrow
            </p>
            <p class="quote--author">&ndash; Robert Kiyosaki</p>
          </div>

          <div className="hero-banner pt-5">
            <div>Brighten your future</div>
            <div>with codify College</div>
          </div> */}

          <div class='quote--container banner-quote w-75'>
            <p data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500" 
                class='quote'>
              Your future is created by what you do{" "}
              <span class='quote--highlight'>TODAY</span> not tomorrow
            </p>
            <p class='quote--author'>&ndash; Robert Kiyosaki</p>
  
          </div>



          <div   className=" d-flex justify-content-center titleBanner  " 
        >
                <h1 data-aos="fade-up-left"  className="text-danger title text-right"><span style={{color: '#DBD02D'}}>CODIFY</span> COLLEGE</h1>
           </div> 

          {/* <div className='typewriter'>
            <Typewriter
              options={{
                strings: [
                  '<span style="color: #CC8C33;">apply</span> ( <span style="color: #C94F45;">"Codify College"</span > ) <br> <span style="color: #CC8C33;top:70%;  ">.then </span>(<span style="color: #C94F45;">"Brighten your future"</span>)',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div> */}

          {/* {apply('Codify College').then(future=> alert(` Brighten your${future}`  )} */}

          <span style={{ width: "100%", height: "300px" }}>
            <Particles />
          </span>
        </section>

       


     
     

        <Rodal
          animation='rotate'
          visible={showModal.visible}
          onClose={() => setShowModal({ visible: false })}
          width='900'
        >
          <ContactForm />
        </Rodal>

        {/* End Banner Section */}
        {/* End Education Section Two */}

        {/* top coruses */}

        <TopCourses></TopCourses>

        <CurriculamStepsBar />
         {/* Sec Title */}
        <div className="container-fluid bg-light py-5">
                  
          <div data-aos="fade-down" className='sec-title style-two centered'>
            <div className='title'>
              Different Course Plans Tailored To Your Needs
            </div>
            <hr className='block-seperator mb-3' />
            <div data-aos="fade-down-right" data-aos-delay="100" className='text'>
              Register yourself now and get real employabe skills that top
              companies want.
            </div>
          </div>
              <ServiceVideoChat/>

                <ServiceAssistance/>
        </div>
       

        <ContactSection />

        <Reviews />

        {/* <StudentReview /> */}

        <Pricing />

        <OnlineEducationProspect />

        <HomeVideoSection />

        {/* Program Section */}

        {/* End Education Section Two */}

        {/* rigstering section          */}
        {/* <Container>
          <Row className="p-3 mt-5">
            <Col md={6} className="mt-3 ">
              <div className="title pb-5 display-4">Get Start Now</div>
            </Col>

            <Col>
              <img width="45" src="/images/career.png" />

              <span className="sub-title  pl-3 ">Career Serviceability </span>
              <div className="sub-text  sm-text-center">
                We help our graduates to find a job by preparaing them for
                technical interviews, set up a suitable resume and solid GitHub
                account.
              </div>
            </Col>
          </Row>

        {userDetail && userDetail.name ? null : (
            <div className="mt-5">
              <RegisterScreen />
            </div>
          )} 
        </Container> */}

        {/* Achievement Section Two */}

        {/* End Achievement Section */}

        {/* How IT Works Section */}
        {/* <section
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
                  When does bootcamp start? providing the best modern
                  teaching methods and technology. The main instruction language
                  is English, but have support in Arabic, German and
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
        </section> */}
        {/*End How IT Works Section */}

        <ProgramSection />

        {/* <AchievementSection />



        {/* Rating section */}
        <RatingSection />

        <FaqSection />

        <div className='auto-container text-center  mb-3 mt-5'>
          <img
            width='75'
            className='pr-3'
            src='https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.png'
          />
          <img
            width='250'
            src='https://cdn.jotfor.ms/images/credit-card-logo.png'
          />
        </div>
      </div>
    </>
  );
}
