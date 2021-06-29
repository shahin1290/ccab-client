import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Table, Row, Col, Button, Image } from 'react-bootstrap'
import Message from '../../layout/Message'
import {
  getSessions,
  getSessionDetails
} from '../../../redux/actions/sessionAction'
import { getAppointments } from '../../../redux/actions/appointmentAction'

import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import NewSession from './NewSession'
import ReportScreen from './ReportScreen'

import Rodal from 'rodal'
// include styles
import 'rodal/lib/rodal.css'
import { getDate } from '../../../util/getDate'

export default function SessionList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)

  const [showModal, setShowModal] = useState({ visible: false })
  const [activeButton, setActiveButton] = useState('incoming')

  const { userDetail } = userLogin

  const [selectedAppointment, setSelectedAppointment] = useState('')

  // get Users list reducer
  const { appointments, loading } = useSelector(
    (state) => state.appointmentList
  )

  const {
    sessions,
    loading: sessionLoading,
    error: sessionError
  } = useSelector((state) => state.sessionList)

  useEffect(() => {
    // call the getter ( users list )
    dispatch(getAppointments())
    dispatch(getSessionDetails(selectedAppointment))
  }, [dispatch, history, selectedAppointment])

  useEffect(() => {
    if (
      userDetail.user_type === 'InstructorUser' ||
      userDetail.user_type === 'AdminUser'
    ) {
      dispatch(getSessions())
    } else {
      history.push('/')
    }
  }, [dispatch, userDetail, history])

  /*********** functions ******************/

  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const reportedSessions = () =>
    sessions && sessions.filter((session) => session.status === 'Reported')

  const notReportedSessions = () =>
    sessions && sessions.filter((session) => session.status !== 'Reported')

  return (
    <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
      <div className="container ">
        <Row className="mt-2 mx-auto">
          <Col
            md={2}
            xs={5}
            onClick={() => setActiveButton('incoming')}
            /* className={
                activeButton === 'incoming' ? 'bg-warning text-white' : ''
              } */
            className={`reports-nav-button mr-3 mb-1 ${
              activeButton === 'incoming' ? 'bg-warning text-white' : ''
            }`}
          >
            <div className="d-flex flex-column text-center content">
              <i class="far fa-calendar-plus hide-on-small-screen text-center"></i>

              <div className="sub-text font-weight-bold">Incoming </div>
            </div>
          </Col>
          <Col
            md={2}
            xs={5}
            onClick={() => setActiveButton('upcoming')}
            className={`reports-nav-button mr-3 mb-1 ${
              activeButton === 'upcoming' ? 'bg-warning text-white' : ''
            }`}
          >
            <div className="d-flex flex-column text-center content">
              <i class="fas fa-calendar-day hide-on-small-screen"></i>

              <div className="sub-text font-weight-bold">Upcoming </div>
            </div>
          </Col>
          <Col
            md={2}
            xs={5}
            onClick={() => setActiveButton('notReported')}
            className={`reports-nav-button mr-3 mb-1 ${
              activeButton === 'notReported' ? 'bg-warning text-white' : ''
            }`}
          >
            <div className="d-flex flex-column text-center content">
              <i class="fas fa-chart-bar hide-on-small-screen"></i>

              <div className="sub-text font-weight-bold">Not Reported </div>
            </div>
          </Col>
          <Col
            md={2}
            xs={5}
            onClick={() => setActiveButton('reported')}
            className={`reports-nav-button mr-3 mb-1 ${
              activeButton === 'reported' ? 'bg-warning text-white' : ''
            }`}
          >
            <div className="d-flex flex-column text-center content">
              <i class="far fa-calendar-check hide-on-small-screen"></i>

              <div className="sub-text font-weight-bold">Reported </div>
            </div>
          </Col>
        </Row>

        <div className="py-2 sub-title mb-5">
          <Rodal
            animation="zoom"
            visible={showModal.visible}
            onClose={() => setShowModal({ visible: false })}
            width={900}
          >
            {activeButton !== 'notReported' ? (
              <NewSession
                selectedAppointment={selectedAppointment}
                activeButton={activeButton}
              />
            ) : (
              <ReportScreen />
            )}
          </Rodal>
        </div>
        {activeButton === 'upcoming' && (
          <>
            {sessionLoading ? (
              <Loader />
            ) : sessionError ? (
              <Message>{sessionError}</Message>
            ) : (
              sessions &&
              sessions.map((req) => (
                <a
                  key={req._id}
                  onClick={() => {
                    setSelectedAppointment(req._id)
                    setShowModal({ visible: true })
                  }}
                >
                  <div className="sub-title mt-5 mb-2">
                    {longEnUSFormatter.format(new Date(req.startDate))}{' '}
                  </div>
                  <Row className="pl-5 pr-5">
                    <Col>
                      {' '}
                      <Image
                        width="50"
                        src="/images/resource/avatar.svg"
                        roundedCircle
                      />
                    </Col>{' '}
                    <Col className="my-auto sub-text">
                      {new Date(req.startDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}{' '}
                      -{' '}
                      {new Date(req.endDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Col>{' '}
                    <Col className="my-auto sub-text">{req.service.name}</Col>{' '}
                    <Col className="my-auto sub-text">{req.student.name}</Col>
                  </Row>
                </a>
              ))
            )}
          </>
        )}

        {activeButton === 'incoming' && (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Service</th>
                <th>Registered At</th>
                <th>Sessions Left</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointments.indexOf(appointment) + 1}</td>
                    <td>{appointment.student.name}</td>
                    <td>{appointment.service.name}</td>
                    <td>{getDate(appointment.createdAt)}</td>
                    <td>{appointment.sessionNumber}</td>
                    <td>
                      <Container>
                        <Row>
                          <div className="buttons-box pull-right">
                            <a
                              disabled={appointment.sessionNumber === 0}
                              variant="warning"
                              onClick={() => {
                                setShowModal({ visible: true })
                                setSelectedAppointment(appointment._id)
                              }}
                            >
                              <span className="sub-title text-warning"><i class="fas fa-plus-square"></i> New Session</span>
                            </a>
                          </div>
                        </Row>
                      </Container>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                  No Request Found!
                </p>
              )}
            </tbody>
          </Table>
        )}

        {activeButton === 'notReported' && (
          <>
            {sessionLoading ? (
              <Loader />
            ) : sessionError ? (
              <Message>{sessionError}</Message>
            ) : notReportedSessions() && notReportedSessions().length > 0 ? (
              notReportedSessions().map((req) => (
                <a
                  key={req._id}
                  onClick={() => {
                    setSelectedAppointment(req._id)
                    setShowModal({ visible: true })
                  }}
                >
                  <div className="sub-title mt-5 mb-2">
                    {longEnUSFormatter.format(new Date(req.startDate))}{' '}
                  </div>
                  <Row className="pl-5 pr-5">
                    <Col>
                      {' '}
                      <Image
                        width="50"
                        src="/images/resource/avatar.svg"
                        roundedCircle
                      />
                    </Col>{' '}
                    <Col className="my-auto sub-text">
                      {new Date(req.startDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}{' '}
                      -{' '}
                      {new Date(req.endDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Col>{' '}
                    <Col className="my-auto sub-text">{req.service.name}</Col>{' '}
                    <Col className="my-auto sub-text">{req.student.name}</Col>
                    <Col className="my-auto sub-title text-warning">
                      <a
                        onClick={() => {
                          setShowModal({ visible: true })
                        }}
                      >
                        Report
                      </a>
                    </Col>
                  </Row>
                </a>
              ))
            ) : (
              <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                No Session found !
              </p>
            )}
          </>
        )}

        {activeButton === 'reported' && (
          <>
            {sessionLoading ? (
              <Loader />
            ) : sessionError ? (
              <Message>{sessionError}</Message>
            ) : (
              reportedSessions() &&
              reportedSessions().map((req) => (
                <div>
                  <div className="sub-title mt-5 mb-2">
                    {longEnUSFormatter.format(new Date(req.startDate))}{' '}
                  </div>
                  <Row className="pl-5 pr-5">
                    <Col>
                      {' '}
                      <Image
                        width="50"
                        src="/images/resource/avatar.svg"
                        roundedCircle
                      />
                    </Col>{' '}
                    <Col className="my-auto sub-text">
                      {new Date(req.startDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}{' '}
                      -{' '}
                      {new Date(req.endDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Col>{' '}
                    <Col className="my-auto sub-text">{req.service.name}</Col>{' '}
                    <Col className="my-auto sub-text">{req.student.name}</Col>
                  </Row>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </section>
  )
}
