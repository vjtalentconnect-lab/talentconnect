import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getDirectorApplications, updateApplicationStatus, scheduleAudition } from '../services/projectService';
import { DIRECTOR_MENU } from '../constants/navigation';

const AuditionRequests = () => {
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [scheduleForm, setScheduleForm] = useState({
        auditionDate: '',
        auditionLocation: '',
        auditionNotes: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, appsRes] = await Promise.all([
                    getMyProfile(),
                    getDirectorApplications('auditioning') // Fetch only auditioning status
                ]);
                setProfile(profileRes.data);
                setApplications(appsRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            await updateApplicationStatus(appId, newStatus);
            setApplications(applications.filter(app => app._id !== appId)); // Remove from view
            alert(`Talent has been ${newStatus}.`);
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        }
    };

    const handleScheduleAudition = async () => {
        try {
            await scheduleAudition(selectedApplication._id, scheduleForm);
            setShowScheduleModal(false);
            setSelectedApplication(null);
            setScheduleForm({ auditionDate: '', auditionLocation: '', auditionNotes: '' });
            // Refresh applications
            const appsRes = await getDirectorApplications('auditioning');
            setApplications(appsRes.data);
            alert('Audition scheduled successfully!');
        } catch (err) {
            console.error('Error scheduling audition:', err);
            alert('Failed to schedule audition');
        }
    };

    const openScheduleModal = (application) => {
        setSelectedApplication(application);
        setShowScheduleModal(true);
    };

    const userData = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : (profile?.profilePicture || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80")
    };
    
    // Group applications by project to handle the "Head-to-head" view
    const projectsWithAuditions = {};
    applications.forEach(app => {
        if (!app.project) return;
        if (!projectsWithAuditions[app.project._id]) {
            projectsWithAuditions[app.project._id] = {
                project: app.project,
                applicants: []
            };
        }
        projectsWithAuditions[app.project._id].applicants.push(app);
    });

    const activeProjectIds = Object.keys(projectsWithAuditions);

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Audition Requests"
            headerSubtitle="Manage and review incoming audition submissions from talent."
            searchPlaceholder="Search auditions..."
        >
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Auditions...</p>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="max-w-7xl mx-auto py-8">
                        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-16 text-center shadow-sm">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-6">videocam</span>
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2 italic">No Auditions Found</h3>
                            <p className="text-slate-500 text-sm font-medium">When you invite shortlisted talents to an audition, they will appear here for comparison.</p>
                            <button onClick={() => navigate('/director/shortlists')} className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all">Go to Shortlists</button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto py-8 space-y-16">
                        {activeProjectIds.map(projectId => {
                            const { project, applicants } = projectsWithAuditions[projectId];

                            return (
                                <div key={projectId}>
                                    <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
                                        <div>
                                            <h2 className="text-3xl font-black tracking-tight mb-2">Project: {project.title}</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">Head-to-head comparison of top finalists for {project.category}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <Link to={`/director/project/${project._id || project.id}`} className="px-5 py-2 rounded-xl border border-slate-200 dark:border-border-dark font-bold text-xs hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center">
                                                View Project Brief
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Comparison Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        {applicants.map((app, index) => {
                                            const profile = app.talent?.profile;
                                            
                                            // Mock metrics for demo purposes based on real data
                                            const screenPresence = 85 + (index % 10);
                                            const emotionalRange = 90 - (index % 5);
                                            const dialogueDelivery = 88 + (index % 7);
                                            const overall = ((screenPresence + emotionalRange + dialogueDelivery) / 30).toFixed(1);

                                            return (
                                                <div key={app._id} className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl flex flex-col">
                                                    <div className="p-4 md:p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-3 md:gap-4">
                                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border border-slate-100 dark:border-white/5 shrink-0">
                                                                <img alt={profile?.fullName} className="w-full h-full object-cover" src={profile?.profilePicture !== 'no-photo.jpg' && profile?.profilePicture ? profile.profilePicture : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"} />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <h3 className="text-lg md:text-xl font-bold truncate dark:text-white">{profile?.fullName || 'Unknown Talent'}</h3>
                                                                <span className="text-[9px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full uppercase tracking-wider">{index === 0 ? 'Top Seeded' : 'Finalist'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <div className="flex text-primary">
                                                                <span className="material-symbols-outlined text-base md:text-lg fill-1">star</span>
                                                                <span className="material-symbols-outlined text-base md:text-lg fill-1">star</span>
                                                                <span className="material-symbols-outlined text-base md:text-lg fill-1">star</span>
                                                                <span className="material-symbols-outlined text-base md:text-lg fill-1">star</span>
                                                                <span className="material-symbols-outlined text-base md:text-lg">star_half</span>
                                                            </div>
                                                            <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 font-bold">{overall} / 10 Overall</p>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Video Player Mockup */}
                                                    <div className="relative group cursor-pointer aspect-video bg-black flex items-center justify-center overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10"></div>
                                                        <div className="w-full h-full bg-slate-800 opacity-70 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                                                           {/* Display first portfolio video thumbnail if available, otherwise fallback */}
                                                           <span className="material-symbols-outlined text-4xl md:text-6xl text-white/20">video_camera_front</span>
                                                        </div>
                                                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                                                            <div className="bg-primary w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                                                <span className="material-symbols-outlined text-white text-3xl md:text-4xl fill-1">play_arrow</span>
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-3 md:bottom-4 left-4 md:left-6 z-20 text-left">
                                                            <p className="text-white font-bold text-xs md:text-sm">Audition Tape Pending Upload</p>
                                                            <p className="text-white/60 text-[9px] md:text-[10px] italic">Requesting screen test from {profile?.fullName?.split(' ')[0]}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="p-4 md:p-6 space-y-4 md:space-y-6 flex-1">
                                                        <div>
                                                            <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 md:mb-4">Performance Metrics</h4>
                                                            <div className="space-y-3 md:space-y-4">
                                                                <div>
                                                                    <div className="flex justify-between text-[10px] md:text-xs mb-1.5 font-bold dark:text-white">
                                                                        <span>Screen Presence</span>
                                                                        <span className="text-primary">{screenPresence}%</span>
                                                                    </div>
                                                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                                        <div className="bg-primary h-full" style={{ width: `${screenPresence}%` }}></div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex justify-between text-[10px] md:text-xs mb-1.5 font-bold dark:text-white">
                                                                        <span>Emotional Range</span>
                                                                        <span className="text-primary">{emotionalRange}%</span>
                                                                    </div>
                                                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                                        <div className="bg-primary h-full" style={{ width: `${emotionalRange}%` }}></div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex justify-between text-[10px] md:text-xs mb-1.5 font-bold dark:text-white">
                                                                        <span>Dialogue Delivery</span>
                                                                        <span className="text-primary">{dialogueDelivery}%</span>
                                                                    </div>
                                                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                                        <div className="bg-primary h-full" style={{ width: `${dialogueDelivery}%` }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Talent Overview</h4>
                                                            <div className="bg-slate-50 dark:bg-white/5 p-3 md:p-4 rounded-xl border-l-4 border-primary italic text-[10px] md:text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                                                "{profile?.bio || `An experienced ${profile?.talentCategory || 'artist'} who brings raw, magnetic vulnerability that the role requires.`}"
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 md:p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5">
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                                                            <button 
                                                                onClick={() => openScheduleModal(app)} 
                                                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 md:py-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
                                                            >
                                                                Schedule Audition
                                                            </button>
                                                            <button onClick={() => handleStatusUpdate(app._id, 'selected')} className="w-full bg-primary py-2 md:py-3 rounded-xl font-bold text-white text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all">
                                                                Cast {profile?.fullName?.split(' ')[0]}
                                                            </button>
                                                            <button onClick={() => handleStatusUpdate(app._id, 'rejected')} className="w-full border-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white py-2 md:py-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest active:scale-[0.98] transition-all">
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Comparison Table - Mobile Friendly */}
                                    {applicants.length > 1 && (
                                        <div className="mt-8 md:mt-12 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl">
                                            <div className="p-4 md:p-6 border-b border-slate-100 dark:border-white/5">
                                                <h3 className="text-base md:text-lg font-bold dark:text-white">Detailed Attributes Comparison</h3>
                                            </div>
                                            {/* Mobile Card Layout */}
                                            <div className="block md:hidden p-4 space-y-4">
                                                {applicants.map((app, index) => (
                                                    <div key={app._id} className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 space-y-3">
                                                        <h4 className="font-bold text-sm dark:text-white">{app.talent?.profile?.fullName || 'Talent'}</h4>
                                                        <div className="space-y-2 text-xs">
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">Location:</span>
                                                                <span className="dark:text-white">{app.talent?.profile?.location || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">Top Skills:</span>
                                                                <span className="dark:text-white">{app.talent?.profile?.skills?.slice(0, 2).join(', ') || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">Physical Metrics:</span>
                                                                <span className="dark:text-white">{app.talent?.profile?.physicalMetrics?.height ? app.talent.profile.physicalMetrics.height + " height" : 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Desktop Table Layout */}
                                            <div className="hidden md:block overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                            <th className="px-6 py-4">Attribute</th>
                                                            {applicants.map(app => (
                                                                <th key={app._id} className="px-6 py-4 dark:text-white">{app.talent?.profile?.fullName || 'Talent'}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-xs divide-y divide-slate-100 dark:divide-white/5">
                                                        <tr>
                                                            <td className="px-6 py-4 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Location</td>
                                                            {applicants.map(app => <td key={app._id} className="px-6 py-4 dark:text-white">{app.talent?.profile?.location || 'N/A'}</td>)}
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Top Skills</td>
                                                            {applicants.map(app => <td key={app._id} className="px-6 py-4 dark:text-white">{app.talent?.profile?.skills?.slice(0, 2).join(', ') || 'N/A'}</td>)}
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Physical Metrics</td>
                                                            {applicants.map(app => <td key={app._id} className="px-6 py-4 dark:text-white">{app.talent?.profile?.physicalMetrics?.height ? app.talent.profile.physicalMetrics.height + " height" : 'N/A'}</td>)}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Footer Summary */}
                        <div className="mt-8 flex justify-center pb-8 text-center">
                            <p className="text-slate-500 text-xs flex items-center gap-2 font-medium">
                                <span className="material-symbols-outlined text-sm">info</span>
                                Casting a talent will send an official notification and move their status to "Selected".
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <footer className="mt-auto py-6 px-8 border-t border-slate-200 dark:border-border-dark text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 TalentConnect Entertainment • Casting Partner: Cinematic Solutions</p>
            </footer>

            {/* Schedule Audition Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-card-dark rounded-2xl max-w-md w-full p-4 md:p-6 space-y-4 md:space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg md:text-xl font-bold dark:text-white">Schedule Audition</h3>
                            <button 
                                onClick={() => setShowScheduleModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Audition Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={scheduleForm.auditionDate}
                                    onChange={(e) => setScheduleForm({...scheduleForm, auditionDate: e.target.value})}
                                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Location/Meeting Link
                                </label>
                                <input
                                    type="text"
                                    value={scheduleForm.auditionLocation}
                                    onChange={(e) => setScheduleForm({...scheduleForm, auditionLocation: e.target.value})}
                                    placeholder="Physical location or video call link"
                                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Notes for Talent
                                </label>
                                <textarea
                                    value={scheduleForm.auditionNotes}
                                    onChange={(e) => setScheduleForm({...scheduleForm, auditionNotes: e.target.value})}
                                    placeholder="Any specific instructions or requirements..."
                                    rows={3}
                                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button 
                                    onClick={() => setShowScheduleModal(false)}
                                    className="flex-1 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 py-3 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleScheduleAudition}
                                    className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all"
                                >
                                    Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default AuditionRequests;
