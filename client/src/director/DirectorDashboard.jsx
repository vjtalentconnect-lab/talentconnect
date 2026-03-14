import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getProjects } from '../services/projectService';
import MediaUpload from '../components/common/MediaUpload';
import NotificationCenter from '../components/common/NotificationCenter';

import { DIRECTOR_MENU } from '../constants/navigation';

const DirectorDashboard = () => {
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
      setProjects(projectsData.data);
    } catch (err) {
      console.error('Error fetching director data:', err);
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
      <div className="space-y-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex items-center gap-5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Shortlisted</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter">1,284</h3>
                <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md flex items-center">+12%</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex items-center gap-5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-3xl">pending_actions</span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Auditions</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter">42</h3>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded-md flex items-center uppercase">8 Urgent</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex items-center gap-5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Projects</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter">{projects.length}</h3>
                <span className="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded-md tracking-widest uppercase">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              Active Projects
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest rounded-full font-black animate-pulse">Live</span>
            </h2>
            <Link to="/director/my-projects" className="text-sm font-bold text-primary hover:underline transition-all">View All Projects</Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar no-scrollbar scroll-smooth">
            {projects.length === 0 ? (
              <p className="text-slate-500">You haven't created any projects yet.</p>
            ) : (
              projects.map((project) => (
                <div key={project._id} className="min-w-[340px] bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden group hover:border-primary/50 transition-all shadow-sm">
                  <div className="h-40 bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">{project.location} • {new Date(project.deadline).toLocaleDateString()}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applications</span>
                      <span className="text-xs font-black text-primary">New</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(236,91,19,0.4)] transition-all duration-1000" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Shortlisted Talents View */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Recent Shortlists</h2>
              <div className="flex bg-slate-100 dark:bg-card-dark rounded-xl p-1 border border-slate-200 dark:border-white/10">
                <button className="px-4 py-1.5 text-[10px] font-bold bg-white dark:bg-white/10 text-primary rounded-lg shadow-sm uppercase tracking-widest">Grid</button>
                <button className="px-4 py-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-500 hover:text-primary transition-all uppercase tracking-widest">List</button>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white hover:border-primary transition-all shadow-sm">
                <span className="material-symbols-outlined text-sm">filter_alt</span> Filter
              </button>
              <button className="flex items-center gap-2 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white hover:border-primary transition-all shadow-sm">
                <span className="material-symbols-outlined text-sm">sort</span> Sort
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 1, name: 'Aryan Sharma', role: 'Lead Male • 22-28 yrs', location: 'Mumbai', status: 'Shortlisted', rating: '4.9', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLYp_XfeL-orI8XcrCRdO1AnTOKeAB7-yfwUGYVWhucYLUaG37OtJlNyL40rrBQ6modrbUj4bLYcYVSDkdBHVfcTLWKr4hcZSb7Ey78SL_-TNLGgng5UWRqlWSusV4UKVF5ZpHNVzdxRNDsqaAhz4u5QeG9xFv9BzrDAjAQNavfyfafA_THv6Dawi8FJj7g-AhWDAh-Na8xGac0mjxYs8FCAGH0CcIomPvkMpq1573qVYNQvhdW3njPRmyckqOHwM_gO-8JNXKKe72' },
              { id: 2, name: 'Kiara Advani', role: 'Supporting • 25-30 yrs', location: 'Delhi', status: 'Contacted', rating: '4.8', statusColor: 'text-blue-500 bg-blue-500/10', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZBh7xbmWXrUAEm9h_1ydGDzcwhkdf2YsWZp51N2W5XLxLEDgcMM6_Q45uwNDRWlrN5uP1ZiIRnpXEF7ybhmP1q5LoCKX1DqTBo1iFqLVvULs9X9FwpvYjvqJYtCOABdgcjL3SaQFmqbvF0LMm5WIQSQZ5JJ_o3nx2j-eArSXFm8CzB1jHApIMexXGYK0s1pJ_lefBSJ0KF9s5HWKmGW0HD53HMUGYvJMLsDE0uJcZgi5VJ_N24uHuMDEfE1yzidlc_YOWqp8sEBL5' },
              { id: 3, name: 'Vikram Rathore', role: 'Villain Role • 35-45 yrs', location: 'Bangalore', status: 'Auditioning', rating: '5.0', statusColor: 'text-orange-500 bg-orange-500/10', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY5_xh61Ha6V8MRXMuofOo64PTkj3IyPuYjk6uCHwk1p8iwU1ycCql7G9Y_EK0UrGH4vZ8a4OsgKiBrTHMuyuvUHgjCIAvige_W13Pr_WF1ofwzBggz6gxrQo_m_tUJb93iYB3BPxUqyBsI2d8VXKYptCgUaKc0EQP952hcMMX3BURzCIZupaaRNZA3W94MVoUg9_496eh6EB7sqILQ9jliHKAEotUfXq0160edcDKmPh5LPeT5Wbd3qyDL-oPKSDQ-8UbpglOkifn' },
              { id: 4, name: 'Sameer Khanna', role: 'Child Artist • 8-12 yrs', location: 'Mumbai', status: 'Shortlisted', rating: '4.7', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-7VxJhRsdyxc3S1Qh3gTfaz00tdvqACWGZe4ncEGt6KNekxowT1I2Bu2vcTEXC9dWalq9zef51MN7uUpeMAEFztT0GFkm-8JHFph2yq6XvmqsHxIQDoRNbuLsNIYdKYCt2rX_oFszR3g3mAJTqrzVDtFTk7VM4GmaY0FroBKI3EENzIEjFFFeDHYGypVWzXbH-AUT5l5Oq0KA-uaBVKDkZvDdelrXnqnqT1iKxo8ma2D6Az8LSbxgX1eK4XJD1lRJl6F2BkuJpaft' },
            ].map((artist) => (
              <div key={artist.id} className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden group hover:ring-4 hover:ring-primary/10 transition-all shadow-sm">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={artist.img} alt={artist.name} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/40 backdrop-blur-xl text-white text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10 shadow-xl">
                      <span className="material-symbols-outlined text-[10px] fill-current text-primary">star</span> {artist.rating}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl text-white hover:text-red-500 flex items-center justify-center transition-all border border-white/10 shadow-xl">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 px-6">
                    <button className="w-full bg-white text-primary font-black py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-50 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl">View Profile</button>
                    <button className="w-full bg-primary text-white font-black py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-primary/90 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl delay-75">Invite Audition</button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">{artist.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider ${artist.statusColor || 'text-primary bg-primary/10'}`}>
                      {artist.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-tight mb-4">{artist.role}</p>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">location_on</span>{artist.location}</span>
                    <span className="text-primary">Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button className="flex items-center gap-3 px-12 py-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-xl active:scale-95 group">
              Load More Talent
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
            </button>
          </div>
        </section>
      </div>
      )}
    </DashboardLayout>
  );
};

export default DirectorDashboard;
