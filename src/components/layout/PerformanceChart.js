import React, { useEffect, useState } from 'react'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'
import { Button, ButtonGroup } from 'react-bootstrap'
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
    } else {
      return performances
    }
  }

  useEffect(() => {
    if (userDetail.user_type === 'StudentUser') {
      dispatch(getPerformances())
    }
  }, [])

  const handleClick = (e) => {
    setSelectedDate(e.target.value)
  }

  const handleClick2 = (e) => {
    setChart(e.target.value)
  }

  return (
    <div className="">
      <div className="title pb-3">Performance Ratio</div>

      <div className="d-flex justify-content-between">
        <div>
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
          >
            Last Month
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
      <LineChart performances={filterPerformances()} chart={chart} />
      <DoughnutChart performances={filterPerformances()} />
    </div>
  )
}

export default PerformanceChart
