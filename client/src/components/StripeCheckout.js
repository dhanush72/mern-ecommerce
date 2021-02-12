import React, { useState, useEffect } from "react";
import "../assets/styles/stripe.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { createOrder, emptyUserCart } from "../functions/user";

const cartStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [payable, setPayable] = useState("");

  const { user, coupon } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPayment(coupon, user.token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setPayable(res.data.payable);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setProcessing(false);
      setError(`Payment failed ${payload.error.message}`);
    } else {
      //* result
      createOrder(payload, user.token).then((res) => {
        //* empty lcoal storage
        if (res.data.ok) {
          if (typeof window !== undefined) {
            localStorage.removeItem("cart");
          }
        }
        //* empty redux
        dispatch({ type: "ADD_TO_CART", payload: [] });
        //* reset coupon
        dispatch({ type: "COUPON_APPLIED", payload: false });
      });
      //* empty cart from db
      emptyUserCart(user.token);
      setProcessing(false);
      setError(null);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">
              Total after discount: ₹{totalAfterDiscount}
            </p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}

      <Card
        className="payment-card mb-4n"
        actions={[
          <>
            <DollarOutlined className="text-primary" /> <br />
            Total: ₹{cartTotal}
          </>,
          <>
            <CheckOutlined className="text-success" /> <br />
            Pay: ₹{(payable / 100).toFixed(2)}
          </>,
        ]}
      />
      <form className="stripe-form" id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="stripe-button pointer"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <hr />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful. <Link to="/user/history">View History</Link>
        </p>
        {error && (
          <div id="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default StripeCheckout;
