import React, { useEffect } from 'react'
import { getCourseDetails } from '../../redux/actions/courseAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader'

const ConfirmationKlarna = ({ match }) => {
  const ID = match.params.bootcampId
  const dispatch = useDispatch()

  const { course, loading, error } = useSelector((state) => state.courseDetails)

  useEffect(() => {
    if (ID) {
      dispatch(getCourseDetails(ID))
    }
  }, [dispatch, ID])

  //console.log(html&&html);
  return (
    <div style={{width: '100%', height: '500px'}}>
    <div className="auto-container mt-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="jumbotron text-center">
          <h1 className="display-3">Thank You!</h1>
          <p className="lead">
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
                Your purchase is being verified.
              </div>
            )}
          </p>
        </div>
      )}
    </div>
    </div>
  )
}

export default ConfirmationKlarna
