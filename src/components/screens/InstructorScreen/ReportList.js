import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Table, Row, Col, Button, Image } from 'react-bootstrap'
import Message from '../../layout/Message'
import {
  getSessions,
  deleteSession
} from '../../../redux/actions/sessionAction'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import NewSession from './NewSession'
import Rodal from 'rodal'
// include styles
import 'rodal/lib/rodal.css'

export default function SessionList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const [StudentsList, setStudentsList] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')

  // get Users list reducer
  const {
    users,
    loading: getUsersLoading,
    error: getUsersError
  } = useSelector((state) => state.userList)

  const { sessions, loading } = useSelector((state) => state.sessionList)
  const {
    loading: Deleteloading,
    error: DeleteError,
    successDelete
  } = useSelector((state) => state.sessionDelete)

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
  const [activeButton, setActiveButton] = useState('upcoming')

  return (
    <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
      <div className="container ">
        <Row className="w-75 mb-3">
          <Col>
            <Button
              variant="outline-warning"
              onClick={() => setActiveButton('upcoming')}
              className={activeButton === 'upcoming' ? 'bg-warning text-white' : ''}
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
              className={activeButton === 'notReported' ? 'bg-warning text-white' : ''}

            >
              <div>
                <i style={{ fontSize: 50 }} class="far fa-calendar-check"></i>
              </div>
              <div className="sub-text font-weight-bold">Not Reported </div>
            </Button>
          </Col>
          <Col>
            <Button variant="outline-warning" onClick={() => setActiveButton('reported')}
              className={activeButton === 'reported' ? 'bg-warning text-white' : ''}>
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

        <div className="form-group session-dropdown ">
          <input
            className="form-control bg-light "
            list="datalistOptions"
            id="exampleDataList"
            placeholder="search student..."
            onChange={(e) => {
              setSelectedStudent(e.target.value)
            }}
            value={selectedStudent}
          />

          <datalist id="datalistOptions">
            {StudentsList.length > 0 &&
              StudentsList.map((student) => {
                return (
                  <option
                    data={student._id}
                    value={student.name}
                    key={student._id}
                  >
                    {student.name}
                  </option>
                )
              })}
          </datalist>
        </div>

        <div className="py-2 sub-title">
          <div className="buttons-box pull-right">
            <Button
              variant="warning"
              onClick={() => setShowModal({ visible: true })}
            >
              <span className="txt">New Session</span>
            </Button>
          </div>
          <Rodal
            animation="flip"
            visible={showModal.visible}
            onClose={() => setShowModal({ visible: false })}
            width={900}
          >
            <NewSession selectedStudent={selectedStudent} />
          </Rodal>
        </div>
        {sessions &&
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
          ))}
      </div>
    </section>
  )
}
