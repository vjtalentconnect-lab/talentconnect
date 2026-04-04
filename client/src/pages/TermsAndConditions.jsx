import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';

const TermsAndConditions = () => {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              By accessing and using TalentConnect, you agree to the following terms. Please read them carefully
              before using our platform.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 md:p-12 shadow-sm space-y-12">

            {/* 1. Acceptance of Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  By creating an account, accessing, or using TalentConnect ("the Platform"), you agree to be bound by
                  these Terms and Conditions ("Terms"). If you do not agree to these Terms, you must not use the Platform.
                </p>
                <p>
                  TalentConnect is a digital platform that connects performing arts talent — including actors, models,
                  dancers, musicians, voice artists, cinematographers, editors, and other entertainment professionals —
                  with directors, production houses, and casting professionals across the global film and entertainment industry.
                </p>
                <p>
                  These Terms apply to all users of the Platform, including talent ("Artists"), directors, production
                  companies ("Directors"), and visitors.
                </p>
              </div>
            </div>

            {/* 2. Eligibility & Account Registration */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                2. Eligibility &amp; Account Registration
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>To use TalentConnect, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years of age</li>
                  <li>Provide accurate, current, and complete registration information</li>
                  <li>Maintain and update your information to keep it accurate and current</li>
                  <li>Be responsible for safeguarding your account credentials</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p>
                  You are responsible for all activities that occur under your account. TalentConnect reserves the right
                  to suspend or terminate accounts that provide false or misleading information.
                </p>
              </div>
            </div>

            {/* 3. User Roles & Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                3. User Roles &amp; Responsibilities
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">For Talent (Artists)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain an accurate and up-to-date portfolio, including photos, videos, and professional details</li>
                  <li>Apply to projects honestly, representing your skills, experience, and availability accurately</li>
                  <li>Respond to audition invitations and communication from directors in a timely manner</li>
                  <li>Upload only content you own or have authorization to share</li>
                  <li>Complete the verification process to build trust on the platform</li>
                </ul>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mt-4">For Directors &amp; Productions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate project descriptions, roles, timelines, and compensation details</li>
                  <li>Respond to applications professionally and within reasonable timeframes</li>
                  <li>Use the platform's messaging and audition tools for all professional communications</li>
                  <li>Respect the time and effort of talent who apply to your projects</li>
                  <li>Not use the platform to collect personal data for purposes outside the scope of casting and production</li>
                </ul>
              </div>
            </div>

            {/* 4. Content & Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                4. Content &amp; Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">Your Content</h3>
                <p>
                  You retain ownership of all content you upload to TalentConnect, including photos, videos, portfolio
                  media, profile information, and messages ("User Content"). By uploading content, you grant TalentConnect
                  a non-exclusive, worldwide, royalty-free license to use, display, and distribute your User Content
                  solely for the purpose of operating and improving the Platform.
                </p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mt-4">Prohibited Content</h3>
                <p>You agree not to upload, post, or share content that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Infringes on any third party's intellectual property or privacy rights</li>
                  <li>Contains false, misleading, or deceptive information</li>
                  <li>Is defamatory, obscene, hateful, or discriminatory</li>
                  <li>Promotes illegal activities or violates any applicable law</li>
                  <li>Contains malware, viruses, or harmful code</li>
                  <li>Includes sexually explicit material unrelated to legitimate professional purposes</li>
                </ul>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mt-4">Platform Content</h3>
                <p>
                  All TalentConnect branding, design elements, software, and platform features are the exclusive property
                  of TalentConnect and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>
            </div>

            {/* 5. Projects, Applications & Transactions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                5. Projects, Applications &amp; Transactions
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  TalentConnect facilitates connections between talent and productions. The following terms govern project
                  and application interactions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800 dark:text-zinc-200">No Employment Relationship:</strong> TalentConnect does not employ any talent and is not a party to any agreement between users. The Platform serves as a discovery and communication tool only.</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Project Responsibility:</strong> Directors are solely responsible for the accuracy of their project listings and for honoring commitments made to talent.</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Compensation:</strong> Any compensation arrangements are strictly between the talent and the production. TalentConnect is not responsible for payment disputes.</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">Application Accuracy:</strong> Talent must ensure their applications and auditions represent their genuine abilities and availability.</li>
                  <li><strong className="text-gray-800 dark:text-zinc-200">No Guarantee:</strong> TalentConnect does not guarantee that applying to projects will result in casting, auditions, or employment.</li>
                </ul>
              </div>
            </div>

            {/* 6. Verification & Trust */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                6. Verification &amp; Trust
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  TalentConnect offers a verification process to help build trust within the community. Verification may
                  include identity confirmation, professional membership validation, and video selfie verification.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Verification status is displayed on your profile to help directors assess credibility</li>
                  <li>Providing false verification documents is grounds for immediate account termination</li>
                  <li>TalentConnect verifies identity documents but does not guarantee the quality of work or professionalism of verified users</li>
                  <li>Verification status may be revoked if we discover fraudulent submissions</li>
                </ul>
              </div>
            </div>

            {/* 7. Prohibited Activities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                7. Prohibited Activities
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create multiple accounts or misrepresent your identity</li>
                  <li>Use the platform for any illegal or unauthorized purpose</li>
                  <li>Harass, threaten, or discriminate against other users</li>
                  <li>Scrape, harvest, or collect user data without authorization</li>
                  <li>Use automated bots or scripts to interact with the platform</li>
                  <li>Attempt to circumvent security measures or access restricted areas</li>
                  <li>Post spam, advertisements, or unsolicited promotional content</li>
                  <li>Share login credentials or allow unauthorized access to your account</li>
                  <li>Interfere with or disrupt the platform's services or servers</li>
                  <li>Use the platform to recruit for activities outside legitimate film and entertainment production</li>
                </ul>
              </div>
            </div>

            {/* 8. Termination */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                8. Account Termination
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  You may terminate your account at any time through your account settings. Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your profile will no longer be visible or discoverable on the platform</li>
                  <li>Active applications may be withdrawn automatically</li>
                  <li>Certain data may be retained as described in our Privacy Policy</li>
                </ul>
                <p>
                  TalentConnect reserves the right to suspend or terminate your account at any time, with or without notice,
                  for conduct that violates these Terms, is harmful to other users, or exposes TalentConnect to legal liability.
                </p>
              </div>
            </div>

            {/* 9. Disclaimers & Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                9. Disclaimers &amp; Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  TalentConnect is provided "as is" and "as available" without warranties of any kind, either express or implied.
                  We do not guarantee that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The platform will be uninterrupted, secure, or error-free</li>
                  <li>User profiles, projects, or applications will produce specific results</li>
                  <li>The quality of any talent, productions, or services obtained through the platform will meet your expectations</li>
                  <li>All information on the platform is accurate, complete, or current</li>
                </ul>
                <p>
                  To the maximum extent permitted by law, TalentConnect shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from
                  your use of the platform.
                </p>
              </div>
            </div>

            {/* 10. Indemnification */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                10. Indemnification
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  You agree to indemnify and hold harmless TalentConnect, its officers, directors, employees, and agents from
                  any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the
                  Platform, your User Content, your violation of these Terms, or your violation of any rights of a third party.
                </p>
              </div>
            </div>

            {/* 11. Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                11. Governing Law &amp; Dispute Resolution
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from
                  these Terms or your use of the Platform shall first be attempted to be resolved through good-faith negotiation.
                  If a resolution cannot be reached, disputes shall be submitted to binding arbitration in accordance with
                  applicable arbitration rules.
                </p>
              </div>
            </div>

            {/* 12. Changes to Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                12. Changes to These Terms
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  TalentConnect reserves the right to modify these Terms at any time. We will notify users of material changes
                  via email or through a prominent notice on the Platform. Your continued use of the Platform after changes
                  are posted constitutes your acceptance of the updated Terms.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h2>
              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-600 dark:text-zinc-400">
                  <span className="material-icons text-primary text-sm">email</span>
                  <a href="mailto:legal@talentconnect.io" className="text-primary hover:underline">legal@talentconnect.io</a>
                </p>
                <p className="flex items-center gap-2 text-gray-600 dark:text-zinc-400">
                  <span className="material-icons text-primary text-sm">support_agent</span>
                  <Link to="/help-support" className="text-primary hover:underline">Help &amp; Support Center</Link>
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

export default TermsAndConditions;
