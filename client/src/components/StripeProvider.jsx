import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const StripeProvider = ({ children }) => {
    if (!stripeKey || stripeKey.includes('your_stripe')) {
        throw new Error('VITE_STRIPE_PUBLISHABLE_KEY is not set.');
    }

    const options = {
        fonts: [
            {
                cssSrc: 'https://fonts.googleapis.com/css?family=Inter:400,500,600,700',
            },
        ],
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
};

export default StripeProvider;
