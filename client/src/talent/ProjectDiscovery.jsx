import React, { useState, useEffect, useRef, useCallback } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getProjects, applyToProject, getMyApplications } from '../services/projectService';
import { getMyProfile } from '../services/profileService';
import { TALENT_MENU } from '../constants/navigation';
import socket from '../services/socket';
import { useNotifications } from '../context/NotificationContext';

const CATEGORIES = ['Film', 'Advertisement', 'Music Video', 'TV Series', 'Web Series', 'Short Film'];

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-3 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const ProjectDiscovery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [filters, setFilters] = useState({ category: '', location: '', budget: '', title: '' });
    const [appliedIds, setAppliedIds] = useState(new Set());
    const [applyingIds, setApplyingIds] = useState(new Set());
    const [toast, setToast] = useState(null);
    const debounceRef = useRef(null);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const fetchData = useCallback(async (currentFilters) => {
        setLoading(true);
        try {
            const [profileRes, projectsRes, appsRes] = await Promise.all([
                getMyProfile(),
                getProjects(currentFilters),
                getMyApplications(),
            ]);
            setProfile(profileRes.data);
            setProjects(projectsRes.data);
            const applied = new Set(appsRes.data.map(a => a.project?._id || a.project));
            setAppliedIds(applied);
        } catch (err) {
            console.error('Error fetching discovery data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(filters); }, []);

    useEffect(() => {
        const handleProjectCreated = (project) => {
            if (project.status === 'open') {
                setProjects((prev) => {
                    if (prev.find(p => p._id === project._id)) return prev;
                    return [project, ...prev];
                });
            }
        };
        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchData);
        return () => window.removeEventListener('userStateChange', fetchData);
    }, []);

    const handleFilterChange = (e) => {
        const updated = { ...filters, [e.target.name]: e.target.value };
        setFilters(updated);
        if (e.target.name === 'title') {
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => fetchData(updated), 350);
        }
    };

    const applyFilters = () => fetchData(filters);
    const resetFilters = () => {
        const reset = { category: '', location: '', budget: '', title: '' };
        setFilters(reset);
        fetchData(reset);
    };

    const handleApply = async (projectId) => {
        if (appliedIds.has(projectId) || applyingIds.has(projectId)) return;
        setApplyingIds(prev => new Set([...prev, projectId]));
        try {
            await applyToProject(projectId);
            setAppliedIds(prev => new Set([...prev, projectId]));
            showToast('Application submitted successfully!', 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Error applying to project', 'error');
        } finally {
            setApplyingIds(prev => { const s = new Set(prev); s.delete(projectId); return s; });
        }
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Artist'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') : profile?.profilePicture,
    };

    const verificationStatus = profile?.user?.verificationStatus || authUser?.verificationStatus || 'none';

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData} verificationStatus={verificationStatus}
            headerTitle="Project Discovery"
            headerSubtitle="Explore the latest casting calls and career-defining roles."
            searchPlaceholder="Search project titles...">
            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter italic">Filters</h3>
                            <button onClick={resetFilters} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Reset</button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Search Title</label>
                                <input name="title" value={filters.title} onChange={handleFilterChange}
                                    placeholder="e.g. Dynasty..."
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"/>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Category</label>
                                <select name="category" value={filters.category} onChange={handleFilterChange}
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none">
                                    <option value="">All Categories</option>
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Location</label>
                                <input name="location" value={filters.location} onChange={handleFilterChange}
                                    placeholder="e.g. Mumbai"
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"/>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Budget Target</label>
                                <input name="budget" value={filters.budget} onChange={handleFilterChange}
                                    placeholder="e.g. 50k"
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"/>
                            </div>
                            <button onClick={applyFilters}
                                className="w-full bg-primary text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">tune</span> Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Applied Count */}
                    {appliedIds.size > 0 && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-center">
                            <span className="material-symbols-outlined text-green-500 text-2xl">check_circle</span>
                            <p className="text-green-500 font-black text-sm mt-2 uppercase tracking-widest">{appliedIds.size} Applied</p>
                        </div>
                    )}
                </aside>

                {/* Project Grid */}
                <div className="lg:col-span-9">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-96 space-y-4">
                            <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Searching roles...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="bg-white dark:bg-[#0f1115] border border-dashed border-slate-200 dark:border-white/5 rounded-3xl p-16 text-center shadow-sm">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-6 block">movie_filter</span>
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2 italic">No Projects Found</h3>
                            <p className="text-slate-500 text-sm font-medium">Try adjusting your filters or check back later.</p>
                            <button onClick={resetFilters} className="mt-6 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all">Clear Filters</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project) => {
                                const isApplied = appliedIds.has(project._id);
                                const isApplying = applyingIds.has(project._id);
                                return (
                                    <div key={project._id}
                                        className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 hover:border-primary/50 transition-all group shadow-sm relative overflow-hidden">
                                        {isApplied && (
                                            <div className="absolute top-4 right-4 z-10 bg-green-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                                <span className="material-symbols-outlined text-xs">check</span> Applied
                                            </div>
                                        )}
                                        <div className="flex items-start gap-6">
                                            <div className="w-24 h-32 rounded-2xl overflow-hidden bg-slate-200 flex-shrink-0 shadow-lg border border-white/5">
                                                <img alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    src="https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80"/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="min-w-0">
                                                        <h3 className="text-xl font-black group-hover:text-primary transition-colors dark:text-white uppercase tracking-tight italic truncate">{project.title}</h3>
                                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 truncate">
                                                            {project.director?.email?.split('@')[0] || 'Director'} • {project.category}
                                                        </p>
                                                    </div>
                                                    {!isApplied && (
                                                        <span className="shrink-0 px-2.5 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl shadow-primary/20">Open</span>
                                                    )}
                                                </div>
                                                <div className="mt-4 flex flex-wrap gap-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>{project.location}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                                                        {new Date(project.deadline).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                        Budget: <span className="text-primary italic">{project.budget}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleApply(project._id)}
                                                        disabled={isApplied || isApplying}
                                                        className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-lg ${
                                                            isApplied
                                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-default'
                                                                : 'bg-primary text-white hover:bg-primary/90 shadow-primary/10 hover:scale-105'
                                                        }`}
                                                    >
                                                        {isApplying ? (
                                                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                                        ) : isApplied ? (
                                                            <><span className="material-symbols-outlined text-sm">check</span> Applied</>
                                                        ) : 'Apply Now'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProjectDiscovery;
