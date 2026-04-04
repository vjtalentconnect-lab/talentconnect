import DashboardLayout from '../components/layout/DashboardLayout';
import { getAdminStats, getPendingVerifications } from '../services/adminService';
import { getMyProfile } from '../services/profileService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import socket from '../services/socket';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);

  const fetchData = async () => {
    try {
      const results = await Promise.allSettled([
        getAdminStats(),
        getPendingVerifications(),
        getMyProfile()
      ]);

      const [statsResult, verifResult, profileResult] = results;

      // Handle stats - optional
      if (statsResult.status === 'fulfilled') {
        setStats(statsResult.value?.data || statsResult.value);
      }

      // Handle verifications - optional
      if (verifResult.status === 'fulfilled') {
        const verifData = verifResult.value?.data || verifResult.value;
        setVerifications(Array.isArray(verifData) ? verifData.slice(0, 5) : []);
      }

      // Handle profile - optional
      if (profileResult.status === 'fulfilled') {
        setAdminProfile(profileResult.value?.data || profileResult.value);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleAdminEvent = (event) => {
      console.log('Admin event received:', event);
      if (event.type === 'statsUpdate' || event.type === 'newUser' || event.type === 'verificationUpdate' || event.type === 'project_created') {
        fetchData();
      }
    };

    socket.on('adminEvent', handleAdminEvent);

    return () => {
      socket.off('adminEvent', handleAdminEvent);
    };
  }, []);

  const menuItems = [
    { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin', active: true },
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
    { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
  ];

  const userData = {
    name: adminProfile?.fullName || 'Admin',
    roleTitle: 'Super Admin',
    avatar: adminProfile?.profilePicture && adminProfile.profilePicture !== 'no-photo.jpg' 
      ? adminProfile.profilePicture 
      : `https://ui-avatars.com/api/?name=${adminProfile?.fullName || 'Admin'}&background=ee2b3b&color=fff`
  };

  return (
    <DashboardLayout
      menuItems={menuItems}
      userRole="Admin Control"
      userData={userData}
      headerTitle="Admin Command Center"
      headerSubtitle="Real-time platform oversight and governance."
      searchPlaceholder="Search users, projects, transactions..."
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="relative size-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
            <img src="/TC Logo.png" alt="Loading" className="absolute inset-0 size-12 m-auto animate-pulse" />
          </div>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Initializing Command Center...</p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 flex items-center gap-4">
            <span className="material-symbols-outlined text-red-500 text-2xl">error</span>
            <div className="flex-1">
              <p className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-wider">Data Load Error</p>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">{error}</p>
            </div>
            <button onClick={fetchData} className="px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-red-600 transition-all">
              Retry
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white dark:bg-card-dark p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-lg sm:text-xl">person</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> {stats?.growth || '+12%'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Artists</p>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 dark:text-white text-slate-900 leading-none">{stats?.totalTalent?.toLocaleString() || '0'}</h3>
          </div>

          <div className="bg-white dark:bg-card-dark p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 sm:p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-lg sm:text-xl">movie</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +5%
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Directors</p>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 dark:text-white text-slate-900 leading-none">{stats?.totalDirectors?.toLocaleString() || '0'}</h3>
          </div>

          <div className="bg-white dark:bg-card-dark p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 sm:p-3 bg-amber-500/10 rounded-xl text-amber-500 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-lg sm:text-xl">pending_actions</span>
              </div>
              <Link to="/admin/verifications" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Review All</Link>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Pending Verifications</p>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 dark:text-white text-slate-900 leading-none">{stats?.pendingVerifications || '0'}</h3>
          </div>

          <Link to="/admin/financials" className="bg-white dark:bg-card-dark p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 sm:p-3 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-lg sm:text-xl">payments</span>
                </div>
                <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span> {stats?.revenueGrowth || '+22%'}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Monthly Revenue</p>
              <h3 className="text-2xl sm:text-3xl font-black mt-1 dark:text-white text-slate-900 leading-none">{stats?.revenue || '₹0.0L'}</h3>
            </div>
          </Link>
        </div>

        {/* Middle Section: stacks to single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-2 bg-white dark:bg-card-dark p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden group">
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <div>
                <h4 className="text-base sm:text-lg font-black dark:text-white text-slate-900 uppercase tracking-tight">Revenue & Growth Trends</h4>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Monetization performance analysis</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                  <div className="size-1.5 rounded-full bg-emerald-500"></div> LIVE
                </div>
              </div>
            </div>
            <div className="h-64 flex flex-col justify-end relative">
               <div className="absolute inset-0 flex flex-col justify-between opacity-5">
                 {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-slate-900 dark:bg-slate-600"></div>)}
               </div>
              <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ee2b3b" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#ee2b3b" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path className="animate-in slide-in-from-left duration-1000" d="M0,150 Q100,120 200,160 T400,100 T600,140 T800,40 L800,200 L0,200 Z" fill="url(#chartGradient)"></path>
                <path className="animate-in slide-in-from-left duration-1000" d="M0,150 Q100,120 200,160 T400,100 T600,140 T800,40" fill="none" stroke="#ee2b3b" strokeLinecap="round" strokeWidth="4"></path>
                <circle className="animate-bounce" cx="400" cy="100" fill="#ee2b3b" r="6" stroke="white" strokeWidth="2"></circle>
              </svg>
              <div className="flex justify-between mt-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 italic">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm">
            <h4 className="text-base sm:text-lg font-black dark:text-white text-slate-900 uppercase tracking-tight mb-4 sm:mb-8">Platform Health</h4>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500 dark:text-slate-400">Active Auditions</span>
                  <span className="dark:text-white text-primary">{stats?.activeAuditions || '0'}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-card-dark/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(238,43,59,0.3)] transition-all duration-1000" style={{ width: `${Math.min((stats?.activeAuditions || 0) / 100 * 100, 100)}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500 dark:text-slate-400">Message Throughput</span>
                  <span className="dark:text-white text-emerald-500">{stats?.messageThroughput || '0'}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-card-dark/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-1000 delay-300" style={{ width: `${Math.min((stats?.messageThroughput || 0) / 1000 * 100, 100)}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500 dark:text-slate-400">Server Load</span>
                  <span className="dark:text-white text-blue-500">{stats?.serverLoad || '24'}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-card-dark/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-1000 delay-500" style={{ width: `${stats?.serverLoad || 24}%` }}></div>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                <Link to="/admin/health" className="flex items-center gap-4 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 group cursor-pointer hover:bg-emerald-500/10 transition-all">
                  <div className="size-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] leading-none mb-1">System Integrity</p>
                    <p className="text-xs font-black dark:text-white text-slate-900 uppercase tracking-tight">All systems operational</p>
                  </div>
                  <span className="material-symbols-outlined text-emerald-500 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Table: Verification Requests */}
        <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden group">
          <div className="p-4 sm:p-6 lg:p-8 border-b border-slate-200 dark:border-border-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-card-dark/2 transition-colors group-hover:bg-slate-50 dark:group-hover:bg-card-dark">
            <div>
              <h4 className="text-lg sm:text-xl font-black dark:text-white text-slate-900 uppercase tracking-tight">Recent Verification Requests</h4>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Pending approval from human moderators</p>
            </div>
            <Link to="/admin/verifications" className="px-4 sm:px-6 py-2 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5 whitespace-nowrap">View All</Link>
          </div>

          {/* Mobile: card list */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-white/5">
            {verifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">No pending verifications.</p>
            ) : verifications.map((row, idx) => (
              <div key={row._id || idx} className="flex items-center gap-3 p-4">
                <div className="size-11 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/10 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={row.profile?.profilePicture && row.profile?.profilePicture !== 'no-photo.jpg' ? row.profile?.profilePicture : `https://ui-avatars.com/api/?name=${row.profile?.fullName || 'User'}&background=random`}
                    alt={row.profile?.fullName || 'User'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black dark:text-white text-slate-900 uppercase tracking-tight truncate">{row.profile?.fullName || 'Untitled Artist'}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest truncate">{row.role} • {row.email}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-amber-500" />
                    <span className="text-[9px] font-black text-amber-500 uppercase">Pending</span>
                  </div>
                  <Link to={`/admin/verifications/${row._id}`} className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-wider whitespace-nowrap">Review</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: full table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-slate-50 dark:bg-card-dark/5">
                  <th className="px-4 sm:px-6 lg:px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Name &amp; Identifier</th>
                  <th className="px-4 sm:px-6 lg:px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Role</th>
                  <th className="px-4 sm:px-6 lg:px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Submitted On</th>
                  <th className="px-4 sm:px-6 lg:px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-4 sm:px-6 lg:px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-card-dark/5">
                {verifications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold">No pending identification packets detected.</td>
                  </tr>
                ) : (
                  verifications.map((row, idx) => (
                    <tr key={row._id || idx} className="hover:bg-slate-50 dark:hover:bg-card-dark/5 transition-colors group/row">
                      <td className="px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="size-10 sm:size-12 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-card-dark/5 p-0.5 group-hover/row:border-primary/50 transition-all flex-shrink-0">
                            <img
                              className="w-full h-full object-cover rounded-[calc(1rem-2px)]"
                              src={row.profile?.profilePicture && row.profile?.profilePicture !== 'no-photo.jpg' ? row.profile?.profilePicture : `https://ui-avatars.com/api/?name=${row.profile?.fullName || row.email || 'User'}&background=random`}
                              alt={row.profile?.fullName || 'User'}
                            />
                          </div>
                          <div className="min-w-0">
                            <Link to={`/admin/users/${row._id}`} className="text-sm font-black dark:text-white text-slate-900 uppercase tracking-tight hover:text-primary transition-colors truncate block">{row.profile?.fullName || 'Untitled Artist'}</Link>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5 font-mono truncate">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-6">
                        <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest border ${row.role === 'talent' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'}`}>{row.role}</span>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-6 text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">{row.createdAt ? new Date(row.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</td>
                      <td className="px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] flex-shrink-0" />
                          <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">pending</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-6 text-right">
                        <Link to={`/admin/verifications/${row._id}`} className="px-3 sm:px-5 py-2 bg-slate-900 dark:bg-card-dark text-white text-[10px] font-black rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg uppercase tracking-widest whitespace-nowrap inline-block">Review</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
