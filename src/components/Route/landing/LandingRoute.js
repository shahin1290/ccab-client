import React, { useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import LandingScreen from '../../screens/LandingScreen'

import ServiceHomeScreen from "../../screens/ServiceHomeScreen";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import Rodal from "rodal";
import NotFound from "../../screens/NotFound";
import ContactForm from "../../layout/ContactForm";
import Contact from "./../../screens/Contact";
import Privacy from "./../../screens/privacy";
import DefaultRoutes from "./../default/DefaultRoute";

export default function DefaultRoute() {
  
  const [showModal, setShowModal] = useState({ visible: false });
  
 

  return (
    <main className='page-wrapper'>
      {/* Preloader */}
      {/* <div className="preloader" /> */}

      <a  className='handle1 handle-mobile'
         style={{top:'65px'}}
         href="/pricing-plans"></a>
        <a
          href='https://meetings.hubspot.com/munzer1'
          style={{top:'65px'}}
          className='handle2 handle-mobile'
          target='_blank'
        ></a>
        <a
          className='handle3 handle-mobile'
          style={{top:'65px'}}
          onClick={() => setShowModal({ visible: true })}
        ></a>
  

      <Rodal
          animation='rotate'
          visible={showModal.visible}
          onClose={() => setShowModal({ visible: false })}
          width='900'
        >
          <ContactForm />
        </Rodal>

        {/* Education Section Two for big screen  only */}
      <a  className='handle handle1'
         
         href="/pricing-plans"></a>
        <a
          href='https://meetings.hubspot.com/munzer1'
          
          className='handle handle2'
          target='_blank'
        ></a>
        <a
          className='handle handle3'
          
          onClick={() => setShowModal({ visible: true })}
        ></a>


      <Switch>
      <Route exact path='/' component={LandingScreen}></Route>
        {/* <Route  path={`/auth`} component={()=><RedirectToAuthRoutes authPath={AuthPath}/>} ></Route> */}
        {/* <Route exact path='/login' component={LoginScreen}></Route>
        <Route exact path='/get-start' component={RegisterScreen}></Route> */}

        <Route path='/contact' component={Contact} />
        <Route path='/privacy' component={Privacy} />

        {/* default Routes for guests  */}
        <Route component={DefaultRoutes} ></Route>
        
      </Switch>
      <Footer />
    </main>
  );
}
