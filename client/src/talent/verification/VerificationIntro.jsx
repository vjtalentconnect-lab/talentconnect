import React from 'react';

const VerificationIntro = ({ onStart }) => {
    return (
        <div className="max-w-[800px] w-full flex flex-col gap-10">
            {/* Hero Section */}
            <section className="w-full">
                <div className="relative overflow-hidden rounded-xl min-h-[300px] flex flex-col justify-end p-8 bg-gradient-to-t from-background-dark to-transparent shadow-2xl" style={{ backgroundImage: "linear-gradient(0deg, rgba(34, 22, 16, 0.9) 0%, rgba(34, 22, 16, 0.2) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBibNiYWMKS6KjzgR55vH7ak1q8YcO3hn9y9EapT3m_m2EptWlOh2wZE4lGT6zx6GYmN_k4FSIMy8Qfljc_vyTVRmGSHDB4_tmQSN0acBV9K4Kf7Lof8A87bzITAnx8d8ullyKiPgYxl10oMHiZXyPe1QIl1K5fQ7ALtaWb2912iuGx4ZmBv-xNIz9Cdr32-j44UYLjAUwCjcSOPsvqIUZfX9GpbU-L6Z1hi_n7j7lgwHo8WybjmR5wr1aqs-l-jhflOGwbHcSJWFk3')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="inline-flex items-center gap-2 bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-4 w-fit">
                        <span className="material-symbols-outlined !text-sm">verified</span> Verified Artist Program
                    </div>
                    <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-2">Get Verified</h1>
                    <p className="text-slate-300 text-lg max-w-xl">Join the elite circle of verified talent and unlock premium casting opportunities across India.</p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 hover:bg-primary/10 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined !text-3xl">verified_user</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">Trust Badge</h3>
                        <p className="text-slate-600 dark:text-slate-400">Build instant credibility with casting directors and production houses through our verified seal.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 hover:bg-primary/10 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined !text-3xl">trending_up</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">Priority Search</h3>
                        <p className="text-slate-600 dark:text-slate-400">Verified profiles appear 3x more often in relevant talent searches and filter results.</p>
                    </div>
                </div>
            </section>

            {/* Verification Steps */}
            <section className="bg-slate-100 dark:bg-primary/5 rounded-2xl p-8 border border-slate-200 dark:border-primary/10">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">checklist</span>
                    The Verification Process
                </h2>
                <div className="space-y-8 relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-primary/20 hidden md:block"></div>
                    <div className="flex flex-col md:flex-row gap-6 relative z-10">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">1</div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                                Identity Verification
                                <span className="material-symbols-outlined text-primary !text-lg">badge</span>
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">Upload a government-issued ID (Aadhar, Passport, or PAN) to confirm your legal identity.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 relative z-10">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">2</div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                                Professional Credentials
                                <span className="material-symbols-outlined text-primary !text-lg">link</span>
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">Share your IMDb profile, work links, portfolio, or industry memberships (CINTAA, etc.) to validate your experience.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 relative z-10">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">3</div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                                Video Selfie
                                <span className="material-symbols-outlined text-primary !text-lg">videocam</span>
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">A quick 5-second video recording to ensure the profile is being managed by the genuine artist.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Footer */}
            <section className="flex flex-col items-center gap-4 py-6 border-t border-slate-200 dark:border-primary/20">
                <button onClick={onStart} className="w-full md:w-auto min-w-[300px] py-4 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3">
                    Start Verification
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center">
                    By starting, you agree to our Talent Verification Terms. Verification usually takes 24-48 hours.
                </p>
            </section>
        </div>
    );
};

export default VerificationIntro;
