import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';

// Pick the 4 most important pinned tabs for each role
const getPinnedTabs = (menuItems) => {
    const items = menuItems.filter(i => i.path && !i.type);
    // Always pin: first item (dashboard), messages if exists, profile if exists, and one feature tab
    const pinned = [];

    const dashboard = items.find(i => i.icon === 'dashboard');
    if (dashboard) pinned.push(dashboard);

    // Role-specific second tab
    const discovery   = items.find(i => i.label === 'Discovery');
    const myProjects  = items.find(i => i.label === 'My Projects');
    const globalSearch = items.find(i => i.label === 'Global Search');
    const second = discovery || myProjects || globalSearch;
    if (second && !pinned.includes(second)) pinned.push(second);

    // Messages
    const messages = items.find(i => i.icon === 'chat' || i.icon === 'chat_bubble');
    if (messages && !pinned.includes(messages)) pinned.push(messages);

    // Profile / Portfolio
    const profile = items.find(i => i.icon === 'person' || i.label === 'My Profile');
    if (profile && !pinned.includes(profile)) pinned.push(profile);

    return pinned.slice(0, 4);
};

const MobileBottomNav = ({ menuItems }) => {
    const location = useLocation();
    const { notifications } = useNotifications();
    const unreadCount = notifications?.filter(n => !n.read)?.length || 0;
    const [drawerOpen, setDrawerOpen] = useState(false);

    const pinnedTabs = getPinnedTabs(menuItems);
    const pinnedPaths = new Set(pinnedTabs.map(t => t.path));

    const isActive = (path) =>
        location.pathname === path ||
        (path && path !== '/dashboard/talent' && path !== '/dashboard/director' && path !== '/dashboard/admin' && location.pathname.startsWith(path));

    const drawerActiveAny = menuItems
        .filter(i => i.path && !i.type && !pinnedPaths.has(i.path))
        .some(i => isActive(i.path));

    return (
        <>
            {/* ── Slide-up Drawer ── */}
            {drawerOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end"
                    onClick={(e) => { if (e.target === e.currentTarget) setDrawerOpen(false); }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />

                    {/* Drawer panel */}
                    <div className="relative z-10 bg-white dark:bg-[#111] rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto"
                        style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}>

                        {/* Handle bar */}
                        <div className="flex justify-center pt-3 pb-2">
                            <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full" />
                        </div>

                        {/* Header with logo */}
                        <div className="flex items-center gap-3 px-5 pt-2 pb-4 border-b border-slate-100 dark:border-white/5">
                            <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center">
                                <img src="/TC Logo.png" alt="Logo" className="h-6 w-auto" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                                    TALENT<span className="text-primary">CONNECT</span>
                                </h2>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-primary font-black leading-none mt-0.5">All Sections</p>
                            </div>
                        </div>

                        {/* All menu items */}
                        <nav className="px-4 py-3 space-y-0.5">
                            {menuItems.map((item, idx) => {
                                if (item.type === 'section') {
                                    return (
                                        <div key={idx} className="pt-5 pb-2 px-3">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                                {item.label}
                                            </p>
                                        </div>
                                    );
                                }

                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={idx}
                                        to={item.path}
                                        onClick={() => setDrawerOpen(false)}
                                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 relative
                                            ${active
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        {active && (
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/15 to-transparent" />
                                        )}
                                        <span
                                            className="material-symbols-outlined text-[22px] relative z-10"
                                            style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                                        >
                                            {item.icon}
                                        </span>
                                        <span className={`relative z-10 text-sm font-black uppercase tracking-widest ${active ? '' : ''}`}>
                                            {item.label}
                                        </span>
                                        {item.badge && (
                                            <span className="ml-auto relative z-10 px-2 py-0.5 bg-primary text-white text-[9px] font-black rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* ── Bottom Tab Bar ── */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 mobile-bottom-nav">
                <div className="flex items-stretch">
                    {/* Pinned tabs */}
                    {pinnedTabs.map((item, i) => {
                        const active = isActive(item.path);
                        const showBadge = (item.icon === 'chat' || item.icon === 'chat_bubble') && unreadCount > 0;
                        return (
                            <Link
                                key={i}
                                to={item.path}
                                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-all duration-200 relative
                                    ${active ? 'mobile-nav-active' : 'mobile-nav-inactive'}`}
                            >
                                {active && (
                                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-primary rounded-full" />
                                )}
                                <div className="relative">
                                    <span
                                        className={`material-symbols-outlined text-[22px] transition-all ${active ? 'text-primary' : ''}`}
                                        style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                                    >
                                        {item.icon}
                                    </span>
                                    {showBadge && (
                                        <span className="absolute -top-1 -right-1.5 size-4 bg-primary text-white text-[8px] font-black rounded-full flex items-center justify-center">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-wider leading-none ${active ? 'text-primary' : ''}`}>
                                    {item.label.split(' ')[0]}
                                </span>
                            </Link>
                        );
                    })}

                    {/* "More" tab — always last */}
                    <button
                        onClick={() => setDrawerOpen(v => !v)}
                        className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-all duration-200 relative
                            ${drawerOpen || drawerActiveAny ? 'mobile-nav-active' : 'mobile-nav-inactive'}`}
                    >
                        {(drawerOpen || drawerActiveAny) && (
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-primary rounded-full" />
                        )}
                        <span
                            className={`material-symbols-outlined text-[22px] transition-all ${drawerOpen || drawerActiveAny ? 'text-primary' : ''}`}
                            style={(drawerOpen || drawerActiveAny) ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                            {drawerOpen ? 'close' : 'menu'}
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-wider leading-none ${drawerOpen || drawerActiveAny ? 'text-primary' : ''}`}>
                            More
                        </span>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default MobileBottomNav;
