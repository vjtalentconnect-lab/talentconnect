import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProjectStep2 = () => {
    const navigate = useNavigate();

    const handlePublish = (e) => {
        e.preventDefault();
        alert('Project published successfully!');
        navigate('/dashboard/director');
    };

    const handleBack = () => {
        navigate('/director/create-project/step1');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="layout-container flex h-full grow flex-col">
                {/* Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 md:px-10 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">TalentConnect</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-8 items-center">
                        <nav className="hidden md:flex items-center gap-9">
                            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Projects</a>
                            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Talent</a>
                            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Auditions</a>
                        </nav>
                        <div className="bg-primary/10 rounded-full p-1 border border-primary/20">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
                                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzeXZ7nqcvaU5arhR4S63x7nVWlArh-noSt3HvhWEW4XwzJ0yOuMbj2Jhau69uwZMN5HKutLZujQfnyEkxAQ9pLUOkdH7p-Q_H70rD1alCgfoBUTKSsXHm47NdbPlUM6Iq5jmGqEUVMTOkC1ftNQ86edWjLjC53URZTXkPpW--LhAqSbwT0MP3NWdQKwn4JtXVjuRxKLpKi8aq5iQh2i82xDhCDoIiWtoYnKzmzAnUC3ivorXzTAkLl8PRVXecctA-RLcznt0U8jTi")` }}
                            ></div>
                        </div>
                    </div>
                </header>

                <main className="flex flex-1 justify-center py-8 px-4 md:px-0">
                    <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
                        {/* Progress Tracker */}
                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex gap-6 justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Step 2 of 4</span>
                                    <p className="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Casting Requirements</p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">50% Complete</p>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '50%' }}></div>
                            </div>
                        </div>

                        {/* Page Header */}
                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Define Your Talent Needs</h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">Specify the roles and unique attributes required for your production to find the perfect match.</p>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-primary/20 rounded-xl p-6 md:p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary text-white size-8 rounded-lg flex items-center justify-center font-bold">1</div>
                                    <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Lead Protagonist</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Role Title</span>
                                            <input
                                                className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                placeholder="e.g. Inspector Arjun"
                                                type="text"
                                                defaultValue="Arjun - The Visionary Detective"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Age Range</span>
                                        <div className="flex gap-2">
                                            <input className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none" placeholder="Min" type="number" defaultValue="28" />
                                            <input className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none" placeholder="Max" type="number" defaultValue="35" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Gender</span>
                                        <select className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none appearance-none">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Non-binary</option>
                                            <option>Any</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Physical Attributes</span>
                                        <textarea
                                            className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none resize-none"
                                            placeholder="Height, build, eye color, specific ethnic look..."
                                            rows="2"
                                            defaultValue={`Athletic build, height 5'10" or above. Intense eyes, sharp jawline. Versatile look.`}
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Key Skills Required</span>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">Method Acting <button className="material-symbols-outlined text-[14px]">close</button></span>
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">Martial Arts <button className="material-symbols-outlined text-[14px]">close</button></span>
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">Deep Voice <button className="material-symbols-outlined text-[14px]">close</button></span>
                                        </div>
                                        <div className="relative">
                                            <input className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none" placeholder="Add a skill and press Enter" type="text" />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                                                <span className="material-symbols-outlined">add_circle</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/50 dark:bg-slate-900/20 border-2 border-dashed border-slate-300 dark:border-primary/20 rounded-xl p-6 md:p-8 group hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center py-12">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">person_add</span>
                                </div>
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">Add Another Role</h3>
                                <p className="text-slate-500 text-sm">Create specific requirements for secondary or supporting talent.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pb-20 border-t border-slate-200 dark:border-primary/20 pt-8">
                            <button
                                onClick={handleBack}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                type="button"
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                                Back to Basics
                            </button>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold border border-primary text-primary hover:bg-primary/5 transition-colors">
                                    Save Draft
                                </button>
                                <button
                                    onClick={handlePublish}
                                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    Publish Project
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-slate-100 dark:bg-slate-950/50 py-6 px-10 border-t border-slate-200 dark:border-primary/10">
                    <div className="max-w-[800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">Need help defining roles? <a className="text-primary hover:underline" href="#">View Casting Guide</a></p>
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-slate-400">help</span>
                            <span className="material-symbols-outlined text-slate-400">chat_bubble</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CreateProjectStep2;
