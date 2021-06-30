import React, { useState, useEffect } from 'react'
import { script } from './../../../assets/js/script'
import { Switch, Route } from 'react-router-dom'
import RedirectToAuthRoutes from '../auth/RedirectToAuthRoutes'

import HomeScreen from '../../screens/HomeScreen'
import Footer from '../../layout/Footer'
import Header from './../../layout/Header'
import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import CoueseListScreen from '../../screens/CourseListScreen'
import CourseDetailScreen from '../../screens/CourseDetailScreen'
import ServiceDetailScreen from '../../screens/ServiceDetailScreen'

import CourseGridScreen from '../../screens/CourseGridScreen'
import ServiceGridScreen from '../../screens/ServiceGridScreen'
import NotFound from './../../screens/NotFound'
import Contact from './../../screens/Contact'
import Privacy from './../../screens/privacy'
import Jobs from '../../screens/Jobs'

export default function DefaultRoute() {
  const [AuthPath, setAuthPath] = useState('')
  const _RedirectToAth = (path) => {
    setAuthPath(path)
  }

  useEffect(() => {
    // script()
  }, [script])

  return (
    <main className="page-wrapper">
      {/* Preloader */}
      {/* <div className="preloader" /> */}
      <Header />
      <Switch>
        <Route exact path="/" component={HomeScreen}></Route>
        {/* <Route  path={`/auth`} component={()=><RedirectToAuthRoutes authPath={AuthPath}/>} ></Route> */}
        <Route exact path="/login" component={LoginScreen}></Route>
        <Route exact path="/get-start" component={RegisterScreen}></Route>
        <Route exact path="/course-list" component={CoueseListScreen}></Route>
        <Route
          exact
          path="/course-grid/:category?"
          component={CourseGridScreen}
        ></Route>
        <Route
          exact
          path="/service-grid/:category?"
          component={ServiceGridScreen}
        ></Route>
        <Route
          exact
          path="/page/:pageNumber"
          component={CourseGridScreen}
        ></Route>
        <Route exact path="/courses/:id" component={CourseDetailScreen}></Route>
        <Route exact path="/services/:id" component={ServiceDetailScreen}></Route>
        <Route exact path="/jobs" component={Jobs} />

        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/" component={NotFound} />
      </Switch>
      <Footer />
    </main>
  )
}
