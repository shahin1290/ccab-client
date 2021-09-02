import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../layout/Loader'

export default function Assignments() {
  const dispatch = useDispatch()
  const history = useHistory()

  //Get Student's Bootcamps
  const { userDetail } = useSelector((state) => state.userLogin)

  useEffect(() => {}, [dispatch])

  useEffect(() => {}, [dispatch, userDetail])

  return (
    <>
      <div className="pb-5 mt-5 mb-5">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="title mb-4">
            <div className="clearfix">
              <div className="pull-left">
                <div>The Watched Videos This Week:</div>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="table-responsive">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Week No.</th>
                    <th>Video duration</th>
                    <th>Finished in</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>What is web development?</td>
                    <td>Week1</td>
                    <td>19.51</td>
                  </tr>
                  <tr>
                    <td>What is web development?</td>
                    <td>Week1</td>
                    <td>19.51</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="auto-container">
          {/* Sec Title */}
          <div className="title mb-4">
            <div className="clearfix">
              <div className="pull-left">
                <div>The Finished Task and Quizzes This Week:</div>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="table-responsive">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Week No.</th>
                    <th>Video duration</th>
                    <th>Finished in</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Quiz: Md Shahin Patowary</td>
                    <td>Week1</td>
                    <td>Result: Excellent</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
