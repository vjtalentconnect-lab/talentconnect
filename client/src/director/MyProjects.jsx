import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { DIRECTOR_MENU } from '../constants/navigation';
import socket from '../services/socket';

const MyProjects = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { getMyProjects } = await import('../services/projectService');
                const [profileResult, projectsResult] = await Promise.allSettled([
                    getMyProfile(),
                    getMyProjects()
                ]);

                if (profileResult.status === 'fulfilled') {
                    setProfile(profileResult.value.data);
                }

                const rawProjects = projectsResult.status === 'fulfilled' ? (projectsResult.value.data || []) : [];
                const normalizedProjects = rawProjects.map((project) => ({
                    ...project,
                    _id: project._id || project.id,
                    id: project.id || project._id,
                }));
                setProjects(normalizedProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    // Live updates when a project is created
    useEffect(() => {
        const handleProjectCreated = (project) => {
            const currentUserId = profile?.user?._id || profile?._id;
            const projectDirectorId = project?.director?._id || project?.director?.id || project?.director;

            // If it's my project, add it
            if (projectDirectorId === currentUserId) {
                const normalizedProject = {
                    ...project,
                    _id: project._id || project.id,
                    id: project.id || project._id,
                };
                setProjects((prev) => {
                    if (prev.find(p => p._id === normalizedProject._id || p.id === normalizedProject.id)) return prev;
                    return [normalizedProject, ...prev];
                });
            }
        };

        socket.on('projectCreated', handleProjectCreated);
        return () => {
            socket.off('projectCreated', handleProjectCreated);
        };
    }, [profile]);

    const userData = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : profile?.profilePicture
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="My Projects"
            headerSubtitle="Track and manage your active film and media productions."
            searchPlaceholder="Search projects..."
        >
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Projects...</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        {/* Tabs/Filters */}
                        <div className="flex flex-wrap border-b border-slate-200 dark:border-primary/10 mb-6 md:mb-8 gap-2 md:gap-8 overflow-x-auto no-scrollbar">
                            <button className="pb-3 md:pb-4 border-b-2 border-primary text-primary font-bold text-sm whitespace-nowrap">All Projects ({projects.length})</button>
                            <button className="pb-3 md:pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors whitespace-nowrap">Open</button>
                            <button className="pb-3 md:pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors whitespace-nowrap">Closed</button>
                            <button className="pb-3 md:pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors whitespace-nowrap">Drafts</button>
                        </div>
                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                            {projects.map((project) => {
                                const daysUntilDue = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                                const projectId = project._id || project.id;
                                return (
                                <div key={projectId} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col shadow-sm">
                                    <div className="relative h-40 md:h-48 w-full overflow-hidden shrink-0">
                                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80')" }}></div>
                                        <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${project.status === 'open' ? 'bg-primary text-white' : 'bg-slate-500 text-white'}`}>
                                                {project.status === 'open' ? 'In Production' : project.status}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex justify-between items-end z-10">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1 truncate">{project.category}</p>
                                                <h3 className="text-white text-lg md:text-xl font-black leading-tight drop-shadow-md line-clamp-2">{project.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-5 flex flex-col gap-3 md:gap-4 flex-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex -space-x-2">
                                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                    <span className="material-symbols-outlined text-sm">people</span>
                                                </div>
                                            </div>
                                            <span className={`font-bold text-xs ${daysUntilDue < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                                                {daysUntilDue < 0 ? 'Closed' : `Due in ${daysUntilDue} days`}
                                            </span>
                                        </div>
                                        <div className="mt-auto pt-3 md:pt-4 flex flex-col sm:flex-row gap-2 md:gap-3">
                                            <Link to={`/director/project/${projectId}`} className="flex-1 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-primary hover:text-white py-2 md:py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 text-center">
                                                Overview
                                            </Link>
                                            <Link to={`/director/project/${projectId}/auditions`} className="flex-1 bg-primary text-white hover:brightness-110 py-2 md:py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-center">
                                                Auditions
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )})}
                            {/* Start New Production */}
                            <Link to="/director/create-project/step1" className="border-2 border-dashed border-slate-200 dark:border-primary/20 rounded-xl flex flex-col items-center justify-center p-6 md:p-8 min-h-[300px] md:min-h-[340px] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-2xl md:text-3xl text-slate-400 group-hover:text-primary transition-colors">add_to_photos</span>
                                </div>
                                <h4 className="font-bold text-base md:text-lg mb-1 text-slate-900 dark:text-white text-center">Start New Production</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm text-center">Post a new project and start casting immediately.</p>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyProjects;
