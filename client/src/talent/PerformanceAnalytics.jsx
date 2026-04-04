import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';
import { getMyApplications } from '../services/projectService';
import { useNotifications } from '../context/NotificationContext';
import socket from '../services/socket';

const PerformanceAnalytics = () => {
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartRange, setChartRange] = useState('30d');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, appsRes] = await Promise.all([getMyProfile(), getMyApplications()]);
                setProfile(profileRes.data);
                setApplications(appsRes.data);
            } catch (err) {
                console.error('Error fetching analytics:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        
        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchData);

        // Real-time listener
        const handleNotification = (note) => {
            if (['application_update', 'audition_scheduled'].includes(note.type)) {
                fetchData();
            }
        };
        socket.on('newNotification', handleNotification);

        return () => {
            window.removeEventListener('userStateChange', fetchData);
            socket.off('newNotification', handleNotification);
        };
    }, []);

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture,
    };

    const verificationStatus = profile?.user?.verificationStatus || authUser?.verificationStatus || 'none';

    // Derive stats from real data
    const totalApps = applications.length;
    const shortlisted = applications.filter(a => a.status === 'shortlisted').length;
    const auditioning = applications.filter(a => a.status === 'auditioning').length;
    const selected = applications.filter(a => a.status === 'selected').length;
    const successRate = totalApps > 0 ? Math.round(((shortlisted + auditioning + selected) / totalApps) * 100) : 0;

    // Profile completeness score
    const profileFields = [profile?.bio, profile?.profilePicture !== 'no-photo.jpg', profile?.skills?.length > 0, profile?.location, profile?.talentCategory, profile?.fullName];
    const profileScore = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);

    // Top performing applications (shortlisted/auditioning/selected)
    const topApps = applications.filter(a => ['shortlisted', 'auditioning', 'selected'].includes(a.status)).slice(0, 4);

    // Generate SVG chart points based on real data range
    // Generate SVG chart points based on real application history
    const generateChartData = () => {
        const now = new Date();
        const days = chartRange === '30d' ? 30 : chartRange === '3m' ? 90 : 365;
        const data = [];
        
        for (let i = days; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(now.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const count = applications.filter(app => {
                const appDate = new Date(app.createdAt).toISOString().split('T')[0];
                return appDate === dateStr;
            }).length;
            
            data.push({ date: dateStr, count });
        }
        
        // Sampling for the chart
        const points = chartRange === '30d' ? 12 : chartRange === '3m' ? 12 : 12;
        const sampled = [];
        const step = Math.max(1, Math.floor(data.length / points));
        
        for (let i = 0; i < data.length; i += step) {
            sampled.push({
                x: sampled.length,
                y: data.slice(i, i + step).reduce((sum, item) => sum + item.count, 0)
            });
        }
        return sampled;
    };
    const chartData = generateChartData();
    const maxY = Math.max(...chartData.map(d => d.y), 1);
    const svgW = 400, svgH = 120;
    const pointsStr = chartData.map((d, i) =>
        `${(i / (chartData.length - 1)) * svgW},${svgH - (d.y / maxY) * (svgH - 10) - 5}`
    ).join(' ');

    if (loading) return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist"
            userData={{ name: '...', roleTitle: '...', avatar: '' }} headerTitle="Performance Analytics">
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData} verificationStatus={verificationStatus}
            headerTitle="Performance Analytics" headerSubtitle="Data-driven insights to supercharge your career."
            searchPlaceholder="Search metrics...">
            <div className="space-y-8 pb-24">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Applications', value: totalApps, icon: 'description', color: 'blue', sub: 'all time' },
                        { label: 'Shortlisted', value: shortlisted, icon: 'star', color: 'yellow', sub: 'out of ' + totalApps },
                        { label: 'Success Rate', value: successRate + '%', icon: 'trending_up', color: 'green', sub: 'shortlisted+' },
                        { label: 'Profile Score', value: profileScore + '%', icon: 'person', color: 'purple', sub: 'completeness' },
                    ].map(({ label, value, icon, color, sub }) => (
                        <div key={label} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm group hover:border-primary/30 transition-all">
                            <div className={`size-10 rounded-xl bg-${color}-500/10 text-${color}-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <span className="material-symbols-outlined">{icon}</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{label}</p>
                            <p className="text-3xl font-black dark:text-white italic tracking-tighter">{value}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 italic">{sub}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter">Applications Over Time</h3>
                            <div className="flex items-center gap-2">
                                {['30d', '3m', 'all'].map(r => (
                                    <button key={r} onClick={() => setChartRange(r)}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                            chartRange === r ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-primary'
                                        }`}>{r}</button>
                                ))}
                            </div>
                        </div>
                        {totalApps === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                                <span className="material-symbols-outlined text-4xl mb-2">bar_chart</span>
                                <p className="font-bold text-sm italic">Apply to projects to see your data here.</p>
                            </div>
                        ) : (
                            <div className="relative">
                                <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} className="overflow-visible">
                                    <defs>
                                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--color-primary, #e11d48)" stopOpacity="0.3"/>
                                            <stop offset="100%" stopColor="var(--color-primary, #e11d48)" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    <polygon
                                        points={`0,${svgH} ${pointsStr} ${svgW},${svgH}`}
                                        fill="url(#chartGrad)"
                                    />
                                    <polyline
                                        points={pointsStr}
                                        fill="none"
                                        stroke="var(--color-primary, #e11d48)"
                                        strokeWidth="2.5"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />
                                    {chartData.map((d, i) => (
                                        <circle key={i}
                                            cx={(i / (chartData.length - 1)) * svgW}
                                            cy={svgH - (d.y / maxY) * (svgH - 10) - 5}
                                            r="4" fill="white" stroke="var(--color-primary, #e11d48)" strokeWidth="2.5"/>
                                    ))}
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* AI Insights */}
                    <div className="bg-gradient-to-br from-slate-900 to-primary/20 border border-primary/20 rounded-3xl p-8 shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase italic tracking-tighter">AI Optimizer</h3>
                                <p className="text-[9px] text-white/60 uppercase tracking-widest font-black">Personalized Tips</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { tip: profileScore < 80 ? 'Complete your bio and add skills to boost visibility by 30%.' : 'Great profile completeness! Add a showreel to reach 90% score.', icon: 'person' },
                                { tip: successRate < 20 ? 'Apply to projects matching your primary category for higher callback rates.' : 'Strong success rate! Focus on auditioning opportunities to convert.', icon: 'trending_up' },
                                { tip: 'Update your profile photo monthly to stay at the top of search results.', icon: 'photo_camera' },
                            ].map(({ tip, icon }, idx) => (
                                <div key={idx} className="bg-white/5 rounded-2xl p-4 flex gap-3 border border-white/5">
                                    <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">{icon}</span>
                                    <p className="text-white/80 text-xs font-medium leading-relaxed">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Performing Applications */}
                {topApps.length > 0 && (
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
                        <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter mb-6">Top Performing Applications</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 dark:border-zinc-800">
                                        <th className="pb-4 text-left">Project</th>
                                        <th className="pb-4 text-left">Category</th>
                                        <th className="pb-4 text-left">Status</th>
                                        <th className="pb-4 text-left">Applied</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                    {topApps.map(app => (
                                        <tr key={app._id} className="group hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="py-4 font-black dark:text-white italic uppercase tracking-tight text-sm">
                                                {app.project?.title || 'Project'}
                                            </td>
                                            <td className="py-4 text-slate-500 text-xs font-bold">{app.project?.category || '-'}</td>
                                            <td className="py-4">
                                                <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                                                    app.status === 'selected' ? 'bg-green-500/10 text-green-500' :
                                                    app.status === 'auditioning' ? 'bg-primary/10 text-primary' : 'bg-blue-500/10 text-blue-500'
                                                }`}>{app.status}</span>
                                            </td>
                                            <td className="py-4 text-slate-500 text-xs font-bold">
                                                {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default PerformanceAnalytics;
