import React from 'react';
import { Link } from 'react-router-dom';

const ArtistSettings = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-72 flex-shrink-0 flex flex-col bg-background-light dark:bg-surface-dark border-r border-slate-200 dark:border-border-dark hidden lg:flex">
                    <div className="p-6 flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">movie_filter</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">TalentConnect</h2>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/dashboard/talent">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/portfolio">
                            <span className="material-symbols-outlined">person</span>
                            <span className="text-sm font-medium">My Profile</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/applied-projects">
                            <span className="material-symbols-outlined">work</span>
                            <span className="text-sm font-medium">Applied Projects</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/audition-invites">
                            <span className="material-symbols-outlined">videocam</span>
                            <span className="text-sm font-medium">Audition Invites</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/messages">
                            <span className="material-symbols-outlined">chat</span>
                            <span className="text-sm font-medium">Messages</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/talent/analytics">
                            <span className="material-symbols-outlined">bar_chart</span>
                            <span className="text-sm font-medium">Analytics</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl transition-colors" to="/talent/settings">
                            <span className="material-symbols-outlined text-white">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" to="/support">
                            <span className="material-symbols-outlined">help</span>
                            <span className="text-sm font-medium">Support</span>
                        </Link>
                    </nav>
                    <div className="p-4 border-t border-slate-200 dark:border-border-dark">
                        <div className="flex items-center gap-3 p-2 bg-slate-100 dark:bg-background-dark/50 rounded-xl">
                            <div className="size-10 rounded-full bg-cover bg-center border-2 border-primary" data-alt="Portrait of an Indian male artist" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8tuv7HCiKhUBYvS6bvafFfod5BLGNbsZlwqcmW-dJNuMCBJyRs9sJ6YWTSrBBcLhVcz40kfDgiY6fBQ5Jo93XwPIPGNV6drLEQlb-A_FkHirCp3b0ftVPaf8HnxJMCwwF98mMOyPSnlM-RRznNCB7NtXEHu-gwEmqUJa472steNEChjZg9zT5geRd9WhYSbIygKNh--MbGCedschZBQXxa563qihvD3ISnhUgJ4A7EQtav0QQ5gKTskLK01Vx6R24G2qpqBdNYFp4')" }}></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate text-slate-900 dark:text-white">Arjun Kapoor</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Pro Artist</p>
                            </div>
                            <button className="text-slate-400 hover:text-primary">
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar">
                    {/* Top Nav */}
                    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark">
                        <h1 className="text-2xl font-black tracking-tight uppercase">Account Settings</h1>
                        <div className="flex items-center gap-4">
                            <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark text-slate-600 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-xl">notifications</span>
                            </button>
                            <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                                Save Changes
                            </button>
                        </div>
                    </header>

                    <div className="max-w-4xl mx-auto p-8 space-y-12 pb-24">
                        {/* Profile Visibility & Privacy */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">visibility</span>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Visibility & Privacy</h2>
                            </div>
                            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark divide-y divide-slate-100 dark:divide-border-dark/50 shadow-sm">
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-bold text-slate-900 dark:text-white">Profile Searchable</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Allow casting directors and studios to find your profile in global searches.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-bold text-slate-900 dark:text-white">Show Contact Details</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Only verified studios and production houses can see your mobile and email.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-bold text-slate-900 dark:text-white">Private Mode</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Hide your profile from everyone except those you've applied to.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Account Security */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">security</span>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Account Security</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-background-dark flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">lock_reset</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-slate-900 dark:text-white">Change Password</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Last changed 3 months ago</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                                <button className="flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-background-dark flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">verified_user</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-slate-900 dark:text-white">Two-Factor Auth</p>
                                            <p className="text-xs text-emerald-500 font-medium">Currently Enabled</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                            </div>
                        </section>

                        {/* Notification Preferences */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">notifications_active</span>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h2>
                            </div>
                            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 dark:bg-background-dark/50 border-b border-slate-200 dark:border-border-dark text-slate-900 dark:text-white">
                                        <tr>
                                            <th className="p-5 font-bold uppercase tracking-wider text-xs">Category</th>
                                            <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">Email</th>
                                            <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">App Push</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-border-dark/50 text-slate-600 dark:text-slate-300">
                                        <tr>
                                            <td className="p-5 font-medium">New Casting Calls</td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-5 font-medium">Audition Invites</td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-5 font-medium">Direct Messages</td>
                                            <td className="p-5 text-center">
                                                <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                            <td className="p-5 text-center">
                                                <input className="w-5 h-5 rounded border-slate-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent" type="checkbox" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Subscription Management */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <span className="material-symbols-outlined">stars</span>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Subscription Management</h2>
                            </div>
                            <div className="bg-gradient-to-r from-surface-dark to-background-dark border border-primary/30 rounded-xl p-6 relative overflow-hidden shadow-lg">
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Active</span>
                                            <h3 className="text-2xl font-black italic text-white">PRO ARTIST PLAN</h3>
                                        </div>
                                        <p className="text-slate-400 text-sm max-w-md">Your plan includes priority search listing, unlimited applications, and exclusive studio invitations. Next billing: Oct 24, 2024.</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">View Invoices</button>
                                        <button className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all">Manage Subscription</button>
                                    </div>
                                </div>
                                {/* Decorative background element */}
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                                    <span className="material-symbols-outlined text-[180px] text-primary">workspace_premium</span>
                                </div>
                            </div>
                        </section>

                        {/* Danger Zone / Delete Account */}
                        <section className="pt-8 border-t border-slate-200 dark:border-border-dark">
                            <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-rose-500">Deactivate or Delete Account</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete your profile and all application history. This action cannot be undone.</p>
                                    </div>
                                    <button className="text-rose-500 text-sm font-bold border border-rose-500/30 px-5 py-2.5 rounded-lg hover:bg-rose-500 hover:text-white transition-all">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Mobile Navigation Overlay - simplified for settings */}
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark px-6 py-3 flex justify-between items-center z-50">
                        <Link className="text-slate-500 flex flex-col items-center gap-1" to="/dashboard/talent">
                            <span className="material-symbols-outlined text-[24px]">dashboard</span>
                            <span className="text-[10px] font-bold">Dashboard</span>
                        </Link>
                        <Link className="text-slate-500 flex flex-col items-center gap-1" to="/talent/audition-invites">
                            <span className="material-symbols-outlined text-[24px]">videocam</span>
                            <span className="text-[10px] font-bold">Invites</span>
                        </Link>
                        <Link className="text-primary flex flex-col items-center gap-1" to="/talent/settings">
                            <span className="material-symbols-outlined text-[24px]">settings</span>
                            <span className="text-[10px] font-bold">Settings</span>
                        </Link>
                        <Link className="text-slate-500 flex flex-col items-center gap-1" to="/talent/portfolio">
                            <span className="material-symbols-outlined text-[24px]">person</span>
                            <span className="text-[10px] font-bold">Profile</span>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ArtistSettings;
