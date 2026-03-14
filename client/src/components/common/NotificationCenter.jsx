import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

const NotificationCenter = () => {
    const { notifications, unreadCount, handleMarkAsRead, handleMarkAllRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all active:scale-95"
            >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Notifications</h3>
                            {unreadCount > 0 && (
                                <button 
                                    onClick={handleMarkAllRead}
                                    className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>
                        <div className="max-h-96 overflow-y-auto custom-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-20">notifications_off</span>
                                    <p className="text-xs font-bold uppercase tracking-widest">No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <Link
                                        key={notification._id}
                                        to={notification.link || '#'}
                                        onClick={() => {
                                            handleMarkAsRead(notification._id);
                                            setIsOpen(false);
                                        }}
                                        className={`block p-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all ${!notification.read ? 'bg-primary/5' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`mt-1 size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                notification.type === 'message' ? 'bg-blue-500/10 text-blue-500' :
                                                notification.type === 'application' ? 'bg-orange-500/10 text-orange-500' :
                                                'bg-primary/10 text-primary'
                                            }`}>
                                                <span className="material-symbols-outlined text-sm">
                                                    {notification.type === 'message' ? 'chat' : 
                                                     notification.type === 'application' ? 'work' : 'notifications'}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black text-slate-900 dark:text-white">{notification.title}</p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{notification.message}</p>
                                                <p className="text-[9px] text-slate-400 mt-2 font-medium">
                                                    {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="size-2 bg-primary rounded-full mt-2"></div>
                                            )}
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                        <div className="p-3 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 text-center">
                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-all">View All Activity</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationCenter;
