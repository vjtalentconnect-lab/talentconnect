import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProjectStep1 = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/director/create-project/step2');
    };

    const handleClose = () => {
        navigate('/dashboard/director');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-primary/20 px-6 py-4 lg:px-20 bg-background-light dark:bg-background-dark sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="text-primary">
                            <span className="material-symbols-outlined text-3xl">movie_filter</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Create New Project</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                            Save Draft
                        </button>
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center rounded-full p-2 bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-primary hover:bg-primary/20 transition-all"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center py-8 px-4 lg:py-12">
                    <div className="w-full max-w-2xl">
                        <div className="mb-10">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold text-primary">Step 1 of 3: Project Essentials</span>
                                <span className="text-sm text-slate-500">35% Complete</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '35%' }}></div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">Tell us about your next masterpiece</h1>
                                <p className="text-slate-600 dark:text-slate-400">Fill in the core details to start your scouting process on StarCast India.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="project-title">Project Title</label>
                                    <input
                                        className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-white dark:bg-background-dark/50 p-4 text-lg focus:border-primary focus:ring-primary dark:text-white outline-none"
                                        id="project-title"
                                        placeholder="e.g. The Monsoon Wedding"
                                        type="text"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="industry-type">Industry Type</label>
                                        <select
                                            className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-white dark:bg-background-dark/50 p-4 focus:border-primary focus:ring-primary dark:text-white outline-none appearance-none"
                                            id="industry-type"
                                            required
                                            defaultValue=""
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ec5b13' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.5em 1.5em'
                                            }}
                                        >
                                            <option disabled value="">Select Category</option>
                                            <option value="film">Feature Film</option>
                                            <option value="commercial">Commercial/AD</option>
                                            <option value="web">Web Series</option>
                                            <option value="short">Short Film</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="budget">Estimated Budget</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                            <input
                                                className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-white dark:bg-background-dark/50 p-4 pl-8 focus:border-primary focus:ring-primary dark:text-white outline-none"
                                                id="budget"
                                                placeholder="Budget in INR"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="production-house">Production House</label>
                                    <input
                                        className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-white dark:bg-background-dark/50 p-4 focus:border-primary focus:ring-primary dark:text-white outline-none"
                                        id="production-house"
                                        placeholder="Enter Production Company Name"
                                        type="text"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="description">Project Description</label>
                                    <textarea
                                        className="w-full rounded-xl border-slate-200 dark:border-primary/20 bg-white dark:bg-background-dark/50 p-4 focus:border-primary focus:ring-primary dark:text-white resize-none outline-none"
                                        id="description"
                                        placeholder="Share a brief overview of the plot, vision, and scale of the project..."
                                        rows="5"
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-primary/10">
                                    <button
                                        onClick={() => navigate('/dashboard/director')}
                                        className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span>
                                        Back
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(236,91,19,0.4)] transition-all transform hover:-translate-y-1"
                                        type="submit"
                                    >
                                        Continue to Cast
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>

                <aside className="hidden xl:flex fixed right-10 bottom-10 w-64 flex-col gap-4">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-primary mb-2">lightbulb</span>
                        <h4 className="font-bold text-sm mb-1">Director's Tip</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            Clear project descriptions attract 40% more high-quality talent matches. Be specific about the visual tone.
                        </p>
                    </div>
                    <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                        <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt="Cinematic production camera on a movie set"
                            src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCMSD9oKGDAdqCicyvYyXcK3rQ3RSbPaz9vrlyo1l3lHnui2sQlPhI-umPfPahGg8ea6f8FgE8dmGFvH0D9RRbrOPXzBXsbrGiUTx5W-x5LC206jz4KP0AEOCKUxk4A3JdDCWkpKQaBUOF_ZUq6AEQ4JpjumFD16flG5ABydPivLR_cqpk5i3y07iZTubN109N5KQGSO7GP9-BaC3K99pl_C8lOoVshKbxvNoQZLE6OyPiZfm35LzrrUqTxnVVjDbwAaK2ZmwE1M1rD`}
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                            <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Featured Production</p>
                            <p className="text-white text-xs font-medium">Bollywood Nights (2024)</p>
                        </div>
                    </div>
                </aside>

                <footer className="py-6 px-10 text-center text-slate-400 text-xs border-t border-slate-200 dark:border-primary/10 mt-auto">
                    &copy; 2024 StarCast India &bull; Premiere Casting for the Indian Film Industry
                </footer>
            </div>
        </div>
    );
};

export default CreateProjectStep1;
