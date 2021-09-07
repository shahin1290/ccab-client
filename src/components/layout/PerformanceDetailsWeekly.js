import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from './Message'
import { Link, useHistory } from 'react-router-dom'
import Loader from './Loader'
import { getDailyActivities } from '../../redux/actions/dailyActivityAction'

export default function PerformanceDetailsDaily({ bootcampId }) {
  const dispatch = useDispatch()
  const history = useHistory()

  //Get Student's Bootcamps
  const { userDetail } = useSelector((state) => state.userLogin)

  const { dailyActivities, loading, error } = useSelector(
    (state) => state.dailyActivityList
  )

  // getting myAnswerList

  const quizAnswerMyList = useSelector((state) => state.quizAnswerMyList)
  const {
    myQuizAnswers,
    loading: quizAnswerListLoading,
    error: quizAnswerListError,
    success: quizAnswerListSuccess
  } = quizAnswerMyList

  // getting myAnswerList

  const answerMyList = useSelector((state) => state.answerMyList)
  const {
    myanswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess
  } = answerMyList

  /* functions */

  function getWeekDates() {
    let now = new Date()
    let dayOfWeek = now.getDay() //0-6
    let numDay = now.getDate()

    let start = new Date(now) //copy
    start.setDate(numDay - dayOfWeek)
    start.setHours(0, 0, 0, 0)

    let end = new Date(now) //copy
    end.setDate(numDay + (7 - dayOfWeek))
    end.setHours(0, 0, 0, 0)

    return [start, end]
  }

  const filterWeeklyVideos = () => {
    if (dailyActivities.length > 0) {
      let [start, end] = getWeekDates()
      return dailyActivities.filter(
        (d) =>
          new Date(d.startDate).setHours(0, 0, 0, 0) > +start &&
          new Date(d.startDate).setHours(0, 0, 0, 0) <= +end
      )
    }
  }

  const filterWeeklyQuizAnswer = () => {
    if (myQuizAnswers.length > 0) {
      let [start, end] = getWeekDates()
      return myQuizAnswers.filter(
        (d) =>
          new Date(d.createdAt).setHours(0, 0, 0, 0) > +start &&
          new Date(d.createdAt).setHours(0, 0, 0, 0) <= +end
      )
    }
  }

  const filterWeeklyAnswer = () => {
    if (myanswers.length > 0) {
      let [start, end] = getWeekDates()
      return myanswers.filter(
        (d) =>
          new Date(d.createdAt).setHours(0, 0, 0, 0) > +start &&
          new Date(d.createdAt).setHours(0, 0, 0, 0) <= +end
      )
    }
  }

  useEffect(() => {
    dispatch(getDailyActivities(bootcampId))
  }, [dispatch])

  const secondsToHms = (num) => {
    const d = Number(num)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.floor((d % 3600) % 60)

    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
    const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
    return hDisplay + mDisplay + sDisplay
  }

  const diff_minutes = (dt2, dt1) => {
    console.log(dt2, dt1)
    const diff = (dt2.getTime() - dt1.getTime()) / 1000

    if (diff <= 0) {
      return '-'
    } else return secondsToHms(diff)
  }

  return (
    <>
      <div className="pb-5 mt-5 mb-5">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sub-title2 mb-4">
            <div className="clearfix">
              <div className="pull-left">
                <div>Watched Videos This Week:</div>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="sub-text">
                    <th>Title</th>
                    <th>Week No.</th>
                    <th>Video duration</th>
                    <th>Finished in</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message>{error}</Message>
                  ) : filterWeeklyVideos().length > 0 ? (
                    filterWeeklyVideos().map((video) => (
                      <tr className="sub-text">
                        <td>{video.lecture.name}</td>
                        <td>{video.week.name}</td>
                        <td>{secondsToHms(video.duration)}</td>
                        <td>
                          {diff_minutes(
                            new Date(video.endDate),
                            new Date(video.startDate)
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p className="pl-4 py-2 mt-4 text-dark bg-light ">
                      no video is watched yet
                    </p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="auto-container">
          {/* Sec Title */}
          <div className="sub-title2 mb-4 mt-5">
            <div className="clearfix">
              <div className="pull-left">
                <div> Finished Task and Quizzes This Week:</div>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="table-responsive">
              <table className="table ">
                <thead>
                  <tr className="sub-text">
                    <th>Title</th>
                    <th>Time Alloted</th>
                    <th>Finished in</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {filterWeeklyQuizAnswer().length > 0 ? (
                    filterWeeklyQuizAnswer().map((quiz) => (
                      <tr className="sub-text">
                        <td>Quiz: {quiz.quiz.name}</td>
                        <td>{quiz.quiz.time} minutes</td>
                        <td>{quiz.quizTime}</td>
                        <td>{quiz.status}</td>
                      </tr>
                    ))
                  ) : (
                    <p className="pl-4 py-2 mt-4 text-dark bg-light ">
                      no quiz answer is submitted
                    </p>
                  )}
                  {filterWeeklyAnswer().length > 0 ? (
                    filterWeeklyAnswer().map((task) => (
                      <tr className="sub-text">
                        <td>Task: {task.task.projectName}</td>
                        <td>week1</td>
                        <td>{task.status}</td>
                        <td>
                          {diff_minutes(
                            new Date(task.createdAt),
                            new Date(task.downloadedAt)
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p className="pl-4 py-2 mt-4 text-dark bg-light ">
                      no task answer is submitted
                    </p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
