import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterActor = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        category: '',
        location: '',
        password: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Actor Registration Data:', formData);
        // After successful registration, redirect to verification
        navigate('/talent/verify');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden">
            {/* Main Layout Container */}
            <div className="layout-container flex h-full grow flex-col">
                {/* Navbar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 lg:px-40 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="size-6">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">TalentConnect</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Already have an account?</span>
                        <Link className="text-primary font-semibold hover:underline text-sm" to="/login">Login</Link>
                    </div>
                </header>

                <main className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
                    {/* Left Side: Visual/Hero */}
                    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background-dark">
                        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background-dark/80 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJnOSJE6lp5W9JbtKPEmrMjyCYkH6tDGmXEugA6lyB7E4q5Kv075szZr3MoMC30t89OXIVs3s7s-o70GolgBKOw4YIkY8i81v_z5BI2IxDSIPsyxONs23TzwramPAiqONe-mBDWtGCyNoGap15eSsC0U_Z1dE93eRkoRbOGK9k2SN7eeP3IeGDhUp4Fwo8JXzODdcvCzejn4Zvoc4KjqU_4WdsMU7m1HtP51sRfQP8SFJR2nipQFR-StYChbP3TAnukPINHSEpBAfH')" }}></div>

                        <div className="absolute bottom-20 left-20 z-20 max-w-lg">
                            <h1 className="text-white text-6xl font-black leading-tight tracking-tight mb-4">Your Stage <br /><span className="text-primary">Awaits.</span></h1>
                            <p className="text-slate-300 text-lg">Join the premier platform for professional artists across India. Get verified and start auditioning for the biggest banners in Bollywood and OTT.</p>

                            <div className="mt-12 flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-primary text-2xl font-bold">500+</span>
                                    <span className="text-slate-400 text-sm">Casting Agencies</span>
                                </div>
                                <div className="w-px h-10 bg-slate-700"></div>
                                <div className="flex flex-col">
                                    <span className="text-primary text-2xl font-bold">10k+</span>
                                    <span className="text-slate-400 text-sm">Monthly Roles</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sign-Up Form */}
                    <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-background-light dark:bg-background-dark">
                        <div className="w-full max-w-lg space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Join the Spotlight</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-base">Create your professional artist profile and get discovered by top production houses.</p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                                {/* Full Name */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">person</span>
                                        Full Name
                                    </label>
                                    <input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="e.g. Ranbir Kapoor"
                                        type="text"
                                    />
                                </div>

                                {/* Email */}
                                <div className="md:col-span-1 space-y-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">mail</span>
                                        Email Address
                                    </label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="name@example.com"
                                        type="email"
                                    />
                                </div>

                                {/* Mobile */}
                                <div className="md:col-span-1 space-y-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                        Mobile Number
                                    </label>
                                    <input
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="+91 98765 43210"
                                        type="tel"
                                    />
                                </div>

                                {/* Category */}
                                <div className="md:col-span-1 space-y-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">theater_comedy</span>
                                        Artist Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="actor">Actor</option>
                                        <option value="model">Model</option>
                                        <option value="singer">Singer</option>
                                        <option value="dancer">Dancer</option>
                                        <option value="voiceover">Voiceover Artist</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div className="md:col-span-1 space-y-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                        Primary Location
                                    </label>
                                    <select
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select City</option>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="delhi">Delhi / NCR</option>
                                        <option value="bengaluru">Bengaluru</option>
                                        <option value="hyderabad">Hyderabad</option>
                                        <option value="chennai">Chennai</option>
                                    </select>
                                </div>

                                {/* Password */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">lock</span>
                                        Create Password
                                    </label>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="Min. 8 characters"
                                        type="password"
                                    />
                                </div>

                                {/* Submit */}
                                <div className="md:col-span-2 pt-4">
                                    <button
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                        type="submit"
                                    >
                                        <span>Sign Up Now</span>
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>

                                <div className="md:col-span-2 flex items-start gap-3 pt-2">
                                    <input
                                        id="terms"
                                        name="agreeTerms"
                                        type="checkbox"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                                    />
                                    <label className="text-xs text-slate-500 dark:text-slate-400" htmlFor="terms">
                                        By signing up, you agree to our <Link className="text-primary underline" to="#">Terms of Service</Link> and <Link className="text-primary underline" to="#">Privacy Policy</Link>.
                                    </label>
                                </div>
                            </form>

                            {/* Mobile-only login link */}
                            <div className="lg:hidden text-center pt-6">
                                <p className="text-slate-600 dark:text-slate-400">Already have an account? <Link className="text-primary font-bold" to="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Small */}
                <footer className="px-6 lg:px-40 py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                    <p>© 2026 TalentConnect. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <Link className="hover:text-primary transition-colors" to="#">Help Center</Link>
                        <Link className="hover:text-primary transition-colors" to="#">Artist Guidelines</Link>
                        <Link className="hover:text-primary transition-colors" to="#">Success Stories</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default RegisterActor;
