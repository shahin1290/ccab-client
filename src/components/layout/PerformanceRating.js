import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { getTopPerformances } from '../../redux/actions/performanceAction'
import Rodal from 'rodal'
// include styles
import 'rodal/lib/rodal.css'

export default function PerformanceRating({ bootcampId }) {
  const dispatch = useDispatch()

  //Get Student's Bootcamps
  const { user } = useSelector((state) => state.userProfile)

  const { topPerformances, loading, error } = useSelector(
    (state) => state.topPerformanceList
  )

  useEffect(() => {
    dispatch(getTopPerformances(bootcampId))
  }, [dispatch, bootcampId])

  return (
    <>
      <div className="pb-5 mt-5 mb-5">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="title mb-4">
            <div className="clearfix">
              <div className="pull-left">
                <div>Top 10 Rating</div>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Rating</th>
                    <th>Student</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    topPerformances &&
                    topPerformances.length > 0 &&
                    topPerformances.map((performance, index) => (
                      <tr key={performance._id}>
                        <td className="sub-title">{index + 1}</td>
                        <td>
                          <div class="circular--landscape">
                            <img
                              src={
                                performance.avatar
                                  ? `https://server.ccab.tech/uploads/Avatar/${performance.avatar}`
                                  : '/images/resource/avatar.svg'
                              }
                              alt="avatar"
                            />
                          </div>
                          <div className="sub-text"> {performance.name}</div>
                        </td>
                        <td className="sub-title">{performance.score}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
