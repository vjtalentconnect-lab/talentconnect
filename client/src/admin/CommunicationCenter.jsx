import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const CommunicationCenter = () => {
    const [activeTab, setActiveTab] = useState('Announcements');

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: '12' },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication', active: true },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: 'Rahul Sharma',
        roleTitle: 'Super Admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPx8UySd9sVgJf1rqVx-6QNT6YCZ5DdCnYXNoa4EufrCe6nwNsI6VEID6GOiIF0dN7_DUtYfEu07H-F-k1pZqte5NO2eFFVMtDRLY0MJS8bc2IxuXijBwSsE4lT_yEDsHUf0GnOoYSYPy3ObtR5gw5J_bNXK0niFOWLKhj6dI_QmOgfuCOUi7znQ7DMrio6m2vfm2yKOnfVp5dwgww4OKrACL8c4OdInmvtG8Mm__na8NQoQzGPFvjNBFQO5KksnTIc4FUXG-QEoPS'
    };

    const headerActions = (
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-primary/20">
            <span className="material-symbols-outlined text-sm">add</span>
            New Announcement
        </button>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="Communication Center"
            headerSubtitle="Management Console for platform broadcasts"
            headerActions={headerActions}
            searchPlaceholder="Search messages or logs..."
        >
            <div className="space-y-8">
                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-white/5 gap-10">
                    {['Announcements', 'System Notifications', 'Email Blasts'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full shadow-[0_-2px_8px_rgba(238,43,59,0.4)]"></div>}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left/Main Column: Composer and History */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Composer Section */}
                        <section className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                            <h3 className="text-lg font-black dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">edit_note</span>
                                </div>
                                Announcement Composer
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Announcement Title</label>
                                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-bold p-4 outline-none dark:text-white" placeholder="e.g. New Audition Opportunity for Directing" type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Message Body</label>
                                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-inner">
                                        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/10 px-4 py-2 bg-slate-100/50 dark:bg-white/5">
                                            {['format_bold', 'format_italic', 'format_list_bulleted', 'format_list_numbered'].map((icon, idx) => (
                                                <button key={idx} className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-xl text-slate-500 dark:text-slate-400 transition-all">
                                                    <span className="material-symbols-outlined text-lg">{icon}</span>
                                                </button>
                                            ))}
                                            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>
                                            {['link', 'image', 'attachment'].map((icon, idx) => (
                                                <button key={idx} className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-xl text-slate-500 dark:text-slate-400 transition-all">
                                                    <span className="material-symbols-outlined text-lg">{icon}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <textarea className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold p-6 resize-none dark:text-slate-300 min-h-[200px]" placeholder="Write your message here..." rows="6"></textarea>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Display Mode</label>
                                        <select className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 text-xs font-black uppercase tracking-widest p-4 outline-none cursor-pointer dark:text-slate-300">
                                            <option>Sticky Top Banner</option>
                                            <option>Center Pop-up (Modal)</option>
                                            <option>Bottom Toast Notification</option>
                                            <option>Dashboard Widget</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Banner Style</label>
                                        <select className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 text-xs font-black uppercase tracking-widest p-4 outline-none cursor-pointer dark:text-slate-300">
                                            <option>Standard (Red/White)</option>
                                            <option>Urgent (Bright Orange)</option>
                                            <option>Success (Deep Green)</option>
                                            <option>Informative (Muted Blue)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Performance & History Section */}
                        <section className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-200 dark:border-white/5">
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight flex items-center gap-3">
                                    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">history</span>
                                    </div>
                                    Message History
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 dark:border-white/5">
                                            <th className="px-8 py-5">Title</th>
                                            <th className="px-8 py-5 text-center">Status</th>
                                            <th className="px-8 py-5">Target</th>
                                            <th className="px-8 py-5">Sent On</th>
                                            <th className="px-8 py-5 text-right">Engagement</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {[
                                            { title: 'Platform Upgrade Notice', status: 'Sent', target: 'All Users', date: 'Oct 24, 2023', views: '92%', clicks: '14%' },
                                            { title: 'Mumbai Casting Call: Web Series', status: 'Scheduled', target: 'Artists Only', date: 'Nov 01, 2023', views: '—', clicks: '—' },
                                            { title: 'Portfolio Guidelines 2026', status: 'Draft', target: 'Verified Users', date: '—', views: '—', clicks: '—' },
                                        ].map((row, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-black dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors cursor-pointer">{row.title}</p>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${row.status === 'Sent' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : row.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.target}</td>
                                                <td className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.date}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="inline-flex items-center gap-4">
                                                        <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500">
                                                            <span className="material-symbols-outlined text-sm opacity-60">visibility</span> {row.views}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500">
                                                            <span className="material-symbols-outlined text-sm opacity-60">ads_click</span> {row.clicks}
                                                        </span>
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
                    <div className="space-y-8">
                        {/* Audience Targeting */}
                        <section className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm sticky top-8">
                            <h3 className="text-lg font-black dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">target</span>
                                </div>
                                Audience
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'All Platform Users', count: '24,500', icon: 'groups' },
                                    { label: 'Artists & Talents', count: '18,200', icon: 'person' },
                                    { label: 'Directors & Producers', count: '2,100', icon: 'movie' },
                                    { label: 'Verified Users Only', count: '8,400', icon: 'verified' }
                                ].map((target, idx) => (
                                    <label key={idx} className="flex items-center gap-4 p-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/2 cursor-pointer transition-all hover:bg-primary/5 hover:border-primary/20 group relative overflow-hidden">
                                        <input type="radio" name="audience" className="sr-only peer" defaultChecked={idx === 0} />
                                        <div className="absolute inset-y-0 left-0 w-1 bg-primary scale-y-0 peer-checked:scale-y-100 transition-transform"></div>
                                        <div className="size-10 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                                            <span className="material-symbols-outlined">{target.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-black dark:text-white uppercase tracking-tight mb-0.5">{target.label}</p>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{target.count} People</p>
                                        </div>
                                        <div className="size-6 rounded-full border-2 border-slate-200 dark:border-white/10 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary/10 transition-all">
                                            <div className="size-2 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <hr className="my-8 border-slate-100 dark:border-white/5" />

                            <h3 className="text-lg font-black dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                Schedule
                            </h3>
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
                                        <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-4 pl-12 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer dark:text-white" type="date" />
                                    </div>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">schedule</span>
                                        <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-4 pl-12 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer dark:text-white" type="time" />
                                    </div>
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="size-5 rounded-lg border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-primary focus:ring-primary/20 transition-all cursor-pointer" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">Send immediately</span>
                                </label>
                            </div>

                            <div className="space-y-3 mt-10">
                                <button className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-[11px] py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
                                    Publish
                                </button>
                                <button className="w-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-2xl transition-all border border-slate-100 dark:border-white/5">
                                    Save Draft
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-primary py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all group">
                                    <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">visibility</span>
                                    Preview
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CommunicationCenter;
