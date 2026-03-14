import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { DIRECTOR_MENU } from '../constants/navigation';

const DirectorSettings = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getMyProfile();
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching director profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

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
                        {/* Project Visibility & Privacy */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">visibility</span>
                                <h2 className="text-lg font-bold">Project Visibility & Privacy</h2>
                            </div>
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5 shadow-sm">
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-bold">Public Project Listings</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Allow artists to find your projects in global searches.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-bold">Show Studio Details</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Only verified artists can see your studio's official contact information.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Account Security */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">security</span>
                                <h2 className="text-lg font-bold">Account Security</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex items-center justify-between p-5 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">lock_reset</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold">Change Password</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Last changed 2 months ago</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                                <button className="flex items-center justify-between p-5 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">verified_user</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold">Two-Factor Auth</p>
                                            <p className="text-xs text-emerald-500 font-medium">Currently Enabled</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                            </div>
                        </section>

                        {/* Notification Preferences */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">notifications_active</span>
                                <h2 className="text-lg font-bold">Notification Preferences</h2>
                            </div>
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 dark:bg-background-dark border-b border-slate-200 dark:border-white/5">
                                        <tr>
                                            <th className="p-5 font-bold uppercase tracking-wider text-xs">Category</th>
                                            <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">Email</th>
                                            <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">App Push</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-slate-300">
                                        <tr>
                                            <td className="p-5 font-medium">New Artist Applications</td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-5 font-medium">Audition Confirmations</td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-5 font-medium">Direct Messages</td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-5 text-center">
                                                <input className="w-5 h-5 rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Subscription Management */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">stars</span>
                                <h2 className="text-lg font-bold">Studio Subscription</h2>
                            </div>
                            <div className="bg-gradient-to-r from-slate-900 to-black border border-primary/30 rounded-xl p-6 relative overflow-hidden shadow-lg">
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Active</span>
                                            <h3 className="text-2xl font-black italic text-white">STUDIO PREMIUM</h3>
                                        </div>
                                        <p className="text-slate-400 text-sm max-w-md">Your plan includes advanced talent filters, unlimited projects, and featured studio badges. Next billing: Nov 12, 2026.</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">View Invoices</button>
                                        <button className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all">Manage Subscription</button>
                                    </div>
                                </div>
                                {/* Decorative background element */}
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                                    <span className="material-symbols-outlined text-[180px] text-primary">business_center</span>
                                </div>
                            </div>
                        </section>

                        {/* Danger Zone / Delete Account */}
                        <section className="pt-8 border-t border-slate-200 dark:border-white/5">
                            <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-rose-500">Deactivate or Delete Studio Account</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete your studio profile and all project history. This action cannot be undone.</p>
                                    </div>
                                    <button className="text-rose-500 text-sm font-bold border border-rose-500/30 px-5 py-2.5 rounded-lg hover:bg-rose-500 hover:text-white transition-all">
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
