import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const AuditionInvites = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMyProfile();
                setProfile(res.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : profile?.profilePicture
    };

    if (loading) return (
        <DashboardLayout
            menuItems={TALENT_MENU}
            userRole="India • Artist"
            userData={{ name: "...", roleTitle: "...", avatar: "" }}
            headerTitle="Audition Invites"
        >
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout
            menuItems={TALENT_MENU}
            userRole="India • Artist"
            userData={userData}
            headerTitle="Audition Invites"
            headerSubtitle="Invitations for auditions and screen tests."
            searchPlaceholder="Search invitations..."
        >
            <div className="space-y-8 pb-12">
                {/* Spotlight Card */}
                <section className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-primary/20 p-8 flex flex-col md:flex-row gap-8 items-center group">
                    <div className="absolute top-0 right-0 bg-primary/10 px-4 py-1 rounded-bl-xl border-l border-b border-primary/20">
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Immediate Next</span>
                    </div>
                    <div className="w-full md:w-64 aspect-[3/4] rounded-xl overflow-hidden bg-slate-800 relative shadow-2xl">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Spotlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfPbvRsFuO3qrieaHqYV59RwcJPkw7nE9JBDxVIznBLReEbSBD6r7hmOXA_I1jzn8WZ2iJhempI9H2gK7C8rps1IvPOxTPuPbC1pUs5izsf1PYrzPYTMTSXmhx1czPJNQBo4To8qQpDIBewzkju5TG7G0JELx6tu-O5gGQaaWXkiereJ_HEaT_VXkod6hwmLVAFXmOYLfuXeF1_W8PAwpzPIF_ZlZGgVBx_Qn4tWJb7PP79xZtgB9DCb3I-aaLtwXQFxlYonl3yCnf" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                            <p className="text-primary text-xs font-bold tracking-[0.2em] mb-2 uppercase">Upcoming Spotlight</p>
                            <h3 className="text-4xl font-black uppercase italic tracking-tighter dark:text-white leading-tight">The Last Dynasty</h3>
                            <p className="text-slate-500 mt-2 font-medium">Empire Films Production | Dir. Sanjay Leela</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-100 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">person</span>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Role</p>
                                    <p className="text-sm font-bold dark:text-slate-200">Lead Actor - Vikram</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Date & Time</p>
                                    <p className="text-sm font-bold dark:text-slate-200">Tomorrow, 10:00 AM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Location</p>
                                    <p className="text-sm font-bold dark:text-slate-200">Studio 41, Mumbai</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Preparation</p>
                                    <p className="text-sm font-bold text-primary underline cursor-pointer">Download Script</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                            <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 uppercase text-xs tracking-widest">PREPARE SCRIPT</button>
                            <button className="px-8 py-3 bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 transition-all border border-slate-200 dark:border-zinc-700 uppercase text-xs tracking-widest">RESCHEDULE</button>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        <button className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-full whitespace-nowrap shadow-lg shadow-primary/20">New (4)</button>
                        <button className="px-6 py-2 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-bold rounded-full border border-slate-200 dark:border-zinc-800 transition-colors whitespace-nowrap">Accepted</button>
                        <button className="px-6 py-2 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-bold rounded-full border border-slate-200 dark:border-zinc-800 transition-colors whitespace-nowrap">Declined</button>
                        <button className="px-6 py-2 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-bold rounded-full border border-slate-200 dark:border-zinc-800 transition-colors whitespace-nowrap">Completed</button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-bold border border-slate-200 dark:border-zinc-800 hover:border-primary transition-all shadow-sm">
                        <span className="material-symbols-outlined text-sm">tune</span>
                        More Filters
                    </button>
                </div>

                {/* Invites List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                    {/* Invite Item 1 */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6 group hover:border-primary/40 transition-all shadow-sm">
                        <div className="size-24 rounded-2xl bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-lg">
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Invite 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdbk9wJTTct3vkDXNVyv44p_QFPD9KdK0al8mwyS4cUO1H82i-Ve__IZjuFMratoxVbwlMpKoOj0wE70O-i_GWRfOteAVRqRp4bcANHUugtxHPpCTE5zcON7fmCG1Qtk2_guMBVAaHkQ9Wobz3-Zj1UbOAQt2ACOGIDmkm4ovDzolKWIsc_nyf_V2bToMcRESwW8k-jvSSsedeP7jPmaHCoVk5hYTpolkYpi4pfZcYfzsYBZwDR0VvtJCI1ftvyWxizdJ5tMAwwBAM" />
                        </div>
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                <h4 className="font-bold text-lg text-slate-800 dark:text-white truncate uppercase italic tracking-tighter">Urban Chronicles</h4>
                                <span className="shrink-0 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">New</span>
                            </div>
                            <div className="space-y-1 mb-4">
                                <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1 font-medium">
                                    <span className="material-symbols-outlined text-sm text-primary">person</span> Supporting - Aryan
                                </p>
                                <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1 font-medium">
                                    <span className="material-symbols-outlined text-sm text-primary">apartment</span> Red Chillies Ent.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link className="flex-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-all text-center uppercase tracking-widest" to="/talent/audition-details">Accept</Link>
                                <button className="p-2 bg-slate-100 dark:bg-zinc-800 text-slate-400 rounded-xl hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AuditionInvites;
