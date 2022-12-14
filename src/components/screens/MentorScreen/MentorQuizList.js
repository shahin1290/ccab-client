import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import download from 'downloadjs'
import { Table, Col, Row, Modal, Button } from 'react-bootstrap'
import Message from '../../layout/Message'
import { ToastContainer, toast } from 'react-toastify'
import { getQuizList, quizDelete } from '../../../redux/actions/quizAction'

import { useHistory, Link } from 'react-router-dom'
import Loader from '../../layout/Loader'
import { getCourseDetails } from '../../../redux/actions/courseAction'

export default function QuizListScreen({ match }) {
  const dispatch = useDispatch()
  const history = useHistory()

  // user must be logged in before!!!
  const { userDetail } = useSelector((state) => state.userLogin)
  const { quizzes, loading, error } = useSelector((state) => state.quizList)

  // Delete transaction
  // Delete transaction

  const deleteTransaction = useSelector((state) => state.quizDelete)
  const { successDelete, error: delError } = deleteTransaction

  //check if bootcamp or mediacenter
  const { course } = useSelector((state) => state.courseDetails)

  useEffect(() => {
    dispatch(getCourseDetails(match.params.bootcampId))
  }, [dispatch, match.params.bootcampId])

  useEffect(() => {
    if (!userDetail) {
      history.push('/')
    } else if (successDelete) {
      dispatch(getQuizList(match.params.bootcampId))
    } else {
      dispatch(getQuizList(match.params.bootcampId))
    }
  }, [dispatch, userDetail, history, successDelete, match])

  const deleteHandler = (dayId, id) => {
    dispatch(quizDelete(match.params.bootcampId, dayId, id))
    toast.info('Quiz has been deleted', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [clickTaskDelete, setClickTaskDelete] = useState('')

  if (!quizzes > 0) {
    return null
  }

  return (
    <div style={{ margin: '50px 0' }}>
      <div className="title mb-5">Quizzes</div>

      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Nr</th>
            <th>Assignment Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>

            {/* <th>graduated</th> */}
            {/* <th>status</th> */}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : quizzes.length > 0 ? (
            quizzes
              .map((quiz) => (
                <tr key={quiz._id}>
                  <td>{quizzes.indexOf(quiz) + 1}</td>
                  <td>
                    {course.name ? (
                      <Link
                        className="text-info"
                        to={`/quiz-details/${quiz.bootcamp}/${quiz.day}/${quiz._id}`}
                      >
                        {quiz.name}
                      </Link>
                    ) : (
                      quiz.name
                    )}
                  </td>
                  <td>{quiz.description.substring(0, 20)}</td>
                  <td>
                    {quiz.createdAt.split('T')[0] +
                      ' : ' +
                      quiz.createdAt.split('T')[1].split('.')[0]}
                  </td>

                  {delError && <Message>{delError}</Message>}
                  <td>
                    <Link
                      style={{ paddingRight: '15px' }}
                      to={`/mentor-show-quiz/${quiz.bootcamp}/${quiz.day}/${quiz._id}`}
                    >
                      <i className="fas fa-edit"></i>
                    </Link>

                    <i
                      className="fas fa-trash-restore"
                      onClick={() => {
                        setClickTaskDelete(quiz)
                        handleShow()
                      }}
                    ></i>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Deleting Task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: 'red' }}>
                        Are you sure to delete {clickTaskDelete.projectName} ?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteHandler(
                              clickTaskDelete.day,
                              clickTaskDelete._id
                            )

                            setShow(false)
                          }}
                        >
                          Ok
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))
              .reverse()
          ) : null}
        </tbody>
      </Table>
      <ToastContainer />
    </div>
  )
}

//  <td>{task.description.substring(1, 5)}</td>;
