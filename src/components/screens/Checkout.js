/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/orderAction";
import { getCourseDetails } from "../../redux/actions/courseAction";
import Loader from "../layout/Loader";
import axios from "axios";
import Message from "../layout/Message";

import { getPriceFormat } from "../../util/priceFormat";

import { plans } from "../../util/plans";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutForm = ({ match, history }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [sekToEUR, setSekToEUR] = useState();
  const dispatch = useDispatch();
  const ID = match.params.bootcampId;
  const subscription = match.params.plan;

  const [method, setMethod] = useState();

  const plan = plans.find((plan) => plan._id === subscription);

  const { course } = useSelector((state) => state.courseDetails);

  const { success: orderSuccess } = useSelector((state) => state.orderCreate);

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  //address details
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [AmountOfWeeks, setAmountOfWeeks] = useState(
    plan && plan.period == "weekly" ? 4 : 2
  );
  const [billingType, setBillingType] = useState("subscription");

  useEffect(() => {
    if (ID) {
      dispatch(getCourseDetails(ID));
    }
  }, [ID]);

  useEffect(() => {
    if (orderSuccess) {
      if (ID) {
        history.push(`/confirmation-card-purchase/${ID}`);
      }

      if (subscription) {
        history.push(`/confirmation-card-purchase/${subscription}`);
      }
    }
  }, [orderSuccess]);

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "18px",
        color: "#424770",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessingTo(true);

    const cardElement = elements.getElement(CardNumberElement);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };

    try {
      if (subscription && billingType === "subscription") {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name,
            address: {
              line1: street,
              state: country,
              city,
              postal_code: zip,
            },
          },
        });

        if (error) {
          setCheckoutError(error.message);
          setProcessingTo(false);
          return;
        }

        const res = await axios.post(
          `https://ccab-server.up.railway.app/api/order/stripe/stripe-subscription`,
          {
            payment_method: paymentMethod.id,
            planId: plan.stripeSubscriptionId,
          },
          config
        );

        // The subscription contains an invoice
        // If the invoice's payment succeeded then you're good,
        // otherwise, the payment intent must be confirmed

        const { latest_invoice, id: subscriptionId } = res.data.data;

        if (latest_invoice.payment_intent) {
          const { client_secret, status } = latest_invoice.payment_intent;

          if (status === "requires_action") {
            const { error: confirmationError } =
              await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                  card: cardElement,
                  billing_details: {
                    name,
                    address: {
                      line1: street,
                      state: country,
                      city,
                      postal_code: zip,
                    },
                  },
                },
              });
            if (confirmationError) {
              setProcessingTo(false);
              setCheckoutError(error.message);
              return;
            }
          }

          // success
          setProcessingTo(false);
          dispatch(
            createOrder(`subscription ${plan.stripeSubscriptionId}`, {
              token: subscriptionId,
              amount: (
                (Number(plan.price) +
                  (promos && promos.length > 0 && promos[0].show ? 0 : 200)) *
                sekToEUR *
                currency.data.amount *
                100
              ).toFixed(),
              currency: currency.data.currency,
            })
          );
        }
      } else {
        let amount;

        if (subscription) {
          amount = Math.round(
            (Number(plan.price) +
              (promos && promos.length > 0 && promos[0].show ? 0 : 200)) *
              sekToEUR *
              currency.data.amount *
              6 *
              100
          );
        }

        if (ID) {
          amount = Math.round(currency.data.amount * course.price * 100);
        }

        const { data: clientSecret } = await axios.post(
          `https://ccab-server.up.railway.app/api/order/stripe/stripe-payment-intent`,
          {
            paymentMethodType: "card",
            currency: currency.data.currency,
            amount,
            receipt_email: userDetail.email,
          },
          config
        );

        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name,
            address: {
              line1: street,
              state: country,
              city,
              postal_code: zip,
            },
          },
        });

        if (paymentMethodReq.error) {
          setCheckoutError(paymentMethodReq.error.message);
          setProcessingTo(false);
          return;
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
                  postal_code: zip,
                },
              },
            },
          }
        );

        if (error) {
          setCheckoutError(error.message);
          setProcessingTo(false);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          setProcessingTo(false);

          if (ID) {
            dispatch(
              createOrder(ID, {
                token: paymentIntent.id,
                amount: paymentIntent.amount,
                currency: currency.data.currency,
              })
            );
          }

          if (subscription) {
            dispatch(
              createOrder(plan.name, {
                token: paymentIntent.id,
                amount: paymentIntent.amount,
                currency: currency.data.currency,
              })
            );
          }
        }
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return (
    <div className="sidebar-page-container">
      <div className="auto-container">
        <div className="">
          {/* Content Side */}

          <div
            className="content-side col-lg-10 col-md-12 col-sm-12"
            style={{ margin: "0 auto" }}
          >
            {/* Sec Title */}
            <div className="sec-title">
              <div className="title">Checkout</div>
            </div>

            <div className="checkout-section">
              {/* Checkout Form */}

              {/* Sidebar Side */}

              <div className="sidebar-side col-lg-9 col-md-12 col-sm-12 mt-5">
                <aside className="sidebar sticky-top  mt-5">
                  {/* Order Widget */}
                  <div className="border border-secondary rounded">
                    <div className="widget-content ">
                      <div className="sidebar-title">
                        <div className="sub-title text-info pl-2 pt-2">
                          Order Summary
                        </div>
                      </div>

                      <div className="order-box bg-white p-2">
                        {subscription && (
                          <>
                            <div className="">
                              <div className="sub-title mr-2 mb-2">
                                Billing Type{" "}
                              </div>
                              <div className="form-check m-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="price"
                                  id="inlineRadio1"
                                  value="subscription"
                                  onChange={(e) => {
                                    setBillingType(e.target.value);
                                  }}
                                  checked={billingType === "subscription"}
                                  required
                                />
                                <label
                                  className="form-check-label font-weight-bold"
                                  for="inlineRadio1"
                                >
                                  Subscription (pay every month)
                                </label>

                                <div className="clearfix mb-3">
                                  Total Of
                                  {plan.period === "weekly"
                                    ? " Weeks"
                                    : " Months"}
                                  :
                                  <select
                                    className="custom-select-box px-2 mt-3"
                                    onChange={(e) => {
                                      setAmountOfWeeks(Number(e.target.value));
                                    }}
                                  >
                                    {plan.period == "weekly" ? (
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
                                </div>
                              </div>

                              <div className="form-check m-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="price"
                                  id="inlineRadio2"
                                  value="oneTime"
                                  onChange={(e) => {
                                    setBillingType(e.target.value);
                                  }}
                                  checked={billingType === "oneTime"}
                                />
                                <label
                                  className="form-check-label font-weight-bold"
                                  for="inlineRadio2"
                                >
                                  Full payment (pay once)
                                </label>
                              </div>
                            </div>

                            <div className="sub-title mt-5 mr-2 mb-2">
                              Order Details{" "}
                            </div>
                            <ul className="pt-2">
                              <li className="clearfix mb-3">
                                Plan Type:
                                <span className="pull-right">{plan.name}</span>
                              </li>

                              {billingType === "oneTime" ? (
                                <>
                                  {" "}
                                  <li className="clearfix mb-3">
                                    Original Price:
                                    <span className="pull-right">
                                      {/* {currencySuccess &&
                                        `${Math.round(
                                          (Number(plan.price) +
                                            (promos &&
                                            promos.length > 0 &&
                                            promos[0].show
                                              ? 200
                                              : 0)) *
                                            6 *
                                            sekToEUR *
                                            currency.data.amount
                                        )}  ${currency.data.currency}`} */}
                                    </span>
                                  </li>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <li className="clearfix mb-3">
                                    Original Price:
                                    <span className="pull-right">
                                      {/* {currencySuccess &&
                                        `${Math.round(
                                          (Number(plan.price) +
                                            (promos &&
                                            promos.length > 0 &&
                                            promos[0].show
                                              ? 200
                                              : 0)) *
                                            sekToEUR *
                                            currency.data.amount
                                        )}  ${currency.data.currency} /
                                          ${
                                            plan.period === "weekly"
                                              ? "week"
                                              : "month"
                                          }`} */}
                                    </span>
                                  </li>
                                </>
                              )}

                              <li className="clearfix mb-3">
                                Disscount:
                                {billingType === "oneTime" ? (
                                  <span className="pull-right">
                                    {currencySuccess &&
                                      `${Math.round(
                                        (promos &&
                                        promos.length > 0 &&
                                        promos[0].show
                                          ? 200
                                          : 0) *
                                          sekToEUR *
                                          currency.data.amount *
                                          6
                                      )}  ${currency.data.currency}`}
                                  </span>
                                ) : (
                                  <span className="pull-right">
                                    {/* {currencySuccess &&
                                      `${Math.round(
                                        (promos &&
                                        promos.length > 0 &&
                                        promos[0].show
                                          ? 200
                                          : 0) *
                                          sekToEUR *
                                          currency.data.amount *
                                          AmountOfWeeks
                                      )}  ${currency.data.currency}`} */}
                                  </span>
                                )}
                              </li>

                              <hr />

                              <li className="clearfix">
                                <span className="text-info font-weight-bold">
                                  Total
                                </span>{" "}
                                <span className="pull-right">
                                  {billingType === "oneTime" ? (
                                    <span className="text-info font-weight-bold">
                                      {currencySuccess &&
                                        `${Math.round(
                                          (Number(plan.price) +
                                            (promos &&
                                            promos.length > 0 &&
                                            promos[0].show
                                              ? 0
                                              : 200)) *
                                            sekToEUR *
                                            currency.data.amount *
                                            6
                                        )}  ${currency.data.currency}`}
                                    </span>
                                  ) : (
                                    <span className="text-info font-weight-bold">
                                      {/* {currencySuccess &&
                                        `${Math.round(
                                          (Number(plan.price) +
                                            (promos &&
                                            promos.length > 0 &&
                                            promos[0].show
                                              ? 0
                                              : 200)) *
                                            sekToEUR *
                                            currency.data.amount *
                                            AmountOfWeeks
                                        )}  ${currency.data.currency}`} */}
                                    </span>
                                  )}
                                </span>
                              </li>
                            </ul>
                          </>
                        )}
                        {ID && (
                          <ul>
                            <li className="clearfix mb-3">
                              Original Price:
                              <span className="pull-right">
                                {/* {currencySuccess &&
                                  `${getPriceFormat(
                                    Math.round(
                                      currency.data.amount * course.price * 1.5
                                    )
                                  )}  ${currency.data.currency}`} */}
                              </span>
                            </li>

                            <li className="clearfix mb-3">
                              Coupon discounts:
                              <span className="pull-right">
                                {/* {currencySuccess &&
                                  `-${getPriceFormat(
                                    Math.round(
                                      currency.data.amount * course.price * 0.5
                                    )
                                  )}  ${currency.data.currency}`} */}
                              </span>
                            </li>
                            <hr />

                            <li className="clearfix">
                              <span className="text-info text-bold">Total</span>{" "}
                              <span className="pull-right">
                                <span className="text-info font-weight-bold">
                                  {/* {currencySuccess &&
                                    `${getPriceFormat(
                                      Math.round(
                                        currency.data.amount * course.price
                                      )
                                    )}  ${currency.data.currency}`} */}
                                </span>
                              </span>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>

              {/* Signup Info Tabs*/}
              <div className=" col-lg-9 col-md-12 col-sm-12 mb-5">
                <div className="wrapper">
                  <div className="title">Select Payment Method</div>
                  <div className="box">
                    <input
                      type="radio"
                      name="select"
                      id="option-1"
                      onClick={() => setMethod("card")}
                    />
                    <input
                      type="radio"
                      name="select"
                      id="option-2"
                      onClick={() => {
                        setMethod("klarna");
                        _handelcreateKlarnaOrder();
                      }}
                    />

                    <label for="option-1" className="option-1">
                      <div className="dot"></div>

                      <div className="text">Credit card</div>
                      <div className="pl-5 ml-2">
                        <img
                          width="160"
                          src="https://cdn.jotfor.ms/images/credit-card-logo.png"
                        />
                      </div>
                    </label>
                    <label for="option-2" className="option-2">
                      <div className="dot"></div>
                      <div className="text">Klarna</div>
                      <div className="pl-5 ml-5">
                        <img
                          width="50"
                          className="pr-2"
                          src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.png"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {method === "card" && (
                  <form onSubmit={submitHandler}>
                    <div className="sub-title p-3">Payment Information</div>
                    {checkoutError && <Message>{checkoutError}</Message>}{" "}
                    {isProcessing && <Loader />}
                    <div
                      className="row clearfix p-3"
                      style={{
                        boxShadow: " 0 2px 2px 0 rgba(0,0,0,0.2)",
                        backgroundColor: "white",
                      }}
                    >
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Name on card</label>

                        <div
                          style={{
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: "0.3em",
                            backgroundColor: "white",
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
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: "0.5em",
                            backgroundColor: "white",
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
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: "0.5em",
                            backgroundColor: "white",
                          }}
                        >
                          <CardExpiryElement />
                        </div>
                      </div>

                      <div className="form-group col-lg-6 col-md-6 col-sm-12">
                        <label>CVC Code</label>
                        <div
                          style={{
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: "0.5em",
                            backgroundColor: "white",
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
                        boxShadow: " 0 2px 2px 0 rgba(0,0,0,0.2)",
                        backgroundColor: "white",
                      }}
                    >
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Street</label>

                        <div
                          style={{
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: "0.3em",
                            backgroundColor: "white",
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
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: "0.3em",
                            backgroundColor: "white",
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
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: ".3em",
                            backgroundColor: "white",
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
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
                            padding: ".3em",
                            backgroundColor: "white",
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
                    <div style={{ padding: "20px 0" }}>
                      <button
                        className={`theme-btn btn-style-one ${
                          isProcessing && "isDisabled"
                        }`}
                        type="submit"
                        name="submit-form"
                      >
                        {isProcessing ? (
                          <Loader />
                        ) : (
                          <span className="txt">Confirm Checkout</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default Checkout;
