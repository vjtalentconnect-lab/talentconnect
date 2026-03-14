import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';

const GlobalSearch = () => {
    const [activeFilter, setActiveFilter] = useState('All Results');
    const [isSavedSearchOpen, setIsSavedSearchOpen] = useState(false);

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search', active: true },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: '12' },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
        { type: 'section', label: 'Saved Searches' },
        { icon: 'history_edu', label: 'Lead Actors (Mumbai)', path: '#', compact: true, rightIcon: 'settings' },
        { icon: 'history_edu', label: 'High Budget Sci-Fi', path: '#', compact: true, rightIcon: 'settings' },
        { icon: 'bookmarks', label: 'Manage All Saved', path: '#', compact: true, primary: true },
    ];

    const userData = {
        name: 'Rahul Sharma',
        roleTitle: 'Super Admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPx8UySd9sVgJf1rqVx-6QNT6YCZ5DdCnYXNoa4EufrCe6nwNsI6VEID6GOiIF0dN7_DUtYfEu07H-F-k1pZqte5NO2eFFVMtDRLY0MJS8bc2IxuXijBwSsE4lT_yEDsHUf0GnOoYSYPy3ObtR5gw5J_bNXK0niFOWLKhj6dI_QmOgfuCOUi7znQ7DMrio6m2vfm2yKOnfVp5dwgww4OKrACL8c4OdInmvtG8Mm__na8NQoQzGPFvjNBFQO5KksnTIc4FUXG-QEoPS'
    };

    const filters = [
        { label: 'All Results', icon: 'all_inclusive' },
        { label: 'Users', icon: 'person', hasMore: true },
        { label: 'Projects', icon: 'video_library', hasMore: true },
        { label: 'Transactions', icon: 'receipt_long', hasMore: true },
        { label: 'Announcements', icon: 'campaign' }
    ];

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="Global Search"
            headerSubtitle="Search everything across the platform"
            searchPlaceholder="Search name, ID, or hash..."
        >
            <div className="max-w-6xl mx-auto space-y-10 py-6 pb-20">
                {/* Search Bar Area */}
                <div className="space-y-6">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-primary text-2xl">search</span>
                        </div>
                        <input
                            className="block w-full pl-16 pr-48 py-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-3xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-xl font-bold shadow-sm"
                            placeholder="Search for name, project ID, or transaction hash..."
                            type="text"
                        />
                        <div className="absolute inset-y-0 right-6 flex items-center gap-4">
                            <kbd className="hidden sm:inline-flex px-3 py-1.5 text-xs font-black text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl uppercase tracking-widest">⌘ K</kbd>

                            <div className="relative group/saved">
                                <button className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-primary text-[10px] font-black uppercase tracking-widest transition-all">
                                    <span className="material-symbols-outlined text-sm">bookmark</span>
                                    Save Search
                                </button>
                                {/* Dropdown Menu */}
                                <div className="invisible group-hover/saved:visible opacity-0 group-hover/saved:opacity-100 absolute right-0 top-full mt-4 w-72 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-2xl shadow-2xl overflow-hidden z-[60] transition-all duration-200">
                                    <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Manage Saved Searches</p>
                                    </div>
                                    <div className="py-2">
                                        {[
                                            'Lead Actors (Mumbai)',
                                            'High Budget Sci-Fi',
                                            'New TV Leads'
                                        ].map((name) => (
                                            <div key={name} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item cursor-pointer">
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">{name}</span>
                                                <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                    <button className="material-symbols-outlined text-sm text-slate-400 hover:text-primary transition-colors">edit</button>
                                                    <button className="material-symbols-outlined text-sm text-slate-400 hover:text-rose-500 transition-colors">delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                        <button className="w-full py-2 text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest transition-colors">+ Create New Folder</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-4">Filter By:</span>
                            {filters.map((filter) => (
                                <button
                                    key={filter.label}
                                    onClick={() => setActiveFilter(filter.label)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter.label ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 text-slate-500 hover:border-primary/50'}`}
                                >
                                    <span className="material-symbols-outlined text-lg">{filter.icon}</span>
                                    {filter.label}
                                    {filter.hasMore && <span className="material-symbols-outlined text-sm opacity-50">expand_more</span>}
                                </button>
                            ))}
                        </div>

                        {/* Advanced Filters */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm">
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verification Status</label>
                                <select className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary py-2.5 cursor-pointer">
                                    <option>All Status</option>
                                    <option>Verified</option>
                                    <option>Pending</option>
                                    <option>Unverified</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Plan Type</label>
                                <select className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary py-2.5 cursor-pointer">
                                    <option>All Plans</option>
                                    <option>Basic</option>
                                    <option>Pro</option>
                                    <option>Studio</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Industry</label>
                                <select className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary py-2.5 cursor-pointer">
                                    <option>All Industries</option>
                                    <option>Film</option>
                                    <option>Ad</option>
                                    <option>Web Series</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Budget Range</label>
                                <select className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary py-2.5 cursor-pointer">
                                    <option>Any Budget</option>
                                    <option>Low (&lt; ₹10L)</option>
                                    <option>Mid (₹10L - ₹50L)</option>
                                    <option>High (&gt; ₹50L)</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date Range</label>
                                <div className="flex items-center justify-between bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 cursor-pointer hover:border-primary/50 transition-all">
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                                        Last 30 Days
                                    </span>
                                    <span className="material-symbols-outlined text-xs opacity-50">expand_more</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Transaction Status</label>
                                <select className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary py-2.5 cursor-pointer">
                                    <option>All Status</option>
                                    <option>Success</option>
                                    <option>Pending</option>
                                    <option>Failed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Users Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight flex items-center gap-3">
                                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-xl">person</span>
                                    </div>
                                    Artists & Directors
                                </h3>
                                <Link to="/admin/users" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                            </div>
                            <div className="grid gap-4">
                                {[
                                    { name: 'Arjun Malhotra', role: 'Actor • Mumbai', id: '#USR-9921', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOfbcY8E-UhnlwIbEthr3I7PQ4hqaI-F4whyBWVAgXI_POFIJq9r_nyAb4zO8v0nq_6iyFRnG8VKLH-H3ozJcAtEaqdO3EnPkO6vxiXaCtpqLSy6GJfvmJlA9Eb1sbTxn4zuISUYRGVGFgzV5cpHwOSsQ5A-5NJeKrfHzTUeGLwidMBrh-BZFseudOJbzgYYJhFF2vTgIBffd7tfvSPj0KnnHnRia2hG68AHwVNrFTZ1MpCX39LDsXXo2F7ADXCH3WUwsWXHWlyZ5m', verified: false },
                                    { name: 'Priya Sharma', role: 'Director • Delhi', id: '#USR-4420', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC96W9DzHrg6_q90doKZjqg1hfmKyUZ4v92rBqMPH2AfbcBiP7PV6HW8y3TLF1EMb2FKYOBmEETh6zRcdJoh68cMM1_vkr3YhT4o1poU1gnuy_tXCO2XaerApNV5d9AYq3YW65_DUmwrNgsv4HgajYL3aKdVraowbg1BUQXgjHm34QL9Jo6QT3En8zpVflvrZTzWY6v_junrmSUXj4SwMIHWOlfL936YjtwvxKWwVRJHFev80uJLW7x0lLPPaz2OiGWPWq-dRpteUI8', verified: true }
                                ].map((user, idx) => (
                                    <div key={idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-3xl p-5 flex items-center justify-between hover:border-primary/30 transition-all group shadow-sm">
                                        <div className="flex items-center gap-5">
                                            <div className="size-14 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all">
                                                <img className="w-full h-full object-cover" src={user.img} alt={user.name} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-black dark:text-white uppercase tracking-tight">{user.name}</h4>
                                                    {user.verified && <span className="material-symbols-outlined text-sm text-blue-400 fill-1">verified</span>}
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.role} • ID: {user.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link to={`/admin/users/1`} className="px-5 py-2 bg-primary text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">View Profile</Link>
                                            <button className="px-5 py-2 bg-slate-100 dark:bg-white/5 text-slate-500 text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">Verify</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight flex items-center gap-3">
                                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-xl">video_library</span>
                                    </div>
                                    Active Projects
                                </h3>
                                <Link to="/admin/projects" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: 'Dharma Productions: Untitled', meta: 'Feature Film • Budget: ₹45 Cr • 12 Artists', status: 'In Audit', statusColor: 'amber', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_S0JMjAGe_CYl7cXZE_BHLc38_jlAGUk9bHSgPuzSgOxRMqMsUJeZIuSI3B4uKO3vK86ci5DFBveUybV-ZgES1XcpIzrKKV3JtsKmrzHAyeXRDxZHXenldqdRiBjczRh_MGHQ8G8EFEqZzbxyNm6kNwL2i6Wvy3b2iFhCyP-VhhtFqRMEj2qu5KdGDte-XTV8BsyOxJemepYToO4-hKu2z1G9zDMdBHqWDT8U1GIuoYu2JG6LiDzikya6YRCdTdaRveHnfwc9sAqU' },
                                    { title: 'Web Series: The Glitch', meta: 'OTT Platform • Netflix • 8 Roles Open', status: 'Active Casting', statusColor: 'emerald', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAh_MVjnQugL1BmoBxWujUoOA5kSUvI_xXMYv0eJ5duv82cBCj2zIWvwagsq2VV2-xmPftlZQZsr8eRxPFFWRMRg5eh6TzRghoWt3NliYj69VNOUfxRFp9eU4gHTq9GJQFWyLoGPkxTviXsPk-Wd1jreqyeICZXqMQOH_eCGAGbtY0VFMUvibYtVBJ5_S9Sq2fS9i8HszhF8gXyd9ptlXsGeLWUvBn494RqcyE9VkS8HAZLmB5F235wRwfassc_tXbW55qsoFs2EL1' }
                                ].map((project, idx) => (
                                    <div key={idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden group hover:border-primary/30 transition-all shadow-sm">
                                        <div className="h-40 w-full relative overflow-hidden">
                                            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={project.img} alt={project.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <span className={`px-2 py-1 rounded bg-${project.statusColor}-500/20 text-${project.statusColor}-500 text-[9px] font-black uppercase tracking-widest border border-${project.statusColor}-500/30 backdrop-blur-md`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="font-black dark:text-white uppercase tracking-tight mb-1">{project.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{project.meta}</p>
                                            <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black rounded-xl uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all">Audit Project</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Transactions Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight flex items-center gap-3">
                                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-xl">receipt_long</span>
                                    </div>
                                    Recent Transactions
                                </h3>
                                <Link to="/admin/financials" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                            </div>
                            <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 dark:border-white/5">
                                            <th className="px-6 py-5">ID / Hash</th>
                                            <th className="px-6 py-5">User</th>
                                            <th className="px-6 py-5">Amount</th>
                                            <th className="px-6 py-5 text-center">Status</th>
                                            <th className="px-6 py-5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {[
                                            { id: 'TX-829910-AQ', user: 'Siddharth Roy', amount: '₹2,50,000', status: 'Success', state: 'emerald' },
                                            { id: 'TX-773122-BZ', user: 'Kriti Varma', amount: '₹15,000', status: 'Pending', state: 'amber' }
                                        ].map((tx, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-mono text-[10px] font-black text-slate-400">{tx.id}</td>
                                                <td className="px-6 py-4 text-[11px] font-black dark:text-white uppercase tracking-widest">{tx.user}</td>
                                                <td className="px-6 py-4 text-sm font-black dark:text-white">{tx.amount}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-${tx.state}-500/10 text-${tx.state}-500 border border-${tx.state}-500/20`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-primary hover:bg-primary/10 p-2 rounded-xl transition-all">
                                                        <span className="material-symbols-outlined text-xl">visibility</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Recent Searches */}
                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-sm font-black dark:text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">history</span>
                                Recent Searches
                            </h3>
                            <div className="space-y-4">
                                {[
                                    'Verified Stunt Actors',
                                    'Dharma Audits',
                                    'Mumbai Location Scouts'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">search</span>
                                            <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-widest">{item}</span>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-slate-300 hover:text-rose-500 text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Clear History</button>
                        </section>

                        {/* Suggested Filters */}
                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-sm font-black dark:text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">tune</span>
                                Suggested Filters
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'Awaiting Review',
                                    'High Budget',
                                    'New Registrations',
                                    'Payment Disputes',
                                    'Urgent Casting'
                                ].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-primary/50 hover:text-primary cursor-pointer transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Insights CTA */}
                        <section className="bg-gradient-to-br from-primary to-rose-600 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl shadow-primary/30">
                            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[120px] text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">insights</span>
                            <h4 className="text-xl font-black uppercase tracking-tight mb-2">Advanced Analytics</h4>
                            <p className="text-xs font-medium text-white/80 mb-8 leading-relaxed">Access full search analytics to see trending artists and popular casting demands this week.</p>
                            <button className="w-full py-4 bg-white text-primary text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all active:scale-95">View Reports</button>
                        </section>
                    </aside>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default GlobalSearch;
