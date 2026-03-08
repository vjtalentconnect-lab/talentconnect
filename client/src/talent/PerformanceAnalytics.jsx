import React from 'react';
import { Link } from 'react-router-dom';

const PerformanceAnalytics = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-neutral-dark border-r border-neutral-border flex flex-col hidden lg:flex">
                    <div className="p-6 flex items-center gap-3">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">theater_comedy</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-100">StarCast <span className="text-primary text-sm align-top">India</span></h2>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-1">
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl transition-colors" to="/dashboard/talent">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-medium text-sm">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl transition-colors" to="/talent/portfolio">
                            <span className="material-symbols-outlined">person</span>
                            <span className="font-medium text-sm">My Profile</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl transition-colors border border-primary/20" to="/talent/analytics">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="font-medium text-sm">Analytics</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl transition-colors" to="/talent/audition-invites">
                            <span className="material-symbols-outlined">mail</span>
                            <span className="font-medium text-sm">Audition Invites</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all" to="/talent/settings">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all" to="/support">
                            <span className="material-symbols-outlined">help</span>
                            <span className="text-sm font-medium">Support</span>
                        </Link>
                    </nav>
                    <div className="p-6 border-t border-neutral-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-primary/30" data-alt="Portrait of artist Aryan Sharma" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDotYn7rxwnAyPjkxGl4fikIgNt0Sv5O8yd58TVZXsprg6sW3ozgY78WBql0DmIvQl9u8w8N98NE0XJPs6YXqu4nhJy0XAYI7iEfqJgYBt8rc6BLUkNYXxQ6BV7OZpyxqHXvTMs8R0DoFlJJhbyXOzAVGztdjbvUjIaT1iuinUsX-PRXdz-diY4TK6HDptQmWELwhnAXdbKrtRvt9TsdNnjbFmZVjLJeYn2eld_eNJD4cYew69j9GmcrixZK_gAMOsioDAjiTesc0E0')" }}></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate text-slate-100">Aryan Sharma</p>
                                <Link className="text-[10px] text-primary uppercase tracking-wider font-bold hover:underline" to="/talent/upgrade">Upgrade to Pro</Link>
                            </div>
                            <button className="text-slate-500 hover:text-white">
                                <span className="material-symbols-outlined text-xl">logout</span>
                            </button>
                        </div>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
                    {/* Top Nav */}
                    <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-border px-8 py-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold dark:text-slate-100">Performance Analytics</h1>
                            <p className="text-sm text-slate-500">Real-time insights for your professional profile</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                                <input className="bg-neutral-dark border-none rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-primary w-64 placeholder:text-slate-600" placeholder="Search insights..." type="text" />
                            </div>
                            <button className="p-2 rounded-xl bg-neutral-dark text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                                <span className="material-symbols-outlined text-lg">share</span>
                                Share Profile
                            </button>
                        </div>
                    </header>
                    <div className="p-8 space-y-8 max-w-7xl mx-auto">
                        {/* Hero Stats */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-neutral-dark p-6 rounded-2xl border border-neutral-border">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">visibility</span>
                                    <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">+12.5% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                                </div>
                                <p className="text-slate-400 text-sm font-medium">Total Profile Views</p>
                                <h3 className="text-3xl font-black mt-1 text-slate-100">12,402</h3>
                                <p className="text-xs text-slate-600 mt-2">vs 11,024 last month</p>
                            </div>
                            <div className="bg-neutral-dark p-6 rounded-2xl border border-neutral-border">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">search_check</span>
                                    <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">+5.2% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                                </div>
                                <p className="text-slate-400 text-sm font-medium">Search Appearances</p>
                                <h3 className="text-3xl font-black mt-1 text-slate-100">3,218</h3>
                                <p className="text-xs text-slate-600 mt-2">Appeared in top 10 search results</p>
                            </div>
                            <div className="bg-neutral-dark p-6 rounded-2xl border border-neutral-border">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">check_circle</span>
                                    <span className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">+8.1% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                                </div>
                                <p className="text-slate-400 text-sm font-medium">Application Success Rate</p>
                                <h3 className="text-3xl font-black mt-1 text-slate-100">68%</h3>
                                <p className="text-xs text-slate-600 mt-2">Shortlisted in 12 of 18 projects</p>
                            </div>
                        </section>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Views Over Time Chart */}
                            <div className="lg:col-span-2 bg-neutral-dark p-6 rounded-2xl border border-neutral-border">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="font-bold text-slate-100">Views Over Time</h4>
                                    <select className="bg-background-dark border-neutral-border text-xs rounded-lg text-slate-400 px-3 py-1.5 focus:ring-primary focus:border-primary border">
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
                                    <div className="flex justify-between mt-4 text-xs text-slate-600 font-bold uppercase tracking-wider">
                                        <span>Week 1</span>
                                        <span>Week 2</span>
                                        <span>Week 3</span>
                                        <span>Week 4</span>
                                    </div>
                                </div>
                            </div>
                            {/* AI Insights */}
                            <div className="bg-neutral-dark p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-neutral-dark to-primary/5">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <span className="material-symbols-outlined">bolt</span>
                                    <h4 className="font-bold">AI Profile Optimizer</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-background-dark/50 rounded-xl border border-neutral-border group hover:border-primary/40 transition-colors cursor-pointer">
                                        <p className="text-sm font-semibold text-slate-200">Update Headshots</p>
                                        <p className="text-xs text-slate-500 mt-1">Profile views increase by 20% on average with 2024 professional headshots.</p>
                                        <button className="mt-3 text-xs font-bold text-primary flex items-center gap-1 uppercase tracking-tight">View Photographers <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
                                    </div>
                                    <div className="p-4 bg-background-dark/50 rounded-xl border border-neutral-border group hover:border-primary/40 transition-colors cursor-pointer">
                                        <p className="text-sm font-semibold text-slate-200">Add Voice Sample</p>
                                        <p className="text-xs text-slate-500 mt-1">Dubbing houses are searching for 'Deep Baritone'. Add a sample to appear in filters.</p>
                                        <button className="mt-3 text-xs font-bold text-primary flex items-center gap-1 uppercase tracking-tight">Upload Audio <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
                                    </div>
                                    <div className="p-4 bg-background-dark/50 rounded-xl border border-neutral-border group hover:border-primary/40 transition-colors cursor-pointer">
                                        <p className="text-sm font-semibold text-slate-200">Location Tag</p>
                                        <p className="text-xs text-slate-500 mt-1">You are getting traction in Hyderabad. Set status as 'Willing to Travel'.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Top Projects */}
                            <div className="bg-neutral-dark rounded-2xl border border-neutral-border overflow-hidden">
                                <div className="p-6 border-b border-neutral-border flex items-center justify-between">
                                    <h4 className="font-bold text-slate-100">Top Performing Projects</h4>
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Shortlist Highs</span>
                                </div>
                                <div className="divide-y divide-neutral-border">
                                    <div className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="w-12 h-16 bg-background-dark rounded overflow-hidden flex-shrink-0">
                                            <div className="w-full h-full bg-cover bg-center" data-alt="Action movie poster placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBc8ByvDvMk6LBEcLgLSmqXYFACP3dGikvgPzlEyslBCSKR5SnIcuoiTDAutFifsEYo8wzsdg5JmAzuiwvq7jJLkt8H7D4Dmuga55MRxvz0ITMFeQfx__u4up_k0aXTRFI9VWhHQFQNtMItBEUNPCLFIwHrmwyRcu4qpUHPVqUkUK-IX_FNhxon4WJdFMc-7sWYTj5EwAirIpv95IZuw5PeLbx-B1x4H5JX6uozhUPmiP0auapzZSsBskYwpwbl8mT9nhi-c6-O9d6F')" }}></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-100 truncate">The Shadow Protocol</p>
                                            <p className="text-xs text-slate-500">Feature Film • Primary Antagonist</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-500 text-sm font-bold">Selected</div>
                                            <div className="text-[10px] text-slate-600 uppercase font-black">Aug 2024</div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="w-12 h-16 bg-background-dark rounded overflow-hidden flex-shrink-0">
                                            <div className="w-full h-full bg-cover bg-center" data-alt="Drama series poster placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKqtgm4FUngCv-nZdJkRwsO6d0jLeYv1OTv3JyOZOfWb6wsYkO1i2kHvqyjJtKVE6hSEQGZgjdTwejqJhyBDVwcHZl52KMuv85f6PsRtJGGaNG3EFpQL5pO21xfuMTDPOFHykwN2fxDCb1ZBgFEj_uKgBx6b2pngCVzjemgccS-fe99YoGHY6JxaLB11N9ofoQu1Z8_Y4hNZDBamhtJIbbsLf4iKTrgJ8Bl5S7kSOonKTsFD_IwR7ISalhThUj8dCjCQdlTCawVh3J')" }}></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-100 truncate">Midnight in Mumbai</p>
                                            <p className="text-xs text-slate-500">Web Series • Supporting Lead</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-primary text-sm font-bold">Shortlisted</div>
                                            <div className="text-[10px] text-slate-600 uppercase font-black">Jul 2024</div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="w-12 h-16 bg-background-dark rounded overflow-hidden flex-shrink-0">
                                            <div className="w-full h-full bg-cover bg-center" data-alt="Coffee commercial still" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJxbDKZ58bAx4PEMCx88iD7HPPYY2mOdbW_sTFkd9BHSIFHOBfUBD2FNOmbFKJB1McglNfK0_myoI6VgoHuJSezeEbpoHNbcI3Y8W1YSa5wZsOldrCJfShJUkk-88GeQJHFi080Z_h8_KDeCcl4r58MjdDtKnZ-S49a03c5oO1KPU-_YND2-LSiqfwpbNmsMpCh0xQNiXg235-bpLul0zgNGz9IKV5LE8J1j8LMDrE2RGXN6IxU7Qq624Tdg4ez5Jdr-o-NJ5n57Po')" }}></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-100 truncate">Bru Coffee TVC</p>
                                            <p className="text-xs text-slate-500">Ad Commercial • Protagonist</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-slate-400 text-sm font-bold">Final Round</div>
                                            <div className="text-[10px] text-slate-600 uppercase font-black">Jun 2024</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Industry Reach & Feedback */}
                            <div className="space-y-6">
                                <div className="bg-neutral-dark p-6 rounded-2xl border border-neutral-border">
                                    <h4 className="font-bold text-slate-100 mb-4">Industry Reach</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5 uppercase">
                                                <span>Bollywood Productions</span>
                                                <span>45%</span>
                                            </div>
                                            <div className="w-full bg-background-dark h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5 uppercase">
                                                <span>Advertising Agencies</span>
                                                <span>32%</span>
                                            </div>
                                            <div className="w-full bg-background-dark h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary/70 h-full rounded-full" style={{ width: "32%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5 uppercase">
                                                <span>South Indian Cinema</span>
                                                <span>23%</span>
                                            </div>
                                            <div className="w-full bg-background-dark h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary/40 h-full rounded-full" style={{ width: "23%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Feedback & Ratings */}
                                <div className="bg-neutral-dark p-6 rounded-2xl border border-neutral-border">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-bold text-slate-100">Director Ratings</h4>
                                        <div className="flex items-center gap-1">
                                            <span className="text-primary font-black text-xl">4.9</span>
                                            <span className="material-symbols-outlined text-primary text-lg fill-1">star</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold">Versatile Performance</span>
                                        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold">Highly Professional</span>
                                        <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold">Great Screen Presence</span>
                                        <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold">Disciplined</span>
                                        <span className="bg-white/5 text-slate-400 border border-white/10 px-3 py-1 rounded-full text-xs font-bold">+12 More Tags</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Navigation Overlay */}
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-dark border-t border-neutral-border px-6 py-3 flex justify-between items-center z-50">
                        <Link className="text-primary flex flex-col items-center gap-1" to="/talent/analytics">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="text-[10px] font-bold">Analytics</span>
                        </Link>
                        <Link className="text-slate-500 flex flex-col items-center gap-1" to="/dashboard/talent">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-[10px] font-bold">Home</span>
                        </Link>
                        <Link className="text-slate-500 flex flex-col items-center gap-1" to="/talent/audition-invites">
                            <span className="material-symbols-outlined">mail</span>
                            <span className="text-[10px] font-bold">Invites</span>
                        </Link>
                        <Link className="text-slate-500 flex flex-col items-center gap-1" to="/talent/portfolio">
                            <span className="material-symbols-outlined">person</span>
                            <span className="text-[10px] font-bold">Profile</span>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PerformanceAnalytics;
