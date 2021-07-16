import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'study performance',
        data: [65, 60, 80, 80, 100, 55, 40],
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
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options} width={400}/>
    </div>
  )
}

export default LineChart
