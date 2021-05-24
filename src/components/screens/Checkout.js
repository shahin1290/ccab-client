import React, { useState, useEffect,useRef } from 'react'
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
import { createOrder,createKlarnaOrder } from '../../redux/actions/orderAction'
import { getCourseDetails } from '../../redux/actions/courseAction'
import Loader from '../layout/Loader'
import { Tabs, Tab, Card, Form, Col } from 'react-bootstrap'
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
//console.log(process.env.REACT_APP_STRIPE_KEY);
const CheckoutForm = (props) => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const ID = props.match.params.bootcampId

  const  paymentContainerRef = useRef();
  const { course } = useSelector((state) => state.courseDetails)

  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const {order, loading:CreateOrderLoading, error:CreateOrderError } = useSelector((state) => state.KlarnaOrderCreate)
 

  const [html , setHTML] = useState( '')
  const [ currency, setCurrency] = useState('')
  const [ lang  , setLang ] = useState('')

  //address details
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')

  useEffect(() => {
    dispatch(getCourseDetails(ID))
  }, [dispatch, ID])




  
  useEffect(()=>{
    if ( order && order.html_snippet ){
      setHTML(order.html_snippet)
      
      getSnippet()
}
  },[order,html])


  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  
  const { loading, success, error } = useSelector((state) => state.orderCreate)

  const submitHandler = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
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

    if (error) {
      return
    } else {
      dispatch(
        createOrder(ID, {
          token: paymentMethod.id,
          amount: course && course.price 
        })
      )
    }
  }




  const getSnippet = ()=>{
    var checkoutContainer = paymentContainerRef.current;
                
    checkoutContainer.innerHTML = html;
    //console.log(checkoutContainer.innerHTML);
    var scriptsTags = checkoutContainer.getElementsByTagName('script')
    console.log(scriptsTags);
    for (var i = 0; i < scriptsTags.length; i++) {
      var parentNode = scriptsTags[i].parentNode
      var newScriptTag = document.createElement('script')
      newScriptTag.type = 'text/javascript'
      newScriptTag.text = scriptsTags[i].text
      console.log(newScriptTag.text);
      parentNode.removeChild(scriptsTags[i])
      parentNode.appendChild(newScriptTag)
        }
  }



  const _handelcreateKlarnaOrder = async()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
                    }
    }
    const resp = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_SEK&compact=ultra&apiKey=077ab08d433eb54aab69',{},config)
  
    console.log(Math.round(resp.data['USD_'+currency]* course.price) );
    let price= Math.round(resp.data['USD_SEK']* course.price)
    let amount = price*100;
    let taxrate = 1000;
    let totalTaxRate = amount - (amount*10000)/(10000+taxrate)
    console.log(Math.round(totalTaxRate));
      const data = {
          "purchase_country": "SE",
          "purchase_currency": "SEK",
          "locale": "sv-SE",
          "order_amount": amount ,
          "order_tax_amount": totalTaxRate,
          "order_lines": [
              {
                  "type": "Digital",
                  "reference": "19-402-USA",
                  "name": course.name,
                  "quantity": 1,
                  "quantity_unit": "pcs",
                  "unit_price": amount,
                  "tax_rate": taxrate,
                  "total_amount": amount,
                  "total_discount_amount": 0,
                  "total_tax_amount": totalTaxRate
              }
              ],
              "merchant_urls": {
                "terms":process.env.REACT_APP_HOST + "/privacy",
                "checkout": process.env.REACT_APP_HOST +"/checkout-klarna/"+ID,
                "confirmation": process.env.REACT_APP_HOST +"/confirmation-klarna/"+ID,
                "push":  "https://server.ccab.tech/api/order/push/"+ID+"/"+userDetail._id
              },
      }
     dispatch(createKlarnaOrder({data:data},ID)) 
  
  
    console.log(process.env.REACT_APP_HOST );
  
  }


  return (
    <div className="sidebar-page-container">
      <div className="auto-container">
        <div className="row clearfix">
          {/* Content Side */}
          <div className="content-side col-lg-9 col-md-12 col-sm-12">
            {/* Sec Title */}
            <div className="sec-title">
              <h4>Checkout</h4>
            </div>
            <div className="checkout-section">
              {/* Checkout Form */}

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <h3>Select Payment Method</h3>

                {loading && <Loader />}
                {error ? (
                  <p className="text-danger bg-light p-2 ">{error}</p>
                ) : success ? (
                  <p className="text-success bg-light p-2 ">
                    Order created successfully
                  </p>
                ) : null}
              </div>

              {/* Signup Info Tabs*/}
              <div className="checkout-info-tabs col-lg-9 col-md-12 col-sm-12">
                <Tabs defaultActiveKey="card" transition={false} onSelect={(e)=>{if (e==='klarna') _handelcreateKlarnaOrder()}}>
                  <Tab eventKey="card" title="Credit/ Debit card">
                    <form onSubmit={submitHandler}>
                      <h4 style={{ padding: '30px 0 5px 0' }}>
                        Payment Information
                      </h4>
                      <div
                        className="row clearfix p-3"
                        style={{
                          boxShadow: ' 0 2px 2px 0 rgba(0,0,0,0.2)',
                          backgroundColor: 'white'
                        }}
                      >
                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
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

                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
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

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
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

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
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
                      <h4 style={{ padding: '30px 0 5px 0' }}>
                        Billing Address
                      </h4>
                      <div
                        className="row clearfix"
                        style={{
                          boxShadow: ' 0 2px 2px 0 rgba(0,0,0,0.2)',
                          backgroundColor: 'white'
                        }}
                      >
                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
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

                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
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

                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
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
                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
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
                  <Tab eventKey="klarna" title="Klaran" >
                  <div className="container " 
                    style={{'padding':'60px 0px'}}>
                      { CreateOrderLoading && <Loader/>}
                      
                      <div ref={paymentContainerRef}></div>

                      <div />
                    
                    </div>



                  </Tab>
                 
                </Tabs>
              </div>
            </div>
          </div>

          {/* Sidebar Side */}
          <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
            <aside className="sidebar sticky-top">
              {/* Order Widget */}
              <div className="sidebar-widget order-widget">
                <div className="widget-content">
                  <div className="sidebar-title">
                    <h6>Order Summary</h6>
                  </div>
                  {/* Order Box */}
                  <div className="order-box">
                    <ul>
                      <li className="clearfix">
                        Basic Plan{' '}
                        <span className="pull-right">${course.price}</span>
                      </li>
                      <li className="clearfix">
                        Tax(25% Sweden){' '}
                        <span className="pull-right">
                          ${course.price * 0.25}
                        </span>
                      </li>
                      <li className="clearfix">
                        <strong>Total</strong>{' '}
                        <span className="pull-right">
                          ${course.price }
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
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
