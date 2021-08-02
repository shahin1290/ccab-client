export const todayPerformance = (performances) => {
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

export const averagePerformance = (performances) => {
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