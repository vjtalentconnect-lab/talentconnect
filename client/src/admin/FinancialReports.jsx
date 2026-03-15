import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getAdminStats } from '../services/adminService';

const FinancialReports = () => {
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
                console.error('Error fetching Financial context:', err);
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
        { icon: 'payments', label: 'Financials', path: '/admin/financials', active: true },
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

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-dark">
            <div className="size-20 relative">
                <div className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-3xl animate-pulse">payments</span>
            </div>
            <p className="mt-8 text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Auditing Ledger Shards...</p>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="Financial Ledger"
            headerSubtitle="Comprehensive revenue & transaction node analysis"
            headerActions={
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                        Tax Summary
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95 leading-none">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export Shard
                    </button>
                </div>
            }
            searchPlaceholder="Search transactions, IDs..."
        >
            <div className="max-w-7xl mx-auto py-8 lg:px-4 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: 'Platform Revenue', value: '₹45,80,000', trend: '12.5%', trendDir: 'up', subtext: 'vs previous node' },
                        { label: 'Recurring Mesh', value: '₹12,40,000', trend: '8.2%', trendDir: 'up', subtext: 'active nodes' },
                        { label: 'Payout Buffer', value: '₹8,20,000', trend: '5.4%', trendDir: 'up', subtext: 'processed cycle' },
                        { label: 'Net Liquidity', value: '₹37,60,000', trend: '2.1%', trendDir: 'down', subtext: 'post-commission' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-white dark:bg-card-dark p-10 rounded-[2.5rem] border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                           <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{kpi.label}</span>
                                <span className={`px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 ${kpi.trendDir === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                                    <span className="material-symbols-outlined text-sm">{kpi.trendDir === 'up' ? 'trending_up' : 'trending_down'}</span> {kpi.trend}
                                </span>
                            </div>
                            <div className="text-4xl font-black dark:text-white mb-4 tracking-tighter">{kpi.value}</div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.subtext}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-card-dark p-12 rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 size-64 bg-primary/2 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
                        <div>
                            <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">Revenue Propagation</h3>
                            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.3em]">Temporal performance mesh across fiscal zones</p>
                        </div>
                        <div className="flex gap-4">
                            <select className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest px-6 py-3 outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer dark:text-white">
                                <option>12 Month Cycle</option>
                                <option>6 Month Cycle</option>
                                <option>Current Node</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[340px] w-full relative group/chart">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#ee2b3b" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#ee2b3b" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0 250 Q120 220 250 260 T500 180 T750 240 T1000 150 V300 H0 Z" fill="url(#chartGradient)" className="group-hover/chart:opacity-50 transition-opacity" />
                            <path d="M0 250 Q120 220 250 260 T500 180 T750 240 T1000 150" fill="none" stroke="#ee2b3b" strokeLinecap="round" strokeWidth="6" strokeDasharray="1000" strokeDashoffset="1000" className="animate-[dash_3s_ease-out_forwards]" />
                            {[250, 500, 750].map((cx, i) => (
                                <circle key={i} cx={cx} cy={[260, 180, 240][i]} fill="#ee2b3b" r="8" stroke="white" strokeWidth="3" className="hover:scale-150 transition-transform cursor-pointer" />
                            ))}
                        </svg>
                        <div className="absolute bottom-4 left-0 w-full flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] px-4 opacity-60">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-card-dark rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden group">
                    <div className="p-12 border-b border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/50 dark:bg-black/20">
                        <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">Ledger Operations</h3>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group/btn">
                                <span className="material-symbols-outlined text-sm group-hover/btn:rotate-180 transition-transform">tune</span>
                                Filter Node
                            </button>
                            <button className="flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined text-sm">event_repeat</span>
                                Calendar Sync
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-white/2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 border-b border-slate-100 dark:border-white/5">
                                    <th className="px-12 py-8">Temporal Node</th>
                                    <th className="px-12 py-8">Entity Cluster</th>
                                    <th className="px-12 py-8">Transaction ID</th>
                                    <th className="px-12 py-8 text-right">Value Delta</th>
                                    <th className="px-12 py-8">Classification</th>
                                    <th className="px-12 py-8">Integrity</th>
                                    <th className="px-12 py-8"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                {[
                                    { date: 'May 12, 2024', user: 'Aryan Kapoor', role: 'Director', initial: 'AK', txn: 'TXN-SH-90231', amount: '₹45,000', type: 'Commission', status: 'Verified' },
                                    { date: 'May 11, 2024', user: 'Sanya Malhotra', role: 'Artist', initial: 'SM', txn: 'TXN-SH-88421', amount: '₹12,500', type: 'Subscription', status: 'Verified' },
                                    { date: 'May 10, 2024', user: 'Rahul Deshmukh', role: 'Artist', initial: 'RD', txn: 'TXN-SH-76512', amount: '₹24,000', type: 'Commission', status: 'Buffer' },
                                    { date: 'May 09, 2024', user: 'Vikram Jaiswal', role: 'Director', initial: 'VJ', txn: 'TXN-SH-65109', amount: '₹15,000', type: 'Subscription', status: 'Verified' }
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/2 transition-colors group">
                                        <td className="px-12 py-10 text-xs font-black dark:text-white uppercase tracking-tight">{row.date}</td>
                                        <td className="px-12 py-10">
                                            <div className="flex items-center gap-5">
                                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-[11px] font-black uppercase tracking-widest border border-primary/5">{row.initial}</div>
                                                <div>
                                                    <div className="text-sm font-black dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">{row.user}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">{row.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-12 py-10 text-[11px] font-mono text-slate-500 font-bold tracking-widest">{row.txn}</td>
                                        <td className="px-12 py-10 text-lg font-black text-right dark:text-white tracking-tighter">{row.amount}</td>
                                        <td className="px-12 py-10">
                                            <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-xl border tracking-[0.2em] ${row.type === 'Commission' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'}`}>
                                                {row.type}
                                            </span>
                                        </td>
                                        <td className="px-12 py-10">
                                            <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] ${row.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                <div className={`size-2 rounded-full bg-current ${row.status === 'Buffer' ? 'animate-pulse' : ''}`}></div> {row.status}
                                            </div>
                                        </td>
                                        <td className="px-12 py-10 text-right">
                                            <button className="size-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-95">
                                                <span className="material-symbols-outlined text-xl">segment</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-10 border-t border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-black/20">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-60">Displaying Temporal Fragments • Page 1 of 32</span>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-30 active:scale-95" disabled>Back</button>
                            <button className="px-6 py-3 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm active:scale-95">Forward</button>
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes dash {
                    to { stroke-dashoffset: 0; }
                }
            ` }} />
        </DashboardLayout>
    );
};

export default FinancialReports;
