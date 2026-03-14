import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { DIRECTOR_MENU } from '../constants/navigation';

const AuditionRequests = () => {
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
            headerTitle="Audition Requests"
            headerSubtitle="Manage and review incoming audition submissions from talent."
            searchPlaceholder="Search auditions..."
        >
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Auditions...</p>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto py-8">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight mb-2">Role: The Crown Prince</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Head-to-head comparison of top finalists for the lead character</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="px-5 py-2 rounded-xl border border-slate-200 dark:border-border-dark font-bold text-xs hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                                    View Project Brief
                                </button>
                                <button className="px-5 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                                    Save Progress
                                </button>
                            </div>
                        </div>

                        {/* Comparison Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Candidate One */}
                            <div className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-border-dark shadow-xl flex flex-col">
                                <div className="p-6 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 dark:border-border-dark">
                                            <img alt="Aryan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN7Sk_AjY7ygkKreH6jPRS4b6nCeqQuui4PsyDWiSLCB-8qA9ONsEONEPIs1rcVMr_XCn49s_F41odOpB1ec9Xv-CXVp3q1t7QghWkyNGu4ioqdgU0QzBJKB9DfZGbUaCfK6lxgoOEEGdO-WMGq0L2TS11_U-U2k4mq9TF7xJsCn35ldG_qmGGtrAUS-ZNK6VpxmAPta-lRzwUNkZJ_F_0xjRkev-wnkWGglSNmFPHy5Qqx2Rcj2nV5zb_HAt5N-eziAwJOJpmkffd" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">Aryan Sharma</h3>
                                            <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full uppercase tracking-wider">Top Seeded</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex text-primary">
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg">star_half</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-1 font-bold">9.2 / 10 Overall</p>
                                    </div>
                                </div>
                                <div className="relative group cursor-pointer aspect-video bg-black flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10"></div>
                                    <img alt="Tape" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVy6Rq7FFRuwcIlXixc0dy6imQj0Dc4vdb3KPCdsD5C1kehM3hucMIzZctOF7Bf8r2WVPtHPgEw_GGggmJG6ubEfDm6ZC8xffknhBg85qI5FutQVFnGunfuST-s6uFGKDeP9tmBcP_VYDDSgo1vFuDgPg8IZjbtxrCWpA-gnp7831a7VgHLg3ov7OrdNBeUQG9-f6Ye_CSjYXcA69rxVcJyInHtrB-rF4171pT_EMyPUADhNkl_ogWar2HAZaQ98FzUWXQYo8rpe2z" />
                                    <div className="z-20 bg-primary w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-white text-4xl fill-1">play_arrow</span>
                                    </div>
                                    <div className="absolute bottom-4 left-6 z-20 text-left">
                                        <p className="text-white font-bold text-sm">Audition Tape: Screen Test #3</p>
                                        <p className="text-white/60 text-[10px] italic">"The Confrontation Scene"</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6 flex-1">
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Performance Metrics</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                                    <span>Screen Presence</span>
                                                    <span className="text-primary">95%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[95%]"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                                    <span>Emotional Range</span>
                                                    <span className="text-primary">88%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[88%]"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                                    <span>Dialogue Delivery</span>
                                                    <span className="text-primary">92%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[92%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Director's Notes</h4>
                                        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border-l-4 border-primary italic text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                            "Aryan brings a raw, magnetic vulnerability that the role requires. His eyes tell a story even when he's silent. Excellent chemistry with the female lead in screen tests. Physique is perfect for the era."
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-border-dark">
                                    <button className="w-full bg-primary py-3 rounded-xl font-bold text-white text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all">
                                        Cast Aryan Sharma
                                    </button>
                                </div>
                            </div>

                            {/* Candidate Two */}
                            <div className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-border-dark shadow-xl flex flex-col opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all">
                                <div className="p-6 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 dark:border-border-dark">
                                            <img alt="Vikram" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN0uguKemFR458qUpZUYk678cnuz_EIL-WlXchrfNkzzztgntW6XF5tzIsUXuhZD8vv4Eag7F35ocrxdo7_QcrrDa1q4-Egj1PQAsl8Bzi401QJ83os_d8PF9BxBc8ZKZhogNVjY3ipb66T4XzM_7lwvzmGkpM5rRUGTy3ZUZa1xIQIvldYqBEaLh_er9BnUaFWWKvaOs3sTXFUzpnEXJi83XSVpc_xKYrhxS05vd_dZIbMhrluSQoz8sCYNwhqGbwpGgAhLYhlL7S" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">Vikram Malhotra</h3>
                                            <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 bg-slate-100 dark:bg-white/10 rounded-full uppercase tracking-wider">The Veteran</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex text-primary">
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                            <span className="material-symbols-outlined text-lg fill-1">star</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-1 font-bold">8.9 / 10 Overall</p>
                                    </div>
                                </div>
                                <div className="relative group cursor-pointer aspect-video bg-black flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10"></div>
                                    <img alt="Tape" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaurOGQy0vJDFrwIAjS0dLYS4qigD0ZRc1JYxGjMrQngfT93dXVug9DEXhFBXino6KrewQGzI-uJocaWTiwrCiCXC8oq2ws9FMUNwVXNolo999wxLdatCZRwZiW3y-R5ROS-LActGljizgOk_lfdwDFIBSXfqKRZKiQ7gCunyyZDU3cfmfmMVaFVkm_b-ag-8xgKePaVsL1fuxurcYoq1GnTeohHLIFlIZjsUtiFl6fmAq2gmW3bNrK57p47n1DV53pzPydq4UlgRZ" />
                                    <div className="z-20 bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-white text-4xl fill-1">play_arrow</span>
                                    </div>
                                    <div className="absolute bottom-4 left-6 z-20 text-left">
                                        <p className="text-white font-bold text-sm">Audition Tape: Final Cut</p>
                                        <p className="text-white/60 text-[10px] italic">"The Coronation Speech"</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6 flex-1">
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Performance Metrics</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                                    <span>Screen Presence</span>
                                                    <span className="text-slate-500">82%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-slate-500 h-full w-[82%]"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                                    <span>Emotional Range</span>
                                                    <span className="text-slate-500">96%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-slate-500 h-full w-[96%]"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                                    <span>Dialogue Delivery</span>
                                                    <span className="text-slate-500">90%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-slate-500 h-full w-[90%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Director's Notes</h4>
                                        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border-l-4 border-slate-400 italic text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                            "Technically superior actor. His command over the language is impeccable. However, he might be a bit too 'classical' for the modern gritty take we want. Needs more intensity in high-stakes action scenes."
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-border-dark">
                                    <button className="w-full bg-slate-800 dark:bg-white/10 py-3 rounded-xl font-bold text-white text-xs uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
                                        Cast Vikram Malhotra
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Comparison Table */}
                        <div className="mt-12 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-xl">
                            <div className="p-6 border-b border-slate-100 dark:border-border-dark">
                                <h3 className="text-lg font-bold">Detailed Attributes Comparison</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                            <th className="px-6 py-4">Attribute</th>
                                            <th className="px-6 py-4">Aryan Sharma</th>
                                            <th className="px-6 py-4">Vikram Malhotra</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs divide-y divide-slate-100 dark:divide-border-dark">
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-slate-400 uppercase tracking-tighter">Experience</td>
                                            <td className="px-6 py-4 dark:text-slate-200">2 Indie Films, 5 Theatre plays</td>
                                            <td className="px-6 py-4 dark:text-slate-200">12 Feature Films, TV Series lead</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-slate-400 uppercase tracking-tighter">Stunt Capability</td>
                                            <td className="px-6 py-4 dark:text-slate-200">High (Trained in Martial Arts)</td>
                                            <td className="px-6 py-4 dark:text-slate-200">Medium (Basic Training)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-slate-400 uppercase tracking-tighter">Language</td>
                                            <td className="px-6 py-4 dark:text-slate-200">Hindi, English, Punjabi</td>
                                            <td className="px-6 py-4 dark:text-slate-200">Hindi, English, Marathi</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-slate-400 uppercase tracking-tighter">Availability</td>
                                            <td className="px-6 py-4 text-emerald-500 font-bold uppercase tracking-widest">Immediate</td>
                                            <td className="px-6 py-4 text-amber-500 font-bold uppercase tracking-widest">Post Dec 2026</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer Summary */}
                        <div className="mt-8 flex justify-center pb-8 text-center">
                            <p className="text-slate-500 text-xs flex items-center gap-2 font-medium">
                                <span className="material-symbols-outlined text-sm">info</span>
                                This decision will finalize the contract negotiation process for 'The Crown Prince'.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <footer className="mt-auto py-6 px-8 border-t border-slate-200 dark:border-border-dark text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 TalentConnect Entertainment • Casting Partner: Cinematic Solutions</p>
            </footer>
        </DashboardLayout>
    );
};

export default AuditionRequests;
