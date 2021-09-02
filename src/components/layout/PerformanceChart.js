import React, { useEffect, useState } from 'react'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getPerformances } from '../../redux/actions/performanceAction'
import { todayPerformance } from '../../util/performances'
import Rodal from 'rodal'
// include styles
import 'rodal/lib/rodal.css'
import PerformanceRating from './PerformanceRating'
import PerformanceDetailsWeekly from './PerformanceDetailsWeekly'

const PerformanceChart = ({ courses, student }) => {
  const dispatch = useDispatch()
  const [showPerformanceModal, setShowPerformanceModal] = useState('')
  const [performanceTypes, setPerformanceTypes] = useState('general')

  const [selectedDate, setSelectedDate] = useState('today')
  const [course, setCourse] = useState(courses[0]._id)
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

  useEffect(() => {
    if (userDetail.user_type === 'StudentUser') {
      dispatch(getPerformances(course, userDetail._id))
    }

    if (userDetail.user_type === 'AdminUser') {
      dispatch(getPerformances(course, student))
    }
  }, [course, dispatch, student])

  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <div className="title pb-3">Performance Ratio</div>

        <Button
          variant="info"
          onClick={() => {
            setShowPerformanceModal({ visible: true })
          }}
        >
          Top 10 Rating
        </Button>
      </div>

      <ButtonGroup aria-label="Basic example">
        <Button
          variant={performanceTypes === 'general' ? 'warning' : 'secondary'}
          className="mr-2 mb-3"
          onClick={() => setPerformanceTypes('general')}
        >
          General
        </Button>
        <Button
          variant={performanceTypes === 'details' ? 'warning' : 'secondary'}
          className="mr-2 mb-3"
          onClick={() => setPerformanceTypes('details')}
        >
          Details
        </Button>
      </ButtonGroup>

      {performanceTypes === 'details' && <PerformanceDetailsWeekly />}

      <div className="py-2 sub-title mb-5">
        <Rodal
          animation="flip"
          visible={showPerformanceModal.visible}
          onClose={() => setShowPerformanceModal({ visible: false })}
          width={900}
        >
          <PerformanceRating bootcampId={course} />
        </Rodal>
      </div>

      <div className="d-flex mb-4 sub-title">
        <select onChange={(e) => setCourse(e.target.value)}>
          {courses.map((course) => (
            <option value={course._id}>{course.name}</option>
          ))}
        </select>
        <a onClick={() => dispatch(getPerformances(course, userDetail._id))}>
          <i className="fas fa-sync-alt ml-5"></i>
        </a>
      </div>

      <div className="d-flex justify-content-between">
        <div className="mb-1">
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
          Today Performance Ratio{' '}
          <div>{todayPerformance(performances && performances)} %</div>
        </Col>
      </Row>
      <div className="p-5">
        <DoughnutChart performances={filterPerformances()} />
      </div>
    </div>
  )
}

export default PerformanceChart
