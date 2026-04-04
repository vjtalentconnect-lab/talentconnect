import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getAdminStats, searchGlobal } from '../services/adminService';

const GlobalSearch = () => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All Results');
    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState({ users: [], projects: [] });
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.allSettled([
                    getMyProfile(),
                    getAdminStats()
                ]);
                const [profileResult, statsResult] = results;

                if (profileResult.status === 'fulfilled') {
                    setAdminProfile(profileResult.value?.data || profileResult.value);
                }
                if (statsResult.status === 'fulfilled') {
                    setStats(statsResult.value?.data || statsResult.value);
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching System context:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load search context');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async (val) => {
        setSearchQuery(val);
        if (val.trim().length > 1) {
            setSearching(true);
            try {
                const res = await searchGlobal(val);
                const data = res?.data || res;
                setSearchResults({
                    users: Array.isArray(data?.users) ? data.users : [],
                    projects: Array.isArray(data?.projects) ? data.projects : []
                });
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                setSearching(false);
            }
        } else {
            setSearchResults({ users: [], projects: [] });
        }
    };

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search', active: true },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: stats?.pendingVerifications?.toString() },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
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

    const filters = [
        { label: 'All Results', icon: 'all_inclusive' },
        { label: 'Users', icon: 'person', hasMore: true },
        { label: 'Projects', icon: 'video_library', hasMore: true },
        { label: 'Transactions', icon: 'receipt_long', hasMore: true },
        { label: 'Announcements', icon: 'campaign' }
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-light dark:bg-background-dark">
            <div className="size-24 relative mb-10">
                <div className="absolute inset-0 border-[6px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-3 border-[6px] border-primary/10 border-b-primary rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-4xl animate-pulse">database</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Indexing Platform Nexus...</p>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="Nexus Search"
            headerSubtitle="Universal cross-platform entity indexing and discovery"
            searchPlaceholder="Search name, ID, or hash..."
        >
            <div className="max-w-7xl mx-auto space-y-12 py-8 lg:px-4 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 flex items-center gap-4">
                        <span className="material-symbols-outlined text-red-500 text-2xl">error</span>
                        <p className="text-sm text-red-700 dark:text-red-400 flex-1">{error}</p>
                    </div>
                )}

                {/* Search Bar Area */}
                <div className="space-y-10">
                    <div className="relative group max-w-5xl mx-auto">
                        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl group-focus-within:bg-primary/10 transition-all"></div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-primary text-3xl animate-pulse">search</span>
                            </div>
                            <input
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="block w-full pl-24 pr-64 py-10 bg-white/80 dark:bg-card-dark/80 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3rem] text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:ring-8 focus:ring-primary/5 focus:border-primary transition-all text-2xl font-black shadow-2xl uppercase tracking-tighter"
                                placeholder={searching ? "QUERYING_DOMAIN..." : "INDEX_QUERY_ALPHA..."}
                                type="text"
                            />
                            <div className="absolute inset-y-0 right-10 flex items-center gap-6">
                                <kbd className="hidden sm:inline-flex px-4 py-2 text-[10px] font-black text-slate-400 bg-slate-50 dark:bg-card-dark/10 border border-slate-200 dark:border-white/10 rounded-2xl uppercase tracking-[0.3em]">⌘ SEARCH</kbd>
                                <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95 leading-none">
                                    <span className="material-symbols-outlined text-lg">explore</span>
                                    DISCOVER
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 max-w-5xl mx-auto">
                        <div className="flex flex-wrap gap-4 items-center justify-center">
                            {filters.map((filter) => (
                                <button
                                    key={filter.label}
                                    onClick={() => setActiveFilter(filter.label)}
                                    className={`flex items-center gap-3 px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeFilter === filter.label ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-110' : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 text-slate-500 hover:border-primary/50'}`}
                                >
                                    <span className="material-symbols-outlined text-xl">{filter.icon}</span>
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Advanced Filters */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-8 bg-slate-100/50 dark:bg-card-dark/2 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-sm">
                            {[
                                { label: 'Verification', options: ['All Status', 'Verified', 'Pending'] },
                                { label: 'Auth Tier', options: ['All Plans', 'Basic', 'Pro', 'Studio'] },
                                { label: 'Sector', options: ['All Industries', 'Film', 'Advertising'] },
                                { label: 'Budget Shard', options: ['Any Budget', 'Low (< ₹10L)', 'High (> ₹50L)'] },
                                { label: 'Time Horizon', options: ['Last 24h', 'Last 30 Days', 'All Time'] },
                                { label: 'State', options: ['Operational', 'Halted', 'Pending'] }
                            ].map((group) => (
                                <div key={group.label} className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{group.label}</label>
                                    <select className="bg-white dark:bg-card-dark/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary py-4 px-6 cursor-pointer appearance-none transition-all uppercase tracking-widest">
                                        {group.options.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-16">
                        {/* Users Section */}
                        <section className="group">
                            <div className="flex items-center justify-between mb-8 px-4">
                                <h3 className="text-2xl font-black dark:text-white text-slate-900 uppercase tracking-tight flex items-center gap-6">
                                    <div className="size-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                                        <span className="material-symbols-outlined text-2xl">group</span>
                                    </div>
                                    Identity Matrix
                                </h3>
                                <Link to="/admin/users" className="text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all">READ_ALL</Link>
                            </div>
                            <div className="space-y-4">
                                {searchResults.users.length === 0 ? (
                                    <div className="p-12 text-center bg-slate-50 dark:bg-card-dark/2 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/10">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{searchQuery ? 'Target entity not found in current sector.' : 'Enter query to initialize matrix scan.'}</p>
                                    </div>
                                ) : (
                                    searchResults.users.map((user, idx) => (
                                        <div key={user._id || idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between hover:border-primary/40 transition-all group/card shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                                            <div className="flex items-center gap-8">
                                                <div className="size-20 rounded-full bg-slate-100 dark:bg-card-dark/5 overflow-hidden ring-8 ring-primary/5 group-hover/card:ring-primary/10 transition-all p-1">
                                                    <img className="w-full h-full object-cover rounded-full" src={user.profile?.profilePicture && user.profile?.profilePicture !== 'no-photo.jpg' ? user.profile?.profilePicture : `https://ui-avatars.com/api/?name=${user.profile?.fullName || user.email || 'User'}&background=ee2b3b&color=fff`} alt={user.profile?.fullName || 'User'} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h4 className="text-xl font-black dark:text-white text-slate-900 uppercase tracking-tighter">{user.profile?.fullName || 'Anonymous Node'}</h4>
                                                        {user.isVerified && <span className="material-symbols-outlined text-sm text-blue-400 fill-1">verified</span>}
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{user.role} • {user.profile?.location || 'Unknown Sector'}</p>
                                                        <div className="size-1 bg-slate-200 dark:bg-card-dark/10 rounded-full"></div>
                                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">#{(user._id || user.id || '').slice(-6).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <Link to={`/admin/users/${user._id || user.id}`} className="px-8 py-4 bg-slate-900 dark:bg-card-dark text-white dark:text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95 leading-none">Access Dossier</Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section className="group">
                            <div className="flex items-center justify-between mb-8 px-4">
                                <h3 className="text-2xl font-black dark:text-white text-slate-900 uppercase tracking-tight flex items-center gap-6">
                                    <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-primary/5">
                                        <span className="material-symbols-outlined text-2xl">theater_comedy</span>
                                    </div>
                                    Project Shards
                                </h3>
                                <Link to="/admin/projects" className="text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all">VIEW_GRID</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {searchResults.projects.length === 0 ? (
                                    <div className="md:col-span-2 p-12 text-center bg-slate-50 dark:bg-card-dark/2 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/10 font-black text-[10px] text-slate-400 uppercase tracking-widest italic">
                                        No project shards detected in query range.
                                    </div>
                                ) : (
                                    searchResults.projects.map((project, idx) => (
                                        <div key={project._id || idx} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3.5rem] overflow-hidden group/item hover:border-primary/40 transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                                            <div className="h-64 w-full relative overflow-hidden">
                                                <img className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" src={project.poster || 'https://images.unsplash.com/photo-1485846234645-a62644ffb1e7?q=80&w=2069&auto=format&fit=crop'} alt={project.title} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                                                <div className="absolute bottom-8 left-8">
                                                    <span className={`px-4 py-2 rounded-xl bg-${project.status === 'open' ? 'emerald' : 'amber'}-500/20 text-${project.status === 'open' ? 'emerald' : 'amber'}-500 text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 backdrop-blur-2xl`}>
                                                        {project.status?.toUpperCase() || 'LIVE_NODE'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-10">
                                                <h4 className="text-xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-2">{project.title}</h4>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">{project.category} • {project.location}</p>
                                                <Link to={`/admin/projects`} className="block w-full text-center py-5 bg-slate-900 dark:bg-card-dark/10 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] hover:bg-primary transition-all leading-none">ANALYZE_PROJECT</Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* History */}
                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3.5rem] p-12 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 size-32 bg-primary/2 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-primary/5 transition-colors"></div>
                            <h3 className="text-xl font-black dark:text-white text-slate-900 uppercase tracking-tight mb-10 flex items-center gap-6">
                                <div className="size-12 bg-slate-100 dark:bg-card-dark/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-2xl animate-spin-slow">history</span>
                                </div>
                                Recent Queries
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { term: 'Verified Stunt Actors', time: '2m ago' },
                                    { term: 'Dharma Audits', time: '14m ago' },
                                    { term: 'Mumbai Location Scouts', time: '1h ago' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between group/q cursor-pointer">
                                        <div className="flex items-center gap-5">
                                            <span className="material-symbols-outlined text-slate-300 group-hover/q:text-primary transition-colors text-xl">search_check</span>
                                            <div>
                                                <span className="block text-[11px] font-black text-slate-500 group-hover/q:text-slate-900 dark:text-white dark:group-hover/q:text-white transition-colors uppercase tracking-widest">{item.term}</span>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.time}</span>
                                            </div>
                                        </div>
                                        <button className="opacity-0 group-hover/q:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-slate-300 hover:text-rose-500 text-lg">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white dark:bg-card-dark/5 transition-all">PURGE_HISTORY</button>
                        </section>

                        {/* Tags */}
                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3.5rem] p-12 shadow-sm">
                            <h3 className="text-xl font-black dark:text-white text-slate-900 uppercase tracking-tight mb-10 flex items-center gap-6">
                                <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-2xl">label</span>
                                </div>
                                Trending Tags
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Awaiting Review',
                                    'High Budget',
                                    'Mumbai Leads',
                                    'Payment Issue',
                                    'Urgent Casting',
                                    'Audit Needed'
                                ].map((tag) => (
                                    <span key={tag} className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-card-dark/5 border border-slate-100 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-primary/50 hover:bg-primary/5 hover:text-primary cursor-pointer transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Promo */}
                        <section className="bg-gradient-to-br from-primary to-rose-600 rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl shadow-primary/30">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[160px] text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">terminal</span>
                            <div className="relative">
                                <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Nexus Intelligence</h4>
                                <p className="text-[11px] font-bold text-white/70 mb-10 leading-relaxed uppercase tracking-widest">Deploy advanced neural search patterns to identify platform-wide trends and actor demand surges.</p>
                                <button className="w-full py-5 bg-white dark:bg-card-dark text-primary text-[10px] font-black rounded-2xl uppercase tracking-[0.4em] shadow-2xl hover:bg-slate-50 transition-all active:scale-95 leading-none">INITIALIZE_AI</button>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default GlobalSearch;
