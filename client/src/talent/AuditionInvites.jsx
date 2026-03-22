import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';
import { getMyApplications } from '../services/projectService';
import { useNotifications } from '../context/NotificationContext';

const FILTERS = ['All', 'New', 'Accepted', 'Completed'];

const STATUS_TO_FILTER = {
    'auditioning': 'New',
    'shortlisted': 'Accepted',
    'selected': 'Completed',
};

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-3 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const AuditionInvites = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [decliningId, setDecliningId] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, appsRes] = await Promise.all([getMyProfile(), getMyApplications()]);
                setProfile(profileRes.data);
                // Only show applications that are auditioning, shortlisted, or selected
                setInvites(appsRes.data.filter(a => ['auditioning', 'shortlisted', 'selected'].includes(a.status)));
            } catch (err) {
                console.error('Error fetching invites:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchData);
        return () => window.removeEventListener('userStateChange', fetchData);
    }, []);

    const filteredInvites = invites.filter(inv => {
        if (activeFilter === 'All') return true;
        return STATUS_TO_FILTER[inv.status] === activeFilter;
    });

    const spotlight = invites.find(i => i.status === 'auditioning');

    const handleAccept = (inv) => {
        navigate('/talent/audition-details', { state: { projectId: inv.project?._id } });
    };

    const handleDecline = async (invId) => {
        setDecliningId(invId);
        await new Promise(r => setTimeout(r, 800));
        setInvites(prev => prev.filter(i => i._id !== invId));
        setToast({ message: 'Invite declined.', type: 'success' });
        setDecliningId(null);
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture,
    };

    const verificationStatus = profile?.user?.verificationStatus || authUser?.verificationStatus || 'none';

    if (loading) return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist"
            userData={{ name: '...', roleTitle: '...', avatar: '' }} headerTitle="Audition Invites">
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData} verificationStatus={verificationStatus}
            headerTitle="Audition Invites" headerSubtitle="Your exclusive audition invitations and call-backs.">
            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
            <div className="space-y-8 pb-24">
                {/* Spotlight Card */}
                {spotlight && (
                    <div className="relative overflow-hidden rounded-3xl bg-[#0f1115] border border-primary/20 p-8 shadow-2xl" >
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"/>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-28 h-36 rounded-2xl overflow-hidden shrink-0 shadow-2xl border border-primary/20">
                                <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80" alt="spotlight" className="w-full h-full object-cover"/>
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"/>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"/>
                                    </span>
                                    Immediate Action Required
                                </p>
                                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">
                                    {spotlight.project?.title || 'Audition Call'}
                                </h2>
                                <p className="text-slate-400 font-bold text-sm mb-6">
                                    {spotlight.project?.director?.email?.split('@')[0] || 'Director'} • {spotlight.project?.category || 'Film'} • {spotlight.project?.location || 'Mumbai'}
                                </p>
                                <div className="flex gap-4">
                                    <button onClick={() => handleAccept(spotlight)}
                                        className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                                        <span className="material-symbols-outlined text-sm">check_circle</span> Accept
                                    </button>
                                    <button onClick={() => handleDecline(spotlight._id)} disabled={decliningId === spotlight._id}
                                        className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-60">
                                        {decliningId === spotlight._id
                                            ? <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Declining...</>
                                            : 'Decline'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setActiveFilter(f)}
                            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                activeFilter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary'
                            }`}>
                            {f}
                            {f === 'New' && invites.filter(i => i.status === 'auditioning').length > 0 && (
                                <span className="ml-2 bg-primary text-white text-[9px] font-black rounded-full px-1.5 py-0.5">{invites.filter(i => i.status === 'auditioning').length}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Invite List */}
                {filteredInvites.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-16 text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">mail</span>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No invites in this category</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredInvites.map((inv) => {
                            const proj = inv.project || {};
                            const filterLabel = STATUS_TO_FILTER[inv.status] || 'Applied';
                            const isNew = inv.status === 'auditioning';
                            return (
                                <div key={inv._id} className={`bg-white dark:bg-zinc-900 border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 shadow-sm transition-all ${isNew ? 'border-primary/30 hover:border-primary/60' : 'border-slate-200 dark:border-zinc-800'}`}>
                                    <div className="w-20 h-28 rounded-xl overflow-hidden shrink-0 shadow-lg">
                                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" alt={proj.title || 'Project'} className="w-full h-full object-cover"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter">{proj.title || 'Project Title'}</h3>
                                            <span className={`px-2.5 py-1 text-[9px] font-black rounded uppercase tracking-widest ${
                                                inv.status === 'selected' ? 'bg-green-500/10 text-green-500' :
                                                inv.status === 'auditioning' ? 'bg-primary/10 text-primary' :
                                                'bg-blue-500/10 text-blue-500'
                                            }`}>{filterLabel}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm font-bold flex flex-wrap gap-4">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">movie</span>{proj.director?.email?.split('@')[0] || 'Director'}</span>
                                            {proj.location && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">location_on</span>{proj.location}</span>}
                                            {proj.deadline && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">calendar_today</span>{new Date(proj.deadline).toLocaleDateString()}</span>}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 shrink-0">
                                        <button onClick={() => handleAccept(inv)}
                                            className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">open_in_new</span> View Details
                                        </button>
                                        {isNew && (
                                            <button onClick={() => handleDecline(inv._id)} disabled={decliningId === inv._id}
                                                className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-200 dark:border-zinc-700 text-slate-500 hover:border-red-300 hover:text-red-500 transition-all flex items-center gap-2 disabled:opacity-60">
                                                {decliningId === inv._id
                                                    ? <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                                    : 'Decline'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AuditionInvites;
