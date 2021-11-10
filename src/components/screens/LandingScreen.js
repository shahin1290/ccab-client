import Form from './../layout/LandingForm';
import Contact from './../layout/LandingContact'
import './../../assets/css/Landing.css';
import logo from './../../assets/images/CF.png'
import { Link, animateScroll as scroll } from "react-scroll";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import './../../assets/css/animate.min.css'
import { useEffect } from 'react';
 import Loader from './../layout/LandingMainLoader'
import 'animate.css/animate.css' 
import  './../../assets/css/Landing.css'
import CountUp from "react-countup";

function App() {

  

useEffect(()=>{

})

  return (
    <div className="App" id="App">
                
                <>
  <Loader></Loader>
  {/*Navbar Start*/}
  <nav className="navbar navbar-expand-lg p-1 fixed-top navbar-custom sticky sticky-dark">
    <div className="container">
      {/* LOGO */}

      <a className="navbar-brand logo" href="/">
        <img src={logo} alt='photo' className height={10} />   
      </a>
   
      <button className="navbar-toggler p-0" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <i className="mdi mdi-menu" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto navbar-center" id="mySidenav">
         
          
          <li className="nav-item">
          <Link  className="nav-link pointer"  activeClass="activeItem" to="services" spy={true} smooth={true} offset={-70} duration={1000}>
            Services
            </Link>
          </li>
          <li className="nav-item">
          <Link  className="nav-link pointer"  activeClass="activeItem" to="about" spy={true} smooth={true} offset={-70} duration={1000}>
          About
            </Link>
          </li>
          <li className="nav-item">
          <Link  className="nav-link pointer"  activeClass="activeItem" to="features" spy={true} smooth={true} offset={-70} duration={1000}>
          Features
            </Link>
            
          </li>
          <li className="nav-item">
          <Link  className="nav-link pointer"  activeClass="activeItem" to="clients" spy={true} smooth={true} offset={-70} duration={1000}>
          Clients
            </Link>
         
          </li>
        </ul>
        <div className="call-no">
          <a href="#" className="nav-link pointer " style={{color :'#E55369', fontSize:'small'}}>
            <i className="mdi mdi-phone mr-1" /> +00 1234 5678 90</a>
        </div>
      </div>
    </div>
  </nav>
  {/* Navbar End */}
  {/* Hero Start */}
  <section className="hero-4-bg position-relative d-flex align-items-center bg-light" id="home">
    <div className="hero-4-bg-overlay" />
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 className="text-white hero-4-title font-weight-light line-height-1_4 mb-4">Grow With Your Business &amp; Be <span className="font-weight-normal">The Best Entrepreneur.</span></h1>
          <p className="text-white">At vero eos et accusamus et iusto odio dignissimos ducimus a qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint cupiditate.</p>
          <Link  className="btn btn-warning mt-4 pointer text-white"  activeClass="active" to="features" spy={true} smooth={true} offset={-70} duration={1000}>
          Learn More<span className="ml-2 right-icon">→</span>
            </Link>
         
        </div>
        <div className="col-lg-4 offset-lg-2">
          <div className="hero-login-form mx-auto bg-white p-4 rounded mt-5 mt-lg-0">
            <Form></Form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Hero End */}
  {/* Service Start */}
  <section className="section bg-light" id="services">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className=" text-center mb-5">
            <h3 className="font-weight-normal text-dark">Our <span className="text-warning">Service</span></h3>
            <p className="text-muted">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero pulvinar hendrerit id lorem.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="service-box service-warning">
            <div className="mb-5">
              <i className="pe-7s-headphones service-icon" />
            </div>
            <h5 className="service-title text-dark font-weight-normal pt-1 mb-4">Awesome Support</h5>
            <p className="text-muted service-subtitle mb-4">Et harum quidem rerum facilis expedita distinctio nam libero tempore cum quibusdam nobis.</p>
            <a href="#" className="read-more-icon"><span className="right-icon">→</span></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-box service-warning">
            <div className="mb-5">
              <i className="pe-7s-tools service-icon" />
            </div>
            <h5 className="service-title text-dark font-weight-normal pt-1 mb-4">Solutions Business</h5>
            <p className="text-muted service-subtitle mb-4">Et harum quidem rerum facilis expedita distinctio nam libero tempore cum quibusdam nobis.</p>
            <a href="#" className="read-more-icon"><span className="right-icon">→</span></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-box service-warning">
            <div className="mb-5">
              <i className="pe-7s-display1 service-icon" />
            </div>
            <h5 className="service-title text-dark font-weight-normal pt-1 mb-4">Digital Design</h5>
            <p className="text-muted service-subtitle mb-4">Et harum quidem rerum facilis expedita distinctio nam libero tempore cum quibusdam nobis.</p>
            <a href="#" className="read-more-icon"><span className="right-icon">→</span></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-box service-warning">
            <div className="mb-5">
              <i className="pe-7s-cup service-icon" />
            </div>
            <h5 className="service-title text-dark font-weight-normal pt-1 mb-4">Goal Business</h5>
            <p className="text-muted service-subtitle mb-4">Et harum quidem rerum facilis expedita distinctio nam libero tempore cum quibusdam nobis.</p>
            <a href="#" className="read-more-icon"><span className="right-icon">→</span></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-box  service-warning">
            <div className="mb-5">
              <i className="pe-7s-light service-icon" />
            </div>
            <h5 className="service-title text-dark font-weight-normal pt-1 mb-4">Branding Identity</h5>
            <p className="text-muted service-subtitle mb-4">Et harum quidem rerum facilis expedita distinctio nam libero tempore cum quibusdam nobis.</p>
            <a href="#" className="read-more-icon"><span className="right-icon">→</span></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-box service-warning">
            <div className="mb-5">
              <i className="pe-7s-graph1 service-icon" />
            </div>
            <h5 className="service-title text-dark font-weight-normal pt-1 mb-4">Dynamic Growth</h5>
            <p className="text-muted service-subtitle mb-4">Et harum quidem rerum facilis expedita distinctio nam libero tempore cum quibusdam nobis.</p>
            <a href="#" className="read-more-icon"><span className="right-icon">→</span></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Service End */}
  {/* About us Start */}
  <section className="section " id="about">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className=" text-center mb-5">
            <h3 className="font-weight-normal text-dark">About <span className="text-warning">Us</span></h3>
            <p className="text-muted">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero pulvinar hendrerit id lorem.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h2 className="font-weight-light line-height-1_6 text-dark mb-4">Passionate About Creating Templates For Setup</h2>
        </div>
        <div className="col-md-7 offset-md-1">
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-dark font-weight-light f-20 mb-3">Our Mission</h6>
              <p className="text-muted font-weight-light">At vero eos accusamus iusto odio dignissim ducimus a blandi praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sit occaecati cupiditate provident similique sunt.</p>
            </div>
            <div className="col-md-6">
              <h6 className="text-dark font-weight-light f-20 mb-3">Our Vision</h6>
              <p className="text-muted font-weight-light">Temporibus autem quibusdam et aut officiis debitis that aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae at Itaque earum rerum hic tenetur sapiente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About us End */}
  {/* Features Start */}
  <section className="section" id="features">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className=" text-center mb-5">
            <h3 className="font-weight-normal text-dark">Our <span className="text-warning">Features</span></h3>
            <p className="text-muted">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero pulvinar hendrerit id lorem.</p>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-md-5" style={{background: 'url(images/features/features-bg.png) center center'}}>
          <div className="features-img">
            <img src="images/features/img-1.png" alt='photo' className="img-fluid d-block mx-auto" />
          </div>
        </div>
        <div className="col-md-6 offset-md-1">
          <div className="features-box mt-5 mt-sm-0 mb-4">
            <div className="features-icon my-4">
              <i className="mdi mdi-laptop-mac" />
            </div>
            <h5 className="text-dark font-weight-normal mb-3 pt-3">Activity Reporting</h5>
            <p className="text-muted mb-3 f-15">Et harum quidem rerum facilise expedita distinctio nam libero tempore cum soluta nobis as eligendi optio cumque nihil quis nostrum exercitationem impedit minus omnis repellendus.</p>
            <a href="#" className="f-16 text-warning">Read More <span className="right-icon ml-2">→</span></a>
          </div>
        </div>
      </div>
      <div className="row align-items-center mt-5">
        <div className="col-md-6">
          <div className="features-box mb-4">
            <div className="features-icon my-4">
              <i className="mdi mdi-account-group" />
            </div>
            <h5 className="text-dark font-weight-normal mb-3 pt-3">Team Management</h5>
            <p className="text-muted mb-3 f-15">Sed perspiciatis unde omnis natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo excepturi sint occaecati cupiditate architecto.</p>
            <a href="#" className="f-16 text-warning">Read More <span className="right-icon ml-2">→</span></a>
          </div>
        </div>
        <div className="col-md-5 offset-md-1 mt-5 mt-sm-0" style={{background: 'url(images/features/features-bg.png) center center'}}>
          <div className="features-img">
            <img src="images/features/img-2.png" alt='photo' className="img-fluid d-block mx-auto" />
          </div>
        </div>
      </div>
      <div className="row align-items-center mt-5">
        <div className="col-md-5" style={{background: 'url(images/features/features-bg.png) center center'}}>
          <div className="features-img">
            <img src="images/features/img-3.png" alt='photo' className="img-fluid d-block mx-auto" />
          </div>
        </div>
        <div className="col-md-6 offset-md-1">
          <div className="features-box mt-5 mt-sm-0 mb-4">
            <div className="features-icon my-4">
              <i className="mdi mdi-chart-bell-curve" />
            </div>
            <h5 className="text-dark font-weight-normal mb-3 pt-3">Marketing Analysis</h5>
            <p className="text-muted mb-3 f-15">At vero eos accusamus iusto odio soluta nobis est eligendi optio dignissimos ducimus qui blanditiis praesentium as voluptatum deleniti corrupti quos dolores molestias occaecati.</p>
            <a href="#" className="f-16 text-warning">Read More <span className="right-icon ml-2">→</span></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Features End */}
  {/* Counter Start */}
  <section className="section counter-bg" style={{background: 'url(images/counter-bg-1.jpg) center center'}}>
    <div className="bg-overlay op-75" />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center mb-5">
            <h2 className="font-weight-normal text-white mb-2">We've Completed</h2>
            <h5 className="font-weight-normal text-white-70">More Than 1000+ Work Successfully</h5>
          </div>
        </div>
      </div>
      <div className="row" id="counter">
        <div className="col-lg-3 col-md-6">
          <div className="counter-box text-center text-white mb-4 mb-lg-0">
            <i className="pe-7s-like2 counter-icon mb-4" />
            <h2 className="mb-2 font-weight-normal text-light"><span className=" mt-4 ">    
              <CountUp
                start={0}
                end={620}
                duration={2.75}
                separator=' '
                decimal=','
                suffix=''
              /></span>+
            </h2>

            <p className="mb-0 text-white-70 text-uppercase f-14">Successful Project</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="counter-box text-center text-white mb-4 mb-lg-0">
            <i className="pe-7s-light counter-icon mb-4" />
            <h2 className="mb-2 font-weight-normal text-light"><span className="counter-value mt-4" data-count={350}>  <CountUp
                start={0}
                end={320}
                duration={2.75}
                separator=' '
                decimal=','
                suffix=''
              /></span>+</h2>
            <p className="mb-0 text-white-70 text-uppercase f-14">Project Ideas</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="counter-box text-center text-white mb-4 mb-lg-0">
            <i className="pe-7s-smile counter-icon mb-4" />
            <h2 className="mb-2 font-weight-normal text-light"><span className="counter-value mt-4" data-count={800}>  <CountUp
                start={0}
                end={800}
                duration={2.75}
                separator=' '
                decimal=','
                suffix=''
              /></span>+</h2>
            <p className="mb-0 text-white-70 text-uppercase f-14">Satisfied Clients</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="counter-box text-center text-white mb-4 mb-lg-0">
            <i className="pe-7s-star counter-icon mb-4" />
            <h2 className="mb-2 font-weight-normal text-light"><span className="counter-value mt-4" data-count={590}>  <CountUp
                start={0}
                end={590}
                duration={2.75}
                separator=' '
                decimal=','
                suffix=''
              /></span></h2>
            <p className="mb-0 text-white-70 text-uppercase f-14">Award Win</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Counter End */}
  {/* Testimonial Start */}
  <section className="section bg-light" id="clients">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className=" text-center mb-5">
            <h3 className="font-weight-normal text-dark">Our <span className="text-warning">Clients</span></h3>
            <p className="text-muted">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero pulvinar hendrerit id lorem.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <h3 className="font-weight-normal mt-3 line-height-1_4">Some Words From Our <span className="font-weight-medium text-warning">Happy Clients </span></h3>
          <div className="testi-border my-4" />
          <p className="text-muted">Itaque earum rerum tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.</p>
        </div>
        <div className="col-lg-8">
          <OwlCarousel 
          items={2} 
          autoplayTimeout={3000}
          margin={10}
          loop={true} 
          autoPlay={true} 
          nav={false} 
          dots={true} 
          animateIn={'bounceIn'} 
          animateOut={'bounceOut'}className=" owl-theme" >
            
            <div className="item">
              <div className="testi-content m-3 position-relative">
                <div className="testi-box p-4">
                  <ul className="list-unstyled f-15 text-warning mb-2">
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item"><i className="mdi mdi-star" /></li>
                  </ul>
                  <p className="text-muted position-relative mb-0 f-14"><span className="f-20 mr-1">"</span> Sed ut perspiciatis unde omnis at iste natus error a voluptatem accusantium doloremque totam. <span className="f-16">"</span></p>
                </div>
                <div className="testi-user mt-4">
                  <div className="media align-items-center">
                    <img src="images/user/img-1.jpg" alt='photo' className="mr-3 img-fluid d-block rounded-circle" />
                    <div className="media-body">
                      <h6 className="mb-0 text-dark f-15">Roberta Guevara</h6>
                      <p className="text-muted mb-0 f-14">Web Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* owl item and */}
            <div className="item">
              <div className="testi-content m-3 position-relative">
                <div className="testi-box p-4">
                  <ul className="list-unstyled f-15 text-warning mb-2">
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item"><i className="mdi mdi-star" /></li>
                  </ul>
                  <p className="text-muted position-relative mb-0 f-14"><span className="f-20 mr-1">"</span> Sed ut perspiciatis unde omnis at iste natus error a voluptatem accusantium doloremque totam. <span className="f-16">"</span></p>
                </div>
                <div className="testi-user mt-4">
                  <div className="media align-items-center">
                    <img src="images/user/img-2.jpg" alt='photo' className="mr-3 img-fluid d-block rounded-circle" />
                    <div className="media-body">
                      <h6 className="mb-0 text-dark f-15">Roberta Guevara</h6>
                      <p className="text-muted mb-0 f-14">Web Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* owl item and */}
            <div className="item">
              <div className="testi-content m-3 position-relative">
                <div className="testi-box p-4">
                  <ul className="list-unstyled f-15 text-warning mb-2">
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item"><i className="mdi mdi-star" /></li>
                  </ul>
                  <p className="text-muted position-relative mb-0 f-14"><span className="f-20 mr-1">"</span> Sed ut perspiciatis unde omnis at iste natus error a voluptatem accusantium doloremque totam. <span className="f-16">"</span></p>
                </div>
                <div className="testi-user mt-4">
                  <div className="media align-items-center">
                    <img src="images/user/img-3.jpg" alt='photo' className="mr-3 img-fluid d-block rounded-circle" />
                    <div className="media-body">
                      <h6 className="mb-0 text-dark f-15">Roberta Guevara</h6>
                      <p className="text-muted mb-0 f-14">Web Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* owl item and */}
            <div className="item">
              <div className="testi-content m-3 position-relative">
                <div className="testi-box p-4">
                  <ul className="list-unstyled f-15 text-warning mb-2">
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item"><i className="mdi mdi-star" /></li>
                  </ul>
                  <p className="text-muted position-relative mb-0 f-14"><span className="f-20 mr-1">"</span> Sed ut perspiciatis unde omnis at iste natus error a voluptatem accusantium doloremque totam. <span className="f-16">"</span></p>
                </div>
                <div className="testi-user mt-4">
                  <div className="media align-items-center">
                    <img src="images/user/img-4.jpg" alt='photo' className="mr-3 img-fluid d-block rounded-circle" />
                    <div className="media-body">
                      <h6 className="mb-0 text-dark f-15">Roberta Guevara</h6>
                      <p className="text-muted mb-0 f-14">Web Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* owl item and */}
            <div className="item">
              <div className="testi-content m-3 position-relative">
                <div className="testi-box p-4">
                  <ul className="list-unstyled f-15 text-warning mb-2">
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item mr-1"><i className="mdi mdi-star" /></li>
                    <li className="list-inline-item"><i className="mdi mdi-star" /></li>
                  </ul>
                  <p className="text-muted position-relative mb-0 f-14"><span className="f-20 mr-1">"</span> Sed ut perspiciatis unde omnis at iste natus error a voluptatem accusantium doloremque totam. <span className="f-16">"</span></p>
                </div>
                <div className="testi-user mt-4">
                  <div className="media align-items-center">
                    <img src="images/user/img-5.jpg" alt='photo' className="mr-3 img-fluid d-block rounded-circle" />
                    <div className="media-body">
                      <h6 className="mb-0 text-dark f-15">Roberta Guevara</h6>
                      <p className="text-muted mb-0 f-14">Web Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* owl item and */}
          </OwlCarousel>
        </div>
      </div>
    </div>
  </section>
  {/* Testimonial End */}
  {/* Contact Us Start */}
  <section className="section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className=" text-center mb-5">
            <h3 className="font-weight-normal text-dark">Get In <span className="text-warning"> Touch</span></h3>
            <p className="text-muted">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero pulvinar hendrerit id lorem.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="contact-address">
            <h4 className="text-dark mb-4">Contact Info</h4>
            <p className="text-muted f-15">Sed perspici unade omnis natus error sit voluptatem accusantium doloremque minus cumque.</p>
            <p className="text-muted f-15 mb-4">Et harum quidem rerum facilis est et expedita sit distinctio at libero.</p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="contact-address">
                <h5 className="text-dark mb-3 f-16">Address - A</h5>
                <p className="text-muted f-15">3165 Roosevelt Wilson Riverside, CA 92507</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-address">
                <h5 className="text-dark mb-3 f-16">Address - B</h5>
                <p className="text-muted f-15">1121 Bombardier Way Southfield, MI 48075</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 offset-lg-1">
          <div className="custom-form mt-4 mt-lg-0">
            <div id="message" />
              <Contact/>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Contact Us End */}

</>

    </div>
  );
}

export default App;
