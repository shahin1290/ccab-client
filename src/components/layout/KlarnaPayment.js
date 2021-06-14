import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  readKlarnaSession,
  createKlarnaOrder,
  readKlarnaOrder
} from '../../redux/actions/orderAction'
import { getCourseDetails } from '../../redux/actions/courseAction'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import { getKlarnaOrderLines } from '../../util/klarnaOrderLines'

const KlarnaPayment = ({ ID, method }) => {
  const { course } = useSelector((state) => state.courseDetails)
  const userLogin = useSelector((state) => state.userLogin)
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

  const onClickHandler =  () => {
    dispatch(readKlarnaSession(ID, { session_id: session.session_id }))
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
        dispatch(
          createKlarnaOrder(ID, {
            token: res.authorization_token,
            data:  getKlarnaOrderLines(course, currency.data)
          })
        )
      }
    )
  }

  return (
    <>
      {orderSuccess ? (
        <Redirect to={`/confirmation-klarna/${ID}`} />
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
