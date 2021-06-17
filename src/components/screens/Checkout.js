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
  createKlarnaSession,
  readKlarnaSession
} from '../../redux/actions/orderAction'
import { getCourseDetails } from '../../redux/actions/courseAction'
import Loader from '../layout/Loader'
import { Tabs, Tab, Accordion, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import Message from '../layout/Message'
import KlarnaPayment from '../layout/KlarnaPayment'
import { getKlarnaOrderLines } from '../../util/klarnaOrderLines'
import { getPriceFormat } from '../../util/priceFormat'
import { createCurrrency } from '../../redux/actions/currencyAction'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const CheckoutForm = ({ match, history }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setProcessingTo] = useState(false)
  const [checkoutError, setCheckoutError] = useState()

  const dispatch = useDispatch()
  const ID = match.params.bootcampId
  const subscription = match.params.plan || ''

  const [period, setPeriod] = useState(subscription && 'monthly')

  const planPrice = {
    basic: { weekly: 899, monthly: 3499 },
    standard: { weekly: 999, monthly: 3899 },
    premium: { weekly: 1199, monthly: 4699 }
  }

  const { course } = useSelector((state) => state.courseDetails)
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
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

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

  const [widgetLoaded, setWidgetLoaded] = useState(false)

  const {
    session,
    success: sessionSuccess,
    loading: sessionLoading
  } = useSelector((state) => state.KlarnaSessionCreate)

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

    dispatch(createCurrrency())
  }, [dispatch, ID])

  useEffect(() => {
    if (orderSuccess) {
      history.push(`/confirmation-card-purchase/${ID}`)
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
        amount = planPrice[subscription][period] * 100
      } else {
        amount = currency.data.amount * course.price * 100
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
            createOrder(subscription, {
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
      const amount = planPrice[subscription][period]
      dispatch(
        createKlarnaSession(
          {
            data: getKlarnaOrderLines(
              { name: subscription, price: amount },
              {
                amount: currency.data.amount,
                country: currency.data.country,
                currency: currency.data.currency
              }
            )
          },
          subscription
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
                          {subscription ? (
                            <ul>
                              <li className="clearfix mb-3">
                                Subscription Type:
                                <span className="pull-right">
                                  {subscription}
                                </span>
                              </li>

                              <li className="clearfix mb-3">
                                Subscription Period:
                                <span className="pull-right">
                                  <div className="form-group col-lg-12 col-md-12 col-sm-12">
                                    <div className="row clearfix">
                                      <div className="column col-lg-5 col-md-4 col-sm-12">
                                        <div className="radio-box">
                                          <input
                                            type="radio"
                                            name="period"
                                            id="type-1"
                                            value="weekly"
                                            onChange={(e) =>
                                              setPeriod(e.target.value)
                                            }
                                            checked={period === 'weekly'}
                                          />
                                          <label htmlFor="type-1">Weekly</label>
                                        </div>
                                      </div>
                                      <div className="column col-lg-5 col-md-4 col-sm-12">
                                        <div className="radio-box">
                                          <input
                                            type="radio"
                                            name="period"
                                            value="monthly"
                                            id="type-2"
                                            onChange={(e) =>
                                              setPeriod(e.target.value)
                                            }
                                            checked={period === 'monthly'}
                                          />
                                          <label htmlFor="type-2">
                                            Monthly
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </span>
                              </li>
                              <hr />

                              <li className="clearfix">
                                <strong>Total</strong>{' '}
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `${planPrice[subscription][period]}  ${currency.data.currency}`}
                                </span>
                              </li>
                            </ul>
                          ) : (
                            <ul>
                              <li className="clearfix mb-3">
                                Original Price:
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `${getPriceFormat(
                                      currency.data.amount * course.price * 1.5
                                    )}  ${currency.data.currency}`}
                                </span>
                              </li>

                              <li className="clearfix mb-3">
                                Coupon discounts:
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `-${getPriceFormat(
                                      currency.data.amount * course.price * 0.5
                                    )}  ${currency.data.currency}`}
                                </span>
                              </li>
                              <hr />

                              <li className="clearfix">
                                <strong>Total</strong>{' '}
                                <span className="pull-right">
                                  {currencySuccess &&
                                    `${getPriceFormat(
                                      currency.data.amount * course.price
                                    )}  ${currency.data.currency}`}
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
                          <div className="m-2 p-2 border border-secondary bg-white text-dark ">
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

                    {klarnaMethod && subscription && (
                      <KlarnaPayment
                        plan={{
                          subscription: subscription,
                          amount: planPrice[subscription][period]
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
