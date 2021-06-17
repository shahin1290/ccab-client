import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDayList } from '../../redux/actions/dayAction'
import { getDayDetails } from '../../redux/actions/dayAction'
import { Card, Tabs, Tab, Accordion } from 'react-bootstrap'
import Loader from './Loader'
import { getMyTaskList, getTaskList } from '../../redux/actions/taskAction'
import { getMyQuizList, getQuizList } from '../../redux/actions/quizAction'
import { getMyQuizAnswerList } from '../../redux/actions/quizAnswerAction'
import { getWeekList } from '../../redux/actions/weekAction'
import { getOrderList } from '../../redux/actions/orderAction'

export default function DayContent({ bootcampId, setOpen }) {
  const dispatch = useDispatch()
  const { userDetail } = useSelector((state) => state.userLogin)
  const [show, setShow] = useState('')

  /****************redux store***************** */

  //weekList
  const { weekList, loading, error } = useSelector((state) => state.weekList)
  const {
    orderList,
    loading: orderLoading,
    error: orderError
  } = useSelector((state) => state.orderList)

  //use effect
  useEffect(() => {
    dispatch(getOrderList())
    dispatch(getWeekList(bootcampId))
  }, [dispatch, bootcampId])

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
  const filterWeeklyTask = (dayId) => {
    if (
      userDetail.name &&
      (userDetail.user_type === 'AdminUser' ||
        userDetail.user_type === 'MentorUser')
    ) {
      return tasks.length && tasks.filter((task) => task.day === dayId)
    }

    if (userDetail.name && userDetail.user_type === 'StudentUser') {
      return myTasks.length && myTasks.filter((task) => task.day === dayId)
    }
  }

  //show days based on user and subscription

  const daysBasedOnUser = (days) => {
    if (
      userDetail.user_type === 'AdminUser' ||
      userDetail.user_type === 'MentorUser'
    ) {
      return days.filter((day) => day.show)
    }

    if (userDetail.user_type === 'StudentUser' && orderList.length) {
      const foundOrder = orderList.find(
        (order) =>
          (order.orderStatus === 'Delivered' && order.course === 'basic') ||
          (order.orderStatus === 'Delivered' && order.course === 'standard') ||
          (order.orderStatus === 'Delivered' && order.course === 'premium')
      )

      if (foundOrder.course === 'basic') {
        console.log('b')
        const daysBasedOnShow = days.filter((day) => day.show)
        const size = 2
        return daysBasedOnShow.slice(0, size)
      } else if (foundOrder.course === 'standard') {
        console.log('s')

        const daysBasedOnShow = days.filter((day) => day.show)
        const size = 4
        return daysBasedOnShow.slice(0, size)
      } else {
        console.log('a')
        const daysBasedOnShow = days.filter((day) => day.show)
        const size = 5
        return daysBasedOnShow.slice(0, size)
      }
    } else return []
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
  }, [dispatch, userDetail, bootcampId])

  return (
    <div
      style={{ height: '80vh', overflowY: 'scroll' }}
      className="accordion-box style-two"
    >
      {loading ? (
        <Loader />
      ) : (
        weekList.length &&
        weekList.map((week, index) => (
          <div key={week._id} className="accordion block">
            <div
              as={Card.Header}
              eventKey={`${index}`}
              className="acc-btn  bg-warning text-dark"
            >
              {week.name}
            </div>
            <div eventKey={`${index}`}>
              {daysBasedOnUser(week.days).length &&
                daysBasedOnUser(week.days).map((day, index) => (
                  <div className="course-content">
                    <button
                      onClick={() => {
                        setShow(day._id)
                        dispatch(getDayDetails(week._id, day._id))
                        setOpen && setOpen(false)
                      }}
                      className="lightbox-image play-icon m-2"
                    >
                      <span
                        className="fa fa-play"
                        style={{ paddingTop: '10px' }}
                      ></span>

                      <Link
                        to={`/course-content/${bootcampId}`}
                        style={{
                          backgroundColor: show === day._id ? '#ffbfbe' : '',
                          padding: '2px'
                        }}
                      >
                        <span className="sub-text pt-5">{day.name}</span>
                      </Link>
                    </button>

                    {filterWeeklyQuiz(day._id).length > 0 &&
                      filterWeeklyQuiz(day._id).map((quiz) => (
                        <div className="pb-3 pt-3">
                          <span className="mr-3 ml-4 pl-1">
                            <img width="30" src="/images/resource/quiz.png" />
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
                              <span className="sub-text">
                                Quiz: {quiz.name}
                              </span>
                            </Link>
                          )}

                          {userDetail.user_type !== 'StudentUser' && (
                            <Link
                              to={`/mentor-show-quiz/${quiz.bootcamp}/${quiz.day}/${quiz._id}`}
                            >
                              <span className="sub-text">
                                Quiz: {quiz.name}
                              </span>
                            </Link>
                          )}
                        </div>
                      ))}

                    {filterWeeklyTask(day._id).length > 0 &&
                      filterWeeklyTask(day._id).map((task) => (
                        <div className="pb-3">
                          <span className="mr-3 ml-4 pl-1">
                            <img
                              width="30"
                              src="/images/resource/assignment.png"
                            />
                          </span>

                          <Link
                            to={
                              userDetail.user_type === 'StudentUser'
                                ? `/assignment-details/${task.bootcamp._id}/${task._id}`
                                : `/task-details/${task.bootcamp}/${task._id}`
                            }
                          >
                            <span className="sub-text">
                              Task: {task.projectName}
                            </span>
                          </Link>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
