import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfileById, getProfileByUser } from '../services/profileService';
import { getProjects } from '../services/projectService';

/* ══════════════════════════════════════════════════════════════
   PUBLIC DIRECTOR PROFILE — read-only view for talent / admins
   ══════════════════════════════════════════════════════════════ */
const PublicDirectorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let p = null;
                try {
                    const res = await getProfileById(id);
                    p = res.data || res;
                } catch (e) {
                    // If not found by profile id, try by user id fallback
                    if (e?.response?.status === 404) {
                        const res2 = await getProfileByUser(id);
                        p = res2.data || res2;
                    } else {
                        throw e;
                    }
                }

                // More flexible role check
                const isDirector = p?.user?.role === 'director' || p?.role === 'director' || p?.userType === 'director';
                if (!isDirector) {
                    setError('This profile is not a director profile.');
                    setLoading(false);
                    return;
                }
                setProfile(p);

                // Fetch their posted projects
                try {
                    const directorUserId = p.user?.id || p.user?._id || p.user || id;
                    const projRes = await getProjects({ director: directorUserId, limit: 24 });
                    setProjects((projRes.data || projRes || []).slice(0, 6));
                } catch {
                    // Keep the profile visible even if the project feed fails.
                }
            } catch (err) {
                console.error(err);
                setError('Director profile not found.');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const avatarUrl = profile?.profilePicture && profile.profilePicture !== 'no-photo.jpg'
        ? profile.profilePicture
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.fullName || 'D')}&background=ee2b3b&color=fff&size=200`;

    if (loading) return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Loading Director Profile…</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center gap-4 px-6">
            <span className="material-symbols-outlined text-5xl text-slate-300">person_off</span>
            <p className="text-slate-500 font-bold text-center">{error}</p>
            <button onClick={() => navigate(-1)} className="px-6 py-3 bg-primary text-white rounded-2xl font-black text-sm hover:brightness-110">Go Back</button>
        </div>
    );

    const skills = profile?.skills || [];
    const openProjects = projects.filter(p => p.status === 'open');

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* ── Top navbar strip ──────────────────────── */}
            <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 px-4 py-3 flex items-center gap-4">
                <button onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                </button>
                <div className="flex-1 flex items-center gap-2">
                    <img src="/TC Logo.png" alt="logo" className="h-6 w-auto" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Director Profile</span>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-6">

                {/* ── Hero card ─────────────────────────────── */}
                <section className="relative overflow-hidden rounded-2xl md:rounded-3xl text-white"
                    style={{ background: 'linear-gradient(135deg,#1a1a1a 0%,#2a1018 100%)' }}>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/15 to-transparent" />

                    {/* Cover banner */}
                    <div className="h-28 md:h-44 w-full overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200"
                            alt="Cover"
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                    </div>

                    {/* Profile body */}
                    <div className="relative z-10 px-5 md:px-10 pb-6 -mt-10 md:-mt-14 flex flex-col sm:flex-row sm:items-end gap-5">
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-4 border-[#1a1a1a] overflow-hidden shadow-2xl flex-shrink-0">
                            <img src={avatarUrl} alt={profile?.fullName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div>
                                    <span className="inline-block px-2.5 py-0.5 bg-primary text-white text-[9px] font-black tracking-widest uppercase rounded mb-2">Director</span>
                                    <h1 className="text-2xl md:text-4xl font-black tracking-tighter">{profile?.fullName || 'Director'}</h1>
                                    <p className="text-primary font-bold text-sm md:text-base mt-1">
                                        {profile?.companyName || 'Production House'}
                                        {profile?.location ? ` • ${profile.location}` : ''}
                                    </p>
                                </div>
                                {/* Message button */}
                                <Link
                                    to={`/talent/messages/${profile?.user?.id || profile?.user?._id || profile?.user || id}`}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-primary/30 shrink-0"
                                >
                                    <span className="material-symbols-outlined text-base">chat</span>
                                    Message
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div className="border-t border-white/10 px-5 md:px-10 py-4 flex gap-8 overflow-x-auto no-scrollbar">
                        {[
                            { label: 'Total Projects', value: projects.length },
                            { label: 'Open Roles', value: openProjects.length },
                            { label: 'Skills', value: skills.length },
                            { label: 'Experience', value: profile?.experienceYears ? `${profile.experienceYears}y` : '—' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center shrink-0">
                                <p className="text-2xl font-black">{stat.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Two-column content ────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* About */}
                        {profile?.bio && (
                            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5 md:p-6">
                                <h2 className="text-base font-black uppercase tracking-tight dark:text-white flex items-center gap-2 mb-3">
                                    <span className="size-1.5 bg-primary rounded-full" />About
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">{profile.bio}</p>
                            </div>
                        )}

                        {/* Skills */}
                        {skills.length > 0 && (
                            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5 md:p-6">
                                <h2 className="text-base font-black uppercase tracking-tight dark:text-white flex items-center gap-2 mb-4">
                                    <span className="size-1.5 bg-primary rounded-full" />Skills &amp; Expertise
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(s => (
                                        <span key={s} className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">{s}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Open Projects */}
                        {projects.length > 0 && (
                            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5 md:p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-base font-black uppercase tracking-tight dark:text-white flex items-center gap-2">
                                        <span className="size-1.5 bg-primary rounded-full" />Open Projects
                                        {openProjects.length > 0 && (
                                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-full">{openProjects.length} OPEN</span>
                                        )}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {projects.map(project => {
                                        const pid = project._id || project.id;
                                        return (
                                            <Link to={`/talent/project/${pid}`} key={pid} className="group">
                                                <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
                                                    <div className="h-24 bg-slate-800 relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"
                                                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80')" }} />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                        <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-[8px] font-bold rounded uppercase tracking-widest">
                                                            {project.category || 'Film'}
                                                        </span>
                                                        {project.status === 'open' && (
                                                            <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-500/80 text-white text-[8px] font-black rounded-full uppercase">Open</span>
                                                        )}
                                                    </div>
                                                    <div className="p-3">
                                                        <h4 className="font-bold text-sm dark:text-white group-hover:text-primary transition-colors line-clamp-1">{project.title}</h4>
                                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{project.location || 'India'}</p>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-[9px] font-black text-primary uppercase">Apply Now →</span>
                                                            {project.deadline && (
                                                                <span className="text-[9px] text-slate-400">Due {new Date(project.deadline).toLocaleDateString()}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Info card */}
                        <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-2xl p-5">
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Director Info</h2>
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
                                {profile?.experienceYears && (
                                    <div className="flex items-center gap-3 text-sm dark:text-slate-200">
                                        <span className="material-symbols-outlined text-primary text-base">schedule</span>
                                        {profile.experienceYears} years experience
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

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-primary to-red-700 rounded-2xl p-5 text-white text-center">
                            <span className="material-symbols-outlined text-3xl mb-2">movie_creation</span>
                            <p className="text-sm font-black mb-1">{openProjects.length > 0 ? `${openProjects.length} Open Role${openProjects.length > 1 ? 's' : ''}` : 'No open roles'}</p>
                            <p className="text-[10px] opacity-75 mb-4">Direct message to express interest</p>
                            <Link
                                to={`/talent/messages/${profile?.user?.id || profile?.user?._id || profile?.user || id}`}
                                className="inline-block w-full py-2.5 bg-white text-primary text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all"
                            >
                                Send Message
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDirectorProfile;
