import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DirectorCheckout = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isSavingCard, setIsSavingCard] = useState(true);

    const handleBack = () => {
        navigate(-1);
    };

    const handleUpgrade = () => {
        // This would typically integrate with a payment gateway
        alert('Payment processing would happen here. Redirecting to dashboard...');
        navigate('/dashboard/director');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Main Container */}
            <div className="relative flex flex-col w-full min-h-screen">
                {/* Top Navigation */}
                <header className="flex items-center justify-between border-b border-border-dark px-6 md:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <img src="/TC Logo.png" alt="TALENTCONNECT Logo" className="h-10 w-auto" />
                        <h2 className="text-xl font-bold tracking-tight text-white">TALENT<span className="text-primary">CONNECT</span></h2>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">Secure Checkout</span>
                    </div>
                </header>

                <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-20 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Column: Plan & Payment */}
                        <div className="lg:col-span-7 space-y-10">
                            {/* Hero Section for Director */}
                            <section className="relative overflow-hidden rounded-xl aspect-[21/9] flex flex-col justify-end p-8 group">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                                    style={{ 
                                        backgroundImage: "linear-gradient(to top, rgba(24, 17, 18, 0.9), rgba(24, 17, 18, 0.2)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1F0wNw820XDT2e4wpYeTZ9tPzfso266NSJirvLH2HH03N2PQuxVtj-eex32usQzwKaOKkR9xqmoPsbdH-IhlyBhYNi1CekOBOD7_kt8F_nwBIeoRuh1gOnBhGrYcFUOJH6RfuDTjBiTWanT9VIZgQvWKo2oDOFB80RiUIACFV3tQ0o-sNriGrb2F5R3aJVdxIfcb874UaR2lNH5poqtWRGav539Rujkr8SAwHE2idxLBoM2BIxNBZqU29jkR19OLH483WY7G_kYvi')" 
                                    }}
                                ></div>
                                <div className="relative">
                                    <h1 className="text-3xl md:text-4xl font-black mb-2 text-white">Upgrade to Studio Pro</h1>
                                    <p className="text-slate-300 max-w-md text-sm md:text-base">The industry standard for professional production houses and casting directors across India.</p>
                                </div>
                            </section>

                            {/* Plan Benefits */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <h3 className="text-xl font-bold">Plan Benefits</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { icon: 'mail', title: 'Bulk Messaging', desc: 'Reach 1000+ talent instantly' },
                                        { icon: 'dashboard', title: 'Studio Dashboard', desc: 'Unified tracking for all projects' },
                                        { icon: 'support_agent', title: 'Account Manager', desc: 'Priority human support 24/7' },
                                        { icon: 'video_call', title: 'Unlimited Casting', desc: 'Post without any restrictions' }
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-surface-dark border border-border-dark">
                                            <span className="material-symbols-outlined text-primary">{benefit.icon}</span>
                                            <div>
                                                <p className="font-bold text-white">{benefit.title}</p>
                                                <p className="text-xs text-slate-300">{benefit.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Payment Methods Tabs */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">payments</span>
                                    <h3 className="text-xl font-bold">Payment Method</h3>
                                </div>
                                <div className="flex border-b border-border-dark">
                                    {[
                                        { id: 'card', label: 'Card', icon: 'credit_card' },
                                        { id: 'upi', label: 'UPI', icon: 'account_balance_wallet' },
                                        { id: 'netbanking', label: 'Net Banking', icon: 'account_balance' }
                                    ].map((method) => (
                                        <button 
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`px-6 py-3 border-b-2 font-bold flex items-center gap-2 transition-all ${paymentMethod === method.id ? 'border-primary text-primary' : 'border-transparent text-slate-300 hover:text-primary'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{method.icon}</span> {method.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Form Content */}
                                <div className="space-y-4 pt-4 min-h-[300px]">
                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4 animate-in fade-in duration-300">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Cardholder Name</label>
                                                <input className="w-full bg-surface-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary text-slate-100 p-3 outline-none" placeholder="John Doe" type="text" />
                                            </div>
                                            <div className="space-y-2 relative">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Card Number</label>
                                                <div className="relative">
                                                    <input className="w-full bg-surface-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary text-slate-100 p-3 pl-12 outline-none" placeholder="0000 0000 0000 0000" type="text" />
                                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Expiry Date</label>
                                                    <input className="w-full bg-surface-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary text-slate-100 p-3 outline-none" placeholder="MM / YY" type="text" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">CVV</label>
                                                    <input className="w-full bg-surface-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary text-slate-100 p-3 outline-none" placeholder="***" type="password" />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 pt-2">
                                                <input 
                                                    checked={isSavingCard} 
                                                    onChange={(e) => setIsSavingCard(e.target.checked)}
                                                    className="h-5 w-5 rounded border-border-dark bg-transparent text-primary focus:ring-0 cursor-pointer" 
                                                    type="checkbox" 
                                                />
                                                <label className="text-sm text-slate-300 cursor-pointer">Save this card for future faster payments</label>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div className="space-y-4 animate-in fade-in duration-300">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">UPI ID</label>
                                                <input className="w-full bg-surface-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary text-slate-100 p-3 outline-none" placeholder="username@upi" type="text" />
                                            </div>
                                            <p className="text-xs text-slate-400">A payment request will be sent to your UPI app.</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'netbanking' && (
                                        <div className="space-y-4 animate-in fade-in duration-300">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Your Bank</label>
                                                <select className="w-full bg-surface-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary text-slate-100 p-3 outline-none">
                                                    <option>State Bank of India</option>
                                                    <option>HDFC Bank</option>
                                                    <option>ICICI Bank</option>
                                                    <option>Axis Bank</option>
                                                    <option>Kotak Mahindra Bank</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24 space-y-6">
                                <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden shadow-2xl">
                                    <div className="p-6 border-b border-border-dark">
                                        <h3 className="text-lg font-bold text-white">Order Summary</h3>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-slate-100">Studio Pro Plan</p>
                                                <p className="text-xs text-slate-300">Monthly subscription</p>
                                            </div>
                                            <p className="font-bold text-white">₹4,999.00</p>
                                        </div>
                                        <div className="space-y-2 border-t border-border-dark pt-4">
                                            <div className="flex justify-between text-sm text-slate-300">
                                                <span>Subtotal</span>
                                                <span>₹4,999.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-slate-300">
                                                <span>GST (18%)</span>
                                                <span>₹899.82</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-border-dark pt-4 mt-4">
                                            <span className="text-xl font-bold text-white">Total Amount</span>
                                            <span className="text-2xl font-black text-primary">₹5,898.82</span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-background-dark/50">
                                        <button 
                                            onClick={handleUpgrade}
                                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                                        >
                                            <span className="material-symbols-outlined">lock</span>
                                            Authorize & Upgrade
                                        </button>
                                        <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed uppercase tracking-widest">
                                            By clicking Authorize, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap items-center justify-center gap-6 py-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xl text-primary">verified_user</span>
                                        <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-300">SSL Secure</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xl text-primary">gpp_good</span>
                                        <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-300">PCI-DSS Compliant</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xl text-primary">security</span>
                                        <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-300">Encrypted</span>
                                    </div>
                                </div>

                                {/* Contact Support */}
                                <div className="p-6 rounded-xl border border-dashed border-border-dark text-center space-y-2">
                                    <p className="text-xs text-slate-300">Need help with your enterprise setup?</p>
                                    <a className="text-sm font-bold text-primary hover:underline" href="#">Contact Sales for Custom Pricing</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Simple Footer */}
                <footer className="px-6 md:px-20 py-8 border-t border-border-dark bg-background-dark text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400">© 2026 TALENTCONNECT. All rights reserved.</p>
                    <div className="flex gap-6 text-xs font-semibold">
                        <a className="hover:text-primary text-slate-400" href="#">Privacy</a>
                        <a className="hover:text-primary text-slate-400" href="#">Terms</a>
                        <a className="hover:text-primary text-slate-400" href="#">Refund Policy</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default DirectorCheckout;
