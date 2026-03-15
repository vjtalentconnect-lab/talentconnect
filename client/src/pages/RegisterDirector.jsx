import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterDirector = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    productionName: '',
    email: '',
    mobile: '',
    industryType: '',
    location: '',
    password: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        role: 'director',
        fullName: formData.fullName,
        companyName: formData.productionName,
      };

      const data = await register(userData);
      console.log('Director Registration successful:', data);
      navigate('/checkout/director');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side: Cinematic Visual */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-10"></div>
          <img
            alt="Cinematic film set with director's chair and lighting"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSmGtmAAW2971ysvBRRUCysxHnb4Ve7mxFFzaoxytav7_eoo-2ThA_-X59Mz47r5e7ACkTrxCCq2M7XbE4FATnvxXlSHQl17k3DnzuIbryJ6HGhS0ZfmfEK9WJXeX46sV0Yc20X7Jq38AdStng7O4vDZ-3sQMcju9RW5uCIR1F-hJIuejYdpbs6NzPT7Zd0Ad7B7EHTHFOa31at7SABR6TkbkGUsf1V1yZtWuI4Unkz39IH2FW2nC99bjMQ8FckVGd1iQZphKE69Im"
          />
          <div className="relative z-20 flex flex-col justify-end p-16 h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-1">
                <img src="/TC Logo.png" alt="Logo" className="h-12 w-auto" />
              </div>
              <h1 className="text-white text-3xl font-black tracking-tighter uppercase">TALENT<span className="text-primary">CONNECT</span></h1>
            </div>
            <h2 className="text-white text-5xl font-black leading-tight mb-4">Empowering Visionary <span className="text-primary">Storytellers</span></h2>
            <p className="text-slate-300 text-lg max-w-md">Connect with India's finest talent pool and bring your creative visions to life with our premium casting infrastructure.</p>
          </div>
        </div>

        {/* Right Side: Sign-Up Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32 bg-background-light dark:bg-background-dark overflow-y-auto">
          <div className="max-w-md w-full mx-auto lg:mx-0">
            {/* Mobile Branding */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <img src="/TC Logo.png" alt="Logo" className="h-8 w-auto" />
               <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">TALENT<span className="text-primary">CONNECT</span></h2>
            </div>

            <div className="mb-10">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Create Professional Account</h3>
              <p className="text-slate-600 dark:text-slate-400">Join the elite circle of Indian production houses and directors.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name / Contact Person</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Karan Johar"
                    type="text"
                  />
                </div>
              </div>

              {/* Production House Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Production House / Studio Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">apartment</span>
                  <input
                    name="productionName"
                    value={formData.productionName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Dharma Productions"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="contact@studio.com"
                      type="email"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">call</span>
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="+91 98XXX XXXXX"
                      type="tel"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Industry Type */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Industry Type</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">category</span>
                    <select
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="films">Feature Films</option>
                      <option value="advertising">Advertising</option>
                      <option value="web">Web Series</option>
                      <option value="theatre">Theatre</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Primary Location</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">location_on</span>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="City Name"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Create Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Min. 8 characters"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  id="terms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 rounded text-primary focus:ring-primary"
                />
                <label className="text-xs text-slate-600 dark:text-slate-400 leading-tight" htmlFor="terms">
                  By signing up, I agree to TalentConnect<a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
                </label>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              <button
                className={`w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading}
              >
                {loading ? 'SETTING UP THE STAGE...' : 'Create Professional Account'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Already have an account?
                <a className="text-primary font-bold hover:underline ml-1" href="/login">Log in here</a>
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">help</span> Support
              </button>
              <button className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">language</span> English
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDirector;