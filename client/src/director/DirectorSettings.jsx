import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile, uploadMedia, updateProfile, exportMyData } from '../services/profileService';
import { changePassword } from '../services/authService';
import { DIRECTOR_MENU } from '../constants/navigation';

const Toast = ({ message, type, onDone }) => {
    useEffect(() => {
        const id = setTimeout(() => { onDone?.(); }, 3000);
        return () => clearTimeout(id);
    }, [onDone]);
    return (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-white text-sm font-bold shadow-2xl ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            {message}
        </div>
    );
};

const DirectorSettings = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
    const [uploadingPortfolio, setUploadingPortfolio] = useState(false);
    const [portfolioFile, setPortfolioFile] = useState(null);
    const [portfolioTitle, setPortfolioTitle] = useState('');
    const [portfolioDescription, setPortfolioDescription] = useState('');
    const [toast, setToast] = useState(null);
    const [isToggling2FA, setIsToggling2FA] = useState(false);

    // Security state
    const [security, setSecurity] = useState({ twoFactorEnabled: false, lastUpdated: null });
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [pwLoading, setPwLoading] = useState(false);
    const [pwError, setPwError] = useState('');
    const [exportingData, setExportingData] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getMyProfile();
                setProfile(response.data);
                if (response.data?.securitySettings) {
                    setSecurity(prev => ({ ...prev, ...response.data.securitySettings }));
                }
            } catch (err) {
                console.error('Error fetching director profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfilePictureUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadingProfilePic(true);
        try {
            const response = await uploadMedia(file, 'profilePicture');
            setProfile(response.data);
            alert('Profile picture updated.');
        } catch (err) {
            console.error('Profile picture upload failed:', err);
            alert('Failed to upload profile picture.');
        } finally {
            setUploadingProfilePic(false);
        }
    };

    const handlePortfolioUpload = async () => {
        if (!portfolioFile) {
            alert('Please select a file to upload.');
            return;
        }

        setUploadingPortfolio(true);
        try {
            const response = await uploadMedia(portfolioFile, 'portfolio', { title: portfolioTitle, description: portfolioDescription });
            setProfile(response.data);
            setPortfolioFile(null);
            setPortfolioTitle('');
            setPortfolioDescription('');
            alert('Portfolio item uploaded.');
        } catch (err) {
            console.error('Portfolio upload failed:', err);
            alert('Failed to upload portfolio item.');
        } finally {
            setUploadingPortfolio(false);
        }
    };

    const handleToggle2FA = async () => {
        if (isToggling2FA) return;
        const next = !security.twoFactorEnabled;
        const prev = security;
        const timestamp = new Date().toISOString();
        setIsToggling2FA(true);
        setSecurity(curr => ({ ...curr, twoFactorEnabled: next, lastUpdated: timestamp }));
        try {
            await updateProfile({ securitySettings: { twoFactorEnabled: next, lastUpdated: timestamp } });
            setToast({ type: 'success', message: `Two-Factor ${next ? 'enabled' : 'disabled'}.` });
        } catch (err) {
            console.error('2FA toggle failed:', err);
            setSecurity(() => ({ ...prev }));
            setToast({ type: 'error', message: 'Could not update 2FA. Try again.' });
        } finally {
            setIsToggling2FA(false);
        }
    };

    const handleChangePassword = async (e) => {
        e?.preventDefault();
        setPwError('');
        if (pwForm.newPassword !== pwForm.confirmPassword) { setPwError('Passwords do not match.'); return; }
        if (pwForm.newPassword.length < 8) { setPwError('Password must be at least 8 characters.'); return; }
        if (!/[A-Z]/.test(pwForm.newPassword)) { setPwError('Password must include at least one uppercase letter.'); return; }
        if (!/[0-9]/.test(pwForm.newPassword)) { setPwError('Password must include at least one number.'); return; }
        setPwLoading(true);
        try {
            await changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
            setToast({ type: 'success', message: 'Password changed successfully.' });
            setShowPasswordModal(false);
            setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPwError(err.response?.data?.message || 'Failed to change password.');
        } finally {
            setPwLoading(false);
        }
    };

    const clearToast = useCallback(() => setToast(null), []);

    const handleExportData = async () => {
        setExportingData(true);
        try {
            await exportMyData();
            setToast({ type: 'success', message: 'Your data export has been downloaded.' });
        } catch (err) {
            console.error('Data export failed:', err);
            setToast({ type: 'error', message: 'Failed to download your data export.' });
        } finally {
            setExportingData(false);
        }
    };

    const userData = {
        name: profile?.fullName || 'Rohan Mehra',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'Mumbai, IN'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : (profile?.profilePicture || "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8S-aeuR2cORz2aKmlcoRCZG0vX3wrCerglNjBZAeRTyWFtdCwCVgW2iau6r9ehLrZVdI8FCvYXugQN5g0iwxAp0y0a9DKiit2XmW7WKPzqsjSZb23GH1WfBIs3CwD2BV5JgiHEA7RJccg4NGPWqIKlO7EjA6wyORiH7n3g1MwegFrrf7ovbugGps3ElIcbYbaEJb-Rgshm_LVUyOQQOsWt3Lf1te1KVr8F6VcVTewalCyMztq1GlKktZMvh7wHTp2HgBgHIXuiFI")
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Account Settings"
            headerSubtitle="Manage your studio profile, privacy, and notifications."
            searchPlaceholder="Search settings..."
        >
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Settings...</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto py-8 space-y-12 pb-24">
                        {toast && <Toast message={toast.message} type={toast.type} onDone={clearToast} />}

                        {/* Project Visibility & Privacy */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 md:mb-6 text-primary">
                                <span className="material-symbols-outlined text-lg md:text-xl">visibility</span>
                                <h2 className="text-base md:text-lg font-bold">Project Visibility & Privacy</h2>
                            </div>
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5 shadow-sm">
                                <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                                        <p className="font-bold text-slate-900 dark:text-white">Public Project Listings</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Allow artists to find your projects in global searches.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                                        <p className="font-bold text-slate-900 dark:text-white">Show Studio Details</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Only verified artists can see your studio's official contact information.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Profile Media */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">photo_camera</span>
                                <h2 className="text-lg font-bold">Profile Photo & Portfolio</h2>
                            </div>

                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 p-6 space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Current Profile Picture</p>
                                        <img src={profile?.profilePicture || 'https://ui-avatars.com/api/?name=No+Photo'}
                                            alt="Profile" className="w-32 h-32 rounded-full object-cover border border-slate-300 dark:border-zinc-700 mt-2" />
                                        <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="mt-3" />
                                        {uploadingProfilePic && <p className="text-xs text-slate-500">Uploading profile picture...</p>}
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Add Portfolio Item</p>
                                        <input type="file" accept="image/*,video/*" onChange={(e) => setPortfolioFile(e.target.files[0])} className="mt-2" />
                                        <input type="text" placeholder="Title" value={portfolioTitle} onChange={(e) => setPortfolioTitle(e.target.value)} className="mt-2 w-full p-2 rounded border border-slate-300 dark:border-zinc-700" />
                                        <textarea placeholder="Description" value={portfolioDescription} onChange={(e) => setPortfolioDescription(e.target.value)} className="mt-2 w-full p-2 rounded border border-slate-300 dark:border-zinc-700" rows={3} />
                                        <button onClick={handlePortfolioUpload} disabled={uploadingPortfolio}
                                            className="mt-3 px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition">
                                            {uploadingPortfolio ? 'Uploading...' : 'Upload Portfolio Item'}
                                        </button>
                                    </div>
                                </div>

                                {profile?.portfolio?.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {profile.portfolio.map((item, index) => (
                                            <div key={index} className="border border-slate-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                                                {item.type === 'video' ? (
                                                    <video src={item.url} controls className="w-full h-24 object-cover" />
                                                ) : (
                                                    <img src={item.url} alt={item.title || 'Portfolio Item'} className="w-full h-24 object-cover" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Account Security */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 md:mb-6 text-primary">
                                <span className="material-symbols-outlined text-lg md:text-xl">security</span>
                                <h2 className="text-base md:text-lg font-bold">Account Security</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="flex items-center justify-between p-4 md:p-5 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                                        <div className="size-8 md:size-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors flex-shrink-0">
                                            <span className="material-symbols-outlined text-lg md:text-xl">lock_reset</span>
                                        </div>
                                        <div className="text-left min-w-0 flex-1">
                                            <p className="font-bold text-slate-900 dark:text-white truncate">Change Password</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Update your login password</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 flex-shrink-0">chevron_right</span>
                                </button>

                                <div className="flex items-center justify-between p-4 md:p-5 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-colors shadow-sm">
                                    <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                                    <div className="size-8 md:size-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-lg md:text-xl">verified_user</span>
                                        </div>
                                        <div className="text-left min-w-0 flex-1">
                                            <p className="font-bold text-slate-900 dark:text-white truncate">Two-Factor Auth</p>
                                            <p className={`text-xs font-medium ${security.twoFactorEnabled ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}`}>
                                                {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                        <input type="checkbox" className="sr-only peer" checked={security.twoFactorEnabled} onChange={handleToggle2FA} disabled={isToggling2FA} />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

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
                                            { label: 'New Password', key: 'newPassword', placeholder: 'Min 8 chars, 1 uppercase, 1 number' },
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

                        {/* Notification Preferences */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 md:mb-6 text-primary">
                                <span className="material-symbols-outlined text-lg md:text-xl">notifications_active</span>
                                <h2 className="text-base md:text-lg font-bold">Notification Preferences</h2>
                            </div>
                            {/* Desktop Table View */}
                            <div className="hidden md:block bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 dark:bg-background-dark border-b border-slate-200 dark:border-white/5">
                                        <tr>
                                            <th className="p-4 md:p-5 font-bold uppercase tracking-wider text-xs text-slate-900 dark:text-white">Category</th>
                                            <th className="p-4 md:p-5 font-bold uppercase tracking-wider text-xs text-center text-slate-900 dark:text-white">Email</th>
                                            <th className="p-4 md:p-5 font-bold uppercase tracking-wider text-xs text-center text-slate-900 dark:text-white">App Push</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-slate-300">
                                        <tr>
                                            <td className="p-4 md:p-5 font-medium text-slate-900 dark:text-white">New Artist Applications</td>
                                            <td className="p-4 md:p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-4 md:p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 md:p-5 font-medium text-slate-900 dark:text-white">Audition Confirmations</td>
                                            <td className="p-4 md:p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-4 md:p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 md:p-5 font-medium text-slate-900 dark:text-white">Direct Messages</td>
                                            <td className="p-4 md:p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-4 md:p-5 text-center">
                                                <input className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-3">
                                <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 p-4 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-slate-900 dark:text-white">New Artist Applications</h4>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Email</span>
                                        <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">App Push</span>
                                        <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 p-4 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-slate-900 dark:text-white">Audition Confirmations</h4>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Email</span>
                                        <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">App Push</span>
                                        <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 p-4 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-slate-900 dark:text-white">Direct Messages</h4>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Email</span>
                                        <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">App Push</span>
                                        <input className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Subscription Management */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 md:mb-6 text-primary">
                                <span className="material-symbols-outlined text-lg md:text-xl">stars</span>
                                <h2 className="text-base md:text-lg font-bold">Studio Subscription</h2>
                            </div>
                            <div className="bg-gradient-to-r from-slate-900 to-black border border-primary/30 rounded-xl p-4 md:p-6 relative overflow-hidden shadow-lg">
                                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
                                    <div className="space-y-2 min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Active</span>
                                            <h3 className="text-lg md:text-2xl font-black italic text-white">STUDIO PREMIUM</h3>
                                        </div>
                                        <p className="text-slate-400 text-sm max-w-md">Your plan includes advanced talent filters, unlimited projects, and featured studio badges. Next billing: Nov 12, 2026.</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                        <button className="bg-white/5 border border-white/10 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">View Invoices</button>
                                        <button className="bg-primary text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-sm font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all">Manage Subscription</button>
                                    </div>
                                </div>
                                {/* Decorative background element */}
                                <div className="absolute -right-6 md:-right-10 -bottom-6 md:-bottom-10 opacity-10">
                                    <span className="material-symbols-outlined text-[120px] md:text-[180px] text-primary">business_center</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-4 md:mb-6 text-primary">
                                <span className="material-symbols-outlined text-lg md:text-xl">download</span>
                                <h2 className="text-base md:text-lg font-bold">Privacy & Data Export</h2>
                            </div>
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 p-4 md:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="space-y-1 min-w-0 flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Download My Data</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Export your account, profile, messages, notifications, and application data as JSON.</p>
                                </div>
                                <button
                                    onClick={handleExportData}
                                    disabled={exportingData}
                                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-all disabled:opacity-70 flex-shrink-0"
                                >
                                    {exportingData ? 'Preparing Export...' : 'Download My Data'}
                                </button>
                            </div>
                        </section>

                        {/* Danger Zone / Delete Account */}
                        <section className="pt-6 md:pt-8 border-t border-slate-200 dark:border-white/5">
                            <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 md:p-6 shadow-sm">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
                                    <div className="space-y-1 min-w-0 flex-1">
                                        <h3 className="font-bold text-rose-500 text-base md:text-lg">Deactivate or Delete Studio Account</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete your studio profile and all project history. This action cannot be undone.</p>
                                    </div>
                                    <button className="text-rose-500 text-sm font-bold border border-rose-500/30 px-4 md:px-5 py-2 md:py-2.5 rounded-lg hover:bg-rose-500 hover:text-white transition-all flex-shrink-0">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
            <footer className="mt-auto py-6 px-8 border-t border-slate-200 dark:border-border-dark text-center">
                <p className="text-xs text-slate-400 font-medium">© 2026 TalentConnect Entertainment. All rights reserved. Casting Partner: Cinematic Solutions.</p>
            </footer>
        </DashboardLayout>
    );
};

export default DirectorSettings;
