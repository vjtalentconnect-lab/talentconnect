import React from 'react';
import { Link } from 'react-router-dom';

const DirectorPortfolio = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="size-8 flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">movie</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">StarCast India</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-sm font-medium hover:text-primary transition-colors" to="#">Talent</Link>
                            <Link className="text-sm font-medium hover:text-primary transition-colors text-primary" to="#">Directors</Link>
                            <Link className="text-sm font-medium hover:text-primary transition-colors" to="#">Studios</Link>
                            <Link className="text-sm font-medium hover:text-primary transition-colors" to="#">Castings</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center bg-slate-200 dark:bg-primary/10 rounded-xl px-3 py-1.5 border border-transparent focus-within:border-primary/50 transition-all">
                            <span className="material-symbols-outlined text-slate-500 dark:text-primary/70 text-xl">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-sm w-40 lg:w-64 placeholder:text-slate-400 dark:placeholder:text-primary/40 outline-none" placeholder="Search talent or films" type="text" />
                        </div>
                        <button className="bg-primary text-white text-sm font-bold px-6 py-2 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            Login
                        </button>
                        <div className="size-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                            <img className="w-full h-full object-cover" alt="User profile avatar small circular icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2D7Od-Jl8uuM3tI1OciVv4_XN_W7hN4J6pkOpNx0OKhyfmE8F2OHpeFH89SKRM194KDI95-g0UeEnFxvI3pwpUBY7jPTQR6g4eIj6oJLlwgdc0cJBRtSJjHVTsNcgWp8Vgfkia3Dq1vmTjPjtIeSQmUICF84WdbaTYs1yVxuwPZ5RoLSkfUvpU7vgB_yAaFuOcbKkNWZ4a5VjqJd7YMvbIQ5SNlk--7cwaZZFqAqMzO7dH_tQxEEm8fGlvItruOi_TjZzOcivLL-E" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pb-20">
                {/* Hero Section */}
                <section className="mt-8 rounded-2xl overflow-hidden relative group">
                    <div className="aspect-[21/9] w-full relative">
                        <img className="w-full h-full object-cover" alt="Director Karan Malhotra on a movie set with professional camera equipment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBUzoJM47v_dGy2wKweh7iwDgZwcNZ5fx__VM3MLBmMtFXsHQP3Hg7yvq0rQIgkYcDUMPrSN8GwDYbxnbmzZYENI1xUPBuAmhRoF9seqZ7_GUtpSFoWkpgQ8MSwgqpMRKa-vQphcffXQBq2i48QmzlIPpOTMo4ym67FNy62wndCKUo0LbYojSxCcwtC-bHp1CGdzX0mWcP8nd-HUnBNZ_zCx65Y9ysDCzioP9hNRDOOY1v7Fm8422TrqTjFTsuZB3C0QG5bbzLN1kV" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 lg:p-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-2">
                                <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-white">Elite Director</span>
                                <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white">Karan Malhotra</h1>
                                <p className="text-lg lg:text-xl text-slate-300 font-medium">Film Director &amp; Producer | Dharma Productions</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined">person_add</span>
                                    Follow Director
                                </button>
                                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all">
                                    <span className="material-symbols-outlined">assignment_ind</span>
                                    View Open Auditions
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats & About */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                            <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Quick Stats</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-slate-100">12</p>
                                    <p className="text-xs text-slate-500 uppercase">Feature Films</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-slate-100">4</p>
                                    <p className="text-xs text-slate-500 uppercase">Filmfare Awards</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-slate-100">15yr</p>
                                    <p className="text-xs text-slate-500 uppercase">Industry Exp.</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-slate-100">1.2M</p>
                                    <p className="text-xs text-slate-500 uppercase">Followers</p>
                                </div>
                            </div>
                        </div>
                        {/* Active Casting */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Active Casting</h3>
                                <span className="text-primary text-xs font-bold animate-pulse">● LIVE</span>
                            </div>
                            <div className="space-y-3">
                                <div className="p-4 rounded-xl bg-background-light dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer group">
                                    <p className="font-bold group-hover:text-primary">Untitled Action Drama</p>
                                    <p className="text-xs text-slate-500 mt-1">Lead Female (22-28 yrs) • Delhi Based</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-400">Ends in 3 days</span>
                                        <span className="material-symbols-outlined text-primary text-lg">chevron_right</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-background-light dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer group">
                                    <p className="font-bold group-hover:text-primary">Historical Epic Series</p>
                                    <p className="text-xs text-slate-500 mt-1">Supporting Male Cast • Martial Arts Skills</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-400">Ongoing</span>
                                        <span className="material-symbols-outlined text-primary text-lg">chevron_right</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-12">
                        {/* About Vision */}
                        <article>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="size-2 bg-primary rounded-full"></span>
                                Cinematic Vision
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                A visionary storyteller known for grand scales and emotional depth. Associated with Dharma Productions, Karan Malhotra has redefined modern Indian commercial cinema with a focus on gritty narratives and high-octane drama. His approach blends classical Indian storytelling with international technical standards.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mt-4">
                                Malhotra is particularly acclaimed for his character-driven action sequences and his ability to draw out powerful performances from ensemble casts. He continues to push boundaries in production value and visual effects within the Bollywood landscape.
                            </p>
                        </article>

                        {/* Filmography Grid */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="size-2 bg-primary rounded-full"></span>
                                Filmography
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                <div className="space-y-3 group cursor-pointer">
                                    <div className="aspect-[2/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Dramatic movie poster for a war film featuring mountains and a soldier" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAojjC5r_mA01ClvytLEqpr9XJAfQ_AJIidlXqyLtddvHrcBlJAmnAI_4Ti5najdCGowN7oOviLtPyr3OoLIzKOOLBj_uMv7J5ZNQ3DjL8K5Zfs_DcCQLW_tNZehiIXd4h5o_Op8XEFsdgL855n0usAPQK2EuChC6hSqVDkhVieoM-NI7z5A1wiwwqPkTNJAX8PNM_iT_ydIZKwR6AdqwwVkLzOUZhllxAhtysOkl3Nyr-n4FFx-Q1wDwrEqnfDUKj9zNIToUEYuS4i" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold group-hover:text-primary transition-colors">Shershaah</h4>
                                        <p className="text-xs text-slate-500">Director | 2021</p>
                                    </div>
                                </div>
                                <div className="space-y-3 group cursor-pointer">
                                    <div className="aspect-[2/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Intense action movie poster with silhouettes and fire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVbHALZrpm_9SfiKLB6vtCIjidCsIfNDFMWlu42xI92LqwR8jq-yJWnEyW1k6pukltGQP00_f4G0it1FKx-PnAEt1ICQ5GUK3Q0ezvuUGd2EB-L8rNSWBdndsxRfmU4PCf5zym32WWGMOI5dTM1-KIqirkxrOJA7cGH0aKvJNPufbgDqoSChpMVVczVte4WrRPgwMCRLwX5wQFgvr5Ycv_2Wi_vNs4wmAH2DyH2M7FP9bSKqxAr01iKKpHmO82Af2oUynYME1snYqx" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold group-hover:text-primary transition-colors">Agneepath</h4>
                                        <p className="text-xs text-slate-500">Director | 2012</p>
                                    </div>
                                </div>
                                <div className="space-y-3 group cursor-pointer">
                                    <div className="aspect-[2/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Sports drama movie poster with an athlete in the spotlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwM9xubAqxxmCbqLQ8VtlUENz1gGSCaTXuN5OS9yOs12H0k6V8POQgYRJKpdudei0BoLkXfbrrTUbO_-B_3mnZJxWmxNnkR-Y34PLgrfn6qntVWHYUkGlLn8AEUONeP7UBhTYlOM83yCcZMO91iW-7k0ssqMquGb-2i6LwNJufeFKbkMyyaVtGn2RWm0zdc3dyvxgDbp1dm5oqQZkisQch5LpT6-PlD4fXU5R8ST7hqo42l2ouV_uWxlYQ-FXAklqlQnjbJ6fu069Y" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold group-hover:text-primary transition-colors">Brothers</h4>
                                        <p className="text-xs text-slate-500">Director | 2015</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Studio Gallery */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="size-2 bg-primary rounded-full"></span>
                                    Behind The Scenes
                                </h2>
                                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                                    <img className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="Behind the scenes photo of a cinematographer using a large camera rig" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGXDTG75ZoHFY7716kG60UAdJLl77p_ovuP15P5_aM4XQ4MELo7fgjro1tAuQEgKB8jJhwiF_XWl_nM9jq4nXnzAiOroRJmISdTYxfdYN9LApwRNw3SCicC5ozw0vbcmfX8qIk_P3z3dqo6K_bzr6q22v0SXpJgEyEDK9x_NDAF3cXvMYQbg5w_Sir_LB8_RBLX3qZ3jQp63TRiB5tqc-mme9tDk9PDnjs9Soc0z1nyzeyR69TJdJNucKnn1sI2FQCzhzUE-RGN3Nn" />
                                </div>
                                <div className="grid grid-rows-2 gap-4">
                                    <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        <img className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="Director's chair on a film set during night production" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOMXmBP2Xu-cWWuQQ921-ofTpE7BU-3vqvprtsLyMfYbfTfpeNLi9Qefl7ThMKcGi7wUFLBLNcSQuyIClV-Hh9VYFMrQAQ5GJc0IP0gXjTuD1INGRUi3o2aGn98TQyEZaTXG9_dtmSE7cZbHJTww8q1LP6cb8yU60oXuN8yphWotoVXiYuBGzkvabSpQ7Jr2NQfFBd5kKYKnqSY1jnL7xSGASUWvEY0XkHnm6hbXouI-mMzn8vvdh3CJiE25D5ewoWb_60CYm6Ugyr" />
                                    </div>
                                    <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        <img className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="Actors preparing for a scene in a studio environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBflOIlmUQYI1B_k2LVIiuP6rQ78Vpni9Vd0g94QxHvhqMiTEQXQq-GkWpsZs_a9DdcXwfoYAOvXYvIajOS_JV1ehGK5KK5gNKM786JYn3tbyezYeO6fadew3ERTmE_mhM65sVJBYKvE171N8elGvlTSYl_qxFs1n3xtOfpS9Tyr5FH4XC_OsVUpVm1K9lDKrnFaZq6Elufp21DAqRJH5fLfMgWB78kR_PqOFoMIqY9fCIB4DVB1yBa7OaxkcORB_I7GVVNiTrY8IpZ" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 py-16 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                            <span className="material-symbols-outlined text-3xl">movie</span>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">StarCast India</h2>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            India's premier digital platform connecting talent with the biggest names in the cinematic industry.
                        </p>
                        <div className="flex gap-4">
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="#"><span className="material-symbols-outlined">public</span></Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="#"><span className="material-symbols-outlined">alternate_email</span></Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors" to="#"><span className="material-symbols-outlined">share</span></Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link className="hover:text-primary transition-colors" to="#">Find Auditions</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="#">Post a Job</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="#">Premium Talent</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="#">Director Portfolios</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link className="hover:text-primary transition-colors" to="#">Help Center</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="#">Terms of Service</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="#">Privacy Policy</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="#">Community Guidelines</Link></li>
                        </ul>
                    </div>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <p className="text-xs text-slate-500 mb-4">Get the latest casting updates directly in your inbox.</p>
                        <div className="flex gap-2">
                            <input className="bg-white dark:bg-slate-800 border-none rounded-lg text-sm w-full focus:ring-primary focus:ring-2 outline-none" placeholder="Email" type="email" />
                            <button className="bg-primary text-white p-2 rounded-lg"><span className="material-symbols-outlined">send</span></button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">© 2026 StarCast India. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <span>Mumbai, India</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span> 10:00 AM - 7:00 PM IST</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DirectorPortfolio;
