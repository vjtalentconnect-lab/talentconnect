import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here');

const StripeProvider = ({ children }) => {
    const options = {
        // passing the client secret obtained from the server
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