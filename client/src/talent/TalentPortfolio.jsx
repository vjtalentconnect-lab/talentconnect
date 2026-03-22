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
                        background: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(34, 16, 18, 0.4) 60%, rgba(34, 16, 18, 1) 100%);
                    }
                    .glass-card {
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

            <div className="pb-24">
                {/* Hero Section */}
                <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl group mb-12 border border-white/5">
                    <div className="absolute inset-0">
                        <img 
                            alt="Main Portrait" 
                            className="w-full h-full object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-1000" 
                            src={avatarUrl} 
                        />
                        <div className="absolute inset-0 cinematic-gradient"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/50 text-primary text-[10px] font-black tracking-[0.2em] uppercase rounded mb-4">
                                    {profile?.isVerified ? 'Verified Pro' : 'Leading Talent'}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2 uppercase italic">
                                    {profile?.fullName}
                                </h2>
                                <p className="text-lg md:text-xl text-primary font-bold tracking-wide uppercase italic flex items-center gap-4">
                                    <span>{profile?.talentCategory} • {profile?.location || 'Location Not Set'}</span>
                                    {profile?.mobile && (
                                        <span className="flex items-center gap-2 text-slate-400 text-sm font-semibold h-full border-l border-white/20 pl-4 normal-case not-italic">
                                            <span className="material-symbols-outlined text-sm">call</span>
                                            {profile.mobile}
                                        </span>
                                    )}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-4">
                                <div className="glass-card px-6 py-4 rounded-2xl text-center min-w-[110px]">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Height</p>
                                    <p className="text-xl font-bold text-white">{profile?.physicalAttributes?.height || attrs.height || '-'}</p>
                                </div>
                                <div className="glass-card px-6 py-4 rounded-2xl text-center min-w-[110px]">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Eyes</p>
                                    <p className="text-xl font-bold text-white">{profile?.physicalAttributes?.eyeColor || attrs.eyeColor || '-'}</p>
                                </div>
                                <div className="glass-card px-6 py-4 rounded-2xl text-center min-w-[110px]">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Build</p>
                                    <p className="text-xl font-bold text-white">{profile?.physicalAttributes?.build || attrs.build || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    {isOwnProfile && (
                        <div className="absolute top-8 right-8 z-20 flex gap-3">
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Download CV
                            </button>
                            <button className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all text-white">
                                <span className="material-symbols-outlined text-sm">share</span>
                            </button>
                        </div>
                    )}
                </section>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Biography */}
                        <section id="biography" className="relative">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black tracking-[0.3em] uppercase text-primary flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-primary"></span>
                                    Professional Biography
                                </h3>
                                {isOwnProfile && !editingBio && (
                                    <button 
                                        onClick={() => setEditingBio(true)}
                                        className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-1.5 hover:underline"
                                    >
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                        Rewrite Bio
                                    </button>
                                )}
                            </div>

                            {editingBio ? (
                                <div className="space-y-4">
                                    <textarea
                                        rows={6}
                                        value={bioText}
                                        onChange={e => setBioText(e.target.value)}
                                        className="w-full bg-surface-dark border border-white/10 rounded-2xl px-6 py-5 text-slate-300 font-medium outline-none focus:border-primary/50 transition-all resize-none leading-loose custom-scrollbar"
                                        placeholder="Express your artistic journey..."
                                    />
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={handleSaveBio} 
                                            disabled={savingBio}
                                            className="px-8 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50"
                                        >
                                            {savingBio ? 'Updating Chronicles...' : 'Save Biography'}
                                        </button>
                                        <button 
                                            onClick={() => setEditingBio(false)}
                                            className="px-8 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                                        >
                                            Terminate
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <p className="text-2xl md:text-3xl leading-relaxed text-slate-300 font-light italic opacity-90">
                                        "{bioText ? bioText.split('.')[0] + '.' : 'Click "Rewrite Bio" to craft your artistic statement.'}"
                                    </p>
                                    <div className="space-y-6 text-slate-400 leading-loose text-lg">
                                        <p>{bioText || 'No history recorded yet in the archives.'}</p>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Media Gallery */}
                        <section id="gallery">
                            <div className="flex justify-between items-end mb-10">
                                <div>
                                    <h3 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-3">Visual Portfolio</h3>
                                    <h2 className="text-3xl font-black uppercase text-white italic">Stills & Moods</h2>
                                </div>
                                {isOwnProfile && (
                                    <label className={`text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:underline ${uploadingMedia ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        {uploadingMedia ? 'TRANSMITTING...' : (
                                            <>
                                                ADD FRAME
                                                <span className="material-symbols-outlined text-lg">add_a_photo</span>
                                            </>
                                        )}
                                        <input type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaUpload} disabled={uploadingMedia}/>
                                    </label>
                                )}
                            </div>
                            
                            <div className="columns-2 md:columns-3 gap-6 space-y-6">
                                {(profile?.portfolio || []).map((item, idx) => (
                                    <div key={item._id || idx} className="relative group overflow-hidden rounded-2xl cursor-pointer">
                                        <img 
                                            src={item.url || item} 
                                            alt={`Portolio ${idx}`} 
                                            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-4xl">fullscreen</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Film Credits */}
                        <section id="credits">
                            <div className="flex items-center gap-4 mb-10">
                                <span className="material-symbols-outlined text-primary text-3xl">movie</span>
                                <h4 className="text-2xl font-black uppercase tracking-tight text-white italic">Performance Credits</h4>
                            </div>
                            
                            {filmCredits.length === 0 ? (
                                <div className="text-center py-16 bg-white/5 border border-dashed border-white/10 rounded-3xl">
                                    <span className="material-symbols-outlined text-5xl text-slate-600 mb-4 block">theaters</span>
                                    <p className="text-slate-500 font-bold text-sm tracking-wide uppercase italic">The chronicles begin when you are cast.</p>
                                </div>
                            ) : (
                                <div className="bg-surface-dark/50 rounded-3xl border border-white/5 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 border-b border-white/10">
                                            <tr>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Project Title</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Role</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Production</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Year</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filmCredits.map((credit, idx) => (
                                                <tr key={idx} className="group hover:bg-primary/5 transition-colors">
                                                    <td className="px-8 py-6 font-black text-white italic group-hover:text-primary transition-colors uppercase tracking-tight">
                                                        {credit.title}
                                                    </td>
                                                    <td className="px-8 py-6 text-slate-300 text-sm font-medium">{credit.role}</td>
                                                    <td className="px-8 py-6 text-slate-500 text-sm font-medium">{credit.production}</td>
                                                    <td className="px-8 py-6 text-slate-500 text-sm font-bold text-right italic">{credit.year}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Attributes */}
                        <div className="glass-card p-8 rounded-3xl">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-base font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                                    Physical Specs
                                </h4>
                                {isOwnProfile && !editingAttrs && (
                                    <button 
                                        onClick={() => setEditingAttrs(true)}
                                        className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline"
                                    >
                                        Calibrate
                                    </button>
                                )}
                            </div>

                            {editingAttrs ? (
                                <div className="space-y-5">
                                    {[
                                        { key: 'height', label: 'Height' },
                                        { key: 'eyeColor', label: 'Eyes' },
                                        { key: 'skinTone', label: 'Skin' },
                                        { key: 'hairColor', label: 'Hair' },
                                        { key: 'build', label: 'Build' },
                                        { key: 'waist', label: 'Waist' },
                                        { key: 'chest', label: 'Chest' },
                                    ].map(({ key, label }) => (
                                        <div key={key}>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">{label}</label>
                                            <input 
                                                type="text" 
                                                value={attrs[key]} 
                                                onChange={e => setAttrs(p => ({ ...p, [key]: e.target.value }))}
                                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>
                                    ))}
                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            onClick={handleSaveAttrs} 
                                            disabled={savingAttrs}
                                            className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                        >
                                            {savingAttrs ? 'Saving...' : 'Confirm'}
                                        </button>
                                        <button 
                                            onClick={() => setEditingAttrs(false)}
                                            className="flex-1 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest"
                                        >
                                            Abort
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                                    {[
                                        { label: 'Height', value: profile?.physicalAttributes?.height || attrs.height || '-' },
                                        { label: 'Eyes', value: profile?.physicalAttributes?.eyeColor || attrs.eyeColor || '-' },
                                        { label: 'Skin', value: profile?.physicalAttributes?.skinTone || attrs.skinTone || '-' },
                                        { label: 'Hair', value: profile?.physicalAttributes?.hairColor || attrs.hairColor || '-' },
                                        { label: 'Build', value: profile?.physicalAttributes?.build || attrs.build || '-' },
                                        { label: 'Waist', value: profile?.physicalAttributes?.waist || attrs.waist || '-' },
                                    ].map(({ label, value }) => (
                                        <div key={label}>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">{label}</p>
                                            <p className="font-black text-white text-lg tracking-tight italic">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Core Skills */}
                        <div id="skills" className="glass-card p-8 rounded-3xl">
                            <h4 className="text-base font-black text-white uppercase italic tracking-tighter flex items-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-primary text-xl">military_tech</span>
                                expertise
                            </h4>
                            <div className="flex flex-wrap gap-2.5">
                                {(profile?.skills || []).length > 0 ? (
                                    profile.skills.map(skill => (
                                        <span key={skill} className="bg-primary/10 border border-primary/30 text-primary px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">No elite skills logged.</p>
                                )}
                            </div>
                        </div>

                        {/* Verified Credentials */}
                        {profile?.verificationState && (
                            <div className="glass-card p-8 rounded-3xl">
                                <h4 className="text-base font-black text-white uppercase italic tracking-tighter flex items-center gap-2 mb-8">
                                    <span className="material-symbols-outlined text-green-500 text-xl">verified</span>
                                    Verified Credentials
                                </h4>
                                <div className="space-y-4">
                                    {profile.verificationState.imdbUrl && (
                                        <a href={profile.verificationState.imdbUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                                            <span className="text-[10px] font-black uppercase text-slate-400">IMDb Profile</span>
                                            <span className="material-symbols-outlined text-primary text-sm transition-transform group-hover:translate-x-1">open_in_new</span>
                                        </a>
                                    )}
                                    {profile.verificationState.associationName && (
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{profile.verificationState.associationName}</p>
                                            <p className="text-xs font-bold text-white tracking-widest">{profile.verificationState.membershipId}</p>
                                        </div>
                                    )}
                                    {!profile.verificationState.imdbUrl && !profile.verificationState.associationName && (
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Verification in progress...</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div className="p-8 rounded-3xl bg-primary shadow-2xl shadow-primary/20 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <h5 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Next Blockbuster?</h5>
                                <p className="text-white/80 text-xs font-bold leading-relaxed mb-6 uppercase tracking-wider">
                                    Contact managers for high-impact character leads.
                                </p>
                                <button className="w-full bg-white text-primary py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                                    Contact Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TalentPortfolio;

