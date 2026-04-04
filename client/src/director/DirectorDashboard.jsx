import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import WorkshopPortalSection from '../components/WorkshopPortalSection';

import { DIRECTOR_MENU } from '../constants/navigation';

const DirectorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [stats, setStats] = useState({ shortlisted: 0, pending: 0, activeProjects: 0 });
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    try {
      const { getMyProjects, getDirectorApplications } = await import('../services/projectService');
      const [profileData, projectsData, applicationsData] = await Promise.all([
        getMyProfile(),
        getMyProjects(),
        getDirectorApplications()
      ]);
      setProfile(profileData.data);
      const rawProjects = projectsData.data || [];
      const normalizedProjects = rawProjects.map((project) => ({
        ...project,
        _id: project._id || project.id,
        id: project.id || project._id,
      }));
      setProjects(normalizedProjects);
      
      const applications = applicationsData.data || [];
      const shortlisted = applications.filter(app => app.status === 'shortlisted' || app.status === 'selected').length;
      const pending = applications.filter(app => app.status === 'applied').length;
      
      setStats({
          shortlisted,
          pending,
          activeProjects: (projectsData.data || []).length
      });
      
      // Get the most recent 4 applications for the talent showcase
      setRecentApplications(applications.slice(0, 4));
      
    } catch (err) {
      console.error('Error fetching director data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const userData = {
    name: profile?.fullName || 'Director',
    roleTitle: `${profile?.companyName || 'Production House'} • ${profile?.location || 'India'}`,
    avatar: profile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') : profile?.profilePicture
  };

  return (
    <DashboardLayout
      menuItems={DIRECTOR_MENU}
      userRole="India • Director"
      userData={userData}
      headerTitle="Director Dashboard"
      headerSubtitle="Manage your projects and discover new talent."
      searchPlaceholder="Search talent, projects..."
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Assembling the crew...</p>
        </div>
      ) : (
      <div className="space-y-6 md:space-y-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white dark:bg-[#1a1a1a] p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center gap-3 md:gap-5 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl md:text-3xl">groups</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Shortlisted</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl md:text-3xl font-black dark:text-white leading-none">{stats.shortlisted}</h3>
                <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md">+12%</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center gap-3 md:gap-5 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-2xl md:text-3xl">pending_actions</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Pending</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl md:text-3xl font-black dark:text-white leading-none">{stats.pending}</h3>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded-md uppercase">Urgent</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center gap-3 md:gap-5 shadow-sm col-span-2 lg:col-span-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl md:text-3xl">verified_user</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Projects</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl md:text-3xl font-black dark:text-white leading-none">{stats.activeProjects}</h3>
                <span className="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded-md tracking-widest uppercase">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Director Profile Snapshot */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-rose-600 overflow-hidden shadow-lg">
                <img
                  src={
                    profile?.profilePicture && profile.profilePicture !== 'no-photo.jpg'
                      ? profile.profilePicture
                      : `https://ui-avatars.com/api/?size=128&name=${encodeURIComponent(profile?.fullName || 'Director')}&background=ee2b3b&color=fff`
                  }
                  alt={profile?.fullName || 'Director'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.5em] text-slate-400 dark:text-zinc-500 font-black">Director</p>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">{profile?.fullName || 'Lead Director'}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-[0.3em] mt-1">{profile?.companyName || 'Independent Productions'}</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed min-h-[120px] overflow-hidden">
              {profile?.bio
                ? profile.bio
                : 'Crafted on-location stories and narrative experiences for feature films, ad campaigns, and artist showcases across India.'}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-zinc-400">
              <div>
                <p className="text-slate-800 dark:text-white text-[14px] font-black">{profile?.location || 'Mumbai, IN'}</p>
                <span className="text-slate-400">Base</span>
              </div>
              <div>
                <p className="text-slate-800 dark:text-white text-[14px] font-black">{profile?.projectsLed || stats.activeProjects || 'N/A'}</p>
                <span className="text-slate-400">Projects</span>
              </div>
              <div>
                <p className="text-slate-800 dark:text-white text-[14px] font-black">{profile?.languages?.join(' / ') || 'Hindi / English'}</p>
                <span className="text-slate-400">Languages</span>
              </div>
              <div>
                <p className="text-slate-800 dark:text-white text-[14px] font-black">{profile?.experienceYears || '10+'}</p>
                <span className="text-slate-400">Years</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/director/profile"
                className="flex-1 text-center px-4 py-3 bg-[#ee2b3b] text-white font-black rounded-2xl uppercase text-[10px] tracking-[0.5em] shadow-lg"
              >
                Edit Profile
              </Link>
              <Link
                to="/director/discovery"
                className="flex-1 text-center px-4 py-3 border border-white/30 text-white font-black rounded-2xl uppercase text-[10px] tracking-[0.5em]"
              >
                Discovery
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Preferred Genres', value: profile?.preferredGenres?.join(', ') || 'Drama, Thriller, Commercial' },
              { label: 'Current Availability', value: profile?.availability || 'Accepting new pitches' },
              { label: 'Production Contacts', value: profile?.contactEmail || 'studio@talentconnect.com' },
              { label: 'Representation', value: profile?.agentName || 'TalentConnect Studio' },
            ].map((item) => (
              <div key={item.label} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/10 p-4 flex flex-col justify-between shadow-sm">
                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-500 font-black">{item.label}</p>
                <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Active Projects */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2 md:gap-3">
              Active Projects
              <span className="px-2 md:px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest rounded-full font-black animate-pulse">Live</span>
            </h2>
            <Link to="/director/my-projects" className="text-sm font-bold text-primary hover:underline transition-all text-center sm:text-left">View All Projects</Link>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-6 custom-scrollbar no-scrollbar scroll-smooth">
            {projects.length === 0 ? (
              <div className="flex items-center justify-center w-full min-h-[200px]">
                <p className="text-slate-500 text-center">You haven't created any projects yet.</p>
              </div>
            ) : (
              projects.map((project) => {
                const projectId = project?._id || project?.id;
                return (
                  <div key={projectId} className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden group hover:border-primary/50 transition-all shadow-sm flex-shrink-0">
                    <div className="h-32 md:h-40 bg-slate-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80')" }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                        <span className="px-2 md:px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-lg">
                          {project?.category || 'Category'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="font-extrabold text-lg md:text-xl text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors line-clamp-2">{project?.title || 'Untitled Project'}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 md:mb-6 font-medium truncate">{project?.location || 'Location'} • {project?.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applications</span>
                        <span className="text-xs font-black text-primary">New</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(236,91,19,0.4)] transition-all duration-1000" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Recent Applications View */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Recent Applications</h2>
              <div className="flex bg-slate-100 dark:bg-card-dark rounded-xl p-1 border border-slate-200 dark:border-white/10 w-fit">
                <button className="px-3 md:px-4 py-1.5 text-[10px] font-bold bg-white dark:bg-white/10 text-primary rounded-lg shadow-sm uppercase tracking-widest">Grid</button>
                <button className="px-3 md:px-4 py-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-500 hover:text-primary transition-all uppercase tracking-widest">List</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
            {recentApplications.map((app) => {
              const artist = app?.talent?.profile || {};
              const name = artist?.fullName || app?.talent?.name || 'Unknown Artist';
              const img = artist?.profilePicture && artist.profilePicture !== 'no-photo.jpg' ? artist.profilePicture : `https://ui-avatars.com/api/?name=${name}`;
              return (
              <div key={app?._id} className="bg-white dark:bg-card-dark rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden group hover:ring-4 hover:ring-primary/10 transition-all shadow-sm">
                <div className="aspect-[3/4] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={img} alt={name} />
                  <div className="absolute top-3 md:top-4 left-3 md:left-4">
                    <span className="bg-black/40 backdrop-blur-xl text-white text-[10px] font-black px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10 shadow-xl">
                      <span className="material-symbols-outlined text-[10px] fill-current text-primary">star</span> 4.8
                    </span>
                  </div>
                  <button className="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-xl text-white hover:text-red-500 flex items-center justify-center transition-all border border-white/10 shadow-xl">
                    <span className="material-symbols-outlined text-lg md:text-xl">favorite</span>
                  </button>
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 px-4 md:px-6">
                    <Link to={`/talent/${app?.talent?.profile?.id || app?.talent?.id}`} className="w-full bg-white text-primary font-black py-2 md:py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-50 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl text-center">View Profile</Link>
                    <button className="w-full bg-primary text-white font-black py-2 md:py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-primary/90 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl delay-75">Update Status</button>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-extrabold text-base md:text-lg text-slate-900 dark:text-white leading-tight truncate pr-2">{name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider flex-shrink-0 ${app?.status === 'shortlisted' ? 'text-emerald-500 bg-emerald-500/10' : app?.status === 'applied' ? 'text-blue-500 bg-blue-500/10' : 'text-primary bg-primary/10'}`}>
                      {app?.status || 'applied'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-tight mb-3 md:mb-4 truncate">{app?.project?.title || 'Project'}</p>
                  <div className="mt-3 md:mt-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-white/5 pt-3 md:pt-4">
                    <span className="flex items-center gap-1.5 truncate"><span className="material-symbols-outlined text-xs">location_on</span>{artist?.location || 'N/A'}</span>
                    <span className="text-primary flex-shrink-0">Verified</span>
                  </div>
                </div>
              </div>
            )})}
          </div>
          <div className="mt-8 md:mt-12 flex justify-center">
            <button className="flex items-center gap-2 md:gap-3 px-8 md:px-12 py-4 md:py-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-xl active:scale-95 group">
              Load More Talent
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
            </button>
          </div>
        </section>

        {/* Workshops for directors */}
        <div className="mt-12">
          <WorkshopPortalSection variant="director" />
        </div>
      </div>
      )}
    </DashboardLayout>
  );
};

export default DirectorDashboard;
