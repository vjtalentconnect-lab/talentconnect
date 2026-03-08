import React from 'react';

const VerificationStep1 = ({ onNext, onSave }) => {
    return (
        <div className="w-full max-w-[800px] space-y-8">
            {/* Progress Section */}
            <div className="flex flex-col gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-primary text-sm font-bold uppercase tracking-widest">Verification Process</p>
                        <h3 className="text-xl font-semibold">Step 1 of 3</h3>
                    </div>
                    <p className="text-primary text-2xl font-bold">33%</p>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '33%' }}></div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                    Identity & Document Upload
                </p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-primary/10 rounded-3xl p-8 shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Verify Your Identity</h1>
                    <p className="text-slate-600 dark:text-slate-400">To maintain a safe community for artists and scouts, please provide a valid government-issued ID.</p>
                </div>

                {/* ID Selection Tabs */}
                <div className="mb-8">
                    <label className="block text-sm font-medium mb-3 text-slate-500 uppercase tracking-tighter">Select ID Type</label>
                    <div className="flex p-1.5 bg-slate-100 dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800">
                        <label className="flex-1 cursor-pointer">
                            <input defaultChecked className="sr-only peer" name="id_type" type="radio" value="aadhar" />
                            <div className="flex items-center justify-center py-2 px-4 rounded-lg text-slate-500 peer-checked:bg-primary peer-checked:text-white transition-all font-semibold">
                                Aadhar Card
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input className="sr-only peer" name="id_type" type="radio" value="passport" />
                            <div className="flex items-center justify-center py-2 px-4 rounded-lg text-slate-500 peer-checked:bg-primary peer-checked:text-white transition-all font-semibold">
                                Passport
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input className="sr-only peer" name="id_type" type="radio" value="pan" />
                            <div className="flex items-center justify-center py-2 px-4 rounded-lg text-slate-500 peer-checked:bg-primary peer-checked:text-white transition-all font-semibold">
                                PAN Card
                            </div>
                        </label>
                    </div>
                </div>

                {/* Drag and Drop Area */}
                <div className="relative group">
                    <div className="border-2 border-dashed border-primary/30 group-hover:border-primary rounded-3xl p-12 flex flex-col items-center justify-center bg-primary/5 transition-all cursor-pointer">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Upload or Drag & Drop</h4>
                        <p className="text-slate-500 text-center max-w-xs mb-6">Support JPEG, PNG or PDF formats. Max file size 5MB.</p>
                        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                            Select File
                        </button>
                    </div>
                </div>

                {/* Instruction Checklist */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h5 className="font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-500">task_alt</span>
                            Guidelines for success
                        </h5>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li className="flex gap-2"><span className="material-symbols-outlined text-xs mt-1">check_circle</span> Ensure all 4 corners of the document are visible.</li>
                            <li className="flex gap-2"><span className="material-symbols-outlined text-xs mt-1">check_circle</span> Data must be clearly readable without glare.</li>
                            <li className="flex gap-2"><span className="material-symbols-outlined text-xs mt-1">check_circle</span> Document must be valid and not expired.</li>
                        </ul>
                    </div>
                    <div className="bg-slate-50 dark:bg-background-dark/40 rounded-2xl p-4 flex items-center gap-4 border border-slate-200 dark:border-slate-800">
                        <div className="w-24 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-primary to-transparent"></div>
                            <span className="material-symbols-outlined text-slate-400">image</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-primary">Pro Tip</p>
                            <p className="text-xs text-slate-500">Place your ID on a dark, flat surface for better contrast.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
                <button onClick={onSave} className="px-8 py-4 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    Save Progress
                </button>
                <button onClick={onNext} className="px-12 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-xl shadow-primary/30">
                    Continue to Step 2
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default VerificationStep1;
