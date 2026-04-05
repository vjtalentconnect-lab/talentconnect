import Stripe from 'stripe';
import { db } from '../lib/firebaseAdmin.js';
import { updateWithBackup } from '../lib/textBackup.js';

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

        // Webhook is now the authoritative source for plan activation; this remains as a secondary/backfill path.
        if (paymentIntent.status === 'succeeded') {
            // Update user subscription status
            const userRef = db.collection('users').doc(req.user.id);
            const userDoc = await userRef.get();
            if (!userDoc.exists) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user plan
            await updateWithBackup('users', req.user.id, {
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

const eventRef = db.collection('processedWebhookEvents').doc(event.id);

    try {
        let alreadyProcessed = false;
        try {
            await eventRef.create({
                eventId: event.id,
                type: event.type,
                processedAt: new Date().toISOString()
            });
        } catch (createErr) {
            if (createErr.code === 6 || (createErr.message && createErr.message.includes('already exists'))) {
                console.log('[Stripe] Duplicate webhook event ignored:', event.id);
                alreadyProcessed = true;
            } else {
                throw createErr;
            }
        }

        if (alreadyProcessed) {
            return res.json({ received: true });
        }

        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                const { userId, planType } = paymentIntent.metadata || {};
                if (!userId || !planType) {
                    console.error('[Stripe] Missing metadata in payment intent:', paymentIntent.id);
                    break;
                }
                const userRef = db.collection('users').doc(userId);
                const userDoc = await userRef.get();
                if (!userDoc.exists) {
                    console.error('[Stripe] User not found for payment:', userId);
                    break;
                }
                await userRef.update({
                    plan: planType,
                    subscriptionStatus: 'active',
                    stripePaymentIntentId: paymentIntent.id,
                    planActivatedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                console.info('[Payment] Plan upgraded for user:', userId, 'to:', planType);
                break;
            }
case 'payment_intent.payment_failed': {
                const pi = event.data.object;
                if (pi.metadata?.userId) {
                    const userRef = db.collection('users').doc(pi.metadata.userId);
                    const userDoc = await userRef.get();
                    if (userDoc.exists) {
                        await userRef.update({
                            subscriptionStatus: 'inactive',
                            updatedAt: new Date().toISOString()
                        });
                    } else {
                        console.warn('[Stripe] User not found for payment failure:', pi.metadata.userId);
                    }
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

return res.json({ received: true });
    } catch (err) {
        console.error('[Stripe] Webhook processing error:', err);
        return res.status(500).json({ error: 'Webhook processing failed' });
    }
};
