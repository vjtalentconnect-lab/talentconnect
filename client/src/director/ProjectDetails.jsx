import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 md:px-10 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/dashboard/director" className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-3xl font-bold">movie_filter</span>
                            <h2 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">StarCast India</h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/director/my-projects" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors">Projects</Link>
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="#">Talent</a>
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="#">Auditions</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center bg-slate-100 dark:bg-accent-dark rounded-xl px-3 py-1.5 border border-slate-200 dark:border-border-dark">
                            <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-sm w-40 placeholder:text-slate-500 outline-none" placeholder="Search talent..." type="text" />
                        </div>
                        <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-accent-dark rounded-full">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs border-2 border-white dark:border-border-dark shadow-lg cursor-pointer overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxhZU8SZ-8Z1OTQDFDWakB7njHUDCzGISNF168ll46OpaYpRQHbBVqGLTH8Tz1mfaAT6HlHkov0FnX8MvIcn0bVGJ-OcIEXLN9r7ldacv8oCCN400ZXMJTixpGAmSUYBypKNxsjyVtu_l6K-y4qvA4Xncxt2PTok93_KPoM2Ob98m6TdkPPVcemJOlPElT3Y2XYquGL27hQe1DHyd066r3t_nIwriEl4f6pC0Ul4uPuEuIYTwoP7rY2mnuuZvUqN8k_XW46W7lI0um" alt="Profile" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
                <section className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl border border-slate-200 dark:border-border-dark">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                    <img className="w-full h-[400px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd1nYs3Lqtz13PJbVE1N86MyNwRZ8pPGPcm5A1Jqx5GCNrQHv9ZDy0Dq8nhCFqHvHx8BAjp23MZXSFaE9FPq4ikpJy9w46-RRThHW85CMms9vmvr4FqVojyFTtC0AspwLCr-IKf-ETZu5TJ1Elb5VZfdTi9CBFgnEGILJffd0ZLi9pzmJfRW7wUKlVplgWb8Ay6e1mtcrdRW7J4e0LASCKPC7QOqXrfO6YdWP_eXuMD_ZAnpAY_K7m17ei86F1xtqntTRo8b7vT1Er" alt="Banner" />
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="bg-primary text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full">Feature Film</span>
                            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-white/20">In Production</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">The Last Dynasty</h1>
                                <p className="text-slate-300 text-lg flex items-center gap-4">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span> Oct 2024 - Jan 2025</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Mumbai, Rajasthan</span>
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">person_add</span> Post New Role
                                </button>
                                <button className="flex items-center justify-center p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl transition-all">
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-10">
                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span> Project Overview
                            </h3>
                            <div className="bg-white dark:bg-accent-dark rounded-2xl p-6 border border-slate-200 dark:border-border-dark shadow-sm">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                    An epic historical drama set in 18th century India, chronicling the rise and fall of a forgotten royal lineage. The project focuses on the internal power struggles and the collision of traditional values with the onset of modernization.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-border-dark">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Production House</p>
                                        <p className="font-bold text-slate-900 dark:text-white">Director's Studio</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Budget Status</p>
                                        <p className="font-bold text-green-500">Fully Funded</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Script Status</p>
                                        <p className="font-bold text-slate-900 dark:text-white">Locked (Rev 4.0)</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span> Role Requirements
                                </h3>
                                <button className="text-primary text-sm font-bold hover:underline">View All Roles</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-accent-dark rounded-2xl p-5 border border-slate-200 dark:border-border-dark flex flex-col justify-between group hover:border-primary/50 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-900 dark:text-white">The Crown Prince</h4>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">Lead Role • Male</p>
                                        </div>
                                        <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded">URGENT</span>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-medium">Age Range</span>
                                            <span className="text-slate-700 dark:text-slate-200 font-bold">24 - 32 years</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-medium">Build</span>
                                            <span className="text-slate-700 dark:text-slate-200 font-bold">Athletic / Lean</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-medium">Languages</span>
                                            <span className="text-slate-700 dark:text-slate-200 font-bold">Hindi, Urdu</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-border-dark">
                                        <div className="flex -space-x-2">
                                            <div className="h-6 w-6 rounded-full border border-white dark:border-border-dark bg-slate-200 overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoZYznR23f14nSFuLerzSr-h_aH0FZrbwfV0PqAAZn3K1OrrBW7jcoX4oPflHJ4HBT0Fry6NBvkdV4xcZARAw_UCcc38Z-9jT6rz0nrhK5TZLRSsTfZQkXe4O0EyYuXK_A0lkDgJEEFEeO-R7trJ-etECf41eWh54umStNdCD3PWuJDuqFy5dShCfSh5VB4QxJ4rtRhTACRFff2Bcg1a_rzTMxHxK4AKW-e7F9sYubwKQEsms3RmItH1hCyPA9-TnI_sY61JShrgYu" alt="p1" /></div>
                                            <div className="h-6 w-6 rounded-full border border-white dark:border-border-dark bg-slate-300 overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuChG7PrsmDkroWymf7JUD0QzazvmJZDQMyY-uUxDJOFpquQMj9qqXTCHkAH7kHt_UxifFfIQBD4rVqdgIgjli0L8wI-fXYg98jEsBmbikVuuTT3vHLshevuCDubmETG4oA2XxtNk9sc9nK7OVoMRqecfO0joc3zI1rxY6iPBEY_Xe09bbYQJXk-mMU4ppIcPQLO6fw6H9yzYcyYT-rZBIv0dgMr8zZhUXJOENOYEnAA8Gn78gBikdwFagDZ4Z9MtZkBdsjDk3relC-Z" alt="p2" /></div>
                                            <div className="h-6 w-6 rounded-full border border-white dark:border-border-dark bg-slate-400 flex items-center justify-center text-[8px] font-bold text-white">+42</div>
                                        </div>
                                        <button className="text-sm font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">Applicants <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-accent-dark rounded-2xl p-5 border border-slate-200 dark:border-border-dark flex flex-col justify-between group hover:border-primary/50 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-900 dark:text-white">Royal Guard Commander</h4>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">Supporting • Male</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-medium">Age Range</span>
                                            <span className="text-slate-700 dark:text-slate-200 font-bold">40 - 55 years</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-medium">Height</span>
                                            <span className="text-slate-700 dark:text-slate-200 font-bold">5'10" +</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-medium">Skills</span>
                                            <span className="text-slate-700 dark:text-slate-200 font-bold">Sword Fighting</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-border-dark">
                                        <div className="flex -space-x-2">
                                            <div className="h-6 w-6 rounded-full border border-white dark:border-border-dark bg-slate-200 overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyUGgYbnzFgi0TMjyMZNnUoSPepq27pC0tcNJ7ltjQaaEMhjmzWVvIeGKHMrg12PubpnbQ7m2IXaHhWil0kCKKekCFdUZfQ2ejz9QDIsIX1di4rKDS2NiWNn2q1QGKpq-f1IIph7r1vh03qUcY814MS1gpFkDhkkKHEOXewnltKCNi7XZpG03IvMZdT7DB-Q3q9_lWDlehl1sIeF4IFUiaGY0lMdL_8hwLRUN9cwq4ah5MkVhtdzwxxRYEtBahARQHsMMk3HunHY4Y" alt="p3" /></div>
                                            <div className="h-6 w-6 rounded-full border border-white dark:border-border-dark bg-slate-400 flex items-center justify-center text-[8px] font-bold text-white">+18</div>
                                        </div>
                                        <button className="text-sm font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">Applicants <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span> Casting Progress
                            </h3>
                            <div className="bg-white dark:bg-accent-dark rounded-2xl p-6 border border-slate-200 dark:border-border-dark shadow-sm space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold dark:text-slate-300">Lead Roles</span>
                                        <span className="text-primary font-bold">1 / 4 Casted</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-border-dark h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full" style={{ width: '25%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold dark:text-slate-300">Supporting Cast</span>
                                        <span className="text-primary font-bold">6 / 12 Casted</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-border-dark h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full" style={{ width: '50%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold dark:text-slate-300">Extras / Background</span>
                                        <span className="text-primary font-bold">0 / 40 Casted</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-border-dark h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full" style={{ width: '2%' }}></div>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary font-black rounded-xl text-xs uppercase tracking-widest transition-colors">
                                    Detailed Status Report
                                </button>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span> Core Team
                            </h3>
                            <div className="bg-white dark:bg-accent-dark rounded-2xl p-6 border border-slate-200 dark:border-border-dark shadow-sm space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-slate-200 overflow-hidden">
                                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ21H60qG8QP-xn4Q8N6AS0GnAM5QquG5O0r2gvng1pvxTcqpEHCgYqpBJ5tjOK8DFBtL3b26IQ7iGLYTZBaSFsML_bZrJl5gsfXY0WObEBt80n71rTM15beH4GOJIlncBsnPT_KeEvtddHeQbhdFHYHLbMCwdEN2Y1kQIZttB_5ZgQsYmCXQf83Qqr1xJu0WNNuCRmPi2DdHCkqzPgajTf_cpAm7VoAUtXODydBdS9lkMxtUmm9QtnM4GpWlpcfKapu6_aDai2g0z" alt="Vikram" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Vikram Malhotra</p>
                                        <p className="text-xs text-slate-500 font-medium">Executive Producer</p>
                                    </div>
                                    <button className="ml-auto p-2 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-slate-200 overflow-hidden">
                                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtlB8aS1L2ri83BMdQxpVzMAnecMhoWwi8qlSiIqY8tM6y9SU2G5Ru_2pqkTuSiZ_Da4ZrmorqiYt4HLs6oZ4uQNO0aqVXJjAE-aLRE0VAgLIvlFrbDMhywoYCc5BqV1oVwXjdWF7Pd2RTLt9z8dc9noXLta6U8GC2In8xmeLTvhnDq2C2bMUTgN9MB0DUvQFL3J95LIfTeySsPwwfsuYRJPcBlqUCbeYQl65wrqd4eG-zRv_eKYoywsPE9ShdT-hwO3EAbyClZNbL" alt="Riya" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Riya Sharma</p>
                                        <p className="text-xs text-slate-500 font-medium">Casting Director</p>
                                    </div>
                                    <button className="ml-auto p-2 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-slate-200 overflow-hidden">
                                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4KtlDG0ge2-MpHl_QM50UR5d_pAEDkjx76KmdDphbt6Hql2hlqFCIYcOYWBbXPXpc9Q-SxK9yNRMbGeT_hmZtuSiz9Beb0JJpJ6a57GjcNgGSl22Wsj8kj8bDqF4GtI3w6viUSFd2FAbgyCapuje8c_vrck0fuAx_FdYvN-rXkDHTLV9oLkjUdPQSOTvCsxpl78weIZ0MLBINN80Tz8NnCGjDK7YxNrE3J6ssbR6p8-cnwlvVKfk3goTTbZRllnI6cWpdBP6rSBJG" alt="Aryan" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Aryan Kapoor</p>
                                        <p className="text-xs text-slate-500 font-medium">DOP</p>
                                    </div>
                                    <button className="ml-auto p-2 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="bg-primary rounded-2xl p-6 text-white shadow-xl shadow-primary/20">
                                <h4 className="font-black text-lg mb-2">Need help casting?</h4>
                                <p className="text-white/80 text-sm mb-4 leading-relaxed">Let our AI matchmaker suggest the top 5 actors for your lead roles based on current trending talent.</p>
                                <button className="w-full py-3 bg-white text-primary font-bold rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                                    AI Recommendation
                                </button>
                            </div>
                        </section>
                    </div>
                </div>

                <section className="mt-12 py-10 border-t border-slate-200 dark:border-border-dark flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="p-4 bg-slate-100 dark:bg-accent-dark rounded-2xl">
                            <span className="material-symbols-outlined text-primary text-3xl">groups</span>
                        </span>
                        <div>
                            <h4 className="text-xl font-bold dark:text-white">Review All Applicants</h4>
                            <p className="text-sm text-slate-500">60+ actors are waiting for your feedback</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-8 py-3 bg-slate-200 dark:bg-accent-dark dark:text-white rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-border-dark transition-colors">
                            Download All Headshots
                        </button>
                        <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-colors">
                            Go to Applicant Tracking
                        </button>
                    </div>
                </section>
            </main>

            <footer className="mt-auto py-8 border-t border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-accent-dark/30">
                <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 opacity-50">
                        <span className="material-symbols-outlined text-xl">movie_filter</span>
                        <span className="text-xs font-bold uppercase tracking-tighter">StarCast India © 2024</span>
                    </div>
                    <div className="flex gap-8">
                        <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest" href="#">Privacy</a>
                        <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest" href="#">Terms</a>
                        <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest" href="#">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProjectDetails;
