import React from 'react';
import { Link } from 'react-router-dom';

const UpgradePlan = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen w-full flex flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-primary/20 px-6 py-4 lg:px-20 bg-white dark:bg-background-dark">
                    <div className="flex items-center gap-4">
                        <div className="text-primary size-8">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-tight uppercase">TalentConnect</h2>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end gap-10">
                        <nav className="flex items-center gap-8">
                            <Link className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" to="/dashboard/talent">Dashboard</Link>
                            <Link className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" to="/talent/applied-projects">Projects</Link>
                            <Link className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" to="/talent/audition-invites">Auditions</Link>
                            <Link className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" to="/talent/portfolio">Profile</Link>
                            <Link className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" to="/talent/analytics">Analytics</Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary hover:bg-primary/20 transition-all">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="size-10 rounded-full border-2 border-primary bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDIMav_i0x_g_NMSoHwJ5oFZZtB1OWbkBrZdwrlr-3n2zYAScC9zEPvDZnar_tx45RirdUzVeKdnhQOT7LLdammHDDu34yZju-9phXi3BVhbgbOJcWYrFWTMtNCycMLP_jmm-LRnZY6ToN2jG7o6Dx2vgV2pH2lXwXyuiqPzIiVkJvYa8TCWrzSGsU9hSNl3gMw1PPSSNaUqRI1ns3AIS6xMbkfT7cAsQusMig_kWJIL7WIQfXzICIE2IUe99aztKga7-STQTGeGrYl')" }}></div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 px-6 py-12 lg:px-20 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col items-center text-center gap-4 mb-12">
                        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Premium Plans</span>
                        <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight leading-tight">Choose Your Cinematic Future</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Unlock premium tools, priority discovery, and AI insights to accelerate your journey in the Indian film industry.</p>
                    </div>

                    {/* Billing Toggle (UI Only) */}
                    <div className="flex justify-center mb-12">
                        <div className="flex h-12 w-80 items-center justify-center rounded-xl bg-slate-200 dark:bg-primary/5 p-1 border border-slate-300 dark:border-primary/20">
                            <button className="flex h-full grow items-center justify-center rounded-lg px-2 bg-primary text-white text-sm font-bold transition-all">Monthly</button>
                            <button className="flex h-full grow items-center justify-center rounded-lg px-2 text-slate-600 dark:text-slate-400 text-sm font-bold transition-all">Annual (Save 20%)</button>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Basic Plan */}
                        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-primary/10 bg-white dark:bg-background-dark/50 p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold uppercase tracking-wider">Basic</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">For newcomers starting their journey.</p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-slate-900 dark:text-white text-5xl font-black tracking-tighter">₹0</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-lg font-medium">/mo</span>
                                </div>
                            </div>
                            <button className="w-full flex items-center justify-center rounded-xl h-12 px-6 border-2 border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors">
                                Current Plan
                            </button>
                            <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 dark:border-primary/5">
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Standard Artist Profile
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    3 Audition Requests/mo
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Basic Portfolio Hosting
                                </div>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="relative flex flex-col gap-6 rounded-2xl border-2 border-primary bg-white dark:bg-primary/5 p-8 shadow-xl shadow-primary/10 md:-translate-y-4">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                Most Popular
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold uppercase tracking-wider">Pro</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Everything needed for rising stars.</p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-slate-900 dark:text-white text-5xl font-black tracking-tighter">₹999</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-lg font-medium">/mo</span>
                                </div>
                            </div>
                            <Link className="w-full flex items-center justify-center rounded-xl h-12 px-6 bg-primary text-white font-black shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform hover:scale-[1.02]" to="/talent/checkout">
                                Upgrade to Pro
                            </Link>
                            <div className="flex flex-col gap-4 pt-4 border-t border-primary/20">
                                <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    Priority Profile Placement
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    Unlimited Audition Requests
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    Advanced Portfolio Analytics
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    AI-Powered Casting Suggestions
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    Featured Talent Badge
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-primary/10 bg-white dark:bg-background-dark/50 p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold uppercase tracking-wider">Studio</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">For Directors and Production Houses.</p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-slate-900 dark:text-white text-4xl font-black tracking-tighter italic">Custom</span>
                                </div>
                            </div>
                            <button className="w-full flex items-center justify-center rounded-xl h-12 px-6 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-background-dark transition-all">
                                Contact Sales
                            </button>
                            <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 dark:border-primary/5">
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Bulk Messaging (Direct cast)
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Studio Dashboard & Projects
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Dedicated Account Manager
                                </div>
                                <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Unlimited Casting Calls
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mt-20 flex flex-col items-center text-center gap-4">
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black uppercase tracking-tight leading-tight">Compare Features</h2>
                        <p className="text-slate-500 dark:text-slate-400">Everything you need to know about our cinematic toolset.</p>
                    </div>

                    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-primary/10 bg-white dark:bg-background-dark/50 overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-primary/5">
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-400">Features</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Basic</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-primary">Pro</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Studio</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-primary/5">
                                <tr>
                                    <td className="p-6 text-slate-700 dark:text-slate-300 font-medium">Profile Visibility</td>
                                    <td className="p-6 text-slate-500">Standard</td>
                                    <td className="p-6 font-bold text-primary">Priority Top 10%</td>
                                    <td className="p-6 text-slate-500">Premium</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-slate-700 dark:text-slate-300 font-medium">Audition Requests</td>
                                    <td className="p-6 text-slate-500">3 per month</td>
                                    <td className="p-6 font-bold text-primary">Unlimited</td>
                                    <td className="p-6 text-slate-500">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-slate-700 dark:text-slate-300 font-medium">AI Casting Tools</td>
                                    <td className="p-6 text-slate-500">—</td>
                                    <td className="p-6 text-primary"><span className="material-symbols-outlined">check</span></td>
                                    <td className="p-6 text-slate-900 dark:text-white font-bold">Advanced suite</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-slate-700 dark:text-slate-300 font-medium">Direct Messaging</td>
                                    <td className="p-6 text-slate-500">—</td>
                                    <td className="p-6 text-primary"><span className="material-symbols-outlined">check</span></td>
                                    <td className="p-6 text-slate-900 dark:text-white font-bold">Bulk Broadcast</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>

                <footer className="mt-20 border-t border-slate-200 dark:border-primary/20 px-6 py-12 lg:px-20 bg-white dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="text-primary size-6">
                                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
                                </svg>
                            </div>
                            <span className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm">TalentConnect</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">© 2026 TalentConnect. Empowering the next generation of Indian cinema.</p>
                        <div className="flex gap-6">
                            <a className="text-slate-400 hover:text-primary" href="#"><span className="material-symbols-outlined">public</span></a>
                            <a className="text-slate-400 hover:text-primary" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                            <a className="text-slate-400 hover:text-primary" href="#"><span className="material-symbols-outlined">play_circle</span></a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default UpgradePlan;
