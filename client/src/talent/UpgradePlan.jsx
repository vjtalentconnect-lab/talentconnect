import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const UpgradePlan = () => {
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
            headerTitle="Upgrade Plan"
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
            headerTitle="Artist Membership"
            headerSubtitle="Unlock premium features and boost your career visibility."
        >
            <div className="max-w-6xl space-y-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase mb-2 dark:text-white">Basic</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black italic tracking-tighter dark:text-white">₹0</span>
                                <span className="text-slate-400 text-xs font-bold uppercase">/month</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {['Create Basic Profile', '5 Applications/Month', 'Community Access'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-slate-300 text-lg">check_circle</span>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest">Current Plan</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white dark:bg-zinc-900 border-2 border-primary rounded-3xl p-8 shadow-2xl shadow-primary/10 flex flex-col relative overflow-hidden">
                        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Recommended</div>
                        <div className="mb-8">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase mb-2 text-primary">Pro Artist</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black italic tracking-tighter dark:text-white">₹499</span>
                                <span className="text-slate-400 text-xs font-bold uppercase">/month</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {['Unlimited Applications', 'Verified Badge', 'Priority Search Listing', 'Detailed Profile Analytics', 'Direct Agent Contact'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-bold dark:text-slate-200">
                                    <span className="material-symbols-outlined text-primary text-lg fill-1">check_circle</span>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/30 hover:brightness-110 transition-all">Upgrade to Pro</button>
                    </div>

                    {/* Elite Plan */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col text-white">
                        <div className="mb-8">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase mb-2">Elite Talent</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black italic tracking-tighter">₹1,299</span>
                                <span className="text-slate-500 text-xs font-bold uppercase">/month</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {['Everything in Pro', 'Exclusive Workshop Access', 'Professional Headshot Session', 'Personal Career Manager'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-400">
                                    <span className="material-symbols-outlined text-slate-600 text-lg">check_circle</span>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 bg-white text-zinc-950 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Go Elite</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UpgradePlan;
