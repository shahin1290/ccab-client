import React, { useEffect, useState, useRef } from 'react'

import { useHistory } from 'react-router-dom'

const CountDown = () => {
  const history = useHistory()
  const [timerMinutes, setTimerMinutes] = useState()
  const [timerSeconds, setTimerSeconds] = useState()

  useEffect(() => {
    const countDownTime = JSON.parse(localStorage.getItem('timestamp'))

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownTime - now

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(interval.current)
        document.getElementById('quiz').click()
        localStorage.removeItem('timestamp')
        history.push('/profile')
      } else {
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className="text-danger pb-2 font-weight-bold">
      <i className="fas fa-stopwatch">
        {timerMinutes < 10 && '0'}
        {timerMinutes}: {timerSeconds < 10 && '0'}
        {timerSeconds}
      </i>
    </div>
  )
}

export default CountDown
