import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ planType, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setMessage('');

        try {
            // Create payment intent on the server
            const { data } = await axios.post('/api/payment/create-payment-intent', {
                planType: planType
            });

            const { clientSecret } = data;

            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (error) {
                setMessage(error.message);
                onError && onError(error);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Confirm payment on server
                await axios.post('/api/payment/confirm-payment', {
                    paymentIntentId: paymentIntent.id
                });

                setMessage('Payment successful!');
                onSuccess && onSuccess(paymentIntent);
            }
        } catch (error) {
            setMessage('Payment failed. Please try again.');
            onError && onError(error);
        }

        setIsProcessing(false);
    };

    const cardStyle = {
        style: {
            base: {
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#9ca3af',
                },
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Card Details
                </label>
                <div className="bg-surface-dark border border-border-dark rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                    <CardElement options={cardStyle} />
                </div>
            </div>

            {message && (
                <div className={`text-sm p-3 rounded-lg ${
                    message.includes('successful')
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                    {message}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
            >
                {isProcessing ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined">lock</span>
                        Pay $999.00
                    </>
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;