import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Table,
  Row,
  Col,
  Modal,
  Button,
  From,
  Form
} from 'react-bootstrap'
import Message from '../../layout/Message'
import { getRequests } from '../../../redux/actions/requestAction'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import { getDate } from '../../../util/getDate'

export default function RequestList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const { loading, error, requests } = useSelector((state) => state.requestList)

  useEffect(() => {
    if (
      userDetail.user_type === 'AdminUser' ||
      userDetail.user_type === 'AdminUser'
    ) {
      dispatch(getRequests())
    } else {
      history.push('/')
    }
  }, [dispatch, userDetail, history])

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure ? ")) {
  //     dispatch(deleteUser(id));
  //     toast.info("User successfuly removed", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   }
  // };
  /**
   * Notification
   */
  const notify = () => {
    toast.info('User successfuly removed', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  // modal

  const [show, setShow] = useState(false)
  const [userClickDelete, setUserClickDelete] = useState('')

  const [updatedUser, setupdatedUser] = useState({})
  const [showEditUser, setShowEditUser] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCloseEditUser = () => setShowEditUser(false)
  const handleShowEditUser = () => setShowEditUser(true)
  const _handleUpdateUserROle = () => {
    //console.log(updatedUser);
    let role = { role: updatedUser.user_type }
    toast.info(updatedUser.name + ' successfuly Updated', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
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
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
                      <td>{req.user_type}</td>

                      <td>
                        <Container>
                          <Row>
                            <Col style={{ padding: '0px' }}>
                              {/*  <a>
                                <i
                                  className="fas fa-trash-restore text-danger"
                                  onClick={() => {
                                    setUserClickDelete(user)
                                    handleShow()
                                  }}
                                ></i>
                              </a> */}

                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Deleting User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ color: 'red' }}>
                                  Are you sure to delete {userClickDelete.name}{' '}
                                  ?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      handleClose()
                                    }}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => {
                                      toast.info(
                                        userClickDelete.name +
                                          ' successfuly removed',
                                        {
                                          position: toast.POSITION.BOTTOM_RIGHT
                                        }
                                      )

                                      setShow(false)
                                    }}
                                  >
                                    Ok
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Col>

                            <Col style={{ padding: '0px' }}>
                              {/*   <a>
                                <i
                                  className="fas fa-edit text-danger"
                                  onClick={() => {
                                    setupdatedUser(user)
                                    handleShowEditUser()
                                  }}
                                ></i>
                              </a> */}

                              <Modal
                                show={showEditUser}
                                onHide={handleCloseEditUser}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Update User Role</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  {/* {updateUserRoleErr && (
                                    <p className="text-danger p-2">
                                      {updateUserRoleErr}
                                    </p>
                                  )} */}
                                  Choose the new role for:{' '}
                                  <i>{updatedUser.name}</i> ?
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value="StudentUser"
                                      name="userRole"
                                      id="StudentUser"
                                      defaultChecked
                                      onChange={(e) => {
                                        setupdatedUser({
                                          ...updatedUser,
                                          user_type: e.target.value
                                        })
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      for="StudentUser"
                                    >
                                      Student
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value="MentorUser"
                                      name="userRole"
                                      id="MentorUser"
                                      onChange={(e) => {
                                        setupdatedUser({
                                          ...updatedUser,
                                          user_type: e.target.value
                                        })
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="MentorUser"
                                    >
                                      Mentor
                                    </label>
                                  </div>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      handleCloseEditUser()
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="success"
                                    onClick={_handleUpdateUserROle}
                                  >
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Col>
                          </Row>
                        </Container>
                      </td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </Table>
        )}
        {<ToastContainer />}
      </div>
    </>
  )
}
