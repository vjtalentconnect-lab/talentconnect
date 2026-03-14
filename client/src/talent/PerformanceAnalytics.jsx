import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const PerformanceAnalytics = () => {
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
            headerTitle="Performance Analytics"
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
            headerTitle="Performance Analytics"
            headerSubtitle="Insights into your career growth and profile performance."
            searchPlaceholder="Search analytics..."
        >
            <div className="space-y-8 pb-12">
                {/* Hero Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">visibility</span>
                            <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">+12.5% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Profile Views</p>
                        <h3 className="text-3xl font-black mt-1 dark:text-slate-100 italic tracking-tighter uppercase">12,402</h3>
                        <p className="text-xs text-slate-400 mt-2">vs 11,024 last month</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">search_check</span>
                            <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">+5.2% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Search Appearances</p>
                        <h3 className="text-3xl font-black mt-1 dark:text-slate-100 italic tracking-tighter uppercase">3,218</h3>
                        <p className="text-xs text-slate-400 mt-2">Appeared in top 10 search results</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">check_circle</span>
                            <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">+8.1% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Application Success Rate</p>
                        <h3 className="text-3xl font-black mt-1 dark:text-slate-100 italic tracking-tighter uppercase">68%</h3>
                        <p className="text-xs text-slate-400 mt-2">Shortlisted in 12 of 18 projects</p>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Views Over Time Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold dark:text-slate-100 uppercase italic tracking-tighter">Views Over Time</h4>
                            <select className="bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-xs rounded-lg text-slate-500 dark:text-slate-400 px-3 py-1.5 focus:ring-primary focus:border-primary border">
                                <option>Last 30 Days</option>
                                <option>Last 3 Months</option>
                                <option>All Time</option>
                            </select>
                        </div>
                        <div className="h-[280px] w-full relative">
                            {/* SVG Placeholder for Chart */}
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 240">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" stopColor="#ee2b3b" stopOpacity="0.3"></stop>
                                        <stop offset="100%" stopColor="#ee2b3b" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,180 Q100,160 200,190 T400,120 T600,150 T800,40 L800,240 L0,240 Z" fill="url(#chartGradient)"></path>
                                <path d="M0,180 Q100,160 200,190 T400,120 T600,150 T800,40" fill="none" stroke="#ee2b3b" strokeLinecap="round" strokeWidth="4"></path>
                                {/* Points */}
                                <circle cx="400" cy="120" fill="#ee2b3b" r="6"></circle>
                                <circle cx="800" cy="40" fill="#ee2b3b" r="6"></circle>
                            </svg>
                            <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
                                <span>Week 1</span>
                                <span>Week 2</span>
                                <span>Week 3</span>
                                <span>Week 4</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-white dark:from-zinc-900 to-primary/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-primary">
                            <span className="material-symbols-outlined">bolt</span>
                            <h4 className="font-bold uppercase italic tracking-tighter">AI Optimizer</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-100 dark:border-zinc-800 group hover:border-primary/40 transition-colors cursor-pointer">
                                <p className="text-sm font-bold dark:text-slate-200">Update Headshots</p>
                                <p className="text-xs text-slate-500 mt-1">Profile views increase by 20% on average with 2024 professional headshots.</p>
                                <button className="mt-3 text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-widest">View Photographers <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-100 dark:border-zinc-800 group hover:border-primary/40 transition-colors cursor-pointer">
                                <p className="text-sm font-bold dark:text-slate-200">Add Voice Sample</p>
                                <p className="text-xs text-slate-500 mt-1">Dubbing houses are searching for 'Deep Baritone'. Add a sample to appear in filters.</p>
                                <button className="mt-3 text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-widest">Upload Audio <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Projects */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                            <h4 className="font-bold dark:text-slate-100 uppercase italic tracking-tighter">Top Performing Projects</h4>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Shortlist Highs</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                            <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="w-12 h-16 bg-slate-100 dark:bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBc8ByvDvMk6LBEcLgLSmqXYFACP3dGikvgPzlEyslBCSKR5SnIcuoiTDAutFifsEYo8wzsdg5JmAzuiwvq7jJLkt8H7D4Dmuga55MRxvz0ITMFeQfx__u4up_k0aXTRFI9VWhHQFQNtMItBEUNPCLFIwHrmwyRcu4qpUHPVqUkUK-IX_FNhxon4WJdFMc-7sWYTj5EwAirIpv95IZuw5PeLbx-B1x4H5JX6uozhUPmiP0auapzZSsBskYwpwbl8mT9nhi-c6-O9d6F')" }}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold dark:text-slate-100 truncate uppercase text-sm tracking-tight italic">The Shadow Protocol</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Feature Film • Primary Antagonist</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-green-500 text-xs font-bold uppercase tracking-widest">Selected</div>
                                    <div className="text-[10px] text-slate-400 font-black uppercase">Aug 2024</div>
                                </div>
                            </div>
                            <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="w-12 h-16 bg-slate-100 dark:bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKqtgm4FUngCv-nZdJkRwsO6d0jLeYv1OTv3JyOZOfWb6wsYkO1i2kHvqyjJtKVE6hSEQGZgjdTwejqJhyBDVwcHZl52KMuv85f6PsRtJGGaNG3EFpQL5pO21xfuMTDPOFHykwN2fxDCb1ZBgFEj_uKgBx6b2pngCVzjemgccS-fe99YoGHY6JxaLB11N9ofoQu1Z8_Y4hNZDBamhtJIbbsLf4iKTrgJ8Bl5S7kSOonKTsFD_IwR7ISalhThUj8dCjCQdlTCawVh3J')" }}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold dark:text-slate-100 truncate uppercase text-sm tracking-tight italic">Midnight in Mumbai</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Web Series • Supporting Lead</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-primary text-xs font-bold uppercase tracking-widest">Shortlisted</div>
                                    <div className="text-[10px] text-slate-400 font-black uppercase">Jul 2024</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Industry Reach */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <h4 className="font-bold dark:text-slate-100 mb-6 uppercase italic tracking-tighter">Industry Reach</h4>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
                                    <span>Bollywood Productions</span>
                                    <span>45%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
                                    <span>Advertising Agencies</span>
                                    <span>32%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary/70 h-full rounded-full" style={{ width: "32%" }}></div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-50 dark:border-zinc-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold dark:text-slate-300">Director Rating</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Highly Professional</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl font-black text-primary italic tracking-tighter">4.9</span>
                                        <span className="material-symbols-outlined text-primary fill-1">star</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PerformanceAnalytics;
