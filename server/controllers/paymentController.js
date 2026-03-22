import Stripe from 'stripe';
import { db } from '../lib/firebaseAdmin.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent for subscription upgrade
// @route   POST /api/payment/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
    try {
        const { planType } = req.body; // 'studio_pro' or other plans

        // Define plan prices (in cents)
        const planPrices = {
            studio_pro: 9900, // $99 per month
            // Add other plans as needed
        };

        if (!planPrices[planType]) {
            return res.status(400).json({ message: 'Invalid plan type' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: planPrices[planType],
            currency: 'usd',
            metadata: {
                userId: req.user.id,
                planType: planType
            }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({ message: 'Payment processing failed' });
    }
};

// @desc    Confirm payment and upgrade user
// @route   POST /api/payment/confirm-payment
// @access  Private
export const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Update user subscription status
            const userRef = db.collection('users').doc(req.user.id);
            const userDoc = await userRef.get();
            if (!userDoc.exists) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user plan
            await userRef.update({
                plan: paymentIntent.metadata.planType,
                subscriptionStatus: 'active',
                updatedAt: new Date().toISOString()
            });

            res.status(200).json({
                success: true,
                message: 'Payment confirmed and subscription activated'
            });
        } else {
            res.status(400).json({ message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ message: 'Payment confirmation failed' });
    }
};

// @desc    Handle Stripe webhooks
// @route   POST /api/payment/webhook
// @access  Public (Stripe webhook)
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Update user subscription status
            console.log('Payment succeeded:', paymentIntent.id);
            break;
        case 'payment_intent.payment_failed':
            console.log('Payment failed:', event.data.object.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};