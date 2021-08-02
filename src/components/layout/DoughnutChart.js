import React, { useEffect, useState } from 'react'
import { averagePerformance } from '../../util/performances'
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

  const dataZero = {
    labels: ['Zero Performance'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [100],
        backgroundColor: ['rgba(201, 203, 207)'],
        hoverOffset: 4
      }
    ]
  }

  return (
    <Row className="mt-5">
      <Col md={7}>
        {averagePerformance(performances && performances) === 0 ? (
          <Doughnut data={dataZero} />
        ) : (
          <Doughnut data={data} />
        )}
      </Col>
      <Col md={5} className="my-auto sub-title text-center">
        Total Performance Ratio{' '}
        <div>{averagePerformance(performances && performances)} %</div>
      </Col>
    </Row>
  )
}

export default DoughnutChart
