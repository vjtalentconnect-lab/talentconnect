import React, { useState } from 'react';

const VerificationStep2 = ({ formData, updateFormData, onNext, onPrev, onSave, isSaving }) => {
    const [membershipCardPreview, setMembershipCardPreview] = useState(null);
    const [membershipError, setMembershipError] = useState('');

    const updateAward = (id, field, value) => {
        const updated = formData.awards.map(a => a.id === id ? { ...a, [field]: value } : a);
        updateFormData({ awards: updated });
    };

    const addAward = () => {
        updateFormData({ awards: [...formData.awards, { id: Date.now(), name: '', year: '', organization: '' }] });
    };

    const removeAward = (id) => {
        if (formData.awards.length === 1) return;
        updateFormData({ awards: formData.awards.filter(a => a.id !== id) });
    };

    const handleMembershipCard = (file) => {
        setMembershipError('');
        if (!file) return;
        const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowed.includes(file.type)) { setMembershipError('Only JPEG, PNG, PDF allowed.'); return; }
        if (file.size > 5 * 1024 * 1024) { setMembershipError('Max file size is 5MB.'); return; }
        updateFormData({ membershipCard: file });
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = e => setMembershipCardPreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setMembershipCardPreview('pdf');
        }
    };

    const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all";
    const plainInputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all";
    const labelClass = "text-sm font-semibold text-slate-600 dark:text-slate-300";
    const sectionHeaderClass = "flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-900 dark:text-white";

    return (
        <div className="flex flex-col w-full max-w-[960px] px-0 md:px-6 space-y-8">
            {/* Progress Tracker */}
            <div className="flex flex-col gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <div className="flex gap-6 justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <p className="text-primary text-xs font-bold uppercase tracking-widest">Verification Process</p>
                        <h1 className="text-2xl font-black tracking-tight">Professional Credentials</h1>
                    </div>
                    <p className="text-primary text-2xl font-bold">66%</p>
                </div>
                <div className="rounded-full bg-slate-200 dark:bg-slate-800 h-3 overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: '66%' }}></div>
                </div>
                <div className="flex items-center gap-2 text-primary/80">
                    <span className="material-symbols-outlined text-sm">info</span>
                    <p className="text-sm font-medium">Step 2 of 3: Verifying industry expertise and background</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-primary/10 rounded-3xl p-8 shadow-2xl space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Section 1: Professional Profiles */}
                    <section className="flex flex-col gap-5">
                        <div className={sectionHeaderClass}>
                            <span className="material-symbols-outlined text-primary">public</span>
                            <h2 className="text-xl font-bold">Professional Profiles</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className={labelClass}>IMDb Profile Link</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">link</span>
                                    <input
                                        className={inputClass}
                                        placeholder="https://www.imdb.com/name/nm..."
                                        type="url"
                                        value={formData.imdbLink}
                                        onChange={e => updateFormData({ imdbLink: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={labelClass}>Wikipedia Page <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">description</span>
                                    <input
                                        className={inputClass}
                                        placeholder="https://en.wikipedia.org/wiki/..."
                                        type="url"
                                        value={formData.wikipediaLink}
                                        onChange={e => updateFormData({ wikipediaLink: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Work Portfolio */}
                    <section className="flex flex-col gap-5">
                        <div className={sectionHeaderClass}>
                            <span className="material-symbols-outlined text-primary">work</span>
                            <h2 className="text-xl font-bold">Work Portfolio</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className={labelClass}>Link to Showreel / Demo Reel</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">play_circle</span>
                                    <input
                                        className={inputClass}
                                        placeholder="YouTube or Vimeo link"
                                        type="url"
                                        value={formData.showreelLink}
                                        onChange={e => updateFormData({ showreelLink: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={labelClass}>Personal Website / Blog</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">language</span>
                                    <input
                                        className={inputClass}
                                        placeholder="www.yourname.com"
                                        type="url"
                                        value={formData.websiteLink}
                                        onChange={e => updateFormData({ websiteLink: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Industry Memberships */}
                    <section className="flex flex-col gap-5 md:col-span-2">
                        <div className={sectionHeaderClass}>
                            <span className="material-symbols-outlined text-primary">badge</span>
                            <h2 className="text-xl font-bold">Industry Memberships</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className={labelClass}>Association Name</label>
                                    <select
                                        className={plainInputClass}
                                        value={formData.associationName}
                                        onChange={e => updateFormData({ associationName: e.target.value })}
                                    >
                                        <option value="cintaa">CINTAA (Cine &amp; TV Artistes' Association)</option>
                                        <option value="fwice">FWICE</option>
                                        <option value="iftda">IFTDA</option>
                                        <option value="other">Other Association</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className={labelClass}>Membership ID</label>
                                    <input
                                        className={plainInputClass}
                                        placeholder="Enter ID Number"
                                        type="text"
                                        value={formData.membershipId}
                                        onChange={e => updateFormData({ membershipId: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 h-full">
                                <label className={labelClass}>Upload Membership Card</label>
                                {!membershipCardPreview ? (
                                    <label className="flex flex-col items-center justify-center flex-1 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/10 hover:bg-primary/5 hover:border-primary transition-all cursor-pointer group p-6">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,application/pdf"
                                            className="hidden"
                                            onChange={e => handleMembershipCard(e.target.files[0])}
                                        />
                                        <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
                                        <p className="text-sm text-slate-500 mt-2 font-medium">Click to upload or drag &amp; drop</p>
                                        <p className="text-xs text-slate-400 mt-1">JPG, PNG, PDF (Max 5MB)</p>
                                        {membershipError && <p className="text-xs text-red-500 mt-2">{membershipError}</p>}
                                    </label>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 p-4 border border-green-500/30 rounded-xl bg-green-500/5">
                                        {membershipCardPreview === 'pdf'
                                            ? <span className="material-symbols-outlined text-4xl text-primary">picture_as_pdf</span>
                                            : <img src={membershipCardPreview} alt="Card preview" className="max-h-28 rounded-lg object-contain" />
                                        }
                                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined !text-sm">check_circle</span>
                                            {formData.membershipCard?.name}
                                        </p>
                                        <button
                                            onClick={() => { setMembershipCardPreview(null); updateFormData({ membershipCard: null }); }}
                                            className="text-xs text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Awards & Recognition */}
                    <section className="flex flex-col gap-5 md:col-span-2">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-900 dark:text-white">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">emoji_events</span>
                                <h2 className="text-xl font-bold">Awards &amp; Recognition</h2>
                            </div>
                            <button
                                type="button"
                                onClick={addAward}
                                className="flex items-center gap-1 text-primary text-sm font-bold hover:underline active:scale-95 transition-transform"
                            >
                                <span className="material-symbols-outlined text-sm">add_circle</span>
                                Add Another
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {formData.awards.map((award, idx) => (
                                <div key={award.id} className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20 group">
                                    {formData.awards.length > 1 && (
                                        <button
                                            onClick={() => removeAward(award.id)}
                                            className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            title="Remove award"
                                        >
                                            <span className="material-symbols-outlined !text-sm">close</span>
                                        </button>
                                    )}
                                    <div className="flex flex-col gap-2">
                                        <label className={labelClass}>Award Name</label>
                                        <input
                                            className={plainInputClass}
                                            placeholder="e.g. Filmfare Best Debut"
                                            type="text"
                                            value={award.name}
                                            onChange={e => updateAward(award.id, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className={labelClass}>Year</label>
                                        <input
                                            className={plainInputClass}
                                            placeholder="YYYY"
                                            type="number"
                                            min="1900"
                                            max={new Date().getFullYear()}
                                            value={award.year}
                                            onChange={e => updateAward(award.id, 'year', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className={labelClass}>Organization</label>
                                        <input
                                            className={plainInputClass}
                                            placeholder="e.g. Times Group"
                                            type="text"
                                            value={award.organization}
                                            onChange={e => updateAward(award.id, 'organization', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center pb-8">
                <button
                    onClick={onPrev}
                    className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 dark:hover:text-slate-100 transition-colors active:scale-95"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Basic Info
                </button>
                <div className="flex gap-4">
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="hidden sm:flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-100 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-60"
                    >
                        {isSaving ? (
                            <>
                                <span className="material-symbols-outlined !text-base animate-spin">progress_activity</span>
                                Saving…
                            </>
                        ) : 'Save Progress'}
                    </button>
                    <button
                        onClick={onNext}
                        className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                        Continue to Step 3
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationStep2;
