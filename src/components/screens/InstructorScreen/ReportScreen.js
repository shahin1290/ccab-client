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

  const { session } = useSelector((state) => state.sessionDetails)

  /*******************/

  useEffect(() => {
    if (sessionSuccess || updateSuccess) {
      history.push('/reports')
    }
  }, [dispatch, history, updateSuccess])

  //Pick date and time

  const [notes, setNotes] = useState('')

  //update form submit
  const updateHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateSession(
        {
          startDate: session && new Date(session && session.startDate),
          endDate: session && new Date(session && session.endDate),
          selectedAppointment,
          status: 'Reported',
          feedback: { prepared: 10, delivered: 5, message: notes }
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
          <div className="title">Short Info to the Admin</div>
          <Row className="">
            <div className="ml-5">
              how prepered did you feel your self before the first sesssion ?
            </div>
            <div className="d-flex ">
              <div>not prepeared at all </div>
              <div>very prepeared </div>
            </div>
          </Row>

          <Row className="">
            <div className="ml-5">
              how prepered did you feel your self before the first sesssion ?
            </div>
            <div className="d-flex ">
              <div>not prepeared at all </div>
              <div>very prepeared </div>
            </div>
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
            <div className="p-5">Feedback for Us</div>
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

                      <Button variant="warning" onClick={updateHandler}>
                        Report
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
