import React from 'react';
import { Link } from 'react-router-dom';

const ForumSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-background-dark/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm">group</span>
                            Community
                        </div>
                        <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                            Join the Conversation in our <br />
                            <span className="text-primary italic">Artist Forum</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            Connect with fellow artists, share audition experiences, and get advice from industry veterans. Our forum is the heartbeat of India's casting community.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-border-dark">
                                <div className="text-2xl font-bold text-primary mb-1">12k+</div>
                                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active Members</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-border-dark">
                                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Daily Topics</div>
                            </div>
                        </div>
                        <Link
                            to="/community"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                        >
                            Open Forum
                            <span className="material-symbols-outlined">forum</span>
                        </Link>
                    </div>
                    <div className="flex-1 w-full max-w-lg">
                        <div className="bg-slate-100 dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-border-dark shadow-xl scale-105">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg">Trending Now</h3>
                                <span className="text-primary material-symbols-outlined">trending_up</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "Tips for first Netflix India audition?", replies: "42", views: "1.2k" },
                                    { title: "Mumbai Casting Directors to avoid in 2024", replies: "156", views: "8.4k" },
                                    { title: "Transitioning from TV to OTT", replies: "28", views: "890" }
                                ].map((topic, i) => (
                                    <div key={topic.title} className={`p-4 rounded-xl transition-all hover:bg-white dark:hover:bg-background-dark cursor-pointer group`}>
                                        <p className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{topic.title}</p>
                                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                            <span>{topic.replies} Replies</span>
                                            <span>{topic.views} Views</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForumSection;
