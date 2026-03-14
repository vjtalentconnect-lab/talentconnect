import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('Platform Configuration');

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
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings', active: true },
        { type: 'section', label: 'Saved Searches' },
        { icon: 'history_edu', label: 'Lead Actors (Mumbai)', path: '#', compact: true, rightIcon: 'settings' },
        { icon: 'history_edu', label: 'High Budget Sci-Fi', path: '#', compact: true, rightIcon: 'settings' },
    ];

    const userData = {
        name: 'Rajesh Kumar',
        roleTitle: 'Super Admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPx8UySd9sVgJf1rqVx-6QNT6YCZ5DdCnYXNoa4EufrCe6nwNsI6VEID6GOiIF0dN7_DUtYfEu07H-F-k1pZqte5NO2eFFVMtDRLY0MJS8bc2IxuXijBwSsE4lT_yEDsHUf0GnOoYSYPy3ObtR5gw5J_bNXK0niFOWLKhj6dI_QmOgfuCOUi7znQ7DMrio6m2vfm2yKOnfVp5dwgww4OKrACL8c4OdInmvtG8Mm__na8NQoQzGPFvjNBFQO5KksnTIc4FUXG-QEoPS'
    };

    const tabs = [
        'Platform Configuration',
        'Security & Auth',
        'RBAC',
        'Logs & Audit',
        'Email Templates'
    ];

    const auditLogs = [
        { id: 1, timestamp: '2023-10-24 14:22:01', action: 'Changed API Config', admin: 'rajesh.kumar', status: 'Success' },
        { id: 2, timestamp: '2023-10-24 13:10:45', action: 'Deleted Test Profile', admin: 'rajesh.kumar', status: 'Success' },
        { id: 3, timestamp: '2023-10-24 12:05:12', action: 'Failed Login Attempt', admin: 'System', status: 'Alert' }
    ];

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="System Settings"
            headerSubtitle="Global platform configuration for TalentConnect"
            headerActions={
                <button className="bg-primary hover:bg-primary/90 text-white text-[10px] font-black px-6 py-3 rounded-xl transition-all shadow-xl shadow-primary/20 uppercase tracking-widest">
                    Save Changes
                </button>
            }
        >
            <div className="max-w-5xl mx-auto space-y-12 py-6 pb-20">
                {/* Section: Tabs */}
                <div className="flex border-b border-slate-200 dark:border-white/5 gap-10 overflow-x-auto pb-px custom-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-5 px-1 text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'Platform Configuration' && (
                    <div className="space-y-12">
                        {/* Maintenance Mode */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div>
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">Maintenance & Status</h3>
                                <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">Control the global availability of the TalentConnect platform and toggle experimental features.</p>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm group hover:border-primary/20 transition-all">
                                    <div>
                                        <h4 className="text-sm font-black dark:text-white uppercase tracking-tight">Global Maintenance Mode</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Directs all users to a maintenance screen while allowing admin access.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input className="sr-only peer" type="checkbox" value="" />
                                        <div className="w-12 h-6 bg-slate-200 dark:bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white dark:after:bg-slate-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                                    <h4 className="text-sm font-black dark:text-white uppercase tracking-tight mb-8 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-xl">flag</span>
                                        Active Feature Flags
                                    </h4>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'AI Casting Recommendations', checked: true },
                                            { label: 'Real-time Audition Feedback', checked: false },
                                            { label: 'New Talent Dashboard UI (Beta)', checked: true }
                                        ].map((flag, idx) => (
                                            <div key={idx} className="flex items-center justify-between group">
                                                <span className="text-[11px] font-black text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white uppercase tracking-widest transition-colors">{flag.label}</span>
                                                <label className="relative inline-flex items-center cursor-pointer scale-90">
                                                    <input defaultChecked={flag.checked} className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-12 h-6 bg-slate-200 dark:bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-slate-100 dark:border-white/5" />

                        {/* Security */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div>
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">Security & Auth</h3>
                                <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">Manage API keys, enforce two-factor authentication, and set session policies.</p>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="text-sm font-black dark:text-white uppercase tracking-tight">Production API Keys</h4>
                                        <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all">
                                            <span className="material-symbols-outlined text-sm">add</span> GENERATE KEY
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            'sk_live_51M0L9SA9eR8X9',
                                            'sk_test_48J2K1L9P0Q2X'
                                        ].map((key, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 group">
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">key</span>
                                                <input className="bg-transparent border-none text-[10px] flex-1 focus:ring-0 font-black text-slate-500 dark:text-slate-400 font-mono" readOnly type="text" value={key} />
                                                <button className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors text-lg p-2 hover:bg-primary/10 rounded-xl">content_copy</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                            <span className="material-symbols-outlined text-2xl">verified_user</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black dark:text-white uppercase tracking-tight">Enforce 2FA for Admins</h4>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Require all administrative accounts to use multi-factor authentication.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                        <div className="w-12 h-6 bg-slate-200 dark:bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        <hr className="border-slate-100 dark:border-white/5" />

                        {/* Audit Logs */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div>
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">Audit & Logging</h3>
                                <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">Review recent administrative actions and system events.</p>
                                <button className="mt-6 text-[10px] font-black text-primary flex items-center gap-2 group uppercase tracking-[0.2em]">
                                    VIEW ALL LOGS <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
                                </button>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 dark:border-white/5">
                                                <th className="px-6 py-5">Timestamp</th>
                                                <th className="px-6 py-5">Action</th>
                                                <th className="px-6 py-5 text-center">Admin</th>
                                                <th className="px-6 py-5 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                            {auditLogs.map(log => (
                                                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.timestamp}</td>
                                                    <td className="px-6 py-4 text-[11px] font-black dark:text-white uppercase tracking-widest">{log.action}</td>
                                                    <td className="px-6 py-4 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">{log.admin}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                <div className="flex justify-end gap-4 pt-10 border-t border-slate-100 dark:border-white/5 mb-10">
                    <button className="px-8 py-4 rounded-2xl text-slate-400 dark:text-slate-500 font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all">Cancel Changes</button>
                    <button className="px-10 py-4 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95">Save All Settings</button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminSettings;
