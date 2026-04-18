import { sendEmail, wrapEmailTemplate } from './email.js'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

export const sendApplicationShortlistedEmail = async ({ talentEmail, talentName, projectTitle, directorName }) => {
  try {
    const html = wrapEmailTemplate({
      title: 'You have been shortlisted!',
      body: `<p>Hi ${talentName},</p><p>Great news — <strong>${directorName}</strong> has shortlisted you for <strong>${projectTitle}</strong>. You are one step closer to being selected.</p><p>Log in to check your application status and prepare for the next stage.</p>`,
      ctaLabel: 'View Application',
      ctaLink: FRONTEND_URL + '/talent/applications',
      footer: 'This is an automated notification from TalentConnect.',
    })
    await sendEmail({ to: talentEmail, subject: 'You have been shortlisted — ' + projectTitle, html })
    console.info('[Email] Shortlist email sent to:', talentEmail)
  } catch (err) {
    console.error('[Email] Failed to send shortlist email:', err.message)
  }
}

export const sendAuditionScheduledEmail = async ({ talentEmail, talentName, projectTitle, auditionDate, auditionLocation, auditionNotes }) => {
  try {
    const html = wrapEmailTemplate({
      title: 'Audition scheduled',
      body: `<p>Hi ${talentName},</p><p>Your audition for <strong>${projectTitle}</strong> has been scheduled.</p><ul><li><strong>Date:</strong> ${new Date(auditionDate).toLocaleDateString('en-IN', { dateStyle: 'full' })}</li><li><strong>Location:</strong> ${auditionLocation || 'To be confirmed'}</li>${auditionNotes ? `<li><strong>Notes:</strong> ${auditionNotes}</li>` : ''}</ul><p>Make sure your profile and portfolio are up to date before your audition.</p>`,
      ctaLabel: 'View Audition Details',
      ctaLink: FRONTEND_URL + '/talent/auditions',
      footer: 'This is an automated notification from TalentConnect.',
    })
    await sendEmail({ to: talentEmail, subject: 'Audition scheduled — ' + projectTitle, html })
    console.info('[Email] Audition email sent to:', talentEmail)
  } catch (err) {
    console.error('[Email] Failed to send audition email:', err.message)
  }
}

export const sendSelectedEmail = async ({ talentEmail, talentName, projectTitle, directorName }) => {
  try {
    const html = wrapEmailTemplate({
      title: 'Congratulations — you have been selected!',
      body: `<p>Hi ${talentName},</p><p>Congratulations! <strong>${directorName}</strong> has selected you for <strong>${projectTitle}</strong>.</p><p>Log in to your dashboard to view the next steps and get in touch with the director.</p>`,
      ctaLabel: 'View Your Dashboard',
      ctaLink: FRONTEND_URL + '/talent/dashboard',
      footer: 'This is an automated notification from TalentConnect.',
    })
    await sendEmail({ to: talentEmail, subject: 'You have been selected — ' + projectTitle, html })
    console.info('[Email] Selection email sent to:', talentEmail)
  } catch (err) {
    console.error('[Email] Failed to send selection email:', err.message)
  }
}

export const sendApplicationRejectedEmail = async ({ talentEmail, talentName, projectTitle }) => {
  try {
    const html = wrapEmailTemplate({
      title: 'Application update',
      body: `<p>Hi ${talentName},</p><p>Thank you for applying to <strong>${projectTitle}</strong>. After careful consideration, the director has decided to move forward with other candidates for this role.</p><p>Keep your profile updated and continue applying — your next opportunity is out there.</p>`,
      ctaLabel: 'Browse Open Projects',
      ctaLink: FRONTEND_URL + '/talent/projects',
      footer: 'This is an automated notification from TalentConnect.',
    })
    await sendEmail({ to: talentEmail, subject: 'Application update — ' + projectTitle, html })
    console.info('[Email] Rejection email sent to:', talentEmail)
  } catch (err) {
    console.error('[Email] Failed to send rejection email:', err.message)
  }
}

export const sendVerificationApprovedEmail = async ({ userEmail, userName }) => {
  try {
    const html = wrapEmailTemplate({
      title: 'Your profile has been verified!',
      body: `<p>Congratulations, ${userName || 'artist'}!</p><p>Your TalentConnect profile has been <strong>verified</strong> by our team. You now have a verified badge and full access to all platform features.</p>`,
      ctaLabel: 'View Your Profile',
      ctaLink: FRONTEND_URL + '/talent/portfolio',
      footer: 'Your verification was approved by the TalentConnect team.',
    })
    await sendEmail({ to: userEmail, subject: 'Your profile is now verified — TalentConnect', html })
    console.info('[Email] Verification approved email sent to:', userEmail)
  } catch (err) {
    console.error('[Email] Failed to send verification email:', err.message)
  }
}