import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationIntro from './VerificationIntro';
import VerificationStep1 from './VerificationStep1';
import VerificationStep2 from './VerificationStep2';
import VerificationStep3 from './VerificationStep3';
import VerificationStatus from './VerificationStatus';
import VerificationSuccess from './VerificationSuccess';

const ProfileVerification = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handlePrev = () => setCurrentStep(prev => prev - 1);
    const handleSave = () => console.log('Saving progress...');
    const handleDashboard = () => navigate('/dashboard/talent');

    // Special jump to success for demonstration if needed, 
    // but usually would go to status (Under Review)
    const handleFinish = () => setCurrentStep(4);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <VerificationIntro onStart={handleNext} />;
            case 1:
                return <VerificationStep1 onNext={handleNext} onSave={handleSave} />;
            case 2:
                return <VerificationStep2 onNext={handleNext} onPrev={handlePrev} onSave={handleSave} />;
            case 3:
                return <VerificationStep3 onFinish={handleFinish} onSave={handleSave} />;
            case 4:
                return <VerificationStatus onReturn={handleDashboard} />;
            case 5:
                return <VerificationSuccess onDashboard={handleDashboard} />;
            default:
                return <VerificationIntro onStart={handleNext} />;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}
                    <header className="flex items-center justify-between border-b border-primary/20 px-6 py-4 md:px-40 bg-background-light dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <img src="/TC Logo.png" alt="Logo" className="h-10 w-auto" />
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight uppercase italic">TalentConnect</h2>
                        </div>
                        <button onClick={handleDashboard} className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-200 dark:bg-primary/10 text-slate-900 dark:text-primary transition-colors hover:bg-primary/20">
                            <span className="material-symbols-outlined font-bold">close</span>
                        </button>
                    </header>
                    <main className="flex-1 flex flex-col items-center py-10 px-6">
                        {renderStep()}
                    </main>
                    {/* Footer Small */}
                    <footer className="py-10 text-center text-slate-500 text-sm">
                        © 2026 TalentConnect. All Rights Reserved.
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ProfileVerification;
