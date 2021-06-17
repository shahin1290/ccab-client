import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/actions/courseAction'

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

  const filterSubscriptionCourse = (courseList) => {
    return courseList.filter((course) => {
      const titleFirstWord = course.name
        .toLowerCase()
        .split(' ')[0]
        .toLowerCase()

      return !['basic', 'standard', 'premium'].includes(titleFirstWord, 1)
    })
  }

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
          <div className="title text-center p-4 ">Discover our courses</div>
          <hr className="block-seperator mb-3" />

          <div className="sub-text text-center mb-5">
            Each course consists of video-lectures, assignments and quizzes.
          </div>
          {loading ? <Loader /> : error && <Message>{error}</Message>}

          <div className="row clearfix">
            {/* Institution Block */}
            {courseList.length &&
              filterSubscriptionCourse(courseList).map((course) => (
                <div
                  className=" cource-block-two col-lg-3 col-md-6 col-sm-12"
                  key={course._id}
                >
                  <div className="inner-box ">
                    <div className="image ">
                      <Link to={`/courses/${course._id}`}>
                        <img
                          src={
                            'https://server.ccab.tech/uploads/Bootcamp/' +
                            course.img_path
                          }
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="lower-content">
                      <div>
                        <Link
                          className="sub-title"
                          to={`/courses/${course._id}`}
                        >
                          {course.name}
                        </Link>
                      </div>
                      <div className="text">
                        <span
                          className="sub-text d-inline-block text-truncate"
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
              ))}

            {/* Institution Block */}
            {courseList.length > 0 ? (
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
            ) : (
              ''
            )}
          </div>
        </div>
      </section>

      {/* End Institution Section */}
    </>
  )
}
