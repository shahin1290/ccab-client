import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomeScreen from "../../screens/HomeScreen";
import Header from "./../../layout/Header";

import CoueseListScreen from "../../screens/CourseListScreen";
import CourseDetailScreen from "../../screens/CourseDetailScreen";
import ForgotPassword from "../../screens/ForgotPassword";
import CourseGridScreen from "../../screens/CourseGridScreen";
import NotFound from "./../../screens/NotFound";
import Jobs from "../../screens/Jobs";
import ResetPassword from "../../screens/ResetPassword";
import Pricing from "./../../screens/Pricing";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ContactForm from "../../layout/ContactForm";

import { useDispatch } from "react-redux";

export default function DefaultRoute() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({ visible: false });

  const [AuthPath, setAuthPath] = useState("");
  const _RedirectToAth = (path) => {
    setAuthPath(path);
  };

  return (
    <main className="page-wrapper">
      {/* Preloader */}
      {/* <div className="preloader" /> */}

      <Header />

      <Rodal
        animation="rotate"
        visible={showModal.visible}
        onClose={() => setShowModal({ visible: false })}
        width={900}
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
        <Route exact path="/" component={HomeScreen}></Route>
        {/* <Route  path={`/auth`} component={()=><RedirectToAuthRoutes authPath={AuthPath}/>} ></Route> */}

        <Route exact path="/course-list" component={CoueseListScreen}></Route>
        <Route
          exact
          path="/course-grid/:category?"
          component={CourseGridScreen}
        ></Route>
       
        <Route
          exact
          path="/page/:pageNumber"
          component={CourseGridScreen}
        ></Route>
        <Route exact path="/courses/:id" component={CourseDetailScreen}></Route>
        

        <Route exact path="/pricing-plans/:plan" component={Pricing}></Route>

        <Route exact path="/jobs" component={Jobs} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />

        <Route component={NotFound} />
      </Switch>
    </main>
  );
}
