import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getPendingVerifications, verifyUser, getAdminStats } from '../services/adminService';
import socket from '../services/socket';

const VerificationReview = () => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [stats, setStats] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [profileRes, pendingRes, statsRes] = await Promise.all([
                    getMyProfile(),
                    getPendingVerifications(),
                    getAdminStats()
                ]);
                setAdminProfile(profileRes.data);
                setPendingRequests(pendingRes.data || []);
                setStats(statsRes.data);
                if (pendingRes.data && pendingRes.data.length > 0) {
                    setSelectedUser(pendingRes.data[0]);
                }
            } catch (err) {
                console.error('Error fetching Governance context:', err);
                setError('Failed to load verification queue. Please check connection.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Listen for real-time admin events
        const handleAdminEvent = (event) => {
            console.log('Admin event received:', event);
            if (event.type === 'newUser' || event.type === 'verificationUpdate') {
                fetchData(); // Refetch pending verifications
            }
        };

        socket.on('adminEvent', handleAdminEvent);

        return () => {
            socket.off('adminEvent', handleAdminEvent);
        };
    }, []);

    const handleVerification = async (userId, verificationStatus) => {
        setActionLoading(true);
        try {
            await verifyUser(userId, { verificationStatus });
            // Refresh list
            const updatedPending = await getPendingVerifications();
            setPendingRequests(updatedPending.data);
            if (userId === selectedUser?._id) {
                // Find the updated user in the new list or clear selection
                const stillPending = updatedPending.data.find(u => u._id === userId);
                if (stillPending) {
                    setSelectedUser(stillPending);
                } else {
                    setSelectedUser(updatedPending.data[0] || null);
                }
            }
            // Refresh stats
            const updatedStats = await getAdminStats();
            setStats(updatedStats.data);
        } catch (err) {
            console.error('Error updating identity state:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', active: true, badge: stats?.pendingVerifications?.toString() },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: adminProfile?.fullName || 'Admin',
        roleTitle: 'Super Admin',
        avatar: adminProfile?.profilePicture && adminProfile.profilePicture !== 'no-photo.jpg' 
            ? adminProfile.profilePicture 
            : `https://ui-avatars.com/api/?name=${adminProfile?.fullName || 'Admin'}&background=ee2b3b&color=fff`
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-dark text-white">
            <div className="size-24 relative mb-10">
                <div className="absolute inset-0 border-[6px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-3 border-[6px] border-primary/10 border-b-primary rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-4xl animate-pulse">verified_user</span>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Scanning Identity Database...</p>
        </div>
    );

    const profile = selectedUser?.profile;
    const vState = profile?.verificationState || {};

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Governance Module"
            userData={userData}
            headerTitle="Identity Protocol"
            headerSubtitle="Biometric and professional verification matrix"
        >
            <div className="max-w-7xl mx-auto space-y-12 py-8 lg:px-4 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left List */}
                    <div className="lg:col-span-4 space-y-10">
                        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)] group">
                            <div className="p-10 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
                                <h3 className="text-xl font-black dark:text-white uppercase tracking-tight flex items-center justify-between">
                                    Queue
                                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-black tracking-widest leading-none ring-1 ring-primary/20">
                                        {pendingRequests.length} PENDING
                                    </span>
                                </h3>
                            </div>
                            <div className="flex-1 overflow-y-auto scrollbar-hide py-6 space-y-2 px-4">
                                {pendingRequests.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
                                        <div className="size-24 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-slate-300">verified</span>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Queue holds zero anomalies.</p>
                                    </div>
                                ) : (
                                    pendingRequests.map((req) => (
                                        <div 
                                            key={req._id}
                                            onClick={() => setSelectedUser(req)}
                                            className={`p-6 rounded-[2rem] cursor-pointer transition-all border group/card ${selectedUser?._id === req._id ? 'bg-primary shadow-2xl shadow-primary/30 border-primary' : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="size-16 rounded-full overflow-hidden ring-4 ring-white/10 group-hover/card:scale-105 transition-transform">
                                                    <img className="w-full h-full object-cover" src={req.profile?.profilePicture && req.profile?.profilePicture !== 'no-photo.jpg' ? req.profile?.profilePicture : `https://ui-avatars.com/api/?name=${req.profile?.fullName || 'User'}&background=ee2b3b&color=fff`} alt={req.profile?.fullName} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`text-sm font-black uppercase tracking-tighter truncate ${selectedUser?._id === req._id ? 'text-white' : 'dark:text-white'}`}>{req.profile?.fullName || 'Unnamed Artist'}</h4>
                                                    <p className={`text-[9px] font-black uppercase tracking-widest truncate ${selectedUser?._id === req._id ? 'text-white/70' : 'text-slate-400'}`}>{req.email}</p>
                                                </div>
                                                <span className={`material-symbols-outlined text-lg ${selectedUser?._id === req._id ? 'text-white' : 'text-slate-300'}`}>chevron_right</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Detail */}
                    <div className="lg:col-span-8">
                        {selectedUser ? (
                            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                                {/* Case Profile Header */}
                                <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3.5rem] p-12 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 size-96 bg-primary/2 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                                    <div className="relative flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                                        <div className="size-48 rounded-[3.5rem] bg-slate-100 dark:bg-white/5 overflow-hidden ring-8 ring-primary/5 p-1 group-hover:rotate-3 transition-transform duration-700">
                                            <img className="w-full h-full object-cover rounded-[3.2rem]" src={selectedUser.profile?.profilePicture && selectedUser.profile?.profilePicture !== 'no-photo.jpg' ? selectedUser.profile?.profilePicture : `https://ui-avatars.com/api/?name=${selectedUser.profile?.fullName || 'User'}&background=ee2b3b&color=fff`} alt={selectedUser.profile?.fullName} />
                                        </div>
                                        <div className="space-y-8 flex-1">
                                            <div>
                                                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                                    <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">{selectedUser.profile?.fullName || 'Unnamed Artist'}</h2>
                                                    <span className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 backdrop-blur-3xl">ID: {selectedUser._id.slice(-8)}</span>
                                                </div>
                                                <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">IDENTITY_STATE: {selectedUser.verificationStatus.toUpperCase()}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-8 items-center justify-center md:justify-start">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                        <span className="material-symbols-outlined text-xl">alternate_email</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Signal Channel</p>
                                                        <p className="text-sm font-black dark:text-white truncate">{selectedUser.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                        <span className="material-symbols-outlined text-xl">psychology</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Professional Focus</p>
                                                        <p className="text-sm font-black dark:text-white uppercase tracking-tighter">{selectedUser.profile?.talentCategory || 'Unspecified Artist'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Verification Dossier & Documents */}
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Links and Metadata */}
                                    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-sm space-y-8">
                                        <h4 className="text-[12px] font-black dark:text-white uppercase tracking-[0.3em] flex items-center gap-4">
                                            <span className="material-symbols-outlined text-primary">history_edu</span>
                                            Dossier Metadata
                                        </h4>
                                        <div className="space-y-6">
                                            {[
                                                { label: 'IMDb Profile', val: vState.imdbUrl ? <a href={vState.imdbUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">View Page</a> : 'N/A' },
                                                { label: 'Wikipedia', val: vState.wikipediaUrl ? <a href={vState.wikipediaUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">View Page</a> : 'N/A' },
                                                { label: 'Showreel', val: vState.showreelUrl ? <a href={vState.showreelUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">Watch Reel</a> : 'N/A' },
                                                { label: 'Association', val: vState.associationName?.toUpperCase() || 'N/A' },
                                                { label: 'Membership ID', val: vState.membershipId || 'N/A' }
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between border-b border-slate-50 dark:border-white/2 pb-4">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                                    <span className="text-[11px] font-black dark:text-white uppercase tracking-tighter">{item.val}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 space-y-4">
                                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted Assets</h5>
                                            <div className="grid grid-cols-1 gap-3">
                                                {vState.idFileUrl && (
                                                    <a href={vState.idFileUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20">
                                                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-lg text-primary">badge</span>
                                                            ID Document ({vState.idType})
                                                        </span>
                                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                    </a>
                                                )}
                                                {vState.membershipCardUrl && (
                                                    <a href={vState.membershipCardUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20">
                                                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-lg text-primary">contact_emergency</span>
                                                            Membership Card
                                                        </span>
                                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                    </a>
                                                )}
                                                {vState.videoSelfieUrl && (
                                                    <a href={vState.videoSelfieUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20">
                                                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-lg text-primary">videocam</span>
                                                            Verification Video
                                                        </span>
                                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Panel */}
                                    <div className="bg-slate-900 dark:bg-card-dark border border-slate-800 dark:border-white/5 rounded-[3rem] p-10 shadow-sm relative overflow-hidden group">
                                        <span className="material-symbols-outlined absolute -right-8 -top-8 text-[140px] text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">gavel</span>
                                        <div className="relative space-y-10">
                                            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em]">Governance Action</h4>
                                            <div className="space-y-6">
                                                <button 
                                                    disabled={actionLoading}
                                                    onClick={() => handleVerification(selectedUser._id, 'verified')}
                                                    className="w-full py-6 bg-primary text-white text-[11px] font-black rounded-3xl uppercase tracking-[0.3em] hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-4 leading-none disabled:opacity-50"
                                                >
                                                    <span className="material-symbols-outlined text-lg">verified</span>
                                                    Authorize Identity
                                                </button>
                                                <button 
                                                    disabled={actionLoading}
                                                    onClick={() => handleVerification(selectedUser._id, 'rejected')}
                                                    className="w-full py-6 bg-white/5 border border-white/10 text-white text-[11px] font-black rounded-3xl uppercase tracking-[0.3em] hover:bg-rose-600 hover:border-rose-600 transition-all active:scale-95 flex items-center justify-center gap-4 leading-none disabled:opacity-50"
                                                >
                                                    <span className="material-symbols-outlined text-lg">gpp_bad</span>
                                                    Reject & Restrict Access
                                                </button>
                                                <button 
                                                    disabled={actionLoading}
                                                    onClick={() => handleVerification(selectedUser._id, 'pending')}
                                                    className="w-full py-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-yellow-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 leading-none disabled:opacity-50"
                                                >
                                                    <span className="material-symbols-outlined text-base">hourglass_empty</span>
                                                    Mark as Pending Review
                                                </button>
                                            </div>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">Actions are persistent and logged in the nexus audit shard.</p>
                                        </div>
                                    </div>
                                </section>

                                {/* System Notes */}
                                <section className="bg-amber-500/5 border border-amber-500/20 rounded-[3rem] p-10 flex gap-8 items-start">
                                    <div className="size-16 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                                        <span className="material-symbols-outlined text-3xl">warning</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h5 className="text-[12px] font-black text-amber-600 uppercase tracking-widest">Anomaly Detection Shard</h5>
                                        <p className="text-[11px] font-bold text-amber-700/80 leading-relaxed uppercase tracking-widest italic opacity-80">Manual investigation is active for this identity record. Review all professional dossier links before authorizing access.</p>
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-20 text-center space-y-8 bg-slate-50 dark:bg-white/2 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-white/5">
                                <div className="size-32 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined text-6xl">search_off</span>
                                </div>
                                <div className="max-w-md space-y-4">
                                    <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Identity Vacuum Detected</h3>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] leading-relaxed">The verification queue is currently empty or no case has been selected for investigation.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VerificationReview;
