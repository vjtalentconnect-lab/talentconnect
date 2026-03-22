import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { useNotifications } from '../context/NotificationContext';
import { getMyProfile, updateProfile } from '../services/profileService';
import { changePassword } from '../services/authService';

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-3 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const Toggle = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-slate-200 dark:bg-zinc-700'}`}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}/>
    </button>
);

const ArtistSettings = () => {
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [loading, setLoading] = useState(true);
    const [savingPrivacy, setSavingPrivacy] = useState(false);
    const [toast, setToast] = useState(null);

    // Privacy settings state (controlled)
    const [privacy, setPrivacy] = useState({ profileSearchable: true, showContactDetails: true, showPortfolioPublic: true, allowDirectMessages: true });

    // Password modal state
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [pwLoading, setPwLoading] = useState(false);
    const [pwError, setPwError] = useState('');

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    const showToast = (message, type = 'success') => setToast({ message, type });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMyProfile();
                setProfile(res.data);
                // Load stored privacy settings if profile has them
                if (res.data?.privacySettings) {
                    setPrivacy(prev => ({ ...prev, ...res.data.privacySettings }));
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
        
        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchProfile);
        return () => window.removeEventListener('userStateChange', fetchProfile);
    }, []);

    const handleSavePrivacy = async () => {
        setSavingPrivacy(true);
        try {
            await updateProfile({ privacySettings: privacy });
            showToast('Privacy settings saved!', 'success');
        } catch (err) {
            showToast('Failed to save settings.', 'error');
        } finally {
            setSavingPrivacy(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwError('');
        if (pwForm.newPassword !== pwForm.confirmPassword) { setPwError('Passwords do not match.'); return; }
        if (pwForm.newPassword.length < 6) { setPwError('Password must be at least 6 characters.'); return; }
        setPwLoading(true);
        try {
            await changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
            showToast('Password changed successfully!', 'success');
            setShowPasswordModal(false);
            setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPwError(err.response?.data?.message || 'Failed to change password.');
        } finally {
            setPwLoading(false);
        }
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture,
    };

    const verificationStatus = profile?.user?.verificationStatus || authUser?.verificationStatus || 'none';

    if (loading) return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist"
            userData={{ name: '...', roleTitle: '...', avatar: '' }} headerTitle="Account Settings">
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData} verificationStatus={verificationStatus}
            headerTitle="Settings" headerSubtitle="Manage your profile privacy and account security."
            searchPlaceholder="Search settings...">
            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowPasswordModal(false)}>
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-zinc-700" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter">Change Password</h3>
                            <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            {[
                                { label: 'Current Password', key: 'currentPassword', placeholder: '••••••••' },
                                { label: 'New Password', key: 'newPassword', placeholder: 'Min 6 characters' },
                                { label: 'Confirm New Password', key: 'confirmPassword', placeholder: 'Re-enter new password' },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">{label}</label>
                                    <input type="password" value={pwForm[key]} onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                                        placeholder={placeholder}
                                        className="w-full bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 py-3 text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all"/>
                                </div>
                            ))}
                            {pwError && <p className="text-red-500 text-xs font-bold">{pwError}</p>}
                            <button type="submit" disabled={pwLoading}
                                className="w-full py-3.5 bg-primary text-white font-black rounded-xl uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70">
                                {pwLoading ? <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Saving...</> : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowDeleteModal(false)}>
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-red-200 dark:border-red-500/30" onClick={e => e.stopPropagation()}>
                        <div className="text-center mb-6">
                            <div className="size-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
                            </div>
                            <h3 className="text-xl font-black text-red-600 uppercase italic tracking-tighter">Delete Account</h3>
                            <p className="text-slate-500 text-sm mt-2">This action is permanent and cannot be undone. All your profile data, applications, and history will be deleted.</p>
                        </div>
                        <div className="mb-6">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Type DELETE to confirm</label>
                            <input value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)}
                                placeholder="DELETE"
                                className="w-full bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-red-500/50 transition-all"/>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-3 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Cancel</button>
                            <button
                                disabled={deleteConfirmText !== 'DELETE'}
                                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed">
                                Delete Forever
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl space-y-12 pb-24">
                {/* Profile Visibility & Privacy */}
                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">visibility</span>
                        <h2 className="text-lg font-bold dark:text-white uppercase italic tracking-tighter">Profile Visibility & Privacy</h2>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 divide-y divide-slate-100 dark:divide-zinc-800 shadow-sm overflow-hidden">
                        {[
                            { key: 'profileSearchable', label: 'Profile Searchable', desc: 'Allow casting directors and studios to find your profile in searches.' },
                            { key: 'showContactDetails', label: 'Show Contact Details', desc: 'Only verified studios and production houses can see your mobile and email.' },
                            { key: 'showPortfolioPublic', label: 'Public Portfolio', desc: 'Allow anyone to view your portfolio page without logging in.' },
                            { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Industry professionals can contact you directly via the platform.' },
                        ].map(({ key, label, desc }) => (
                            <div key={key} className="p-5 flex items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold text-slate-800 dark:text-white">{label}</p>
                                    <p className="text-sm text-slate-500">{desc}</p>
                                </div>
                                <Toggle checked={privacy[key]} onChange={val => setPrivacy(p => ({ ...p, [key]: val }))} />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSavePrivacy} disabled={savingPrivacy}
                        className="mt-4 px-6 py-3 bg-primary text-white font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-70">
                        {savingPrivacy ? <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Saving...</> : <><span className="material-symbols-outlined text-sm">save</span> Save Preferences</>}
                    </button>
                </section>

                {/* Account Security */}
                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">security</span>
                        <h2 className="text-lg font-bold dark:text-white uppercase italic tracking-tighter">Account Security</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button onClick={() => setShowPasswordModal(true)}
                            className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">lock_reset</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-800 dark:text-white">Change Password</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Keep your account secure</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                        </button>
                        <button className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">verified_user</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-800 dark:text-white">Two-Factor Auth</p>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Enabled</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                        </button>
                    </div>
                </section>

                {/* Subscription */}
                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">stars</span>
                        <h2 className="text-lg font-bold dark:text-white uppercase italic tracking-tighter">Subscription</h2>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 rounded-2xl border border-primary/20 p-8 relative overflow-hidden shadow-sm">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Active</span>
                                    <h3 className="text-2xl font-black italic text-slate-800 dark:text-white tracking-tighter">PRO ARTIST PLAN</h3>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md font-medium">
                                    Priority search listing, unlimited applications. Next billing: Oct 24, 2025.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors uppercase tracking-widest shadow-sm">
                                    Invoices
                                </button>
                                <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all uppercase tracking-widest">
                                    Manage
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="pt-8 border-t border-slate-100 dark:border-zinc-800">
                    <div className="bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h3 className="font-bold text-red-600">Delete Account</h3>
                            <p className="text-sm text-slate-500 font-medium">Permanently delete your profile and all application history. This action cannot be undone.</p>
                        </div>
                        <button onClick={() => setShowDeleteModal(true)}
                            className="text-red-600 text-xs font-bold border border-red-200 dark:border-red-500/30 px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest shadow-sm whitespace-nowrap">
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default ArtistSettings;
