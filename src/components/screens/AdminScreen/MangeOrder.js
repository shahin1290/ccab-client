import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllOrders,
  captureOrder,
  getOrder
} from '../../../redux/actions/orderAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'
import { Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

export default function MangeOrder({ match }) {
  const dispatch = useDispatch()

  const pageNumber = match.params.pageNumber || 1

  /***********   Calling Reducer  ***************/

  // Admin course list Reducer
  const {
    loading: orderLoading,
    error: orderError,
    orderList
  } = useSelector((state) => state.getAllOrders)

  const {success: captureSuccess} = useSelector((state) => state.KlarnaOrderCapture)


  /************************************************************** */

  /************* Functions *************/

  // get date format
  const getDate = (date) => {
    let d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  }

  const getNotProcessedOrder = () =>
    orderList.filter((order) => {
      return order.orderStatus === 'Not Processed'
    })

  const getVerifiedOrder = () =>
    orderList.filter((order) => {
      return (
        order.orderStatus === 'Processed' || order.orderStatus === 'Verified'
      )
    })

  const getDeliveredOrder = () =>
    orderList.filter((order) => {
      return order.orderStatus === 'Delivered'
    })

  const getPriceFormat = (price) => {
    let priceFormat = Math.floor(price / 1000)
    priceFormat += ' ' + (price % 1000)

    return priceFormat
  }

  /*****************************************************************/

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch, pageNumber, captureSuccess])

 

  /************************************************** */

  //console.log(courseList);
  return (
    <>
      <div style={{ paddingTop: '20px' }} className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">Purchases List</div>
              </div>
            </div>
          </div>

          <Tabs defaultActiveKey="Incoming" variant="pills" transition={false}>
            <Tab eventKey="Incoming" title="Incoming Orders">
              <div className="inner-container">
                <div className="table-responsive">
                  {orderLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <h5>
                        Total Incoming Orders : {getNotProcessedOrder().length}
                      </h5>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Bootcamp</th>
                            <th>order by</th>
                            <th>Purchase Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderError ? (
                            <Message variant="danger">{orderError}</Message>
                          ) : getNotProcessedOrder().length ? (
                            getNotProcessedOrder().map((order, index) => (
                              <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td style={{ width: '30%' }}>
                                  {order.course && order.course}
                                </td>
                                <td>{order.orderBy && order.orderBy.name}</td>
                                <td>{getDate(order.createdAt)}</td>
                                <td>
                                  {getPriceFormat(order.amount) +
                                    ' ' +
                                    order.currency}
                                </td>
                                <td>{order.orderStatus}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td></td>
                              <p className="pl-4 py-2 mt-4 text-dark">
                                There isn't any incoming orders yet !
                              </p>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </Tab>

            <Tab eventKey="verified" title="Processed/Verified">
              <div className="inner-container">
                <div className="table-responsive">
                  {orderLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <h5>
                        Total Incoming Orders : {getVerifiedOrder().length}
                      </h5>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Bootcamp</th>
                            <th>order by</th>
                            <th>Purchase Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getVerifiedOrder().length ? (
                            getVerifiedOrder().map((order, index) => (
                              <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td style={{ width: '30%' }}>
                                  {order.course && order.course}
                                </td>
                                <td>{order.orderBy && order.orderBy.name}</td>

                                <td>{getDate(order.createdAt)}</td>
                                <td>
                                  {getPriceFormat(Math.round(order.amount)) +
                                    ' ' +
                                    order.currency}
                                </td>
                                <td>{order.orderStatus}</td>
                                <td>
                                  {order.orderStatus === 'Verified' ? (
                                    <button
                                      onClick={() => {
                                        dispatch(
                                          captureOrder(
                                            order.course,
                                            {orderBy: order.orderBy}
                                          )
                                        )
                                      }}
                                      className="btn btn-primary btn-sm bg-success rounded-pill"
                                    >
                                      Capture
                                    </button>
                                  ) : (
                                    <span>Wating for Verifiation...</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td></td>
                              <p className="pl-4 py-2 mt-4 text-dark ">
                                There isn't any verified OR processed orders yet
                                !
                              </p>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </Tab>

            <Tab eventKey="Delivered" title="Delivered">
              <div className="inner-container">
                <div className="table-responsive">
                  {orderLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <h5>
                        Total Incoming Orders : {getDeliveredOrder().length}
                      </h5>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Bootcamp</th>
                            <th>order by</th>
                            <th>Purchase Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderError ? (
                            <Message variant="danger">{orderError}</Message>
                          ) : getDeliveredOrder().length ? (
                            getDeliveredOrder().map((order, index) => (
                              <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td style={{ width: '30%' }}>
                                  {order.course && order.course}
                                </td>
                                <td>{order.orderBy && order.orderBy.name}</td>

                                <td>{getDate(order.createdAt)}</td>
                                <td>
                                  {getPriceFormat(order.amount) +
                                    ' ' +
                                    order.currency}
                                </td>
                                <td>
                                  {order.orderStatus}
                                  <i className="ml-2 fas fa-check-circle text-success"></i>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <>
                              <tr>
                                <td></td>

                                <p className="pl-4 py-2 mt-4 text-dark ">
                                  There isn't any Delivered orders yet !
                                </p>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
