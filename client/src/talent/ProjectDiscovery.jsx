import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getProjects, applyToProject } from '../services/projectService';
import { getMyProfile } from '../services/profileService';
import { TALENT_MENU } from '../constants/navigation';

const ProjectDiscovery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        budget: '',
    });

    const categories = ['Film', 'Advertisement', 'Music Video', 'TV Series', 'Web Series', 'Short Film'];

    const fetchData = async () => {
        setLoading(true);
        try {
            const [profileData, projectsData] = await Promise.all([
                getMyProfile(),
                getProjects(filters)
            ]);
            setProfile(profileData.data);
            setProjects(projectsData.data);
        } catch (err) {
            console.error('Error fetching discovery data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        fetchData();
    };

    const handleApply = async (projectId) => {
        try {
            await applyToProject(projectId);
            alert('Application submitted successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error applying to project');
        }
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Artist'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') : profile?.profilePicture
    };

    return (
        <DashboardLayout
            menuItems={TALENT_MENU}
            userRole="India • Artist"
            userData={userData}
            headerTitle="Project Discovery"
            headerSubtitle="Explore the latest casting calls and career-defining roles."
            searchPlaceholder="Search project titles..."
        >
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter italic">Filters</h3>
                            <button onClick={() => setFilters({ category: '', location: '', budget: '' })} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Reset</button>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Project Category</label>
                                <select 
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Location</label>
                                <input 
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    placeholder="e.g. Mumbai"
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Budget Target</label>
                                <input 
                                    name="budget"
                                    value={filters.budget}
                                    onChange={handleFilterChange}
                                    placeholder="e.g. 50k"
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <button 
                                onClick={applyFilters}
                                className="w-full bg-primary text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Project Grid */}
                <div className="lg:col-span-9">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-96 space-y-4">
                            <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Searching roles...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-16 text-center shadow-sm">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-6">movie_filter</span>
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2 italic">No Projects Available</h3>
                            <p className="text-slate-500 text-sm font-medium">No open casting calls match your current filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <div key={project._id} className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 hover:border-primary/50 transition-all group shadow-sm">
                                    <div className="flex items-start gap-6">
                                        <div className="w-24 h-32 rounded-2xl overflow-hidden bg-slate-200 flex-shrink-0 shadow-lg border border-white/5">
                                            <img
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                src="https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-black group-hover:text-primary transition-colors dark:text-white uppercase tracking-tight italic">{project.title}</h3>
                                                    <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{project.director?.email?.split('@')[0] || 'Director'} • {project.category}</p>
                                                </div>
                                                <span className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl shadow-primary/20">
                                                    Open
                                                </span>
                                            </div>
                                            <div className="mt-6 flex flex-wrap gap-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <span className="material-symbols-outlined text-sm text-primary">location_on</span> {project.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm text-primary">calendar_today</span> {new Date(project.deadline).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Budget: <span className="text-primary italic">{project.budget}</span></div>
                                                <button 
                                                    onClick={() => handleApply(project._id)}
                                                    className="text-[10px] font-black px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all uppercase tracking-widest shadow-lg shadow-primary/10 active:scale-95"
                                                >
                                                    Apply Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProjectDiscovery;
