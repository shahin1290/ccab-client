import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import { userProfileUpdate, getProfile } from '../../redux/actions/userAction'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../../redux/actions/userAction'
import { createBrowserHistory } from 'history'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createPerformance } from '../../redux/actions/performanceAction'
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required()
})

export default function LoginScreen({ location }) {
  const dispatch = useDispatch()
  const history = createBrowserHistory({ forceRefresh: true })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userDetail, error, loginSuccess } = userLogin

  // initializing componet level state

  useEffect(() => {
    if (loginSuccess) {
      history.goBack()
    }
  }, [history, loginSuccess])

  const submitHandler = ({ email, password }) => {
    dispatch(login(email, password))
  }

  return (
    <>
      {/*End Page Title*/}
      {/* Login Section */}
      <section className="login-section">
        <div className="auto-container">
          <div className="login-box">
            {loading && (
              <div id="backdrop">
                <div class="spinner-center ">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            )}
            {location.state && <Message>{location.state.message}</Message>}
            {/* Title Box */}
            <div className="title-box">
              <h2>Login</h2>
              <div className="text">
                <span className="theme_color">Welcome!</span> Please confirm
                that you are visiting
              </div>
            </div>
            {/* Login Form */}
            <div className="styled-form">
              {error && <Message>{error}</Message>}
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                <div className="form-group">
              <div className="clearfix">
               
                <div className="pull-right">
                  <Link to="/forgot-password" className="forgot">Forget Password?</Link> 
                </div>
              </div>
            </div>

                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="theme-btn btn-style-three  mt-4"
                  >
                    <span className="txt">
                      Login <i className="fa fa-angle-right" />
                    </span>
                  </button>
                </div>
                <div className="form-group ">
                  <div className="users">
                    New User? <a href="/get-start">Sign Up</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* End Login Section */}
    </>
  )
}
