import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const AuditionDetails = () => {
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
            headerTitle="Audition Details"
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
            headerTitle="Audition Details"
            headerSubtitle="Review the requirements and prepare for your screen test."
        >
            <div className="max-w-5xl space-y-8 pb-24">
                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden h-80 group shadow-2xl">
                    <img className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" alt="Hero" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZj3_7cLDGAJjpTXjIvBa5QSYVQ_ePDvkj-K1DfTuFlVNeO9gbX_V1_xyulCpg_coIKOROh5Dz86-bGcpjY_tDkJnXiDjmU4q_fhd7I_1DZW6gsSWp3tsKMPVuhtueDl6t6jTc8lz9SX5bu6Rii9iZS6HiH5Sdfwl1LmyLKGqhE9xwlTQkIQbptG51qozNVw0aFFfucDx9hjsml5PCwbDjxXDWkgrUnA_oWfy74JyxoAJs5V7nuTbgb3tYEeo4Zlttmg7p9qx5Zy4D" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 uppercase tracking-tighter italic">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest mb-3 whitespace-nowrap not-italic">Feature Film • Period Drama</span>
                            <h1 className="text-white text-4xl font-black mb-2">The Last Dynasty</h1>
                            <p className="text-slate-300 text-lg flex items-center gap-2 not-italic font-medium">Directed by Siddharth Roy</p>
                        </div>
                        <div className="flex gap-3 not-italic">
                            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-xl shadow-primary/20 whitespace-nowrap text-xs uppercase tracking-widest">Confirm Attendance</button>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
                            <h3 className="text-2xl font-black italic tracking-tighter dark:text-white flex items-center gap-2 mb-6 uppercase">
                                <span className="material-symbols-outlined text-primary">person_search</span>
                                Character Brief: Vikram
                            </h3>
                            <div className="space-y-4 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                <p>Vikram (28-35) is the eldest prince of the Surya Dynasty. He is a complex warrior who balances his duty to the throne with his secret disdain for war. He is brooding, intelligent, and speaks with a calm authority.</p>
                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-zinc-800">
                                    <div>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Look</p>
                                        <p className="text-sm font-bold dark:text-slate-200">Rugged, regal, sharp features</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Tone</p>
                                        <p className="text-sm font-bold dark:text-slate-200">Low-register, intense, articulate</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-black italic tracking-tighter dark:text-white flex items-center gap-2 uppercase">
                                    <span className="material-symbols-outlined text-primary">description</span>
                                    Script Fragment
                                </h3>
                                <button className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">download</span> Download
                                </button>
                            </div>
                            <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800 font-mono text-sm text-slate-600 dark:text-slate-400">
                                <div className="space-y-6">
                                    <div className="text-center italic opacity-60 uppercase tracking-widest text-[10px]">[EXT. PALACE BALCONY - NIGHT]</div>
                                    <div>
                                        <span className="block text-slate-800 dark:text-white font-bold mb-1 uppercase tracking-widest text-center">VIKRAM</span>
                                        <p className="text-center italic text-xs">(quietly, staring into the dark)</p>
                                        <p className="mt-2 text-center">The stars don't witness our victories, General. They only witness the blood we spill to claim them.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <h4 className="text-lg font-black italic tracking-tighter dark:text-white mb-6 uppercase">Logistics</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">event</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Date</p>
                                        <p className="text-sm font-bold dark:text-slate-200">October 25, 2023</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Time Slot</p>
                                        <p className="text-sm font-bold dark:text-slate-200">10:30 AM onwards</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Location</p>
                                        <p className="text-sm font-bold dark:text-slate-200">Studio 41, Mumbai</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AuditionDetails;
