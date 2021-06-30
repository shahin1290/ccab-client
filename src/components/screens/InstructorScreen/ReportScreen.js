import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Button } from 'react-bootstrap'
import { updateSession } from '../../../redux/actions/sessionAction'
import { createBrowserHistory } from 'history'

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
  const [feedback, setFeedback] = useState(5)

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
          feedback: { prepared: feedback,  message: notes }
        },
        session._id
      )
    )
  }

  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div>
        <div className="title mb-5">Short Info to the Admin</div>

        <div>
          {AddError ? (
            <p className="text-danger bg-light p-2 ">{AddError}</p>
          ) : sessionSuccess ? (
            <p className="text-success bg-light p-2 ">
              Session Sent successfully
            </p>
          ) : null}
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="edit-course-form">
            <form>
              <div className="sub-title">
                How prepered did you feel your self before the first sesssion ?
              </div>

              <Row className="row clearfix">
                <Col md={10} xs={8} className=" title ">
                  <input
                    type="range"
                    class="custom-range"
                    min="1"
                    max="10"
                    id="customRange"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                </Col>
                <Col md={2} xs={3} className="title">
                  {feedback}
                </Col>
              </Row>
              <Row className="">
                <Col md={9} xs={7}>
                  not at all{' '}
                </Col>
                <Col md={2} xs={1}>
                  very prepered{' '}
                </Col>
              </Row>

              <div className="mt-5 form-group col-lg-12 col-md-12 col-sm-12">
                <div className="p-3">Feedback for Us</div>
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
      {/* End Manage Cource Section */}
    </>
  )
}
