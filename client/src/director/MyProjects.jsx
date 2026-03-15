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
                const [profileRes, projectsRes] = await Promise.all([
                    getMyProfile(),
                    getMyProjects()
                ]);
                setProfile(profileRes.data);
                setProjects(projectsRes.data || []);
            } catch (err) {
                console.error('Error fetching director data:', err);
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
            // If it's my project, add it
            if (project?.director?._id === currentUserId || project?.director === currentUserId) {
                setProjects((prev) => {
                    if (prev.find(p => p._id === project._id)) return prev;
                    return [project, ...prev];
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
                        <div className="flex border-b border-slate-200 dark:border-primary/10 mb-8 gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
                            <button className="pb-4 border-b-2 border-primary text-primary font-bold text-sm">All Projects ({projects.length})</button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors">Open</button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors">Closed</button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-colors">Drafts</button>
                        </div>
                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {projects.map((project) => {
                                const daysUntilDue = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                                return (
                                <div key={project._id} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col">
                                    <div className="relative h-48 w-full overflow-hidden shrink-0">
                                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80')" }}></div>
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${project.status === 'open' ? 'bg-primary text-white' : 'bg-slate-500 text-white'}`}>
                                                {project.status === 'open' ? 'In Production' : project.status}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                                            <div>
                                                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">{project.category}</p>
                                                <h3 className="text-white text-xl font-black leading-tight drop-shadow-md">{project.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-4 flex-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                    <span className="material-symbols-outlined text-sm">people</span>
                                                </div>
                                            </div>
                                            <span className={`font-bold text-xs ${daysUntilDue < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                                                {daysUntilDue < 0 ? 'Closed' : `Due in ${daysUntilDue} days`}
                                            </span>
                                        </div>
                                        <div className="mt-auto pt-4 flex gap-3">
                                            <Link to={`/director/project/${project._id}`} className="flex-1 bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                                                Overview
                                            </Link>
                                            <Link to={`/director/project/${project._id}/auditions`} className="flex-1 bg-primary text-white hover:brightness-110 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                                Auditions
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )})}
                            {/* Start New Production */}
                            <Link to="/director/create-project/step1" className="border-2 border-dashed border-slate-200 dark:border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 min-h-[340px] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">add_to_photos</span>
                                </div>
                                <h4 className="font-bold text-lg mb-1 dark:text-white">Start New Production</h4>
                                <p className="text-slate-500 text-sm text-center">Post a new project and start casting immediately.</p>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyProjects;
