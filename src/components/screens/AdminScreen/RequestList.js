import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Table, Row, Col } from 'react-bootstrap'
import Message from '../../layout/Message'
import {
  getRequests,
  deleteRequest
} from '../../../redux/actions/requestAction'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import { getDate } from '../../../util/getDate'

export default function RequestList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const { requests, loading } = useSelector((state) => state.requestList)
  const deke = useSelector((state) => state.requestDelete)

  console.log(requests)

  useEffect(() => {
    if (userDetail.user_type === 'AdminUser') {
      dispatch(getRequests())
    } else {
      history.push('/')
    }
  }, [dispatch, userDetail, history])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ? ')) {
      dispatch(deleteRequest(id))
      toast.info('User successfuly removed', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  return (
    <>
      <div className="container " style={{ padding: '60px 0' }}>
        <div className="title pb-3">Requests</div>
        <div className="py-2 sub-title">
          <Link to="/admin-request-payment">
            {' '}
            <i class="fas fa-file-invoice-dollar"></i> Add Request
          </Link>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>

              <th>Request Name</th>
              <th>Price</th>
              <th>Requested User</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests
              ? requests.map((req) => (
                  <tr key={req._id}>
                    <td>{requests.indexOf(req) + 1}</td>
                    <td>{req.name}</td>
                    <td>{req.amount}</td>
                    <td>{req.requestedUser.email}</td>
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
                            <Link to={`/admin-request-edit/${req._id}`}>
                              <i className="fas fa-edit text-danger"></i>
                            </Link>
                          </Col>
                        </Row>
                      </Container>
                    </td>
                  </tr>
                ))
              : <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
              No Request Found!
            </p>}
          </tbody>
        </Table>
      </div>
      {<ToastContainer />}
    </>
  )
}
