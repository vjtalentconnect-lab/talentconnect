import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

/**
 * Send an email via Resend SDK.
 */
export const sendEmail = async ({ to, subject, html }) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured');
    }
    if (!FROM_EMAIL) {
        throw new Error('RESEND_FROM_EMAIL is not configured');
    }

    const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
    });

    if (error) {
        console.error('Resend email error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
};
