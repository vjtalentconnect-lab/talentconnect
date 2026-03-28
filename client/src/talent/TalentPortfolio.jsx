import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU, DIRECTOR_MENU, ADMIN_MENU } from '../constants/navigation';
import { getMyProfile, getProfileById, updateProfile, uploadMedia } from '../services/profileService';
import { getMyApplications } from '../services/projectService';
import { useNotifications } from '../context/NotificationContext';

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const TalentPortfolio = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [viewerProfile, setViewerProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [editingBio, setEditingBio] = useState(false);
    const [bioText, setBioText] = useState('');
    const [savingBio, setSavingBio] = useState(false);
    const [editingAttrs, setEditingAttrs] = useState(false);
    const [attrs, setAttrs] = useState({ 
        height: '', 
        eyeColor: '', 
        skinTone: '', 
        hairColor: '', 
        build: '', 
        waist: '', 
        chest: '' 
    });
    const [savingAttrs, setSavingAttrs] = useState(false);
    const [uploadingMedia, setUploadingMedia] = useState(false);

    const isOwnProfile = !id || (viewerProfile?.user?._id === profile?.user?._id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const viewerRes = await getMyProfile();
                setViewerProfile(viewerRes.data);

                let profileRes;
                if (id) {
                    profileRes = await getProfileById(id);
                } else {
                    profileRes = await getMyProfile();
                }
                
                const p = profileRes.data;
                setProfile(p);
                setBioText(p.bio || '');
                setAttrs({
                    height: p.physicalAttributes?.height || '',
                    eyeColor: p.physicalAttributes?.eyeColor || '',
                    skinTone: p.physicalAttributes?.skinTone || '',
                    hairColor: p.physicalAttributes?.hairColor || '',
                    build: p.physicalAttributes?.build || '',
                    waist: p.physicalAttributes?.waist || '',
                    chest: p.physicalAttributes?.chest || '',
                });

                // Only fetch applications if it's the user's own profile (to show credits they've earned)
                // Actually, for talent portfolio, common practice is to show credits in which they were selected.
                // If it's own profile, getMyApplications shows all including applied.
                // If it's someone else, we might need a separate API or the profile object should include public credits.
                // For now, let's just fetch applications if it's own profile to keep it safe.
                if (!id) {
                    const appsRes = await getMyApplications();
                    setApplications(appsRes.data);
                }
            } catch (err) {
                console.error('Error fetching portfolio:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchData);
        return () => window.removeEventListener('userStateChange', fetchData);
    }, [id]);

    const showToast = (msg, type = 'success') => setToast({ message: msg, type });

    const handleSaveBio = async () => {
        setSavingBio(true);
        try {
            const res = await updateProfile({ bio: bioText });
            setProfile(res.data);
            setEditingBio(false);
            showToast('Bio updated!');
        } catch { showToast('Failed to update bio.', 'error'); }
        finally { setSavingBio(false); }
    };

    const handleSaveAttrs = async () => {
        setSavingAttrs(true);
        try {
            const res = await updateProfile({ physicalAttributes: attrs });
            setProfile(res.data);
            setEditingAttrs(false);
            showToast('Attributes saved!');
        } catch { showToast('Failed to save attributes.', 'error'); }
        finally { setSavingAttrs(false); }
    };

    const handleMediaUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 20 * 1024 * 1024) { showToast('File too large (max 20MB)', 'error'); return; }
        setUploadingMedia(true);
        try {
            const fd = new FormData();
            fd.append('media', file);
            const res = await uploadMedia(fd);
            setProfile(prev => ({ ...prev, portfolio: [...(prev.portfolio || []), res.data] }));
            showToast('Media added to portfolio!');
        } catch { showToast('Upload failed. Try again.', 'error'); }
        finally { setUploadingMedia(false); }
    };

    const menuItems = viewerProfile?.user?.role === 'admin' ? ADMIN_MENU : 
                        viewerProfile?.user?.role === 'director' ? DIRECTOR_MENU : 
                        TALENT_MENU;

    const navUserData = {
        name: viewerProfile?.fullName || 'User',
        roleTitle: viewerProfile?.companyName || viewerProfile?.talentCategory || 'Member',
        avatar: viewerProfile?.profilePicture && viewerProfile.profilePicture !== 'no-photo.jpg'
            ? viewerProfile.profilePicture
            : 'https://ui-avatars.com/api/?name=' + (viewerProfile?.fullName || 'User'),
    };

    const filmCredits = applications
        .filter(a => ['shortlisted', 'selected'].includes(a.status))
        .map(a => ({
            id: a._id,
            title: a.project?.title || 'Untitled',
            role: a.role || 'Lead',
            production: a.project?.director?.fullName || 'Production',
            year: new Date(a.createdAt).getFullYear(),
            type: a.project?.category || 'Feature Film',
            status: a.status,
        }));

    if (loading) return (
        <DashboardLayout menuItems={menuItems} userData={navUserData} headerTitle="Portfolio View">
            <div className="flex items-center justify-center py-20 min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Developing Portfolio...</p>
                </div>
            </div>
        </DashboardLayout>
    );

    const avatarUrl = profile?.profilePicture === 'no-photo.jpg'
        ? 'https://ui-avatars.com/api/?name=' + profile?.fullName
        : profile?.profilePicture;

    return (
        <DashboardLayout 
            menuItems={menuItems} 
            userData={navUserData}
            verificationStatus={profile?.user?.verificationStatus || authUser?.verificationStatus || 'none'}
            headerTitle={isOwnProfile ? "Portfolio Control" : "Talent Profile"} 
            headerSubtitle={isOwnProfile ? "Manage your public StarCast identity." : `Reviewing ${profile?.fullName}'s professional background.`}
        >
            <style>
                {`
                    .cinematic-gradient {
                        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(200, 200, 200, 0.1) 60%, rgba(255, 255, 255, 1) 100%);
                    }
                    .dark .cinematic-gradient {
                        background: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(34, 16, 18, 0.4) 60%, rgba(34, 16, 18, 1) 100%);
                    }
                    .glass-card {
                        background: rgba(255, 255, 255, 0.6);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    .dark .glass-card {
                        background: rgba(42, 26, 20, 0.4);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(238, 43, 59, 0.1);
                    }
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #ee2b3b; border-radius: 10px; }
                `}
            </style>

            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

            <div className="pb-24 text-slate-900 dark:text-zinc-100 font-sans">
                {/* Hero Section */}
                <section className="relative h-[614px] min-h-[450px] w-full overflow-hidden rounded-3xl mb-12 border border-slate-200 dark:border-zinc-800">
                    <div className="absolute inset-0">
                        <img alt={profile?.fullName || "Hero"} className="w-full h-full object-cover object-top" src={avatarUrl} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-white/40 dark:via-zinc-950/40 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase mb-4 rounded-sm">
                                    Artist ID: {(profile?.user?._id || '000000').substring(0,6)}
                                </span>
                                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-white mb-2">{profile?.fullName}</h1>
                                <p className="text-red-500 font-medium text-lg flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                    {profile?.location || 'Location Not Set'}
                                </p>
                            </div>
                            {isOwnProfile && (
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-lg font-bold transition-all">
                                    <span className="material-symbols-outlined text-sm z-0">edit</span>
                                    Edit Profile
                                </button>
                                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-red-600/20 transition-all">
                                    <span className="material-symbols-outlined text-sm">share</span>
                                    Share
                                </button>
                            </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 space-y-16">
                    {/* Bento Grid Stats */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
                            <span className="text-slate-500 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">Category</span>
                            <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-zinc-100">{profile?.talentCategory || 'Actor'}</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
                            <span className="text-slate-500 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">Experience</span>
                            <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-zinc-100">{profile?.skills?.length || 0} Skills</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
                            <span className="text-slate-500 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">Availability</span>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100">Ready to Shoot</p>
                            </div>
                        </div>
                    </section>

                    {/* Bio & Attributes Asymmetric Layout */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Professional Biography</h3>
                                {isOwnProfile && !editingBio && (
                                <button onClick={() => setEditingBio(true)} className="text-primary hover:text-red-400 text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">edit</span> Edit Bio
                                </button>
                                )}
                            </div>
                            {editingBio ? (
                                <div className="space-y-4">
                                    <textarea
                                        rows={6}
                                        value={bioText}
                                        onChange={e => setBioText(e.target.value)}
                                        className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-6 py-5 text-slate-700 dark:text-zinc-300 font-medium outline-none focus:border-red-500/50 transition-all shadow-inner resize-none leading-relaxed"
                                        placeholder="Express your artistic journey..."
                                    />
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={handleSaveBio} 
                                            disabled={savingBio}
                                            className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-sm tracking-wide hover:bg-red-700 transition-all disabled:opacity-50"
                                        >
                                            {savingBio ? 'Saving...' : 'Save Biography'}
                                        </button>
                                        <button 
                                            onClick={() => setEditingBio(false)}
                                            className="px-6 py-2 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-lg font-bold text-sm tracking-wide hover:bg-zinc-700 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-zinc-400 leading-relaxed space-y-4">
                                    {bioText ? bioText.split('\n').map((para, i) => <p key={i}>{para}</p>) : <p>No history recorded yet in the archives.</p>}
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Physical Attributes</h3>
                                {isOwnProfile && !editingAttrs && (
                                <button onClick={() => setEditingAttrs(true)} className="text-primary hover:text-red-400 text-sm font-bold">Manage</button>
                                )}
                            </div>
                            {editingAttrs ? (
                                <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { key: 'height', label: 'Height' },
                                            { key: 'eyeColor', label: 'Eyes' },
                                            { key: 'hairColor', label: 'Hair' },
                                            { key: 'build', label: 'Build' },
                                        ].map(({ key, label }) => (
                                            <div key={key}>
                                                <label className="text-zinc-500 text-[10px] font-bold uppercase block mb-1">{label}</label>
                                                <input 
                                                    type="text" 
                                                    value={attrs[key]} 
                                                    onChange={e => setAttrs(p => ({ ...p, [key]: e.target.value }))}
                                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm font-semibold text-white outline-none focus:border-red-500/50 transition-all"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button 
                                            onClick={handleSaveAttrs} 
                                            disabled={savingAttrs}
                                            className="flex-1 py-2 bg-red-600 text-white rounded-md font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                                        >
                                            {savingAttrs ? 'Saving...' : 'Confirm'}
                                        </button>
                                        <button 
                                            onClick={() => setEditingAttrs(false)}
                                            className="flex-1 py-2 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-md font-bold text-xs uppercase tracking-wider"
                                        >
                                            Abort
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Height', value: profile?.physicalAttributes?.height || attrs.height || '-' },
                                        { label: 'Eyes', value: profile?.physicalAttributes?.eyeColor || attrs.eyeColor || '-' },
                                        { label: 'Hair', value: profile?.physicalAttributes?.hairColor || attrs.hairColor || '-' },
                                        { label: 'Build', value: profile?.physicalAttributes?.build || attrs.build || '-' }
                                    ].map(({ label, value }) => (
                                        <div key={label} className="bg-white dark:bg-zinc-900/50 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">
                                            <span className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold uppercase block mb-1">{label}</span>
                                            <span className="text-lg font-semibold text-slate-900 dark:text-zinc-100">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Media Gallery */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Media Gallery</h3>
                            {isOwnProfile && (
                                <label className={`bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all cursor-pointer border border-slate-200 dark:border-zinc-700 ${uploadingMedia ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <span className="material-symbols-outlined text-sm">upload</span> {uploadingMedia ? 'Uploading...' : 'Upload Media'}
                                    <input type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaUpload} disabled={uploadingMedia}/>
                                </label>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(profile?.portfolio || []).map((item, idx) => (
                                <div key={idx} className={`group relative rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm ${idx % 3 === 2 ? 'md:col-span-2 aspect-video' : 'aspect-[3/4]'}`}>
                                    <img 
                                        alt={`Media ${idx + 1}`} 
                                        className={`w-full h-full object-cover transition-all duration-500 ${idx % 3 === 2 ? 'brightness-75 dark:brightness-50 group-hover:brightness-100 dark:group-hover:brightness-75' : 'grayscale group-hover:grayscale-0'}`} 
                                        src={item.url || item} 
                                    />
                                    {idx % 3 === 2 ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                            </div>
                                            <span className="text-white font-bold text-lg">Showreel</span>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="material-symbols-outlined text-white text-3xl">fullscreen</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Credits Table */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Filmography</h3>
                            {isOwnProfile && (
                            <button className="bg-primary/5 hover:bg-primary/10 text-primary px-4 py-2 rounded font-bold text-sm flex items-center gap-2 border border-primary/20 transition-all">
                                <span className="material-symbols-outlined text-sm">add</span> Add New Credit
                            </button>
                            )}
                        </div>
                        <div className="overflow-hidden border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/30 backdrop-blur-sm shadow-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-zinc-900/80 text-slate-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800">
                                        <th className="px-6 py-4">Project Title</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Year</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                    {filmCredits.length > 0 ? filmCredits.map((credit, idx) => (
                                    <tr key={credit.id || idx} className="group hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-5 font-bold text-slate-900 dark:text-zinc-100">{credit.title}</td>
                                        <td className="px-6 py-5 text-slate-500 dark:text-zinc-400">{credit.role}</td>
                                        <td className="px-6 py-5 text-slate-500 dark:text-zinc-400">{credit.year}</td>
                                        <td className="px-6 py-5">
                                            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded">Completed</span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-zinc-500 hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-sm">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-zinc-500 font-medium">No performance records added yet.</td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TalentPortfolio;

