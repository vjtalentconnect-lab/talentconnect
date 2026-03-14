import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const AppliedProjects = () => {
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
            headerTitle="Applied Projects"
            headerSubtitle="Tracking your journey."
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
            headerTitle="Applied Projects"
            headerSubtitle="Manage and track your project applications."
            searchPlaceholder="Search your applications..."
        >
            <div className="space-y-8 pb-12">
                {/* Next Action Alert */}
                <div className="bg-gradient-to-r from-primary/20 to-transparent border-l-4 border-primary rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
                            <span className="material-symbols-outlined">event_available</span>
                        </div>
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest">Next Action Required</p>
                            <h3 className="text-lg font-bold">Screen Test: The Last Dynasty</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Scheduled for Oct 12, 2023 at Empire Studios, Mumbai.</p>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
                        View Preparation Guide
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-bold whitespace-nowrap">All Applications</button>
                    <button className="px-5 py-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap">Shortlisted (3)</button>
                    <button className="px-5 py-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap">Auditioned (12)</button>
                    <button className="px-5 py-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap">Offered (1)</button>
                    <button className="px-5 py-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap">Archived</button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {/* Project Card 1 */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Poster" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAZPX8u1_A47ALuHFNnEBTFNKYg9NcJDfAxPf0Z3si4hrQFcl95a_5EXiZaD8Zh5uomahapus0a7tBPl3ngQ_puxwF8hAaONxXGGw9vpabolKxu07wOQ__FxZkXysWlXLtzFxClheDsRyPmV7qEeZ9kG4lssWZKGnurEjZFiGQku5lyhQFOuWunHXbYYVdSYAs_qhlz2MB9Yk-5tJG8kPqCSpsloDI3DNTUuenVfPRhmKgEqxNivf0AFcLxA2wP8wtWientgGtMY8r" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-tighter">Shortlisted</span>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <h4 className="text-lg font-bold uppercase italic tracking-tighter dark:text-white">The Last Dynasty</h4>
                                <p className="text-sm text-slate-500 flex items-center gap-1 font-bold">
                                    <span className="material-symbols-outlined text-sm">movie</span> Empire Films
                                </p>
                            </div>
                            <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                    <p className="text-sm font-black uppercase tracking-tight italic dark:text-slate-200">Lead Actor (Vikram)</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Applied: Oct 01, 2023</p>
                                </div>
                                <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Project Card 2 */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="BTS" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAivESeqKo8_uzKQ_UBtvSkx8lG7BrbkrjPmgyRcKEDRYLDTDU5zXoDnl2N4zcJUzbui3NxzYXICtPny5Ek9Tl3p1LWcFLd-QFWxeSfjoiEIGzcNetqfRhUtctSB8LWDOAREtvNebOmDX4P55jOuFn6modk8gAuT1_H83mxhUhFaFhFzZ7bYlA_t0GasgJ-tFCnoOy2Oyw9SkjlhFPrLvYUjBlbaKBN1Wl6DqpfyRj6tdqBbCSQzUiaaOKazjEnyap5ZvtJG6RZgAUZ" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="px-2 py-1 bg-blue-500 text-white text-[10px] font-bold rounded uppercase tracking-tighter">Under Review</span>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <h4 className="text-lg font-bold uppercase italic tracking-tighter dark:text-white">Midnight in Mumbai</h4>
                                <p className="text-sm text-slate-500 flex items-center gap-1 font-bold">
                                    <span className="material-symbols-outlined text-sm">movie</span> Red Chillies Ent.
                                </p>
                            </div>
                            <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                    <p className="text-sm font-black uppercase tracking-tight italic dark:text-slate-200">Supporting Role</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Applied: Sep 28, 2023</p>
                                </div>
                                <button className="p-2 bg-slate-100 dark:bg-zinc-800 text-slate-400 rounded-lg hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Project Card 3 */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Urban" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMj6uYplfAEEhMePKZht_nMrPl3S9WdnRO0n5M9uBUrm-kiRXcraOVlK5jJqBFz_GsC3085JKeMFHcwhnHp94Mrvb8ZD8KUjCMb7bTiZR2lQXSR2-yEWNF2PYt6XPoHZc0Fw2ttMMH38PC8JfqTp7XHlVwn-zAxaEs1MYW8iqZ--ImvDIl8uL0dsd-FjIbNn2AxrKgY5I9ISslsKZiqpCq1OQFl27TfZGG-6KOBko9qIU4Qd4JPHPUWaIDrmzKINvlXRq1aqSFtUfK" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="px-2 py-1 bg-slate-500 text-white text-[10px] font-bold rounded uppercase tracking-tighter">Applied</span>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <h4 className="text-lg font-bold uppercase italic tracking-tighter dark:text-white">Urban Legend: S2</h4>
                                <p className="text-sm text-slate-500 flex items-center gap-1 font-bold">
                                    <span className="material-symbols-outlined text-sm">tv</span> Netflix India
                                </p>
                            </div>
                            <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                    <p className="text-sm font-black uppercase tracking-tight italic dark:text-slate-200">Protagonist (Siddharth)</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Applied: Sep 25, 2023</p>
                                </div>
                                <button className="p-2 bg-slate-100 dark:bg-zinc-800 text-slate-400 rounded-lg hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Project Card 4 */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAR_9bAT79ID5vgTiv9YJ7u0vFHOv3Xmitzf971hj10jg6A4_JZINSYyCcUSZ0_XViK3u6l-HIZW0k1cTuhky_CCLxj5nZXgDQDdSmJTBvPKWbhuCqvOl5U3BKqK_qXX5IvtEPkj8zKJL86aeyfvfb1ThnbaCKNuG0Pwd65l4j6dYVW8uW65MdpF1-vERHn4H0XM8hklwhba0evGkbz0NqSPVMoxjv0mT9Hqb2Zfq05QDKDpuHqgIcCWGjX453dJeIjJ_h_Q3MgL54" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase tracking-tighter">Offered</span>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <h4 className="text-lg font-bold uppercase italic tracking-tighter dark:text-white">Zenith Watch TVC</h4>
                                <p className="text-sm text-slate-500 flex items-center gap-1 font-bold">
                                    <span className="material-symbols-outlined text-sm">ads_click</span> Publicis India
                                </p>
                            </div>
                            <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                    <p className="text-sm font-black uppercase tracking-tight italic dark:text-slate-200">Main Character</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Applied: Sep 15, 2023</p>
                                </div>
                                <button className="px-3 py-2 bg-green-500/20 text-green-500 text-xs font-bold rounded-lg hover:bg-green-500 hover:text-white transition-all uppercase tracking-widest">
                                    Review Contract
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AppliedProjects;
