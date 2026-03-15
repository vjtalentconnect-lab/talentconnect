import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden min-h-screen">
            <div className="relative flex min-h-screen flex-col">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-10 lg:px-40 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-white">TALENT<span className="text-primary">CONNECT</span></h2>
                    </div>
                    <button className="flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white p-2 transition-colors border border-white/10">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* Main Content Area */}
                <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 md:px-10">
                    <div className="max-w-4xl w-full flex flex-col items-center">
                        {/* Hero Image Section (The "Empty Set") */}
                        <div className="relative w-full mb-8">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/5">
                                {/* Background Image Placeholder */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpoUwWTv08L1X6SCz-eM4XJI0YowOe-Is7DcIoLjP8CdSRgFag7oMGheQwyMt6xuUrOBGQhcDpKU4t1HbpyxJ0jIvxGwaBLeoh9UycV-TnRyAlgVqNcL3wuu8LSfKJkyagmuJZtyXilOqqOM2qDthgatLacQP8YelWuoLtcmBciKP6hxhdiPEtBWWHqKdlClHu0Jiu80-G0Hxp-WXcmAalIy4369WfSrfx0u1Y1PPpY7o-Tozb2mSYS-JhQrj6AatRjzg_4_tD8WJ2')" }}
                                >
                                </div>
                                {/* The "Flickering Spotlight" Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(238,43,59,0.1)_0%,transparent_60%)]"></div>

                                {/* Camera Viewfinder Overlay Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-40">
                                    <div className="flex justify-between">
                                        <div className="border-t-2 border-l-2 border-white w-8 h-8"></div>
                                        <div className="border-t-2 border-r-2 border-white w-8 h-8"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-white text-xs font-mono tracking-widest uppercase mb-1">REC</span>
                                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#ee2b3b]"></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="border-b-2 border-l-2 border-white w-8 h-8"></div>
                                        <div className="border-b-2 border-r-2 border-white w-8 h-8"></div>
                                    </div>
                                </div>

                                {/* Central Text Over Image */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                    <h1 className="text-white text-7xl md:text-9xl font-black tracking-tighter opacity-20 select-none">404</h1>
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 text-primary font-bold text-sm uppercase tracking-widest">
                                        <img src="/TC Logo.png" alt="Logo" className="h-4 w-auto" />
                                        Scene Missing
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center max-w-2xl px-4">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                                Lights, Camera... <br className="md:hidden" /> but <span className="text-primary">no Action</span> found here
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed mb-10">
                                It seems we've wandered off the script. The page you're looking for isn't on the call sheet, or maybe it was cut in the final edit.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 group" to="/">
                                    <span className="material-symbols-outlined">home</span>
                                    Go to Home Base
                                </Link>
                                <Link className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 group" to="/support">
                                    <span className="material-symbols-outlined">support_agent</span>
                                    Contact Support
                                </Link>
                            </div>
                        </div>

                        {/* Helpful Links */}
                        <div className="mt-16 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            <Link className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium" to="/talent/audition-invites">
                                <span className="material-symbols-outlined text-lg">person_search</span>
                                Latest Auditions
                            </Link>
                            <Link className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium" to="/dashboard/director">
                                <span className="material-symbols-outlined text-lg">video_camera_front</span>
                                Talent Search
                            </Link>
                            <Link className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium" to="/community">
                                <span className="material-symbols-outlined text-lg">info</span>
                                Community Forum
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-8 md:px-10 lg:px-40 bg-background-dark/50 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">© 2026 TALENT<span className="text-primary">CONNECT</span>. All Rights Reserved.</p>
                        <div className="flex items-center gap-6">
                            <a className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                            <a className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                            <a className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">rss_feed</span></a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default NotFound;
