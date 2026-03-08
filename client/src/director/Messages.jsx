import React from 'react';
import { Link } from 'react-router-dom';

const Messages = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-80 flex-shrink-0 border-r border-border-dark flex flex-col bg-background-dark">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-border-dark">
                        <div className="flex items-center gap-3 mb-6">
                            <Link to="/dashboard/director" className="size-8 bg-primary rounded flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xl">star</span>
                            </Link>
                            <h2 className="text-xl font-bold tracking-tight">StarCast India</h2>
                        </div>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                            <input className="w-full bg-surface-dark border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary placeholder:text-slate-500 text-white outline-none" placeholder="Search talent..." type="text" />
                        </div>
                    </div>
                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="px-2 py-4 space-y-1">
                            {/* Active Chat */}
                            <div className="flex items-center gap-4 p-4 bg-surface-dark rounded-xl cursor-not-allowed">
                                <div className="relative shrink-0">
                                    <div className="size-12 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8qQE8fT0htjeY9bP3bssrg9C_c4Twnb_BMBfQyaqAO1j7kEfzwGUz8S-CwC70xIi9lAGRax4HsR8x3KMNCMjOT-fp2gF3OEqmQpo9hpzr6KnsQxgUVEUTDrNJR4HmmFE42p2oaVm2KZRl0afzodSMf-AgchHHxcI1qlioiBGMYpjX8RfGZt08VybFGiqJPhoXw_gDmOcXFhznRS43V60k-P1wpqLbS18I8qLpGqAhM4IsvxYuaz8YaIUEbxfhtwh2zDwgcl14Cxze')" }}></div>
                                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-surface-dark rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-semibold truncate text-white">Karan Malhotra</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">10:45 AM</span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate font-medium">The audition script looks great. I'll be...</p>
                                </div>
                            </div>
                            {/* Chat Item 2 */}
                            <div className="flex items-center gap-4 p-4 hover:bg-surface-dark/50 rounded-xl cursor-pointer transition-colors group">
                                <div className="shrink-0">
                                    <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXB4PebpL0-HJc94c2FhTGGk9dQVU64AKPYXUUqVA8KnOVkXyNrpsQY_yfqmH6RlRuwjxQ_ML372hA5T5dOFanv9FeSnQ3i3BW4-XWp6rI3ByrsT3Jf8xCjwNN0ICGjOUFWQizKszIaP_vq0WvDE5Q3H8GBOK10LydcWdw9MdV9KuAf964DCJpOf6LoP_kcJawEVBFSlhDi8JDzGyBesey91tqO820lWYDNmwU6ea6B2MsNEzVGYXbmgBsSByRLtEr2XXbqDxSH4-p')" }}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-semibold truncate text-white">Aryan Sharma</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">Yesterday</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate group-hover:text-slate-300 transition-colors">Are we still on for the screen test at 2pm?</p>
                                </div>
                                <div className="size-2 bg-primary rounded-full shrink-0"></div>
                            </div>
                            {/* Chat Item 3 */}
                            <div className="flex items-center gap-4 p-4 hover:bg-surface-dark/50 rounded-xl cursor-pointer transition-colors group">
                                <div className="shrink-0">
                                    <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQGGwHxiZb-k6Q6iOxlcOaiXcdwu3kVjV6uiXTrTHcEbqnNB9fj8CnpoNWoQm_QbcRPMqxa1YHlh10oZfhewb9lvIv3CLmn4hHapPNunonqhR2deHoUJqsUOAu9cLHu1c3gKxMcxMm_4TFMho27F2Ci3G2o-pQjJWI0zwuoo4SvvXTnnU1Si4H_bL0GOBPXo0pysM5eyqcGGk73pCUDVmPEA6p1xoruXaqB5LzMPlnEamij64sR9_Sg3xWfn-mHzrN-82DcDBH-z2t')" }}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-semibold truncate text-white">Priyank Chopra</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">Tuesday</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate group-hover:text-slate-300 transition-colors">I've uploaded the new portfolio shots.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-border-dark">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-surface-dark flex items-center justify-center overflow-hidden">
                                <div className="size-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQTIhlAB-uIKbENopksNnXCYEJaIIo0P1oDGkSJHRJH1dqunSM1hmNuQtLzZOV5mYeBc0t1-2fxOiij01r6S4qLIwaUoolXKDsRfpM2masOz1ZVp4ZpAaup_Gd1O_uqZyrodc5HfvouztqYV7cd5z2K8AJVKHnUw_Va1-WN5RkEeE4JFxCnLcEFtIJkvoq4d0qqfbZbNjkQR_p8mmVjLSmN0JG7Lhn6dVJSzNf8WSJegZblLi0s8mBr1JlZjxDwFIi9-38Fqmct2wY')" }}></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">Aditya Roy</p>
                                <p className="text-[10px] text-primary uppercase font-bold tracking-wider">Casting Director</p>
                            </div>
                            <Link to="/director/settings" className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-white transition-colors">settings</Link>
                        </div>
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col bg-background-dark/95">
                    {/* Chat Header */}
                    <header className="h-20 flex items-center justify-between px-8 border-b border-border-dark bg-background-dark">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoPlgx75txcrzOly4Cqsi4JwIHIyrrYCbgKqxJOYaaeOFsRcWHZYX80gwNofmhNUeiE0D19rEj1BcFnV4AeCmEO3hFZX-KmOuqbpaMUOxUzA15LUB4MkgQfiXqtLqANLOBMxrswfQgh3RjWwi1CyUmCKIKLPunMvsk0VgG2qqlU66snUXr2tMLbOY03h5ZTdiCbkCr6raVmVKXUvj571LCmlPz6p5lbpAzz-JXdsXSnz2Dj-kOqyTXjWnDiB2VpvGVCaJnZxy_J8qQ')" }}></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-bold text-white">Karan Malhotra</h2>
                                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-tight border border-primary/30">Shortlisted</span>
                                </div>
                                <p className="text-xs text-green-500 flex items-center gap-1">
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
                        {/* Received Message */}
                        <div className="flex items-end gap-3 max-w-[70%]">
                            <div className="size-8 rounded-full bg-cover bg-center shrink-0 mb-1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKzsnnv3Ex_WwsLenY-4c3fHtKBNaTFxwp4HMF9mlpykPm3ViGwzXWPY078rnPcI7h1kOby6BloPpzH3v1A694FwEAAvX9CN8MTIvqOrX8QSzUXMiAr3T18muvjIJNBbckabCH9Ln9Vm5NOVtdTkOe0h8u_UstUGTvqVXN816DIG9R0ts7ONmSDzmmGj1k8W1besgbezI1BCGU2rPxEId-YcZMoC_p4T7fwpvAO2KbNU_0H3UyLnOI2DTYPUh7MMEOMa6oJmIgg_OU')" }}></div>
                            <div className="space-y-1">
                                <div className="bg-surface-dark text-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    <p className="text-sm leading-relaxed">Hi Aditya, I've received the script for the 'Legacy of Mumbai' lead role. The character arc is fascinating!</p>
                                </div>
                                <span className="text-[10px] text-slate-600 ml-1">10:42 AM</span>
                            </div>
                        </div>
                        {/* Sent Message */}
                        <div className="flex items-end gap-3 max-w-[70%] ml-auto flex-row-reverse">
                            <div className="space-y-1">
                                <div className="bg-primary text-white p-4 rounded-2xl rounded-br-none shadow-lg shadow-primary/10">
                                    <p className="text-sm leading-relaxed">Glad you liked it, Karan. We think your energy matches the character perfectly. Are you free for a screen test tomorrow?</p>
                                </div>
                                <div className="flex justify-end items-center gap-1 mt-1">
                                    <span className="text-[10px] text-slate-600">10:44 AM</span>
                                    <span className="material-symbols-outlined text-xs text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                                </div>
                            </div>
                        </div>
                        {/* Received Message */}
                        <div className="flex items-end gap-3 max-w-[70%]">
                            <div className="size-8 rounded-full bg-cover bg-center shrink-0 mb-1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcvAdYiFGM9ZiYdlFawaBL0GD9j252UvQxGKgdM3vD4EDyISPZp7d3kyeP_QOQf0v1y99iGLguRHvJkvinGI_4iOLhQ7zJ-OanVkXWm9v4HPQrjYphPaHNWBVlqfMVcJNOInX4UX7RLgtbI21h88aZiqz5PZo8A9A1_dZdHSPGlp8DE8zSbOdR1JOt-X0vBTXVszUkxPdeg2VCc6b8mywSvaOX3vBFx6YjCqOmR1l3O5AazDIoul0QRQu2slkXJMtAlJY_PDxhPzjI')" }}></div>
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
                        <div className="size-24 rounded-full mx-auto bg-cover bg-center border-4 border-surface-dark mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVVgDygxB4t0l_Z9BF3NxUU8mvZJUDXmAT8jryYX8wyUYylcG_oznkbmpIdtFZeL1Dy_RdvNw912aga9OqXq5ip1i3BcwzDoMy9l9KKfJerluAfC9yRb-JyQRGV2Scu4t-KnPj79nK3Gmc4B8NdNCT-wzyXehjmG4WIQPVN5ePWnaSZbUoy2MsDcJ3qAvIsB0sCKXam3Lrz_G6d7yRnBwPKdOjHMBEqWktXugUHI7Wy1ur9jk3943w8QIrgXnnkSL91DW-b0abkOck')" }}></div>
                        <h3 className="text-lg font-bold text-white">Karan Malhotra</h3>
                        <p className="text-xs text-slate-500 font-medium">Actor • Mumbai, India</p>
                        <div className="mt-6 grid grid-cols-2 gap-2">
                            <button className="flex flex-col items-center p-3 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors">
                                <span className="material-symbols-outlined text-primary mb-1">person</span>
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Profile</span>
                            </button>
                            <button className="flex flex-col items-center p-3 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors">
                                <span className="material-symbols-outlined text-primary mb-1">description</span>
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Script</span>
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
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4 font-bold">Upcoming Schedule</h4>
                            <div className="p-3 bg-surface-dark/50 border-l-2 border-primary rounded-r-xl">
                                <p className="text-xs font-bold text-white">Screen Test: Legacy of Mumbai</p>
                                <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
                                    <span className="material-symbols-outlined text-[12px]">schedule</span> Oct 25, 2:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Global Sidebar Overlay Link for Navigation back */}
            {/* Note: This component is standalone as per HTML but usually nested in a layout */}
        </div>
    );
};

export default Messages;
