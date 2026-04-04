import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';

const Sidebar = ({
    menuItems,
    userRole,
    verificationStatus,
    className = '',
    isMobile = false,
    isOpen = true,
    onClose
}) => {
    const location = useLocation();
    const { user: authUser } = useNotifications();
    const effectiveStatus = verificationStatus || authUser?.verificationStatus || 'none';
    const isVerified = effectiveStatus === 'verified';

    const gradientBg = 'linear-gradient(180deg, #2c050b 0%, #19030a 55%, #080105 100%)';
    const baseClasses = `border-r border-[#23040a] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 text-white`;
    const desktopClasses = `${baseClasses} h-screen sticky top-0 flex-shrink-0 ${className}`;
    const mobileClasses = `${baseClasses} fixed inset-y-0 left-0 z-50 w-72 max-w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`;
    const paddingClasses = isMobile ? 'px-6 pt-6 pb-4' : 'px-6 pt-8 pb-4';

    const handleLinkClick = () => {
        if (isMobile && onClose) {
            onClose();
        }
    };

    const normalizePath = (path = '') => path.endsWith('/') ? path : `${path}/`;

    return (
        <aside
            className={isMobile ? mobileClasses : desktopClasses}
            aria-hidden={!isMobile ? false : !isOpen}
            style={{ background: gradientBg }}
        >
            <div className={`${paddingClasses} flex items-center justify-between gap-4`}>
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="size-10 bg-[#1f050b] border border-white/20 rounded-xl flex items-center justify-center shadow-[0_12px_25px_rgba(0,0,0,0.5)]">
                        <img src="/TC Logo.png" alt="Logo" className="h-7 w-auto" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-white/80 leading-tight">TALENTCONNECT</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffa3a3] mt-1">{userRole || 'INDIA • MEMBER'}</p>
                    </div>
                </div>
                {isMobile && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-white/90 text-[#200102] p-2 shadow-lg shadow-slate-900/40 hover:bg-white/100 transition"
                        aria-label="Close navigation"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                )}
            </div>

            <nav className="flex-1 mt-6 space-y-2 overflow-y-auto custom-scrollbar pb-8">
                {menuItems.map((item, index) => {
                    if (item.type === 'section') {
                        return (
                            <div key={`section-${index}`} className="pt-3 pb-2 px-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">
                                    {item.label}
                                </p>
                            </div>
                        );
                    }

                    const normalizedPath = normalizePath(item.path || '');
                    const isActive = normalizedPath && location.pathname.startsWith(normalizedPath);
                    const isLocked = item.requiresVerification && !isVerified;

                    if (isLocked) {
                        return (
                            <div
                                key={`locked-${index}`}
                                title="Verification required to access this section"
                                className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl relative overflow-hidden cursor-not-allowed opacity-40 select-none text-white/70 font-black uppercase tracking-[0.4em] text-[11px]"
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span className="flex-1">{item.label}</span>
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.path || index}
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-3.5 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden uppercase tracking-[0.4em] text-[11px] ${
                                isActive
                                    ? 'bg-[#ee2b3b] text-white shadow-[0_20px_50px_rgba(238,43,59,0.35)]'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-70"></div>
                            )}
                            <span className={`material-symbols-outlined text-[20px] relative z-10 ${isActive ? 'fill-1' : 'group-hover:scale-110 transition-transform'}`}>
                                {item.icon}
                            </span>
                            <span className={`relative z-10 ${isActive ? 'font-black' : ''}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
