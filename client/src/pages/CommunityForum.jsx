import React from 'react';
import { Link } from 'react-router-dom';

const CommunityForum = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen transition-colors duration-200">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 shrink-0">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined block">theaters</span>
                        </div>
                        <h1 className="text-xl font-extrabold tracking-tight hidden md:block">StarCast <span className="text-primary text-sm font-medium ml-1 bg-primary/10 px-2 py-0.5 rounded">FORUM</span></h1>
                    </Link>
                    {/* Nav Links */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Discussions</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Advice</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">News</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Castings</a>
                    </nav>
                    {/* Search Bar */}
                    <div className="flex-1 max-w-md hidden sm:block">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            <input className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-500" placeholder="Search forum threads..." type="text" />
                        </div>
                    </div>
                    {/* Profile & Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-full transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-cover bg-center border border-slate-200 dark:border-border-dark cursor-pointer" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAytM7fTHxNUtuQD7XKZv5ic7DT9AoIUiozG-RISk9W8_OHwchj5XD-NAuHRv-kpdvyb-yJ63To0B8-z147jhyuGadf7z6iKilddWF2FWxgyeXL_TwSYfWy9URjouMhRAN3Krjwvxi2pUZYs75_GlgIAZUb__4FQLmLLsxSN76wJrfbz1IcGDX_L5I6rSeXI_ape8958spZ2gOTKp5MmfPSQK1K3vmGCMIe4YKyW5td9f4x4gSL8ZC4aUze3m617q0oPJE1KxB28-Z9')" }}>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar Navigation */}
                    <aside className="lg:col-span-3 space-y-8">
                        <div className="space-y-2">
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all">
                                <span className="material-symbols-outlined">add_comment</span>
                                Start a Discussion
                            </button>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 px-4">Categories</p>
                            <a className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary font-semibold rounded-xl transition-colors" href="#">
                                <span className="material-symbols-outlined text-[20px]">forum</span>
                                Acting Advice
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-surface-dark text-slate-600 dark:text-slate-400 font-medium rounded-xl transition-colors" href="#">
                                <span className="material-symbols-outlined text-[20px]">engineering</span>
                                Production & Crew
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-surface-dark text-slate-600 dark:text-slate-400 font-medium rounded-xl transition-colors" href="#">
                                <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                                Audition Experiences
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-surface-dark text-slate-600 dark:text-slate-400 font-medium rounded-xl transition-colors" href="#">
                                <span className="material-symbols-outlined text-[20px]">newspaper</span>
                                Industry News
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-surface-dark text-slate-600 dark:text-slate-400 font-medium rounded-xl transition-colors" href="#">
                                <span className="material-symbols-outlined text-[20px]">school</span>
                                Education & Training
                            </a>
                        </div>
                        {/* Trending Topics Sidebar Widget */}
                        <div className="bg-slate-100 dark:bg-surface-dark/50 rounded-2xl p-5 border border-slate-200 dark:border-border-dark">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-base">trending_up</span>
                                Trending Topics
                            </h3>
                            <div className="space-y-4">
                                <div className="group cursor-pointer">
                                    <p className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">Tips for first Netflix India audition?</p>
                                    <p className="text-xs text-slate-500 mt-1">42 replies • 1.2k views</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <p className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">Mumbai Casting Directors to avoid in 2024</p>
                                    <p className="text-xs text-slate-500 mt-1">156 replies • 8.4k views</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <p className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">Transitioning from TV to OTT</p>
                                    <p className="text-xs text-slate-500 mt-1">28 replies • 890 views</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                    {/* Main Discussion Area */}
                    <div className="lg:col-span-9">
                        {/* Forum Header Tabs */}
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-border-dark mb-6 overflow-x-auto">
                            <div className="flex gap-8">
                                <a className="pb-4 text-sm font-bold border-b-2 border-primary text-primary whitespace-nowrap" href="#">Latest Activity</a>
                                <a className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap transition-colors" href="#">Top Voted</a>
                                <a className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap transition-colors" href="#">Unanswered</a>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 pb-4">
                                <span className="text-xs text-slate-500">View:</span>
                                <button className="p-1 text-primary"><span className="material-symbols-outlined text-lg">view_list</span></button>
                                <button className="p-1 text-slate-400"><span className="material-symbols-outlined text-lg">grid_view</span></button>
                            </div>
                        </div>
                        {/* Discussion Feed */}
                        <div className="space-y-4">
                            {/* Post Card 1 */}
                            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-5 hover:border-primary/50 transition-all cursor-pointer group">
                                <div className="flex gap-4">
                                    <div className="shrink-0 flex flex-col items-center gap-1 mt-1">
                                        <button className="hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">expand_less</span>
                                        </button>
                                        <span className="text-xs font-bold">142</span>
                                        <button className="hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">expand_more</span>
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded">Acting Advice</span>
                                            <span className="text-xs text-slate-500">Posted by</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGXlcZ4fh_q7RQNu8NBNy1GcQHSjJIIiJOVZ1sgH5YOP3H7RgPs_IiIwdZnzfYalAOzWwpBzJ5S30MZf8AE5fH_QLKaWANh5Iyh8L4xNBMFBsKuifZ4wkotXZ-6yQaAlDktVtQRAjMglhN4o0LyvPMdvpNRpEPe08ucY05EDfi895vj360j6jtEZ5s-MZ0EB8rbEmyfLCSzDKM_ggLH197Ut6XuogO6xhc9mc2nyy8gJXB3TOX6Fazdg8jFMkv0WhNIs5gQR4dXqpv')" }}></div>
                                                <span className="text-xs font-bold hover:underline">Siddharth Malhotra</span>
                                                <span className="bg-blue-500/10 text-blue-500 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[10px] fill-1">verified</span> Verified Artist
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500">• 2 hours ago</span>
                                        </div>
                                        <h2 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug mb-2">How to nail the 'Emotional Recall' technique for crying scenes?</h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                            I've been struggling with consistent emotional performance on set. When I do it in workshops it works, but under the pressure of the crew and lights, I freeze up. Any specific exercises that help with maintaining focus?
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                <span className="material-symbols-outlined text-lg">chat_bubble</span>
                                                34 Replies
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                                852 Views
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium ml-auto">
                                                <span className="material-symbols-outlined text-lg">share</span>
                                                <span className="material-symbols-outlined text-lg">bookmark</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Post Card 2 */}
                            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-5 hover:border-primary/50 transition-all cursor-pointer group">
                                <div className="flex gap-4">
                                    <div className="shrink-0 flex flex-col items-center gap-1 mt-1">
                                        <button className="hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">expand_less</span>
                                        </button>
                                        <span className="text-xs font-bold">89</span>
                                        <button className="hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">expand_more</span>
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="bg-green-500/10 text-green-500 text-[10px] font-bold uppercase px-2 py-0.5 rounded">Production & Crew</span>
                                            <span className="text-xs text-slate-500">Posted by</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwaDdyjl4Om9g8E96N8O9PC_2_ahCS0C_Fy_q0-WT833a3c9PDYV85NAhGPIzjDjNMw77gLWTggr1pSe0iTNYF6ZyGXVJYBNdjAMxDHQKYQLcmBmXKI0hWc5k-6ZsDY4ePRWQf9ZiVFrQEX5x5FusBxH6U3cGmv4eArFk8k8lZ4RBKMODrwPGzJUkoEWYmLhH1_Us_PL_N5s_DPC1NLsZkQuZm-L598p7mW-DgD_Xl9R_xfhmtzla6oVCviqifPofHmhXt3iJZJuXt')" }}></div>
                                                <span className="text-xs font-bold hover:underline">Priya Sharma</span>
                                                <span className="bg-primary/10 text-primary text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[10px] fill-1">movie</span> Director
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500">• 5 hours ago</span>
                                        </div>
                                        <h2 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug mb-2">Essential kit list for Indie Cinematographers in 2024</h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                            If you are just starting out with a budget of 2-5 lakhs, here is how I would prioritize your gear purchases. Don't waste money on 8K cameras if you don't have decent lighting.
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                <span className="material-symbols-outlined text-lg">chat_bubble</span>
                                                12 Replies
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                                2.1k Views
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium ml-auto">
                                                <span className="material-symbols-outlined text-lg">share</span>
                                                <span className="material-symbols-outlined text-lg">bookmark</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Post Card 3 */}
                            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-5 hover:border-primary/50 transition-all cursor-pointer group">
                                <div className="flex gap-4">
                                    <div className="shrink-0 flex flex-col items-center gap-1 mt-1">
                                        <button className="hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">expand_less</span>
                                        </button>
                                        <span className="text-xs font-bold">215</span>
                                        <button className="hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">expand_more</span>
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase px-2 py-0.5 rounded">Audition Experiences</span>
                                            <span className="text-xs text-slate-500">Posted by</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5w6UxRf7133jCVHctS1fqvA8e-xmNtyBdMKcrqN1Btpu8SaYSTNswap_e1U2L3o0ID5t-4HxkyB0IZCtDB4-Ly0Qrfx5S_7I83cFq0Aylo6G8d3drj1lAt-w7u4VTXDXA6r7ASwVaeKjRVMRW2aveiLr2vvYtkLXI81-t9B_zkPwD-UjN4V8fbWaSdY9y5DiZWc-8a0Ke5pPDqNNfvlI9f_XTBHfJf8Rc3aVhvfC0-zrq0Zfo7dEmYdPGM4502GKr7kXn3t62tgN')" }}></div>
                                                <span className="text-xs font-bold hover:underline">Rohan Varma</span>
                                            </div>
                                            <span className="text-xs text-slate-500">• Yesterday</span>
                                        </div>
                                        <h2 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug mb-2">My experience auditioning for a Dharma Production project</h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                            It was a 3-round process. Round 1 was a self-tape. Round 2 was a live zoom call. Round 3 was in person at their Andheri office. Here is exactly what they asked...
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                <span className="material-symbols-outlined text-lg">chat_bubble</span>
                                                98 Replies
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                                12.5k Views
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium ml-auto">
                                                <span className="material-symbols-outlined text-lg">share</span>
                                                <span className="material-symbols-outlined text-lg">bookmark</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 pt-8">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-border-dark text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-border-dark hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-border-dark hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors">3</button>
                            <span className="px-2 text-slate-400">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-border-dark hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors">12</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-border-dark text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Forum Rules / Footer Banner */}
            <footer className="mt-12 border-t border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark/30 py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h4 className="font-bold text-lg mb-4">Forum Guidelines</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            StarCast Forum is a professional space for industry growth. Be respectful, share constructive advice, and maintain artist privacy at all times.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Safety & Scams Awareness</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Moderator Application</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">verified_user</span>
                            <span className="text-sm font-bold">12k+ Professional Artists Active</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </button>
                            <button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-xl">rss_feed</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">© 2024 StarCast India. A Cinematic Experience.</p>
                    <div className="flex gap-6">
                        <a className="text-xs text-slate-500 hover:text-primary" href="#">Support</a>
                        <a className="text-xs text-slate-500 hover:text-primary" href="#">Contact</a>
                        <a className="text-xs text-slate-500 hover:text-primary" href="#">Careers</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CommunityForum;
