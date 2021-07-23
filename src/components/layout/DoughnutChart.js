import React, { useEffect, useState } from 'react'
import { getPerformances } from '../../redux/actions/performanceAction'
import { Doughnut } from 'react-chartjs-2'
import { Row, Col } from 'react-bootstrap'

const DoughnutChart = ({ performances }) => {
  const todayActivity = () => {
    const allScores =
      performances &&
      performances.length &&
      performances.map((performance) => {
        const {
          watchingLectureScore,
          submittedQuizScore,
          quizResultScore,
          submittedTaskScore,
          taskResultScore,
          onlineScore
        } = performance

        return Math.trunc(
          (watchingLectureScore +
            submittedQuizScore +
            quizResultScore +
            submittedTaskScore +
            taskResultScore +
            onlineScore) /
            4
        )
      })

    const allWatchingLectureScores =
      performances &&
      performances.length &&
      performances.map((performance) => performance.watchingLectureScore)

    const allAnswerActivityScores =
      performances &&
      performances.length &&
      performances.map(
        (performance) =>
          performance.submittedQuizScore + performance.submittedTaskScore
      )

    const allCorrectAnswerScores =
      performances &&
      performances.length &&
      performances.map(
        (performance) =>
          performance.quizResultScore + performance.taskResultScore
      )

    const allOnlineScores =
      performances &&
      performances.length &&
      performances.map((performance) => performance.onlineScore)

    const totalDayRatio =
      allScores &&
      Math.ceil(allScores.reduce((a, b) => a + b) / allScores.length)

    const allWatchingLectureScoresAverage =
      allWatchingLectureScores &&
      Math.ceil(
        allWatchingLectureScores.reduce((a, b) => a + b) /
          allWatchingLectureScores.length
      )

    const allAnswerActivityScoresAverage =
      allAnswerActivityScores &&
      Math.ceil(
        allAnswerActivityScores.reduce((a, b) => a + b) /
          allAnswerActivityScores.length
      )

    const allCorrectAnswerScoresAverage =
      allCorrectAnswerScores &&
      Math.ceil(
        allCorrectAnswerScores.reduce((a, b) => a + b) /
          allCorrectAnswerScores.length
      )

    const allOnlineScoresAverage =
      allOnlineScores &&
      Math.ceil(
        allOnlineScores.reduce((a, b) => a + b) / allOnlineScores.length
      )

    return {
      totalDayRatio,
      allWatchingLectureScoresAverage,
      allAnswerActivityScoresAverage,
      allCorrectAnswerScoresAverage,
      allOnlineScoresAverage
    }

    /*  return [
      (watchingLectureScore * 25) / dayPerformance,
      ((submittedQuizScore + submittedTaskScore) * 25) / dayPerformance,
      ((quizResultScore + taskResultScore) * 25) / dayPerformance,
      (onlineScore * 25) / dayPerformance
    ] */
  }

  const data = {
    labels: [
      'watching lectures',
      'answer activity',
      'correct answer',
      'online'
    ],
    datasets: [
      {
        label: 'Performance criteria',
        data: [
          (100 / todayActivity().totalDayRatio) *
            (todayActivity().allWatchingLectureScoresAverage / 4),
          (100 / todayActivity().totalDayRatio) *
            (todayActivity().allAnswerActivityScoresAverage / 4),
          (100 / todayActivity().totalDayRatio) *
            (todayActivity().allCorrectAnswerScoresAverage / 4),
          (100 / todayActivity().totalDayRatio) *
            (todayActivity().allOnlineScoresAverage / 4)
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(60,179,113)'
        ],
        hoverOffset: 4
      }
    ]
  }

  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric'
  })

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

  const averagePerformance = () => {
    const allPerformances =
      performances &&
      performances.length &&
      performances.map((performance) => {
        const {
          watchingLectureScore,
          submittedQuizScore,
          quizResultScore,
          submittedTaskScore,
          taskResultScore,
          onlineScore
        } = performance
        return Math.trunc(
          (watchingLectureScore +
            submittedQuizScore +
            quizResultScore +
            submittedTaskScore +
            taskResultScore +
            onlineScore) /
            4
        )
      })

    return (
      allPerformances &&
      Math.ceil(
        allPerformances.reduce((a, b) => a + b) / allPerformances.length
      )
    )
  }

  return (
    <Row className="mt-5">
      <Col md={6}>
        <Doughnut data={data} />
      </Col>
      <Col md={6} className="mt-5">
        <div className="title text-center pb-5">
          Today Performance Ratio <div>{todayPerformance()} %</div>
        </div>
        <div className="title text-center">
          Total Performance Ratio <div>{averagePerformance()} %</div>
        </div>
      </Col>
    </Row>
  )
}

export default DoughnutChart
