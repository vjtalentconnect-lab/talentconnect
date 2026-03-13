import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200 min-h-screen font-display">
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 py-4 md:px-20 lg:px-40 bg-background-light dark:bg-background-dark">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-2xl">movie</span>
                        </div>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-black leading-tight tracking-tight uppercase">TalentConnect</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                            <span className="material-symbols-outlined text-primary">person</span>
                        </div>
                    </div>
                </header>
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                    <div className="max-w-[600px] w-full bg-white dark:bg-slate-900/50 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                                <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/30">
                                    <span className="material-symbols-outlined text-white text-5xl font-bold">check</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 mb-10">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Payment Successful!</h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">Your cinematic journey has been upgraded. Welcome to <span className="text-primary font-bold">TalentConnect Pro</span>.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-10 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">stars</span>
                                Pro Benefits Unlocked
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                                    <span className="text-sm font-medium">Priority Profile Placement</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[20px]">ad_off</span>
                                    <span className="text-sm font-medium">Ad-free Experience</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
                                    <span className="text-sm font-medium">Advanced Analytics</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                                    <span className="text-sm font-medium">AI Recommendations</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2" to="/dashboard/talent">
                                <span>Go to Dashboard</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                            <button className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 px-10 rounded-xl transition-all">
                                View Receipt
                            </button>
                        </div>
                        <p className="mt-8 text-[10px] text-slate-500 dark:text-slate-500">
                            A confirmation email has been sent to your registered address. Subscription ID: #SC-PR9921
                        </p>
                    </div>
                </main>
                <footer className="mt-auto py-8 text-center text-xs text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800">
                    <p>© 2026 TalentConnect. All premium rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default PaymentSuccess;
