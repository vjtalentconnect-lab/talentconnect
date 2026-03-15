import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const PAYMENT_METHODS = ['Card', 'UPI'];

const formatCardNumber = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const formatExpiry = (val) =>
    val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/');

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const plan = location.state?.plan || { name: 'Pro Artist', price: 999, billing: 'monthly' };

    const [profile, setProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('Card');
    const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '', name: '' });
    const [upiId, setUpiId] = useState('');
    const [errors, setErrors] = useState({});
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        getMyProfile().then(res => setProfile(res.data)).catch(console.error);
    }, []);

    const validate = () => {
        const e = {};
        if (activeTab === 'Card') {
            if (cardForm.number.replace(/\s/g, '').length < 16) e.number = 'Enter a valid 16-digit card number';
            if (cardForm.expiry.length < 5) e.expiry = 'Enter a valid expiry (MM/YY)';
            if (cardForm.cvv.length < 3) e.cvv = 'CVV must be 3 digits';
            if (!cardForm.name.trim()) e.name = 'Cardholder name is required';
        } else {
            if (!upiId.includes('@')) e.upiId = 'Enter a valid UPI ID (e.g. name@upi)';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePay = async () => {
        if (!validate()) return;
        setPaying(true);
        await new Promise(r => setTimeout(r, 1800));
        setPaying(false);
        navigate('/talent/payment-success', {
            state: {
                plan: plan.name,
                price: plan.price,
                billing: plan.billing,
                orderId: '#TCA-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
            }
        });
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture,
    };

    const getCardBrand = () => {
        const n = cardForm.number.replace(/\s/g, '');
        if (n.startsWith('4')) return '💳 Visa';
        if (n.startsWith('5')) return '💳 Mastercard';
        if (n.startsWith('6')) return '💳 RuPay';
        return '💳';
    };

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData}
            headerTitle="Checkout" headerSubtitle={`Complete your ${plan.name} plan upgrade.`}>
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 pb-24">
                {/* Payment Form */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Tab Selector */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-2 flex gap-2 shadow-sm">
                        {PAYMENT_METHODS.map(tab => (
                            <button key={tab} onClick={() => { setActiveTab(tab); setErrors({}); }}
                                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                    activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                }`}>
                                <span className="material-symbols-outlined text-sm">{tab === 'Card' ? 'credit_card' : 'phone_android'}</span>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'Card' ? (
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
                            <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">credit_card</span> Card Details
                            </h3>
                            {/* Card number */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Card Number</label>
                                <div className="relative">
                                    <input
                                        type="text" inputMode="numeric"
                                        value={cardForm.number}
                                        onChange={e => setCardForm(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                                        placeholder="0000 0000 0000 0000"
                                        className={`w-full bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.number ? 'ring-2 ring-red-500' : ''}`}
                                    />
                                    {cardForm.number.length > 4 && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{getCardBrand()}</span>
                                    )}
                                </div>
                                {errors.number && <p className="text-red-500 text-xs font-bold mt-1">{errors.number}</p>}
                            </div>
                            {/* Expiry + CVV */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Expiry (MM/YY)</label>
                                    <input type="text" inputMode="numeric"
                                        value={cardForm.expiry}
                                        onChange={e => setCardForm(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                                        placeholder="MM/YY"
                                        className={`w-full bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.expiry ? 'ring-2 ring-red-500' : ''}`}
                                    />
                                    {errors.expiry && <p className="text-red-500 text-xs font-bold mt-1">{errors.expiry}</p>}
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">CVV</label>
                                    <input type="password" inputMode="numeric" maxLength={3}
                                        value={cardForm.cvv}
                                        onChange={e => setCardForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                                        placeholder="•••"
                                        className={`w-full bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.cvv ? 'ring-2 ring-red-500' : ''}`}
                                    />
                                    {errors.cvv && <p className="text-red-500 text-xs font-bold mt-1">{errors.cvv}</p>}
                                </div>
                            </div>
                            {/* Cardholder Name */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Name on Card</label>
                                <input type="text"
                                    value={cardForm.name}
                                    onChange={e => setCardForm(p => ({ ...p, name: e.target.value }))}
                                    placeholder="As printed on card"
                                    className={`w-full bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
                            <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">phone_android</span> UPI Payment
                            </h3>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">UPI ID</label>
                                <input type="text"
                                    value={upiId}
                                    onChange={e => { setUpiId(e.target.value); setErrors({}); }}
                                    placeholder="yourname@upi"
                                    className={`w-full bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.upiId ? 'ring-2 ring-red-500' : ''}`}
                                />
                                {errors.upiId && <p className="text-red-500 text-xs font-bold mt-1">{errors.upiId}</p>}
                            </div>
                            <div className="bg-slate-50 dark:bg-zinc-800 rounded-xl p-4 text-sm text-slate-500 font-medium border border-dashed border-slate-200 dark:border-zinc-700">
                                You will receive a UPI payment request on your registered mobile number.
                            </div>
                        </div>
                    )}

                    {/* Pay Button */}
                    <button onClick={handlePay} disabled={paying}
                        className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]">
                        {paying ? (
                            <><span className="material-symbols-outlined text-xl animate-spin">sync</span> Processing Payment...</>
                        ) : (
                            <><span className="material-symbols-outlined text-xl">lock</span> Pay ₹{plan.price?.toLocaleString()} Securely</>
                        )}
                    </button>
                    <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        🔒 256-bit SSL encrypted • PCI DSS compliant
                    </p>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6">
                        <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter">Order Summary</h3>
                        <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                            <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-white text-2xl">stars</span>
                            </div>
                            <div>
                                <p className="font-black dark:text-white uppercase italic tracking-tight">{plan.name}</p>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">{plan.billing === 'annual' ? 'Annual' : 'Monthly'} Subscription</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-zinc-800">
                            <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span><span>₹{plan.price?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-400">
                                <span>GST (18%)</span><span>₹{Math.round(plan.price * 0.18).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-base font-black dark:text-white pt-3 border-t border-slate-100 dark:border-zinc-800">
                                <span className="uppercase italic tracking-tight">Total</span>
                                <span className="text-primary">₹{Math.round(plan.price * 1.18).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            Cancel anytime. No hidden charges.
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Checkout;
