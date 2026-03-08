import React from 'react';

const VerificationStatus = ({ onReturn }) => {
    return (
        <div className="max-w-[560px] w-full bg-white/5 dark:bg-white/5 border border-primary/10 rounded-2xl p-8 lg:p-12 shadow-2xl">
            {/* Status Icon */}
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full"></div>
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30">
                        <span className="material-symbols-outlined text-5xl text-primary font-bold">hourglass_empty</span>
                    </div>
                </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-10 text-slate-900 dark:text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">Verification Under Review</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Our talent acquisition team is currently reviewing your profile to ensure authenticity and professional standards.
                </p>
            </div>

            {/* Timeline */}
            <div className="space-y-0 relative mb-10">
                {/* Step 1: Completed */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                        <div className="w-0.5 h-12 bg-primary"></div>
                    </div>
                    <div className="pt-0.5">
                        <h3 className="font-bold text-primary">Submitted</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-500">Your profile details were received successfully.</p>
                    </div>
                </div>

                {/* Step 2: In Progress */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-sm font-bold">schedule</span>
                        </div>
                        <div className="w-0.5 h-12 bg-slate-300 dark:bg-slate-700"></div>
                    </div>
                    <div className="pt-0.5 text-slate-900 dark:text-white">
                        <h3 className="font-bold">Reviewing</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-500">Our team is verifying your portfolio and credentials.</p>
                    </div>
                </div>

                {/* Step 3: Pending */}
                <div className="flex gap-4 text-slate-400">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-transparent">
                            <span className="material-symbols-outlined text-sm font-bold">verified</span>
                        </div>
                    </div>
                    <div className="pt-0.5">
                        <h3 className="font-bold">Verification Result</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-500">Estimated completion within 24-48 hours.</p>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-10 flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary mt-1">info</span>
                <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Expected Time: 24-48 Hours</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        You will receive an email and a push notification as soon as your status is updated.
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col gap-3">
                <button onClick={onReturn} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    Return to Dashboard
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="w-full bg-transparent hover:bg-white/5 text-slate-600 dark:text-slate-400 font-medium py-3 rounded-xl transition-all text-sm underline underline-offset-4">
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default VerificationStatus;
