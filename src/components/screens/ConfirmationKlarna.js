import React, { useEffect, useState, useRef } from 'react'
import { getCourseDetails } from '../../redux/actions/courseAction'
import { useSelector, useDispatch } from 'react-redux'
import { readKlarnaOrder } from '../../redux/actions/orderAction'
import Loader from '../layout/Loader'
import { createAppointment } from '../../redux/actions/appointmentAction';

const ConfirmationKlarna = ({ match }) => {
  const ID = match.params.bootcampId
  const dispatch = useDispatch()

  const { course, loading, error } = useSelector((state) => state.courseDetails)
  const { service} = useSelector((state) => state.serviceDetails)

  const {
    order,
    loading: ReadOrderLoading,
    success,
    error: ReadOrderError
  } = useSelector((state) => state.KlarnaOrderRead)

  useEffect(() => {
    dispatch(getCourseDetails(ID))
    dispatch(readKlarnaOrder(ID))
    dispatch(
      createAppointment({
        instructor: JSON.parse(localStorage.getItem('appointment'))
          .instructor,
        service: service._id,
        sessionNumber: JSON.parse(localStorage.getItem('appointment'))
          .sessionNumber
      })
    )
  }, [dispatch, ID])

  //console.log(html&&html);
  return (
    <div className="auto-container">
      {ReadOrderLoading && <Loader />}

      {order && order.fraud_status === 'ACCEPTED' ? (
        <div class="jumbotron text-center">
          <h1 class="display-3">Thank You!</h1>

          <p class="lead">
            {course && course._id ? (
              <>
                <strong>Your purchase is being verified.</strong> You can now
                start to learn.
                <a
                  href={'/course-content/' + course._id}
                  className="btn btn-danger rounded-pill"
                >
                  Start Learning !
                </a>
              </>
            ) : (
              <div>
                Your Order is being confirmed. Soon We will add the course to
                your profile.
              </div>
            )}
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default ConfirmationKlarna
