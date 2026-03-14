import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { DIRECTOR_MENU } from '../constants/navigation';

const ProjectDetails = () => {
    const { id } = useParams();
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
        name: profile?.fullName || 'Rohan Mehra',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'Mumbai, IN'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : (profile?.profilePicture || "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8S-aeuR2cORz2aKmlcoRCZG0vX3wrCerglNjBZAeRTyWFtdCwCVgW2iau6r9ehLrZVdI8FCvYXugQN5g0iwxAp0y0a9DKiit2XmW7WKPzqsjSZb23GH1WfBIs3CwD2BV5JgiHEA7RJccg4NGPWqIKlO7EjA6wyORiH7n3g1MwegFrrf7ovbugGps3ElIcbYbaEJb-Rgshm_LVUyOQQOsWt3Lf1te1KVr8F6VcVTewalCyMztq1GlKktZMvh7wHTp2HgBgHIXuiFI")
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Project Details"
            headerSubtitle="The Last Dynasty • Manage roles, requirements, and production team."
            searchPlaceholder="Search roles or talent..."
        >
            <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Project Details...</p>
                    </div>
                ) : (
                    <div className="p-8">
                        <section className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-slate-200 dark:border-white/5 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                            <img className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd1nYs3Lqtz13PJbVE1N86MyNwRZ8pPGPcm5A1Jqx5GCNrQHv9ZDy0Dq8nhCFqHvHx8BAjp23MZXSFaE9FPq4ikpJy9w46-RRThHW85CMms9vmvr4FqVojyFTtC0AspwLCr-IKf-ETZu5TJ1Elb5VZfdTi9CBFgnEGILJffd0ZLi9pzmJfRW7wUKlVplgWb8Ay6e1mtcrdRW7J4e0LASCKPC7QOqXrfO6YdWP_eXuMD_ZAnpAY_K7m17ei86F1xtqntTRo8b7vT1Er" alt="Project Banner" />
                            <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                    <div>
                                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">The Last Dynasty</h1>
                                        <p className="text-slate-300 text-sm font-bold flex items-center gap-6 uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">calendar_today</span> Oct 2024 - Jan 2025</span>
                                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> Mumbai, Rajasthan</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
                                            <span className="material-symbols-outlined text-sm">person_add</span> Post New Role
                                        </button>
                                        <button className="flex items-center justify-center p-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl transition-all hover:scale-105 active:scale-95">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-12">
                                {/* Project Vision */}
                                <section>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-primary rounded-full"></span> Project Vision
                                    </h3>
                                    <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-medium mb-8">
                                            An epic historical drama set in 18th century India, chronicling the rise and fall of a forgotten royal lineage. The project focuses on the internal power struggles and the collision of traditional values with the onset of modernization.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-100 dark:border-white/5">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Production House</p>
                                                <p className="font-bold text-primary">{profile?.companyName || "Director's Studio"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Budget Status</p>
                                                <p className="font-bold text-emerald-500 uppercase flex items-center gap-1"><span className="size-1.5 bg-emerald-500 rounded-full"></span> Fully Funded</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Script Status</p>
                                                <p className="font-bold">Locked (Rev 4.0)</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Role Requirements */}
                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-primary rounded-full"></span> Active Castings
                                        </h3>
                                        <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All Roles</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { title: "The Crown Prince", type: "Lead Role • Male", age: "24-32", build: "Athletic / Lean", tag: "URGENT", applicants: 42 },
                                            { title: "Royal Guard", type: "Supporting • Male", age: "40-55", build: "Height 5'10\"+", applicants: 18 }
                                        ].map((role, i) => (
                                            <div key={i} className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 hover:border-primary/40 transition-all group flex flex-col justify-between shadow-sm">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{role.title}</h4>
                                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-tight">{role.type}</p>
                                                    </div>
                                                    {role.tag && <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-1 rounded-full border border-primary/20">{role.tag}</span>}
                                                </div>
                                                <div className="space-y-3 mb-8">
                                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                                        <span className="text-slate-400">Age Range</span>
                                                        <span>{role.age} years</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                                        <span className="text-slate-400">Physical Build</span>
                                                        <span>{role.build}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-white/5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex -space-x-2">
                                                            <div className="size-7 rounded-full bg-slate-200 border-2 border-white dark:border-card-dark overflow-hidden"><img src="https://i.pravatar.cc/100?u=1" alt="p1" /></div>
                                                            <div className="size-7 rounded-full bg-slate-300 border-2 border-white dark:border-card-dark overflow-hidden"><img src="https://i.pravatar.cc/100?u=2" alt="p2" /></div>
                                                            <div className="size-7 rounded-full bg-primary flex items-center justify-center text-[8px] font-black text-white border-2 border-white dark:border-card-dark">+{role.applicants}</div>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</span>
                                                    </div>
                                                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">Manage <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-10">
                                {/* Casting Progress */}
                                <section>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-primary rounded-full"></span> Project Tracking
                                    </h3>
                                    <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm space-y-8">
                                        {[
                                            { label: "Lead Roles", total: 4, casted: 1, percent: 25 },
                                            { label: "Supporting Cast", total: 12, casted: 6, percent: 50 },
                                            { label: "Background", total: 40, casted: 0, percent: 2 }
                                        ].map((stat, i) => (
                                            <div key={i} className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                                                    <span className="text-[10px] font-black text-primary">{stat.casted} / {stat.total} SECURED</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${stat.percent}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                        <button className="w-full py-3.5 bg-slate-50 dark:bg-white/5 hover:bg-primary hover:text-white border border-slate-200 dark:border-white/5 hover:border-primary text-primary font-black rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all">
                                            Status Report (PDF)
                                        </button>
                                    </div>
                                </section>

                                {/* AI Card */}
                                <section>
                                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:rotate-12 transition-transform">
                                            <span className="material-symbols-outlined text-6xl">auto_awesome</span>
                                        </div>
                                        <h4 className="font-black text-lg mb-2 relative z-10">Cast Smarter with AI</h4>
                                        <p className="text-slate-400 text-xs font-medium mb-6 leading-relaxed relative z-10">Let our AI matchmaker suggest the top 5 actors for your lead roles based on current trending talent.</p>
                                        <button className="w-full py-3.5 bg-primary text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20 relative z-10 active:scale-95">
                                            Run AI Analysis
                                        </button>
                                    </div>
                                </section>

                                {/* Core Team */}
                                <section>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-primary rounded-full"></span> Production Team
                                    </h3>
                                    <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                        {[
                                            { name: "Vikram Malhotra", role: "Exec. Producer", img: "https://i.pravatar.cc/100?u=v" },
                                            { name: "Riya Sharma", role: "Casting Director", img: "https://i.pravatar.cc/100?u=r" }
                                        ].map((member, i) => (
                                            <div key={i} className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                                <div className="size-10 rounded-xl bg-slate-200 overflow-hidden border border-slate-200 dark:border-white/5">
                                                    <img className="w-full h-full object-cover" src={member.img} alt={member.name} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-sm leading-none mb-1">{member.name}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{member.role}</p>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-lg">mail</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <footer className="py-8 px-8 border-t border-slate-200 dark:border-border-dark text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 TalentConnect • Where Global Talent Meets Opportunity</p>
            </footer>
        </DashboardLayout>
    );
};

export default ProjectDetails;
