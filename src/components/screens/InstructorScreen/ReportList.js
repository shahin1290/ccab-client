import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Table, Row, Col } from 'react-bootstrap'
import Message from '../../layout/Message'
import {
  getSessions,
  deleteSession
} from '../../../redux/actions/sessionAction'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import { getDate } from '../../../util/getDate'

export default function SessionList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

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

  return (
    <>
      <div className="container " style={{ padding: '60px 0' }}>
        <div className="title pb-3">Sessions</div>
        <div className="py-2 sub-title">
          <Link to="/instructor-new-session">
            {' '}
            <i class="fas fa-file-invoice-dollar"></i> Add session
          </Link>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>

              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions ? (
              sessions.map((req) => (
                <tr key={req._id}>
                  <td>{sessions.indexOf(req) + 1}</td>

                  <td>{req.status}</td>
                  <td>{getDate(req.createdAt)}</td>

                  <td>
                    <Container>
                      <Row>
                        <Col style={{ padding: '0px' }}>
                          <a onClick={() => deleteHandler(req._id)}>
                            <i className="fas fa-trash-restore text-danger"></i>
                          </a>
                        </Col>

                        <Col style={{ padding: '0px' }}>
                          <Link to={`/admin-session-edit/${req._id}`}>
                            <i className="fas fa-edit text-danger"></i>
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </td>
                </tr>
              ))
            ) : (
              <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                No session Found!
              </p>
            )}
          </tbody>
        </Table>
      </div>
      {<ToastContainer />}
    </>
  )
}
