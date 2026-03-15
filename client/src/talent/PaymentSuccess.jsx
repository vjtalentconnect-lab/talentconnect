import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Lightweight CSS confetti  
const Confetti = () => {
    const COLORS = ['#e11d48', '#2563eb', '#f59e0b', '#10b981', '#8b5cf6', '#f97316'];
    const pieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        rotation: Math.random() * 360,
    }));
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {pieces.map(p => (
                <div key={p.id}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        left: `${p.left}%`,
                        width: '8px',
                        height: '14px',
                        background: p.color,
                        borderRadius: '2px',
                        transform: `rotate(${p.rotation}deg)`,
                        animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
                    }}
                />
            ))}
            <style>{`
                @keyframes confetti-fall {
                    0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0.2; }
                }
            `}</style>
        </div>
    );
};

const PaymentSuccess = () => {
    const location = useLocation();
    const order = location.state || { plan: 'Pro Artist', price: 999, billing: 'monthly', orderId: '#TCA-XYZ123' };
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'translateY(40px)';
            cardRef.current.style.opacity = '0';
            requestAnimationFrame(() => {
                cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease';
                cardRef.current.style.transform = 'translateY(0)';
                cardRef.current.style.opacity = '1';
            });
        }
    }, []);

    const handleViewReceipt = () => window.print();

    const PLAN_BENEFITS = [
        { icon: 'verified', label: 'Priority Listing', desc: 'Top 3% of search results' },
        { icon: 'send', label: 'Unlimited Applications', desc: 'No monthly cap' },
        { icon: 'contact_mail', label: 'Direct Contact', desc: 'From studios & casting directors' },
        { icon: 'analytics', label: 'Advanced Analytics', desc: 'Full profile performance data' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col items-center justify-start py-12 px-4 overflow-hidden">
            <Confetti />
            <div ref={cardRef} className="w-full max-w-2xl">
                {/* Success Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-primary to-primary/70 p-10 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}/>
                        <div className="relative z-10">
                            <div className="size-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                                <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
                            </div>
                            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Payment Successful!</h1>
                            <p className="text-white/80 font-bold text-lg">{order.plan} Plan is now active</p>
                            <div className="mt-4 inline-block bg-white/10 rounded-xl px-4 py-2 text-white/70 text-[10px] font-black uppercase tracking-widest">
                                Order ID: {order.orderId}
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-8 border-b border-slate-100 dark:border-zinc-800">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Plan</p>
                                <p className="font-black dark:text-white italic uppercase tracking-tight">{order.plan}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Amount Paid</p>
                                <p className="font-black text-primary italic text-xl">₹{order.price?.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Billing</p>
                                <p className="font-black dark:text-white italic uppercase tracking-tight">{order.billing === 'annual' ? 'Annual' : 'Monthly'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Plan Benefits */}
                    <div className="p-8 space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Your Pro Benefits are Active</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {PLAN_BENEFITS.map(({ icon, label, desc }) => (
                                <div key={label} className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                                    <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-lg">{icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black dark:text-white uppercase tracking-tight">{label}</p>
                                        <p className="text-[10px] text-slate-500 font-bold italic mt-0.5">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-8 pt-0 flex flex-col sm:flex-row gap-4">
                        <Link to="/talent/dashboard"
                            className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95">
                            <span className="material-symbols-outlined text-sm">dashboard</span> Go to Dashboard
                        </Link>
                        <button onClick={handleViewReceipt}
                            className="flex-1 py-4 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-200 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all">
                            <span className="material-symbols-outlined text-sm">receipt_long</span> View Receipt
                        </button>
                    </div>
                </div>
                <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-6">
                    A confirmation email has been sent to your registered address.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
