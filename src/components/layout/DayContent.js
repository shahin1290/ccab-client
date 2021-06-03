import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import { getDayList } from '../../redux/actions/dayAction'
import { getDayDetails } from '../../redux/actions/dayAction'
import { Card, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { RiPlayMiniFill } from 'react-icons/ri'
import Loader from './Loader'
import { getMyTaskList, getTaskList } from '../../redux/actions/taskAction'
import { getMyQuizList, getQuizList } from '../../redux/actions/quizAction'
import { getMyQuizAnswerList } from '../../redux/actions/quizAnswerAction'

export default function DayContent({ weekId, bootcampId }) {
  const dispatch = useDispatch()
  const { userDetail } = useSelector((state) => state.userLogin)
  const [show, setShow] = useState('')

  /****************redux store***************** */

  //daylist
  const { dayList, loading, error } = useSelector((state) => state.dayList)

  //get task list for students
  const taskListMy = useSelector((state) => state.taskListMy)
  const { myTasks, loading: myTasksLoading, error: myTasksError } = taskListMy

  //get quiz list list for students
  const {
    myQuizList,
    loading: quizLoading,
    error: quizError
  } = useSelector((state) => state.myQuizList)

  // getting myAnswerList

  const quizAnswerMyList = useSelector((state) => state.quizAnswerMyList)
  const {
    myQuizAnswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess
  } = quizAnswerMyList

  const quizStatus = (quizId) => {
    if (answerListSuccess && myQuizAnswers.length) {
      const foundAnswer = myQuizAnswers.find((ans) => ans.quiz === quizId)
      return foundAnswer
    }
  }

  //get task list for mentor_route
  const { tasks } = useSelector((state) => state.taskList)
  //get task list for mentor_route
  const { quizzes } = useSelector((state) => state.quizList)

  /****************function***************** */

  //filter weekly quizzes
  const filterWeeklyQuiz = (dayId) => {
    if (
      userDetail.name &&
      (userDetail.user_type === 'AdminUser' ||
        userDetail.user_type === 'MentorUser')
    ) {
      return quizzes.length && quizzes.filter((quiz) => quiz.day === dayId)
    }

    if (userDetail.name && userDetail.user_type === 'StudentUser') {
      return (
        myQuizList.length && myQuizList.filter((quiz) => quiz.day === dayId)
      )
    }
  }

  //filter weekly tasks
  const filterWeeklyTask = () => {
    if (
      userDetail.name &&
      (userDetail.user_type === 'AdminUser' ||
        userDetail.user_type === 'MentorUser')
    ) {
      return tasks.length && tasks.filter((task) => task.week === weekId)
    }

    if (userDetail.name && userDetail.user_type === 'StudentUser') {
      return myTasks.length && myTasks.filter((task) => task.week === weekId)
    }
  }

  /****************useEffect***************** */

  useEffect(() => {
    if (userDetail.name && userDetail.user_type === 'StudentUser') {
      dispatch(getMyTaskList())
      dispatch(getMyQuizList())
      dispatch(getMyQuizAnswerList())
    }

    if (
      userDetail.name &&
      (userDetail.user_type === 'AdminUser' ||
        userDetail.user_type === 'MentorUser')
    ) {
      dispatch(getTaskList(bootcampId))
      dispatch(getQuizList(bootcampId))
    }
  }, [dispatch, userDetail, weekId, bootcampId])

  return (
    <>
      <Card.Body>
        {dayList.length > 0 ? (
          dayList.map((day, index) => (
            <div>
              <div className="d-flex mt-3 p-2" style={{backgroundColor: '#F0F5FB'}}>
                <span className="sub-title text-dark">Day {index + 1}</span>
               
              </div>
              <button
                onClick={() => {
                  setShow(day._id)
                  dispatch(getDayDetails(weekId, day._id))
                }}
                className="lightbox-image play-icon m-3"
              >
                <span
                  className="fa fa-play"
                  style={{ paddingTop: '10px' }}
                ></span>

                <Link
                  to={`/course-content/${bootcampId}`}
                  style={{
                    backgroundColor: show === day._id ? '#ffbfbe' : ''
                  }}
                >
                  <span className="sub-text">
                    {day.name}
                   
                  </span>
                </Link>
              </button>

              {filterWeeklyQuiz(day._id).length > 0 &&
                filterWeeklyQuiz(day._id).map((quiz) => (
                  <div className="pb-3">
                    <span className="mr-3">
                      <img width="10%" src="/images/resource/quiz.png" />
                    </span>

                    {userDetail.user_type === 'StudentUser' && (
                      <Link
                        to={
                          quizStatus(quiz._id) &&
                          quizStatus(quiz._id).status === 'Not Sent'
                            ? `/quiz/${quiz.bootcamp._id}/${quiz.day}/${quiz._id}`
                            : `/quiz-answer/${quiz.bootcamp._id}/${quiz.day}/${quiz._id}`
                        }
                      >
                        <span className="sub-text">Quiz: {quiz.name}</span>
                      </Link>
                    )}

                    {userDetail.user_type !== 'StudentUser' && (
                      <Link
                        to={`/mentor-show-quiz/${quiz.bootcamp}/${quiz.day}/${quiz._id}`}
                      >
                        <span className="sub-text">Quiz: {quiz.name}</span>
                      </Link>
                    )}
                  </div>
                ))}

              {filterWeeklyTask().length > 0 &&
                filterWeeklyTask().map((task) => (
                  <div
                    className="lightbox-image play-icon"
                    style={{ padding: ' 0 0 20px 15px' }}
                  >
                    <span
                      className="fa fa-play "
                      style={{ paddingTop: '10px' }}
                    ></span>

                    <Link
                      to={
                        userDetail.user_type === 'StudentUser'
                          ? `/assignment-details/${task.bootcamp._id}/${task._id}`
                          : `/task-details/${task.bootcamp}/${task._id}`
                      }
                    >
                      <span>Task: {task.projectName}</span>
                    </Link>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <Message>This week is not updated yet</Message>
        )}
      </Card.Body>
    </>
  )
}
