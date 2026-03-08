import React from 'react';

const VerificationStep3 = ({ onFinish, onSave }) => {
    return (
        <div className="flex flex-1 flex-col max-w-xl mx-auto w-full px-4 py-6">
            <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-primary text-sm font-bold uppercase tracking-wider">Step 3 of 3</p>
                        <p className="text-2xl font-bold mt-1 dark:text-white">Record Video Selfie</p>
                    </div>
                    <p className="text-primary text-sm font-bold">100%</p>
                </div>
                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>

            <div className="mb-6 text-center">
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    Look straight into the camera and turn your head slowly from left to right.
                </p>
            </div>

            <div className="relative w-full aspect-[3/4] rounded-xl bg-slate-200 dark:bg-slate-800/50 overflow-hidden border-2 border-primary/10 flex items-center justify-center group mb-8 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute z-10 flex flex-col items-center justify-center">
                    <div className="w-[220px] h-[280px] border-2 border-dashed border-primary/40 rounded-[50%_/_60%_60%_40%_40%] animate-pulse"></div>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-full border border-white/10">
                    <div className="size-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-mono font-bold tracking-widest">0:05s</span>
                </div>
                <div className="z-20 flex flex-col items-center gap-4">
                    <button className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-3xl">videocam</span>
                    </button>
                    <span className="text-white text-sm font-medium drop-shadow-md">Start Recording</span>
                </div>
                <div className="absolute bottom-4 left-0 w-full px-6 flex justify-between items-center text-white/80 text-xs italic">
                    <span>Front Camera Active</span>
                    <span>HD Quality</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
                <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-widest">Guidelines for success</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-xl">light_mode</span>
                        <span className="text-sm dark:text-slate-300">Ensure good natural lighting</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-xl">face_6</span>
                        <span className="text-sm dark:text-slate-300">Do not wear sunglasses or hats</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-xl">sentiment_neutral</span>
                        <span className="text-sm dark:text-slate-300">Keep a neutral expression</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto pb-8">
                {/* Enabled for demonstration, usually would wait for recording */}
                <button onClick={onFinish} className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                    <span>Finish Verification</span>
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                </button>
                <button onClick={onSave} className="w-full py-4 bg-transparent border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
                    Save Progress
                </button>
            </div>
        </div>
    );
};

export default VerificationStep3;
