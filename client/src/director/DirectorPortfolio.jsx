import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { DIRECTOR_MENU } from '../constants/navigation';

const DirectorPortfolio = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getMyProfile();
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching director profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const userData = {
        name: profile?.fullName || 'Karan Malhotra',
        roleTitle: `${profile?.companyName || 'Dharma Productions'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : (profile?.profilePicture || "https://lh3.googleusercontent.com/aida-public/AB6AXuCQTIhlAB-uIKbENopksNnXCYEJaIIo0P1oDGkSJHRJH1dqunSM1hmNuQtLzZOV5mYeBc0t1-2fxOiij01r6S4qLIwaUoolXKDsRfpM2masOz1ZVp4ZpAaup_Gd1O_uqZyrodc5HfvouztqYV7cd5z2K8AJVKHnUw_Va1-WN5RkEeE4JFxCnLcEFtIJkvoq4d0qqfbZbNjkQR_p8mmVjLSmN0JG7Lhn6dVJSzNf8WSJegZblLi0s8mBr1JlZjxDwFIi9-38Fqmct2wY")
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Director Portfolio"
            headerSubtitle="Showcasing cinematic vision and featured projects."
            searchPlaceholder="Search projects, talent..."
        >
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Vision...</p>
                    </div>
                ) : (
                    <>
                        {/* Hero Section */}
                        <section className="relative h-[50vh] w-full overflow-hidden bg-black rounded-3xl mb-12">
                            <div className="absolute inset-0">
                                <img
                                    className="w-full h-full object-cover object-center opacity-70"
                                    alt="Director Karan Malhotra on a movie set"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBUzoJM47v_dGy2wKweh7iwDgZwcNZ5fx__VM3MLBmMtFXsHQP3Hg7yvq0rQIgkYcDUMPrSN8GwDYbxnbmzZYENI1xUPBuAmhRoF9seqZ7_GUtpSFoWkpgQ8MSwgqpMRKa-vQphcffXQBq2i48QmzlIPpOTMo4ym67FNy62wndCKUo0LbYojSxCcwtC-bHp1CGdzX0mWcP8nd-HUnBNZ_zCx65Y9ysDCzioP9hNRDOOY1v7Fm8422TrqTjFTsuZB3C0QG5bbzLN1kV"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
                                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-black tracking-widest uppercase rounded mb-4 shadow-lg shadow-primary/20">
                                            Elite Director
                                        </span>
                                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-2 text-white">
                                            {profile?.fullName || 'Karan Malhotra'}
                                        </h2>
                                        <p className="text-lg md:text-xl text-primary font-bold tracking-tight">
                                            {profile?.bio || 'Film Director & Producer | Dharma Productions'}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                                            <span className="material-symbols-outlined">person_add</span>
                                            Follow
                                        </button>
                                        <button className="bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all font-bold text-white">
                                            <span className="material-symbols-outlined">assignment_ind</span>
                                            Open Auditions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content Sections */}
                        <div className="max-w-7xl mx-auto py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                {/* Left Column: Stats & Vision */}
                                <div className="lg:col-span-8 space-y-16">
                                    <article>
                                        <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                            <span className="size-2 bg-primary rounded-full"></span>
                                            Cinematic Vision
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                                            A visionary storyteller known for grand scales and emotional depth. Associated with {profile?.companyName || 'Dharma Productions'}, {profile?.fullName || 'Karan Malhotra'} has redefined modern Indian commercial cinema with a focus on gritty narratives and high-octane drama. His approach blends classical Indian storytelling with international technical standards.
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mt-4 font-medium">
                                            Malhotra is particularly acclaimed for his character-driven action sequences and his ability to draw out powerful performances from ensemble casts. He continues to push boundaries in production value and visual effects within the Bollywood landscape.
                                        </p>
                                    </article>

                                    {/* Filmography */}
                                    <section>
                                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                            <span className="size-2 bg-primary rounded-full"></span>
                                            Featured Filmography
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                            {[
                                                { title: "Shershaah", year: "2021", role: "Director", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAojjC5r_mA01ClvytLEqpr9XJAfQ_AJIidlXqyLtddvHrcBlJAmnAI_4Ti5najdCGowN7oOviLtPyr3OoLIzKOOLBj_uMv7J5ZNQ3DjL8K5Zfs_DcCQLW_tNZehiIXd4h5o_Op8XEFsdgL855n0usAPQK2EuChC6hSqVDkhVieoM-NI7z5A1wiwwqPkTNJAX8PNM_iT_ydIZKwR6AdqwwVkLzOUZhllxAhtysOkl3Nyr-n4FFx-Q1wDwrEqnfDUKj9zNIToUEYuS4i" },
                                                { title: "Agneepath", year: "2012", role: "Director", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVbHALZrpm_9SfiKLB6vtCIjidCsIfNDFMWlu42xI92LqwR8jq-yJWnEyW1k6pukltGQP00_f4G0it1FKx-PnAEt1ICQ5GUK3Q0ezvuUGd2EB-L8rNSWBdndsxRfmU4PCf5zym32WWGMOI5dTM1-KIqirkxrOJA7cGH0aKvJNPufbgDqoSChpMVVczVte4WrRPgwMCRLwX5wQFgvr5Ycv_2Wi_vNs4wmAH2DyH2M7FP9bSKqxAr01iKKpHmO82Af2oUynYME1snYqx" },
                                                { title: "Brothers", year: "2015", role: "Director", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwM9xubAqxxmCbqLQ8VtlUENz1gGSCaTXuN5OS9yOs12H0k6V8POQgYRJKpdudei0BoLkXfbrrTUbO_-B_3mnZJxWmxNnkR-Y34PLgrfn6qntVWHYUkGlLn8AEUONeP7UBhTYlOM83yCcZMO91iW-7k0ssqMquGb-2i6LwNJufeFKbkMyyaVtGn2RWm0zdc3dyvxgDbp1dm5oqQZkisQch5LpT6-PlD4fXU5R8ST7hqo42l2ouV_uWxlYQ-FXAklqlQnjbJ6fu069Y" }
                                            ].map((film, i) => (
                                                <div key={i} className="group cursor-pointer">
                                                    <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 relative mb-4">
                                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={film.title} src={film.img} />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                                                        </div>
                                                    </div>
                                                    <h4 className="font-bold group-hover:text-primary transition-colors">{film.title}</h4>
                                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{film.role} | {film.year}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Stats & Contact */}
                                <div className="lg:col-span-4 space-y-8">
                                    <div className="p-8 rounded-3xl bg-primary shadow-2xl shadow-primary/20 text-white">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-70">Experience Stats</h4>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-4xl font-black">12</p>
                                                <p className="text-[10px] uppercase font-bold opacity-70">Major Films</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black">4</p>
                                                <p className="text-[10px] uppercase font-bold opacity-70">Awards</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black">15+</p>
                                                <p className="text-[10px] uppercase font-bold opacity-70">Years Exp</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black">1.2M</p>
                                                <p className="text-[10px] uppercase font-bold opacity-70">Followers</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-3xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-bold text-lg">Active Projects</h3>
                                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-full">LIVE</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/30 transition-all cursor-pointer group">
                                                <p className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">Untitled Action Drama</p>
                                                <p className="text-xs text-slate-500 font-medium">Lead Female (22-28 yrs) • Delhi</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">3 Days Remaining</span>
                                                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/30 transition-all cursor-pointer group">
                                                <p className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">Historical Epic Series</p>
                                                <p className="text-xs text-slate-500 font-medium">Supporting Male • Martial Arts</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Immediate Casting</span>
                                                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-3xl bg-slate-900 text-white">
                                        <h4 className="font-bold mb-4">Interested in Working?</h4>
                                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">Currently accepting portfolios for 2026-27 production slate. Only professional showreels will be reviewed.</p>
                                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Submit Portfolio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="py-8 border-t border-slate-200 dark:border-border-dark text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 TalentConnect Entertainment • Director Portfolio Hub</p>
                        </footer>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DirectorPortfolio;
