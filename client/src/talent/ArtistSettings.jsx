import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const ArtistSettings = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMyProfile();
                setProfile(res.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : profile?.profilePicture
    };

    if (loading) return (
        <DashboardLayout
            menuItems={TALENT_MENU}
            userRole="India • Artist"
            userData={{ name: "...", roleTitle: "...", avatar: "" }}
            headerTitle="Account Settings"
        >
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout
            menuItems={TALENT_MENU}
            userRole="India • Artist"
            userData={userData}
            headerTitle="Settings"
            headerSubtitle="Manage your profile privacy and account security."
            searchPlaceholder="Search settings..."
        >
            <div className="max-w-4xl space-y-12 pb-24">
                {/* Profile Visibility & Privacy */}
                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">visibility</span>
                        <h2 className="text-lg font-bold dark:text-white uppercase italic tracking-tighter">Profile Visibility & Privacy</h2>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 divide-y divide-slate-100 dark:divide-zinc-800 shadow-sm overflow-hidden">
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-slate-800 dark:text-white">Profile Searchable</p>
                                <p className="text-sm text-slate-500">Allow casting directors and studios to find your profile in global searches.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-slate-800 dark:text-white">Show Contact Details</p>
                                <p className="text-sm text-slate-500">Only verified studios and production houses can see your mobile and email.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Account Security */}
                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">security</span>
                        <h2 className="text-lg font-bold dark:text-white uppercase italic tracking-tighter">Account Security</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-colors group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">lock_reset</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-800 dark:text-white">Change Password</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                        </button>
                        <button className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-colors group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">verified_user</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-800 dark:text-white">Two-Factor Auth</p>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Enabled</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                        </button>
                    </div>
                </section>

                {/* Subscription Management */}
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
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md font-medium">Your plan includes priority search listing and unlimited applications. Next billing: Oct 24, 2024.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors uppercase tracking-widest text-center shadow-sm">Invoices</button>
                                <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all uppercase tracking-widest text-center">Manage</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="pt-8 border-t border-slate-100 dark:border-zinc-800">
                    <div className="bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h3 className="font-bold text-red-600">Delete Account</h3>
                            <p className="text-sm text-slate-500 font-medium font-display">Permanently delete your profile and all application history. This action cannot be undone.</p>
                        </div>
                        <button className="text-red-600 text-xs font-bold border border-red-200 dark:border-red-500/30 px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest shadow-sm">
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default ArtistSettings;
