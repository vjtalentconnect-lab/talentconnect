import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { useNotifications } from '../context/NotificationContext';
import { getMyProfile } from '../services/profileService';
import { getProject } from '../services/projectService';

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-3 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const AuditionDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [toast, setToast] = useState(null);

    const projectId = location.state?.projectId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await getMyProfile();
                setProfile(profileRes.data);
                if (projectId) {
                    const projectRes = await getProject(projectId);
                    setProject(projectRes.data);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [projectId]);

    const handleConfirmAttendance = async () => {
        setConfirming(true);
        await new Promise(r => setTimeout(r, 1200)); // Simulate API call
        setConfirmed(true);
        setConfirming(false);
        setToast({ message: 'Attendance confirmed! Production team will contact you.', type: 'success' });
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture,
    };

    if (loading) return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist"
            userData={{ name: '...', roleTitle: '...', avatar: '' }} headerTitle="Audition Details">
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    const title = project?.title || 'The Last Dynasty';
    const director = project?.director?.email?.split('@')[0] || 'Siddharth Roy';
    const category = project?.category || 'Feature Film';
    const location_ = project?.location || 'Studio 41, Mumbai';
    const deadline = project?.deadline ? new Date(project.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'October 25, 2025';
    const budget = project?.budget || 'Confidential';

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData}
            verificationStatus={profile?.user?.verificationStatus || authUser?.verificationStatus || 'none'}
            headerTitle="Audition Details" headerSubtitle="Review the requirements and prepare for your screen test.">
            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

            <div className="max-w-5xl space-y-6 md:space-y-8 pb-24">
                {/* Hero */}
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden h-48 md:h-80 group shadow-2xl">
                    <img className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
                        alt={title}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZj3_7cLDGAJjpTXjIvBa5QSYVQ_ePDvkj-K1DfTuFlVNeO9gbX_V1_xyulCpg_coIKOROh5Dz86-bGcpjY_tDkJnXiDjmU4q_fhd7I_1DZW6gsSWp3tsKMPVuhtueDl6t6jTc8lz9SX5bu6Rii9iZS6HiH5Sdfwl1LmyLKGqhE9xwlTQkIQbptG51qozNVw0aFFfucDx9hjsml5PCwbDjxXDWkgrUnA_oWfy74JyxoAJs5V7nuTbgb3tYEeo4Zlttmg7p9qx5Zy4D"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>
                    <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
                        <div className="min-w-0">
                            <span className="inline-block px-2 md:px-3 py-1 rounded-full bg-primary text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-3">
                                {category} • Period Drama
                            </span>
                            <h1 className="text-white text-2xl md:text-4xl font-black mb-1 md:mb-2 uppercase italic tracking-tighter line-clamp-2">{title}</h1>
                            <p className="text-slate-300 text-base md:text-lg font-medium">Directed by {director}</p>
                        </div>
                        <div className="shrink-0">
                            {confirmed ? (
                                <div className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-green-500 text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-xl whitespace-nowrap">
                                    <span className="material-symbols-outlined text-sm md:text-base">check_circle</span> <span className="hidden sm:inline">Attendance Confirmed</span><span className="sm:hidden">Confirmed</span>
                                </div>
                            ) : (
                                <button onClick={handleConfirmAttendance} disabled={confirming}
                                    className="px-3 md:px-6 py-2 md:py-3 bg-primary hover:bg-primary/90 text-white rounded-lg md:rounded-xl font-bold transition-all shadow-xl shadow-primary/20 text-xs uppercase tracking-widest flex items-center justify-center gap-1 md:gap-2 disabled:opacity-70 whitespace-nowrap">
                                    {confirming ? <><span className="material-symbols-outlined text-sm animate-spin">sync</span> <span className="hidden sm:inline">Confirming...</span></> : <span><span className="hidden sm:inline">Confirm</span> <span className="sm:hidden">Confirm</span> Attendance</span>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        {/* Character Brief */}
                        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 md:p-8 shadow-sm">
                            <h3 className="text-xl md:text-2xl font-black italic tracking-tighter dark:text-white flex items-center gap-2 mb-4 md:mb-6 uppercase">
                                <span className="material-symbols-outlined text-primary">person_search</span>
                                Character Brief
                            </h3>
                            <div className="space-y-3 md:space-y-4 text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm md:text-base">
                                <p>{project?.description || 'Vikram (28–35) is the eldest prince of the Surya Dynasty. A complex warrior balancing duty with a secret disdain for war. Brooding, intelligent, and calm with authority.'}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-slate-100 dark:border-zinc-800">
                                    <div>
                                        <p className="text-[9px] md:text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Look</p>
                                        <p className="text-xs md:text-sm font-bold dark:text-slate-200">Rugged, regal, sharp features</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] md:text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Tone</p>
                                        <p className="text-xs md:text-sm font-bold dark:text-slate-200">Low-register, intense, articulate</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Script Fragment */}
                        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 md:p-8 shadow-sm">
                            <div className="flex items-start md:items-center justify-between gap-2 md:gap-0 mb-4 md:mb-6 flex-wrap">
                                <h3 className="text-xl md:text-2xl font-black italic tracking-tighter dark:text-white flex items-center gap-2 uppercase">
                                    <span className="material-symbols-outlined text-primary">description</span>
                                    Script Fragment
                                </h3>
                                <button onClick={() => setToast({ message: 'Full script will be sent to your registered email.', type: 'success' })}
                                    className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:underline transition-all">
                                    <span className="material-symbols-outlined text-base md:text-lg">download</span> <span className="hidden sm:inline">Download</span>
                                </button>
                            </div>
                            <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-100 dark:border-zinc-800 font-mono text-xs md:text-sm text-slate-600 dark:text-slate-400">
                                <div className="space-y-4 md:space-y-6">
                                    <div className="text-center italic opacity-60 uppercase tracking-widest text-[8px] md:text-[10px]">[EXT. PALACE BALCONY - NIGHT]</div>
                                    <div>
                                        <span className="block text-slate-800 dark:text-white font-bold mb-1 uppercase tracking-widest text-center text-xs md:text-sm">VIKRAM</span>
                                        <p className="text-center italic text-[10px] md:text-xs">(quietly, staring into the dark)</p>
                                        <p className="mt-2 text-center text-xs md:text-sm">
                                            "The stars don't witness our victories, General. They only witness the blood we spill to claim them."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Logistics */}
                    <div className="space-y-4 md:space-y-6">
                        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 shadow-sm">
                            <h4 className="text-base md:text-lg font-black italic tracking-tighter dark:text-white mb-4 md:mb-6 uppercase">Logistics</h4>
                            <div className="space-y-4 md:space-y-6">
                                {[
                                    { icon: 'event', label: 'Date', value: deadline },
                                    { icon: 'schedule', label: 'Time Slot', value: '10:30 AM onwards' },
                                    { icon: 'location_on', label: 'Location', value: location_ },
                                    { icon: 'payments', label: 'Budget', value: budget },
                                ].map(({ icon, label, value }) => (
                                    <div key={label} className="flex gap-3 md:gap-4">
                                        <div className="size-8 md:size-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <span className="material-symbols-outlined text-base md:text-lg">{icon}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">{label}</p>
                                            <p className="text-xs md:text-sm font-bold dark:text-slate-200 truncate">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <button onClick={() => navigate(-1)}
                            className="w-full py-2 md:py-3 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-lg md:rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all">
                            <span className="material-symbols-outlined text-sm">arrow_back</span> <span className="hidden sm:inline">Go Back</span><span className="sm:hidden">Back</span>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AuditionDetails;
