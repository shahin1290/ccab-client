import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Table, Row, Col, Button, Image } from 'react-bootstrap'
import Message from '../../layout/Message'
import {
  getSessions,
  deleteSession
} from '../../../redux/actions/sessionAction'
import { getAppointments } from '../../../redux/actions/appointmentAction'

import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import NewSession from './NewSession'
import Rodal from 'rodal'
// include styles
import 'rodal/lib/rodal.css'
import { getDate } from '../../../util/getDate'

export default function SessionList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
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
  const {
    loading: Deleteloading,
    error: DeleteError,
    successDelete
  } = useSelector((state) => state.sessionDelete)

  useEffect(() => {
    // call the getter ( users list )
    dispatch(getAppointments())
  }, [dispatch, history])

  const getAllStudentsForInstructor = () => {
    let studentsList = []

    if (appointments && appointments.length > 0) {
      appointments.forEach((appointment) =>
        studentsList.push(appointment.student)
      )
    }

    return studentsList
  }

  useEffect(() => {
    if (
      userDetail.user_type === 'InstructorUser' ||
      userDetail.user_type === 'AdminUser'
    ) {
      dispatch(getSessions())
    } else {
      history.push('/')
    }
  }, [dispatch, userDetail, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ? ')) {
      dispatch(deleteSession(id))
      toast.info('User successfuly removed', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const [showModal, setShowModal] = useState({ visible: false })
  const [activeButton, setActiveButton] = useState('incoming')

  return (
    <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
      <div className="container ">
        <Row className="w-75 mb-3">
          <Col>
            <Button
              variant="outline-warning"
              onClick={() => setActiveButton('incoming')}
              className={
                activeButton === 'incoming' ? 'bg-warning text-white' : ''
              }
            >
              <div>
                <i style={{ fontSize: 50 }} class="far fa-calendar-check"></i>
              </div>
              <div className="sub-text font-weight-bold">Incoming </div>
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-warning"
              onClick={() => setActiveButton('upcoming')}
              className={
                activeButton === 'upcoming' ? 'bg-warning text-white' : ''
              }
            >
              <div>
                <i style={{ fontSize: 50 }} class="far fa-calendar-check"></i>
              </div>
              <div className="sub-text font-weight-bold">Upcoming </div>
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-warning"
              onClick={() => setActiveButton('notReported')}
              className={
                activeButton === 'notReported' ? 'bg-warning text-white' : ''
              }
            >
              <div>
                <i style={{ fontSize: 50 }} class="far fa-calendar-check"></i>
              </div>
              <div className="sub-text font-weight-bold">Not Reported </div>
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-warning"
              onClick={() => setActiveButton('reported')}
              className={
                activeButton === 'reported' ? 'bg-warning text-white' : ''
              }
            >
              <div>
                <i style={{ fontSize: 50 }} class="far fa-calendar-check"></i>
              </div>
              <div
                className="sub-text font-weight-bold"
                onClick={() => setActiveButton('reported')}
              >
                Reported{' '}
              </div>
            </Button>
          </Col>
        </Row>

        {/*   <div className="form-group ">
          <input
            className="form-control bg-light "
            list="datalistOptions"
            placeholder="select a student first"
            onChange={(e) => {
              setSelectedStudent(e.target.value)
            }}
            value={selectedStudent}
          />

          <datalist id="datalistOptions">
            {appointments &&
              appointments.length > 0 &&
              appointments.map((appointment) => {
                return (
                  <option
                    value={appointment.student.name}
                    key={appointment.student._id}
                  >
                    email: {appointment.student.email}; service :{' '}
                    {appointment.service.name}; session :{' '}
                    {appointment.sessionNumber}
                  </option>
                )
              })}
          </datalist>
        </div> */}

        <div className="py-2 sub-title mb-5">
          <Rodal
            animation="flip"
            visible={showModal.visible}
            onClose={() => setShowModal({ visible: false })}
            width={900}
          >
            <NewSession selectedAppointment={selectedAppointment} />
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
                <div key={req._id}>
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
                    <Col className="my-auto sub-text">Math</Col>{' '}
                    <Col className="my-auto sub-text">Axel Magnusse</Col>
                  </Row>
                </div>
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
                            <Button
                              disabled={appointment.sessionNumber === 0}
                              variant="warning"
                              onClick={() => {
                                setShowModal({ visible: true })
                                setSelectedAppointment(appointment._id)
                              }}
                            >
                              <span className="txt">New Session</span>
                            </Button>
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
      </div>
    </section>
  )
}
