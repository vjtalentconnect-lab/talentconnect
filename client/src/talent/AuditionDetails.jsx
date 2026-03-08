import React from 'react';
import { Link } from 'react-router-dom';

const AuditionDetails = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="flex h-screen overflow-hidden">
                {/* SideNavBar */}
                <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-background-dark hidden lg:flex flex-col justify-between p-6">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">theater_comedy</span>
                            </div>
                            <div className="flex flex-col text-white">
                                <h1 className="text-base font-bold leading-none">StarCast India</h1>
                                <p className="text-primary text-xs font-medium uppercase tracking-wider mt-1">Artist Portal</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors" to="/dashboard/talent">
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="text-sm font-medium">Dashboard</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20" to="/talent/audition-invites">
                                <span className="material-symbols-outlined">calendar_month</span>
                                <span className="text-sm font-medium">Auditions</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors" to="/talent/applied-projects">
                                <span className="material-symbols-outlined">work</span>
                                <span className="text-sm font-medium">Projects</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors" to="/talent/portfolio">
                                <span className="material-symbols-outlined">person</span>
                                <span className="text-sm font-medium">My Profile</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors" to="/talent/analytics">
                                <span className="material-symbols-outlined">analytics</span>
                                <span className="text-sm font-medium">Analytics</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors" to="/talent/messages">
                                <span className="material-symbols-outlined">chat</span>
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
                    </div>
                    <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                        <p className="text-white text-xs font-semibold mb-2 uppercase tracking-widest">Membership</p>
                        <p className="text-slate-400 text-xs mb-4 leading-relaxed">Unlock premium casting calls & priority support.</p>
                        <Link className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 rounded-lg transition-all text-center block" to="/talent/upgrade">
                            Upgrade to Pro
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-background-dark relative">
                    {/* Mesh Gradient Effect Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
                        <div className="absolute top-0 left-0 size-[500px] bg-primary/20 blur-[120px] rounded-full translate-x-[-20%] translate-y-[-20%]"></div>
                        <div className="absolute bottom-0 right-0 size-[500px] bg-primary/10 blur-[120px] rounded-full translate-x-[20%] translate-y-[20%]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col min-h-full">
                        {/* Header */}
                        <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-background-dark/80 border-b border-primary/10 shrink-0">
                            <div className="flex items-center gap-4">
                                <button className="lg:hidden text-white">
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                <h2 className="text-white text-xl font-bold tracking-tight">Audition Details</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                                <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined">bookmark</span>
                                </button>
                                <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden">
                                    <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqULzg-4dky5uM1m446JtKhMxfuhiZlYROoKYOuIKFwmOCodC_h1LgZRW7Kuj3gbClc1kdnoVM1_VedTTLAbNW5FO9xuoCNHNdIg4_NO-_Utd6yPkXG2jcNyHZEifFTAMXuPspxExIjunzGX0v0gCnTArn2UKO4j-z3mKwUz7ZRA04RlfYW7WUNqDA5eGd2vG2MRW9ukknilr9O4YLOySnXc8yi5Z6zmYHhIuqwOXVgGTwgL_cGRArKlK24vv-oyDWXHh3-lwJCDP1" />
                                </div>
                            </div>
                        </header>

                        <div className="max-w-5xl mx-auto p-8 w-full">
                            {/* Hero Section */}
                            <div className="relative rounded-3xl overflow-hidden mb-8 h-96 group shrink-0">
                                <img className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" alt="Hero" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZj3_7cLDGAJjpTXjIvBa5QSYVQ_ePDvkj-K1DfTuFlVNeO9gbX_V1_xyulCpg_coIKOROh5Dz86-bGcpjY_tDkJnXiDjmU4q_fhd7I_1DZW6gsSWp3tsKMPVuhtueDl6t6jTc8lz9SX5bu6Rii9iZS6HiH5Sdfwl1LmyLKGqhE9xwlTQkIQbptG51qozNVw0aFFfucDx9hjsml5PCwbDjxXDWkgrUnA_oWfy74JyxoAJs5V7nuTbgb3tYEeo4Zlttmg7p9qx5Zy4D" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-3 whitespace-nowrap">Feature Film • Period Drama</span>
                                        <h1 className="text-white text-4xl md:text-5xl font-black tracking-tighter mb-2">The Last Dynasty</h1>
                                        <p className="text-slate-300 text-lg flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-sm">movie_filter</span>
                                            Directed by Siddharth Roy
                                        </p>
                                    </div>
                                    <div className="flex gap-3 shrink-0">
                                        <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-xl shadow-primary/20 whitespace-nowrap">Confirm Attendance</button>
                                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold backdrop-blur-md transition-all whitespace-nowrap">Reschedule</button>
                                    </div>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Column 1: Core Details */}
                                <div className="md:col-span-2 space-y-8">
                                    {/* Brief Section */}
                                    <section className="bg-white/5 border border-primary/10 rounded-3xl p-8 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">person_search</span>
                                                Character Brief: Vikram
                                            </h3>
                                            <span className="text-primary font-mono text-sm uppercase tracking-tighter shrink-0">Role: Lead</span>
                                        </div>
                                        <div className="space-y-4 text-slate-300 leading-relaxed">
                                            <p>Vikram (28-35) is the eldest prince of the Surya Dynasty. He is a complex warrior who balances his duty to the throne with his secret disdain for war. He is brooding, intelligent, and speaks with a calm authority.</p>
                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                                                <div>
                                                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Look</p>
                                                    <p className="text-sm">Rugged, regal, sharp features</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Tone</p>
                                                    <p className="text-sm">Low-register, intense, articulate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Preparation Script */}
                                    <section className="bg-white/5 border border-primary/10 rounded-3xl p-8 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">description</span>
                                                Preparation Script
                                            </h3>
                                            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold text-sm shrink-0">
                                                <span className="material-symbols-outlined text-lg">download</span>
                                                Download Full Script
                                            </button>
                                        </div>
                                        <div className="bg-background-dark/60 rounded-2xl p-6 border border-primary/5 font-mono text-sm text-slate-400 overflow-hidden relative">
                                            <div className="absolute top-4 right-4 bg-primary/20 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase">Scene 42 - The Confrontation</div>
                                            <div className="space-y-6">
                                                <div className="text-center italic opacity-60 uppercase tracking-widest text-xs py-2">[EXT. PALACE BALCONY - NIGHT]</div>
                                                <div>
                                                    <span className="block text-white font-bold mb-1 uppercase tracking-widest text-center">VIKRAM</span>
                                                    <p className="text-center italic">(quietly, staring into the dark)</p>
                                                    <p className="mt-2 text-center">The stars don't witness our victories, General. They only witness the blood we spill to claim them. I'm tired of the noise. I'm tired of the crown.</p>
                                                </div>
                                                <div>
                                                    <span className="block text-white font-bold mb-1 uppercase tracking-widest text-center">GENERAL</span>
                                                    <p className="mt-2 text-center text-slate-300">The kingdom needs its King, My Lord. Not a poet.</p>
                                                </div>
                                                <div>
                                                    <span className="block text-white font-bold mb-1 uppercase tracking-widest text-center">VIKRAM</span>
                                                    <p className="mt-2 text-center italic">And what if the King is both? Or neither?</p>
                                                </div>
                                            </div>
                                            <div className="mt-8 pt-4 border-t border-white/5 flex justify-center">
                                                <button className="text-primary font-bold text-xs hover:underline uppercase tracking-widest">Show entire scene</button>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Column 2: Logistics & Info */}
                                <div className="space-y-6">
                                    <section className="bg-white/5 border border-primary/10 rounded-3xl p-6 backdrop-blur-sm">
                                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">info</span>
                                            Audition Logistics
                                        </h4>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                                    <span className="material-symbols-outlined">event</span>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Date</p>
                                                    <p className="text-white font-semibold">October 25, 2023</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                                    <span className="material-symbols-outlined">schedule</span>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Time Slot</p>
                                                    <p className="text-white font-semibold">10:30 AM - 01:00 PM</p>
                                                    <p className="text-primary text-xs italic mt-1">Please arrive 15 mins early</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                                    <span className="material-symbols-outlined">location_on</span>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Location</p>
                                                    <p className="text-white font-semibold">Studio 41, Mumbai</p>
                                                    <p className="text-slate-500 text-xs">Near Famous Studios, Mahalaxmi</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8 rounded-2xl overflow-hidden h-40 border border-primary/10">
                                            <img className="w-full h-full object-cover" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqjz5W0v1pbI2p4Jh-XEKiM35GFrhXtcM5vJbNOdJXxJTSYujq8uhEXPJkp7FJHiyMK_fomg78RypddUHn5bD6N6VLQRANv6-obJYpX9lRCKYe7AggKVfIUbz23oqKRRMLN1EUy3lhPQcx_yb3-PGjzuIMnyHSgvj-Yoi0vez1wIJenQRIO_Njj1gxrF8vxayawhTUmz9M1vNnMk6lCNRTkRBZFQRQxZKoPU9REYn8yc0JmK5N7HCVXWt8ywJAGVWslH0j5TjUjIwN" />
                                        </div>
                                    </section>

                                    <div className="bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-6 shadow-2xl shadow-primary/30">
                                        <h5 className="text-white font-bold text-lg mb-2">Audition Notes</h5>
                                        <p className="text-white/80 text-sm leading-relaxed mb-4">You are requested to wear traditional Indian ethnic wear (Kurta) for the screen test. No heavy makeup required.</p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                                                <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                                            </div>
                                            <span className="text-white text-xs font-bold uppercase tracking-widest">Casting Tip</span>
                                        </div>
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

export default AuditionDetails;
