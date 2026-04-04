import DashboardLayout from '../components/layout/DashboardLayout';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getAdminUsers, verifyUser, updateUserRole, deleteUser, getAdminStats } from '../services/adminService';
import { getMyProfile } from '../services/profileService';
import socket from '../services/socket';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState({ search: '', role: 'all', status: 'all' });
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        getMyProfile(),
        getAdminUsers(),
        getAdminStats()
      ]);

      const [profileResult, usersResult, statsResult] = results;

      // Handle profile - optional
      if (profileResult.status === 'fulfilled') {
        setAdminProfile(profileResult.value?.data || profileResult.value);
      }
      
      // Handle users - required
      if (usersResult.status === 'fulfilled') {
        const rawUsers = usersResult.value?.data || usersResult.value;
        const normalizedUsers = (Array.isArray(rawUsers) ? rawUsers : []).map((u) => ({
          ...u,
          _id: u._id || u.id,
          id: u.id || u._id,
        }));

        setUsers(normalizedUsers);

        if (id) {
          const user = normalizedUsers.find(u => u._id === id);
          setSelectedUser(user);
        }
      } else {
        throw usersResult.reason;
      }

      // Handle stats - optional
      if (statsResult.status === 'fulfilled') {
        setStats(statsResult.value?.data || statsResult.value);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleAdminEvent = (event) => {
      console.log('Admin event received:', event);
      if (event.type === 'newUser' || event.type === 'verificationUpdate') {
        fetchData();
      }
    };

    socket.on('adminEvent', handleAdminEvent);

    return () => {
      socket.off('adminEvent', handleAdminEvent);
    };
  }, [id]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = (user.profile?.fullName || user.email || '').toLowerCase().includes(filter.search.toLowerCase());
      const matchesRole = filter.role === 'all' || user.role === filter.role;
      const matchesStatus = filter.status === 'all' || 
                           (filter.status === 'verified' && user.isVerified) || 
                           (filter.status === 'unverified' && !user.isVerified);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, filter]);

  const handleVerify = async (userId, status) => {
    try {
      await verifyUser(userId, status);
      fetchData();
    } catch (err) {
      alert('Action failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      fetchData();
    } catch (err) {
      alert('Role update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you absolutely sure? This action is irreversible.')) {
      try {
        await deleteUser(userId);
        navigate('/admin/users');
        fetchData();
      } catch (err) {
        alert('Deletion failed: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const menuItems = [
    { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
    { icon: 'search', label: 'Global Search', path: '/admin/search' },
    { type: 'section', label: 'Management' },
    { icon: 'group', label: 'User Management', path: '/admin/users', active: !id },
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

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-background-light dark:bg-background-dark">
      <div className="relative size-20">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        <img src="/TC Logo.png" alt="Loading" className="absolute inset-0 size-12 m-auto animate-pulse" />
      </div>
      <p className="mt-6 text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Accessing Personnel Directory...</p>
    </div>
  );

  if (!id) {
    return (
      <DashboardLayout
        menuItems={menuItems}
        userRole="Admin Control"
        userData={userData}
        headerTitle="User Directory"
        headerSubtitle={`Managing ${users.length} registered platform entities.`}
      >
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 flex items-center gap-4">
              <span className="material-symbols-outlined text-red-500 text-2xl">error</span>
              <div className="flex-1">
                <p className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-wider">Data Load Error</p>
                <p className="text-xs text-red-600 dark:text-red-300 mt-1">{error}</p>
              </div>
              <button onClick={fetchData} className="px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-red-600 transition-all">Retry</button>
            </div>
          )}

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-card-dark p-6 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm">
             <div className="relative flex-1 min-w-[300px]">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input 
                  type="text" 
                  placeholder="Filter by name, email, or ID..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-card-dark/5 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white placeholder-slate-400"
                  value={filter.search}
                  onChange={(e) => setFilter({...filter, search: e.target.value})}
                />
             </div>
             <select 
               className="px-6 py-3 bg-slate-50 dark:bg-card-dark/5 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 cursor-pointer text-slate-500 dark:text-slate-400"
               value={filter.role}
               onChange={(e) => setFilter({...filter, role: e.target.value})}
              >
                 <option value="all">All Roles</option>
                 <option value="talent">Talent</option>
                 <option value="director">Director</option>
                 <option value="admin">Admin</option>
              </select>
              <select 
               className="px-6 py-3 bg-slate-50 dark:bg-card-dark/5 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 cursor-pointer text-slate-500 dark:text-slate-400"
               value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
             >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
             </select>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans">
                <thead>
                  <tr className="bg-slate-50 dark:bg-card-dark/5 uppercase tracking-[0.2em] text-[10px] font-black text-slate-500 border-b border-slate-200 dark:border-border-dark">
                    <th className="px-8 py-5">Personnel Identification</th>
                    <th className="px-8 py-5">Assigned Role</th>
                    <th className="px-8 py-5">Authentication</th>
                    <th className="px-8 py-5">Joined</th>
                    <th className="px-8 py-5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-16 text-center text-slate-400 uppercase font-black text-xs tracking-[0.2em] italic">No entities match the current tracking parameters.</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="group/row hover:bg-slate-50 dark:hover:bg-white dark:bg-card-dark/5 transition-all text-sm">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="size-12 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/10 p-0.5 group-hover/row:border-primary/50 transition-all">
                              <img className="w-full h-full object-cover rounded-[calc(1rem-2px)]" src={user.profile?.profilePicture && user.profile?.profilePicture !== 'no-photo.jpg' ? user.profile?.profilePicture : `https://ui-avatars.com/api/?name=${user.profile?.fullName || user.email || 'User'}&background=random`} alt="" />
                            </div>
                            <div>
                              <p className="font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-tight group-hover/row:text-primary transition-colors">{user.profile?.fullName || 'Anonymous Node'}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <div className={`size-1.5 rounded-full ${user.role === 'admin' ? 'bg-primary' : user.role === 'director' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{user.role}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg border uppercase tracking-widest ${user.isVerified ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                            {user.isVerified ? 'Authorized' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Link to={`/admin/users/${user._id}`} className="px-5 py-2 bg-slate-900 dark:bg-card-dark text-white dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg hover:scale-105 active:scale-95">Manage Node</Link>
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
  }

  return (
    <DashboardLayout
      menuItems={menuItems}
      userRole="Admin Control"
      userData={userData}
      headerTitle="Personnel Overview"
      headerSubtitle={`Investigating profile nodes for @${selectedUser?.email?.split('@')[0] || 'unknown'}`}
    >
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <Link to="/admin/users" className="hover:text-primary transition-colors">Directory</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary">{selectedUser?.profile?.fullName || 'Node Investigation'}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
           <div className="flex-1 space-y-8">
              <section className="bg-white dark:bg-card-dark rounded-[2.5rem] p-10 border border-slate-200 dark:border-border-dark shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row gap-10">
                    <div className="relative group shrink-0 self-start">
                       <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl group-hover:bg-primary/30 transition-all duration-700"></div>
                       <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-surface-dark shadow-2xl p-1 bg-white dark:bg-surface-dark transition-transform duration-700 group-hover:-rotate-3">
                          <img className="w-full h-full object-cover rounded-[2rem]" src={selectedUser?.profile?.profilePicture && selectedUser?.profile?.profilePicture !== 'no-photo.jpg' ? selectedUser?.profile?.profilePicture : `https://ui-avatars.com/api/?name=${selectedUser?.profile?.fullName || selectedUser?.email || 'User'}&background=random`} alt="" />
                       </div>
                       {selectedUser?.isVerified && (
                          <div className="absolute -bottom-3 -right-3 size-12 bg-emerald-500 rounded-2xl border-4 border-white dark:border-background-dark flex items-center justify-center text-white shadow-xl">
                             <span className="material-symbols-outlined text-xl font-black">verified</span>
                          </div>
                       )}
                    </div>
                    
                    <div className="flex-1">
                       <div className="flex flex-wrap items-center gap-4 mb-3">
                          <h1 className="text-4xl font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{selectedUser?.profile?.fullName || 'Anonymous Node'}</h1>
                          <div className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-xl uppercase tracking-[0.2em] border border-primary/20">{selectedUser?.role}</div>
                       </div>
                       <p className="text-slate-500 font-bold uppercase tracking-widest flex items-center gap-3 mb-8 text-xs font-mono">
                          <span className="material-symbols-outlined text-sm text-primary">fingerprint</span> {selectedUser?._id}
                       </p>
                       
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Connection</p>
                             <p className="text-sm font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-tight">{selectedUser?.email}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Node Origin</p>
                             <p className="text-sm font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-tight">{selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString([], { month: 'long', year: 'numeric' }) : 'N/A'}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Integrity</p>
                             <p className={`text-sm font-black uppercase tracking-tight ${selectedUser?.isVerified ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {selectedUser?.isVerified ? 'Authorized' : 'Awaiting Review'}
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>

              <section className="bg-white dark:bg-card-dark rounded-[2.5rem] p-10 border border-slate-200 dark:border-border-dark shadow-sm">
                 <h3 className="text-xl font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-tight mb-10 flex items-center gap-4">
                    <div className="size-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                       <span className="material-symbols-outlined">person_search</span>
                    </div>
                    Dossier Metadata
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Entity Biography</label>
                          <div className="p-6 bg-slate-50 dark:bg-card-dark/2 rounded-3xl border border-slate-100 dark:border-white/5 text-sm font-bold dark:text-slate-300 text-slate-600 dark:text-slate-400 leading-relaxed italic">
                             "{selectedUser?.profile?.bio || 'No strategic narrative provided for this entity.'}"
                          </div>
                       </div>
                    </div>
                    <div className="space-y-8">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Primary Deployment</label>
                          <div className="flex items-center gap-3">
                             <span className="material-symbols-outlined text-slate-400">location_on</span>
                             <p className="text-sm font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-widest">{selectedUser?.profile?.location || 'Undisclosed'}</p>
                          </div>
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Classification Tier</label>
                          <div className="flex items-center gap-3">
                             <span className="material-symbols-outlined text-slate-400">category</span>
                             <p className="text-sm font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-widest">{selectedUser?.profile?.talentCategory || 'Generalist'}</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>
           </div>

           <div className="w-full lg:w-80 space-y-8">
              <section className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-slate-200 dark:border-border-dark shadow-xl sticky top-8">
                 <h4 className="text-lg font-black dark:text-white text-slate-900 dark:text-white uppercase tracking-tight mb-8 text-center">Node Control</h4>
                 
                 <div className="space-y-6">
                    <button 
                      onClick={() => handleVerify(selectedUser._id, { verificationStatus: selectedUser?.isVerified ? 'rejected' : 'verified' })}
                      className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${selectedUser?.isVerified ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:scale-105'}`}
                    >
                       <span className="material-symbols-outlined text-lg">{selectedUser?.isVerified ? 'lock_open' : 'verified_user'}</span>
                       {selectedUser?.isVerified ? 'Revoke Auth' : 'Authorize Node'}
                    </button>

                    <div className="p-1 bg-slate-100 dark:bg-card-dark/5 rounded-2xl border border-slate-200 dark:border-white/10">
                       <p className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">Elevate Role</p>
                       <div className="grid grid-cols-2 gap-1 p-1">
                          {['talent', 'director', 'admin'].filter(r => r !== selectedUser?.role).map(role => (
                            <button 
                              key={role}
                              onClick={() => handleRoleChange(selectedUser._id, role)}
                              className="py-3 bg-white dark:bg-card-dark rounded-xl text-[9px] font-black uppercase tracking-widest dark:text-white text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all capitalize"
                            >
                               {role}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                       <button 
                        onClick={() => handleDelete(selectedUser._id)}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all group"
                       >
                          <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">delete_forever</span>
                          Erase Node Data
                       </button>
                    </div>
                 </div>

                 <div className="mt-8 p-4 bg-slate-50 dark:bg-card-dark/2 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-relaxed">
                       Warning: Operation deletions are permanent and will trigger a full cleanup of all associated artist assets.
                    </p>
                 </div>
              </section>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetail;
