import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import { getForgotPassword, getProfile } from '../../redux/actions/userAction'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../../redux/actions/userAction'
import { createBrowserHistory } from 'history'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Loader from '../layout/Loader';

const schema = yup.object().shape({
  email: yup.string().email().required()
})

export default function ResetPassword() {
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

  const {forgotPassword, loading, error, success} = useSelector((state) => state.forgotPassword)


  // initializing componet level state

  useEffect(() => {
    if(success){
      reset()
    }
  }, [success])

  const submitHandler = ({ email }) => {
    dispatch(getForgotPassword(email))
  }

  return (
    <>
      {/*End Page Title*/}
      {/* Login Section */}
      <section className="login-section">
        <div className="auto-container">
          <div className="login-box">
           
            {/* Title Box */}
            <div className="title-box">
              <h2>Sign in</h2>
              <div className="text">Forgot your password?</div>
            </div>
            {/* Login Form */}
            <div className="styled-form">
              {loading && <Loader />}
              {error && <Message>{error}</Message>}
              {success && <Message>{forgotPassword}</Message>}
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register('email')}
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="theme-btn btn-style-three  mt-4"
                  >
                    <span className="txt">Request new password</span>
                  </button>
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
