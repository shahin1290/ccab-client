import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './../../../redux/actions/userAction'
import { createRequest } from '../../../redux/actions/requestAction'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory({ forceRefresh: true })

export default function RequestPayment({ match }) {
  const dispatch = useDispatch()

  /********* Call Reduser ************/

  const { userDetail } = useSelector((state) => state.userLogin)

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

  /*******************/

  /********* State And Var ************/

  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [currency, setCurrency] = useState('EUR')
  const [status, setStatus] = useState('Not Paid')
  const [StudentsList, setStudentsList] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')

  /*******************/

  useEffect(() => {
    // call the getter ( users list )
    dispatch(getUsers())

    if (requestSuccess) {
      userDetail.user_type === 'AdminUser'
        ? history.push('/admin-request-list')
        : history.push('/accountant-request-list')
    }
  }, [dispatch, match, history, requestSuccess])

  /********* functions  ************/

  const _FilterUsers = (users, role) => {
    return users.filter((user) => user.user_type === role)
  }

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createRequest({ name, price, selectedStudent, currency, status }))
  }

  useEffect(() => {
    if (users && users.length) {
      setStudentsList(_FilterUsers(users, 'StudentUser'))
    }
  }, [users])

  return (
    <>
      <div className="edit-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">Add Request</div>
              </div>
            </div>
          </div>
          <div>
            {error ? (
              <p className="text-danger bg-light p-2 ">{error}</p>
            ) : requestSuccess ? (
              <p className="text-success bg-light p-2 ">
                Request Send successfully
              </p>
            ) : null}
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              {/* Left Column */}
              <div className="mx-auto">
                <div className="inner-column">
                  {/* Edit Course Form */}
                  <div className="edit-course-form">
                    <form onSubmit={submitHandler}>
                      {/* Form Group */}
                      <div className="">
                        <label className="sub-text">Service Name</label>
                        <input
                          class="form-control"
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

                      <div className="mt-4">
                        <label className="sub-text mr-2">Set Currency </label>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="price"
                            id="inlineRadio1"
                            value="EUR"
                            onChange={(e) => {
                              setCurrency(e.target.value)
                            }}
                            checked={currency === 'EUR'}
                            required
                          />
                          <label class="form-check-label" for="inlineRadio1">
                            EUR
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="price"
                            id="inlineRadio2"
                            value="USD"
                            onChange={(e) => {
                              setCurrency(e.target.value)
                            }}
                            checked={currency === 'USD'}
                          />
                          <label class="form-check-label" for="inlineRadio2">
                            USD
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="price"
                            id="inlineRadio3"
                            value="SEK"
                            onChange={(e) => {
                              setCurrency(e.target.value)
                            }}
                            checked={currency === 'SEK'}
                          />
                          <label class="form-check-label" for="inlineRadio3">
                            SEK
                          </label>
                        </div>{' '}
                      </div>

                      <div className="">
                        <label className="sub-text">Set Price </label>

                        <input
                          class="form-control"
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

                      <div className="mt-4">
                        <label className="sub-text mr-2">Set Status </label>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="status"
                            id="inlineRadio1"
                            value="Not Paid"
                            onChange={(e) => {
                              setStatus(e.target.value)
                            }}
                            checked={status === 'Not Paid'}
                            required
                          />
                          <label class="form-check-label" for="inlineRadio1">
                            Not Paid
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="status"
                            id="inlineRadio2"
                            value="Paid"
                            onChange={(e) => {
                              setStatus(e.target.value)
                            }}
                            status={status === 'Paid'}
                          />
                          <label class="form-check-label" for="inlineRadio2">
                            Paid
                          </label>
                        </div>
                      </div>

                      <div className="">
                        <div className="">
                          {/* ******************* */}
                          <div className="">
                            <label
                              htmlFor="exampleDataList"
                              className="sub-text"
                            >
                              Select Student
                            </label>

                            <input
                              className="form-control"
                              list="datalistOptions"
                              id="exampleDataList"
                              placeholder="search student..."
                              onChange={(e) => {
                                setSelectedStudent(e.target.value)
                              }}
                              value={selectedStudent}
                              required
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
                        <button type="submit" class="btn btn-danger mt-5">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
