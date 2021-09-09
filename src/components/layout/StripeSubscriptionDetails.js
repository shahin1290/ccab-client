import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderList } from '../../redux/actions/orderAction'
import axios from 'axios'
import Rodal from 'rodal'
// include styles
import 'rodal/lib/rodal.css'
import { Card, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

export default function StripeSubscriptionDetails({
  order,
  showSubscriptionModal,
  setShowSubscriptionModal
}) {
  const dispatch = useDispatch()

  //Get Student's Bootcamps
  const { userDetail } = useSelector((state) => state.userLogin)

  //Get Subscription invoice
  const { invoice, loading, error } = useSelector(
    (state) => state.stripeSubscriptionInvoice
  )

  //cancel subscription function
  const cancelSubscription = async (subscriptionId, orderBy) => {
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
          subscriptionId,
          orderBy
        },
        config
      )
      setShowSubscriptionModal({ visible: false })
      dispatch(getOrderList())
    }
  }

  //functions next payment due
  const formatDate = (date) =>
    new Date(date).getMonth() +
    1 +
    '/' +
    new Date(date).getDate() +
    '/' +
    new Date(date).getFullYear()

  const nextPaymentAttempt = () =>
    new Date(invoice.next_payment_attempt * 1000).toString()

  return (
    <>
      <div>
        <Rodal
          animation="zoom"
          visible={showSubscriptionModal.visible}
          onClose={() => setShowSubscriptionModal({ visible: false })}
          width={500}
        >
          <Card style={{ width: '90%' }}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message>{error}</Message>
            ) : (
              <Card.Body className="pb-2">
                <div className="title pb-2">Subscription Details</div>

                <div>
                  <span className="sub-title">Customer Id:</span>{' '}
                  {invoice && invoice.customer}
                </div>
                <div>
                  <span className="sub-title">Subscription Id:</span>{' '}
                  {invoice && invoice.subscription}
                </div>
                <div className="pb-5">
                  <span className="sub-title"> Next Payment:</span>{' '}
                  {invoice &&
                    invoice.next_payment_attempt &&
                    formatDate(nextPaymentAttempt())}
                </div>
                <Button
                  variant="danger"
                  onClick={() =>
                    cancelSubscription(order.charge, order.orderBy)
                  }
                >
                  cancel subscription
                </Button>
              </Card.Body>
            )}
          </Card>
        </Rodal>
      </div>
    </>
  )
}
