import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Shortlists = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex font-display transition-colors duration-300">
            {/* Sidebar Navigation */}
            <aside className="w-72 border-r border-slate-200 dark:border-primary/20 flex flex-col h-screen sticky top-0 bg-background-light dark:bg-background-dark">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg">
                        <span className="material-symbols-outlined text-white">movie_filter</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight tracking-tight">StarCast India</h1>
                        <p className="text-xs text-slate-500 dark:text-primary/60 uppercase font-bold tracking-widest">Director Portal</p>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-1">
                    <Link to="/dashboard/director" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-medium text-sm">Dashboard</span>
                    </Link>
                    <Link to="/director/my-projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined">work</span>
                        <span className="font-medium text-sm">My Projects</span>
                    </Link>
                    <Link to="/director/shortlists" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/20 border-r-4 border-primary text-primary transition-colors">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-medium text-sm">Shortlists</span>
                    </Link>
                    <Link to="/director/auditions" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined">videocam</span>
                        <span className="font-medium text-sm">Audition Requests</span>
                    </Link>
                    <Link to="/director/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span className="font-medium text-sm">Messages</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-primary/20">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-100 dark:bg-primary/5">
                        <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7--hs9EADawVz_XYe-kXamkBXW6ig6jpoDWsB0Rr2Klb-UcAJHaaJsSeN2m3Osh5plwdw3C7PIxutS4iIY1wsadkvftHU5WLfLMGYD7AkrTJU2ZDSQoBXFDYRXztnnysIFNzvpjCuYG-qXrtR2VQgBmMz8xrpqtY1hJmGhiSnN4wsqhYR8GDUiANoFQluEA_RplUZ0IWazbAZjTAqU8zxwHfacYLudqnz2lf1XT4EpX7lwk50uiXeiIflErGZlGmxdbvY0JF5LJlp')" }}></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Vikram Aditya</p>
                            <p className="text-xs text-slate-500 truncate">Executive Director</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/20">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/director/my-projects')} className="flex items-center text-primary font-medium text-sm gap-1 hover:underline outline-none">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Projects
                        </button>
                        <div className="h-4 w-px bg-slate-300 dark:bg-primary/30"></div>
                        <h2 className="text-xl font-bold tracking-tight">The Last Dynasty <span className="text-slate-400 font-normal ml-2">/ Applicants</span></h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-100 dark:bg-primary/10 rounded-xl px-3 py-1.5 border border-slate-200 dark:border-primary/20">
                            <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 outline-none" placeholder="Search artists..." type="text" />
                        </div>
                        <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-primary/10 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </header>

                <section className="p-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <h3 className="text-3xl font-extrabold tracking-tight mb-2">Application Review</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">24 New Applicants</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-200 dark:bg-primary/5 px-3 py-1 rounded-full border border-slate-300 dark:border-primary/10">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">12 Shortlisted</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-background-light dark:bg-background-dark border border-slate-300 dark:border-primary/30 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-lg">checklist</span>
                                Bulk Actions
                            </button>
                            <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
                                <span className="material-symbols-outlined text-lg">send</span>
                                Invite All to Audition
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8 bg-slate-100 dark:bg-primary/5 p-4 rounded-2xl border border-slate-200 dark:border-primary/10">
                        <div className="flex-1 min-w-[150px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Role Type</p>
                            <div className="relative">
                                <select className="w-full bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-xl px-3 py-2 text-sm appearance-none focus:ring-primary focus:border-primary outline-none">
                                    <option>All Roles</option>
                                    <option>Lead Actor</option>
                                    <option>Supporting</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-2 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Age Range</p>
                            <div className="relative">
                                <select className="w-full bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-xl px-3 py-2 text-sm appearance-none focus:ring-primary focus:border-primary outline-none">
                                    <option>20 - 30</option>
                                    <option>30 - 45</option>
                                    <option>45+</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-2 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Location</p>
                            <div className="relative">
                                <select className="w-full bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-xl px-3 py-2 text-sm appearance-none focus:ring-primary focus:border-primary outline-none">
                                    <option>Mumbai</option>
                                    <option>Delhi</option>
                                    <option>Bangalore</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-2 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Artist Rating</p>
                            <div className="relative">
                                <select className="w-full bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-xl px-3 py-2 text-sm appearance-none focus:ring-primary focus:border-primary outline-none">
                                    <option>4.5+ Stars</option>
                                    <option>Top Rated</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-2 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button className="p-2 bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Arjun Sharma Card */}
                        <div className="group bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col">
                            <div className="relative h-72">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBERQEHpOOioH7tiX0h6HHMtPtSiN7yklieoqW4fiSMzKI5So5W1gEiYKQ3UwAyCLz0Rc-D5-72p3up_7jBbpdH7yL-yVHlFR6annSWdZXlE06iEV8DBV5PKwTIlFsNvPPJuX2s-DbIqvCA1bQXyHxJQEnVdTk1tYif66mWZRiU9ZiN6nNRTFRSVADzWTSTlpEPbWzsXZsyPr8Ta-QeKSVOTZv3blCx5uDrcwjbzH6iDWLM3GuXleRAaejFZi_3gxWiZ7OtRaEtDgi3')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-full shadow-lg">New Application</span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">favorite</span>
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="text-white text-xl font-bold">Arjun Sharma</h4>
                                    <p className="text-slate-300 text-sm">26 Years • Mumbai, India</p>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/80 text-[10px] font-bold rounded">Trained Dancer</span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/80 text-[10px] font-bold rounded">Urdu Speaker</span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/80 text-[10px] font-bold rounded">Martial Arts</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button className="w-full py-2 bg-primary text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all">Shortlist</button>
                                    <button className="w-full py-2 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">Reject</button>
                                    <button className="w-full py-2 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl text-xs font-bold col-span-2 transition-all">View Full Profile</button>
                                </div>
                            </div>
                        </div>

                        {/* Riya Kapoor Card */}
                        <div className="group bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col">
                            <div className="relative h-72">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDurElLr1pfi6OPdfxZ_6VWp2jaL6y1hTpL4ggXwOmbB96CErOG0FE-6t--CYl25awim4WIJpRokfiXaoRXvQZjVJRNgFhN8KXqGswRZlPTpDAExM6E44WTv3DAvSOs5slpqE4Dx_PI5EImgoWIuFMxvZpPA5q2p_owSmg2nKavkmr6SUAnT3UZDn7L3p6XtBw9pTCRCDZ1hZDyZKkpvi-X4FQdMfxPAdUgSmdDxd4hInmrzCc1Cm-O1BtCVhUqz9IahjMf0T1Xh49')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-full shadow-lg">Shortlisted</span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="text-white text-xl font-bold">Riya Kapoor</h4>
                                    <p className="text-slate-300 text-sm">24 Years • Delhi, India</p>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/80 text-[10px] font-bold rounded">Classical Singer</span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/80 text-[10px] font-bold rounded">Fluent English</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button className="w-full py-2 bg-slate-100 dark:bg-primary/5 border border-primary text-primary rounded-xl text-xs font-bold transition-all hover:bg-primary/10 font-bold">Message</button>
                                    <button className="w-full py-2 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">Reject</button>
                                    <button className="w-full py-2 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl text-xs font-bold col-span-2 transition-all">View Full Profile</button>
                                </div>
                            </div>
                        </div>

                        {/* Kabir Singh Card */}
                        <div className="group bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col opacity-90 grayscale-[0.5]">
                            <div className="relative h-72">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDv3u_iVVc4FL1tNM1REtQTvHzBxitZhY9twKk6nhKQnL_nFFxAKn6wGnQEEfqOkFPWYA74Xu3lgUbuK6rCmHKp7hCgCjcE5iTFfQqYltHIsjugwh0KW1BqjNM1FKYR4Vq5lbx2DIHnw_VWDMKnsJDxLJ4tSC3sRBPIkMBmmkw6VS6ZoOkEcBDQkdntX3RbEJe_Q_56enZ_VQiMh0BV2lInNL14Obbgp4uJX0UBuufeG1PqCMyUJYhnJit5FZeHFBoJ3-VLnExF0Jkt')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-slate-500 text-white text-[10px] font-bold uppercase rounded-full shadow-lg">Processed</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="text-white text-xl font-bold">Kabir Singh</h4>
                                    <p className="text-slate-300 text-sm">29 Years • Bangalore, India</p>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/80 text-[10px] font-bold rounded">Action Hero</span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/80 text-[10px] font-bold rounded">Voice Over</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button className="w-full py-2 bg-primary text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all">Shortlist</button>
                                    <button className="w-full py-2 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">Reject</button>
                                    <button className="w-full py-2 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl text-xs font-bold col-span-2 transition-all">View Full Profile</button>
                                </div>
                            </div>
                        </div>

                        {/* Invite Collaborators Placeholder */}
                        <div className="group bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all border-dashed border-2 flex items-center justify-center min-h-[400px]">
                            <div className="text-center p-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                                    <span className="material-symbols-outlined text-3xl">group_add</span>
                                </div>
                                <h4 className="font-bold mb-2">Invite Collaborators</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">Share this applicant pool with your casting team.</p>
                                <button className="px-6 py-2 border border-slate-300 dark:border-primary/30 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-primary/5 transition-colors">Share Access</button>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <button className="w-10 h-10 rounded-xl border border-slate-300 dark:border-primary/20 flex items-center justify-center hover:bg-primary/10 text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-xl bg-primary text-white font-bold text-sm">1</button>
                            <button className="w-10 h-10 rounded-xl border border-slate-300 dark:border-primary/20 font-bold text-sm hover:bg-primary/10 transition-colors text-slate-500">2</button>
                            <button className="w-10 h-10 rounded-xl border border-slate-300 dark:border-primary/20 font-bold text-sm hover:bg-primary/10 transition-colors text-slate-500">3</button>
                        </div>
                        <button className="w-10 h-10 rounded-xl border border-slate-300 dark:border-primary/20 flex items-center justify-center hover:bg-primary/10 text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </section>

                <footer className="mt-auto py-6 px-8 border-t border-slate-200 dark:border-primary/20 text-center">
                    <p className="text-xs text-slate-400 font-medium">© 2024 StarCast India Entertainment. All rights reserved. Casting Partner: Cinematic Solutions.</p>
                </footer>
            </main>

            <div className="fixed bottom-8 right-8 flex flex-col gap-3">
                <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">chat_bubble</span>
                </button>
            </div>
        </div>
    );
};

export default Shortlists;
