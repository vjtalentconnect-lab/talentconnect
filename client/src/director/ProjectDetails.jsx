import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getProject, getProjectApplications, updateProject, applyToProject, updateApplicationStatus } from '../services/projectService';
import { DIRECTOR_MENU, TALENT_MENU } from '../constants/navigation';

const ProjectDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const [project, setProject] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [applying, setApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(null);
    const [imageError, setImageError] = useState('');

    const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

    // Determine user role from URL path
    const userRole = location.pathname.startsWith('/director') ? 'director' : 
                    location.pathname.startsWith('/admin') ? 'admin' : 'talent';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await getMyProfile();
                setProfile(profileRes.data);
                
                const projectRes = await getProject(id);
                setProject(projectRes.data);
                
                // Initialize edit form with current project data
                setEditForm({
                    title: projectRes.data.title || '',
                    description: projectRes.data.description || '',
                    category: projectRes.data.category || '',
                    budget: projectRes.data.budget || '',
                    location: projectRes.data.location || '',
                    deadline: projectRes.data.deadline ? new Date(projectRes.data.deadline).toISOString().split('T')[0] : '',
                    status: projectRes.data.status || 'open',
                    projectImage: projectRes.data.projectImage || ''
                });

                // Fetch applications only for directors and admins
                if (userRole === 'director' || userRole === 'admin') {
                    const appsRes = await getProjectApplications(id);
                    setApplications(appsRes.data || []);
                }

                // For talents, check if they have applied (this would need a backend endpoint)
                // For now, we'll assume they can apply if the project is open
                if (userRole === 'talent') {
                    // You could add a check here to see if talent has already applied
                    setHasApplied(false); // Placeholder
                }
            } catch (err) {
                console.error('Error fetching project details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, userRole]);

    // Import appropriate menu based on role
    const getMenuForRole = (role) => {
        switch (role) {
            case 'director':
                return DIRECTOR_MENU;
            case 'admin':
                return DIRECTOR_MENU; // Using director menu for now, could create admin menu
            case 'talent':
                return TALENT_MENU;
            default:
                return DIRECTOR_MENU;
        }
    };

    const menuItems = getMenuForRole(userRole);

    const directorData = project?.director || {};

    const talentHeader = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Talent'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'Artist')
            : (profile?.profilePicture || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80")
    };

    const directorHeader = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'Director')
            : (profile?.profilePicture || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80")
    };

    const adminHeader = {
        name: profile?.fullName || 'Admin',
        roleTitle: 'Administrator • TalentConnect',
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'Admin')
            : (profile?.profilePicture || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80")
    };

    const headerUserData = userRole === 'talent'
        ? talentHeader
        : userRole === 'admin'
        ? adminHeader
        : directorHeader;

    const directorCard = {
        name: directorData.profile?.fullName || directorData.email?.split('@')[0] || 'Director',
        roleTitle: `Director • ${project?.location || directorData.location || 'India'}`,
        avatar: directorData.profile?.profilePicture || ('https://ui-avatars.com/api/?name=' + (directorData.email || 'Director')),
        profileId: directorData.profileId || directorData.profile?.id || directorData.id || directorData._id || null
    };
    const directorProfileId = directorData.id || directorData._id;

    if (loading) {
        return (
            <DashboardLayout
                menuItems={menuItems}
                userRole={userRole === 'director' ? "India • Director" : userRole === 'admin' ? "Admin • TalentConnect" : "India • Talent"}
                userData={headerUserData}
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
                menuItems={menuItems}
                userRole={userRole === 'director' ? "India • Director" : userRole === 'admin' ? "Admin • TalentConnect" : "India • Talent"}
                userData={headerUserData}
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

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            // Reset form when entering edit mode
            setEditForm({
                title: project.title || '',
                description: project.description || '',
                category: project.category || '',
                budget: project.budget || '',
                location: project.location || '',
                deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
                status: project.status || 'open',
                projectImage: project.projectImage || ''
            });
        }
    };

    const handleFormChange = (field, value) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updatedProject = await updateProject(id, editForm);
            setProject(updatedProject.data);
            setIsEditing(false);
            // Show success message
            alert('Project updated successfully!');
        } catch (err) {
            console.error('Error updating project:', err);
            alert('Failed to update project. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleApplyToProject = async () => {
        setApplying(true);
        try {
            await applyToProject(id);
            setHasApplied(true);
            alert('Successfully applied to this project!');
        } catch (err) {
            console.error('Error applying to project:', err);
            alert('Failed to apply to project. Please try again.');
        } finally {
            setApplying(false);
        }
    };

    const handleApplicationStatusUpdate = async (applicationId, newStatus) => {
        setUpdatingStatus(applicationId);
        try {
            await updateApplicationStatus(applicationId, newStatus);
            // Update the local applications state
            setApplications(prev => prev.map(app => 
                app.id === applicationId ? { ...app, status: newStatus } : app
            ));
            alert(`Application ${newStatus} successfully!`);
        } catch (err) {
            console.error('Error updating application status:', err);
            alert('Failed to update application status. Please try again.');
        } finally {
            setUpdatingStatus(null);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_BYTES) {
            setImageError('Image must be 5MB or smaller.');
            return;
        }
        if (!file.type?.startsWith('image/')) {
            setImageError('Only image files are allowed.');
            return;
        }

        const reader = new FileReader();
        reader.onerror = () => setImageError('Failed to read image file. Please try again.');
        reader.onloadend = () => {
            if (!reader.result) {
                setImageError('Failed to load image preview.');
                return;
            }
            setImageError('');
            setEditForm(prev => ({ ...prev, projectImage: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole={userRole === 'director' ? "India • Director" : userRole === 'admin' ? "Admin • TalentConnect" : "Talent • India"}
            userData={headerUserData}
            headerTitle="Project Details"
            headerSubtitle={userRole === 'director' 
                ? `${project.title} • Manage roles, requirements, and applications.`
                : userRole === 'admin'
                ? `${project.title} • Admin oversight and management.`
                : `${project.title} • View project details and apply.`
            }
            searchPlaceholder={userRole === 'director' || userRole === 'admin' ? "Search roles or talent..." : "Search projects..."}
        >
            <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
                <div className="p-8">
                    <section className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-slate-200 dark:border-white/5 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                        {isEditing ? (
                            <div className="relative">
                                <img className="w-full h-[350px] object-cover" src={editForm.projectImage || "https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80"} alt="Project Banner" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                    <div className="text-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="project-image-upload"
                                        />
                                        <label htmlFor="project-image-upload" className="cursor-pointer">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-colors">
                                                <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                                            </div>
                                            <p className="text-white font-bold">Change Project Image</p>
                                        </label>
                                        {imageError && <p className="mt-3 text-xs text-red-200 font-semibold">{imageError}</p>}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <img className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-1000" src={project.projectImage || "https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80"} alt="Project Banner" />
                        )}
                        <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div>
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={editForm.title}
                                                onChange={(e) => handleFormChange('title', e.target.value)}
                                                className="text-4xl md:text-6xl font-black text-white bg-transparent border-b-2 border-white/50 focus:border-white outline-none w-full"
                                                placeholder="Project Title"
                                            />
                                            <div className="flex flex-wrap gap-4 text-slate-300 text-sm font-bold flex items-center uppercase tracking-widest">
                                                <input
                                                    type="date"
                                                    value={editForm.deadline}
                                                    onChange={(e) => handleFormChange('deadline', e.target.value)}
                                                    className="bg-transparent border-b border-white/50 text-white text-sm font-bold uppercase tracking-widest focus:border-white outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={editForm.location}
                                                    onChange={(e) => handleFormChange('location', e.target.value)}
                                                    className="bg-transparent border-b border-white/50 text-white text-sm font-bold uppercase tracking-widest focus:border-white outline-none"
                                                    placeholder="Location"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">{project.title}</h1>
                                            <p className="text-slate-300 text-sm font-bold flex items-center gap-6 uppercase tracking-widest">
                                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">calendar_today</span> Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set'}</span>
                                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> {project.location || 'TBD'}</span>
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    {userRole === 'director' ? (
                                        isEditing ? (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={saving}
                                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95 disabled:opacity-50"
                                                >
                                                    {saving ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button
                                                    onClick={handleEditToggle}
                                                    className="flex items-center justify-center p-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                >
                                                    <span className="material-symbols-outlined">close</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
                                                    <span className="material-symbols-outlined text-sm">person_add</span> Post New Role
                                                </button>
                                                <button
                                                    onClick={handleEditToggle}
                                                    className="flex items-center justify-center p-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                >
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </>
                                        )
                                    ) : userRole === 'talent' ? (
                                        <button
                                            onClick={handleApplyToProject}
                                            disabled={applying || hasApplied || project?.status !== 'open'}
                                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                {hasApplied ? 'check_circle' : 'send'}
                                            </span>
                                            {hasApplied ? 'Applied' : applying ? 'Applying...' : 'Apply Now'}
                                        </button>
                                    ) : (
                                        // Admin view - no action buttons
                                        <div className="text-white/80 text-sm font-bold">
                                            Admin View
                                        </div>
                                    )}
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
                                    {userRole === 'director' && isEditing ? (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Project Description</label>
                                                <textarea
                                                    value={editForm.description}
                                                    onChange={(e) => handleFormChange('description', e.target.value)}
                                                    className="w-full p-4 border border-slate-200 dark:border-white/5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:border-primary outline-none resize-none"
                                                    rows={6}
                                                    placeholder="Describe your project vision, story, and requirements..."
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Category</label>
                                                    <select
                                                        value={editForm.category}
                                                        onChange={(e) => handleFormChange('category', e.target.value)}
                                                        className="w-full p-3 border border-slate-200 dark:border-white/5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:border-primary outline-none"
                                                    >
                                                        <option value="Film">Film</option>
                                                        <option value="Advertisement">Advertisement</option>
                                                        <option value="Music Video">Music Video</option>
                                                        <option value="Web Series">Web Series</option>
                                                        <option value="Short Film">Short Film</option>
                                                        <option value="Theatre">Theatre</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Budget</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.budget}
                                                        onChange={(e) => handleFormChange('budget', e.target.value)}
                                                        className="w-full p-3 border border-slate-200 dark:border-white/5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:border-primary outline-none"
                                                        placeholder="Negotiable"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Status</label>
                                                    <select
                                                        value={editForm.status}
                                                        onChange={(e) => handleFormChange('status', e.target.value)}
                                                        className="w-full p-3 border border-slate-200 dark:border-white/5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:border-primary outline-none"
                                                    >
                                                        <option value="open">Open</option>
                                                        <option value="closed">Closed</option>
                                                        <option value="draft">Draft</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Role Requirements - Only for directors and admins */}
                            {(userRole === 'director' || userRole === 'admin') && (
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
                            )}

                            {/* Applied Talents - Only for directors and admins */}
                            {(userRole === 'director' || userRole === 'admin') && (
                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-primary rounded-full"></span> Applied Talents
                                        </h3>
                                        <Link to={`/director/shortlists`} className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All Applications</Link>
                                    </div>
                                    <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                        <div className="space-y-4">
                                            {applications.length > 0 ? applications.map((app, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-slate-400">person</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-sm">{app.talent?.profile?.fullName || app.talent?.email || 'Unknown Talent'}</h4>
                                                            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-tight">
                                                                Applied {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recently'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                                            app.status === 'shortlisted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                                                            app.status === 'selected' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                                            'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                                        }`}>
                                                            {app.status || 'applied'}
                                                        </span>
                                                        <div className="flex gap-2">
                                                            {app.status !== 'selected' && (
                                                                <button 
                                                                    onClick={() => handleApplicationStatusUpdate(app.id, 'selected')}
                                                                    disabled={updatingStatus === app.id}
                                                                    className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-full border border-green-200 hover:border-green-300 transition-colors disabled:opacity-50"
                                                                >
                                                                    {updatingStatus === app.id ? '...' : 'Accept'}
                                                                </button>
                                                            )}
                                                            {app.status !== 'rejected' && app.status !== 'selected' && (
                                                                <button 
                                                                    onClick={() => handleApplicationStatusUpdate(app.id, 'rejected')}
                                                                    disabled={updatingStatus === app.id}
                                                                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-[9px] font-black uppercase tracking-widest rounded-full border border-red-200 hover:border-red-300 transition-colors disabled:opacity-50"
                                                                >
                                                                    {updatingStatus === app.id ? '...' : 'Reject'}
                                                                </button>
                                                            )}
                                                            {app.status === 'selected' && (
                                                                <Link 
                                                                    to={`/director/messages/${app.talent.id}`}
                                                                    className="px-3 py-1 bg-primary hover:bg-primary/90 text-white text-[9px] font-black uppercase tracking-widest rounded-full transition-colors"
                                                                >
                                                                    Message
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-center p-8 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-slate-500">
                                                    No applications yet.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-10">
                            {(userRole === 'director' || userRole === 'admin') ? (
                                <>
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
                                                    <img className="w-full h-full object-cover" src={headerUserData.avatar} alt={headerUserData.name} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-sm leading-none mb-1">{headerUserData.name}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Lead Director</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </>
                            ) : (
                                // Talent view - show project requirements and application info
                                <>
                                    <section>
                                        <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-primary rounded-full"></span> Project Requirements
                                        </h3>
                                        <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold uppercase tracking-widest">Project Status</span>
                                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${project?.status === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                                        {project?.status?.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold uppercase tracking-widest">Deadline</span>
                                                    <span className="text-[10px] font-black text-slate-500">
                                                        {project?.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not specified'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold uppercase tracking-widest">Location</span>
                                                    <span className="text-[10px] font-black text-slate-500">{project?.location || 'Not specified'}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold uppercase tracking-widest">Budget</span>
                                                    <span className="text-[10px] font-black text-primary">{project?.budget || 'Negotiable'}</span>
                                                </div>
                                            </div>
                                            
                                            {hasApplied && (
                                                <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                                        <span className="text-sm font-bold">You have applied to this project</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-primary rounded-full"></span> Director Info
                                        </h3>
                                        <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 rounded-xl bg-slate-200 overflow-hidden border border-slate-200 dark:border-white/5">
                                                    <img className="w-full h-full object-cover" src={directorCard.avatar} alt={directorCard.name} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-base leading-none mb-1">{directorCard.name}</p>
                                                    <p className="text-sm text-slate-500 font-medium">{directorCard.roleTitle}</p>
                                                </div>
                                            </div>
                                            {directorCard.profileId && (
                                                <div className="mt-4">
                                                    <Link
                                                        to={`/director/${directorCard.profileId}`}
                                                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-colors"
                                                    >
                                                        View Director Profile
                                                        <span className="material-symbols-outlined text-sm">arrow_outward</span>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </>
                            )}
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



