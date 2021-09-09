import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {
  getOrderList,
  getStripeSubscriptionInvoice
} from '../../redux/actions/orderAction'
import { getDate } from '../../util/getDate'
import axios from 'axios'
import { plans } from '../../util/plans'
import StripeSubscriptionDetails from './StripeSubscriptionDetails'

export default function Purchases() {
  const dispatch = useDispatch()

  const [showSubscriptionModal, setShowSubscriptionModal] = useState({
    visible: false
  })

  //Get Student's Bootcamps
  const { userDetail } = useSelector((state) => state.userLogin)

  //Get Subscription invoice
  const { invoice } = useSelector((state) => state.stripeSubscriptionInvoice)

  //redux state
  const {
    orderList,
    loading: orderLoading,
    error: orderError
  } = useSelector((state) => state.orderList)

  //useEffect
  useEffect(() => {
    dispatch(getOrderList())
  }, [dispatch])

  //cancel subscription function
  const cancelSubscription = async (subscriptionId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    if (window.confirm('Do you really want to cancel?')) {
      const res = await axios.post(
        `https://server.ccab.tech/api/order/stripe/cancel-subscription`,
        {
          subscriptionId
        },
        config
      )
      dispatch(getOrderList())
    }
  }

  //get the subscription details
  const subscriptionDetails = (subs) => {
    const subscriptionId = subs.split(' ')[1]

    const plan = plans.find(
      (plan) => plan.stripeSubscriptionId === subscriptionId
    )

    if (plan._id) {
      const { name, period } = plan
      return `${period} ${name}`
    }
  }



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
                          <td className="text-capitalize">
                            {order.course.includes('subscription')
                              ? subscriptionDetails(order.course)
                              : order.course}
                          </td>

                          <td>{getDate(order.createdAt)}</td>
                          <td>
                            {order.amount} ({order.currency})
                          </td>

                          <td className="d-flex">
                            {order.orderStatus === 'Active' ? (
                              <>
                                <div className="text-info font-weight-bold">
                                  {order.orderStatus}
                                </div>
                                <button
                                  className="bg-info ml-4 text-white p-1"
                                  onClick={() => {
                                    dispatch(
                                      getStripeSubscriptionInvoice(
                                        order.orderBy
                                      )
                                    )
                                    setShowSubscriptionModal({
                                      visible: true
                                    })
                                  }}
                                >
                                  view
                                </button>
                              </>
                            ) : order.orderStatus === 'Canceled' ? (
                              <div className="text-danger font-weight-bold">
                                {order.orderStatus}
                              </div>
                            ) : (
                              <div>{order.orderStatus}</div>
                            )}
                            {showSubscriptionModal.visible === true && (
                              <StripeSubscriptionDetails
                                order={order}
                                showSubscriptionModal={showSubscriptionModal}
                                setShowSubscriptionModal={
                                  setShowSubscriptionModal
                                }
                              />
                            )}
                          </td>
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
