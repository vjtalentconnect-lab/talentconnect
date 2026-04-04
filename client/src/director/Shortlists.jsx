import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getDirectorApplications, updateApplicationStatus } from '../services/projectService';
import { DIRECTOR_MENU } from '../constants/navigation';

const Shortlists = () => {
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState('All Roles');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, appsRes] = await Promise.all([
                    getMyProfile(),
                    getDirectorApplications()
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
            setApplications(applications.map(app => 
                app._id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update application status');
        }
    };

    const userData = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : (profile?.profilePicture || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80")
    };

    const newApplicantsCount = applications.filter(a => a.status === 'applied').length;
    const shortlistedCount = applications.filter(a => a.status === 'shortlisted').length;

    const filteredApplications = applications.filter(app => {
        if (filterCategory !== 'All Roles') {
            return app.project?.title?.includes(filterCategory) || app.project?.category === filterCategory; // rough filter for now
        }
        return true;
    });

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Shortlists & Applicants"
            headerSubtitle="Review and manage talent selections for your active projects."
            searchPlaceholder="Search artists..."
        >
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Applicants...</p>
                    </div>
                ) : (
                    <section className="py-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h3 className="text-3xl font-extrabold tracking-tight mb-2">Application Review</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{newApplicantsCount} New Applicants</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-200 dark:bg-primary/5 px-3 py-1 rounded-full border border-slate-300 dark:border-primary/10">
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{shortlistedCount} Shortlisted</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
                                    <span className="material-symbols-outlined text-lg">send</span>
                                    Invite All to Audition
                                </button>
                            </div>
                        </div>

                        {applications.length === 0 ? (
                            <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-3xl p-16 text-center shadow-sm">
                                <span className="material-symbols-outlined text-6xl text-slate-300 mb-6">inbox</span>
                                <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2 italic">No Applications Yet</h3>
                                <p className="text-slate-500 text-sm font-medium">When talent applies to your projects, they will appear here.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredApplications.map((app) => {
                                    const talentProfile = app.talent?.profile;
                                    const isShortlisted = app.status === 'shortlisted';
                                    const isApplied = app.status === 'applied';
                                    const isRejected = app.status === 'rejected';

                                    return (
                                        <div key={app._id} className={`group bg-white dark:bg-card-dark border ${isShortlisted ? 'border-primary/50' : 'border-slate-200 dark:border-white/5'} rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col ${isRejected ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                                            <div className="relative h-72">
                                                <div 
                                                    className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" 
                                                    style={{ backgroundImage: `url(${talentProfile?.profilePicture !== 'no-photo.jpg' && talentProfile?.profilePicture ? talentProfile.profilePicture : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80'})` }}
                                                ></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                                <div className="absolute top-4 left-4">
                                                    {isApplied && <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-full shadow-lg">New Application</span>}
                                                    {isShortlisted && <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-full shadow-lg">Shortlisted</span>}
                                                    {isRejected && <span className="px-3 py-1 bg-slate-500 text-white text-[10px] font-bold uppercase rounded-full shadow-lg">Rejected</span>}
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h4 className="text-white text-xl font-bold">{talentProfile?.fullName || 'Unknown Talent'}</h4>
                                                    <p className="text-slate-300 text-sm">For: {app.project?.title}</p>
                                                </div>
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col">
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {talentProfile?.skills?.slice(0, 3).map((skill, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded">{skill}</span>
                                                    ))}
                                                    {(!talentProfile?.skills || talentProfile.skills.length === 0) && (
                                                        <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded">No Skills Listed</span>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                                    {isApplied && (
                                                        <>
                                                            <button onClick={() => handleStatusUpdate(app._id, 'shortlisted')} className="w-full py-2 bg-primary text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all">Shortlist</button>
                                                            <button onClick={() => handleStatusUpdate(app._id, 'rejected')} className="w-full py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">Reject</button>
                                                        </>
                                                    )}
                                                    {isShortlisted && (
                                                        <>
                                                            <button className="w-full py-2 bg-slate-100 dark:bg-white/5 border border-primary text-primary rounded-xl text-xs font-bold transition-all hover:bg-primary/10">Message</button>
                                                            <button onClick={() => handleStatusUpdate(app._id, 'rejected')} className="w-full py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">Reject</button>
                                                        </>
                                                    )}
                                                    <Link to={`/talent/${app.talent?.profile?.id || app.talent?.id}`} className="w-full py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold col-span-2 transition-all flex items-center justify-center">View Full Profile</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {/* Invite Collaborators Placeholder */}
                                <div className="group bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all border-dashed border-2 flex items-center justify-center min-h-[400px]">
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                                            <span className="material-symbols-outlined text-3xl">group_add</span>
                                        </div>
                                        <h4 className="font-bold mb-2">Invite Collaborators</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">Share this applicant pool with your casting team.</p>
                                        <button className="px-6 py-2 border border-slate-300 dark:border-white/10 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Share Access</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
            <footer className="mt-auto py-6 px-8 border-t border-slate-200 dark:border-border-dark text-center">
                <p className="text-xs text-slate-400 font-medium">© 2026 TalentConnect Entertainment. All rights reserved. Casting Partner: Cinematic Solutions.</p>
            </footer>
        </DashboardLayout>
    );
};

export default Shortlists;
