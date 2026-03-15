import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Confetti particle
const ConfettiParticle = ({ style }) => (
    <div className="absolute top-0 pointer-events-none" style={style} />
);

const VerificationSuccess = ({ onDashboard }) => {
    const navigate = useNavigate();
    const [confetti, setConfetti] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isDashboardLoading, setIsDashboardLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    useEffect(() => {
        // Mount animation
        requestAnimationFrame(() => setVisible(true));

        // Generate confetti particles
        const colors = ['#ff6b35', '#ffd700', '#7c3aed', '#10b981', '#3b82f6', '#f43f5e'];
        const pieces = Array.from({ length: 60 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            background: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDuration: `${Math.random() * 2 + 1.5}s`,
            animationDelay: `${Math.random() * 1}s`,
            animationTimingFunction: 'ease-in',
            animationFillMode: 'forwards',
            animation: `confetti-fall ${Math.random() * 2 + 1.5}s ease-in ${Math.random() * 1}s forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
        }));
        setConfetti(pieces);
    }, []);

    const handleDashboard = async () => {
        setIsDashboardLoading(true);
        await new Promise(r => setTimeout(r, 700));
        onDashboard();
    };

    const handleViewProfile = async () => {
        setIsProfileLoading(true);
        await new Promise(r => setTimeout(r, 500));
        navigate('/profile');
    };

    return (
        <div className="relative overflow-hidden w-full flex justify-center py-10">
            {/* Confetti layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <style>{`
                    @keyframes confetti-fall {
                        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(100vh) rotate(720deg); opacity: 0.3; }
                    }
                `}</style>
                {confetti.map(p => (
                    <ConfettiParticle key={p.id} style={p} />
                ))}
            </div>

            <div
                className={`max-w-[640px] w-full flex flex-col items-center text-center relative z-10 px-6 transition-all duration-700 ease-out ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                {/* Verified Badge Visual */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-50"></div>
                    <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse"></div>
                        <div className="bg-gradient-to-br from-primary to-[#ff8c52] rounded-full p-8 shadow-2xl shadow-primary/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined text-white text-[80px] lg:text-[100px] font-bold">verified</span>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 mb-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase">
                        Verified Artist
                    </span>
                    <h1 className="text-slate-900 dark:text-white text-4xl lg:text-6xl font-extrabold tracking-tight">
                        You're Verified!
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-lg lg:text-xl leading-relaxed max-w-lg mx-auto">
                        Your profile is now live with the{' '}
                        <span className="text-primary font-semibold">Verified badge</span>, giving you higher search priority and instant trust with top production houses.
                    </p>
                </div>

                {/* Success Card Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12">
                    {[
                        {
                            icon: 'trending_up',
                            title: 'Priority Ranking',
                            desc: 'Be seen first by casting directors',
                        },
                        {
                            icon: 'workspace_premium',
                            title: 'Trust Seal',
                            desc: 'Authentic profile verification badge',
                        },
                        {
                            icon: 'notifications_active',
                            title: 'Instant Alerts',
                            desc: 'Get notified of matching casting calls',
                        },
                        {
                            icon: 'star',
                            title: 'Premium Access',
                            desc: 'Unlock exclusive audition opportunities',
                        },
                    ].map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 text-left hover:bg-primary/10 transition-colors"
                        >
                            <div className="bg-primary/20 p-2 rounded-lg text-primary flex-shrink-0">
                                <span className="material-symbols-outlined">{icon}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                        onClick={handleDashboard}
                        disabled={isDashboardLoading}
                        className="flex-1 sm:flex-none sm:min-w-[200px] h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                    >
                        {isDashboardLoading ? (
                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        ) : (
                            <>
                                Go to Dashboard
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleViewProfile}
                        disabled={isProfileLoading}
                        className="flex-1 sm:flex-none sm:min-w-[200px] h-14 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                    >
                        {isProfileLoading ? (
                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        ) : (
                            <>
                                View My Public Profile
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationSuccess;
