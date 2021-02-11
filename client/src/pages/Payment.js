import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";

// ? avoid re-render of stripe object
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container text-center p-5">
      <h2>Complete your purchase</h2>
      <Elements stripe={promise}>
        <div className="col-md-6 offset-md-3">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
