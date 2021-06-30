import React, { useEffect, useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, Button } from 'react-bootstrap'
import {
  createSession,
  updateSession,
  deleteSession
} from '../../../redux/actions/sessionAction'
import { createBrowserHistory } from 'history'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getAppointmentDetails } from '../../../redux/actions/appointmentAction'

const history = createBrowserHistory({ forceRefresh: true })

export default function NewSession({ selectedAppointment, activeButton }) {
  const dispatch = useDispatch()

  /********* Call Reduser ************/

  // update course reducer
  const {
    loading: sessionLoading,
    error: AddError,
    success: sessionSuccess
  } = useSelector((state) => state.sessionCreate)

  const { success: updateSuccess } = useSelector((state) => state.sessionUpdate)
  const { success: deleteSuccess } = useSelector((state) => state.sessionDelete)

  const { session } = useSelector((state) => state.sessionDetails)
  const { appointment } = useSelector((state) => state.appointmentDetails)

  /*******************/

  useEffect(() => {
    activeButton === 'incoming' &&
      dispatch(getAppointmentDetails(selectedAppointment))
    if (sessionSuccess || updateSuccess || deleteSuccess) {
      history.push('/reports')
    }
  }, [
    dispatch,
    history,
    sessionSuccess,
    updateSuccess,
    deleteSuccess,
    selectedAppointment
  ])

  //Pick date and time

  const [notes, setNotes] = useState('')
  const [startDate, setStartDate] = useState(new Date())

  const [endTime, setEndTime] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())

  useEffect(() => {
    if (session.startDate) {
      setStartDate(new Date(session && session.startDate))
    }

    if (session.startDate) {
      setStartTime(new Date(session && session.startDate))
    }

    if (session.endDate) {
      setEndTime(new Date(session && session.endDate))
    }

    if (session.notes) {
      setNotes(session.notes)
    }
  }, [session])

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="p-3 ml-5 font-weight-bold" onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    const combineStartDate = (startDate.getDate(), startTime)
    const combineEndDate = (startDate.getDate(), endTime)

    dispatch(
      createSession({
        startDate: combineStartDate,
        endDate: combineEndDate,
        notes,
        selectedAppointment
      })
    )
  }

  //update form submit
  const updateHandler = (e) => {
    e.preventDefault()

    const combineStartDate = (startDate.getDate(), startTime)
    const combineEndDate = (startDate.getDate(), endTime)

    dispatch(
      updateSession(
        {
          startDate: combineStartDate,
          endDate: combineEndDate,
          notes,
          selectedAppointment
        },
        session._id
      )
    )
  }

  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div className="edit-cource-section">
        <div className="auto-container">
          <Row className="mt-2 mb-4 ">
            <Col md={2} xs={12} className=" text-center-small-screen">
              <Image
                width="80"
                src="/images/resource/avatar.svg"
                roundedCircle
              />
            </Col>

            <Col md={10} className=" title text-center-small-screen">
              {activeButton === 'incoming' &&
                appointment &&
                appointment.student &&
                appointment.student.name}
              {activeButton === 'upcoming' &&
                session &&
                session.student &&
                session.student.name}
            </Col>
          </Row>

          <Row className="mt-2 mb-4 text-center-small-screen">
            <Col md={2} >
              <i
                class="far fa-calendar-alt "
                style={{ color: '#ED9D2B', fontSize: '70px' }}
              ></i>
            </Col>
            <Col md={2} className="title">Start</Col>
            <Col md={6} className="my-auto sub-text ">
              <div className="d-flex justify-content-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={<ExampleCustomInput />}
                />

                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={10}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  customInput={<ExampleCustomInput />}
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-2 mb-4">
            <Col md={2}></Col>
            <Col md={8}>
              <div className="d-flex justify-content-between text-center-small-screen">
                <div className="title ">End</div>
                <div className=" mr-4 ">
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={10}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    customInput={<ExampleCustomInput />}
                  />
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
                    <form>
                      <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center-small-screen">
                        <textarea
                          type="text"
                          value={notes}
                          placeholder="Your notes here"
                          onChange={(e) => setNotes(e.target.value)}
                          required
                        />

                        {activeButton === 'incoming' && (
                          <Button
                            variant="warning"
                            onClick={submitHandler}
                            size="md"
                            className="w-25"
                            style={{ margin: '0 auto' }}
                          >
                            Book
                          </Button>
                        )}
                        {activeButton === 'upcoming' && (
                          <div className="d-flex justify-content-between">
                            <Button variant="warning" onClick={updateHandler}>
                              Rebook
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Are you sure you wish to delete this item?'
                                  )
                                )
                                  dispatch(deleteSession(session._id))
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
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
