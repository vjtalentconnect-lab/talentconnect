import DashboardLayout from '../components/layout/DashboardLayout';
import { getAdminStats, getPendingVerifications } from '../services/adminService';
import { getMyProfile } from '../services/profileService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminProfile, setAdminProfile] = useState(null);

  const fetchData = async () => {
    try {
      const statsData = await getAdminStats();
      setStats(statsData.data);
      const verifData = await getPendingVerifications();
      setVerifications(verifData.data.slice(0, 5));
      const profileData = await getMyProfile();
      setAdminProfile(profileData.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const menuItems = [
    { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin', active: true },
    { icon: 'search', label: 'Global Search', path: '/admin/search' },
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
  ];

  const userData = {
    name: adminProfile?.fullName || 'Admin',
    roleTitle: 'Super Admin',
    avatar: adminProfile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=Admin' : adminProfile?.profilePicture
  };

  const headerActions = (
    <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
      <span className="material-symbols-outlined text-sm">add</span>
      New Project
    </button>
  );

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-background-dark">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  return (
    <DashboardLayout
      menuItems={menuItems}
      userRole="Admin Control"
      userData={userData}
      headerTitle="Dashboard Overview"
      headerSubtitle="Welcome back, here's what's happening today."
      headerActions={headerActions}
      searchPlaceholder="Search anything..."
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">person</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +12%
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Artists</p>
            <h3 className="text-3xl font-black mt-1 dark:text-white">{stats?.totalTalent?.toLocaleString() || '0'}</h3>
          </div>
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <img src="/TC Logo.png" alt="Logo" className="h-6 w-auto" />
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +5%
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Directors</p>
            <h3 className="text-3xl font-black mt-1 dark:text-white">{stats?.totalDirectors?.toLocaleString() || '0'}</h3>
          </div>
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
              <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">Required</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Verifications</p>
            <h3 className="text-3xl font-black mt-1 dark:text-white">{stats?.pendingVerifications || '0'}</h3>
          </div>
          <Link to="/admin/financials" className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-xl transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary rounded-lg text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">currency_rupee</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +22%
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Monthly Revenue</p>
            <h3 className="text-3xl font-black mt-1 dark:text-white">₹14.2L</h3>
          </Link>
        </div>

        {/* Middle Section: Trends & Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-lg font-bold dark:text-white">Revenue & Growth Trends</h4>
                <p className="text-sm text-slate-500">Overview of platform monetization</p>
              </div>
              <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-bold px-4 py-2 ring-0 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                <option>Last 7 Months</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-64 flex flex-col justify-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ec5b13" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#ec5b13" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,150 Q100,120 200,160 T400,100 T600,140 T800,40 L800,200 L0,200 Z" fill="url(#chartGradient)"></path>
                <path d="M0,150 Q100,120 200,160 T400,100 T600,140 T800,40" fill="none" stroke="#ec5b13" strokeLinecap="round" strokeWidth="4"></path>
                <circle cx="400" cy="100" fill="#ec5b13" r="6" stroke="white" strokeWidth="2"></circle>
              </svg>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
            <h4 className="text-lg font-bold mb-6 dark:text-white">Platform Health</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Active Auditions</span>
                  <span className="font-bold dark:text-white">3,120</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[78%] rounded-full shadow-[0_0_8px_rgba(236,91,19,0.3)]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Active Messages</span>
                  <span className="font-bold dark:text-white">18.4K</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[92%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Server Load</span>
                  <span className="font-bold dark:text-white">24%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[24%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-border-dark">
                <div className="flex items-center gap-4 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                  <div className="size-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none mb-1">System Status</p>
                    <p className="text-sm font-bold dark:text-white">All systems operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table: Verification Requests */}
        <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold dark:text-white uppercase tracking-tight">Recent Verification Requests</h4>
              <p className="text-sm text-slate-500">Needs your immediate attention</p>
            </div>
            <button className="text-primary text-sm font-bold hover:underline transition-all">View All Requests</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Request Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {verifications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No pending verification requests.</td>
                  </tr>
                ) : (
                  verifications.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100">
                            <img
                              className="w-full h-full object-cover"
                              src={row.profile?.profilePicture === 'no-photo.jpg' ? `https://ui-avatars.com/api/?name=${row.profile?.fullName}` : row.profile?.profilePicture}
                              alt={row.profile?.fullName}
                            />
                          </div>
                          <div>
                            <Link to={`/admin/users/${row._id}`} className="text-sm font-bold dark:text-white leading-none hover:text-primary transition-colors">{row.profile?.fullName}</Link>
                            <p className="text-xs text-slate-500 font-medium mt-1">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${row.role === 'talent' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                          }`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{new Date(row.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/admin/verifications/${row._id}`} className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all inline-block text-center">Review</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
