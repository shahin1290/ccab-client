import React,{useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';

import Landings from './../landing/LandingRoute'


import LoginScreen from "../../screens/authScreen/LoginScreen";
import RegisterScreen from "../../screens/authScreen/RegisterScreen";
import TeacherLogin from './../../screens/authScreen/TeacherLogin'
import StudentRegisterScreen from './../../screens/authScreen/StudentRegisterScreen'
import StudentLogin from './../../screens/authScreen/StudentLogin'

import 'malihu-custom-scrollbar-plugin';
import  './../../../assets/css/Auth-style.css'
import  './../../../assets/css/Landing.css'

export default function AuthRoute({match}) {


    return (
        
        
     
            <main className="page-wrapper">
                {/* Preloader */}
                {/* <div className="preloader" />        */}
               
                    <Switch>    
                        
                        <Route exact path='/login' component={StudentLogin}></Route>
                        <Route exact path='/teacher-login' component={TeacherLogin}></Route>
                        {/* <Route exact path='/get-start' component={RegisterScreen}></Route> */}
                        <Route exact path='/get-start' component={StudentRegisterScreen}></Route>
                        
                        {/* Landing Routes for guests  */}
                        <Route component={Landings}></Route>
                    </Switch>
            </main>
     
    )
}
