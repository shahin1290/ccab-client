import React, { useEffect, useState, useRef } from 'react'
import { getCourseDetails } from '../../redux/actions/courseAction'
import { useSelector, useDispatch } from 'react-redux'
import { readKlarnaOrder } from '../../redux/actions/orderAction'
import Loader from '../layout/Loader'
import Message from '../layout/Message'

const ConfirmationKlarna = ({ match }) => {
  const ID = match.params.bootcampId
  const dispatch = useDispatch()

  const { course, loading, error } = useSelector((state) => state.courseDetails)

  const {
    order,
    loading: ReadOrderLoading,
    success,
    error: ReadOrderError
  } = useSelector((state) => state.KlarnaOrderRead)
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    dispatch(getCourseDetails(ID))
    dispatch(readKlarnaOrder(ID))
  }, [dispatch, ID])

  //console.log(html&&html);
  return (
    <div className="auto-container">
      {ReadOrderLoading && <Loader />}

      {order && order.fraud_status === 'ACCEPTED' ? (
        <div class="jumbotron text-center">
          <h1 class="display-3">Thank You!</h1>
          <p class="lead">
            <strong>Your purchase is being verified.</strong> You can now start to learn.
          </p>

          <p class="lead">
            <a
              href={'/course-content/' + course._id}
              className="btn btn-danger rounded-pill"
            >
              Start Learning !
            </a>{' '}
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default ConfirmationKlarna
