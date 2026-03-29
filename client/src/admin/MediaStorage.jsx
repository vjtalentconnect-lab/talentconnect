import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getAdminStats, getMediaAssets } from '../services/adminService';

const MediaStorage = () => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('auto'); // auto | image | video
    const [viewMode, setViewMode] = useState('grid');
    const [selectedAsset, setSelectedAsset] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [profileRes, statsRes, mediaRes] = await Promise.all([
                getMyProfile(),
                getAdminStats(),
                getMediaAssets({ resource_type: filter })
            ]);
            setAdminProfile(profileRes.data);
            setStats(statsRes.data);
            setAssets(mediaRes.data || []);
        } catch (err) {
            console.error('Error fetching Media context:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: stats?.pendingVerifications?.toString() },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'cloud_done', label: 'Media Storage', path: '/admin/storage', active: true },
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

    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (loading && assets.length === 0) return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-dark text-white">
            <div className="size-20 relative mb-8">
                <div className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span className="material-symbols-outlined absolute inset-0 m-auto size-fit text-primary text-3xl animate-pulse">cloud_queue</span>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Accessing Cloud Shards...</p>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Ops Console"
            userData={userData}
            headerTitle="Matrix Storage"
            headerSubtitle="Centralized cloud asset management and propagation"
            headerActions={
                <div className="flex gap-4">
                    <button onClick={fetchData} className="size-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                    <button className="px-8 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 leading-none">
                        Force Cleanup
                    </button>
                </div>
            }
        >
            <div className="max-w-7xl mx-auto py-8 lg:px-4 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
                {/* Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-6 bg-white dark:bg-card-dark p-6 rounded-[2.5rem] border border-slate-200 dark:border-border-dark shadow-sm">
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl">
                        {[
                            { id: 'auto', label: 'All Files', icon: 'all_inclusive' },
                            { id: 'image', label: 'Images', icon: 'image' },
                            { id: 'video', label: 'Videos', icon: 'videocam' }
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setFilter(t.id)}
                                className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                            >
                                <span className="material-symbols-outlined text-lg">{t.icon}</span>
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl">
                            <button onClick={() => setViewMode('grid')} className={`size-10 flex items-center justify-center rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                <span className="material-symbols-outlined">grid_view</span>
                            </button>
                            <button onClick={() => setViewMode('list')} className={`size-10 flex items-center justify-center rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-white/10 text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                <span className="material-symbols-outlined">list</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Asset Explorer */}
                {assets.length === 0 ? (
                    <div className="h-[400px] flex flex-col items-center justify-center bg-slate-50 dark:bg-card-dark rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/5 space-y-6">
                        <div className="size-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300">
                             <span className="material-symbols-outlined text-4xl">folder_off</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Shard directory is currently null.</p>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
                        : "flex flex-col gap-4"
                    }>
                        {assets.map((asset) => (
                            <div 
                                key={asset.public_id} 
                                className={`bg-white dark:bg-card-dark border group hover:border-primary/50 transition-all cursor-pointer ${viewMode === 'grid' 
                                    ? 'rounded-[2.5rem] p-4 flex flex-col border-slate-200 dark:border-white/5' 
                                    : 'rounded-2xl p-4 flex items-center border-slate-200 dark:border-white/5 gap-6'
                                }`}
                                onClick={() => setSelectedAsset(asset)}
                            >
                                <div className={`${viewMode === 'grid' ? 'aspect-video w-full' : 'size-20'} rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative group-hover:shadow-2xl transition-all ring-1 ring-slate-100 dark:ring-white/5`}>
                                    {asset.resource_type === 'video' ? (
                                        <div className="w-full h-full flex items-center justify-center relative">
                                            <span className="material-symbols-outlined text-4xl text-primary/30 group-hover:scale-110 transition-transform">play_circle</span>
                                            <div className="absolute inset-0 bg-primary/5"></div>
                                        </div>
                                    ) : (
                                        <img src={asset.secure_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                    )}
                                    <div className="absolute top-2 right-2 px-3 py-1 bg-black/40 backdrop-blur-xl rounded-lg text-[8px] font-black text-white uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {asset.format.toUpperCase()}
                                    </div>
                                </div>

                                <div className={`flex-1 ${viewMode === 'grid' ? 'mt-6' : ''}`}>
                                    <h4 className="text-xs font-black dark:text-white uppercase tracking-tight truncate mb-1">{asset.public_id.split('/').pop()}</h4>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{formatSize(asset.bytes)}</p>
                                        <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest">{new Date(asset.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {viewMode === 'list' && (
                                    <div className="flex items-center gap-4">
                                        <a href={asset.secure_url} target="_blank" rel="noreferrer" className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">open_in_new</span>
                                        </a>
                                        <button className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Shard Telemetry */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 size-32 bg-primary/10 rounded-full blur-[40px] -mr-16 -mt-16"></div>
                        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Cache Integrity</h5>
                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-4xl font-black text-white tracking-tighter">94.2%</span>
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-lg mb-1">+1.2%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary shadow-[0_0_15px_rgba(238,43,59,0.5)] w-[94.2%]"></div>
                        </div>
                     </div>
                     <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 group">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Matrix Bandwidth</h5>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-black dark:text-white tracking-tighter">1.2TB</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">THIS_MONTH</span>
                        </div>
                        <div className="mt-6 flex gap-1 h-8 items-end">
                            {[40, 60, 45, 90, 65, 40, 75, 50, 85, 30].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-all" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                     </div>
                     <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 flex flex-col justify-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="size-14 rounded-[1.5rem] bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">hub</span>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Edge Nodes</p>
                                <p className="text-2xl font-black dark:text-white tracking-tighter">14 ACTIVE</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">PROPAGATION_OPTIMAL</p>
                        </div>
                     </div>
                </section>
            </div>

            {/* Modal Detail */}
            {selectedAsset && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-card-dark w-full max-w-4xl rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row max-h-[90vh]">
                        <div className="flex-1 bg-black flex items-center justify-center min-h-[300px]">
                            {selectedAsset.resource_type === 'video' ? (
                                <video controls className="w-full h-full max-h-[60vh] object-contain" src={selectedAsset.secure_url} />
                            ) : (
                                <img src={selectedAsset.secure_url} className="w-full h-full object-contain" alt="" />
                            )}
                        </div>
                        <div className="w-full lg:w-96 p-12 bg-slate-50 dark:bg-card-dark border-l border-white/5 space-y-10 overflow-y-auto">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter leading-none mb-2">Asset Details</h4>
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-[8px] font-black rounded-lg uppercase tracking-widest border border-primary/20">PUBLIC_NODE</span>
                                </div>
                                <button onClick={() => setSelectedAsset(null)} className="size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 flex items-center justify-center text-slate-400 transition-all">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: 'Asset Identifier', val: selectedAsset.public_id },
                                    { label: 'Storage Size', val: formatSize(selectedAsset.bytes) },
                                    { label: 'Matrix Format', val: selectedAsset.format.toUpperCase() },
                                    { label: 'Temporal Signature', val: new Date(selectedAsset.created_at).toLocaleString() },
                                    { label: 'Access Protocol', val: 'SECURE_HTTPS' }
                                ].map((item, idx) => (
                                    <div key={idx} className="pb-4 border-b border-slate-200 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-xs font-black dark:text-white uppercase tracking-tight break-all">{item.val}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 space-y-4">
                                <a 
                                    href={selectedAsset.secure_url} 
                                    download 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full py-5 bg-primary text-white text-[10px] font-black rounded-3xl uppercase tracking-widest flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 shadow-xl shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Propagate Locally
                                </a>
                                <button className="w-full py-4 bg-white/5 border border-white/10 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all">
                                    Purge Resource
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            ` }} />
        </DashboardLayout>
    );
};

export default MediaStorage;
