import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getAdminStats } from '../services/adminService';

const AdminRBAC = () => {
    const [activeRole, setActiveRole] = useState('Talent Manager');
    const [adminProfile, setAdminProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

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
                console.error('Error fetching RBAC context:', err);
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
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac', active: true },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: adminProfile?.fullName || 'Admin',
        roleTitle: 'Super Admin',
        avatar: adminProfile?.profilePicture && adminProfile.profilePicture !== 'no-photo.jpg' 
            ? adminProfile.profilePicture 
            : `https://ui-avatars.com/api/?name=${adminProfile?.fullName || 'Admin'}&background=ee2b3b&color=fff`
    };

    const roles = [
        { id: 'tm', label: 'Talent Manager', icon: 'psychology' },
        { id: 'fa', label: 'Financial Auditor', icon: 'account_balance' },
        { id: 'pm', label: 'Project Moderator', icon: 'gavel' },
        { id: 'ss', label: 'Support Staff', icon: 'support_agent' }
    ];

    const permissionCategories = [
        {
            title: 'Talent & User Management',
            icon: 'person_search',
            permissions: [
                { id: 'verify_talent', label: 'Verify Talent Profiles', desc: 'Allow role to approve or reject new talent applications.', checked: true },
                { id: 'edit_profile', label: 'Edit Profile Details', desc: 'Ability to modify sensitive talent information and bio.', checked: true },
                { id: 'delete_user', label: 'Delete User Accounts', desc: 'Permanent removal of talent or client records from database.', checked: false }
            ]
        },
        {
            title: 'Content & Projects',
            icon: 'movie_edit',
            permissions: [
                { id: 'manage_auditions', label: 'Manage Auditions', desc: 'Create, edit, and close project casting calls.', checked: true },
                { id: 'bulk_upload', label: 'Bulk Media Upload', desc: 'Access to high-speed asset management tools.', checked: false }
            ]
        }
    ];

    const auditLogs = [
        { title: 'Permissions Updated', desc: 'Security protocol adjusted for ' + activeRole, time: 'Recently', type: 'update' },
        { title: 'Policy Governance', desc: 'System-wide validation of ' + activeRole + ' credentials.', time: 'Synced', type: 'system' }
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-dark">
            <div className="size-20 relative">
                <div className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-3xl animate-pulse">policy</span>
            </div>
            <p className="mt-8 text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Authorizing Mesh Permissions...</p>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Access Control"
            userData={userData}
            headerTitle="Governance Policy"
            headerSubtitle={`Configuring authorization mesh for ${activeRole}`}
            headerActions={
                <div className="flex gap-2 sm:gap-4">
                    <button className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-2xl bg-slate-100 dark:bg-card-dark/5 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-card-dark/10 transition-all">
                        <span className="material-symbols-outlined text-sm">history</span>
                        <span className="hidden sm:inline">Audit Log</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95 leading-none">
                        <span className="material-symbols-outlined text-sm">save</span>
                        <span className="hidden sm:inline">Save Protocol</span>
                    </button>
                </div>
            }
            searchPlaceholder="Search permissions or roles..."
        >
            <div className="max-w-full lg:max-w-6xl mx-auto py-4 lg:py-8 px-3 sm:px-4 lg:px-4 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                {/* Role Tabs */}
                <div className="flex border-b border-slate-200 dark:border-card-dark/5 gap-4 lg:gap-10 overflow-x-auto pb-px custom-scrollbar mb-6 lg:mb-8">
                    {roles.map(role => (
                        <button
                            key={role.id}
                            onClick={() => setActiveRole(role.label)}
                            className={`flex items-center gap-2 lg:gap-3 pb-5 px-1 text-[10px] lg:text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 relative ${activeRole === role.label
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                        >
                            <span className="material-symbols-outlined text-base lg:text-lg">{role.icon}</span>
                            <span className="hidden sm:inline">{role.label}</span>
                            {activeRole === role.label && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full shadow-[0_-2px_8px_rgba(238,43,59,0.4)]"></div>}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                    <div className="lg:col-span-2 space-y-6 lg:space-y-10">
                        {permissionCategories.map((category, catIdx) => (
                            <div key={catIdx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="bg-slate-50 dark:bg-card-dark/2 px-4 sm:px-8 lg:px-10 py-6 lg:py-8 border-b border-slate-100 dark:border-card-dark/5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                        <div className="size-10 sm:size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                            <span className="material-symbols-outlined text-lg">{category.icon}</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{category.title}</h3>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 px-3 py-2 bg-slate-100 dark:bg-card-dark/5 rounded-xl uppercase tracking-widest whitespace-nowrap">{category.permissions.length} Nodes</span>
                                </div>
                                <div className="divide-y divide-slate-50 dark:divide-card-dark/5">
                                    {category.permissions.map((perm, permIdx) => (
                                        <div key={permIdx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 lg:p-10 hover:bg-slate-50/50 dark:hover:bg-card-dark/2 transition-colors gap-4">
                                            <div className="flex flex-col gap-2 min-w-0 flex-1">
                                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{perm.label}</p>
                                                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">{perm.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input defaultChecked={perm.checked} className="sr-only peer" type="checkbox" />
                                                <div className="w-14 h-7 bg-slate-200 dark:bg-card-dark/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white dark:after:bg-slate-400 after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 lg:space-y-10">
                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-[2.5rem] p-4 sm:p-6 lg:p-10 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <h4 className="text-base sm:text-lg text-slate-900 dark:text-white font-black uppercase tracking-tight mb-6 lg:mb-10 flex items-center gap-3">
                               <span className="material-symbols-outlined text-primary text-lg">data_usage</span>
                               Protocol Summary
                            </h4>
                            <div className="space-y-6 lg:space-y-8">
                                <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-card-dark/5">
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Linked Entities</span>
                                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase">12 Nodes</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-card-dark/5">
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Access Quotient</span>
                                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase">24 / 48</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Criticality</span>
                                    <span className="flex items-center gap-2 text-[11px] font-black text-orange-500 uppercase">
                                        <span className="material-symbols-outlined text-sm">security</span>
                                        Tier 2
                                    </span>
                                </div>
                            </div>
                            <button className="w-full mt-8 lg:mt-10 py-3 lg:py-4 rounded-3xl border border-slate-100 dark:border-card-dark/5 text-slate-500 dark:text-slate-400 text-[10px] font-black hover:bg-slate-50 dark:hover:bg-card-dark/5 transition-all uppercase tracking-[0.3em]">
                                Reset Policy Node
                            </button>
                        </section>

                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-[2.5rem] p-4 sm:p-6 lg:p-10 shadow-sm">
                            <div className="flex items-center justify-between mb-6 lg:mb-10">
                                <h4 className="text-base sm:text-lg text-slate-900 dark:text-white font-black uppercase tracking-tight">Governance Log</h4>
                                <button className="text-[9px] font-black text-primary uppercase tracking-[0.3em] hover:underline">Stream</button>
                            </div>
                            <div className="space-y-6 lg:space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100 dark:before:bg-card-dark/5">
                                {auditLogs.map((log, idx) => (
                                    <div key={idx} className="relative pl-8 lg:pl-10 group">
                                        <div className={`absolute left-0 top-0 size-6 rounded-full border-4 border-white dark:border-card-dark flex items-center justify-center z-10 transition-all ${log.type === 'update' ? 'bg-primary/20 scale-110' : 'bg-slate-200 dark:bg-card-dark/10'}`}>
                                            <div className={`size-1.5 rounded-full ${log.type === 'update' ? 'bg-primary' : 'bg-slate-400'}`}></div>
                                        </div>
                                        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{log.title}</p>
                                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">{log.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="bg-slate-900 rounded-[2.5rem] p-4 sm:p-6 lg:p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
                            <div className="absolute -right-10 -bottom-10 size-48 bg-primary/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                            <div className="relative z-10">
                                <div className="flex gap-4 lg:gap-6">
                                    <span className="material-symbols-outlined text-3xl lg:text-4xl text-primary animate-pulse flex-shrink-0">shield_locked</span>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-tight mb-2">Security Doctrine</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-2 leading-relaxed uppercase tracking-[0.15em]">Ensure 'Zero-Trust' propagation across all administrative mesh clusters.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminRBAC;
