import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationIntro from './VerificationIntro';
import VerificationStep1 from './VerificationStep1';
import VerificationStep2 from './VerificationStep2';
import VerificationStep3 from './VerificationStep3';
import VerificationStatus from './VerificationStatus';
import VerificationSuccess from './VerificationSuccess';
import { updateProfile, uploadMedia, submitForVerification } from '../../services/profileService';

const ProfileVerification = ({ defaultValue = 0 }) => {
    const [currentStep, setCurrentStep] = useState(defaultValue);
    const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [savedAt, setSavedAt] = useState(null);
    const navigate = useNavigate();

    // Centralized form data for all steps
    const [formData, setFormData] = useState({
        // Step 1
        idType: 'aadhar',
        idFile: null,
        // Step 2
        imdbLink: '',
        wikipediaLink: '',
        showreelLink: '',
        websiteLink: '',
        associationName: 'cintaa',
        membershipId: '',
        membershipCard: null,
        awards: [{ id: Date.now(), name: '', year: '', organization: '' }],
        // Step 3
        videoBlob: null,
        videoRecorded: false,
    });

    const goToStep = (targetStep, dir = 'forward') => {
        if (isAnimating) return;
        setDirection(dir);
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentStep(targetStep);
            setIsAnimating(false);
        }, 350);
    };

    const handleNext = () => goToStep(currentStep + 1, 'forward');
    const handlePrev = () => goToStep(currentStep - 1, 'backward');

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // 1. Upload Files if present
            if (formData.idFile && formData.idFile instanceof File) {
                const idData = new FormData();
                idData.append('media', formData.idFile);
                idData.append('type', 'idFile');
                idData.append('idType', formData.idType);
                await uploadMedia(idData);
            }

            if (formData.membershipCard && formData.membershipCard instanceof File) {
                const memData = new FormData();
                memData.append('media', formData.membershipCard);
                memData.append('type', 'membershipCard');
                memData.append('membershipId', formData.membershipId);
                memData.append('associationName', formData.associationName);
                await uploadMedia(memData);
            }

            // 2. Update Profile Links and Awards
            const profileUpdate = {
                verificationState: {
                    imdbUrl: formData.imdbLink,
                    wikipediaUrl: formData.wikipediaLink,
                    showreelUrl: formData.showreelLink,
                    websiteUrl: formData.websiteLink,
                    membershipId: formData.membershipId,
                    associationName: formData.associationName,
                }
            };
            await updateProfile(profileUpdate);

            setSavedAt(new Date().toLocaleTimeString());
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to save progress. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFinish = async () => {
        setIsSaving(true);
        try {
            // Upload Video Selfie
            if (formData.videoBlob) {
                const videoData = new FormData();
                const blob = formData.videoBlob instanceof Blob
                    ? formData.videoBlob
                    : new Blob([formData.videoBlob], { type: 'video/webm' });
                videoData.append('media', blob, 'verification-video.webm');
                videoData.append('type', 'videoSelfie');
                await uploadMedia(videoData);
            } else {
                throw new Error('Please record a short video selfie before submitting.');
            }

            // Final sync
            await handleSave();

            // Mark user as submitted for verification (pending review)
            await submitForVerification();
            
            goToStep(4, 'forward');
        } catch (err) {
            console.error('Finish failed:', err);
            const msg = err?.response?.data?.message || err?.message || 'Failed to complete verification. Please try again.';
            alert(msg);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDashboard = () => navigate('/dashboard/talent');

    const updateFormData = (fields) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    // Step in progress indicator
    const stepLabels = ['Intro', 'Identity', 'Credentials', 'Video', 'Status'];

    const renderStep = () => {
        const props = { formData, updateFormData, onSave: handleSave, isSaving };
        switch (currentStep) {
            case 0: return <VerificationIntro onStart={handleNext} />;
            case 1: return <VerificationStep1 {...props} onNext={handleNext} />;
            case 2: return <VerificationStep2 {...props} onNext={handleNext} onPrev={handlePrev} />;
            case 3: return <VerificationStep3 {...props} onFinish={handleFinish} />;
            case 4: return <VerificationStatus onReturn={handleDashboard} />;
            case 5: return <VerificationSuccess onDashboard={handleDashboard} />;
            default: return <VerificationIntro onStart={handleNext} />;
        }
    };

    const animClass = isAnimating
        ? direction === 'forward'
            ? 'opacity-0 translate-x-8'
            : 'opacity-0 -translate-x-8'
        : 'opacity-100 translate-x-0';

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
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight uppercase italic">TALENT<span className="text-primary">CONNECT</span></h2>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Save status badge */}
                            {savedAt && (
                                <span className="hidden sm:flex items-center gap-1.5 text-xs text-green-500 font-medium animate-fade-in">
                                    <span className="material-symbols-outlined !text-sm">cloud_done</span>
                                    Saved at {savedAt}
                                </span>
                            )}
                            {/* Step indicator dots for steps 1–3 */}
                            {currentStep >= 1 && currentStep <= 3 && (
                                <div className="hidden md:flex items-center gap-2">
                                    {[1, 2, 3].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => s < currentStep && goToStep(s, 'backward')}
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                s === currentStep
                                                    ? 'w-6 bg-primary'
                                                    : s < currentStep
                                                    ? 'w-2 bg-primary/60 cursor-pointer hover:bg-primary'
                                                    : 'w-2 bg-slate-300 dark:bg-slate-700 cursor-default'
                                            }`}
                                            title={stepLabels[s]}
                                        />
                                    ))}
                                </div>
                            )}
                            <button
                                onClick={handleDashboard}
                                className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-200 dark:bg-primary/10 text-slate-900 dark:text-primary transition-colors hover:bg-primary/20 active:scale-95"
                            >
                                <span className="material-symbols-outlined font-bold">close</span>
                            </button>
                        </div>
                    </header>

                    <main className="flex-1 flex flex-col items-center py-10 px-6">
                        <div
                            className={`w-full flex justify-center transition-all duration-350 ease-in-out ${animClass}`}
                        >
                            {renderStep()}
                        </div>
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
