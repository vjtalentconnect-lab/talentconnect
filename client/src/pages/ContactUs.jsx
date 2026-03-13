import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Navigation */}
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-primary/20 px-6 md:px-20 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="size-8">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">TalentConnect</h2>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end gap-10 items-center">
                        <nav className="flex items-center gap-8">
                            <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium" to="/">Home</Link>
                            <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium" to="/dashboard/talent">Dashboard</Link>
                            <Link className="text-primary text-sm font-bold" to="/support">Support</Link>
                        </nav>
                        <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-xl h-10 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            Sign In
                        </button>
                    </div>
                </header>
                <main className="flex-grow flex flex-col items-center">
                    {/* Hero Section */}
                    <div className="w-full max-w-[1200px] px-6 py-10">
                        <div className="relative overflow-hidden rounded-3xl bg-slate-900 min-h-[320px] flex flex-col justify-end p-8 md:p-12 mb-12">
                            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAuUozo21O50WcgHKR5RnyT_2XP74vdMRekTrs-ctFraKNcPcFOjBSZJdS3k0t8CTXWOP6zSUeZchZlUsCoexu37cr3rfcqGrClBxEahcc4ziNf7Tb9D4fgZQ8-zHZIEsLcIQQCDrpy6VVt0qxCOcu7kmKlyv01Cye3TzQ8WyyuLfX8aaDNP6cqKxg1Zkfe706VOLVab5XH9yXKnamNx4c-gZJYBIiAUG_GtF8JwUi-RCLosKiUQl6-DJRE0go4Rf3oGRjIX2maRNFc")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
                            <div className="relative z-10 max-w-2xl">
                                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Reach the Spotlight</span>
                                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-4">Get in Touch</h1>
                                <p className="text-slate-300 text-lg md:text-xl font-normal max-w-lg">We're here to help you navigate your cinematic journey. Reach out to our dedicated talent and support teams.</p>
                            </div>
                        </div>
                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Contact Form Section */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-primary/10">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">mail</span>
                                        Send us a Message
                                    </h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Full Name</label>
                                                <input className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none" placeholder="e.g. Ranbir Kapoor" type="text" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Email Address</label>
                                                <input className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none" placeholder="contact@example.com" type="email" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Subject</label>
                                            <select className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none appearance-none">
                                                <option value="technical">Technical Support</option>
                                                <option value="billing">Billing & Payments</option>
                                                <option value="verification">Artist Verification</option>
                                                <option value="director">Director Account Inquiry</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Message</label>
                                            <textarea className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none resize-none" placeholder="Tell us how we can help..." rows="5"></textarea>
                                        </div>
                                        <button className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform" type="submit">
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                            {/* Sidebar / Contact Info */}
                            <div className="space-y-8">
                                {/* Office Address */}
                                <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl border border-primary/20">
                                    <h4 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
                                        <span className="material-symbols-outlined">location_on</span>
                                        Our Presence
                                    </h4>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Mumbai HQ</p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                Film City, Goregaon East,<br />
                                                Mumbai, Maharashtra 400065,<br />
                                                India
                                            </p>
                                        </div>
                                        <div className="pt-4 border-t border-primary/10">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Direct Email</p>
                                            <p className="text-primary text-sm font-medium">support@TalentConnect.in</p>
                                        </div>
                                        <div className="pt-4 border-t border-primary/10">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Helpline</p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">+91 22 4567 8900</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Map/Visual Element */}
                                <div className="rounded-3xl overflow-hidden h-48 bg-slate-200 relative">
                                    <img alt="Mumbai Cityscape" className="w-full h-full object-cover grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFX-AXPhkOzLgWY68n3rDfip1tyQEE2EtcdL7NQCfFnAAWzJOfuCRGpXTfRk2CFzK9tHiibTyUUrLqU1VJgQGnnm10nHubmNbBWdPW9LZSwZd3Mb4jhoKtUOA14kIRfx1_aQxDSq7ICwzWX1dD8THMjiaxmcuET1EK4j7_YkiMusbhiCibrSbSY-nK4_or19cod-O72PZNWOwag43arNLJv57m3e5EfQ44TssHhQbwG3-uNoFGUeeaGTRTMAZzw9Py9O21zPWA7f0p" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-primary p-3 rounded-full animate-pulse">
                                            <span className="material-symbols-outlined text-white">my_location</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Social Media */}
                                <div className="p-8">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Connect with us</h4>
                                    <div className="flex gap-4">
                                        <a className="size-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white transition-all" href="#">
                                            <span className="material-symbols-outlined">public</span>
                                        </a>
                                        <a className="size-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white transition-all" href="#">
                                            <span className="material-symbols-outlined">movie</span>
                                        </a>
                                        <a className="size-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white transition-all" href="#">
                                            <span className="material-symbols-outlined">alternate_email</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Footer */}
                <footer className="mt-auto border-t border-slate-200 dark:border-primary/20 py-10 px-6 md:px-20 bg-background-light dark:bg-background-dark">
                    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 opacity-60">
                            <div className="size-5 text-primary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">© 2026 TalentConnect. All Rights Reserved.</p>
                        </div>
                        <div className="flex gap-8">
                            <a className="text-xs text-slate-500 hover:text-primary" href="#">Privacy Policy</a>
                            <a className="text-xs text-slate-500 hover:text-primary" href="#">Terms of Service</a>
                            <a className="text-xs text-slate-500 hover:text-primary" href="#">Legal</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ContactUs;
