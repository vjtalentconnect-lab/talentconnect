import Stripe from 'stripe';
import { db } from '../lib/firebaseAdmin.js';
import { updateWithBackup } from '../lib/textBackup.js';
import { logger } from '../lib/logger.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper — get or create Stripe customer
const getOrCreateStripeCustomer = async (userId, email) => {
  const userDoc = await db.collection('users').doc(userId).get()
  const userData = userDoc.data()
  if (userData.stripeCustomerId) return userData.stripeCustomerId
  const customer = await stripe.customers.create({ email, metadata: { userId } })
  await db.collection('users').doc(userId).update({ stripeCustomerId: customer.id })
  return customer.id
}

// @desc    Create subscription for Studio Pro plan
// @route   POST /api/payment/create-subscription
// @access  Private
export const createSubscription = async (req, res) => {
  try {
    const { planType } = req.body
    if (planType !== 'studio_pro') return res.status(400).json({ message: 'Invalid plan' })
    if (!process.env.STRIPE_STUDIO_PRO_PRICE_ID) {
      return res.status(500).json({ message: 'Plan not configured — STRIPE_STUDIO_PRO_PRICE_ID missing' })
    }
    const customerId = await getOrCreateStripeCustomer(req.user.id, req.user.email)
    const existing = await stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 1 })
    if (existing.data.length > 0) {
      return res.status(200).json({ success: true, message: 'Already subscribed', alreadyActive: true })
    }
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_STUDIO_PRO_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: { userId: req.user.id, planType: 'studio_pro' },
    })
    res.status(200).json({
      success: true,
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
      status: subscription.status,
    })
  } catch (err) {
    logger.error({ err, userId: req.user.id }, 'Subscription create error')
    res.status(500).json({ message: 'Subscription creation failed' })
  }
}

// @desc    Create customer portal session
// @route   POST /api/payment/portal
// @access  Private
export const createPortalSession = async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get()
    const { stripeCustomerId } = userDoc.data()
    if (!stripeCustomerId) return res.status(400).json({ message: 'No subscription found' })
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: (process.env.FRONTEND_URL || 'http://localhost:5173') + '/settings',
    })
    res.status(200).json({ success: true, url: session.url })
  } catch (err) {
    logger.error({ err, userId: req.user.id }, 'Portal session error')
    res.status(500).json({ message: 'Could not create portal session' })
  }
}

// @desc    Get payment history
// @route   GET /api/payment/history
// @access  Private
export const getPaymentHistory = async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get()
    const { stripeCustomerId } = userDoc.data()
    if (!stripeCustomerId) return res.status(200).json({ success: true, data: [] })
    const invoices = await stripe.invoices.list({ customer: stripeCustomerId, limit: 20 })
    const history = invoices.data.map(inv => ({
      id: inv.id,
      amount: inv.amount_paid / 100,
      currency: inv.currency,
      status: inv.status,
      date: new Date(inv.created * 1000).toISOString(),
      invoiceUrl: inv.hosted_invoice_url,
      pdfUrl: inv.invoice_pdf,
    }))
    res.status(200).json({ success: true, data: history })
  } catch (err) {
    logger.error({ err, userId: req.user.id }, 'Payment history error')
    res.status(500).json({ message: 'Could not fetch payment history' })
  }
}

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
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.error('[Payment] STRIPE_WEBHOOK_SECRET is not set - webhook verification will fail');
        return res.status(500).json({ error: 'Webhook endpoint not configured' });
    }

    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('[Payment] Webhook signature failed:', err.message, '- ensure STRIPE_WEBHOOK_SECRET matches your Stripe dashboard endpoint secret');
        return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
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
                    logger.error({ paymentIntentId: paymentIntent.id }, '[Stripe] Missing metadata in payment intent');
                    break;
                }
                const userRef = db.collection('users').doc(userId);
                const userDoc = await userRef.get();
                if (!userDoc.exists) {
                    logger.error({ userId }, '[Stripe] User not found for payment');
                    break;
                }
                await userRef.update({
                    plan: planType,
                    subscriptionStatus: 'active',
                    stripePaymentIntentId: paymentIntent.id,
                    planActivatedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                logger.info({ userId, planType }, '[Payment] Plan upgraded for user');
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
                        logger.warn({ userId: pi.metadata.userId }, '[Stripe] User not found for payment failure');
                    }
                }
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object
                if (subscription.metadata?.userId) {
                    await updateWithBackup('users', subscription.metadata.userId, {
                        plan: 'free', subscriptionStatus: 'cancelled',
                        stripeSubscriptionId: null, updatedAt: new Date().toISOString()
                    })
                    logger.info({ userId: subscription.metadata.userId }, 'Subscription cancelled')
                }
                break
            }
            case 'invoice.payment_succeeded': {
                const invoice = event.data.object
                if (!invoice.subscription) break
                const subscription = await stripe.subscriptions.retrieve(invoice.subscription)
                const userId = subscription.metadata?.userId
                if (userId) {
                    await updateWithBackup('users', userId, {
                        plan: 'studio_pro', subscriptionStatus: 'active',
                        stripeSubscriptionId: subscription.id, updatedAt: new Date().toISOString()
                    })
                    logger.info({ userId }, 'Subscription renewed')
                }
                break
            }
            default:
                logger.info({ eventType: event.type }, 'Unhandled event type');
        }

return res.json({ received: true });
    } catch (err) {
        console.error('[Stripe] Webhook processing error:', err);
        return res.status(500).json({ error: 'Webhook processing failed' });
    }
};
