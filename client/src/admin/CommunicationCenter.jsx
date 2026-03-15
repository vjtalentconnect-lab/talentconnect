import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getAdminStats } from '../services/adminService';

const CommunicationCenter = () => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Announcements');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, statsRes] = await Promise.all([
                    getMyProfile(),
                    getAdminStats()
                ]);
                setAdminProfile(profileRes.data);
                setStats(statsRes.data);
            } catch (err) {
                console.error('Error fetching System context:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: stats?.pendingVerifications?.toString() },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication', active: true },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: adminProfile?.fullName || 'Admin',
        roleTitle: 'Super Admin',
        avatar: adminProfile?.profilePicture && adminProfile.profilePicture !== 'no-photo.jpg' 
            ? adminProfile.profilePicture 
            : `https://ui-avatars.com/api/?name=${adminProfile?.fullName || 'Admin'}&background=ee2b3b&color=fff`
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-dark">
            <div className="size-24 relative">
                <div className="absolute inset-0 border-[6px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-3 border-[6px] border-primary/10 border-b-primary rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-4xl animate-pulse">campaign</span>
            </div>
            <p className="mt-10 text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Syncing Broadcast Nodes...</p>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="Broadcast Nexus"
            headerSubtitle="Global platform communication and signal management"
            headerActions={
                <button className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Create Signal
                </button>
            }
            searchPlaceholder="Search broadcasts, logs, audience..."
        >
            <div className="max-w-7xl mx-auto py-8 lg:px-4 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
                {/* Tabs */}
                <div className="flex bg-slate-100 dark:bg-white/5 p-2 rounded-[2.5rem] gap-4 self-start overflow-x-auto scrollbar-hide mb-4">
                    {['Announcements', 'System Alerts', 'Mail Shards', 'SMS Nodes'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-3xl whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                    {/* Left/Main Column: Composer and History */}
                    <div className="xl:col-span-8 space-y-12">
                        {/* Composer Section */}
                        <section className="bg-white dark:bg-card-dark rounded-[3.5rem] p-12 border border-slate-200 dark:border-border-dark shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 size-48 bg-primary/2 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-primary/5 transition-colors"></div>
                            <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight mb-12 flex items-center gap-6">
                                <div className="size-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl shadow-primary/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">terminal</span>
                                </div>
                                Composer Terminal
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 ml-2">Signal Header</label>
                                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[2rem] focus:ring-4 focus:ring-primary/10 transition-all text-sm font-black p-6 outline-none dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 uppercase tracking-tight" placeholder="ANNOUNCEMENT_TITLE_ALPHA..." type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 ml-2">Signal Payload</label>
                                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[2.5rem] overflow-hidden group/editor focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                                        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-white/10 px-8 py-4 bg-slate-100/50 dark:bg-white/5">
                                            {['format_bold', 'format_italic', 'format_list_bulleted', 'link', 'image'].map((icon, idx) => (
                                                <button key={idx} className="size-10 flex items-center justify-center hover:bg-primary hover:text-white rounded-xl text-slate-400 transition-all">
                                                    <span className="material-symbols-outlined text-xl">{icon}</span>
                                                </button>
                                            ))}
                                            <div className="w-px h-8 bg-slate-200 dark:bg-white/10 mx-2"></div>
                                            <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">PREVIEW_RAW</button>
                                        </div>
                                        <textarea className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold p-10 resize-none dark:text-slate-300 min-h-[240px] placeholder:text-slate-300 dark:placeholder:text-slate-700" placeholder="System log: Input signal content for platform propagation..." rows="6"></textarea>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 ml-2">Propagation Vector</label>
                                        <select className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 text-xs font-black uppercase tracking-[0.2em] outline-none cursor-pointer dark:text-slate-300 focus:ring-4 focus:ring-primary/10 transition-all appearance-none">
                                            <option>Sticky Global Overlay</option>
                                            <option>Interrupt Modal Node</option>
                                            <option>Soft Toast Fragment</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 ml-2">Styling Shard</label>
                                        <select className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 text-xs font-black uppercase tracking-[0.2em] outline-none cursor-pointer dark:text-slate-300 focus:ring-4 focus:ring-primary/10 transition-all appearance-none">
                                            <option>Core Primary (Red)</option>
                                            <option>Urgent Alert (Bright)</option>
                                            <option>Operational (Muted)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* History Section */}
                        <section className="bg-white dark:bg-card-dark rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden group">
                            <div className="p-12 pb-8 flex items-center justify-between">
                                <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight flex items-center gap-6">
                                    <div className="size-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-2xl">history_edu</span>
                                    </div>
                                    Signal History
                                </h3>
                                <button className="text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-3xl">filter_list</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-white/2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 border-b border-slate-100 dark:border-white/5">
                                            <th className="px-12 py-8">Signal Node</th>
                                            <th className="px-12 py-8 text-center">Protocol Status</th>
                                            <th className="px-12 py-8">Audience Shell</th>
                                            <th className="px-12 py-8 text-right">Impact Meta</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {[
                                            { title: 'Platform Upgrade Notice', status: 'Propagated', target: 'Global Mesh', views: '92.4%', clicks: '14.2%' },
                                            { title: 'Mumbai Casting Call', status: 'Scheduled', target: 'Artist Nodes', views: '0.0%', clicks: '0.0%' },
                                            { title: 'Portfolio Guidelines 2026', status: 'Local Buffer', target: 'Verified Cluster', views: '0.0%', clicks: '0.0%' },
                                        ].map((row, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/2 transition-colors group/row">
                                                <td className="px-12 py-10">
                                                    <p className="text-sm font-black dark:text-white uppercase tracking-tight group-hover/row:text-primary transition-colors cursor-pointer">{row.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">SHARD_ID: COMM_{idx}923</p>
                                                </td>
                                                <td className="px-12 py-10 text-center">
                                                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${row.status === 'Propagated' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : row.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="px-12 py-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-80">{row.target}</td>
                                                <td className="px-12 py-10 text-right">
                                                    <div className="inline-flex items-center gap-6">
                                                        <div className="text-right">
                                                            <div className="text-xs font-black dark:text-white tracking-tighter">{row.views}</div>
                                                            <div className="text-[9px] text-slate-400 font-black uppercase opacity-60">Reach</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs font-black dark:text-white tracking-tighter">{row.clicks}</div>
                                                            <div className="text-[9px] text-slate-400 font-black uppercase opacity-60">Interact</div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Audience & Scheduling */}
                    <div className="xl:col-span-4 space-y-12">
                        {/* Audience Targeting */}
                        <section className="bg-white dark:bg-card-dark rounded-[3.5rem] p-12 border border-slate-200 dark:border-border-dark shadow-sm sticky top-8">
                            <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight mb-10 flex items-center gap-6">
                                <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-2xl">track_changes</span>
                                </div>
                                Targeting
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Global Platform Cluster', count: '24.5k', icon: 'hub' },
                                    { label: 'Artist Talent Shards', count: '18.2k', icon: 'mask' },
                                    { label: 'Director Oversight Nodes', count: '2.1k', icon: 'theater_comedy' },
                                    { label: 'Verified Integrity Tier', count: '8.4k', icon: 'verified' }
                                ].map((target, idx) => (
                                    <label key={idx} className="flex items-center gap-5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 cursor-pointer transition-all hover:bg-white dark:hover:bg-white/5 hover:border-primary/30 group relative overflow-hidden">
                                        <input type="radio" name="audience" className="sr-only peer" defaultChecked={idx === 0} />
                                        <div className="size-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                                            <span className="material-symbols-outlined">{target.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-black dark:text-white uppercase tracking-tight mb-1">{target.label}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{target.count} ADDR</p>
                                        </div>
                                        <div className="size-6 rounded-full border-2 border-slate-200 dark:border-white/10 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary/10 transition-all">
                                            <div className="size-2 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <hr className="my-10 border-slate-100 dark:border-white/5" />

                            <div className="space-y-6">
                                <button className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.4em] text-[11px] py-6 rounded-3xl transition-all shadow-2xl shadow-primary/30 active:scale-[0.98] leading-none mb-4">
                                    INITIATE_BROADCAST
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 font-black uppercase tracking-[0.2em] text-[9px] py-4 rounded-2xl transition-all border border-slate-100 dark:border-white/5">
                                        SAVE_BUFFER
                                    </button>
                                    <button className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 font-black uppercase tracking-[0.2em] text-[9px] py-4 rounded-2xl transition-all border border-slate-100 dark:border-white/5">
                                        SIMULATE
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            ` }} />
        </DashboardLayout>
    );
};

export default CommunicationCenter;
