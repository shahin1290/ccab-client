import React, { useState, useEffect } from "react";
import { script } from "./../../../assets/js/script";
import { Switch, Route } from "react-router-dom";
import RedirectToAuthRoutes from "../auth/RedirectToAuthRoutes";
import LandingScreen from './../../screens/LandingScreen'
import HomeScreen from "../../screens/HomeScreen";
import ServiceHomeScreen from "../../screens/ServiceHomeScreen";
import Footer from "../../layout/Footer";
import Header from "./../../layout/Header";

import CoueseListScreen from "../../screens/CourseListScreen";
import CourseDetailScreen from "../../screens/CourseDetailScreen";
import ServiceDetailScreen from "../../screens/ServiceDetailScreen";
import ForgotPassword from "../../screens/ForgotPassword";
import CourseGridScreen from "../../screens/CourseGridScreen";
import ServiceGridScreen from "../../screens/ServiceGridScreen";
import NotFound from "./../../screens/NotFound";
import Contact from "./../../screens/Contact";
import Privacy from "./../../screens/privacy";
import Jobs from "../../screens/Jobs";
import ResetPassword from "../../screens/ResetPassword";
import PromoCountDown from "../../layout/PromoCountDown";
import Pricing from "./../../screens/Pricing";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ContactForm from "../../layout/ContactForm";
import {
  getPromos,
  deletePromo,
  updatePromo,
} from "../../../redux/actions/promoAction";
import { useSelector, useDispatch } from "react-redux";

export default function DefaultRoute() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({ visible: false });
  const {
    promos,
    success: promoSuccess,
    loading: promoLoading,
    error: promoError,
  } = useSelector((state) => state.promoList);

  const [AuthPath, setAuthPath] = useState("");
  const _RedirectToAth = (path) => {
    setAuthPath(path);
  };

  useEffect(() => {
    dispatch(getPromos());
  }, [dispatch]);



  return (
    <main className='page-wrapper'>
      {/* Preloader */}
      {/* <div className="preloader" /> */}

      <Header />
      {(promos && promos.length > 0 && promos[0].show && (
        <>
       <PromoCountDown promo={promos[0]} />

        {/* Education Section Two */}
        
{/* 
        <a  className='handle-mobile handle1'
        style={{top:'116px'}}
         href="/pricing-plans"></a>
        <a
          href='https://meetings.hubspot.com/munzer1'
          style={{top:'116px'}}
          className='handle2 handle-mobile'
          target='_blank'
        ></a>
        <a
          className='handle3 handle-mobile'
          style={{top:'116px'}}
          onClick={() => setShowModal({ visible: true })}
        ></a> */}
        </>
      )||(<> {/* Education Section Two for mobile only */}
        

        {/* <a  className='handle1 handle-mobile'
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
        ></a> */}
        </>
        ))}

<Rodal
          animation='rotate'
          visible={showModal.visible}
          onClose={() => setShowModal({ visible: false })}
          width='900'
        >
          <ContactForm />
        </Rodal>

        {/* Education Section Two for big screen  only */}
      {/* <a  className='handle handle1'
         
         href="/pricing-plans"></a>
        <a
          href='https://meetings.hubspot.com/munzer1'
          
          className='handle handle2'
          target='_blank'
        ></a>
        <a
          className='handle handle3'
          
          onClick={() => setShowModal({ visible: true })}
        ></a> */}
      <Switch>

     
        <Route exact path='/dev' component={HomeScreen}></Route>
        <Route exact path='/Services' component={ServiceHomeScreen}></Route>
        {/* <Route  path={`/auth`} component={()=><RedirectToAuthRoutes authPath={AuthPath}/>} ></Route> */}

        <Route exact path='/course-list' component={CoueseListScreen}></Route>
        <Route
          exact
          path='/course-grid/:category?'
          component={CourseGridScreen}
        ></Route>
        <Route
          exact
          path='/service-grid/:category?'
          component={ServiceGridScreen}
        ></Route>
        <Route
          exact
          path='/page/:pageNumber'
          component={CourseGridScreen}
        ></Route>
        <Route exact path='/courses/:id' component={CourseDetailScreen}></Route>
        <Route
          exact
          path='/services/:id'
          component={ServiceDetailScreen}
        ></Route>

          <Route
            exact
            path='/pricing-plans/:plan'
            component={Pricing}></Route>


        <Route exact path='/jobs' component={Jobs} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password/:token' component={ResetPassword} />

      
      </Switch>
   
    </main>
  );
}
