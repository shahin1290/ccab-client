import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUsers } from '../../../redux/actions/userAction'
import { Table, Col, Row, Modal, Card, Accordion } from 'react-bootstrap'
import { createBrowserHistory } from 'history'
import { createAppointment } from '../../../redux/actions/appointmentAction'

export default function AddStudentToService() {
  const history = createBrowserHistory({ forceRefresh: true })

  const dispatch = useDispatch()

  /********* Call Reduser ************/

  const { appointment, error, success } = useSelector(
    (state) => state.appointmentCreate
  )

  // get service Details Reducer
  const {
    service,
    loading: serviceDetailsloading,
    error: serviceDetailsError
  } = useSelector((state) => state.serviceDetails)

  // get Users list reducer
  const {
    users,
    loading: getUsersLoading,
    error: getUsersError
  } = useSelector((state) => state.userList)

  /*******************/

  /********* State And Var ************/

  const [student, setStudent] = useState({}) // done
  const [Instructor, setInstructor] = useState({}) // done
  const [sessionNumber, setSessionNumber] = useState(1)
  const [InstructorsList, setInstructorsList] = useState([])
  const [StudentsList, setStudentsList] = useState([])

  /*******************/

  useEffect(() => {
    dispatch(getUsers())

    if(success){
      history.push(`/admin-service-update/${service._id}`)
    }
  }, [dispatch, success])

  /********* functions  ************/

  const _FilterUsers = (users, role) => {
    if (role == 'MentorUser') {
      return users.filter(
        (user) => user.user_type == role || user.user_type == 'AdminUser'
      )
    }
    return users.filter((user) => user.user_type == role)
  }

  // select mentor
  const _handleSelectInstructor = (arr) => {
    setInstructor({ _id: arr[0], name: arr[1] })
  }

  // select mentor
  const _handleSelectStudent = (arr) => {
    setStudent({ _id: arr[0], name: arr[1] })
  }

  /********************* ************/
  /* Field Section */

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      createAppointment({
        student: student._id,
        instructor: Instructor._id,
        service: service._id,
        sessionNumber
      })
    )

    /* if (titleWithAnswer.length) {
      titleWithAnswer.forEach((item) => {
        infoData.push(item)
      })
      dispatch(
        updateCourse(
          { info_list: infoData, name: name, video_path: VideoUrl },
          course._id
        )
      )
    } */
  }

  useEffect(() => {
    if (users && users.length) {
      setStudentsList(_FilterUsers(users, 'StudentUser'))
      setInstructorsList(_FilterUsers(users, 'InstructorUser'))
    }
  }, [service, users])

  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div className="edit-cource-section">
        <div className="auto-container">
          <div>
            {error ? (
              <p className="text-danger bg-light p-2 ">{error}</p>
            ) : success ? (
              <p className="text-success bg-light p-2 ">
                Student Added successfully
              </p>
            ) : null}
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              {/* Right Column */}
              <div className=" col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="option-cource-box">
                    <div className="box-inner">
                      <div className="form-group mb-2">
                        <label> Instructor</label>
                        {!InstructorsList.length > 0 && (
                          <p className="text-warning bg-light p-1">
                            * There is no Instructor Users
                          </p>
                        )}
                        {/* <span className="select-category">Select a category</span> */}
                        <select
                          className="custom-select-box px-2"
                          onChange={(e) => {
                            _handleSelectInstructor(e.target.value.split(','))
                          }}
                        >
                          <option value="" disabled selected>
                            Choose Instructor{' '}
                          </option>
                          {InstructorsList.length > 0 &&
                            InstructorsList.map((instructor) => {
                              return (
                                <option
                                  value={[instructor._id, instructor.name]}
                                >
                                  {instructor.name}
                                </option>
                              )
                            })}
                        </select>

                        <div className="my-3">
                          {Instructor.name ? (
                            <span className="rounded-pill  px-2 py-1 m-2 bg-light">
                              <i className="fas fa-plus-circle text-success"></i>{' '}
                              {Instructor.name}
                            </span>
                          ) : (
                            <p className="text-warning bg-light p-1">
                              * Nothing Selected
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border my-3"></div>

                      <div className="form-group mb-2">
                        <label> Student</label>
                        {!StudentsList.length > 0 && (
                          <p className="text-warning bg-light p-1">
                            * There is no Student Users
                          </p>
                        )}
                        {/* <span className="select-category">Select a category</span> */}
                        <select
                          className="custom-select-box px-2"
                          onChange={(e) => {
                            _handleSelectStudent(e.target.value.split(','))
                          }}
                        >
                          <option value="" disabled selected>
                            Choose Student{' '}
                          </option>
                          {StudentsList.length > 0 &&
                            StudentsList.map((student) => {
                              return (
                                <option value={[student._id, student.name]}>
                                  {student.name}
                                </option>
                              )
                            })}
                        </select>

                        <div className="my-3">
                          {student.name ? (
                            <span className="rounded-pill  px-2 py-1 m-2 bg-light">
                              <i className="fas fa-plus-circle text-success"></i>{' '}
                              {student.name}
                            </span>
                          ) : (
                            <p className="text-warning bg-light p-1">
                              * Nothing Selected
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border my-3"></div>
                      {/* ******************* */}
                      <div className="form-group">
                        <span className="price">Number of Session</span>
                        <div className="total-price">Set Session Number :</div>
                        <div className="item-quantity">
                          <input
                            className="quantity-spinner"
                            type="number"
                            min="1"
                            defaultValue={sessionNumber}
                            name="quantity"
                            onChange={(e) => {
                              setSessionNumber(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Button Box */}
                  <div className="button-box text-center">
                    <button
                      type="button"
                      className="theme-btn btn-style-one"
                      style={{ zIndex: '0' }}
                    >
                      <span className="txt" onClick={submitHandler}>
                        Add Student
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
