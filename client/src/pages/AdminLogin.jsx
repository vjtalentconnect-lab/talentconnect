import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        adminId: '',
        password: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            otpRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const otpString = otp.join('');
        if (otpString.length < 6) {
            setError('Please enter the 6-digit security code');
            setLoading(false);
            return;
        }

        if (otpString !== '151105') {
            setError('Invalid security code. Access denied.');
            setLoading(false);
            return;
        }

        try {
            // Using email as the field name expected by the backend auth service
            const data = await login(formData.adminId, formData.password);
            
            if (data.user.role !== 'admin') {
                setError('Access denied. This terminal is restricted to administrative personnel.');
                // Optionally clear token if the service saved it
                localStorage.removeItem('token');
                setLoading(false);
                return;
            }

            console.log('Admin login successful');
            navigate('/dashboard/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Check your security clearance.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen selection:bg-primary/30">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-20 border-b border-primary/10">
                        <div className="flex items-center gap-2">
                            <img alt="TalentConnect Logo" className="h-10 w-auto" src="/TC Logo.png" />
                            <span className="text-xl font-extrabold tracking-tight text-white">TALENT<span className="text-primary">CONNECT</span></span>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors flex items-center gap-1" href="#">
                                <span className="material-symbols-outlined text-sm">monitor_heart</span>
                                System Status
                            </a>
                            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors flex items-center gap-1" href="#">
                                <span className="material-symbols-outlined text-sm">support_agent</span>
                                Emergency Admin Support
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-center py-10 px-4 md:px-0">
                        <div className="layout-content-container flex flex-col max-w-[1000px] w-full flex-1 gap-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                                {/* Left Visual */}
                                <div className="relative rounded-xl overflow-hidden min-h-[400px] lg:min-h-full border border-primary/20 group">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                                         style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEoHWeJyvj7FdmrNV7Msqtr6ImJQ_maHY-PblxQXOe2pv91QZETx6jbdMw6mmAA3Ts_fl9F3A8PFUWZ4gtFyAjcPk11KscgcnO13ZCj5KQyzRMvHcBD8521i_NmkUHCrLtjID2GVDuTAQ5oLMyb50l7iLSKprbxf30CODv3MdYo1XgsjvqbysAFSH4KuAlvLItYned0F-LiP_8ojKoYg_QQngSGtPJ2j_7BKnxcvL7jY7ptPHcFspgFAgKQ_V7kih7KwzhV71RWB3U')" }}>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                                            Secure Terminal
                                        </div>
                                        <h2 className="text-3xl font-black text-white leading-tight mb-2">Centralized Command</h2>
                                        <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                                            Unauthorized access to this system is strictly prohibited. All sessions are logged and monitored by corporate security.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Form */}
                                <div className="flex flex-col bg-slate-900/40 backdrop-blur-md p-8 lg:p-12 rounded-xl border border-white/5 shadow-2xl">
                                    <div className="mb-8">
                                        <h1 className="text-white text-3xl font-bold leading-tight tracking-tight">Admin Authentication</h1>
                                        <p className="text-slate-400 text-base mt-2">Enter your secure credentials to proceed.</p>
                                    </div>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Admin ID / Email */}
                                        <div className="flex flex-col">
                                            <label className="text-slate-300 text-sm font-semibold mb-2 ml-1">Admin ID / Email</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">badge</span>
                                                <input 
                                                    name="adminId"
                                                    value={formData.adminId}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-12 pr-4 py-4 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-slate-500 outline-none transition-all" 
                                                    placeholder="ADM-000-0000" 
                                                    type="text"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="flex flex-col">
                                            <label className="text-slate-300 text-sm font-semibold mb-2 ml-1">Secure Password</label>
                                            <div className="flex w-full items-stretch relative">
                                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock</span>
                                                <input 
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-12 pr-12 py-4 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-slate-500 outline-none transition-all" 
                                                    placeholder="••••••••••••" 
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                                >
                                                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 2FA Section */}
                                        <div className="pt-4 pb-2">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-[1px] grow bg-slate-700"></div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enhanced Security</span>
                                                <div className="h-[1px] grow bg-slate-700"></div>
                                            </div>
                                            <div className="flex flex-col bg-primary/5 border border-primary/20 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-white text-sm font-bold flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                                                        Two-Factor Auth (2FA)
                                                    </p>
                                                    <span className="text-[10px] text-primary/80 font-mono">REQUIRED</span>
                                                </div>
                                                <div className="grid grid-cols-6 gap-2">
                                                    {otp.map((digit, idx) => (
                                                        <input 
                                                            key={idx}
                                                            ref={otpRefs[idx]}
                                                            value={digit}
                                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(idx, e)}
                                                            className="w-full aspect-square text-center font-bold text-lg bg-slate-800 border border-slate-700 rounded text-white focus:border-primary focus:ring-0 transition-colors" 
                                                            maxLength="1" 
                                                            type="text"
                                                            required
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-xs">
                                                {error}
                                            </div>
                                        )}

                                        <button 
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'AUTHORIZING...' : 'Authorize Access'}
                                            {!loading && <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">login</span>}
                                        </button>

                                        <div className="flex justify-between items-center text-xs text-slate-500 pt-4">
                                            <Link className="hover:text-primary underline decoration-primary/30" to="#">Forgot Admin Credentials?</Link>
                                            <span>v4.8.2-SECURE</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Badges */}
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 py-8 border-t border-primary/10">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">shield</span>
                            <span className="text-xs font-medium text-slate-400">AES-256 Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">history</span>
                            <span className="text-xs font-medium text-slate-400">Real-time Audit Trail</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">fingerprint</span>
                            <span className="text-xs font-medium text-slate-400">Multi-Factor Compliant</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 px-10 text-center md:text-left border-t border-white/5">
                        <div className="flex items-center gap-6">
                            <a className="text-xs font-medium text-slate-400 hover:text-primary" href="#">System Status</a>
                            <a className="text-xs font-medium text-slate-400 hover:text-primary" href="#">Emergency Support</a>
                        </div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                            © 2026 TalentConnect Global Operations. Restricted Access.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
