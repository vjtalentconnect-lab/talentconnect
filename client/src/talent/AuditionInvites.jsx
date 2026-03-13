import React from 'react';
import { Link } from 'react-router-dom';

const AuditionInvites = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-surface-dark border-r border-neutral-dark flex flex-col hidden lg:flex">
                    <div className="p-6 flex items-center gap-3">
                        <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">movie_filter</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight leading-none text-white">TalentConnect</h1>
                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Artist Dashboard</p>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl" to="/dashboard/talent">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl" to="/talent/portfolio">
                            <span className="material-symbols-outlined">person</span>
                            <span className="font-medium">My Profile</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl" to="/talent/analytics">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="font-medium">Analytics</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl" to="/talent/applied-projects">
                            <span className="material-symbols-outlined">description</span>
                            <span className="font-medium">Applied Projects</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 border-l-4 border-primary text-primary rounded-xl" to="/talent/audition-invites">
                            <span className="material-symbols-outlined">mail</span>
                            <span className="font-medium">Audition Invites</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl" to="/talent/messages">
                            <span className="material-symbols-outlined">chat_bubble</span>
                            <span className="font-medium">Messages</span>
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
                    <div className="p-4 bg-neutral-dark/30 m-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_qa_TOlhITwTmTDDHDKWN8qnViF5eUihykCQYk9EPqXPemZecaxTmV96f7rq0JQ8LcH4EP92VsqLve_gHBk_ZW98BZacVy2a3ZhF2JsRPaCXeooJBNaVoM6yltN3XCKGD7JtOIqKuMzrBrVt553BK7iioBUdpOx8mgTHw-Qx91ruRT4t4DGVaq0FKD44mxSe0iLzqqVH29QnvDGMfpC9btLIg5amgokZ5FdN0ihcn-uM7nPl2qDeK4oGdOCgEV1auq1TfL4mbR1_')" }}></div>
                            <div>
                                <p className="text-sm font-bold text-white">Vikram Malhotra</p>
                                <Link className="text-[10px] text-primary uppercase tracking-wider font-bold hover:underline" to="/talent/upgrade">Upgrade to Pro</Link>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-neutral-dark hover:bg-neutral-dark/80 text-xs font-bold text-white rounded-lg transition-all">LOGOUT</button>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
                    {/* Header */}
                    <header className="h-20 border-b border-neutral-dark flex items-center justify-between px-8 bg-surface-dark/50 sticky top-0 z-10 backdrop-blur-md shrink-0">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-white">Audition Invites</h2>
                            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">4 NEW</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative hidden md:block">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                                <input className="bg-neutral-dark border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-1 focus:ring-primary text-white outline-none" placeholder="Search projects..." type="text" />
                            </div>
                            <button className="relative">
                                <span className="material-symbols-outlined text-slate-400">notifications</span>
                                <span className="absolute top-0 right-0 size-2 bg-primary rounded-full border-2 border-background-dark"></span>
                            </button>
                            <div className="size-10 rounded-full bg-slate-800 border-2 border-primary bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCafHkcRrTzAZKUwaOaht64tNPQtcIKoMI98NjfJ8jgv0t6mJjCwA2A37KoFKBMe3Q10YdRZoF2cIq6tutHx_ifxttn7MTNTFRPLcfp_cxx95Xs9LFIQEolnEUOsjVoq0jXlZd-itPEfm8LJ0pIPDaa5o02pzYuTC4Ik4I_ZV8T20QwCuDKlD6OypQbXH1nc4ydK_NQlWvZmZIAd-LMp5Fev7xn1rxJZdbfmUHn8PCEusOSiN_lbeutnnlO-_HM56TpMuxxc7vSEqDh')" }}></div>
                        </div>
                    </header>
                    <div className="p-8 space-y-8">
                        {/* Spotlight Card */}
                        <section className="relative overflow-hidden rounded-2xl bg-surface-dark border border-primary/20 p-8 flex flex-col md:flex-row gap-8 items-center group">
                            <div className="absolute top-0 right-0 bg-primary/10 px-4 py-1 rounded-bl-xl border-l border-b border-primary/20">
                                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Immediate Next</span>
                            </div>
                            <div className="w-full md:w-64 aspect-[3/4] rounded-xl overflow-hidden bg-slate-800 relative">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Spotlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfPbvRsFuO3qrieaHqYV59RwcJPkw7nE9JBDxVIznBLReEbSBD6r7hmOXA_I1jzn8WZ2iJhempI9H2gK7C8rps1IvPOxTPuPbC1pUs5izsf1PYrzPYTMTSXmhx1czPJNQBo4To8qQpDIBewzkju5TG7G0JELx6tu-O5gGQaaWXkiereJ_HEaT_VXkod6hwmLVAFXmOYLfuXeF1_W8PAwpzPIF_ZlZGgVBx_Qn4tWJb7PP79xZtgB9DCb3I-aaLtwXQFxlYonl3yCnf" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <div>
                                    <p className="text-primary text-xs font-bold tracking-[0.2em] mb-2 uppercase">Upcoming Spotlight</p>
                                    <h3 className="text-4xl font-black text-white leading-tight">The Last Dynasty</h3>
                                    <p className="text-slate-400 mt-2 font-medium">Empire Films Production | Dir. Sanjay Leela</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                    <div className="flex items-center gap-3 bg-neutral-dark/50 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-primary">person</span>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase">Role</p>
                                            <p className="text-sm font-bold text-white">Lead Actor - Vikram</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-neutral-dark/50 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-primary">schedule</span>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase">Date & Time</p>
                                            <p className="text-sm font-bold text-white">Tomorrow, 10:00 AM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-neutral-dark/50 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-primary">location_on</span>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase">Location</p>
                                            <p className="text-sm font-bold text-white">Studio 41, Mumbai</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-neutral-dark/50 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-primary">description</span>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase">Preparation</p>
                                            <p className="text-sm font-bold text-primary underline">Download Script</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                                    <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">PREPARE SCRIPT</button>
                                    <button className="px-8 py-3 bg-neutral-dark text-white font-bold rounded-xl hover:bg-neutral-dark/80 transition-all border border-slate-700">RESCHEDULE</button>
                                </div>
                            </div>
                        </section>
                        {/* Filters */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2 p-1 bg-surface-dark rounded-xl border border-neutral-dark overflow-x-auto no-scrollbar">
                                <button className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg whitespace-nowrap">New (4)</button>
                                <button className="px-6 py-2 text-slate-400 hover:text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap">Accepted</button>
                                <button className="px-6 py-2 text-slate-400 hover:text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap">Declined</button>
                                <button className="px-6 py-2 text-slate-400 hover:text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap">Completed</button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-dark text-slate-300 rounded-lg text-sm font-medium border border-neutral-dark hover:border-slate-600 transition-all">
                                <span className="material-symbols-outlined text-sm">tune</span>
                                More Filters
                            </button>
                        </div>
                        {/* Invites List */}
                        <div className="space-y-4 pb-12">
                            {/* Invite Item 1 */}
                            <div className="bg-surface-dark border border-neutral-dark p-5 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center gap-6 hover:border-primary/30 transition-all">
                                <div className="flex items-center gap-5 flex-1 w-full">
                                    <div className="size-16 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <img className="w-full h-full object-cover" alt="Invite 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdbk9wJTTct3vkDXNVyv44p_QFPD9KdK0al8mwyS4cUO1H82i-Ve__IZjuFMratoxVbwlMpKoOj0wE70O-i_GWRfOteAVRqRp4bcANHUugtxHPpCTE5zcON7fmCG1Qtk2_guMBVAaHkQ9Wobz3-Zj1UbOAQt2ACOGIDmkm4ovDzolKWIsc_nyf_V2bToMcRESwW8k-jvSSsedeP7jPmaHCoVk5hYTpolkYpi4pfZcYfzsYBZwDR0VvtJCI1ftvyWxizdJ5tMAwwBAM" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-lg text-white truncate">Urban Chronicles</h4>
                                            <span className="shrink-0 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">person</span>Supporting - Aryan</span>
                                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">apartment</span>Red Chillies Entertainment</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-2 lg:w-48 shrink-0">
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="material-symbols-outlined text-slate-500 text-sm">calendar_today</span>
                                        <span className="font-medium whitespace-nowrap">Oct 24, 2023</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="material-symbols-outlined text-slate-500 text-sm">location_on</span>
                                        <span className="font-medium whitespace-nowrap">Online Audition</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
                                    <Link className="flex-1 lg:flex-none px-5 py-2.5 bg-neutral-dark text-white text-sm font-bold rounded-xl border border-slate-700 hover:bg-slate-800 transition-all text-center" to="/talent/audition-details">View Details</Link>
                                    <button className="flex-1 lg:flex-none px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/10">Accept</button>
                                    <button className="p-2.5 text-slate-500 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Pagination/Load More */}
                        <div className="flex justify-center pt-8 pb-12">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                                <span className="text-sm font-bold">LOAD MORE INVITES</span>
                                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AuditionInvites;
