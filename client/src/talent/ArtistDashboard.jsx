import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getProjects } from '../services/projectService';
import MediaUpload from '../components/common/MediaUpload';
import NotificationCenter from '../components/common/NotificationCenter';
import { applyToProject as applyApi } from '../services/projectService';

import { TALENT_MENU } from '../constants/navigation';

const ArtistDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    try {
      const [profileData, projectsData] = await Promise.all([
        getMyProfile(),
        getProjects()
      ]);
      setProfile(profileData.data);
      setProjects(projectsData.data.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleUploadSuccess = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleApply = async (projectId) => {
    try {
      await applyApi(projectId);
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying to project');
    }
  };

  const userData = {
    name: profile?.fullName || 'Artist',
    roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
    avatar: profile?.profilePicture === 'no-photo.jpg' 
      ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
      : profile?.profilePicture
  };

  return (
    <DashboardLayout
      menuItems={TALENT_MENU}
      userRole="India • Artist"
      userData={userData}
      headerTitle="Artist Dashboard"
      headerSubtitle={loading ? "Loading your dashboard..." : `Welcome back, ${profile?.fullName?.split(' ')[0] || 'Aryan'}! Your profile is trending.`}
      searchPlaceholder="Search projects... "
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Preparing your stage...</p>
        </div>
      ) : (
      <div className="space-y-8">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-[#0f1115] p-10 text-white border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group shrink-0">
                    <div className="size-32 rounded-full p-1.5 border-4 border-primary/20 bg-cover bg-center shadow-2xl transition-all group-hover:border-primary/50 overflow-hidden" 
                         style={{ backgroundImage: `url('${profile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') : profile?.profilePicture}')` }}>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <MediaUpload type="profilePicture" onUploadSuccess={handleUploadSuccess} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 italic">
                      Welcome, <span className="text-primary not-italic">{profile?.fullName?.split(' ')[0] || 'Talent'}</span>
                    </h2>
                    <p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mt-2">
                        <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                        {profile?.location || 'India'} • {profile?.talentCategory || 'Artist'}
                    </p>
                  </div>
                </div>
              <p className="text-slate-400 text-lg mt-8 font-medium italic">Your profile has been completed and is now being visible to major production houses. Keep it updated!</p>
              <div className="flex gap-4 mt-10">
                <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20">
                  <span className="material-symbols-outlined text-xl">send</span> View Invites
                </button>
                <Link to="/talent/portfolio" className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                  Update Portfolio
                </Link>
              </div>
            </div>
            <div className="hidden lg:block w-48 h-48 relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img
                alt="Dashboard Illustration"
                className="relative z-10 drop-shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR8ROtSqiuCa9EuAEsjD36hMzCTgk9m3BbUCnMt2agd8pBu7YM74aPumqdVdV8fnWFF8aWrhm1Xrx1Ac_X9vQRPp4vyIKdRg6uRWwpWXYV0hjoQbs0Hg8ooemFU3FEeFhoKs3md52FyBqoSJzs7rsJCwXMOtaUEpdEjN9wh7ysfkutRGGYT5voE-LXovuhcWh1ug5tvuHNOxyrSQ2CApicCXZSJ0hxK402LugHDJSdj9a8bYbHmByUjgDi64BV8xhoz3KPjH3zMHjY"
              />
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0f1115] p-8 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/5">
              <span className="material-symbols-outlined text-3xl">description</span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Applications</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter italic">24</h3>
                <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-md flex items-center">+12%</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0f1115] p-8 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xl shadow-primary/5">
              <span className="material-symbols-outlined text-3xl">mail</span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Audition Invites</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter italic">5</h3>
                <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-md flex items-center">+3%</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0f1115] p-8 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/5">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Profile Views</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter italic">1.2k</h3>
                <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-md flex items-center">+18%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Applications */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter italic">Available Projects</h2>
              <Link to="/talent/discovery" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline transition-all">View All Projects</Link>
            </div>
            <div className="space-y-6">
              {projects.length === 0 ? (
                <p className="text-slate-500">No projects available at the moment.</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-6 hover:border-primary/50 transition-all group shadow-sm">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden bg-slate-200 flex-shrink-0 shadow-lg border border-white/5">
                        <img
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-black group-hover:text-primary transition-colors dark:text-white uppercase tracking-tight italic">{project.title}</h3>
                            <p className="text-px text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{project.director.email.split('@')[0]} • {project.category}</p>
                          </div>
                          <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl shadow-primary/20">
                            Verified
                          </span>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-sm text-primary">location_on</span> {project.location}
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-sm text-primary">person</span> {project.requirements[0] || 'Multiple Roles'}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">calendar_today</span> {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                           <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Budget: <span className="text-primary italic">{project.budget}</span></div>
                          <button 
                            onClick={() => handleApply(project._id)}
                            className="text-[11px] font-black px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all uppercase tracking-widest shadow-lg shadow-primary/10 active:scale-95"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-8">
            {/* Profile Strength Widget */}
            <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-black mb-6 dark:text-white uppercase tracking-tighter italic">Profile Strength</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-slate-100 dark:text-white/5" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeWidth="6"></circle>
                    <circle className="text-primary" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeDasharray="226.2" strokeDashoffset="67.8" strokeWidth="6" strokeLinecap="round"></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black dark:text-white italic">70%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic leading-none">Almost there!</p>
                  <p className="text-[11px] text-slate-500 mt-2 font-bold uppercase tracking-widest">Complete profile = 5x more invites.</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Next Steps</p>
                <div className="flex items-start gap-4 p-4 bg-primary/5 border border-primary/10 rounded-2xl group cursor-pointer hover:bg-primary/10 transition-all border-dashed">
                  <span className="material-symbols-outlined text-primary text-xl">play_circle</span>
                  <div>
                    <p className="text-xs font-black dark:text-white uppercase tracking-tight">Add a showreel</p>
                    <p className="text-[10px] text-slate-500 font-bold italic mt-1">+40% view increase</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl group cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-all border-dashed">
                  <span className="material-symbols-outlined text-slate-400 text-xl">photo_library</span>
                  <div>
                    <p className="text-xs font-black dark:text-white uppercase tracking-tight">Update headshots</p>
                    <p className="text-[10px] text-slate-500 font-bold italic mt-1">Last update 6m ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Auditions */}
            <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter italic">Upcoming</h2>
                <span className="material-symbols-outlined text-primary">calendar_month</span>
              </div>
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-primary">
                  <div className="absolute -left-[5.5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20"></div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Tomorrow • 2:00 PM</p>
                  <h4 className="text-md font-black mt-2 dark:text-white uppercase tracking-tight italic">The Last Dynasty</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Final Callback • Studio 4B</p>
                  <div className="flex items-center gap-3 mt-5">
                    <button className="px-4 py-2 bg-primary text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20">View Script</button>
                    <button className="px-4 py-2 bg-white/10 text-white text-[10px] font-black rounded-xl uppercase tracking-widest">Map</button>
                  </div>
                </div>
                <div className="relative pl-8 border-l-2 border-slate-200 dark:border-white/10">
                  <div className="absolute -left-[5.5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Oct 26 • 11:30 AM</p>
                  <p className="text-md font-black mt-2 dark:text-white uppercase tracking-tight italic">Soft Drink Ad</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Screen Test • Virtual</p>
                  <div className="flex items-center gap-3 mt-5">
                    <button className="px-4 py-2 bg-white/10 text-white text-[10px] font-black rounded-xl uppercase tracking-widest">Join Zoom</button>
                  </div>
                </div>
              </div>
              <button className="w-full mt-10 py-4 text-[10px] font-black text-slate-500 hover:text-primary transition-all border-t border-slate-100 dark:border-white/5 pt-6 uppercase tracking-[0.3em]">
                Full Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </DashboardLayout>
  );
};

export default ArtistDashboard;
