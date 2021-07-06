/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import {
  createOrder,
  createKlarnaSession
} from '../../redux/actions/orderAction'
import { getCourseDetails } from '../../redux/actions/courseAction'
import { getRequestDetails } from '../../redux/actions/requestAction'
import { getServiceDetails } from '../../redux/actions/serviceAction'

import Loader from '../layout/Loader'
import { Tabs, Tab } from 'react-bootstrap'
import axios from 'axios'
import Message from '../layout/Message'
import KlarnaPayment from '../layout/KlarnaPayment'
import { getKlarnaOrderLines } from '../../util/klarnaOrderLines'
import { getPriceFormat } from '../../util/priceFormat'
import { createCurrrency } from '../../redux/actions/currencyAction'
import { createAppointment } from '../../redux/actions/appointmentAction'

import { plans } from '../../util/plans'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const CheckoutForm = ({ match, history }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setProcessingTo] = useState(false)
  const [checkoutError, setCheckoutError] = useState()
  const [sekToUsd, setSekToUsd] = useState()
  const dispatch = useDispatch()
  const ID = match.params.bootcampId
  const subscription = match.params.plan
  const requestId = match.params.requestId
  const serviceId = match.params.serviceId

  const plan = plans.find((plan) => plan._id === subscription)

  const { course } = useSelector((state) => state.courseDetails)
  const { service } = useSelector((state) => state.serviceDetails)

  const {
    loading,
    success: orderSuccess,
    error
  } = useSelector((state) => state.orderCreate)

  const {
    loading: currencyLoading,
    success: currencySuccess,
    currency
  } = useSelector((state) => state.currencyCreate)

  const appointment = useSelector((state) => state.appointmentCreate)

  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const {
    loading: requestLoading,
    success: requestSuccess,
    request
  } = useSelector((state) => state.requestDetails)

  const {
    order,
    loading: CreateOrderLoading,
    error: CreateOrderError
  } = useSelector((state) => state.KlarnaOrderCreate)

  //address details
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')
  const [AmountOfWeeks, setAmountOfWeeks] = useState(
    plan.period == 'weekly' ? 4 : 2
  )
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  const {
    session,
    success: sessionSuccess,
    loading: sessionLoading
  } = useSelector((state) => state.KlarnaSessionCreate)

  useEffect(() => {
    async function fetchMyAPI() {
      const apiKey = '6068a971e6754bdf9d3b0ddc706779b0'

      const fromCurrency = 'SEK'
      const toCurrency = 'USD'
      const query = fromCurrency + '_' + toCurrency

      const url =
        'https://api.currconv.com/api/v7/convert?q=' +
        query +
        '&compact=ultra&apiKey=' +
        apiKey

      const resp = await axios.get(url)
      const amount = resp.data[query]
      setSekToUsd(amount)
    }

    fetchMyAPI()
  }, [])

  useEffect(() => {
    if (sessionSuccess) {
      const Klarna = window.Klarna
      Klarna.Payments.init({
        client_token: session.client_token
      })
    }
  }, [sessionSuccess])

  useEffect(() => {
    if (ID) {
      dispatch(getCourseDetails(ID))
    }

    if (requestId) {
      dispatch(getRequestDetails(requestId))
    }

    if (serviceId) {
      dispatch(getServiceDetails(serviceId))
    }

    dispatch(createCurrrency())
  }, [dispatch, ID])

  useEffect(() => {
    if (orderSuccess) {
      if (ID) {
        history.push(`/confirmation-card-purchase/${ID}`)
      }

      if (subscription) {
        history.push(`/confirmation-card-purchase/${subscription}`)
      }

      if (requestId) {
        history.push(`/confirmation-card-purchase/${requestId}`)
      }

      if (serviceId) {
        dispatch(
          createAppointment({
            instructor: JSON.parse(localStorage.getItem('appointment'))
              .instructor,
            service: service._id,
            sessionNumber: JSON.parse(localStorage.getItem('appointment'))
              .sessionNumber
          })
        )
        //history.push(`/confirmation-card-purchase/${serviceId}`)
      }
    }
  }, [orderSuccess])

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessingTo(true)

    const cardElement = elements.getElement(CardNumberElement)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    try {
      let amount

      if (subscription) {
        amount = Math.round(
          plan.price * sekToUsd * currency.data.amount * AmountOfWeeks * 100
        )
      }

      if (ID) {
        amount = Math.round(currency.data.amount * course.price * 100)
      }

      if (requestId) {
        amount = Math.round(currency.data.amount * request.amount * 100)
      }

      if (serviceId) {
        amount = Math.round(
          currency.data.amount *
            (service.price *
              JSON.parse(localStorage.getItem('appointment')).sessionNumber) *
            100
        )
      }

      const { data: clientSecret } = await axios.post(
        `http://localhost:5001/api/order/stripe/stripe-payment-intent`,
        {
          paymentMethodType: 'card',
          currency: currency.data.currency,
          amount
        },
        config
      )

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
          address: {
            line1: street,
            state: country,
            city,
            postal_code: zip
          }
        }
      })

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message)
        setProcessingTo(false)
        return
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name,
              address: {
                line1: street,
                state: country,
                city,
                postal_code: zip
              }
            }
          }
        }
      )

      if (error) {
        setCheckoutError(error.message)
        setProcessingTo(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        setProcessingTo(false)

        if (ID) {
          dispatch(
            createOrder(ID, {
              token: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: currency.data.currency
            })
          )
        }

        if (subscription) {
          dispatch(
            createOrder(plan.name, {
              token: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: currency.data.currency
            })
          )
        }

        if (requestId) {
          dispatch(
            createOrder('bill', {
              token: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: currency.data.currency
            })
          )
        }
        if (serviceId) {
          dispatch(
            createOrder(serviceId, {
              token: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: currency.data.currency
            })
          )
        }
      }
    } catch (err) {
      setCheckoutError(err.message)
    }
  }

  const _handelcreateKlarnaOrder = () => {
    setWidgetLoaded(true)
    if (ID) {
      dispatch(
        createKlarnaSession(
          {
            data: getKlarnaOrderLines(course, {
              amount: currency.data.amount,
              country: currency.data.country,
              currency: currency.data.currency
            })
          },
          ID
        )
      )
      setWidgetLoaded(false)
    }
    if (subscription) {
      const amount = plan.price * sekToUsd * AmountOfWeeks
      dispatch(
        createKlarnaSession(
          {
            data: getKlarnaOrderLines(
              { name: plan.name, price: amount },
              {
                amount: currency.data.amount,
                country: currency.data.country,
                currency: currency.data.currency
              }
            )
          },
          plan.name
        )
      )
      setWidgetLoaded(false)
    }

    if (requestId) {
      const amount = request.amount
      dispatch(
        createKlarnaSession(
          {
            data: getKlarnaOrderLines(
              { name: 'bill', price: amount },
              {
                amount: currency.data.amount,
                country: currency.data.country,
                currency: currency.data.currency
              }
            )
          },
          'bill'
        )
      )
      setWidgetLoaded(false)
    }

    if (serviceId) {
      const amount =
        service.price *
        JSON.parse(localStorage.getItem('appointment')).sessionNumber
      dispatch(
        createKlarnaSession(
          {
            data: getKlarnaOrderLines(
              { name: service.name, price: amount },
              {
                amount: currency.data.amount,
                country: currency.data.country,
                currency: currency.data.currency
              }
            )
          },
          serviceId
        )
      )
      setWidgetLoaded(false)
    }
  }

  const [klarnaMethod, setKlarnaMethod] = useState()

  return (
    <div className="sidebar-page-container">
      <div className="auto-container">
        <div className="row clearfix">
          {/* Content Side */}
          <div className="content-side col-lg-8 col-md-12 col-sm-12">
            {/* Sec Title */}
            <div className="sec-title">
              <div className="title">Checkout</div>
              {checkoutError && <Message>{checkoutError}</Message>}{' '}
            </div>

            <div className="checkout-section">
              {/* Checkout Form */}

              {/* Sidebar Side */}

              <div className="sidebar-side col-lg-8 col-md-12 col-sm-12 mt-5">
                <aside className="sidebar sticky-top  mt-5">
                  {/* Order Widget */}
                  <div className="sidebar-widget order-widget">
                    <div className="widget-content ">
                      <div className="sidebar-title">
                        <div className="sub-title">Order Summary</div>
                      </div>

                      {currencyLoading ? (
                        <Loader />
                      ) : (
                        <div className="order-box bg-white p-2">
                          {subscription && (
                            <ul>
                              <li className="clearfix mb-3">
                                Total Of Weeks:
                                <select
                                  className="custom-select-box px-2"
                                  onChange={(e) => {
                                    setAmountOfWeeks(Number(e.target.value))
                                  }}
                                >
                                  {plan.period == 'weekly' ? (
                                    <>
                                      <option value="4" selected>
                                        4 weeks
                                      </option>
                                      <option value="5">5 weeks</option>
                                      <option value="6">6 weeks</option>
                                      <option value="7">7 weeks</option>
                                      <option value="8">8 weeks</option>
                                    </>
                                  ) : (
                                    <>
                                      <option value="2" selected>
                                        2 Months
                                      </option>
                                      <option value="3">3 Months</option>
                                      <option value="4">4 Months</option>
                                      <option value="5">5 Months</option>
                                      <option value="6">6 Months</option>
                                    </>
                                  )}
                                </select>
                              </li>
                              <li className="clearfix mb-3">
                                Subscription Type:
                                <span className="pull-right">{plan.name}</span>
                              </li>

                              <li className="clearfix mb-3">
                                Subscription Period:
                                <span className="pull-right">
                                  {plan.period}
                                </span>
                              </li>
                              <hr />

                              <li className="clearfix">
                                <strong>Total</strong>{' '}
                                <span className="pull-right">
                                  <strong>
                                    {currencySuccess &&
                                      `${Math.round(
                                        plan.price *
                                          sekToUsd *
                                          currency.data.amount *
                                          AmountOfWeeks
                                      )}  ${currency.data.currency}`}
                                  </strong>
                                </span>
                              </li>
                            </ul>
                          )}
                          {ID && (
                            <ul>
                              <li className="clearfix mb-3">
                                Original Price:
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `${getPriceFormat(
                                      Math.round(
                                        currency.data.amount *
                                          course.price *
                                          1.5
                                      )
                                    )}  ${currency.data.currency}`}
                                </span>
                              </li>

                              <li className="clearfix mb-3">
                                Coupon discounts:
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `-${getPriceFormat(
                                      Math.round(
                                        currency.data.amount *
                                          course.price *
                                          0.5
                                      )
                                    )}  ${currency.data.currency}`}
                                </span>
                              </li>
                              <hr />

                              <li className="clearfix">
                                <strong>Total</strong>{' '}
                                <span className="pull-right">
                                  <strong>
                                    {currencySuccess &&
                                      `${getPriceFormat(
                                        Math.round(
                                          currency.data.amount * course.price
                                        )
                                      )}  ${currency.data.currency}`}
                                  </strong>
                                </span>
                              </li>
                            </ul>
                          )}

                          {requestId && (
                            <ul>
                              <li className="clearfix mb-3">
                                Bill:
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `${getPriceFormat(
                                      Math.round(
                                        currency.data.amount * request.amount
                                      )
                                    )}  ${currency.data.currency}`}
                                </span>
                              </li>

                              <hr />

                              <li className="clearfix">
                                <strong>Total</strong>{' '}
                                <span className="pull-right">
                                  <strong>
                                    {currencySuccess &&
                                      `${getPriceFormat(
                                        Math.round(
                                          currency.data.amount * request.amount
                                        )
                                      )}  ${currency.data.currency}`}
                                  </strong>
                                </span>
                              </li>
                            </ul>
                          )}

                          {serviceId && (
                            <ul>
                              <li className="clearfix mb-3">
                                Service:
                                <span className="pull-right">
                                  {service && service.name}
                                </span>
                              </li>
                              <li className="clearfix mb-3">
                                Price(per session):
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `${getPriceFormat(
                                      Math.round(
                                        currency.data.amount * service.price
                                      )
                                    )}  ${currency.data.currency}`}
                                </span>
                              </li>

                              <li className="clearfix mb-3">
                                Sessions:
                                <span className="pull-right">
                                  {
                                    JSON.parse(
                                      localStorage.getItem('appointment')
                                    ).sessionNumber
                                  }
                                </span>
                              </li>

                              <hr />

                              <li className="clearfix">
                                <strong>Total</strong>{' '}
                                <span className="pull-right">
                                  <strong>
                                    {currencySuccess &&
                                      `${getPriceFormat(
                                        Math.round(
                                          currency.data.amount *
                                            (service.price *
                                              JSON.parse(
                                                localStorage.getItem(
                                                  'appointment'
                                                )
                                              ).sessionNumber)
                                        )
                                      )}  ${currency.data.currency}`}
                                  </strong>
                                </span>
                              </li>
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <div className="title2">Select Payment Method</div>
                <div className="auto-container mt-3 mb-5">
                  <img
                    width="50"
                    className="pr-2"
                    src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.png"
                  />
                  <img
                    width="160"
                    src="https://cdn.jotfor.ms/images/credit-card-logo.png"
                  />
                </div>
              </div>

              {/* Signup Info Tabs*/}
              <div className="checkout-info-tabs col-lg-9 col-md-12 col-sm-12">
                <Tabs
                  defaultActiveKey="card"
                  transition={false}
                  onSelect={(e) => {
                    if (e === 'klarna') _handelcreateKlarnaOrder()
                  }}
                >
                  <Tab eventKey="card" title="Credit/ Debit card">
                    <form onSubmit={submitHandler}>
                      <div className="sub-title p-3">Payment Information</div>
                      {isProcessing && <Loader />}

                      <div
                        className="row clearfix p-3"
                        style={{
                          boxShadow: ' 0 2px 2px 0 rgba(0,0,0,0.2)',
                          backgroundColor: 'white'
                        }}
                      >
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Holder Name</label>

                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '0.3em',
                              backgroundColor: 'white'
                            }}
                          >
                            <input
                              type="text"
                              value={name}
                              placeholder="Emily J Smith"
                              required
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label htmlFor="cardNumber">Card Number</label>
                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '0.5em',
                              backgroundColor: 'white'
                            }}
                          >
                            <CardNumberElement
                              id="cardNumber"
                              options={ELEMENT_OPTIONS}
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>Expiration Date</label>
                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '0.5em',
                              backgroundColor: 'white'
                            }}
                          >
                            <CardExpiryElement />
                          </div>
                        </div>

                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>CVC Code</label>
                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '0.5em',
                              backgroundColor: 'white'
                            }}
                          >
                            <CardCvcElement />
                          </div>
                        </div>
                      </div>
                      <div className="sub-title p-3">Billing Address</div>
                      <div
                        className="row clearfix"
                        style={{
                          boxShadow: ' 0 2px 2px 0 rgba(0,0,0,0.2)',
                          backgroundColor: 'white'
                        }}
                      >
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Street</label>

                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '0.3em',
                              backgroundColor: 'white'
                            }}
                          >
                            <input
                              type="text"
                              value={street}
                              placeholder="542 W. 15th Street"
                              required
                              onChange={(e) => setStreet(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>City</label>

                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '0.3em',
                              backgroundColor: 'white'
                            }}
                          >
                            <input
                              type="text"
                              value={city}
                              placeholder="New York"
                              required
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Country</label>

                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '.3em',
                              backgroundColor: 'white'
                            }}
                          >
                            <input
                              type="text"
                              value={country}
                              placeholder="USA"
                              required
                              onChange={(e) => setCountry(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Zip</label>

                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '.3em',
                              backgroundColor: 'white'
                            }}
                          >
                            <input
                              type="text"
                              value={zip}
                              placeholder="58648"
                              required
                              onChange={(e) => setZip(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '20px 0' }}>
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          name="submit-form"
                        >
                          <span className="txt">Confirm Checkout</span>
                        </button>
                      </div>
                    </form>
                  </Tab>
                  <Tab eventKey="klarna" title="Klarna">
                    {widgetLoaded && <Loader />}
                    <div
                      onChange={(e) => setKlarnaMethod(e.target.value)}
                      className="p-4"
                    >
                      {sessionLoading ? (
                        <Loader />
                      ) : (
                        sessionSuccess &&
                        session.payment_method_categories.map((method) => (
                          <div
                            key={method.identifier}
                            className="m-2 p-2 border border-secondary bg-white text-dark "
                          >
                            <input
                              value={method.identifier}
                              className="form-check-input ml-3"
                              type="radio"
                              name="flexRadioDefault"
                              id={method.identifier}
                            />
                            <div className="d-flex justify-content-between">
                              <label
                                className="form-check-label ml-5"
                                for={method.identifier}
                              >
                                {method.name}
                              </label>
                              <img src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg" />
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {klarnaMethod && ID && (
                      <KlarnaPayment
                        ID={ID}
                        widgetLoaded={widgetLoaded}
                        method={klarnaMethod}
                      />
                    )}

                    {klarnaMethod && serviceId && (
                      <KlarnaPayment
                        serviceBill={{
                          serviceId: serviceId,
                          amount: Math.round(
                            service.price *
                              JSON.parse(localStorage.getItem('appointment'))
                                .sessionNumber
                          )
                        }}
                        widgetLoaded={widgetLoaded}
                        method={klarnaMethod}
                      />
                    )}

                    {klarnaMethod && subscription && (
                      <KlarnaPayment
                        plan={{
                          subscription: plan.name,
                          amount: plan.price * sekToUsd * AmountOfWeeks
                        }}
                        widgetLoaded={widgetLoaded}
                        method={klarnaMethod}
                      />
                    )}

                    {klarnaMethod && requestId && (
                      <KlarnaPayment
                        requestBill={{
                          bill: 'bill',
                          amount: request.amount
                        }}
                        widgetLoaded={widgetLoaded}
                        method={klarnaMethod}
                      />
                    )}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Checkout = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
)

export default Checkout
