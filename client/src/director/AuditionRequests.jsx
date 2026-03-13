import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuditionRequests = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex font-display transition-colors duration-300">
            <div className="flex w-full h-screen overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-72 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-primary/20 flex flex-col shrink-0">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">movie_filter</span>
                            </div>
                            <div>
                                <h1 className="font-display font-bold text-lg leading-none">TalentConnect</h1>
                                <p className="text-xs text-slate-500 dark:text-primary/70 uppercase tracking-widest font-semibold mt-1">Director's Hub</p>
                            </div>
                        </div>
                        <nav className="space-y-1">
                            <Link to="/dashboard/director" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="font-medium">Dashboard</span>
                            </Link>
                            <Link to="/director/my-projects" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">movie</span>
                                <span className="font-medium">Active Projects</span>
                            </Link>
                            <Link to="/director/shortlists" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">groups</span>
                                <span className="font-medium">Talent Pool</span>
                            </Link>
                            <Link to="/director/auditions" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined">record_voice_over</span>
                                <span className="font-medium">Auditions</span>
                            </Link>
                            <Link to="/director/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">chat</span>
                                <span className="font-medium">Messages</span>
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-6">
                        <div className="bg-slate-100 dark:bg-accent-dark rounded-2xl p-4 border border-slate-200 dark:border-primary/10">
                            <p className="text-xs font-semibold text-slate-500 dark:text-primary/60 uppercase mb-2">Current Project</p>
                            <p className="text-sm font-bold truncate">The Crown Prince: Epic Saga</p>
                            <div className="w-full bg-slate-200 dark:bg-background-dark h-1.5 rounded-full mt-3">
                                <div className="bg-primary h-1.5 rounded-full w-4/5"></div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="h-20 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/20 px-8 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                                <Link to="/director/my-projects" className="hover:text-primary">Projects</Link>
                                <span className="material-symbols-outlined text-xs mx-2">chevron_right</span>
                                <Link to="/director/project/1" className="hover:text-primary">The Crown Prince</Link>
                                <span className="material-symbols-outlined text-xs mx-2">chevron_right</span>
                                <span className="text-slate-900 dark:text-slate-100">Final Casting Selection</span>
                            </nav>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer">notifications</span>
                                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-surface-dark"></span>
                            </div>
                            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-primary/20">
                                <div className="text-right">
                                    <p className="text-sm font-bold">Karan Johar</p>
                                    <p className="text-xs text-slate-500">Executive Director</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden border-2 border-primary">
                                    <img alt="Director" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKbGHSjv0C7QPnTCPZvbluCh2Z-3F6RKIH2xi3EL7ys6z6aSm0NDMaC5ntL75MbqybBIZQvGeAV4mCnYoAxWsuS4WlAQDM-Mf-WxGC5JGp0FPuQbaijUA46Yd5MPlhRqha-bmmZZzTZng-BqfHCi7MmJkrjHllbCiFlR9HayUJubSibny4y644EF-dRBnD-o5NpQY5L4PVuXIi1OatB4tATo1OV9WX-h1KVyWHVhau-5A2oxN8U1TGtfxiCiWamRSgr-0Rltq1Nb9Y" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Container */}
                    <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-background-dark/50 custom-scrollbar">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h2 className="text-3xl font-black tracking-tight mb-2">Role: The Crown Prince</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Head-to-head comparison of top finalists for the lead character</p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-primary/20 font-bold text-sm hover:bg-slate-100 dark:hover:bg-primary/5 transition-colors">
                                        View Project Brief
                                    </button>
                                    <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                                        Save Progress
                                    </button>
                                </div>
                            </div>

                            {/* Comparison Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Candidate One */}
                                <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-primary/10 shadow-xl flex flex-col">
                                    <div className="p-6 border-b border-slate-100 dark:border-primary/10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden">
                                                <img alt="Aryan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN7Sk_AjY7ygkKreH6jPRS4b6nCeqQuui4PsyDWiSLCB-8qA9ONsEONEPIs1rcVMr_XCn49s_F41odOpB1ec9Xv-CXVp3q1t7QghWkyNGu4ioqdgU0QzBJKB9DfZGbUaCfK6lxgoOEEGdO-WMGq0L2TS11_U-U2k4mq9TF7xJsCn35ldG_qmGGtrAUS-ZNK6VpxmAPta-lRzwUNkZJ_F_0xjRkev-wnkWGglSNmFPHy5Qqx2Rcj2nV5zb_HAt5N-eziAwJOJpmkffd" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">Aryan Sharma</h3>
                                                <span className="text-xs font-semibold text-primary px-2 py-0.5 bg-primary/10 rounded-full uppercase tracking-wider">Top Seeded</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex text-primary">
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined">star_half</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">9.2 / 10 Overall</p>
                                        </div>
                                    </div>
                                    <div className="relative group cursor-pointer aspect-video bg-black flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10"></div>
                                        <img alt="Tape" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVy6Rq7FFRuwcIlXixc0dy6imQj0Dc4vdb3KPCdsD5C1kehM3hucMIzZctOF7Bf8r2WVPtHPgEw_GGggmJG6ubEfDm6ZC8xffknhBg85qI5FutQVFnGunfuST-s6uFGKDeP9tmBcP_VYDDSgo1vFuDgPg8IZjbtxrCWpA-gnp7831a7VgHLg3ov7OrdNBeUQG9-f6Ye_CSjYXcA69rxVcJyInHtrB-rF4171pT_EMyPUADhNkl_ogWar2HAZaQ98FzUWXQYo8rpe2z" />
                                        <div className="z-20 bg-primary w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                        </div>
                                        <div className="absolute bottom-4 left-6 z-20">
                                            <p className="text-white font-bold">Audition Tape: Screen Test #3</p>
                                            <p className="text-white/60 text-xs italic">"The Confrontation Scene"</p>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-6 flex-1">
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-primary/60 mb-4">Performance Metrics</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm mb-1 font-medium">
                                                    <span>Screen Presence</span>
                                                    <span className="font-bold">95%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[95%]"></div>
                                                </div>
                                                <div className="flex justify-between text-sm mb-1 mt-4 font-medium">
                                                    <span>Emotional Range</span>
                                                    <span className="font-bold">88%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[88%]"></div>
                                                </div>
                                                <div className="flex justify-between text-sm mb-1 mt-4 font-medium">
                                                    <span>Dialogue Delivery</span>
                                                    <span className="font-bold">92%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[92%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-primary/60 mb-3">Director's Notes</h4>
                                            <div className="bg-slate-50 dark:bg-accent-dark/40 p-4 rounded-xl border-l-4 border-primary italic text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                                "Aryan brings a raw, magnetic vulnerability that the role requires. His eyes tell a story even when he's silent. Excellent chemistry with the female lead in screen tests. Physique is perfect for the era."
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 dark:bg-accent-dark/20 border-t border-slate-100 dark:border-primary/10">
                                        <button className="w-full bg-primary py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all">
                                            Cast Aryan Sharma
                                        </button>
                                    </div>
                                </div>

                                {/* Candidate Two */}
                                <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-primary/10 shadow-xl flex flex-col opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all">
                                    <div className="p-6 border-b border-slate-100 dark:border-primary/10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden">
                                                <img alt="Vikram" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN0uguKemFR458qUpZUYk678cnuz_EIL-WlXchrfNkzzztgntW6XF5tzIsUXuhZD8vv4Eag7F35ocrxdo7_QcrrDa1q4-Egj1PQAsl8Bzi401QJ83os_d8PF9BxBc8ZKZhogNVjY3ipb66T4XzM_7lwvzmGkpM5rRUGTy3ZUZa1xIQIvldYqBEaLh_er9BnUaFWWKvaOs3sTXFUzpnEXJi83XSVpc_xKYrhxS05vd_dZIbMhrluSQoz8sCYNwhqGbwpGgAhLYhlL7S" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">Vikram Malhotra</h3>
                                                <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-full uppercase tracking-wider">The Veteran</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex text-primary">
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">8.9 / 10 Overall</p>
                                        </div>
                                    </div>
                                    <div className="relative group cursor-pointer aspect-video bg-black flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10"></div>
                                        <img alt="Tape" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaurOGQy0vJDFrwIAjS0dLYS4qigD0ZRc1JYxGjMrQngfT93dXVug9DEXhFBXino6KrewQGzI-uJocaWTiwrCiCXC8oq2ws9FMUNwVXNolo999wxLdatCZRwZiW3y-R5ROS-LActGljizgOk_lfdwDFIBSXfqKRZKiQ7gCunyyZDU3cfmfmMVaFVkm_b-ag-8xgKePaVsL1fuxurcYoq1GnTeohHLIFlIZjsUtiFl6fmAq2gmW3bNrK57p47n1DV53pzPydq4UlgRZ" />
                                        <div className="z-20 bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                        </div>
                                        <div className="absolute bottom-4 left-6 z-20">
                                            <p className="text-white font-bold">Audition Tape: Final Cut</p>
                                            <p className="text-white/60 text-xs italic">"The Coronation Speech"</p>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-6 flex-1">
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-primary/60 mb-4">Performance Metrics</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm mb-1 font-medium">
                                                    <span>Screen Presence</span>
                                                    <span className="font-bold">82%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full overflow-hidden">
                                                    <div className="bg-primary/60 h-full w-[82%]"></div>
                                                </div>
                                                <div className="flex justify-between text-sm mb-1 mt-4 font-medium">
                                                    <span>Emotional Range</span>
                                                    <span className="font-bold">96%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full overflow-hidden">
                                                    <div className="bg-primary/60 h-full w-[96%]"></div>
                                                </div>
                                                <div className="flex justify-between text-sm mb-1 mt-4 font-medium">
                                                    <span>Dialogue Delivery</span>
                                                    <span className="font-bold">90%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full overflow-hidden">
                                                    <div className="bg-primary/60 h-full w-[90%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-primary/60 mb-3">Director's Notes</h4>
                                            <div className="bg-slate-50 dark:bg-accent-dark/40 p-4 rounded-xl border-l-4 border-slate-400 italic text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                                "Technically superior actor. His command over the language is impeccable. However, he might be a bit too 'classical' for the modern gritty take we want. Needs more intensity in high-stakes action scenes."
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 dark:bg-accent-dark/20 border-t border-slate-100 dark:border-primary/10">
                                        <button className="w-full bg-slate-800 dark:bg-slate-700 py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-xl hover:bg-slate-900 transition-all active:scale-[0.98]">
                                            Cast Vikram Malhotra
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Comparison Table */}
                            <div className="mt-12 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-primary/10 overflow-hidden shadow-xl">
                                <div className="p-6 border-b border-slate-100 dark:border-primary/10">
                                    <h3 className="text-lg font-bold">Detailed Attributes Comparison</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-accent-dark/30 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-primary/70">
                                                <th className="px-6 py-4">Attribute</th>
                                                <th className="px-6 py-4">Aryan Sharma</th>
                                                <th className="px-6 py-4">Vikram Malhotra</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-slate-100 dark:divide-primary/5">
                                            <tr>
                                                <td className="px-6 py-4 font-semibold">Experience</td>
                                                <td className="px-6 py-4">2 Indie Films, 5 Theatre plays</td>
                                                <td className="px-6 py-4">12 Feature Films, TV Series lead</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold">Stunt Capability</td>
                                                <td className="px-6 py-4">High (Trained in Martial Arts)</td>
                                                <td className="px-6 py-4">Medium (Basic Training)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold">Language</td>
                                                <td className="px-6 py-4">Hindi, English, Punjabi</td>
                                                <td className="px-6 py-4">Hindi, English, Marathi</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold">Availability</td>
                                                <td className="px-6 py-4 text-green-500 font-bold">Immediate</td>
                                                <td className="px-6 py-4 text-yellow-500 font-bold">Post Dec 2026</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Footer Summary */}
                            <div className="mt-8 flex justify-center pb-8">
                                <p className="text-slate-500 text-sm flex items-center gap-2 font-medium">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                    This decision will finalize the contract negotiation process for 'The Crown Prince'.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Chat Bubble FAB */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-3xl">chat_bubble</span>
                </button>
            </div>
        </div>
    );
};

export default AuditionRequests;
