import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from './Message'
import { getDayList } from '../../redux/actions/dayAction'
import { getDayDetails, updateDay } from '../../redux/actions/dayAction'
import { Card, Button } from 'react-bootstrap'
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

  //day update
  const {
    loading: updateLoading,
    error: updateError,
    success: UpdateSuccess
  } = useSelector((state) => state.dayUpdate)

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
  }, [dispatch, userDetail, weekId, bootcampId, UpdateSuccess])

    //handle delete  section (for mentor)
    const deleteSection = (day, sectionName) => {
      const updateSection =
        day &&
        day.sections.filter((sec) => sec.name !== sectionName)

      const dayData = {
        name: day.name,
        video_path: day.video_path,
        sections: updateSection,
        action: 'delete'
      }
      dispatch(updateDay(weekId, day._id, dayData))
    }
  

  return (
    <>
      <Card.Body>
        {dayList.length > 0 ? (
          dayList.map((day, index) => (
            <div>
              <div className="d-flex bg-warning text-white mt-3 p-2">
                <span className="sub-title text-white">Day {index + 1}</span>
                {userDetail.user_type !== 'StudentUser' && (
                  <span>
                    <Link to={`/mentor-add-quiz/${bootcampId}/${day._id}`}>
                      <i class="fas fa-plus-square text-white pl-5">Quiz</i>
                    </Link>
                    <Link
                      to={`/mentor-upload-assignment/${bootcampId}/${day._id}`}
                    >
                      <i class="fas fa-file-upload text-white pl-5">
                        Assignment
                      </i>
                    </Link>
                  </span>
                )}
              </div>
              <div className="ml-4">
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
                    <span className="">{day.name}</span>
                    <Link
                            to={`/mentor-course-update/${weekId}/${day._id}`}
                            className="pl-3"
                          >
                            <i class="fas fa-edit"></i>
                          </Link>
                  </Link>
                </button>
                <div className="sub-title ml-5">
                  Sections{' '}
                  <Link to={`/add-course-section/${weekId}/${day._id}`}>
                    <i className="fas fa-plus-square pl-5">Add Section</i>
                  </Link>
                </div>
                {day.name && day.sections.length ? (
                  day.sections.map((section, index) => (
                    <div className="sub-text ml-5 pl-5">
                      section {index + 1}: {section.name}
                      {userDetail.user_type !== 'StudentUser' && (
                        <span className="ml-3">
                          <Link
                            to={`/mentor-section-edit/${weekId}/${day._id}`}
                            onClick={() =>
                              localStorage.setItem(
                                'section',
                                JSON.stringify(section.name)
                              )
                            }
                            className="pl-3"
                          >
                            <i class="fas fa-edit"></i>
                          </Link>
                          <a
                             onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you wish to delete this item?'
                                )
                              )
                                deleteSection(day, section.name)
                            }}
                            className="pl-3"
                          >
                            <i class="fas fa-trash-alt text-danger"></i>
                          </a>
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="ml-5 p-3">No Section is added</div>
                )}

                {filterWeeklyQuiz(day._id).length > 0 &&
                  filterWeeklyQuiz(day._id).map((quiz) => (
                    <div className="pt-3">
                      <span className="mr-3">
                        <img width="3%" src="/images/resource/quiz.png" />
                      </span>

                      {userDetail.user_type !== 'StudentUser' && (
                        <Link
                          to={`/mentor-show-quiz/${quiz.bootcamp}/${quiz.day}/${quiz._id}`}
                        >
                          <span className="sub-text">Quiz: {quiz.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}

                {filterWeeklyTask(day._id).length > 0 &&
                  filterWeeklyTask(day._id).map((task) => (
                    <div className="pt-3">
                      <span className="mr-3">
                        <img width="3%" src="/images/resource/assignment.png" />
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
            </div>
          ))
        ) : (
          <Message>This week is not updated yet</Message>
        )}
      </Card.Body>
    </>
  )
}
