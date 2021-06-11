import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuizDetails, updateQuiz } from '../../redux/actions/quizAction'
import {
  createQuizAnswer,
  getMyQuizAnswerList
} from '../../redux/actions/quizAnswerAction'
import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import CountDown from '../layout/CountDown'

export default function QuizScreen({ match, location }) {
  const { bootcampId, dayId, id } = match.params
  const history = useHistory()
  const dispatch = useDispatch()
  const [inputFields, setInputFields] = useState([])
  const { userDetail } = useSelector((state) => state.userLogin)
  const [show, setShow] = useState(
    userDetail.name && userDetail.user_type === 'StudentUser' ? false : true
  )

  // getting myAnswerList
  const quizAnswerMyList = useSelector((state) => state.quizAnswerMyList)
  const {
    myQuizAnswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess
  } = quizAnswerMyList

  const quizStatus = (quizId) => {
    if (myQuizAnswers.length) {
      const foundAnswer = myQuizAnswers.find((ans) => ans.quiz === quizId)
      return foundAnswer
    }
  }

  useEffect(() => {
    quizStatus(id) &&
      quizStatus(id).status !== 'Not Sent' &&
      history.push('/profile')
  }, [answerListSuccess])

  const handleChangeInput = (question, e) => {
    const answer = {
      question,
      answer: e.target.value
    }

    let answers

    if (inputFields.some((i) => i.question === question)) {
      answers = [...inputFields.filter((i) => i.question !== question), answer]
    } else {
      answers = [...inputFields, answer]
    }
    setInputFields(answers)
  }

  const { quiz, loading, error } = useSelector((state) => state.quizDetails)

  const {
    answer,
    loading: quizAnswerLoading,
    error: quizAnswerError
  } = useSelector((state) => state.answerCreate)

  const { error: updateError, success: updateSuccess } = useSelector(
    (state) => state.quizUpdate
  )

  useEffect(() => {
    dispatch(getMyQuizAnswerList())
    dispatch(getQuizDetails(bootcampId, dayId, id))
    if (answer && answer.success) {
      history.push('/profile')
    }
  }, [dispatch, bootcampId, dayId, id, answer, history, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createQuizAnswer(inputFields, bootcampId, id))
    localStorage.removeItem('timestamp')
  }

  //handle delete quiz question (for mentor)

  const deleteQuizQuestion = (questionToDelete) => {
    const updateQuizQuestion =
      quiz &&
      quiz.question.filter((q) => q.content !== questionToDelete.content)

    const quizData = {
      name: quiz.name,
      description: quiz.description,
      time: quiz.time,
      question: updateQuizQuestion
    }
    dispatch(updateQuiz(bootcampId, dayId, id, quizData))
  }

  return (
    <div className="auto-container">
      {/* Test View Section */}
      <div className="p-5 m-3">
        {/* Sec Title */}
        <div className="sec-title">
          <div className="title pb-2">Quiz Name: {quiz.name}</div>
        </div>
        <div className="inner-container">
          {/* Upper Box */}
          <div className="upper-box">
            {/* Question Box */}
            <div className="question-box">
              <div className="row clearfix">
                {/* Column */}
                <div className="column col-lg-6 col-md-6 col-sm-12">
                  <div className="sub-title">Questions</div>
                  <div className="sub-text">
                    {quiz.question && quiz.question.length}{' '}
                    <span>Questions</span>
                  </div>
                  {userDetail.name && userDetail.user_type !== 'StudentUser' && (
                    <Link
                      className="theme-btn btn-style-eight"
                      to={{
                        pathname: `/mentor-add-quiz/${bootcampId}/${dayId}/${id}`
                      }}
                    >
                      <span className="txt">Add Questions</span>
                    </Link>
                  )}
                </div>

                {/* Column */}
                <div className="column col-lg-3 col-md-6 col-sm-12">
                  <div className="sub-title">Time</div>
                  <div className="sub-text">
                    <span>{quiz.time} Minutes </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Lower Box */}

          <div className={show ? 'd-none' : 'd-block'}>
            <div className="sub-title pt-5 pb-3"> Instructions</div>
            <ul className="list-group ">
            <li className="list-group-item">
              <i class="fas fa-crosshairs"></i> Only one attempt to finish the quiz{' '}
              </li>
              <li className="list-group-item">
              <i class="fas fa-stopwatch"></i> Complete the quiz with allotted times
              </li>
              <li className="list-group-item">
              <i class="fas fa-dice-one"></i> Only one choice for each question{' '}
              </li>
            </ul>
          </div>

          <div className="lower-box" style={{ marginTop: '50px' }}>
            {/* Quiz Form */}
            {show ? (
              <div className="quiz-form">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontSize: '20px'
                  }}
                >
                  {userDetail.name &&
                    userDetail.user_type === 'StudentUser' && <CountDown />}
                </div>

                <form onSubmit={submitHandler}>
                  {quiz.question &&
                    quiz.question.map((q, index) => {
                      return (
                        <Card className="form-group">
                          <Card.Body>
                            <Card.Title>{q.content}</Card.Title>

                            {q.answers.map((a, i) => (
                              <Card.Text key={a._id}>
                                <input
                                  type="radio"
                                  name={`Q - ${index}`}
                                  value={a.content}
                                  onChange={(e) => {
                                    handleChangeInput(q.content, e)
                                  }}
                                />
                                <label style={{ marginLeft: '10px' }}>
                                  {a.content}{' '}
                                </label>
                              </Card.Text>
                            ))}
                          </Card.Body>

                          {userDetail.name &&
                            userDetail.user_type !== 'StudentUser' && (
                              <span>
                                <Link
                                  to={{
                                    pathname: `/edit-quiz/${bootcampId}/${dayId}/${id}`
                                  }}
                                  onClick={() =>
                                    localStorage.setItem(
                                      'quiz',
                                      JSON.stringify(q)
                                    )
                                  }
                                  style={{ padding: '0 20px' }}
                                >
                                  <i className="fas fa-edit">edit</i>
                                </Link>
                                <Link
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        'Are you sure you wish to delete this item?'
                                      )
                                    )
                                      deleteQuizQuestion(q)
                                  }}
                                >
                                  <i className="fas fa-trash">Delete</i>
                                </Link>
                              </span>
                            )}
                        </Card>
                      )
                    })}
                  {userDetail.name && userDetail.user_type === 'StudentUser' && (
                    <div className="form-group text-right">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        name="submit-form"
                        id="quiz"
                      >
                        <span className="txt">Submit Test</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div className="button-box">
                <button
                  type="text"
                  className="theme-btn btn-style-one"
                  style={{ zIndex: '0' }}
                  onClick={() => {
                    setShow(true)
                    if (!localStorage.getItem('timestamp')) {
                      JSON.stringify(
                        localStorage.setItem(
                          'timestamp',
                          new Date().getTime() + quiz.time * 60000
                        )
                      )
                    }
                  }}
                >
                  <span className="txt">Start Quiz</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End Test View Section */}
    </div>
  )
}
