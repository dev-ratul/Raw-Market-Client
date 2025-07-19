import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentFrom from './PaymentFrom';

const stripePromise= loadStripe(import.meta.env.VITE_payment_key)

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentFrom></PaymentFrom>
            </Elements>
        </div>
    );
};

export default Payment;