import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getProfiles, getMyProfile } from '../services/profileService';
import { Link } from 'react-router-dom';
import { DIRECTOR_MENU } from '../constants/navigation';
import { transformCloudinaryUrl } from '../utils/cloudinaryUrl';

const TalentDiscovery = () => {
    const [talents, setTalents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [filters, setFilters] = useState({
        talentCategory: '',
        location: '',
        skills: '',
        eyeColor: '',
        hairColor: '',
        minHeight: '',
        maxHeight: '',
    });

    const categories = [
        'Actor', 'Background Artist', 'Child Artist', 'Model', 'Theatre Actor', 'Voiceover Artist', 
        'Singer', 'Musician', 'Dancer / Choreographer', 'Stunt Performer', 'Comedian', 
        'Influencer / Creator', 'Anchor / Host', 'Cinematographer', 'Editor', 
        'Writer / Screenplay', 'Makeup / Hair', 'Costume / Stylist', 'Production Crew', 'Other'
    ];

    const fetchData = async (cursor = null, append = false) => {
        if (!append) {
            setLoading(true);
        }
        try {
            const [profileData, talentsData] = await Promise.all([
                getMyProfile(),
                getProfiles({ ...filters, cursor, limit: 12 })
            ]);
            setProfile(profileData.data);
            const talentProfiles = (talentsData.data || []).filter(t => t.user?.role === 'talent');
            setTalents((prev) => append ? [...prev, ...talentProfiles] : talentProfiles);
            setNextCursor(talentsData.nextCursor || null);
        } catch (err) {
            console.error('Error fetching talent discovery data:', err);
        } finally {
            if (!append) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]); // Refetch when filters change

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        fetchData();
    };

    const loadMore = async () => {
        if (!nextCursor || loadingMore) return;
        setLoadingMore(true);
        try {
            await fetchData(nextCursor, true);
        } finally {
            setLoadingMore(false);
        }
    };

    const userData = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Production House'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') : profile?.profilePicture
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Talent Discovery"
            headerSubtitle="Find the perfect match for your upcoming production."
            searchPlaceholder="Search talent names..."
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-3 space-y-4 md:space-y-6">
                    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6 md:mb-8">
                            <h3 className="text-lg md:text-xl font-black dark:text-white uppercase tracking-tighter italic">Filters</h3>
                            <button onClick={() => setFilters({ talentCategory: '', location: '', skills: '', eyeColor: '', hairColor: '', minHeight: '', maxHeight: '' })} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Reset</button>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3 block">Talent Category</label>
                                <select 
                                    name="talentCategory"
                                    value={filters.talentCategory}
                                    onChange={handleFilterChange}
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3 block">Location</label>
                                <input 
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    placeholder="e.g. Mumbai"
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3 block">Eye Color</label>
                                <select 
                                    name="eyeColor"
                                    value={filters.eyeColor}
                                    onChange={handleFilterChange}
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                                >
                                    <option value="">Any Color</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Black">Black</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Green">Green</option>
                                    <option value="Amber">Amber</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3 block">Hair Color</label>
                                <select 
                                    name="hairColor"
                                    value={filters.hairColor}
                                    onChange={handleFilterChange}
                                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                                >
                                    <option value="">Any Color</option>
                                    <option value="Black">Black</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Blonde">Blonde</option>
                                    <option value="Red">Red</option>
                                    <option value="Grey">Grey</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3 block">Height Range (cm)</label>
                                <div className="flex gap-2 md:gap-3">
                                    <input 
                                        name="minHeight"
                                        value={filters.minHeight}
                                        onChange={handleFilterChange}
                                        placeholder="Min"
                                        className="w-1/2 bg-slate-100 dark:bg-white/5 border-none rounded-xl px-3 md:px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                    <input 
                                        name="maxHeight"
                                        value={filters.maxHeight}
                                        onChange={handleFilterChange}
                                        placeholder="Max"
                                        className="w-1/2 bg-slate-100 dark:bg-white/5 border-none rounded-xl px-3 md:px-4 py-3 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={applyFilters}
                                className="w-full bg-primary text-white font-black py-3 md:py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Talent Grid */}
                <div className="lg:col-span-9">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 md:h-96 space-y-4">
                            <span className="material-symbols-outlined text-4xl md:text-5xl text-primary animate-spin">sync</span>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Casting the net...</p>
                        </div>
                    ) : talents.length === 0 ? (
                        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-2xl md:rounded-3xl p-8 md:p-16 text-center shadow-sm">
                            <span className="material-symbols-outlined text-5xl md:text-6xl text-slate-300 mb-6">person_search</span>
                            <h3 className="text-lg md:text-xl font-black dark:text-white uppercase tracking-tighter mb-2 italic">No Talents Found</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Try adjusting your filters to broaden your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
                            {talents.map((talent) => (
                                <div key={talent.id} className="bg-white dark:bg-card-dark rounded-2xl md:rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden group hover:ring-4 hover:ring-primary/10 transition-all shadow-sm">
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={talent.profilePicture === 'no-photo.jpg' ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80' : transformCloudinaryUrl(talent.profilePicture, 400, 540)} alt={talent.fullName} />
                                        <div className="absolute top-3 md:top-4 left-3 md:left-4">
                                            <span className="bg-black/40 backdrop-blur-xl text-white text-[10px] font-black px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10 shadow-xl">
                                                <span className="material-symbols-outlined text-[10px] fill-current text-primary">star</span> 4.8
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 px-4 md:px-6">
                                            <Link to={`/talent/${talent.id}`} className="w-full bg-white text-primary font-black py-3 md:py-4 rounded-2xl text-[10px] text-center uppercase tracking-widest hover:bg-slate-50 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl">View Portfolio</Link>
                                            <button className="w-full bg-primary text-white font-black py-3 md:py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl delay-75">Send Audition</button>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-8">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-extrabold text-lg md:text-xl text-slate-900 dark:text-white leading-tight uppercase tracking-tight italic truncate pr-2">{talent.fullName}</h4>
                                            <span className="text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider text-primary bg-primary/10 flex-shrink-0">
                                                Verified
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mb-4 md:mb-6 italic truncate">{talent.talentCategory} • {talent.physicalMetrics?.height || 'N/A'}</p>
                                        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                                            {talent.skills?.slice(0, 3).map((skill, i) => (
                                                <span key={i} className="text-[9px] font-black uppercase px-2 py-1 bg-slate-100 dark:bg-white/5 dark:text-slate-400 rounded tracking-widest border border-transparent hover:border-primary/30 transition-all">{skill}</span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-white/5 pt-4 md:pt-6">
                                            <span className="flex items-center gap-2 truncate"><span className="material-symbols-outlined text-sm text-primary">location_on</span>{talent.location}</span>
                                            <button className="text-primary hover:underline flex-shrink-0">Shortlist</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {nextCursor && (
                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                onClick={loadMore}
                                disabled={loadingMore}
                                className="rounded-2xl bg-slate-100 dark:bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 disabled:opacity-60"
                            >
                                {loadingMore ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TalentDiscovery;
