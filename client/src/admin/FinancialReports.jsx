import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const FinancialReports = () => {
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
        { icon: 'payments', label: 'Financials', path: '/admin/financials', active: true },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: 'Rajesh Kumar',
        roleTitle: 'Super Admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrIdafq7sYaodskWXr7Z-ZtkxQYlRiG4gR8vmIfZ8BckwZe46t9nOR2ZYi3KZJtIsslU5cfPtof-pKhIEY7KXYI-SHVGv54wVewwJIHswlb7YjH9ht9rSKaXU113Z1WYW2UsEAFILvf8x43C7sETnHNMzsSJXQyHtgKjGOUYsQsOfOGijbr8R2w6ZT3IPWHDgOjDB4mwPNRNZkJUV4ffWPEgaIysxNII67CHbq2w2YqyExM-UJFNQG4akQ2TNai923IsoxJpJ90KzE'
    };

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="Financial Overview"
            headerSubtitle="Platform revenue and transaction tracking"
            searchPlaceholder="Search transactions, IDs..."
        >
            <div className="space-y-8">
                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Revenue', value: '₹45,80,000', trend: '12.5%', trendDir: 'up', subtext: 'vs last quarter' },
                        { label: 'Monthly Recurring', value: '₹12,40,000', trend: '8.2%', trendDir: 'up', subtext: 'active subscriptions' },
                        { label: 'Payouts', value: '₹8,20,000', trend: '5.4%', trendDir: 'up', subtext: 'processed this month' },
                        { label: 'Net Profit', value: '₹37,60,000', trend: '2.1%', trendDir: 'down', subtext: 'after commissions' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{kpi.label}</span>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 ${kpi.trendDir === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                                    <span className="material-symbols-outlined text-xs">{kpi.trendDir === 'up' ? 'trending_up' : 'trending_down'}</span> {kpi.trend}
                                </span>
                            </div>
                            <div className="text-3xl font-black dark:text-white mb-2">{kpi.value}</div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.subtext}</p>
                        </div>
                    ))}
                </div>

                {/* Chart Section */}
                <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tight mb-1">Revenue Trend</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance metrics over the last 12 months</p>
                        </div>
                        <div className="flex gap-3">
                            <select className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                                <option>Last 12 Months</option>
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                            <select className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                                <option>All Categories</option>
                                <option>Subscriptions</option>
                                <option>Commissions</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[300px] w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#ee2b3b" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#ee2b3b" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0 250 Q100 230 200 260 T400 200 T600 240 T800 150 T1000 180 V300 H0 Z" fill="url(#chartGradient)" />
                            <path d="M0 250 Q100 230 200 260 T400 200 T600 240 T800 150 T1000 180" fill="none" stroke="#ee2b3b" strokeLinecap="round" strokeWidth="4" />
                            {[200, 400, 600, 800].map((cx, i) => (
                                <circle key={i} cx={cx} cy={[260, 200, 240, 150][i]} fill="#ee2b3b" r="6" stroke="white" strokeWidth="2" />
                            ))}
                        </svg>
                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] px-2 pb-2">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">Transaction History</h3>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group">
                                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">filter_list</span>
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                Range
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 dark:border-white/5">
                                    <th className="px-8 py-5">Date</th>
                                    <th className="px-8 py-5">User</th>
                                    <th className="px-8 py-5">ID</th>
                                    <th className="px-8 py-5 text-right">Amount</th>
                                    <th className="px-8 py-5">Type</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                {[
                                    { date: 'May 12, 2024', user: 'Aryan Kapoor', role: 'Director', initial: 'AK', txn: 'TXN-90231', amount: '₹45,000', type: 'Commission', status: 'Success' },
                                    { date: 'May 11, 2024', user: 'Sanya Malhotra', role: 'Artist', initial: 'SM', txn: 'TXN-88421', amount: '₹12,500', type: 'Subscription', status: 'Success' },
                                    { date: 'May 10, 2024', user: 'Rahul Deshmukh', role: 'Artist', initial: 'RD', txn: 'TXN-76512', amount: '₹24,000', type: 'Commission', status: 'Pending' },
                                    { date: 'May 09, 2024', user: 'Vikram Jaiswal', role: 'Director', initial: 'VJ', txn: 'TXN-65109', amount: '₹15,000', type: 'Subscription', status: 'Success' }
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6 text-xs font-black dark:text-white uppercase tracking-tight">{row.date}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black uppercase tracking-widest">{row.initial}</div>
                                                <div>
                                                    <div className="text-sm font-black dark:text-white uppercase tracking-tight">{row.user}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-xs font-mono text-slate-500 font-bold">{row.txn}</td>
                                        <td className="px-8 py-6 text-sm font-black text-right dark:text-white">{row.amount}</td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg border tracking-widest ${row.type === 'Commission' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'}`}>
                                                {row.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${row.status === 'Success' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                <span className={`material-symbols-outlined text-sm ${row.status === 'Pending' ? 'animate-pulse' : ''}`}>{row.status === 'Success' ? 'check_circle' : 'pending'}</span> {row.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="size-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                                                <span className="material-symbols-outlined text-lg">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 border-t border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 4 of 1,248 transactions</span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-30" disabled>Prev</button>
                            <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white dark:hover:bg-white/5 transition-all">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FinancialReports;
