import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';

const PLANS = [
    {
        key: 'basic',
        name: 'Basic',
        tagline: 'Start your journey',
        monthlyPrice: 0,
        annualPrice: 0,
        color: 'slate',
        icon: 'person',
        features: [
            { text: '3 applications per month', included: true },
            { text: 'Basic profile listing', included: true },
            { text: 'Limited search visibility', included: true },
            { text: 'Priority listing', included: false },
            { text: 'Direct studio contact', included: false },
            { text: 'Analytics dashboard', included: false },
        ],
        cta: 'Current Plan',
        recommended: false,
    },
    {
        key: 'pro',
        name: 'Pro Artist',
        tagline: 'Accelerate your career',
        monthlyPrice: 999,
        annualPrice: 799,
        color: 'primary',
        icon: 'stars',
        features: [
            { text: 'Unlimited applications', included: true },
            { text: 'Priority search listing', included: true },
            { text: 'Verified artist badge', included: true },
            { text: 'Direct studio messages', included: true },
            { text: 'Advanced analytics', included: true },
            { text: 'AI script preparation', included: false },
        ],
        cta: 'Upgrade to Pro',
        recommended: true,
    },
    {
        key: 'elite',
        name: 'Elite Talent',
        tagline: 'The full industry advantage',
        monthlyPrice: 2499,
        annualPrice: 1999,
        color: 'amber',
        icon: 'emoji_events',
        features: [
            { text: 'Everything in Pro', included: true },
            { text: 'AI script preparation', included: true },
            { text: 'Dedicated talent manager', included: true },
            { text: 'Exclusive casting calls', included: true },
            { text: 'Custom portfolio domain', included: true },
            { text: '24/7 priority support', included: true },
        ],
        cta: 'Go Elite',
        recommended: false,
    },
];

