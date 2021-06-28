import React, { useEffect, useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Col, Row, Image, Button } from 'react-bootstrap'
import { getUsers } from '../../../redux/actions/userAction'
import { createSession } from '../../../redux/actions/sessionAction'
import { createBrowserHistory } from 'history'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const history = createBrowserHistory({ forceRefresh: true })

export default function NewSession({ selectedStudent }) {
  const dispatch = useDispatch()

  /********* Call Reduser ************/

  // update course reducer
  const {
    loading: sessionLoading,
    error: AddError,
    success: sessionSuccess
  } = useSelector((state) => state.sessionCreate)

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

  const [StudentsList, setStudentsList] = useState([])

  /*******************/

  useEffect(() => {
    // call the getter ( users list )
    dispatch(getUsers())

    if (sessionSuccess) {
      history.push('/reports')
    }
  }, [dispatch, history, sessionSuccess])

  /********* functions  ************/

  const _FilterUsers = (users, role) => {
    return users.filter((user) => user.user_type === role)
  }

  //Pick date and time

  const [notes, setNotes] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="p-3 " onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createSession({ startDate, endDate, notes, selectedStudent }))
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
          <Row className="mt-2 mb-4">
            <Col md={1}>
              <Image
                width="80"
                src="/images/resource/avatar.svg"
                roundedCircle
              />
            </Col>

            <Col md={6} className="my-auto title">
              Axel Magnuseee
            </Col>
          </Row>

          <Row className="mt-2 mb-4">
            <Col md={1}>
              <i
                class="far fa-calendar-alt"
                style={{ color: '#ED9D2B', fontSize: '50px' }}
              ></i>
            </Col>
            <Col md={11}>
              <div className="d-flex justify-content-between">
                <div className="title">Start</div>
                <div className="my-auto sub-text">
                  <DatePicker
                    className="border"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeInput
                    customInput={<ExampleCustomInput />}
                  ></DatePicker>
                </div>{' '}
              </div>
            </Col>
          </Row>

          <Row className="mt-2 mb-4">
            <Col md={1}></Col>
            <Col md={11}>
              <div className="d-flex justify-content-between">
                <div className="title">End</div>
                <div className="my-auto">
                  <DatePicker
                    className="border"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeInput
                    customInput={<ExampleCustomInput />}
                  ></DatePicker>
                </div>{' '}
              </div>
            </Col>
          </Row>
          <div>
            {AddError ? (
              <p className="text-danger bg-light p-2 ">{AddError}</p>
            ) : sessionSuccess ? (
              <p className="text-success bg-light p-2 ">
                Session Sent successfully
              </p>
            ) : null}
          </div>

          <Row>
            <Col md={1}></Col>
            <Col md={11}>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div>
                  <div className="edit-course-form">
                    <form onSubmit={submitHandler}>
                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <textarea
                          type="text"
                          value={notes}
                          placeholder="Your notes here"
                          onChange={(e) => setNotes(e.target.value)}
                          required
                        />
                        <Button variant="warning" type="submit">
                          Book
                        </Button>{' '}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
