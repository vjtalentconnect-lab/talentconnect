import React from 'react';
import { Link } from 'react-router-dom';

const AppliedProjects = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-slate-50 dark:bg-zinc-900/50 border-r border-slate-200 dark:border-zinc-800 flex flex-col">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">theater_comedy</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-none">StarCast</h1>
                            <p className="text-xs text-primary font-medium uppercase tracking-wider">Artist Dashboard</p>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 space-y-1 mt-4">
                        <Link className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/dashboard/talent">
                            <span className="material-symbols-outlined text-[22px]">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/portfolio">
                            <span className="material-symbols-outlined text-[22px]">person</span>
                            <span className="text-sm font-medium">My Profile</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/analytics">
                            <span className="material-symbols-outlined text-[22px]">analytics</span>
                            <span className="text-sm font-medium">Analytics</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20" to="/talent/applied-projects">
                            <span className="material-symbols-outlined text-[22px]">work</span>
                            <span className="text-sm font-medium">Applied Projects</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/audition-invites">
                            <span className="material-symbols-outlined text-[22px]">video_call</span>
                            <span className="text-sm font-medium">Audition Invites</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/messages">
                            <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
                            <span className="text-sm font-medium">Messages</span>
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
                    <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-3 p-2 bg-slate-100 dark:bg-zinc-800/50 rounded-xl">
                            <img className="w-10 h-10 rounded-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm9gQVSOKE8XE_aBPAvgNcp3s_aMxLf-sgHBEblals_OzZcJio_BhagqMLHD2UOQg_1jkaXUfutGnUCKIURnR6i3C0uzJKpE4FF7bU3Xb4gZ_lOmeG6w2H_Wshk1Khy8I5Jl_tC-kZOqYN9R4-q2gVQ29BcmTEWnhm6rUV-7vNr7hwnT4P_0UP5xWxwCuCEXvoI777woCVd_p1Q5LddnWcC1yN6qS1B6jQ3y11nVMMzMBs5IMR9vK96W2_-aZkGpKorQjCT5GRjtGr" />
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold truncate">Arjun Malhotra</p>
                                <Link className="text-[10px] text-primary uppercase tracking-wider font-bold hover:underline" to="/talent/upgrade">Upgrade to Pro</Link>
                            </div>
                            <button className="text-slate-400 hover:text-primary">
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                            </button>
                        </div>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
                    {/* Header */}
                    <header className="h-16 flex items-center justify-between px-8 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 shrink-0">
                        <h2 className="text-xl font-bold">Applied Projects</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                                <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-zinc-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary w-64 text-slate-700 dark:text-slate-200" placeholder="Search projects..." type="text" />
                            </div>
                            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                        </div>
                    </header>
                    {/* Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
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
                                        <h4 className="text-lg font-bold">The Last Dynasty</h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">movie</span> Empire Films
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                            <p className="text-sm font-semibold">Lead Actor (Vikram)</p>
                                            <p className="text-[10px] text-slate-400 mt-2">Applied: Oct 01, 2023</p>
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
                                        <h4 className="text-lg font-bold">Midnight in Mumbai</h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">movie</span> Red Chillies Ent.
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                            <p className="text-sm font-semibold">Supporting Role</p>
                                            <p className="text-[10px] text-slate-400 mt-2">Applied: Sep 28, 2023</p>
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
                                        <h4 className="text-lg font-bold">Urban Legend: S2</h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">tv</span> Netflix India
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                            <p className="text-sm font-semibold">Protagonist (Siddharth)</p>
                                            <p className="text-[10px] text-slate-400 mt-2">Applied: Sep 25, 2023</p>
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
                                        <h4 className="text-lg font-bold">Zenith Watch TVC</h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">ads_click</span> Publicis India
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-slate-100 dark:border-zinc-800 pt-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Applied Position</p>
                                            <p className="text-sm font-semibold">Main Character</p>
                                            <p className="text-[10px] text-slate-400 mt-2">Applied: Sep 15, 2023</p>
                                        </div>
                                        <button className="px-3 py-2 bg-green-500/20 text-green-500 text-xs font-bold rounded-lg hover:bg-green-500 hover:text-white transition-all">
                                            Review Contract
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppliedProjects;
