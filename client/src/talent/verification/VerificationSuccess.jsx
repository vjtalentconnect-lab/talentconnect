import React from 'react';

const VerificationSuccess = ({ onDashboard }) => {
    return (
        <div className="max-w-[640px] w-full flex flex-col items-center text-center relative z-10 px-6">
            {/* Verified Badge Visual */}
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-50"></div>
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse"></div>
                    <div className="bg-gradient-to-br from-primary to-[#ff8c52] rounded-full p-8 shadow-2xl shadow-primary/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[80px] lg:text-[100px] font-bold">verified</span>
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4 mb-10">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase">Verified Artist</span>
                <h1 className="text-slate-900 dark:text-white text-4xl lg:text-6xl font-extrabold tracking-tight">You're Verified!</h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg lg:text-xl leading-relaxed max-w-lg mx-auto">
                    Your profile is now live with the <span className="text-primary font-semibold">Verified badge</span>, giving you higher search priority and instant trust with top production houses.
                </p>
            </div>

            {/* Success Card Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 text-left">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Priority Ranking</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Be seen first by casting directors</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 text-left">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined">workspace_premium</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Trust Seal</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Authentic profile verification badge</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button onClick={onDashboard} className="flex-1 sm:flex-none sm:min-w-[200px] h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    Go to Dashboard
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="flex-1 sm:flex-none sm:min-w-[200px] h-14 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                    View My Public Profile
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
            </div>
        </div>
    );
};

export default VerificationSuccess;
