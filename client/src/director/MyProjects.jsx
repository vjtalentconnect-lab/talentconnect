import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyProjects = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-72 flex-shrink-0 bg-white dark:bg-slate-900/50 border-r border-slate-200 dark:border-primary/10 flex flex-col">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">movie</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight tracking-tight">TalentConnect</h1>
                            <p className="text-xs text-slate-500 dark:text-primary/70 uppercase font-semibold">Director Dashboard</p>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <Link to="/dashboard/director" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link to="/director/my-projects" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 border-r-4 border-primary text-primary transition-colors">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                            <span className="font-medium">My Projects</span>
                        </Link>
                        <Link to="/director/shortlists" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined">star</span>
                            <span className="font-medium">Shortlists</span>
                        </Link>
                        <Link to="/director/auditions" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined">settings_voice</span>
                            <span className="font-medium">Audition Requests</span>
                        </Link>
                        <Link to="/director/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-sm">chat</span>
                            <span className="font-medium">Messages</span>
                        </Link>
                    </nav>
                    <div className="p-4 mt-auto border-t border-slate-200 dark:border-primary/10">
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-100 dark:bg-primary/5">
                            <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPObGVulXTKcyTtiSpoeAh_ymLCNKcx_gsC1AdNLKCgeQpcEdh2ec8Ir7KIVsn5TQltEGCk6K2jEXnsyR5vosfnX7qFf4SotLz3pdJphrjwuMjaowxarQmLyi6KUa4OoX8XLWTweX8n0YPMhvwyR0Iwzl2Wy2U8JX49hTlhpLCf0ocLz0TQ34AM6ogodd2suUJqsOPE9QvuvTqnpIlShrvsBsZoPjaCg4Hf65XuCw28rgeekhmAa9ZlhYk4ZmpU0I68X5Zp1kAqj4J')" }}></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">Rajiv Malhotra</p>
                                <p className="text-xs text-slate-500 truncate">Premium Director</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">settings</span>
                        </div>
                    </div>
                </aside>
                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Header */}
                    <header className="h-20 border-b border-slate-200 dark:border-primary/10 px-8 flex items-center justify-between bg-white/50 dark:bg-background-dark/50 backdrop-blur-md z-10">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative w-full max-w-md">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input className="w-full bg-slate-100 dark:bg-primary/5 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary text-sm outline-none" placeholder="Search projects, actors, scripts..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-primary/10">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <Link to="/director/create-project/step1" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-sm">add</span>
                                Create New Project
                            </Link>
                        </div>
                    </header>
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="mb-8">
                            <h2 className="text-4xl font-black tracking-tight mb-2">My Projects</h2>
                            <p className="text-slate-500 dark:text-slate-400">Track and manage your active film and media productions across India.</p>
                        </div>
                        {/* Tabs/Filters */}
                        <div className="flex border-b border-slate-200 dark:border-primary/10 mb-8 gap-8">
                            <button className="pb-4 border-b-2 border-primary text-primary font-bold text-sm">All Projects (12)</button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors">In Production</button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors">Casting</button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors">Post-Production</button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors">Completed</button>
                        </div>
                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {/* Project Card 1 */}
                            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTfT4QksUdMr_-SlEr7pX0akELMiNfFfYNDYKO7kqKiXzyFCgsV9mLkwq3Z1B3uHKo6-pAUyulGkMQs3lNchx1hDrknUlOTumLyqUaHUitWucffpyXY6mwUcuiuEgjEzl4mBdBNpFYMSB5Wv02bV6gpgmxgCAMUSYUruDRti5p14n72j6FKhlZ5bEevY-05tLgkpr0E9WzbXC5AvkbRONs_6V0oU-KodJgZtbZXXQJrpe8ohGHQhUan4XZy2AimOxrRn3Lqxd28OMI')" }}></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">In Production</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Feature Film</p>
                                            <h3 className="text-white text-xl font-bold">The Last Dynasty</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJWQGnTIT1yf6BPw55RQo8YBXIidzKKF2k9leZPYLwzpBcgSmJrjNX1KFtLvt0onDymIa5o9S3ByYd0sLmjS5ArOycYVx1gurXnbuyhIADftydNsogezToF1gQEHOyre6rcwgbue9udzVOtaqxrLb8dKHIh9jUj9UBX-rx8FoX1bWVUhvFOJgbf3umNKUqs1NJupkgSBoEnypHVog7dej47W5CfbOJ50TNq4evG6OJNkSU-NIkULURTkdKHj69w2JIGgFx3BTDqySA')" }}></div>
                                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXPQDuTBm3DEYjPnacMw5oDdDhQyj0kF255RuXuN3BNEP4vBD21ptgI3vo0MKRUX1ukI3005BAw7itgrMvWTMZqvMDf1FxIbBCC16quqFfRxPv3s0uYxurPMWQImhjVuWWc7eA0lE__nhVw80fa1v-3f07WXReUMqxzLkhLRb2h8JjfMo6XHi3R_Atb5j_qta_Xw2uxu2dUzKjHzoPXT3diyK5kLd02Qnc0hYSMuFy_AXXElCxdIdlR822MDJCfT_7kml5DFgnb8DP')" }}></div>
                                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">+14</div>
                                        </div>
                                        <span className="text-slate-400">Due in 12 days</span>
                                    </div>
                                    <Link to="/director/project/1" className="w-full bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                                        View Details
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                            {/* Project Card 2 */}
                            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzugtYMxS_yO9sg3g_l5-FZfH-OG3Sgd5-5-ZF7d_b4w504J02jbSE-Pw7JKjSunMFEVV7vREbaDXC3yFSGafy8MeWPXtogIwk1WPbKBDBXLofQNYAu3990TIlbXQEUmfByYlvrrnsFX8of6tAWhf_xfBtkf06XgMw5cKzXwfkpxrBoagYux9NhVS1D5M7GX9jJkIcbCeVkOW_MY9YP9BmBeyuKSck8nk9px5AQzQ1W67ssFmAMbhwv_y95g1QB3nolEjA0tSPkNP0')" }}></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Casting</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Commercial</p>
                                            <h3 className="text-white text-xl font-bold">Soft Drink - Summer Ad</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-primary font-semibold">
                                            <span className="material-symbols-outlined text-sm">groups</span>
                                            48 Applicants
                                        </div>
                                        <span className="text-slate-400">Started 2 days ago</span>
                                    </div>
                                    <button className="w-full bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                                        View Details
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                            {/* Project Card 3 */}
                            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBRvu0Q7lHhXeVZ-xIjNm3VwUAhy-22R-qhAoGcS1kc2YqNDgiBqMc2NRZLW6BznwaBusw4TPKvyOF08qQHTZJoXRmCw9e3bO5_owDN0pic0pGfpwhnHHQ_txBlcoT58ImZt5pK3sudBfWsiYOOica39aQqDoUr-kSV3QctDhjJruy7Rrx9dc02-9ZV1L-YeITPQ8lmk7NKmcyOMTy3TbctcDM2zP0doi8bWdQyPolErwPgOThCssNt5XgXc_02eUzaUGOP_iMAkGo')" }}></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Post-Production</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Web Series</p>
                                            <h3 className="text-white text-xl font-bold">Urban Legends</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                        <span className="ml-4 font-bold text-xs">75%</span>
                                    </div>
                                    <button className="w-full bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                                        View Details
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                            {/* Project Card 4 (Empty State Placeholder Style) */}
                            <Link to="/director/create-project/step1" className="border-2 border-dashed border-slate-200 dark:border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 min-h-[340px] hover:border-primary/50 transition-all cursor-pointer group">
                                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">add_to_photos</span>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Start New Production</h4>
                                <p className="text-slate-500 text-sm text-center">Post a new project and start casting immediately.</p>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyProjects;
