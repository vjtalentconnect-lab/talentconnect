import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    SMTP_FROM_EMAIL,
} = process.env;

// Create a single reusable transporter at module load
let transporter = null;
const buildTransporter = () => {
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM_EMAIL) {
        throw new Error('SMTP configuration missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL');
    }
    const secure = SMTP_SECURE === 'true' || SMTP_PORT === '465';
    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
};

/**
 * Brand-friendly email shell used by all templates.
 */
const wrapEmail = ({ title, body, ctaLabel, ctaLink, footer }) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0f0a0d;padding:32px 0;font-family:'Segoe UI',Arial,sans-serif;color:#f5f5f5;">
  <tr>
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="560" style="background:#1b1218;border-radius:16px;overflow:hidden;border:1px solid #2c1c25;box-shadow:0 25px 70px rgba(0,0,0,0.45);">
        <tr>
          <td style="padding:28px 32px;border-bottom:1px solid #241720;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#ee2b3b,#7c0a16);display:flex;align-items:center;justify-content:center;">
                <span style="font-size:18px;font-weight:900;color:#fff;font-family:'Segoe UI',Arial;">TC</span>
              </div>
              <div>
                <div style="font-size:14px;letter-spacing:0.12em;font-weight:800;color:#f5f5f5; text-transform:uppercase;">TALENTCONNECT</div>
                <div style="font-size:11px;letter-spacing:0.24em;color:#ee2b3b;font-weight:700; text-transform:uppercase;">India • Artist</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 12px 32px;">
            <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#fff;font-weight:900;">${title}</h1>
            <div style="font-size:14px;line-height:1.7;color:#e7e0e4;">${body}</div>
          </td>
        </tr>
        ${ctaLabel && ctaLink ? `
        <tr>
          <td style="padding:0 32px 24px;">
            <a href="${ctaLink}" style="display:inline-block;background:#ee2b3b;color:#fff;text-decoration:none;font-weight:800;font-size:14px;padding:12px 18px;border-radius:12px;box-shadow:0 12px 30px rgba(238,43,59,0.35);"> ${ctaLabel} → </a>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding:0 32px 28px;color:#8f7f88;font-size:12px;line-height:1.6;">
            ${footer || 'If you did not request this, you can safely ignore this email.'}
          </td>
        </tr>
      </table>
      <div style="margin-top:12px;color:#6b5a63;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
        © TalentConnect • Secure access communications
      </div>
    </td>
  </tr>
</table>
`;

export const buildVerificationEmail = (verifyLink) =>
    wrapEmail({
        title: 'Verify your email to activate TalentConnect',
        body: `
            <p>Thanks for joining TalentConnect! Confirm your email to unlock audition invites, project applications, and messaging.</p>
            <p style="margin-top:12px;">If the button doesn’t work, copy this link into your browser:<br/><span style="color:#ee2b3b;">${verifyLink}</span></p>
        `,
        ctaLabel: 'Verify Email',
        ctaLink: verifyLink,
        footer: 'This link expires in 24 hours.',
    });

export const buildResetPasswordEmail = (resetLink) =>
    wrapEmail({
        title: 'Reset your TalentConnect password',
        body: `
            <p>We received a request to reset your password.</p>
            <p>Click below to set a new one. If you didn’t make this request, you can safely ignore this email.</p>
            <p style="margin-top:12px;">Direct link:<br/><span style="color:#ee2b3b;">${resetLink}</span></p>
        `,
        ctaLabel: 'Reset Password',
        ctaLink: resetLink,
        footer: 'This link expires in 1 hour.',
    });

/**
 * Send an email via Nodemailer (SMTP). Throws if configuration is missing.
 */
export const sendEmail = async ({ to, subject, html }) => {
    if (!transporter) {
        buildTransporter();
    }

    const mailOptions = {
        from: SMTP_FROM_EMAIL,
        to: Array.isArray(to) ? to.join(',') : to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error('SMTP email error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};
