import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/orderAction";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const StripeCheckoutForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClienSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const ID = match.params.bootcampId;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const { success: orderSuccess } = useSelector((state) => state.orderCreate);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userDetail.token,
    },
  };

  useEffect(() => {
    if (orderSuccess) {
      history.push(`/confirmation-card-purchase/${ID}`);
    }
  }, [orderSuccess, ID, history]);

  useEffect(() => {
    const customCheckout = async () => {
      const { data: clientSecret } = await axios.post(
        `https://ccab-server.up.railway.app/api/order/stripe/stripe-payment-intent`,
        {
          amount: 100,
          receipt_email: userDetail.email,
        },
        config
      );

      setClienSecret(clientSecret);
    };

    customCheckout();
  }, []);

  const handleCheckout = async () => {
    setProcessing(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      }
    );

    if (paymentIntent.status === "succeeded") {
      dispatch(
        createOrder(ID, {
          token: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: "usd",
        })
      );
    }

    setProcessing(false);

    if (error) {
      setError(`Payment Failed: ${error.message}`);
    }
  };

  const cardHandleChange = (event) => {
    const { error } = event;
    setError(error ? error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: "Roboto, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#606060",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="checkout my-5">
      <h2>Checkout Summary</h2>
      <h3>{`Item: ${"Bootcamp"}`}</h3>
      <h4>{`Amount to Pay: $${100}`}</h4>
      <h4>Enter Payment Details</h4>
      <div className="stripe-card">
        <CardNumberElement
          className="card-element"
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className="stripe-card">
        <CardExpiryElement
          className="card-element"
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className="stripe-card">
        <CardCvcElement
          className="card-element"
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className="submit-btn">
        <button
          disabled={processing}
          className="button is-black nomad-btn submit"
          onClick={() => handleCheckout()}
        >
          {processing ? "PROCESSING" : "PAY"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

const StripeCheckout = (props) => (
  <Elements stripe={stripePromise}>
    <StripeCheckoutForm {...props} />
  </Elements>
);

export default StripeCheckout;
