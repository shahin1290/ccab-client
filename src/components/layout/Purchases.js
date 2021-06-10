import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { getOrderList } from '../../redux/actions/orderAction'
import { getDate } from '../../util/getDate'

export default function Quizzes() {
  const dispatch = useDispatch()

  //Get Student's Bootcamps
  const { userDetail } = useSelector((state) => state.userLogin)

  const {
    orderList,
    loading: orderLoading,
    error: orderError
  } = useSelector((state) => state.orderList)

  useEffect(() => {
    dispatch(getOrderList())
  }, [dispatch])

  return (
    <>
      <div className="pb-5 pt-5 mb-5">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="title mb-4">
            <div className="clearfix">
              <div className="pull-left">
                <div>My Purchases</div>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="table-responsive">
              {orderLoading ? (
                <Loader />
              ) : orderError ? (
                <Message variant="danger">{orderError}</Message>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Bootcamp</th>
                      <th>Purchase Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.length ? (
                      orderList.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order.course && order.course.name}</td>

                          <td>{getDate(order.createdAt)}</td>
                          <td>{order.amount} ({order.currency})</td>
                          <td>{order.orderStatus}</td>
                        </tr>
                      ))
                    ) : (
                      <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                        You Don't have Any Orders yet !
                      </p>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
