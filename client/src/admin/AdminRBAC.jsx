import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const AdminRBAC = () => {
    const [activeRole, setActiveRole] = useState('Talent Manager');

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: '12' },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac', active: true },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
        { type: 'section', label: 'Saved Searches' },
        { icon: 'history_edu', label: 'Lead Actors (Mumbai)', path: '#', compact: true, rightIcon: 'settings' },
        { icon: 'history_edu', label: 'High Budget Sci-Fi', path: '#', compact: true, rightIcon: 'settings' },
    ];

    const userData = {
        name: 'Ankit Sharma',
        roleTitle: 'Super Admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqcKiiOzI1LGiPaq7wIJ2S7dkUCYu1JtgiL9uIK0bKfAPIxT4p-loxvhBLo3Y0gfpbwO-D0VT2CriNXdd-7Sqlim0T5DNb4C21mdvrOIyatqABlvOvCaXdI3LZH8UqXpDdTaqC6vCxEB69Yc-TZQlso7GSAkNgp6RurFNVZabpkLqkaI_YaFDGoFIz4vqtshH-ub1G6It-gMTzX8ZpG_MXNFYjBgaee8zTxKOEW9WExdcXxmPffCikTCsaAzd8a9u1VYLD6xWqXlsn'
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
        { title: 'Permissions Updated', desc: 'SuperAdmin (Ankit S.) enabled "Edit Profile Details"', time: 'Today, 10:45 AM', type: 'update' },
        { title: 'Role Renamed', desc: 'System renamed "Manager" to "Talent Manager"', time: 'Oct 12, 09:20 PM', type: 'system' },
        { title: 'Security Patch Applied', desc: 'Global reset of "Delete" permissions across all roles.', time: 'Oct 10, 11:30 AM', type: 'patch' }
    ];

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Access Control"
            userData={userData}
            headerTitle="Role Permissions"
            headerSubtitle="Configure administrative capabilities for platform roles"
            headerActions={
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                        <span className="material-symbols-outlined text-sm">history</span>
                        Audit Log
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95 leading-none">
                        <span className="material-symbols-outlined text-sm">save</span>
                        Save Changes
                    </button>
                </div>
            }
            searchPlaceholder="Search permissions or roles..."
        >
            <div className="max-w-6xl mx-auto py-8 lg:px-4 space-y-12">
                {/* Role Tabs */}
                <div className="flex border-b border-slate-200 dark:border-white/5 gap-10 overflow-x-auto pb-px custom-scrollbar mb-8">
                    {roles.map(role => (
                        <button
                            key={role.id}
                            onClick={() => setActiveRole(role.label)}
                            className={`flex items-center gap-3 pb-5 px-1 text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 relative ${activeRole === role.label
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                        >
                            <span className="material-symbols-outlined text-lg">{role.icon}</span>
                            {role.label}
                            {activeRole === role.label && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full shadow-[0_-2px_8px_rgba(238,43,59,0.4)]"></div>}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Permissions Matrix */}
                    <div className="lg:col-span-2 space-y-10">
                        {permissionCategories.map((category, catIdx) => (
                            <div key={catIdx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="bg-slate-50 dark:bg-white/2 px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">{category.icon}</span>
                                        </div>
                                        <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{category.title}</h3>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg uppercase tracking-widest">{category.permissions.length} Permissions</span>
                                </div>
                                <div className="divide-y divide-slate-50 dark:divide-white/5">
                                    {category.permissions.map((perm, permIdx) => (
                                        <div key={permIdx} className="flex items-center justify-between p-8 hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{perm.label}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{perm.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input defaultChecked={perm.checked} className="sr-only peer" type="checkbox" />
                                                <div className="w-12 h-6 bg-slate-200 dark:bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white dark:after:bg-slate-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Side Details & Audit Log */}
                    <div className="space-y-10">
                        {/* Summary Card */}
                        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm group">
                            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-tight mb-8">Role Overview</h4>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-white/5">
                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Active Users</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white">12 Managers</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-white/5">
                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Total Permissions</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white">24 / 48</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Security Level</span>
                                    <span className="flex items-center gap-1 text-sm font-black text-orange-500">
                                        <span className="material-symbols-outlined text-sm">shield_with_heart</span>
                                        Medium
                                    </span>
                                </div>
                            </div>
                            <button className="w-full mt-10 py-4 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-all uppercase tracking-[0.2em]">
                                Reset to Defaults
                            </button>
                        </div>

                        {/* Audit Log */}
                        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-10">
                                <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-tight">Activity Log</h4>
                                <a className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline" href="#">View All</a>
                            </div>
                            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-white/5">
                                {auditLogs.map((log, idx) => (
                                    <div key={idx} className="relative pl-10 group">
                                        <div className={`absolute left-0 top-0 size-6 rounded-full border-4 border-white dark:border-card-dark flex items-center justify-center z-10 transition-all ${log.type === 'update' ? 'bg-primary/20 scale-110' : 'bg-slate-200 dark:bg-white/10'}`}>
                                            <div className={`size-2 rounded-full ${log.type === 'update' ? 'bg-primary' : 'bg-slate-400'}`}></div>
                                        </div>
                                        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">{log.title}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase leading-relaxed">{log.desc}</p>
                                        <p className="text-[9px] text-slate-400 mt-2 uppercase font-black tracking-widest opacity-60">{log.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Tip */}
                        <div className="bg-gradient-to-br from-primary to-rose-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="relative z-10">
                                <div className="flex gap-5">
                                    <span className="material-symbols-outlined text-4xl opacity-50 shrink-0">lightbulb</span>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-tight">Security Best Practice</p>
                                        <p className="text-[10px] font-bold opacity-80 mt-2 leading-relaxed uppercase tracking-widest">Always follow the principle of 'Least Privilege'. Only grant permissions absolutely necessary for specific administrative tasks.</p>
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
