import React, { useEffect } from 'react'
import { getCourseDetails } from '../../redux/actions/courseAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader'

const ConfirmationKlarna = ({ match }) => {
  const ID = match.params.bootcampId
  const dispatch = useDispatch()

  const { course, loading, error } = useSelector((state) => state.courseDetails)

  useEffect(() => {
    dispatch(getCourseDetails(ID))
  }, [dispatch, ID])

  //console.log(html&&html);
  return (
    <div className="auto-container">
      {loading ? (
        <Loader />
      ) : (
        <div class="jumbotron text-center">
          <h1 class="display-3">Thank You!</h1>
          <p class="lead">
            <strong>Your purchase is being verified.</strong> You can now start
            to learn.
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
      )}
    </div>
  )
}

export default ConfirmationKlarna
