import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getQuizDetails } from '../../redux/actions/quizAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { getMyQuizAnswerList } from '../../redux/actions/quizAnswerAction'

export default function QuizAnswerScreen({ match, location }) {
  const { bootcampId, weekId, id } = match.params
  const history = useHistory()
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/profile'

  const {
    quiz,
    loading: quizLoading,
    error: quizError,
    success: quizSuccess
  } = useSelector((state) => state.quizDetails)

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
    dispatch(getQuizDetails(bootcampId, weekId, id))

    dispatch(getMyQuizAnswerList())
  }, [dispatch, bootcampId, weekId, id])

  const submitHandler = (e) => {
    e.preventDefault()
    history.push(redirect)
  }

  return (
    <>
      {/* Test View Section */}
      <div className="auto-container p-5 m-3">
        {quizLoading ? (
          <Loader />
        ) : quizError ? (
          <Message variant="danger">{quizError}</Message>
        ) : (
          <div>
            {/* Sec Title */}
            <div className="title pb-5">
              <div>Quiz Name: {quiz.name}</div>
            </div>

            <div className="inner-container">
              {/* Upper Box */}
              <div className="upper-box">
                {/* Question Box */}
                <div className="question-box">
                  <div className="row clearfix ">
                    {/* Column */}
                    <div className="column col-lg-6 col-md-6 col-sm-12">
                      <div className="sub-title">Questions</div>
                      <div className="sub-text">
                        {quiz.question && quiz.question.length}{' '}
                        <span>Questions</span>
                      </div>
                    </div>

                    {/* Column */}
                    <div className="column col-lg-6 col-md-6 col-sm-12">
                      <div className="sub-title">Time</div>
                      <div className="sub-text">{quiz.time} Minutes </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Lower Box */}

              <div className="lower-box" style={{ marginTop: '50px' }}>
                {/* Quiz Form */}

                <div className="quiz-form">
                  <form onSubmit={submitHandler}>
                    {quiz.question &&
                      quiz.question.map((q, index) => {
                        return (
                          <Card className="form-group">
                            {quizStatus(quiz._id) &&
                              quizStatus(quiz._id).status === 'Not Sent' &&
                              history.push('/profile')}
                            <Card.Body>
                              <Card.Title>{q.content}</Card.Title>

                              {q.answers.map((a, i) => (
                                <Card.Text key={a._id}>
                                  {console.log(quizStatus(quiz._id))}
                                  <input
                                    type="radio"
                                    name={`Q - ${index}`}
                                    value={a.content}
                                    checked={
                                      quizStatus(quiz._id) &&
                                      quizStatus(quiz._id).answers.some(
                                        (answer) => answer.answer === a.content
                                      )
                                    }
                                  />
                                  <label style={{ marginLeft: '10px' }}>
                                    {a.content}
                                    <span
                                      style={{
                                        paddingLeft: '10px'
                                      }}
                                    >
                                      {a.correct ? (
                                        <span
                                          style={{
                                            color: '#418838',
                                            fontWeight: '900'
                                          }}
                                        >
                                          (True)
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            color: '#C82433',
                                            fontWeight: '900'
                                          }}
                                        >
                                          (False)
                                        </span>
                                      )}
                                    </span>
                                  </label>
                                </Card.Text>
                              ))}
                            </Card.Body>
                          </Card>
                        )
                      })}

                    <div className="form-group text-right">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        name="submit-form"
                      >
                        <span className="txt">Go Back</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
