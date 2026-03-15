import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getAdminStats } from '../services/adminService';

const AdminSettings = () => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Core Configuration');

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
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings', active: true },
    ];

    const userData = {
        name: adminProfile?.fullName || 'Admin',
        roleTitle: 'Super Admin',
        avatar: adminProfile?.profilePicture && adminProfile.profilePicture !== 'no-photo.jpg' 
            ? adminProfile.profilePicture 
            : `https://ui-avatars.com/api/?name=${adminProfile?.fullName || 'Admin'}&background=ee2b3b&color=fff`
    };

    const tabs = [
        { id: 'Core Configuration', icon: 'settings_input_component' },
        { id: 'Security Parameters', icon: 'shield_lock' },
        { id: 'Mesh Protocols', icon: 'hub' },
        { id: 'Audit Nexus', icon: 'receipt_long' },
        { id: 'Template Shards', icon: 'description' }
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-dark">
            <div className="size-24 relative">
                <div className="absolute inset-0 border-[6px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-[6px] border-primary/10 border-b-primary rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-4xl animate-pulse">settings</span>
            </div>
            <p className="mt-10 text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Calibrating Mesh Core...</p>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="Mesh Configuration"
            headerSubtitle="Global platform protocols and environmental shards"
            headerActions={
                <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-sm">save</span>
                    Persist Grid
                </button>
            }
        >
            <div className="max-w-7xl mx-auto py-8 lg:px-4 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
                {/* Section: Advanced Tabs */}
                <div className="flex p-2 bg-slate-100 dark:bg-white/5 rounded-[2rem] gap-2 overflow-x-auto scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            {tab.id}
                        </button>
                    ))}
                </div>

                {activeTab === 'Core Configuration' && (
                    <div className="space-y-12">
                        {/* Maintenance Mode */}
                        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-4">
                                <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">System State</h3>
                                <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-widest leading-loose">Control the global availability of the infrastructure mesh and toggle experimental shards.</p>
                            </div>
                            <div className="lg:col-span-8 space-y-6">
                                <div className="bg-white dark:bg-card-dark p-10 rounded-[3rem] border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm group hover:border-primary/40 transition-all relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex items-center gap-8">
                                        <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                                            <span className="material-symbols-outlined text-3xl">construction</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black dark:text-white uppercase tracking-tight">Global Maintenance Shard</h4>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Intercept normal traffic with administrative override nodes.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input className="sr-only peer" type="checkbox" />
                                        <div className="w-16 h-8 bg-slate-200 dark:bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                                    </label>
                                </div>

                                <div className="bg-white dark:bg-card-dark p-12 rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-sm">
                                    <h4 className="text-lg font-black dark:text-white uppercase tracking-tight mb-10 flex items-center gap-4">
                                        <div className="size-2 bg-primary rounded-full animate-pulse"></div>
                                        Experimental Feature Shards
                                    </h4>
                                    <div className="space-y-8">
                                        {[
                                            { label: 'Neural Casting Analytics', desc: 'Predictive talent matching algorithms', checked: true },
                                            { label: 'Real-time Telemetry Feedback', desc: 'Instant audition stream analytics', checked: false },
                                            { label: 'Project Mesh v3 Interface', desc: 'Next-gen fluid oversight dashboard', checked: true }
                                        ].map((flag, idx) => (
                                            <div key={idx} className="flex items-center justify-between group">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest group-hover:text-primary transition-colors">{flag.label}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">{flag.desc}</span>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer scale-90">
                                                    <input defaultChecked={flag.checked} className="sr-only peer" type="checkbox" />
                                                    <div className="w-14 h-7 bg-slate-200 dark:bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-slate-100 dark:border-white/5" />

                        {/* Security */}
                        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-4">
                                <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">Access Control</h3>
                                <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-widest leading-loose">Automated encryption shards, key rotation, and administrative authentication protocols.</p>
                            </div>
                            <div className="lg:col-span-8 space-y-6">
                                <div className="bg-white dark:bg-card-dark p-12 rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-sm relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 size-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                                    <div className="flex items-center justify-between mb-12">
                                        <h4 className="text-lg font-black dark:text-white uppercase tracking-tight">Active API Shards</h4>
                                        <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-3 px-6 py-2.5 bg-primary/10 rounded-2xl hover:bg-primary/20 transition-all border border-primary/5">
                                            <span className="material-symbols-outlined text-lg">add_box</span> ROTATE KEYS
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { key: 'sk_mesh_live_9x8z7y...6a5b', type: 'Production' },
                                            { key: 'sk_mesh_test_4p3o2i...1m0n', type: 'Sandbox' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-white/2 rounded-3xl border border-slate-100 dark:border-white/5 group/key hover:border-primary/30 transition-all">
                                                <div className="size-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/key:text-primary transition-colors shadow-sm">
                                                    <span className="material-symbols-outlined text-xl">vpn_key</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.type} NODE</div>
                                                    <input className="bg-transparent border-none p-0 text-[11px] w-full focus:ring-0 font-black dark:text-white font-mono tracking-tighter" readOnly type="text" value={item.key} />
                                                </div>
                                                <button className="size-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-lg">content_copy</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                <div className="flex justify-end gap-6 pt-12 border-t border-slate-200 dark:border-white/5 animate-pulse-slow">
                    <button className="px-10 py-5 rounded-[2rem] text-slate-400 dark:text-slate-500 font-extrabold text-[11px] uppercase tracking-[0.3em] hover:bg-slate-100 dark:hover:bg-white/5 transition-all">Discard Buffer</button>
                    <button className="px-14 py-5 rounded-[2rem] bg-primary text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all active:scale-[0.98] leading-none">Force Nexus Update</button>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            ` }} />
        </DashboardLayout>
    );
};

export default AdminSettings;
