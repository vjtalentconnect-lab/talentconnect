import React from 'react';

const RegionalSpotlight = () => {
    return (
        <section className="py-20 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section Header */}
                <div className="mb-10">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Premium Discovery</span>
                    <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-4xl md:text-5xl font-extrabold leading-tight mb-4">Regional Talent Spotlight</h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">Celebrating the rich diversity of Indian artistry. Discover emerging and established stars from every corner of the country.</p>
                </div>

                {/* Language Filters */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary text-black font-semibold px-5 shadow-md">
                        <span className="text-sm">All Languages</span>
                    </button>
                    {['Marathi', 'Tamil', 'Telugu', 'Malayalam', 'Bengali', 'Punjabi'].map((lang) => (
                        <button key={lang} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-slate-200 dark:bg-primary/10 border border-slate-300 dark:border-primary/20 hover:border-primary px-5 transition-colors">
                            <span className="text-slate-800 dark:text-slate-200 text-sm font-medium">{lang}</span>
                            <span className="material-symbols-outlined text-lg opacity-60">keyboard_arrow_down</span>
                        </button>
                    ))}
                </div>

                {/* Featured Section Divider */}
                <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
                    <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Featured Artists</h2>
                    <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">
                        View all
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>

                {/* Artist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Artist Card 1 - Anirudh Ravichander */}
                    <div className="group flex flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-primary/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAg20jUYuA_WMd6ekckFpTWjMIMgLXWfayYlX1mT4_whtVtxqoywOQg9PS5ehpQXZfplVjne4gyNJ1A06gKPNbo_s9Ne93g2o6L1rLVXg1SXdQyYKS7LJjpc6jmJKNyKoog2naBxf3Fo3JUFSaPs-7EFTfH4Gg6AULdoT1bFgONd2IO7vDNyY5lpTQwqiWL89HV0j9BJW7ZddLl_d3GOsyuPW1c4sNgcxaT6b8VZB6_Td8MUgJq43SatnvW-jZb7SGRnLv3KfS6PmEF")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Top Rated</span>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Anirudh Ravichander</h3>
                                <div className="flex items-center text-primary">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="text-xs font-bold ml-1">4.9</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-primary/10 text-primary dark:text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">Tamil</span>
                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
                                    <span className="material-symbols-outlined text-xs mr-1">location_on</span>
                                    Chennai
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Artist Card 2 - Sithara Krishnakumar */}
                    <div className="group flex flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-primary/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDk3zbKiI54cbLz3JqhPHJrExgM71fJfrcdvNWp-lr_pyweEHXCSHHqcIVfkUBF2VnKufJr3Q3gTky6j5prWhoaWPmkFjbrmcx8S9pjrnrhCH5d6libc8Rgnr_kOA3x9Yj4e-52gxHykUXcmA3a2jC_6dgmutDJrNBwwTA7HghuUFBwiJyvJJz0hQcEaO6FMZBmJmXq8gxSIidlRFJXQmtVMuCCyvRn71Nelad9IISHnWGU_XTtz8RwsH-6Q_GHs6tn8h3kaTt_8Oic")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-5 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Sithara Krishnakumar</h3>
                                <div className="flex items-center text-primary">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="text-xs font-bold ml-1">4.8</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-primary/10 text-primary dark:text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">Malayalam</span>
                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
                                    <span className="material-symbols-outlined text-xs mr-1">location_on</span>
                                    Kochi
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Artist Card 3 - Amrit Maan */}
                    <div className="group flex flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-primary/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8b5_3z1RTs1ko3VPnGOOR1DChbCNg2luenEzwtOsu0porEr5XUD4HY0sBU_gRVy8215x4cv9jE9yKOTlNKkbnnzEFqW7HnI2vvJC0B0HUVXTo2xs2hRTq0AU_UAcQfgbyDch7UARcT3jWooCsYvU05Tq5OEykxIhSJwBp8QO_5x4KE1KXs85nmaZuJ-s-vDj8jZioRP8dQyQ3QUIFFna-XHl4g5VMlxkmmc5bNRSZPffNvmBigDkU2iAaHFI2hjAZLuVJ5P3IHOAK")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-5 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Amrit Maan</h3>
                                <div className="flex items-center text-primary">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="text-xs font-bold ml-1">4.7</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-primary/10 text-primary dark:text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">Punjabi</span>
                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
                                    <span className="material-symbols-outlined text-xs mr-1">location_on</span>
                                    Mohali
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Artist Card 4 - Sid Sriram */}
                    <div className="group flex flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-primary/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-HPsedI1lk71EKU3hTsOwITtEYbVDwtWkbTevVhswAxOhwcXu_urmgHPn3IPXsrRWh80FetMp23TWloZdjkr1-vj3EDdaQUbSGwf0D6cxpqXndvuHny_Eryb4OZZCwAw_EAF3DsQlSsfdRlL2lTG797fuBJJUAS56KaXAWc93d3i2GSjeSkci48hV9MMQ5L4w8M8pDuMdoPnOCgRKzvuhe0pySMkJMt1e_x64kcNc-aDbGhm3B3-aScDlNsSMpMWhfb5qZhospkBH")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-5 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Sid Sriram</h3>
                                <div className="flex items-center text-primary">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="text-xs font-bold ml-1">4.9</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-primary/10 text-primary dark:text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">Telugu</span>
                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
                                    <span className="material-symbols-outlined text-xs mr-1">location_on</span>
                                    Hyderabad
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trending Section */}
                <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight mt-16 mb-8 border-l-4 border-primary pl-4">Trending in West Bengal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-xl border border-slate-200 dark:border-primary/10 transition-all hover:border-primary/30">
                        <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOtzdklZ_dgsXXQ9EEIaRyOnaKu1zuVe1zOxufH1d1bVHqUl-EeXZGUe6LIsMChjRQM6IDsQPDvtK2qLsBNOTQnGm-RKWxkY1dbPW5pMS9m2p31GWFSNVKUWvAIwN9oCMNIPlJ7AQNz-s76PThuKquAhWa9iObdDNnuELRbSkbuu-7TbsfMBvV4QL-Q4d1MgLqanDLrEs3laOucq8-RPqna6JcOmYEJWaUstv-dk_WP9aB4cagaguv7qmTUKcrD-ol2X5hVoUcOj4J")' }}></div>
                        <div className="flex flex-col">
                            <h4 className="text-slate-900 dark:text-slate-100 font-bold">Arijit Singh</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Bengali • Kolkata</p>
                        </div>
                        <div className="ml-auto text-primary">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-xl border border-slate-200 dark:border-primary/10 transition-all hover:border-primary/30">
                        <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDde999Wj0RKO9zH0NZo4GjieDGh_7ku9aonrLCRXOTUXwMHFAjPeGOX8hZu2GhsM3Ql_xGIZ7EGow0xHXC99bW1dUKUD0axzDmRiqiSa2loumLPBjGRaAIqHVrHOMoCLexufQp5d2JGIIXBVRi08Xoj0iSNtyf00ArHsKxXk2xM9VfbW3cLRgvTVaSaJe45pVHTkQhoPTLHdGMJECuqfTI5k_BjKrP9GeM9GvDBMWDeUV4xVYB3uFWIvDGEz50HYneUAIf-3gqkZlQ")' }}></div>
                        <div className="flex flex-col">
                            <h4 className="text-slate-900 dark:text-slate-100 font-bold">Shreya Ghoshal</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Bengali • Murshidabad</p>
                        </div>
                        <div className="ml-auto text-primary">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegionalSpotlight;
