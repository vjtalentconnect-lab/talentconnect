import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getAdminStats } from '../services/adminService';

const SystemHealth = () => {
    const [lastSync, setLastSync] = useState(new Date().toLocaleString());
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
                console.error('Error fetching System Health context:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        
        // Simulate live metric updates
        const interval = setInterval(() => {
            setLastSync(new Date().toLocaleString());
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: stats?.pendingVerifications?.toString() },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health', active: true },
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

    const metrics = [
        { label: 'Cluster Load', value: '42.8%', trend: '+2%', trendDir: 'up', icon: 'memory', color: 'blue' },
        { label: 'DB Latency', value: '14ms', trend: '-1ms', trendDir: 'down', icon: 'speed', color: 'amber' },
        { label: 'API Integrity', value: '99.98%', status: 'STABLE', icon: 'check_circle', color: 'emerald' },
        { label: 'Storage Mesh', value: '68.2%', trend: '+5%', trendDir: 'up', icon: 'storage', color: 'purple', path: '/admin/storage' }
    ];

    const regions = [
        { name: 'Maharashtra Zone 1', status: 'Optimal', color: 'emerald' },
        { name: 'Karnataka Zone A', status: 'Optimal', color: 'emerald' },
        { name: 'Delhi NCR Edge', status: 'Elevated Load', color: 'amber' }
    ];

    const services = [
        { name: 'Auth Mesh', availability: '100%', status: 'Healthy', version: 'v4.2.1-stable', shard: 'shard-01' },
        { name: 'Comms Gateway', availability: '94.2%', status: 'Warning', version: 'v2.8.9-hotfix', shard: 'shard-ap-south', subtext: 'Latency Buffer' },
        { name: 'Payment Vault', availability: '99.9%', status: 'Healthy', version: 'v1.12.0', shard: 'secure-node' },
        { name: 'Matrix CDN', availability: '12.4TB', status: 'Optimal', version: 'Edge v6.1', shard: 'Throughput' }
    ];

    const incidents = [
        { time: 'T-Minus 12m', component: 'Auth-Node-3', event: 'Throughput throttle on /v1/login', severity: 'WARNING' },
        { time: 'T-Minus 24m', component: 'Master Database', event: 'Relica synchronization lag > 500ms', severity: 'CRITICAL' },
        { time: 'T-Minus 1h', component: 'Redis Cluster', event: 'Key eviction spike in Region A', severity: 'INFO' }
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-dark">
            <div className="size-20 relative">
                <div className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-3xl animate-pulse">vital_signs</span>
            </div>
            <p className="mt-8 text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing Infrastructure Mesh...</p>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Ops Console"
            userData={userData}
            headerTitle="Mesh Diagnostics"
            headerSubtitle="Real-time telemetry for TalentConnect infrastructure"
            headerActions={
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-card-dark/5 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                        <span className="material-symbols-outlined text-sm">terminal</span>
                        Live Console
                    </button>
                    <button
                        onClick={() => setLastSync(new Date().toLocaleString())}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-sm">refresh_glow</span>
                        Refresh Shards
                    </button>
                </div>
            }
            searchPlaceholder="Search telemetry logs..."
        >
            <div className="max-w-7xl mx-auto py-8 lg:px-4 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => metric.path && (window.location.href = metric.path)}
                            className={`bg-white dark:bg-card-dark p-10 rounded-[2.5rem] border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${metric.path ? 'cursor-pointer hover:border-primary/50' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">{metric.icon}</span>
                                </div>
                                {metric.trend ? (
                                    <span className={`text-[10px] font-black px-4 py-2 rounded-xl ${metric.trendDir === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                                        {metric.trend}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-white dark:bg-card-dark/5 px-4 py-2 rounded-xl uppercase tracking-widest">
                                        {metric.status}
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{metric.label}</p>
                            <p className="text-3xl font-black dark:text-white mt-4 tracking-tighter">{metric.value}</p>
                            {metric.path && (
                                <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-[3rem] p-12 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-16 relative z-10">
                            <div>
                                <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">Cluster Propagation</h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Live resource allocation across distributed nodes</p>
                            </div>
                            <div className="px-6 py-3 bg-slate-50 dark:bg-white dark:bg-card-dark/5 rounded-2xl text-[10px] font-black dark:text-white uppercase tracking-widest border border-slate-100 dark:border-white/5">
                                Last Sync: {lastSync.split(',')[1]}
                            </div>
                        </div>

                        <div className="h-[340px] w-full relative flex items-end gap-4 pb-10 px-4 z-10">
                            {[40, 55, 45, 70, 60, 85, 40, 30, 50, 75, 45, 65, 55, 40, 60].map((val, i) => (
                                <div key={i} className="flex-1 bg-primary/5 rounded-full relative group/bar h-full">
                                    <div
                                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/60 to-primary/20 rounded-full group-hover/bar:from-primary group-hover/bar:to-primary/40 transition-all duration-700 shadow-[0_0_20px_rgba(238,43,59,0.1)] group-hover/bar:shadow-[0_0_40px_rgba(238,43,59,0.3)]"
                                        style={{ height: `${val}%` }}
                                    >
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                                            Zone {i+1}: {val}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] px-4 relative z-10 border-t border-slate-50 dark:border-white/5 pt-8">
                            {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map(t => <span key={t}>{t} Cascade</span>)}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-[3rem] p-12 shadow-sm group">
                        <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight mb-12">Zone Integrity</h3>
                        <div className="space-y-12">
                            <div className="relative w-full aspect-square bg-slate-50 dark:bg-black/20 rounded-[3rem] overflow-hidden flex items-center justify-center border border-slate-100 dark:border-white/5">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent group-hover:opacity-30 transition-all duration-1000"></div>
                                <div className="z-10 text-center px-6">
                                    <span className="material-symbols-outlined text-6xl text-primary animate-pulse">radar</span>
                                    <p className="text-[11px] font-black text-slate-400 mt-6 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">Mesh Scanning...</p>
                                </div>
                                <div className="absolute top-1/4 left-1/3 size-4 bg-emerald-500 rounded-full animate-ping shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
                                <div className="absolute top-1/2 left-2/3 size-4 bg-emerald-500 rounded-full animate-ping delay-700 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
                                <div className="absolute bottom-1/3 left-1/4 size-4 bg-amber-500 rounded-full animate-ping delay-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
                            </div>

                            <div className="space-y-8">
                                {regions.map((region, idx) => (
                                    <div key={idx} className="flex items-center justify-between group/item">
                                        <span className="text-xs font-black text-slate-500 group-hover/item:text-slate-900 dark:text-white dark:group-hover/item:text-white uppercase tracking-widest transition-colors">{region.name}</span>
                                        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 ${region.color === 'emerald' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                                            <div className={`size-2 rounded-full bg-current ${region.status.includes('Elevated') ? 'animate-pulse' : ''}`}></div>
                                            {region.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    <h3 className="text-3xl font-black dark:text-white uppercase tracking-tight">Service Mesh Topology</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-[2.5rem] p-10 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden shadow-sm hover:shadow-2xl">
                                <div className="flex items-center justify-between mb-10">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">{service.name}</span>
                                    <div className={`size-3 rounded-full ${service.status === 'Healthy' || service.status === 'Optimal' ? 'bg-emerald-500 border-4 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-amber-500 animate-pulse border-4 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.4)]'}`}></div>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-black dark:text-white tracking-tighter">{service.availability}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.subtext || service.status}</span>
                                </div>
                                <div className="mt-10 pt-8 border-t border-slate-50 dark:border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{service.version}</span>
                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{service.shard}</span>
                                </div>
                                <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:size-32 transition-all"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative">
                    <div className="absolute top-0 right-0 size-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="px-12 py-10 border-b border-white/5 flex items-center justify-between bg-white dark:bg-card-dark/[0.01] relative z-10">
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Active Incident Log</h3>
                            <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-[0.3em]">Hardware & Software integrity reporting cluster</p>
                        </div>
                        <button className="text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 bg-primary/5 px-8 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all">
                            Dump History
                        </button>
                    </div>
                    <div className="overflow-x-auto relative z-10">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white dark:bg-card-dark/5 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                                    <th className="px-12 py-8">Timestamp</th>
                                    <th className="px-12 py-8">Node Path</th>
                                    <th className="px-12 py-8">Event Detail</th>
                                    <th className="px-12 py-8">Severity</th>
                                    <th className="px-12 py-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {incidents.map((incident, idx) => (
                                    <tr key={idx} className="hover:bg-white dark:bg-card-dark/[0.02] transition-colors group">
                                        <td className="px-12 py-8 text-[11px] font-black text-slate-500 tracking-widest">{incident.time}</td>
                                        <td className="px-12 py-8 text-sm font-black text-white uppercase tracking-tight">{incident.component}</td>
                                        <td className="px-12 py-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-loose max-w-sm">{incident.event}</td>
                                        <td className="px-12 py-8">
                                            <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${incident.severity === 'CRITICAL' ? 'bg-primary/10 text-primary border-primary/20 animate-pulse' :
                                                incident.severity === 'WARNING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                }`}>
                                                {incident.severity}
                                            </span>
                                        </td>
                                        <td className="px-12 py-8 text-right">
                                            <button className="bg-white dark:bg-card-dark/5 text-slate-400 hover:text-white text-[9px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-xl hover:bg-primary transition-all group-hover:translate-x-[-8px]">
                                                Inspect Node
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <footer className="pt-24 pb-12 text-center border-t border-slate-100 dark:border-white/5 space-y-4">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">TalentConnect Operations Control • Core Integrity: SECURE</p>
                    <p className="text-[10px] font-bold text-slate-400/40 uppercase tracking-widest">Global Shard: ap-south-1a-mumbai • Node Cluster: V4-OMEGA</p>
                </footer>
            </div>
        </DashboardLayout>
    );
};

export default SystemHealth;
