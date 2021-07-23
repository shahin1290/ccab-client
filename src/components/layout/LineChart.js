import React from 'react'
import { Bar, Line } from 'react-chartjs-2'

const LineChart = ({ performances, chart }) => {
  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric'
  })

  const data = {
    labels:
      performances &&
      performances.map((performance) =>
        longEnUSFormatter.format(new Date(performance.createdAt))
      ),
    datasets: [
      {
        label: 'study performance',
        data:
          performances &&
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
          }),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)'
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  return (
    <div>
      {chart === 'line' ? (
        <Line data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  )
}

export default LineChart
