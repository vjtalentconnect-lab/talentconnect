import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';

const PrivacyPolicy = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-zinc-100 min-h-screen">
      <TopNav />
      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-6 rounded-full">
              Last Updated: April 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Your privacy matters to us. This policy explains how TalentConnect collects, uses, and protects
              your personal information across our global talent discovery platform.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 md:p-12 shadow-sm space-y-12">

            {/* 1. Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>When you use TalentConnect, we collect information to provide and improve our services:</p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mt-4">Account &amp; Profile Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, phone number, and location</li>
                  <li>Profile photographs and portfolio media (images, videos, showreels)</li>
                  <li>Talent category, skills, physical attributes, and professional experience</li>
                  <li>Verification documents (ID files, membership cards, video selfies)</li>
                  <li>For directors: production house details, company name, and project information</li>
                </ul>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mt-4">Usage &amp; Device Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Log data including IP address, browser type, and access times</li>
                  <li>Device identifiers and operating system information</li>
                  <li>Pages visited, features used, and interaction patterns on the platform</li>
                  <li>Communication metadata from in-platform messaging</li>
                </ul>
              </div>
            </div>

            {/* 2. How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800 dark:text-zinc-200">Talent Matching:</strong> Connecting talent with relevant casting calls, auditions, and production opportunities</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Profile Verification:</strong> Authenticating identities and verifying professional credentials to maintain platform trust</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Communication:</strong> Facilitating secure messaging between talent and directors, and sending notifications about applications, auditions, and project updates</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Platform Improvement:</strong> Analyzing usage patterns to enhance features, fix issues, and develop new tools for the entertainment community</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Safety &amp; Security:</strong> Detecting and preventing fraud, abuse, and violations of our terms of service</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Legal Compliance:</strong> Meeting regulatory requirements and responding to lawful requests</li>
                </ul>
              </div>
            </div>

            {/* 3. Information Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                3. Information Sharing &amp; Disclosure
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>We share your information only in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800 dark:text-zinc-200">With Directors/Productions:</strong> When you apply to a project, the relevant director and their team can view your public profile, portfolio, and application details</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">With Talent:</strong> Directors who post projects have their public profile and company information visible to applicants</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Service Providers:</strong> Trusted third-party services that help us operate the platform (cloud storage, payment processing, analytics)</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Safety:</strong> To protect the rights, property, or safety of TalentConnect, our users, or the public</li>
                </ul>
                <p className="mt-4 bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <strong className="text-gray-800 dark:text-zinc-200">We never sell your personal data to third parties.</strong> Your information is used solely to facilitate talent discovery and professional connections within the entertainment industry.
                </p>
              </div>
            </div>

            {/* 4. Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                4. Data Security
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encrypted data transmission using TLS/SSL protocols</li>
                  <li>Secure cloud infrastructure with access controls and monitoring</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Strict access controls for employee access to user data</li>
                  <li>Secure handling and storage of verification documents</li>
                </ul>
              </div>
            </div>

            {/* 5. Your Rights & Choices */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                5. Your Rights &amp; Choices
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800 dark:text-zinc-200">Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Correction:</strong> Update or correct inaccurate profile information at any time through your account settings</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Deletion:</strong> Request deletion of your account and associated personal data</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Portability:</strong> Request your data in a structured, machine-readable format</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Opt-Out:</strong> Control notification preferences and marketing communications</li>
                </ul>
                <p>
                  To exercise any of these rights, contact us at{' '}
                  <a href="mailto:privacy@talentconnect.io" className="text-primary hover:underline">privacy@talentconnect.io</a>.
                </p>
              </div>
            </div>

            {/* 6. Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                6. Data Retention
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  We retain your personal data for as long as your account is active or as needed to provide our services.
                  When you delete your account, we will delete or anonymize your personal information within 30 days,
                  except where we are required to retain it for legal, regulatory, or legitimate business purposes.
                </p>
                <p>
                  Portfolio media, application records, and communication history may be retained for a limited period
                  to resolve disputes, enforce agreements, or comply with legal obligations.
                </p>
              </div>
            </div>

            {/* 7. Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                7. Cookies &amp; Tracking
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  TalentConnect uses cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800 dark:text-zinc-200">Essential Cookies:</strong> Required for authentication, security, and core platform functionality</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Preference Cookies:</strong> Remember your settings such as theme preference (light/dark mode) and language</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Analytics Cookies:</strong> Help us understand how users interact with the platform to improve features</li>
                </ul>
                <p>
                  You can manage cookie preferences through your browser settings. Disabling essential cookies may affect platform functionality.
                </p>
              </div>
            </div>

            {/* 8. Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                8. Children's Privacy
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  TalentConnect is intended for users aged 18 and above. We do not knowingly collect personal information
                  from minors under 18. If you are a parent or guardian and believe your child has provided us with personal
                  data, please contact us immediately at{' '}
                  <a href="mailto:safety@talentconnect.io" className="text-primary hover:underline">safety@talentconnect.io</a>{' '}
                  so we can take appropriate action.
                </p>
              </div>
            </div>

            {/* 9. International Users */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                9. International Data Transfers
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  TalentConnect operates globally, connecting talent across film industries worldwide. Your information may
                  be transferred to and processed in countries other than your own. We ensure that such transfers comply with
                  applicable data protection laws and that your data remains protected regardless of where it is processed.
                </p>
              </div>
            </div>

            {/* 10. Changes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                10. Changes to This Policy
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by posting
                  the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy
                  periodically.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Questions or Concerns?</h2>
              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please reach out to us:
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-600 dark:text-zinc-400">
                  <span className="material-icons text-primary text-sm">email</span>
                  <a href="mailto:privacy@talentconnect.io" className="text-primary hover:underline">privacy@talentconnect.io</a>
                </p>
                <p className="flex items-center gap-2 text-gray-600 dark:text-zinc-400">
                  <span className="material-icons text-primary text-sm">location_on</span>
                  TalentConnect Global HQ, Los Angeles, CA, USA
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img src="/TC Logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-display font-bold text-xl tracking-wide text-white">
                  TALENT<span className="text-primary">CONNECT</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Building the future of world cinema through transparency, technology, and pure
                talent — across every film industry on the planet.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><Link className="hover:text-primary transition-colors" to="/find-talent">Find Talent</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/find-work">Find Work</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/productions">Productions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link className="hover:text-primary transition-colors" to="/about-us">About Us</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/contact-us">Contact Us</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/success-stories">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal &amp; Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link className="hover:text-primary transition-colors" to="/terms-and-conditions">Terms of Service</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/help-support">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
            © 2026 TALENT<span className="text-primary">CONNECT</span> • Where World Cinema Talent Meets Opportunity
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
