import React from 'react';
import { Link } from 'react-router-dom';

const ArtistMessages = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-80 flex-shrink-0 border-r border-border-dark flex flex-col bg-background-dark">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-border-dark">
                        <div className="flex items-center gap-3 mb-6">
                            <Link to="/dashboard/talent" className="size-8 bg-primary rounded flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xl">star</span>
                            </Link>
                            <h2 className="text-xl font-bold tracking-tight text-white">TalentConnect</h2>
                        </div>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                            <input className="w-full bg-surface-dark border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary placeholder:text-slate-500 text-white outline-none" placeholder="Search conversations..." type="text" />
                        </div>
                    </div>
                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="px-2 py-4 space-y-1">
                            {/* Active Chat: Aditya Roy (Casting Director) */}
                            <div className="flex items-center gap-4 p-4 bg-surface-dark rounded-xl cursor-not-allowed">
                                <div className="relative shrink-0">
                                    <div className="size-12 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQTIhlAB-uIKbENopksNnXCYEJaIIo0P1oDGkSJHRJH1dqunSM1hmNuQtLzZOV5mYeBc0t1-2fxOiij01r6S4qLIwaUoolXKDsRfpM2masOz1ZVp4ZpAaup_Gd1O_uqZyrodc5HfvouztqYV7cd5z2K8AJVKHnUw_Va1-WN5RkEeE4JFxCnLcEFtIJkvoq4d0qqfbZbNjkQR_p8mmVjLSmN0JG7Lhn6dVJSzNf8WSJegZblLi0s8mBr1JlZjxDwFIi9-38Fqmct2wY')" }}></div>
                                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-surface-dark rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-semibold truncate text-white">Aditya Roy</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">10:45 AM</span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate font-medium">Glad you liked it, Karan. We think...</p>
                                </div>
                            </div>
                            {/* Chat Item 2: Producer */}
                            <div className="flex items-center gap-4 p-4 hover:bg-surface-dark/50 rounded-xl cursor-pointer transition-colors group">
                                <div className="shrink-0">
                                    <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoPlgx75txcrzOly4Cqsi4JwIHIyrrYCbgKqxJOYaaeOFsRcWHZYX80gwNofmhNUeiE0D19rEj1BcFnV4AeCmEO3hFZX-KmOuqbpaMUOxUzA15LUB4MkgQfiXqtLqANLOBMxrswfQgh3RjWwi1CyUmCKIKLPunMvsk0VgG2qqlU66snUXr2tMLbOY03h5ZTdiCbkCr6raVmVKXUvj571LCmlPz6p5lbpAzz-JXdsXSnz2Dj-kOqyTXjWnDiB2VpvGVCaJnZxy_J8qQ')" }}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-semibold truncate text-white">Karan Johar</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">Yesterday</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate group-hover:text-slate-300 transition-colors">The final rehearsal schedule is out.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Footer: Talent Profile */}
                    <div className="p-4 border-t border-border-dark">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-surface-dark flex items-center justify-center overflow-hidden">
                                <div className="size-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNTHx3MxgRqEdzHsDyrdjeedyNK4KhY61xveSfuKaNroa8BU2VCMGvaxLty1UGGfQZaSVskFq208YCwepV3VMWtAeJjRV_uVM6uz__o0cFtqF97Ez89qFtJhkCKSR1RM0Fmo9WtRpLGHmPuEVZ-dz57MmPQ05NFBwO9dg9xP9xEgbG8zyufQgakQ2CKqvgbUWxy34NlBHjdXR_CR1uuqu0rCIFm-YMpjIVmc2g6VyUzgVpEzwqaorp6qACko1klaSGSyHuwXyp1nFL')" }}></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">Aryan Sharma</p>
                                <p className="text-[10px] text-primary uppercase font-bold tracking-wider">Professional Artist</p>
                            </div>
                            <Link to="/talent/portfolio" className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-white transition-colors">person</Link>
                        </div>
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col bg-background-dark/95">
                    {/* Chat Header */}
                    <header className="h-20 flex items-center justify-between px-8 border-b border-border-dark bg-background-dark">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQTIhlAB-uIKbENopksNnXCYEJaIIo0P1oDGkSJHRJH1dqunSM1hmNuQtLzZOV5mYeBc0t1-2fxOiij01r6S4qLIwaUoolXKDsRfpM2masOz1ZVp4ZpAaup_Gd1O_uqZyrodc5HfvouztqYV7cd5z2K8AJVKHnUw_Va1-WN5RkEeE4JFxCnLcEFtIJkvoq4d0qqfbZbNjkQR_p8mmVjLSmN0JG7Lhn6dVJSzNf8WSJegZblLi0s8mBr1JlZjxDwFIi9-38Fqmct2wY')" }}></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-bold text-white">Aditya Roy</h2>
                                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-tight border border-primary/30">Casting Director</span>
                                </div>
                                <p className="text-xs text-green-500 flex items-center gap-1 font-medium">
                                    <span className="size-1.5 bg-green-500 rounded-full inline-block"></span> Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="size-10 rounded-xl bg-surface-dark flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">videocam</span>
                            </button>
                            <button className="size-10 rounded-xl bg-surface-dark flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">call</span>
                            </button>
                            <button className="size-10 rounded-xl bg-surface-dark flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </header>
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                        {/* Timestamp Divider */}
                        <div className="flex justify-center">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 bg-surface-dark px-3 py-1 rounded-full">Today, Oct 24</span>
                        </div>
                        {/* Received Message (from Aditya) */}
                        <div className="flex items-end gap-3 max-w-[70%]">
                            <div className="size-8 rounded-full bg-cover bg-center shrink-0 mb-1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQTIhlAB-uIKbENopksNnXCYEJaIIo0P1oDGkSJHRJH1dqunSM1hmNuQtLzZOV5mYeBc0t1-2fxOiij01r6S4qLIwaUoolXKDsRfpM2masOz1ZVp4ZpAaup_Gd1O_uqZyrodc5HfvouztqYV7cd5z2K8AJVKHnUw_Va1-WN5RkEeE4JFxCnLcEFtIJkvoq4d0qqfbZbNjkQR_p8mmVjLSmN0JG7Lhn6dVJSzNf8WSJegZblLi0s8mBr1JlZjxDwFIi9-38Fqmct2wY')" }}></div>
                            <div className="space-y-1">
                                <div className="bg-surface-dark text-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    <p className="text-sm leading-relaxed">Hi Aryan, I've received the script for the 'Legacy of Mumbai' lead role. The character arc is fascinating!</p>
                                </div>
                                <span className="text-[10px] text-slate-600 ml-1">10:42 AM</span>
                            </div>
                        </div>
                        {/* Sent Message (from Aryan) */}
                        <div className="flex items-end gap-3 max-w-[70%] ml-auto flex-row-reverse">
                            <div className="space-y-1">
                                <div className="bg-primary text-white p-4 rounded-2xl rounded-br-none shadow-lg shadow-primary/10">
                                    <p className="text-sm leading-relaxed">Glad you liked it, Aditya. We think your energy matches the character perfectly. Are you free for a screen test tomorrow?</p>
                                </div>
                                <div className="flex justify-end items-center gap-1 mt-1">
                                    <span className="text-[10px] text-slate-600">10:44 AM</span>
                                    <span className="material-symbols-outlined text-xs text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                                </div>
                            </div>
                        </div>
                        {/* Received Message (from Aditya) */}
                        <div className="flex items-end gap-3 max-w-[70%]">
                            <div className="size-8 rounded-full bg-cover bg-center shrink-0 mb-1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQTIhlAB-uIKbENopksNnXCYEJaIIo0P1oDGkSJHRJH1dqunSM1hmNuQtLzZOV5mYeBc0t1-2fxOiij01r6S4qLIwaUoolXKDsRfpM2masOz1ZVp4ZpAaup_Gd1O_uqZyrodc5HfvouztqYV7cd5z2K8AJVKHnUw_Va1-WN5RkEeE4JFxCnLcEFtIJkvoq4d0qqfbZbNjkQR_p8mmVjLSmN0JG7Lhn6dVJSzNf8WSJegZblLi0s8mBr1JlZjxDwFIi9-38Fqmct2wY')" }}></div>
                            <div className="space-y-1">
                                <div className="bg-surface-dark text-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    <p className="text-sm leading-relaxed">Yes, I'm available at 2 PM. I'll prepare the monologue from page 4.</p>
                                </div>
                                <span className="text-[10px] text-slate-600 ml-1">10:45 AM</span>
                            </div>
                        </div>
                    </div>
                    {/* Chat Input */}
                    <div className="p-6 bg-background-dark border-t border-border-dark">
                        <div className="max-w-4xl mx-auto flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <button className="size-11 rounded-xl bg-surface-dark text-slate-400 hover:text-primary transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined">add_circle</span>
                                </button>
                                <button className="size-11 rounded-xl bg-surface-dark text-slate-400 hover:text-primary transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined">mood</span>
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <input className="w-full bg-surface-dark border-none rounded-2xl px-6 py-3 text-sm focus:ring-1 focus:ring-primary placeholder:text-slate-500 text-white outline-none" placeholder="Type a message..." type="text" />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-white">mic</span>
                                </div>
                            </div>
                            <button className="size-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </main>
                {/* Info Sidebar (Right) */}
                <aside className="w-72 hidden xl:flex flex-col border-l border-border-dark bg-background-dark">
                    <div className="p-8 text-center border-b border-border-dark">
                        <div className="size-24 rounded-full mx-auto bg-cover bg-center border-4 border-surface-dark mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQTIhlAB-uIKbENopksNnXCYEJaIIo0P1oDGkSJHRJH1dqunSM1hmNuQtLzZOV5mYeBc0t1-2fxOiij01r6S4qLIwaUoolXKDsRfpM2masOz1ZVp4ZpAaup_Gd1O_uqZyrodc5HfvouztqYV7cd5z2K8AJVKHnUw_Va1-WN5RkEeE4JFxCnLcEFtIJkvoq4d0qqfbZbNjkQR_p8mmVjLSmN0JG7Lhn6dVJSzNf8WSJegZblLi0s8mBr1JlZjxDwFIi9-38Fqmct2wY')" }}></div>
                        <h3 className="text-lg font-bold text-white">Aditya Roy</h3>
                        <p className="text-xs text-slate-500 font-medium tracking-tight">Casting Director • Mumbai, IN</p>
                        <div className="mt-6 grid grid-cols-2 gap-2">
                            <button className="flex flex-col items-center p-3 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors">
                                <span className="material-symbols-outlined text-primary mb-1">person</span>
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">CD Profile</span>
                            </button>
                            <button className="flex flex-col items-center p-3 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors">
                                <span className="material-symbols-outlined text-primary mb-1">description</span>
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Brief</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-6 space-y-6">
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4 font-bold">Media Shared</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="aspect-square bg-surface-dark rounded-lg bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArO9fNya0x83pdNOPQcOXGb7cGqh6pW9TboshCst-kje0h4LORd__wJLwobNHBKZXRasqpWrd7OUpr5Ra4HpJkwZMNpSiwLqvEv_RpP8pB1Jc9C1xm24YWgCHl_o3Bk6PzY-2X3wtXIQKho2DKteRURlQ-X8HEQ8v04Y8O6JZDyrkx1f2RgcROQSEJzg4mJ2ifisjyflLpdtn4wfseO_sb0qHEShGhCkb5NSWo0Ag-rJkS9g1mccE6P8ELtJ4Zm-topVtqbuRUgcUA')" }}></div>
                                <div className="aspect-square bg-surface-dark rounded-lg bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBl3DPX_qdFkyaBA-F1hdaS_EhYr3Hek1W8S3GRLLMgEcmZ51JnYbWoT3q_Gk8IZaS8W-cm4U9CTrO27HBKmF1qMP68zz8vrmT4ryUNqflRKHjGJLWEc0MQp867o2z03Y5GCUWeWhptzhqHx7tJpmoJf1TAkIJJDYLg6v5iqgC1BRprAgOa8xhiDLBKaLaG_pcHGf2XxOoSj7euPfZDJ6XccVQnIxDRoNqCRLC9NoAgEHZiqvetR4G_HfKUqWIOgjKx_8tBYD1Law2u')" }}></div>
                                <div className="aspect-square bg-surface-dark rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-slate-500">+12</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4 font-bold">Project Audition</h4>
                            <div className="p-3 bg-surface-dark/50 border-l-2 border-primary rounded-r-xl">
                                <p className="text-xs font-bold text-white">Legacy of Mumbai</p>
                                <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-medium italic">
                                    Lead Role Callback
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ArtistMessages;
