import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Footer from './../../layout/Footer'
import Header from '../../layout/Header'

const InstructorRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin
  let Token = userDetail.token

  return (
    <Route
      {...rest}
      render={(props) =>
        (Token && userDetail.user_type !== 'InstructorUser') || !Token ? (
          <Redirect to="/login" />
        ) : (
          <>
            <Header />

            <div className=" page-wrapper">
              {/* hide on mobile */}

              <Component {...props} />
            </div>
            <Footer />
          </>
        )
      }
    />
  )
}

export default InstructorRoute
