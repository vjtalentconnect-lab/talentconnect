import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile, updateProfile, uploadMedia } from '../services/profileService';
import { getMyProjects } from '../services/projectService';
import { DIRECTOR_MENU } from '../constants/navigation';

/* ── Skill Chip ─────────────────────────────────────────────── */
const SkillChip = ({ label, onRemove, editable }) => (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider
        bg-primary/10 text-primary border border-primary/20`}>
        {label}
        {editable && (
            <button onClick={() => onRemove(label)}
                className="hover:text-red-500 transition-colors leading-none text-base font-bold">&times;</button>
        )}
    </span>
);

/* ── Input field helper ─────────────────────────────────────── */
const Field = ({ label, name, value, onChange, type = 'text', rows }) => (
    <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
        {rows ? (
            <textarea
                name={name} value={value || ''} onChange={onChange} rows={rows}
                className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl
                    text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-primary resize-none"
            />
        ) : (
            <input
                type={type} name={name} value={value || ''} onChange={onChange}
                className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl
                    text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-primary"
            />
        )}
    </div>
);

/* ═══════════════════════════════════════════════════════════════
   DIRECTOR PORTFOLIO — editable own profile
   ═══════════════════════════════════════════════════════════════ */
const DirectorPortfolio = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingPic, setUploadingPic] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    // Edit form state
    const [form, setForm] = useState({
        fullName: '', bio: '', companyName: '', location: '',
        experienceYears: '', website: '', instagram: '', linkedin: '',
    });
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    /* ── Fetch data ─────────────────────────────── */
    useEffect(() => {
        (async () => {
            try {
                const [profileRes, projectsRes] = await Promise.all([getMyProfile(), getMyProjects()]);
                const p = profileRes.data;
                setProfile(p);
                const raw = projectsRes.data || [];
                setProjects(raw.map(pr => ({ ...pr, _id: pr._id || pr.id, id: pr.id || pr._id })));
                // Prime form
                setForm({
                    fullName: p?.fullName || '',
                    bio: p?.bio || '',
                    companyName: p?.companyName || '',
                    location: p?.location || '',
                    experienceYears: p?.experienceYears || '',
                    website: p?.socialLinks?.website || '',
                    instagram: p?.socialLinks?.instagram || '',
                    linkedin: p?.socialLinks?.linkedin || '',
                });
                setSkills(p?.skills || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    /* ── Handlers ───────────────────────────────── */
    const handleFormChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleAddSkill = (e) => {
        e.preventDefault();
        const s = newSkill.trim();
        if (s && !skills.includes(s)) {
            setSkills(prev => [...prev, s]);
        }
        setNewSkill('');
    };

    const handleRemoveSkill = (s) => setSkills(prev => prev.filter(x => x !== s));

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                fullName: form.fullName,
                bio: form.bio,
                companyName: form.companyName,
                location: form.location,
                experienceYears: form.experienceYears,
                skills,
                socialLinks: {
                    website: form.website,
                    instagram: form.instagram,
                    linkedin: form.linkedin,
                },
            };
            const res = await updateProfile(payload);
            const updated = res.data || res;
            setProfile(updated);
            setSaveMsg('Profile saved!');
            setTimeout(() => setSaveMsg(''), 3000);
            setEditOpen(false);
        } catch (err) {
            console.error(err);
            setSaveMsg('Save failed. Try again.');
            setTimeout(() => setSaveMsg(''), 3000);
        } finally {
            setSaving(false);
        }
    };

    const handlePicUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingPic(true);
        try {
            const res = await uploadMedia(file, 'profilePicture');
            setProfile(prev => ({ ...prev, profilePicture: res.data?.profilePicture || res.profilePicture || prev.profilePicture }));
        } catch (err) {
            console.error(err);
        } finally {
            setUploadingPic(false);
        }
    };

    /* ── Derived ───────────────────────────────── */
    const avatarUrl = profile?.profilePicture && profile.profilePicture !== 'no-photo.jpg'
        ? profile.profilePicture
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.fullName || 'D')}&background=ee2b3b&color=fff&size=200`;
    const openCount = projects.filter(p => p.status === 'open').length;
    const closedCount = projects.filter(p => p.status === 'closed').length;

    const userData = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Production House'} • ${profile?.location || 'India'}`,
        avatar: avatarUrl,
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="My Portfolio"
            headerSubtitle="Your public director profile — editable at any time."
            searchPlaceholder="Search projects, talent..."
        >
            {loading ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Vision...</p>
                </div>
            ) : (
                <div className="space-y-6 md:space-y-10">

                    {/* ── Save toast ─────────────────────────────── */}
                    {saveMsg && (
                        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-2xl text-sm font-black shadow-2xl
                            ${saveMsg.includes('failed') ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                            {saveMsg}
                        </div>
                    )}

                    {/* ── Hero card ──────────────────────────────── */}
                    <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#1a1a1a] text-white"
                        style={{ background: 'linear-gradient(135deg,#1a1a1a 0%,#2a1018 100%)' }}>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/15 to-transparent" />

                        {/* Banner / cover */}
                        <div className="h-28 md:h-48 w-full overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200"
                                alt="Cover"
                                className="w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                        </div>

                        {/* Profile area */}
                        <div className="relative z-10 px-5 md:px-10 pb-6 md:pb-10 -mt-10 md:-mt-16 flex flex-col sm:flex-row sm:items-end gap-4">
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-4 border-[#1a1a1a] overflow-hidden shadow-2xl">
                                    {uploadingPic ? (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                            <div className="animate-spin rounded-full size-8 border-2 border-t-primary border-white/20" />
                                        </div>
                                    ) : (
                                        <img src={avatarUrl} alt={profile?.fullName} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-1 -right-1 size-7 bg-primary rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
                                    title="Change photo"
                                >
                                    <span className="material-symbols-outlined text-white text-[14px]">photo_camera</span>
                                </button>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePicUpload} />
                            </div>

                            {/* Name & meta */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                    <div>
                                        <span className="inline-block px-2.5 py-0.5 bg-primary text-white text-[9px] font-black tracking-widest uppercase rounded mb-2">Director</span>
                                        <h1 className="text-2xl md:text-4xl font-black tracking-tighter">{profile?.fullName || 'Your Name'}</h1>
                                        <p className="text-primary font-bold text-sm md:text-base mt-1">
                                            {profile?.companyName || 'Production House'}
                                            {profile?.location ? ` • ${profile.location}` : ''}
                                        </p>
                                        {profile?.bio && (
                                            <p className="text-slate-300 text-sm mt-2 max-w-xl line-clamp-2">{profile.bio}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setEditOpen(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/15 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all shrink-0"
                                    >
                                        <span className="material-symbols-outlined text-base">edit</span>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats strip */}
                        <div className="border-t border-white/10 px-5 md:px-10 py-4 flex gap-8 overflow-x-auto no-scrollbar">
                            {[
                                { label: 'Total Projects', value: projects.length },
                                { label: 'Open', value: openCount },
                                { label: 'Completed', value: closedCount },
                                { label: 'Skills', value: skills.length },
                            ].map(stat => (
                                <div key={stat.label} className="text-center shrink-0">
                                    <p className="text-2xl font-black">{stat.value}</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Content grid ───────────────────────────── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                        {/* Left column */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* About */}
                            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5 md:p-6">
                                <h2 className="text-base font-black uppercase tracking-tight dark:text-white flex items-center gap-2 mb-4">
                                    <span className="size-1.5 bg-primary rounded-full" />About
                                </h2>
                                {profile?.bio ? (
                                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">{profile.bio}</p>
                                ) : (
                                    <button onClick={() => setEditOpen(true)} className="flex items-center gap-2 text-primary text-sm font-bold hover:underline">
                                        <span className="material-symbols-outlined text-base">add_circle</span>
                                        Add a biography
                                    </button>
                                )}
                            </div>

                            {/* Skills */}
                            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5 md:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-base font-black uppercase tracking-tight dark:text-white flex items-center gap-2">
                                        <span className="size-1.5 bg-primary rounded-full" />Skills &amp; Expertise
                                    </h2>
                                    <button onClick={() => setEditOpen(true)} className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Manage</button>
                                </div>
                                {skills.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(s => <SkillChip key={s} label={s} editable={false} />)}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-sm italic">No skills added yet.</p>
                                )}
                            </div>

                            {/* Projects */}
                            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5 md:p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-base font-black uppercase tracking-tight dark:text-white flex items-center gap-2">
                                        <span className="size-1.5 bg-primary rounded-full" />My Projects
                                    </h2>
                                    <Link to="/director/my-projects" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All</Link>
                                </div>
                                {projects.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {projects.slice(0, 4).map(project => {
                                            const pid = project._id || project.id;
                                            return (
                                                <Link to={`/director/project/${pid}`} key={pid} className="group">
                                                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
                                                        <div className="h-24 bg-slate-800 relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"
                                                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80')" }} />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-[8px] font-bold rounded uppercase tracking-widest">
                                                                {project.category || 'Film'}
                                                            </span>
                                                            <span className={`absolute top-2 right-2 px-2 py-0.5 text-[8px] font-black rounded-full uppercase
                                                                ${project.status === 'open' ? 'bg-emerald-500/80 text-white' : 'bg-slate-600/80 text-white'}`}>
                                                                {project.status}
                                                            </span>
                                                        </div>
                                                        <div className="p-3">
                                                            <h4 className="font-bold text-sm dark:text-white group-hover:text-primary transition-colors line-clamp-1">{project.title}</h4>
                                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{project.location || 'India'} • {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">movie</span>
                                        <p className="text-slate-500 text-sm mb-4">No projects yet</p>
                                        <Link to="/director/create-project/step1" className="inline-block px-5 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110">
                                            Create Project
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right sidebar */}
                        <div className="space-y-4">

                            {/* Quick actions */}
                            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5">
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Quick Actions</h2>
                                <div className="space-y-2">
                                    {[
                                        { icon: 'add_circle', label: 'Create New Project', to: '/director/create-project/step1', primary: true },
                                        { icon: 'person_search', label: 'Discover Talent', to: '/director/discovery', primary: false },
                                        { icon: 'star', label: 'My Shortlists', to: '/director/shortlists', primary: false },
                                    ].map(a => (
                                        <Link key={a.to} to={a.to}
                                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-black transition-all
                                                ${a.primary ? 'bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20' : 'bg-slate-50 dark:bg-white/5 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'}`}>
                                            <span className="material-symbols-outlined text-base">{a.icon}</span>
                                            {a.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Contact info */}
                            {(profile?.location || profile?.companyName || profile?.socialLinks?.website) && (
                                <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact &amp; Links</h2>
                                        <button onClick={() => setEditOpen(true)} className="text-primary text-[10px] font-black uppercase hover:underline">Edit</button>
                                    </div>
                                    <div className="space-y-3">
                                        {profile?.location && (
                                            <div className="flex items-center gap-3 text-sm dark:text-slate-200">
                                                <span className="material-symbols-outlined text-primary text-base">location_on</span>
                                                {profile.location}
                                            </div>
                                        )}
                                        {profile?.companyName && (
                                            <div className="flex items-center gap-3 text-sm dark:text-slate-200">
                                                <span className="material-symbols-outlined text-primary text-base">business</span>
                                                {profile.companyName}
                                            </div>
                                        )}
                                        {profile?.socialLinks?.website && (
                                            <a href={profile.socialLinks.website} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-3 text-sm text-primary hover:underline">
                                                <span className="material-symbols-outlined text-base">language</span>
                                                Website
                                            </a>
                                        )}
                                        {profile?.socialLinks?.instagram && (
                                            <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-3 text-sm text-primary hover:underline">
                                                <span className="material-symbols-outlined text-base">photo_camera</span>
                                                Instagram
                                            </a>
                                        )}
                                        {profile?.socialLinks?.linkedin && (
                                            <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-3 text-sm text-primary hover:underline">
                                                <span className="material-symbols-outlined text-base">work</span>
                                                LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Public link notice */}
                            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
                                <span className="material-symbols-outlined text-primary text-2xl mb-1">share</span>
                                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Your public profile is visible to all talent</p>
                            </div>
                        </div>
                    </div>

                    {/* ════════════════════════════════════════════
                        EDIT PANEL (slide-over)
                    ════════════════════════════════════════════ */}
                    {editOpen && (
                        <div className="fixed inset-0 z-[70] flex">
                            {/* Backdrop */}
                            <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setEditOpen(false)} />

                            {/* Drawer */}
                            <div className="w-full max-w-md bg-white dark:bg-[#111] h-full overflow-y-auto shadow-2xl flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5 sticky top-0 bg-white dark:bg-[#111] z-10">
                                    <div>
                                        <h2 className="text-lg font-black dark:text-white">Edit Profile</h2>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Director Portfolio</p>
                                    </div>
                                    <button onClick={() => setEditOpen(false)} className="size-9 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
                                    </button>
                                </div>

                                {/* Form body */}
                                <div className="flex-1 px-6 py-6 space-y-5">
                                    <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleFormChange} />
                                    <Field label="Bio / About" name="bio" value={form.bio} onChange={handleFormChange} rows={4} />
                                    <Field label="Production Company" name="companyName" value={form.companyName} onChange={handleFormChange} />
                                    <Field label="Location" name="location" value={form.location} onChange={handleFormChange} />
                                    <Field label="Years of Experience" name="experienceYears" value={form.experienceYears} onChange={handleFormChange} type="number" />

                                    {/* Skills */}
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Skills &amp; Expertise</label>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {skills.map(s => <SkillChip key={s} label={s} editable onRemove={handleRemoveSkill} />)}
                                        </div>
                                        <form onSubmit={handleAddSkill} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newSkill}
                                                onChange={e => setNewSkill(e.target.value)}
                                                placeholder="Add skill (e.g. Cinematography)"
                                                className="flex-1 px-3 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary"
                                            />
                                            <button type="submit" className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-black hover:brightness-110">Add</button>
                                        </form>
                                    </div>

                                    {/* Social links */}
                                    <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Social Links</p>
                                        <div className="space-y-4">
                                            <Field label="Website URL" name="website" value={form.website} onChange={handleFormChange} />
                                            <Field label="Instagram URL" name="instagram" value={form.instagram} onChange={handleFormChange} />
                                            <Field label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={handleFormChange} />
                                        </div>
                                    </div>
                                </div>

                                {/* Save footer */}
                                <div className="px-6 py-5 border-t border-slate-100 dark:border-white/5 sticky bottom-0 bg-white dark:bg-[#111] flex gap-3">
                                    <button
                                        onClick={() => setEditOpen(false)}
                                        className="flex-1 py-3 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-sm font-black dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 py-3 bg-primary text-white rounded-2xl text-sm font-black hover:brightness-110 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <><div className="animate-spin rounded-full size-4 border-2 border-white/30 border-t-white" />Saving…</> : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </DashboardLayout>
    );
};

export default DirectorPortfolio;
