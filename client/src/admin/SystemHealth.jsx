import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const SystemHealth = () => {
    const [lastSync, setLastSync] = useState(new Date().toLocaleString());

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: '12' },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health', active: true },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: 'Arjun Sharma',
        roleTitle: 'Super Admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB10F-xXJ4DO_1rvz4SwUd_37e1V9VQu73Q1KuxVKJzu3ASThDO06azsxynlLJ8B6NxCVuQfZ_vth7Q4AP9toyMbBXJo4YG0L_nP0_BSrzqqRwQ-gmxg5RmwbqQJxfqTFf5OU8KV3G1zLshnqFS8Qq8fHYQb6GfsycOyeImTsUHMG-rFjTlNzNdX5noByBTNaUfFKAyyNz8dKtNcQJ5ctTjZbws9y09SDbaNaqucdBivY1Pd2fdJqk06zUQxP9NLocibObfKuUPgocH'
    };

    const metrics = [
        { label: 'Server Load', value: '42.8%', trend: '+2%', trendDir: 'up', icon: 'memory', color: 'blue' },
        { label: 'Database Latency', value: '14ms', trend: '-1ms', trendDir: 'down', icon: 'speed', color: 'amber' },
        { label: 'API Uptime', value: '99.98%', status: 'STABLE', icon: 'check_circle', color: 'emerald' },
        { label: 'Storage Usage', value: '68.2%', trend: '+5%', trendDir: 'up', icon: 'storage', color: 'purple' }
    ];

    const regions = [
        { name: 'Maharashtra', status: 'Healthy', color: 'emerald' },
        { name: 'Karnataka', status: 'Healthy', color: 'emerald' },
        { name: 'Delhi NCR', status: 'High Load', color: 'amber' }
    ];

    const services = [
        { name: 'Auth Service', availability: '100%', status: 'Healthy', version: 'v4.2.1-stable', shard: 'shard-01' },
        { name: 'Messaging Gateway', availability: '94.2%', status: 'Warning', version: 'v2.8.9-hotfix', shard: 'shard-ap-south', subtext: 'Latency spike' },
        { name: 'Payment Processor', availability: '99.9%', status: 'Healthy', version: 'v1.12.0', shard: 'secure-gateway' },
        { name: 'Media CDN', availability: '12.4TB', status: 'Healthy', version: 'Global Edge v6.1', shard: 'Throughput' }
    ];

    const incidents = [
        { time: '14:28:10', component: 'Auth-Node-3', event: 'Slow response on /v1/login endpoint', severity: 'WARNING' },
        { time: '14:15:22', component: 'Database Cluster', event: 'Replica lag exceeded 500ms', severity: 'CRITICAL' },
        { time: '13:58:04', component: 'Redis Cache', event: 'Eviction rate increasing in Mumbai-01', severity: 'INFO' },
        { time: '13:45:10', component: 'Ingress Nginx', event: 'Connection pool overflow (90%)', severity: 'WARNING' }
    ];

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Ops Console"
            userData={userData}
            headerTitle="Infrastructure Health"
            headerSubtitle="Real-time monitoring for TalentConnect mesh"
            headerActions={
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export Report
                    </button>
                    <button
                        onClick={() => setLastSync(new Date().toLocaleString())}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Force Refresh
                    </button>
                </div>
            }
            searchPlaceholder="Search system logs..."
        >
            <div className="max-w-7xl mx-auto py-8 lg:px-4 space-y-12">
                {/* Infrastructure Overview Header */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-black dark:text-white uppercase tracking-tight">Infrastructure Overview</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                        Last sync: <span className="text-slate-900 dark:text-slate-200">{lastSync}</span>
                    </p>
                </div>

                {/* Key Indicators Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white dark:bg-card-dark p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`size-12 rounded-2xl bg-${metric.color}-50 dark:bg-${metric.color}-500/10 flex items-center justify-center text-${metric.color}-600 group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined">{metric.icon}</span>
                                </div>
                                {metric.trend ? (
                                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${metric.trendDir === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                                        {metric.trend}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                                        {metric.status}
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{metric.label}</p>
                            <p className="text-3xl font-black dark:text-white mt-2 tracking-tight">{metric.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Visualization Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* CPU Usage History */}
                    <div className="lg:col-span-2 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-12 relative z-10">
                            <div>
                                <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">CPU Usage History</h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Resource allocation across node clusters</p>
                            </div>
                            <select className="bg-slate-50 dark:bg-white/5 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all dark:text-white">
                                <option>Last 24 Hours</option>
                                <option>Last 7 Days</option>
                            </select>
                        </div>

                        <div className="h-[320px] w-full relative flex items-end gap-3 pb-8 px-2 z-10">
                            {[40, 55, 45, 70, 60, 85, 40, 30, 50, 75, 45, 65].map((val, i) => (
                                <div key={i} className="flex-1 bg-primary/5 rounded-t-xl relative group/bar h-full">
                                    <div
                                        className="absolute inset-x-0 bottom-0 bg-primary/40 rounded-t-xl group-hover/bar:bg-primary transition-all duration-700 shadow-[0_0_20px_rgba(238,43,59,0.1)] group-hover/bar:shadow-[0_0_30px_rgba(238,43,59,0.3)]"
                                        style={{ height: `${val}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none">
                                            {val}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] px-2 relative z-10 border-t border-slate-50 dark:border-white/5 pt-6">
                            {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map(t => <span key={t}>{t}</span>)}
                        </div>
                    </div>

                    {/* Region Health */}
                    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm group">
                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tight mb-10">Region Health</h3>
                        <div className="space-y-10">
                            <div className="relative w-full aspect-[4/5] bg-slate-50 dark:bg-white/2 rounded-[2rem] overflow-hidden flex items-center justify-center border border-slate-100 dark:border-white/5">
                                <div className="absolute inset-0 opacity-10 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-1000" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsTGXgAOoRofvuYU3ofSH_iJAuft8oG5-hRk87RBFgyjcoIBd3hk00XJx7uPcJp47bULaoO4BU5e7d_u8zYJfJh5G_M3VQGmBjEZFxXmCaYpfSX5O0w_nlKWPSWNuJ6eZsvMb5q9-ruBISo9AZKiWcsbIHv4SCkMQl6mYMcarrJG2r-9fv01jumIMnNJvDKU2YHCiBRRoszjulrJ755EylXwhTa9TKc0HKOcUinyRCCGZ_dnYYd7sh4cKu_cmgbH70y5zxQVLuWcOf')" }}></div>
                                <div className="z-10 text-center px-4">
                                    <span className="material-symbols-outlined text-5xl text-primary opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700">shutter_speed</span>
                                    <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Active Edge Nodes</p>
                                </div>
                                {/* Status markers */}
                                <div className="absolute top-1/4 left-1/3 size-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                                <div className="absolute top-1/2 left-1/2 size-3 bg-emerald-500 rounded-full animate-pulse delay-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                                <div className="absolute bottom-1/4 right-1/4 size-3 bg-amber-500 rounded-full animate-pulse delay-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                            </div>

                            <div className="space-y-6">
                                {regions.map((region, idx) => (
                                    <div key={idx} className="flex items-center justify-between group/item">
                                        <span className="text-[11px] font-black text-slate-500 group-hover/item:text-slate-900 dark:group-hover/item:text-white uppercase tracking-widest transition-colors">{region.name}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${region.color === 'emerald' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            <div className={`size-1.5 rounded-full bg-current ${region.status === 'High Load' ? 'animate-ping' : ''}`}></div>
                                            {region.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Status Grid */}
                <div className="space-y-10">
                    <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">Service Mesh Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden shadow-sm hover:shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">{service.name}</span>
                                    <div className={`size-3 rounded-full ${service.status === 'Healthy' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-amber-500 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.4)]'}`}></div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black dark:text-white tracking-tight">{service.availability}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.subtext || service.status}</span>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{service.version}</span>
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{service.shard}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incident Log Table */}
                <div className="bg-slate-900 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                    <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Incident Event Log</h3>
                            <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Real-time system integrity reporting</p>
                        </div>
                        <button className="text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20 px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all">
                            View Full History
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <th className="px-10 py-6">Timestamp</th>
                                    <th className="px-10 py-6">Component</th>
                                    <th className="px-10 py-6">Event Detail</th>
                                    <th className="px-10 py-6">Severity</th>
                                    <th className="px-10 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {incidents.map((incident, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-10 py-6 text-[10px] font-black text-slate-400 font-mono">{incident.time}</td>
                                        <td className="px-10 py-6 text-xs font-black text-white uppercase tracking-tight">{incident.component}</td>
                                        <td className="px-10 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{incident.event}</td>
                                        <td className="px-10 py-6">
                                            <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${incident.severity === 'CRITICAL' ? 'bg-primary/10 text-primary border-primary/20 animate-pulse' :
                                                incident.severity === 'WARNING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                }`}>
                                                {incident.severity}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button className="text-primary hover:text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg hover:bg-primary transition-all group-hover:translate-x-[-4px]">
                                                Inspect
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="pt-16 pb-10 text-center border-t border-slate-100 dark:border-white/5 space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">TalentConnect Operations Control • Internal Use Only</p>
                    <p className="text-[9px] font-bold text-slate-400/60 uppercase tracking-widest">© 2026 TalentConnect. System Node: ap-south-1a-mumbai</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SystemHealth;
