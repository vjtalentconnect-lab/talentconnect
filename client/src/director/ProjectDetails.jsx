import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getProject, getProjectApplications } from '../services/projectService';
import { DIRECTOR_MENU } from '../constants/navigation';

const ProjectDetails = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [project, setProject] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, projectRes, appsRes] = await Promise.all([
                    getMyProfile(),
                    getProject(id),
                    getProjectApplications(id)
                ]);
                setProfile(profileRes.data);
                setProject(projectRes.data);
                setApplications(appsRes.data || []);
            } catch (err) {
                console.error('Error fetching project details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const userData = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : (profile?.profilePicture || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80")
    };

    if (loading) {
        return (
            <DashboardLayout
                menuItems={DIRECTOR_MENU}
                userRole="India • Director"
                userData={userData}
                headerTitle="Project Details"
                headerSubtitle="Loading details..."
                searchPlaceholder="Search roles or talent..."
            >
                <div className="flex flex-col items-center justify-center h-[60vh] bg-background-light dark:bg-background-dark min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Project Details...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (!project) {
        return (
            <DashboardLayout
                menuItems={DIRECTOR_MENU}
                userRole="India • Director"
                userData={userData}
                headerTitle="Project Details"
                headerSubtitle="Project Not Found"
            >
                <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh] bg-background-light dark:bg-background-dark min-h-screen">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">error_outline</span>
                    <h2 className="text-2xl font-bold mb-2">Project not found</h2>
                    <p className="text-slate-500 mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
                    <Link to="/director/my-projects" className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:brightness-110">Go Back</Link>
                </div>
            </DashboardLayout>
        );
    }

    // Process statistics
    const roles = project.roles || [];
    const totalRoles = roles.length;
    const stats = {
        totalRoles: totalRoles,
        leads: roles.filter(r => r.title.toLowerCase().includes('lead')).length,
        supporting: roles.filter(r => r.title.toLowerCase().includes('supporting')).length,
        others: roles.filter(r => !r.title.toLowerCase().includes('lead') && !r.title.toLowerCase().includes('supporting')).length,
        shortlisted: applications.filter(a => a.status === 'shortlisted' || a.status === 'selected').length,
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Project Details"
            headerSubtitle={`${project.title} • Manage roles, requirements, and applications.`}
            searchPlaceholder="Search roles or talent..."
        >
            <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
                <div className="p-8">
                    <section className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-slate-200 dark:border-white/5 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                        <img className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-1000" src="https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80" alt="Project Banner" />
                        <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">{project.title}</h1>
                                    <p className="text-slate-300 text-sm font-bold flex items-center gap-6 uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">calendar_today</span> Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> {project.location}</span>
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
                                        <span className="material-symbols-outlined text-sm">person_add</span> Post New Role
                                    </button>
                                    <button className="flex items-center justify-center p-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl transition-all hover:scale-105 active:scale-95">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-12">
                            {/* Project Vision */}
                            <section>
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span> Project Vision
                                </h3>
                                <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-medium mb-8 whitespace-pre-line">
                                        {project.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-100 dark:border-white/5">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Production House</p>
                                            <p className="font-bold text-primary">{profile?.companyName || "Director's Studio"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</p>
                                            <p className="font-bold">{project.category}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Budget Status</p>
                                            <p className="font-bold">{project.budget}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Role Requirements */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-primary rounded-full"></span> Active Castings
                                    </h3>
                                    <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All Roles</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {roles.length > 0 ? roles.map((role, i) => (
                                        <div key={i} className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 hover:border-primary/40 transition-all group flex flex-col justify-between shadow-sm">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{role.title}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-tight">{role.gender || 'Any Gender'} • {role.skills?.slice(0, 2).join(', ') || 'Various Skills'}</p>
                                                </div>
                                                {role.title.toLowerCase().includes('lead') && <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-1 rounded-full border border-primary/20">LEAD</span>}
                                            </div>
                                            <div className="space-y-3 mb-8">
                                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                                    <span className="text-slate-400">Age Range</span>
                                                    <span>{role.ageRange?.min || 'Any'} - {role.ageRange?.max || 'Any'} years</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                                    <span className="text-slate-400">Description</span>
                                                    <span className="truncate max-w-[120px]">{role.description}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <span className="material-symbols-outlined text-slate-400 text-lg mr-1">group</span>
                                                        <span className="font-black text-sm">{applications.length || 0}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applicants</span>
                                                </div>
                                                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">Manage <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="col-span-2 text-center p-8 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-slate-500">
                                            No explicit roles defined.
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-10">
                            {/* Casting Progress */}
                            <section>
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span> Project Tracking
                                </h3>
                                <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm space-y-8">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold uppercase tracking-widest">Total Applications</span>
                                            <span className="text-[10px] font-black text-slate-500">{applications.length} RECEIVED</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                                            <div className="bg-slate-400 h-full transition-all duration-1000" style={{ width: `${Math.min(applications.length * 2, 100)}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold uppercase tracking-widest">Shortlisted</span>
                                            <span className="text-[10px] font-black text-primary">{stats.shortlisted} OUT OF {applications.length || 1}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full transition-all duration-1000" style={{ width: applications.length ? `${(stats.shortlisted / applications.length) * 100}%` : '0%' }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold uppercase tracking-widest">Lead Roles</span>
                                            <span className="text-[10px] font-black text-slate-500">{stats.leads} SPECIFIED</span>
                                        </div>
                                    </div>
                                    
                                    <Link to={`/director/shortlists`} className="block w-full py-3.5 mt-8 text-center bg-slate-50 dark:bg-white/5 hover:bg-primary hover:text-white border border-slate-200 dark:border-white/5 hover:border-primary text-primary font-black rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all">
                                        Manage Applicants
                                    </Link>
                                </div>
                            </section>

                            {/* Core Team (Static Mock for now) */}
                            <section>
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span> Production Team
                                </h3>
                                <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                                    <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="size-10 rounded-xl bg-slate-200 overflow-hidden border border-slate-200 dark:border-white/5">
                                            <img className="w-full h-full object-cover" src={userData.avatar} alt={userData.name} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm leading-none mb-1">{userData.name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Lead Director</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="py-8 px-8 border-t border-slate-200 dark:border-border-dark text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 TalentConnect • Where Global Talent Meets Opportunity</p>
            </footer>
        </DashboardLayout>
    );
};

export default ProjectDetails;