const UpgradePlan = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAnnual, setIsAnnual] = useState(false);
    const [upgradingKey, setUpgradingKey] = useState(null);

    useEffect(() => {
        getMyProfile().then(res => setProfile(res.data)).catch(console.error).finally(() => setLoading(false));
    }, []);

    const handleUpgrade = async (plan) => {
        if (plan.key === 'basic') return;
        setUpgradingKey(plan.key);
        await new Promise(r => setTimeout(r, 600));
        const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
        navigate('/talent/checkout', {
            state: { plan: plan.name, price, billing: isAnnual ? 'annual' : 'monthly' }
        });
        setUpgradingKey(null);
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture,
    };

    // Detect current plan from profile
    const currentPlanKey = profile?.subscriptionPlan || 'basic';

    if (loading) return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist"
            userData={{ name: '...', roleTitle: '...', avatar: '' }} headerTitle="Upgrade Plan">
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData}
            headerTitle="Upgrade Your Plan" headerSubtitle="Unlock features that put you at the top of every casting call."
            searchPlaceholder="Search plans...">
            <div className="space-y-12 pb-24 max-w-6xl mx-auto">
                {/* Header Banner */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-black uppercase tracking-widest border border-primary/20 mb-2">
                        <span className="material-symbols-outlined text-sm">star</span> Choose Your Plan
                    </div>
                    <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">
                        Invest in Your <span className="text-primary">Career</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-xl mx-auto">
                        Join thousands of artists who've landed their dream roles with TalentConnect Pro access.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <span className={`text-sm font-black uppercase tracking-widest transition-colors ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-14 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${isAnnual ? 'bg-primary' : 'bg-slate-200 dark:bg-zinc-700'}`}>
                            <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${isAnnual ? 'translate-x-7.5 left-0.5' : 'translate-x-0.5 left-0'}`}/>
                        </button>
                        <span className={`text-sm font-black uppercase tracking-widest transition-colors ${isAnnual ? 'text-primary' : 'text-slate-400'}`}>
                            Annual <span className="text-green-500 text-[10px] bg-green-500/10 px-2 py-0.5 rounded-full font-black border border-green-500/20">Save 20%</span>
                        </span>
                    </div>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan) => {
                        const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                        const originalPrice = plan.monthlyPrice;
                        const isCurrent = currentPlanKey === plan.key;
                        const isUpgrading = upgradingKey === plan.key;

                        return (
                            <div key={plan.key}
                                className={`relative rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300 ${
                                    plan.recommended
                                        ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105'
                                        : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-primary/30'
                                }`}>
                                {plan.recommended && (
                                    <div className="bg-white/10 text-white text-[10px] font-black py-3 text-center uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-xs">star</span> Recommended
                                    </div>
                                )}
                                {isCurrent && !plan.recommended && (
                                    <div className="bg-green-500/10 text-green-500 text-[10px] font-black py-3 text-center uppercase tracking-[0.3em]">
                                        ✓ Your Current Plan
                                    </div>
                                )}

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`size-12 rounded-2xl flex items-center justify-center ${plan.recommended ? 'bg-white/20' : 'bg-primary/10'}`}>
                                            <span className={`material-symbols-outlined text-2xl ${plan.recommended ? 'text-white' : 'text-primary'}`}>{plan.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className={`font-black text-lg uppercase italic tracking-tighter ${plan.recommended ? 'text-white' : 'dark:text-white'}`}>{plan.name}</h3>
                                            <p className={`text-[10px] font-bold ${plan.recommended ? 'text-white/70' : 'text-slate-500'}`}>{plan.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex items-end gap-2">
                                            <span className={`text-5xl font-black italic tracking-tighter ${plan.recommended ? 'text-white' : 'dark:text-white'}`}>
                                                {price === 0 ? 'Free' : `₹${price.toLocaleString()}`}
                                            </span>
                                            {price > 0 && (
                                                <span className={`text-sm font-bold mb-2 ${plan.recommended ? 'text-white/70' : 'text-slate-500'}`}>/mo</span>
                                            )}
                                        </div>
                                        {isAnnual && price > 0 && (
                                            <div className="flex items-center gap-2 mt-1">
                                                <s className={`text-sm font-bold ${plan.recommended ? 'text-white/50' : 'text-slate-400'}`}>₹{originalPrice}/mo</s>
                                                <span className="text-green-400 text-[10px] font-black bg-green-400/10 px-2 py-0.5 rounded-full">Save 20%</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3.5 flex-1 mb-8">
                                        {plan.features.map(({ text, included }) => (
                                            <div key={text} className="flex items-center gap-3">
                                                <span className={`material-symbols-outlined text-lg ${
                                                    included
                                                        ? plan.recommended ? 'text-white' : 'text-primary'
                                                        : plan.recommended ? 'text-white/30' : 'text-slate-300'
                                                }`}>{included ? 'check_circle' : 'cancel'}</span>
                                                <span className={`text-xs font-bold ${
                                                    included
                                                        ? plan.recommended ? 'text-white' : 'dark:text-slate-200'
                                                        : plan.recommended ? 'text-white/40 line-through' : 'text-slate-400 line-through'
                                                }`}>{text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleUpgrade(plan)}
                                        disabled={plan.key === 'basic' || isCurrent || isUpgrading}
                                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                            plan.recommended
                                                ? 'bg-white text-primary hover:bg-white/90 shadow-xl hover:scale-[1.02] active:scale-95'
                                                : isCurrent
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-default'
                                                    : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95'
                                        } disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100`}
                                    >
                                        {isUpgrading ? (
                                            <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Loading...</>
                                        ) : isCurrent ? (
                                            <><span className="material-symbols-outlined text-sm">check_circle</span> Active</>
                                        ) : (
                                            plan.cta
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Feature Comparison Note */}
                <div className="text-center">
                    <p className="text-slate-500 text-sm font-medium">All plans include a 7-day free trial. Cancel anytime.</p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">No hidden fees. Prices exclusive of GST.</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UpgradePlan;
