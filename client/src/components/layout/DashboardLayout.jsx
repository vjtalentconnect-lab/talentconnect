import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import { useNavigate, Link } from 'react-router-dom';
import NotificationCenter from '../common/NotificationCenter';
import ThemeToggle from '../common/ThemeToggle';
import { logout } from '../../services/authService';

const DashboardLayout = ({
    children,
    menuItems,
    userRole,
    userData,
    verificationStatus,
    headerTitle,
    headerSubtitle,
    headerActions,
    searchPlaceholder,
    noPadding = false
}) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        logout().finally(() => {
            navigate('/login', { replace: true });
        });
    };

    return (
        <div className="admin-theme flex min-h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden lg:block lg:w-[320px]">
                <Sidebar
                    menuItems={menuItems}
                    userRole={userRole}
                    verificationStatus={verificationStatus}
                    className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[320px]"
                />
            </div>

            <main className="relative flex-1 flex flex-col min-w-0 h-full overflow-hidden">

                {/* ── Mobile Top Header ── */}
                <header className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-40
                    bg-background-light/90 dark:bg-[#0d0d0d]/95 backdrop-blur-xl
                    border-b border-slate-200/50 dark:border-white/5">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="size-8 bg-primary/10 rounded-xl flex items-center justify-center">
                            <img src="/TC Logo.png" alt="Logo" className="h-5 w-auto" />
                        </div>
                        <h1 className="text-base font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                            TALENT<span className="text-primary">CONNECT</span>
                        </h1>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <NotificationCenter />
                        {userData && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(v => !v)}
                                    className="size-9 rounded-full bg-cover bg-center border-2 border-primary/30 shadow-md"
                                    style={{ backgroundImage: `url('${userData.avatar}')` }}
                                    aria-label="User menu"
                                />
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5">
                                            <p className="text-xs font-black dark:text-white truncate">{userData.name}</p>
                                            <p className="text-[10px] text-slate-400 truncate">{userData.roleTitle}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-base">logout</span>
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                {/* ── Desktop Header ── */}
                <header className="hidden lg:block border-b border-slate-200 dark:border-white/5 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl sticky top-0 z-[40] transition-all duration-500 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            {headerTitle && <h2 className="text-xl sm:text-2xl font-black tracking-tighter dark:text-white uppercase leading-none italic">{headerTitle}</h2>}
                            {headerSubtitle && (
                                <p className="text-[10px] text-slate-500 dark:text-slate-300 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                                    <span className="size-1 bg-primary rounded-full animate-pulse" />
                                    {headerSubtitle}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <NotificationCenter />
                            {userData && (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(v => !v)}
                                        className="flex items-center gap-3 group cursor-pointer"
                                    >
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[11px] font-black dark:text-white uppercase tracking-tighter leading-none italic">{userData.name}</p>
                                            <p className="text-[9px] text-slate-500 dark:text-slate-300 font-bold uppercase tracking-[0.2em] mt-1">{userData.roleTitle?.split(' • ')[0]}</p>
                                        </div>
                                        <div
                                            className="size-11 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-lg group-hover:border-primary/50 transition-all duration-300"
                                            style={{ backgroundImage: `url('${userData.avatar}')` }}
                                        />
                                    </button>
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-lg">logout</span>
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            {headerActions && <div className="flex items-center gap-4">{headerActions}</div>}
                        </div>
                    </div>
                </header>

                {/* ── Page Content ── */}
                <div className={`flex-1 overflow-y-auto custom-scrollbar mobile-content-pad
                    ${noPadding ? '' : 'px-4 pb-6 pt-4 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10 lg:pt-6'}`}>
                    <div className={noPadding ? '' : 'max-w-7xl mx-auto'}>
                        {children}
                    </div>
                </div>
            </main>

            {/* ── Mobile Bottom Navigation ── */}
            {menuItems && <MobileBottomNav menuItems={menuItems} />}
        </div>
    );
};

export default DashboardLayout;
