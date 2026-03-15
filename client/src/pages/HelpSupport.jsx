import React from 'react';
import { Link } from 'react-router-dom';

const HelpSupport = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-border-dark bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/TC Logo.png" alt="Logo" className="h-10 w-auto" />
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TALENT<span className="text-primary">CONNECT</span></h1>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/dashboard/talent">Dashboard</Link>
                            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/projects">Projects</Link>
                            <Link className="text-sm font-medium text-primary border-b-2 border-primary pb-1" to="/support">Support</Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-full transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 overflow-hidden">
                                <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZv4By_dLZSNr_W6qS87bOqFyVYuMn6Or5V8fgyUpNXXz3iSKl6GkyfE3fV6G8bK6eovlURoVkJmMsZ8ahTLErq6yc8Nyl-PCPpFv8A6erxwpfIVNoDpMCBY7yjrolg0-m9cLVowVEmOB_uT_BHNl1nAJ0LqsHM3Yaroe_gVPSNQnfrjsMPiKB7kJa9I6mbBdN3o8OVXQA0vS5m9J457mZae6EqV7tFTNKZDN5ALC3uIqRLmVwYCAW5YzopTlAkKT65pRSETlm76wO" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Search Section */}
                <section className="relative rounded-3xl overflow-hidden mb-16 h-80 flex flex-col items-center justify-center text-center px-4">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-background-dark/80 to-background-dark z-10"></div>
                        <img alt="Cinematic Support Background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByVUQqXCj3m8WNvIiHyp3lO_TdURVTs9VZPYHeyOZMLYrp_J8IF6uewZeOhFZZHgRTZUyL2meqBIHEm06TETcGT0ukAviRrOPXLDoOpYUgoOtO5RHinoiikd5ublW1N9Xqcoh1V_wVEnCgcR4KEjqaIAV_8OTadpgKaIHxAEAdeXglcf9qvqOubEu0TZdle2N2d27zNWjkd5lY958yXXFi3DLtsltm7wuIh6UWfs1x8pWxJ5WztwtdfycISk5_Rkf07mTujFCOrKg6" />
                    </div>
                    <div className="relative z-20 max-w-2xl w-full">
                        <h2 className="text-4xl font-bold text-white mb-6">How can we help your career today?</h2>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            <input className="w-full bg-white/10 dark:bg-surface-dark/80 backdrop-blur-md border border-white/20 dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-400 outline-none transition-all shadow-2xl" placeholder="Search for help articles, guides, and tutorials..." type="text" />
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-300">
                            <span>Popular:</span>
                            <a className="hover:text-primary underline underline-offset-4 decoration-primary/30" href="#">ID Verification</a>
                            <a className="hover:text-primary underline underline-offset-4 decoration-primary/30" href="#">Subscription Plans</a>
                            <a className="hover:text-primary underline underline-offset-4 decoration-primary/30" href="#">Submission Status</a>
                        </div>
                    </div>
                </section>

                {/* Category Grid */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold tracking-tight">Browse by Category</h3>
                        <a className="text-primary font-medium flex items-center gap-1 hover:underline" href="#">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Account & Profile */}
                        <div className="group p-6 rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined text-primary group-hover:text-white">account_circle</span>
                            </div>
                            <h4 className="text-lg font-bold mb-2">Account & Profile</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Manage your talent profile, showreels, and personal settings.</p>
                        </div>
                        {/* Casting & Projects */}
                        <div className="group p-6 rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                <img src="/TC Logo.png" alt="Logo" className="h-6 w-auto" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Casting & Projects</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Finding roles, applying to auditions, and managing submissions.</p>
                        </div>
                        {/* Payments & Subscriptions */}
                        <div className="group p-6 rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined text-primary group-hover:text-white">payments</span>
                            </div>
                            <h4 className="text-lg font-bold mb-2">Payments</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Invoices, Pro plans, billing cycles and refund policies.</p>
                        </div>
                        {/* Verification */}
                        <div className="group p-6 rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined text-primary group-hover:text-white">verified_user</span>
                            </div>
                            <h4 className="text-lg font-bold mb-2">Verification</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">ID verification, blue tick status, and security protocols.</p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* FAQ Section */}
                    <section className="lg:col-span-2">
                        <h3 className="text-2xl font-bold tracking-tight mb-8">Top Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">How do I verify my acting credits?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-border-dark/50">
                                    To verify acting credits, navigate to your profile settings and upload proof of work such as call sheets, IMDb links, or certificates from production houses. Our team reviews these within 48 hours.
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">What are the benefits of TalentConnect Pro?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-border-dark/50">
                                    TalentConnect Pro users get priority audition slots, unlimited showreel uploads, a verified blue tick, and direct messaging access to verified casting directors across major Indian production hubs.
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">How do I contact a casting director directly?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-border-dark/50">
                                    Direct contact is only possible if a Casting Director initiates interest in your profile or if you are an active Pro member applying to specific open calls that allow direct messaging.
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">Is my personal data secure on TalentConnect?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-border-dark/50">
                                    Yes, we use industry-standard encryption and strict privacy controls. You can choose which parts of your profile are visible to the public versus verified industry professionals.
                                </div>
                            </details>
                        </div>
                    </section>
                    {/* Support Options */}
                    <aside>
                        <h3 className="text-2xl font-bold tracking-tight mb-8">Direct Support</h3>
                        <div className="space-y-6">
                            <div className="p-8 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-[120px]">forum</span>
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-2">Live Chat</h4>
                                    <p className="text-white/80 text-sm mb-6">Talk to our support experts in real-time. Available 10 AM - 8 PM IST.</p>
                                    <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-lg">Start Conversation</button>
                                </div>
                            </div>
                            <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-background-dark flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Email Support</h4>
                                        <p className="text-xs text-slate-500">Response within 24 hours</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Have a complex query? Send us an email and our specialists will handle it.</p>
                                <Link className="block text-center w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all" to="/contact">Contact Us</Link>
                            </div>
                        </div>
                    </aside>
                </div>
                {/* Help Community Section */}
                <section className="mt-20 py-12 px-8 rounded-3xl bg-slate-100 dark:bg-surface-dark/40 border border-slate-200 dark:border-border-dark text-center">
                    <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">Join our community forum of actors and filmmakers to share experiences and get advice from peers.</p>
                    <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary/10">Visit Community Forum</button>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <img src="/TC Logo.png" alt="Logo" className="h-6 w-auto" />
                                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">TALENT<span className="text-primary">CONNECT</span></h1>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
                                India's premier digital talent marketplace connecting aspiring actors with the country's leading casting directors and production houses.
                            </p>
                            <div className="flex gap-4">
                                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">video_library</span></a>
                                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Platform</h5>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Talent Discovery</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Casting Tools</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Showreels</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Pro Membership</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Company</h5>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Press Kit</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Partners</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Legal</h5>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Safety Tips</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500">© 2026 TALENT<span className="text-primary">CONNECT</span>. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-1 text-xs text-slate-500"><span className="material-symbols-outlined text-sm">language</span> English (India)</span>
                            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">Made with <span className="material-symbols-outlined text-sm text-primary">favorite</span> for Indian Cinema</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HelpSupport;
