import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDayDetails, updateDay } from '../../../redux/actions/dayAction'
import { Container } from 'react-bootstrap'
import { getMyTaskList, getTaskList } from '../../../redux/actions/taskAction'
import { getMyQuizList, getQuizList } from '../../../redux/actions/quizAction'
import { getMyQuizAnswerList } from '../../../redux/actions/quizAnswerAction'
import { getWeekList } from '../../../redux/actions/weekAction'
import Loader from '../../layout/Loader'

export default function UpdateMediaCenterDayContent({ match }) {
  const dispatch = useDispatch()
  const { userDetail } = useSelector((state) => state.userLogin)
  const [show, setShow] = useState('')
  const mediaCenterId = match.params.id
  /****************redux store***************** */

  //weekList
  const { weekList, loading, error } = useSelector((state) => state.weekList)

  //day update
  const {
    loading: updateLoading,
    error: updateError,
    success: UpdateSuccess
  } = useSelector((state) => state.dayUpdate)

  //use effect
  useEffect(() => {
    dispatch(getWeekList(mediaCenterId))
  }, [dispatch, mediaCenterId, UpdateSuccess])

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
      dispatch(getTaskList(mediaCenterId))
      dispatch(getQuizList(mediaCenterId))
    }
  }, [dispatch, userDetail, mediaCenterId])

  //handle delete  section (for mentor)
  const deleteSection = (weekId, day, sectionName) => {
    const updateSection =
      day && day.sections.filter((sec) => sec.name !== sectionName)

    const dayData = {
      name: day.name,
      video_path: day.video_path,
      arabic_video_path: day.arabic_video_path,
      sections: updateSection,
      action: 'delete'
    }
    dispatch(updateDay(weekId, day._id, dayData))
  }

  const toggleDayShow = (weekId, day) => {
    dispatch(
      updateDay(weekId, day._id, {
        name: day.name,
        video_path: day.video_path,
        arabic_video_path: day.arabic_video_path,
        show: !day.show
      })
    )
  }

  return (
    <Container>
      <div className="title mt-5 mb-5">Update Media Center Day Content</div>
      <div
        style={{ height: '80vh', overflowY: 'scroll' }}
        className="accordion-box style-two"
      >
        {weekList.length &&
          weekList.map((week, index) => (
            <div className="accordion block">
              <div className="title bg-light text-dark">{week.name}</div>

              {week.days.map((day, index) => (
                <div>
                  <div className="d-flex bg-warning text-white mt-3 p-2">
                    <span className="sub-title text-white">
                      Day {index + 1}
                    </span>
                    <label className="switch ml-5">
                      <input
                        type="checkbox"
                        checked={day.show}
                        onChange={() => toggleDayShow(week._id, day)}
                      />
                      <span className="slider round"></span>
                    </label>
                    {userDetail.user_type !== 'StudentUser' && (
                      <span>
                        <Link
                          to={`/mentor-add-quiz/${mediaCenterId}/${day._id}`}
                          className="sub-title "
                        >
                          <i classNa="fas fa-plus-square text-white pl-5 ">
                            Quiz
                          </i>
                        </Link>
                        <Link
                          to={`/mentor-upload-assignment/${mediaCenterId}/${day._id}`}
                          className="sub-title "
                        >
                          <i classNa="fas fa-file-upload text-white pl-5">
                            Assignment
                          </i>
                        </Link>
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="lightbox-image play-icon mt-3 mb-3">
                      <span
                        className="fa fa-play"
                        style={{ paddingTop: '10px' }}
                      ></span>

                      <span>
                        <span className="">{day.name}</span>
                        <Link
                          to={`/edit-media-center-day/${week._id}/${day._id}`}
                          className="pl-5"
                        >
                          <i classNa="fas fa-edit"></i>
                        </Link>
                      </span>
                    </div>
                    <div className="sub-title ml-5">
                      Sections{' '}
                      <Link to={`/add-course-section/${week._id}/${day._id}`}>
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
                                to={`/mentor-section-edit/${week._id}/${day._id}`}
                                onClick={() =>
                                  localStorage.setItem(
                                    'section',
                                    JSON.stringify(section.name)
                                  )
                                }
                                className="pl-3"
                              >
                                <i classNa="fas fa-edit"></i>
                              </Link>
                              <a
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      'Are you sure you wish to delete this item?'
                                    )
                                  )
                                    deleteSection(week._id, day, section.name)
                                }}
                                className="pl-3"
                              >
                                <i classNa="fas fa-trash-alt text-danger"></i>
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
                            <img width="30" src="/images/resource/quiz.png" />
                          </span>

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
                        <div className="pt-3">
                          <span className="mr-3">
                            <img
                              width="30"
                              src="/images/resource/assignment.png"
                              alt="ccab"
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
                </div>
              ))}
            </div>
          ))}
      </div>
    </Container>
  )
}
