import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 lg:px-40 py-4 bg-background-light dark:bg-background-dark">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="size-8">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-tight">StarCast India</h2>
                        </div>
                        <div className="flex flex-1 justify-end gap-8 items-center">
                            <div className="hidden md:flex items-center gap-8">
                                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/dashboard/talent">Dashboard</Link>
                                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/talent/upgrade">Plans</Link>
                            </div>
                            <div className="bg-primary/20 rounded-full p-1 border border-primary/30">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBV4sGnpUGNstxoonWP8v4gbgG1aLJJwOOiMDD2T05YU8ap3mh3uU_zgR5sgrFNEcsyI4GJLGvnjzIIgxvgCiPriAre5a2z371l4Zfyin0w5mjZ7eNWpxjiH7SIdIXHPd-FWgQItS8mLkuRP-rAidxPClNnmitIsxk6ezV76oLut8erHUdGi9XTvEoJ0Ls-HkYfaz25g3x_e3VRSmExdrn_bKXWcWW-z0mBM1KWkznrcX5FN_odI8bcQdrgch8SG49flKMqPH5uMtLa")' }}></div>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 flex flex-col items-center px-4 lg:px-40 py-10">
                        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Left Column: Checkout Info */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest leading-tight">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                        Secure Checkout
                                    </div>
                                    <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight leading-tight">Complete your subscription</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-lg">You're just one step away from unlimited cinematic experiences.</p>
                                </div>
                                {/* Plan Summary Card */}
                                <div className="p-1 rounded-xl bg-gradient-to-br from-primary/20 to-transparent">
                                    <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
                                        <div className="flex flex-col justify-between flex-1 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary w-fit">SELECTED PLAN</span>
                                                <h3 className="text-slate-900 dark:text-white text-2xl font-bold mt-2 leading-tight">Pro Plan</h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm">Priority Placement • Unlimited Requests • AI Analytics</p>
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-slate-900 dark:text-white text-3xl font-black">₹999</span>
                                                <span className="text-slate-500 dark:text-slate-400 text-sm">/month</span>
                                            </div>
                                            <Link className="flex items-center justify-center rounded-lg h-10 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all w-fit" to="/talent/upgrade">
                                                Change Plan
                                            </Link>
                                        </div>
                                        <div className="hidden md:block w-48 bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjc1SvkyYE2OKBT2Wi0bFuVeKiW4RZWlV3fnW_VNx7QHJja0EZMblFqc-VzbvTOfiGNsWtb6y0Ywq4NfQfAG4IGPuY5DNfvUznWsBxWZokoW2Mrr_sY5N8K6b8PK7Eqm4h4tgutwZ7q3wW-_fqgxu2u4Z0rbvMfmalXmEROM1i2sHH4DuxGviKmLSw4NVx9W18MwPaI7jEFikCyKdJbh61UsagsubdNjdT_lZL0LhKQrijQkOG8Nln-0X3hFSmQaRJ4M__zm9Dj515")' }}></div>
                                    </div>
                                </div>
                                {/* Payment Tabs */}
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-slate-900 dark:text-white text-xl font-bold border-l-4 border-primary pl-4">Payment Method</h2>
                                    <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
                                        <button className="flex items-center gap-2 border-b-2 border-primary text-primary pb-4 px-2 font-bold transition-all">
                                            <span className="material-symbols-outlined">credit_card</span>
                                            <span className="text-sm">Card</span>
                                        </button>
                                        <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-400 dark:text-slate-500 pb-4 px-2 font-medium hover:text-slate-600 dark:hover:text-slate-300 transition-all">
                                            <span className="material-symbols-outlined">qr_code</span>
                                            <span className="text-sm">UPI</span>
                                        </button>
                                    </div>
                                    {/* Card Form */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cardholder Name</label>
                                            <input className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" type="text" />
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Card Number</label>
                                            <div className="relative">
                                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 pl-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="0000 0000 0000 0000" type="text" />
                                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expiry Date</label>
                                            <input className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="MM/YY" type="text" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">CVV</label>
                                            <input className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="***" type="password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column: Order Summary & Pay */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-10 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-2xl backdrop-blur-md">
                                    <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Price Details</h3>
                                    <div className="flex flex-col gap-4 mb-8">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">Pro Plan (Monthly)</span>
                                            <span className="text-slate-900 dark:text-white font-medium">₹999.00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">Taxes & Fees</span>
                                            <span className="text-slate-900 dark:text-white font-medium">₹179.82</span>
                                        </div>
                                        <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
                                        <div className="flex justify-between items-center text-xl font-black">
                                            <span className="text-slate-900 dark:text-white">Total Amount</span>
                                            <span className="text-primary">₹1,178.82</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                            <span className="material-symbols-outlined text-primary">info</span>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                                Your subscription will automatically renew each month. You can cancel at any time from your settings.
                                            </p>
                                        </div>
                                        <Link className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]" to="/talent/payment-success">
                                            <span className="material-symbols-outlined">verified_user</span>
                                            Pay Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="px-6 lg:px-40 py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 dark:text-slate-500 text-[10px] md:text-xs">© 2024 StarCast India Entertainment. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="text-slate-500 dark:text-slate-500 text-xs hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="text-slate-500 dark:text-slate-500 text-xs hover:text-primary transition-colors" href="#">Terms of Service</a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
