import React, { useEffect, useState } from 'react'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getPerformances } from '../../redux/actions/performanceAction'

const PerformanceChart = () => {
  const dispatch = useDispatch()

  const [selectedDate, setSelectedDate] = useState('today')

  const [chart, setChart] = useState('line')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userDetail, error, loginSuccess } = userLogin

  const { loading: performanceLoading, performances } = useSelector(
    (state) => state.performanceList
  )

  /* 
  const filterMonthlyPerformance = new Array(12).fill(0).map((el, index) => {
    return performances &&
      performances.filter((performance) => {
        return new Date(performance.createdAt).getMonth() === index
      })
  })

  console.log(filterMonthlyPerformance);
 */

  const filterPerformances = () => {
    if (selectedDate === 'today') {
      return (
        performances &&
        performances.filter(
          (performance) =>
            new Date(performance.createdAt).setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0)
        )
      )
    } else if (selectedDate === 'month') {
      return (
        performances &&
        performances.filter((performance) => {
          return (
            new Date(performance.createdAt).getMonth() === new Date().getMonth()
          )
        })
      )
    } else {
      return performances
    }
  }

  const todayPerformance = () => {
    const foundToday =
      performances &&
      performances.length &&
      performances.find(
        (performance) =>
          new Date(performance.createdAt).setHours(0, 0, 0, 0) ===
          new Date().setHours(0, 0, 0, 0)
      )

    if (foundToday) {
      const {
        watchingLectureScore,
        submittedQuizScore,
        quizResultScore,
        submittedTaskScore,
        taskResultScore,
        onlineScore
      } = foundToday
      return Math.trunc(
        (watchingLectureScore +
          submittedQuizScore +
          quizResultScore +
          submittedTaskScore +
          taskResultScore +
          onlineScore) /
          4
      )
    }
  }

  useEffect(() => {
    if (userDetail.user_type === 'StudentUser') {
      dispatch(getPerformances())
    }
  }, [])

  return (
    <div className="">
      <div className="title pb-3">Performance Ratio</div>

      <div className="d-flex justify-content-between">
        <div className="mb-5">
          <a
            onClick={() => setSelectedDate('today')}
            style={
              selectedDate === 'today'
                ? { color: '#ea5573', fontWeight: 'bold' }
                : {}
            }
            className="mr-5"
          >
            Today
          </a>

          <a
            onClick={() => setSelectedDate('month')}
            style={
              selectedDate === 'month'
                ? { color: '#ea5573', fontWeight: 'bold' }
                : {}
            }
            className="mr-5"
          >
            Last Month
          </a>

          <a
            onClick={() => setSelectedDate('all')}
            style={
              selectedDate === 'all'
                ? { color: '#ea5573', fontWeight: 'bold' }
                : {}
            }
          >
            From Start
          </a>
        </div>

        <div>
          <a
            onClick={() => setChart('line')}
            style={
              chart === 'line' ? { color: '#ea5573', fontWeight: 'bold' } : {}
            }
            className="mr-5"
          >
            Line Chart
          </a>

          <a
            onClick={() => setChart('bar')}
            style={
              chart === 'bar' ? { color: '#ea5573', fontWeight: 'bold' } : {}
            }
          >
            Bar Chart
          </a>
        </div>
      </div>
      <Row className="mt-5">
        <Col md={9}>
          {' '}
          <LineChart performances={filterPerformances()} chart={chart} />
        </Col>
        <Col md={3} className="my-auto sub-title text-center">
          Today Performance Ratio <div>{todayPerformance()} %</div>
        </Col>
      </Row>
      <div className="p-5">
        <DoughnutChart performances={filterPerformances()} />
      </div>
    </div>
  )
}

export default PerformanceChart
