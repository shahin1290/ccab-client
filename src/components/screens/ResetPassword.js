import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import { resetPassword } from '../../redux/actions/userAction'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../../redux/actions/userAction'
import { createBrowserHistory } from 'history'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
})

export default function ResetPassword({ match }) {
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

  const userLogin = useSelector((state) => state.passwordReset)
  const { loading, passwordReset, error, success } = userLogin

  console.log(userLogin)
  useEffect(() => {
    if (success) {
      history.push('/profile')
    }
  }, [history, success])

  const submitHandler = ({ password }) => {
    dispatch(resetPassword(match.params.token, password))
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
            {/* Title Box */}
            <div className="title-box">
              <h2>Set a new Password</h2>
            </div>
            {/* Login Form */}
            <div className="styled-form">
              {error && <Message>{error}</Message>}
              {success && <Message>You have successfully changed your password</Message>}
              <form onSubmit={handleSubmit(submitHandler)}>
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
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                    className={`form-control ${
                      errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </div>

                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="theme-btn btn-style-three  mt-4"
                  >
                    <span className="txt">
                      Set password <i className="fa fa-angle-right" />
                    </span>
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
