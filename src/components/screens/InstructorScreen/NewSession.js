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
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    if (session.startDate) {
      setStartDate(new Date(session && session.startDate))
    }

    if (session.endDate) {
      setEndDate(new Date(session && session.endDate))
    }

    if (session.notes) {
      setNotes(session.notes)
    }
  }, [session])

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="p-3 " onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createSession({ startDate, endDate, notes, selectedAppointment }))
  }

  //update form submit
  const updateHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateSession(
        { startDate, endDate, notes, selectedAppointment },
        session._id
      )
    )
  }

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
              {appointment && appointment.student && appointment.student.name}
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
                    <form>
                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <textarea
                          type="text"
                          value={notes}
                          placeholder="Your notes here"
                          onChange={(e) => setNotes(e.target.value)}
                          required
                        />

                        {activeButton === 'incoming' && (
                          <Button variant="warning" onClick={submitHandler}>
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
