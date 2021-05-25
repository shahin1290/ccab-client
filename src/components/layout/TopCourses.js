import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/actions/courseAction'
import { updateWeek } from '../../redux/actions/weekAction'

import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { Link } from 'react-router-dom'

export default function TopCourses({ match }) {
  const dispatch = useDispatch()
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])

  return (
    <>
      {/* Institution Section */}
      <section
        className="institution-section"
        style={{
          backgroundColor: '#F8F9FD'
        }}
      >
        <div className="auto-container">
          {/* Sec Title */}
          <div className="title text-center p-4 ">Our Top Courses</div>
          <hr className="block-seperator mb-5" />
          <div className="row clearfix">
            {/* Institution Block */}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message>{error}</Message>
            ) : courseList.length ? (
              courseList.map((course) => (
                <div
                  className="cource-block-two col-lg-3 col-md-6 col-sm-12"
                  key={course._id}
                >
                  <div className="inner-box">
                    <div className="image">
                      <Link to={`/courses/${course._id}`}>
                        <img
                          src={
                            'https://server.ccab.tech/uploads/Bootcamp/' +
                            course.img_path
                          }
                          alt=""
                          style={{
                            'max-height': '150px'
                          }}
                        />
                      </Link>
                    </div>
                    <div className="lower-content">
                      <h5>
                        <Link to={`/courses/${course._id}`}>{course.name}</Link>
                      </h5>
                      <div className="text">
                        <span
                          className="d-inline-block text-truncate"
                          style={{ maxWidth: '240px' }}
                        >
                          {course.description}
                        </span>
                      </div>
                      <div className="clearfix">
                        <div className="pull-left">
                          <div className="students">
                            {course.weeks * 5} Lectures
                          </div>
                        </div>
                        <div className="pull-right">
                          <div className="hours">
                            {course.weeks * 5 * 2} Hours
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              ''
            )}
            {/* Institution Block */}
            <div className="institution-block empty-block col-lg-4 col-md-6 col-sm-12">
              <div
                className="inner-box wow fadeInRight"
                data-wow-delay="0ms"
                data-wow-duration="1500ms"
              >
                <a href="/course-grid" className="theme-btn btn-style-three">
                  <span className="txt">Browse All</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Institution Section */}
    </>
  )
}
