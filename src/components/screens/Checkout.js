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
    dispatch(getCourseDetails(ID))
    if (course) {
      dispatch(createCurrrency())
    }
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
      if (!course || !currencySuccess) return
      const amount = currency.data.amount * course.price * 100

      const getCurrency = currency.data.currency

      const { data: clientSecret } = await axios.post(
        `http://localhost:5001/api/order/${ID}/stripe-payment-intent`,
        {
          paymentMethodType: 'card',
          currency: getCurrency,
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

        dispatch(
          createOrder(ID, {
            token: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: getCurrency
          })
        )
      }
    } catch (err) {
      setCheckoutError(err.message)
    }
  }

  const _handelcreateKlarnaOrder = () => {
    setWidgetLoaded(true)
    dispatch(
      createKlarnaSession({ data: getKlarnaOrderLines(course, currency.data) }, ID)
    )
    setWidgetLoaded(false)
  }

  const [klarnaMethod, setKlarnaMethod] = useState()

  return (
    <div className="sidebar-page-container">
      <div className="auto-container">
        <div className="row clearfix">
          {/* Content Side */}
          <div className="content-side col-lg-9 col-md-12 col-sm-12">
            {/* Sec Title */}
            <div className="sec-title">
              <div className="title">Checkout</div>
              {checkoutError && <Message>{checkoutError}</Message>}{' '}
            </div>

            <div className="checkout-section">
              {/* Checkout Form */}

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <div className="title2">Select Payment Method</div>
                <div className="auto-container m-4">
                  <img
                    width="75"
                    className="pr-3"
                    src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.png"
                  />
                  <img
                    width="250"
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
                              <img
                                src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {klarnaMethod && (
                      <KlarnaPayment
                        ID={ID}
                        widgetLoaded={widgetLoaded}
                        method={klarnaMethod}
                      />
                    )}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Sidebar Side */}
          {currencyLoading ? (
            <Loader />
          ) : (
            <div className="sidebar-side col-lg-3 col-md-12 col-sm-12 mt-5">
              <aside className="sidebar sticky-top  mt-5">
                {/* Order Widget */}
                <div className="sidebar-widget order-widget">
                  <div className="widget-content ">
                    <div className="sidebar-title">
                      <div className="sub-title">Order Summary</div>
                    </div>
                    {/* Order Box */}
                    <div className="order-box bg-white p-2">
                      <ul>
                        <li className="clearfix mb-3">
                          Basic Plan{' '}
                          <span className="pull-right">
                            {currencySuccess &&
                              `${getPriceFormat(
                                currency.data.amount * course.price
                              )}  ${currency.data.currency}`}
                          </span>
                        </li>

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
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
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
