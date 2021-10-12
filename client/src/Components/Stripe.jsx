import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

export function Stripe ({ price }) {
  const priceForStripe = price * 100
  const pubKey = "pk_test_51JiQXrA9KGSbPf51hDbp1prE3XtehsPq5LZb87f4xRFkRun9VJeIWK3E9A4MNaQ4V8Z7un6FX9j63q2cGq0kZcDu00eenk0NQd"

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert('Payment successful');
      })
      .catch((err) => {
        console.log('Payment error', err);
        alert(
          'There was an issue with your payment. Please make sure you use the provided credit card'
        );
      });
  };

  return (
      <StripeCheckout
      label="Donate Now" 
      name="Event Calendar"
      billingAddress
      shippingAddress
      description={`Donation of $${price}`}
      amount={priceForStripe}
      panelLabel="Donate"
      token={onToken}
      stripeKey={pubKey}
       />
      
  );
}