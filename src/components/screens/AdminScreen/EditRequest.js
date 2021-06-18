import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './../../../redux/actions/userAction'
import {
  updateRequest,
  getRequestDetails
} from '../../../redux/actions/requestAction'

export default function UpdateRequest({ match }) {
  const dispatch = useDispatch()
  const ID = match.params.id

  /********* Call Reduser ************/

  // update course reducer
  const {
    loading: requestLoading,
    error,
    success: requestSuccess
  } = useSelector((state) => state.requestCreate)

  // get Users list reducer
  const {
    users,
    loading: getUsersLoading,
    error: getUsersError
  } = useSelector((state) => state.userList)

  const {
    loading: requestDetailsLoading,
    success: requestDetailsSuccess,
    request
  } = useSelector((state) => state.requestDetails)

  
  const {success: UpdateSuccess,loading: Updateloading, error: UpdateError } = useSelector(
    (state) => state.requestUpdate
  )

  /*******************/

  const _setDefaultValuse = () => {
    setName(request && request.name)
    setPrice(request && request.amount)
    setSelectedStudent(request.requestedUser && request.requestedUser.email)
  }

  /********* State And Var ************/

  const [name, setName] = useState()
  const [price, setPrice] = useState()

  const [StudentsList, setStudentsList] = useState([])
  const [selectedStudent, setSelectedStudent] = useState()

  /*******************/

  useEffect(() => {
    // call the getter ( users list )
    dispatch(getUsers())

    if (ID) {
      dispatch(getRequestDetails(ID))
    }
  }, [dispatch, ID])

  useEffect(() => {
    if (request) {
      _setDefaultValuse()
    }
  }, [request])

  /********* functions  ************/

  const _FilterUsers = (users, role) => {
    return users.filter((user) => user.user_type === role)
  } 

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateRequest({ name, amount: price, selectedStudent }, ID))
  }

  useEffect(() => {
    if (users && users.length) {
      setStudentsList(_FilterUsers(users, 'StudentUser'))
    }
  }, [users])

  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div className="edit-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">Edit Request</div>
              </div>
            </div>
          </div>
          <div>
            {UpdateError ? (
              <p className="text-danger bg-light p-2 ">{error}</p>
            ) : UpdateSuccess ? (
              <p className="text-success bg-light p-2 ">
                Request Updated successfully
              </p>
            ) : null}
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              {/* Left Column */}
              <div className="left-column col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="sub-title pb-3">Basic Information</div>
                  {/* Edit Course Form */}
                  <div className="edit-course-form">
                    <form onSubmit={submitHandler}>
                      {/* Form Group */}
                      <div className="form-group">
                        <label>Service Name</label>
                        <input
                          type="text"
                          name="service-name"
                          placeholder="Service Name"
                          value={name}
                          required
                          onChange={(e) => {
                            setName(e.target.value)
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <label>Set Price (in USD)</label>
                        <input
                          type="text"
                          name="service-price"
                          placeholder="Service Price"
                          value={price}
                          required
                          onChange={(e) => {
                            setPrice(e.target.value)
                          }}
                        />
                      </div>

                      {/* Right Column */}
                      <div className=" col-lg-12 col-md-12 col-sm-12">
                        <div className="inner-column">
                          <div className="sub-title pb-3">Options</div>
                          <div className="option-cource-box">
                            <div className="box-inner">
                              {/* ******************* */}
                              <div className="form-group ">
                                <label
                                  htmlFor="exampleDataList"
                                  className="form-label"
                                >
                                  Students
                                </label>

                                <input
                                  className="form-control bg-light"
                                  list="datalistOptions"
                                  id="exampleDataList"
                                  placeholder="search student..."
                                  onChange={(e) => {
                                    setSelectedStudent(e.target.value)
                                  }}
                                  value={selectedStudent}
                                />

                                <datalist id="datalistOptions">
                                  {StudentsList.length &&
                                    StudentsList.map((student) => {
                                      return (
                                        <option
                                          data={student._id}
                                          value={student.email}
                                          key={student._id}
                                        >
                                          {student.name}
                                        </option>
                                      )
                                    })}
                                </datalist>
                              </div>
                            </div>
                          </div>
                          {/* Button Box */}
                          <div className="button-box text-center">
                            <button
                              type="submit"
                              className="theme-btn btn-style-one"
                              style={{ zIndex: '0' }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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
