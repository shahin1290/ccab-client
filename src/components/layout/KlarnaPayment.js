import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  readKlarnaSession,
  createKlarnaOrder,
  readKlarnaOrder
} from '../../redux/actions/orderAction'
import { Redirect } from 'react-router-dom'

import { getKlarnaOrderLines } from '../../util/klarnaOrderLines'

const KlarnaPayment = ({ ID, method, plan, requestBill }) => {
  const { course } = useSelector((state) => state.courseDetails)
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  const dispatch = useDispatch()
  const { session, success: sessionSuccess } = useSelector(
    (state) => state.KlarnaSessionCreate
  )

  const {
    loading: currencyLoading,
    success: currencySuccess,
    currency
  } = useSelector((state) => state.currencyCreate)

  useEffect(() => {
    if (sessionSuccess && method === 'pay_now') {
      setWidgetLoaded(false)
      const Klarna = window.Klarna

      Klarna.Payments.load(
        {
          container: '#klarna-payments-container1',
          payment_method_category: method
        },
        (res) => {
          setWidgetLoaded(true)
        }
      )
    }

    if (sessionSuccess && method === 'pay_later') {
      setWidgetLoaded(false)
      const Klarna = window.Klarna

      Klarna.Payments.load(
        {
          container: '#klarna-payments-container2',
          payment_method_category: method
        },
        (res) => {
          setWidgetLoaded(true)
        }
      )
    }

    if (sessionSuccess && method === 'pay_over_time') {
      setWidgetLoaded(false)
      const Klarna = window.Klarna

      Klarna.Payments.load(
        {
          container: '#klarna-payments-container3',
          payment_method_category: method
        },
        (res) => {
          setWidgetLoaded(true)
        }
      )
    }
  }, [sessionSuccess, method])

  const { token } = useSelector((state) => state.klarnaSessionRead)

  const {
    order,
    loading: CreateOrderLoading,
    success: orderSuccess,
    error: CreateOrderError
  } = useSelector((state) => state.KlarnaOrderCreate)

  /* useEffect(() => {
    console.log(order);
    if (orderSuccess) {
      console.log(order.redirect_url);
      <Redirect to={`/confirmation-klarna/${ID}`} />
      //dispatch(readKlarnaOrder(ID))
    }
  }, [orderSuccess]) */

  const onClickHandler = () => {
    console.log(ID, plan && plan.subscription, requestBill && requestBill.bill)
    if (ID) {
      dispatch(readKlarnaSession(ID, { session_id: session.session_id }))
    }

    if (plan && plan.subscription) {
      dispatch(
        readKlarnaSession(plan.subscription, { session_id: session.session_id })
      )
    }

    if (requestBill && requestBill.bill) {
      dispatch(
        readKlarnaSession(requestBill.bill, { session_id: session.session_id })
      )
    }
    // eslint-disable-next-line no-undef
    Klarna.Payments.authorize(
      {
        payment_method_category: method
      },
      /*   {
        shipping_address: {
          given_name: 'Md',
          family_name: 'Md',
          email: 's.patowary@yahoo.com',
          street_address: 'Skattegården 29B',
          postal_code: '58648',
          city: 'Linköping',
          phone: '0761256612',
          country: 'SE'
        }
      }, */

      function (res) {
        if (ID) {
          dispatch(
            createKlarnaOrder(ID, {
              token: res.authorization_token,
              data: getKlarnaOrderLines(course, currency.data)
            })
          )
        }
        if (plan && plan.subscription) {
          dispatch(
            createKlarnaOrder(plan.subscription, {
              token: res.authorization_token,
              data: getKlarnaOrderLines(
                { name: plan.subscription, price: plan.amount },
                currency.data
              )
            })
          )
        }
        if (requestBill && requestBill.bill) {
          dispatch(
            createKlarnaOrder(requestBill.bill, {
              token: res.authorization_token,
              data: getKlarnaOrderLines(
                { name: requestBill.bill, price: requestBill.amount },
                currency.data
              )
            })
          )
        }
      }
    )
  }

  return (
    <>
      {orderSuccess ? (
        <>
          {ID && <Redirect to={`/confirmation-klarna/${ID}`} />}
          {plan && plan.subscription && (
            <Redirect to={`/confirmation-klarna/${plan.subscription}`} />
          )}
          {requestBill && requestBill.bill && (
            <Redirect to={`/confirmation-klarna/${requestBill.bill}`} />
          )}
        </>
      ) : (
        <div className=" bg-white d-flex flex-column justify-content-center">
          {method === 'pay_now' && (
            <div className="p-3 " id="klarna-payments-container1"></div>
          )}

          {method === 'pay_later' && (
            <div className="p-3 " id="klarna-payments-container2"></div>
          )}
          {method === 'pay_over_time' && (
            <div className="p-3 " id="klarna-payments-container3"></div>
          )}

          {widgetLoaded && (
            <button
              className="klarna mt-5"
              onClick={onClickHandler}
              id="checkout-button"
              disabled={!widgetLoaded}
            >
              Place Order
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default KlarnaPayment
