import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ menuItems, userRole, verificationStatus }) => {
    const location = useLocation();
    const isVerified = verificationStatus === 'verified';

    return (
        <aside className="w-72 flex-shrink-0 bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-white/5 flex flex-col h-screen sticky top-0 transition-all duration-500">
            <div className="p-8 flex items-center gap-4 group/logo cursor-pointer">
                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover/logo:scale-110 group-hover/logo:bg-primary/20 transition-all duration-500 shadow-lg shadow-primary/5">
                    <img src="/TC Logo.png" alt="Logo" className="h-7 w-auto" />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none uppercase italic">TALENT<span className="text-primary">CONNECT</span></h1>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-primary font-black mt-1">{userRole}</p>
                </div>
            </div>

            <nav className="flex-1 px-6 mt-4 space-y-1.5 overflow-y-auto custom-scrollbar pb-8">
                {menuItems.map((item, index) => {
                    if (item.type === 'section') {
                        return (
                            <div key={index} className="pt-8 pb-3 px-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                                    {item.label}
                                </p>
                            </div>
                        );
                    }

                    const isActive = location.pathname === item.path;
                    const isLocked = item.requiresVerification && !isVerified;

                    if (isLocked) {
                        return (
                            <div
                                key={index}
                                title="Verification required to access this section"
                                className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl relative overflow-hidden cursor-not-allowed opacity-40 select-none text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-[11px]"
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span className="flex-1">{item.label}</span>
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center group gap-3.5 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                                isActive
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20 transform scale-[1.02]'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 font-bold uppercase tracking-widest text-[11px]'
                            }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
                            )}
                            <span className={`material-symbols-outlined text-[20px] relative z-10 ${isActive ? 'fill-1' : 'group-hover:scale-110 transition-transform'}`}>
                                {item.icon}
                            </span>
                            <span className={`relative z-10 ${isActive ? 'font-black' : 'group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
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
