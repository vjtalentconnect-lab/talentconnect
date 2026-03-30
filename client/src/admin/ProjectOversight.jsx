import DashboardLayout from '../components/layout/DashboardLayout';
import { useState, useEffect, useMemo } from 'react';
import { getAdminProjects, getAdminStats, updateProjectStatus, deleteProject } from '../services/adminService';
import { getMyProfile } from '../services/profileService';
import { Link } from 'react-router-dom';
import socket from '../services/socket';

const ProjectOversight = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ search: '', category: 'all', status: 'all' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        getAdminProjects(),
        getAdminStats(),
        getMyProfile()
      ]);
      const [projectsResult, statsResult, profileResult] = results;

      // Handle projects - required
      if (projectsResult.status === 'fulfilled') {
        const projData = projectsResult.value?.data || projectsResult.value;
        setProjects(Array.isArray(projData) ? projData : []);
      } else {
        throw projectsResult.reason;
      }

      // Handle stats - optional
      if (statsResult.status === 'fulfilled') {
        setStats(statsResult.value?.data || statsResult.value);
      }

      // Handle profile - optional
      if (profileResult.status === 'fulfilled') {
        setAdminProfile(profileResult.value?.data || profileResult.value);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching oversight data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleProjectCreated = (project) => {
      setProjects(prev => {
        if (prev.find(p => p._id === project._id)) return prev;
        return [project, ...prev];
      });
      setStats(prev => ({ ...prev, totalProjects: (prev?.totalProjects || 0) + 1 }));
    };
    socket.on('projectCreated', handleProjectCreated);
    return () => socket.off('projectCreated', handleProjectCreated);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = (project.title || '').toLowerCase().includes(filter.search.toLowerCase()) ||
                          (project.director?.fullName || project.director?.email || '').toLowerCase().includes(filter.search.toLowerCase());
      const matchesCategory = filter.category === 'all' || project.category === filter.category;
      const matchesStatus = filter.status === 'all' || project.status === filter.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, filter]);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await updateProjectStatus(projectId, newStatus);
      fetchData();
    } catch (err) {
      console.error('Status update failed:', err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Erase this project from platform history? All associated roles and applications will be purged.')) {
      try {
        await deleteProject(projectId);
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
    { icon: 'group', label: 'User Management', path: '/admin/users' },
    { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: stats?.pendingVerifications?.toString() },
    { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects', active: true },
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
      <div className="relative size-24">
        <div className="absolute inset-0 rounded-full border-[3px] border-primary/20 border-t-primary animate-spin"></div>
        <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-4xl text-primary animate-pulse">account_tree</span>
      </div>
      <p className="mt-8 text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing Production Assets...</p>
    </div>
  );

  return (
    <DashboardLayout
      menuItems={menuItems}
      userRole="Admin Control"
      userData={userData}
      headerTitle="Project Oversight"
      headerSubtitle={`Auditing ${projects.length} active creative pipelines.`}
    >
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
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

        {/* Intelligence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Platform Projects', value: stats?.totalProjects || '0', icon: 'movie', color: 'primary' },
            { label: 'Active Pipeline', value: projects.filter(p => p.status === 'open').length, icon: 'bolt', color: 'emerald' },
            { label: 'Moderation Queue', value: projects.filter(p => !['open'].includes(p.status)).length, icon: 'policy', color: 'amber' },
            { 
              label: 'Market Value', 
              value: (stats?.totalProductionValue || 0) >= 100 
                ? '₹' + (stats.totalProductionValue / 100).toFixed(1) + ' Cr' 
                : '₹' + (stats?.totalProductionValue || '0') + ' L', 
              icon: 'token', 
              color: 'blue' 
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-card-dark p-6 rounded-[2rem] border border-slate-200 dark:border-border-dark flex flex-col gap-4 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 group">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{card.label}</span>
                <div className={`size-10 rounded-xl bg-${card.color}-500/10 text-${card.color}-500 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-xl">{card.icon}</span>
                </div>
              </div>
              <p className="text-3xl font-black dark:text-white text-slate-900 uppercase tracking-tighter">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-card-dark p-6 rounded-[2.5rem] border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="relative flex-1 min-w-[300px]">
             <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">search</span>
             <input 
              type="text" 
              placeholder="Search pipelines by title or director..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/2 border-none rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white placeholder-slate-400"
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
             />
          </div>
          <div className="flex gap-3">
             <select 
              className="px-6 py-4 bg-slate-50 dark:bg-white/2 border-none rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] focus:ring-2 focus:ring-primary/20 cursor-pointer text-slate-500 dark:text-slate-400"
              value={filter.category}
              onChange={(e) => setFilter({...filter, category: e.target.value})}
             >
                <option value="all">All Disciplines</option>
                <option value="Feature Film">Feature Film</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Web Series">Web Series</option>
                <option value="Theater">Theater</option>
             </select>
             <select 
              className="px-6 py-4 bg-slate-50 dark:bg-white/2 border-none rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] focus:ring-2 focus:ring-primary/20 cursor-pointer text-slate-500 dark:text-slate-400"
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
             >
                 <option value="all">Global Status</option>
                 <option value="open">Open</option>
                 <option value="closed">Closed</option>
                 <option value="draft">Draft</option>
             </select>
          </div>
        </div>

        {/* Fleet Management Table */}
        <div className="bg-white dark:bg-card-dark rounded-[2.5rem] border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/2 uppercase tracking-[0.3em] text-[10px] font-black text-slate-400 border-b border-slate-200 dark:border-border-dark font-mono">
                  <th className="px-10 py-6">Production ID & Title</th>
                  <th className="px-10 py-6">Directorate</th>
                  <th className="px-10 py-6">Operational Status</th>
                  <th className="px-10 py-6 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-10 py-20 text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-relaxed">No production nodes match the current filter parameters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project._id || project.id} className="group/row hover:bg-slate-50 dark:hover:bg-white/2 transition-all duration-300">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="relative shrink-0">
                              <div className="size-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10 flex items-center justify-center group-hover/row:scale-105 transition-transform duration-500 overflow-hidden border border-slate-200 dark:border-white/5 p-1">
                                  {project.poster ? (
                                     <img src={project.poster} className="w-full h-full object-cover rounded-[calc(1rem-4px)]" alt="" />
                                  ) : (
                                     <span className="material-symbols-outlined text-slate-400 text-3xl">movie_filter</span>
                                  )}
                               </div>
                              <div className="absolute -top-1 -right-1 size-4 rounded-full bg-primary border-2 border-white dark:border-card-dark animate-pulse"></div>
                           </div>
                           <div>
                              <p className="font-black dark:text-white text-slate-900 uppercase tracking-tighter text-lg leading-none mb-1 group-hover/row:text-primary transition-colors">{project.title}</p>
                              <div className="flex items-center gap-2">
                                 <span className="text-[9px] font-black text-primary uppercase tracking-widest">{project.category}</span>
                                 <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">/ {project.location}</span>
                              </div>
                           </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl border-2 border-slate-200 dark:border-white/5 overflow-hidden p-0.5">
                               <img src={project.director?.profilePicture ? project.director.profilePicture : `https://ui-avatars.com/api/?name=${project.director?.fullName || project.director?.email || 'Director'}&background=random`} className="w-full h-full object-cover rounded-lg" alt="" />
                            </div>
                            <div>
                               <p className="font-black dark:text-slate-200 text-slate-700 uppercase tracking-tight text-xs">{project.director?.fullName || project.director?.email || 'N/A'}</p>
                               <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono italic">Creator node</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                         <div className="space-y-3 max-w-[180px]">
                            <div className="flex justify-between items-end">
                               <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                  project.status === 'open' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                  project.status === 'closed' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                  'bg-slate-500/10 text-slate-500 border-slate-500/20'
                               }`}>
                                  {project.status || 'draft'}
                               </span>
                               <span className="text-[10px] font-bold text-slate-400">{project.applications?.length || 0} Apps</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                         <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-2">
                               <button 
                                onClick={() => handleStatusChange(project._id, project.status === 'open' ? 'closed' : 'open')}
                                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
                               >
                                  {project.status === 'open' ? 'Close Project' : 'Reopen'}
                               </button>
                               <button 
                                onClick={() => handleDelete(project._id)}
                                className="px-3 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
                                title="Purge Production"
                               >
                                  <span className="material-symbols-outlined text-lg">delete_sweep</span>
                               </button>
                            </div>
                            <Link to={`/admin/projects/${project._id}`} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors hover:underline">Full Asset Review</Link>
                         </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <span className="size-2 rounded-full bg-primary animate-ping"></span>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] font-mono">Platform Integrity Monitoring: Operational</p>
            </div>
            <div className="flex gap-2">
              <button className="px-5 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-lg">arrow_back_ios</span>
              </button>
              <div className="flex gap-1.5">
                 {[1, 2, 3].map(n => (
                    <button key={n} className={`size-12 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all ${n === 1 ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-primary'}`}>
                       {n}
                    </button>
                 ))}
              </div>
              <button className="px-5 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-lg">arrow_forward_ios</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectOversight;
