import React from 'react';

const VerificationStep2 = ({ onNext, onPrev, onSave }) => {
    return (
        <div className="layout-content-container flex flex-col w-full max-w-[960px] px-6">
            {/* Progress Tracker */}
            <div className="flex flex-col gap-4 mb-8 bg-neutral-dark/30 p-6 rounded-xl border border-neutral-border/50">
                <div className="flex gap-6 justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <p className="text-primary text-xs font-bold uppercase tracking-widest">Verification Process</p>
                        <h1 className="text-3xl font-black tracking-tight text-white">Professional Credentials</h1>
                    </div>
                    <p className="text-slate-100 text-lg font-bold">66%</p>
                </div>
                <div className="rounded-full bg-neutral-dark h-3 overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: '66%' }}></div>
                </div>
                <div className="flex items-center gap-2 text-primary/80">
                    <span className="material-symbols-outlined text-sm">info</span>
                    <p className="text-sm font-medium">Step 2 of 3: Verifying industry expertise and background</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section 1: Professional Profiles */}
                <section className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 border-b border-neutral-border pb-2 text-white">
                        <span className="material-symbols-outlined text-primary">public</span>
                        <h2 className="text-xl font-bold">Professional Profiles</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">IMDb Profile Link</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">link</span>
                                <input className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="https://www.imdb.com/name/nm..." type="url" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">Wikipedia Page (Optional)</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">description</span>
                                <input className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="https://en.wikipedia.org/wiki/..." type="url" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Work Portfolio */}
                <section className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 border-b border-neutral-border pb-2 text-white">
                        <span className="material-symbols-outlined text-primary">work</span>
                        <h2 className="text-xl font-bold">Work Portfolio</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">Link to Showreel / Demo Reel</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">play_circle</span>
                                <input className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="YouTube or Vimeo link" type="url" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">Personal Website / Blog</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">language</span>
                                <input className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="www.yourname.com" type="url" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Industry Memberships */}
                <section className="flex flex-col gap-5 md:col-span-2">
                    <div className="flex items-center gap-2 border-b border-neutral-border pb-2 text-white">
                        <span className="material-symbols-outlined text-primary">badge</span>
                        <h2 className="text-xl font-bold">Industry Memberships</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-dark/20 p-6 rounded-xl border border-dashed border-neutral-border">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-300">Association Name</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 transition-all appearance-none cursor-pointer">
                                    <option value="cintaa">CINTAA (Cine & TV Artistes' Association)</option>
                                    <option value="fwice">FWICE</option>
                                    <option value="iftda">IFTDA</option>
                                    <option value="other">Other Association</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-300">Membership ID</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="Enter ID Number" type="text" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 h-full">
                            <label className="text-sm font-semibold text-slate-300">Upload Membership Card</label>
                            <div className="flex flex-col items-center justify-center flex-1 border-2 border-dashed border-neutral-border rounded-xl bg-neutral-dark/10 hover:bg-neutral-dark/30 transition-all cursor-pointer group p-6">
                                <span className="material-symbols-outlined text-4xl text-slate-500 group-hover:text-primary transition-colors">cloud_upload</span>
                                <p className="text-sm text-slate-500 mt-2 font-medium">Click to upload or drag & drop</p>
                                <p className="text-xs text-slate-600 mt-1">JPG, PNG, PDF (Max 5MB)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Awards & Recognition */}
                <section className="flex flex-col gap-5 md:col-span-2">
                    <div className="flex items-center justify-between border-b border-neutral-border pb-2 text-white">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">emoji_events</span>
                            <h2 className="text-xl font-bold">Awards & Recognition</h2>
                        </div>
                        <button type="button" className="flex items-center gap-1 text-primary text-sm font-bold hover:underline">
                            <span className="material-symbols-outlined text-sm">add_circle</span>
                            Add Another
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-300">Award Name</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="e.g. Filmfare Best Debut" type="text" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-300">Year</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="YYYY" type="number" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-300">Organization</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-dark/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition-all" placeholder="e.g. Times Group" type="text" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t border-neutral-border flex justify-between items-center mb-16">
                <button onClick={onPrev} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-100 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Basic Info
                </button>
                <div className="flex gap-4">
                    <button onClick={onSave} className="hidden sm:flex items-center gap-2 px-6 py-3 bg-neutral-dark text-slate-100 font-bold rounded-xl hover:bg-neutral-border transition-colors">
                        Save Progress
                    </button>
                    <button onClick={onNext} className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
                        Continue to Step 3
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationStep2;
