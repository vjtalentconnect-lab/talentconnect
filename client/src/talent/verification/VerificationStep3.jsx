import React, { useState, useRef, useEffect, useCallback } from 'react';

const VerificationStep3 = ({ formData, updateFormData, onFinish, onSave, isSaving }) => {
    const [recordingState, setRecordingState] = useState('idle'); // 'idle' | 'countdown' | 'recording' | 'done' | 'error'
    const [countdown, setCountdown] = useState(3);
    const [elapsed, setElapsed] = useState(0); // seconds elapsed
    const [videoUrl, setVideoUrl] = useState(null);
    const [cameraError, setCameraError] = useState('');
    const [estimatedSizeMb, setEstimatedSizeMb] = useState(0);
    const videoRef = useRef(null);
    const previewRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const RECORD_DURATION = 5; // seconds

    const stopStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        clearInterval(timerRef.current);
    }, []);

    const startCountdown = useCallback(async () => {
        setCameraError('');
        setCountdown(3);
        setElapsed(0);
        setRecordingState('countdown');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            // Countdown 3..2..1
            let count = 3;
            const cd = setInterval(() => {
                count--;
                setCountdown(count);
                if (count === 0) {
                    clearInterval(cd);
                    startRecording(stream);
                }
            }, 1000);
        } catch (err) {
            setCameraError('Camera access denied. Please allow camera permission and try again.');
            setRecordingState('idle');
        }
    }, []);

    const startRecording = (stream) => {
        setRecordingState('recording');
        setElapsed(0);
        chunksRef.current = [];
        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : 'video/webm';
        const recorder = new MediaRecorder(stream, {
            mimeType,
            videoBitsPerSecond: 500_000,
        });
        mediaRecorderRef.current = recorder;
        recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
            setEstimatedSizeMb(Number((blob.size / (1024 * 1024)).toFixed(2)));
            updateFormData({ videoBlob: blob, videoRecorded: true });
            stopStream();
            setRecordingState('done');
        };
        recorder.start();
        // Auto-stop after RECORD_DURATION seconds
        let secs = 0;
        timerRef.current = setInterval(() => {
            secs++;
            setElapsed(secs);
            if (secs >= RECORD_DURATION) {
                clearInterval(timerRef.current);
                if (mediaRecorderRef.current?.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
            }
        }, 1000);
    };

    const retake = () => {
        setVideoUrl(null);
        setElapsed(0);
        setEstimatedSizeMb(0);
        updateFormData({ videoBlob: null, videoRecorded: false });
        setRecordingState('idle');
    };

    useEffect(() => () => stopStream(), [stopStream]);

    const progressPct = Math.min((elapsed / RECORD_DURATION) * 100, 100);

    return (
        <div className="flex flex-1 flex-col max-w-xl mx-auto w-full px-4 py-6">
            {/* Progress */}
            <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-primary text-sm font-bold uppercase tracking-wider">Step 3 of 3</p>
                        <p className="text-2xl font-bold mt-1 dark:text-white">Record Video Selfie</p>
                    </div>
                    <p className="text-primary text-sm font-bold">100%</p>
                </div>
                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: '100%' }}></div>
                </div>
            </div>

            <div className="mb-6 text-center">
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    Look straight into the camera and turn your head slowly from left to right.
                </p>
            </div>

            {/* Camera Viewfinder */}
            <div className="relative w-full aspect-[3/4] rounded-xl bg-slate-200 dark:bg-slate-800/50 overflow-hidden border-2 border-primary/10 flex items-center justify-center mb-8 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>

                {/* Live Camera Feed */}
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        recordingState === 'countdown' || recordingState === 'recording' ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                {/* Done — playback */}
                {recordingState === 'done' && videoUrl && (
                    <video
                        ref={previewRef}
                        src={videoUrl}
                        controls
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Face outline (idle + countdown) */}
                {(recordingState === 'idle' || recordingState === 'countdown') && (
                    <div className="absolute z-10 flex flex-col items-center justify-center">
                        <div className={`w-[220px] h-[280px] border-2 border-dashed border-primary/40 rounded-[50%_/_60%_60%_40%_40%] ${recordingState === 'countdown' ? 'animate-none border-primary' : 'animate-pulse'}`}></div>
                    </div>
                )}

                {/* Recording indicator */}
                {recordingState === 'recording' && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/70 rounded-full border border-white/10 z-20">
                        <div className="size-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-mono font-bold tracking-widest">
                            {(RECORD_DURATION - elapsed).toString().padStart(2, '0')}s
                        </span>
                    </div>
                )}

                {/* Recording progress bar */}
                {recordingState === 'recording' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                        <div
                            className="h-full bg-primary transition-all duration-1000 ease-linear"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                )}

                {/* Countdown overlay */}
                {recordingState === 'countdown' && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="text-white text-9xl font-extrabold drop-shadow-2xl animate-bounce" key={countdown}>
                            {countdown || ''}
                        </div>
                    </div>
                )}

                {/* Idle Start Button */}
                {recordingState === 'idle' && (
                    <div className="z-20 flex flex-col items-center gap-4">
                        <button
                            onClick={startCountdown}
                            className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-3xl">videocam</span>
                        </button>
                        <span className="text-white text-sm font-medium drop-shadow-md">Start Recording</span>
                    </div>
                )}

                {/* Done overlay badge */}
                {recordingState === 'done' && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-green-500/90 rounded-full">
                        <span className="material-symbols-outlined !text-sm text-white">check_circle</span>
                        <span className="text-white text-xs font-bold">Recording Complete {estimatedSizeMb ? `• ${estimatedSizeMb} MB` : ''}</span>
                    </div>
                )}

                {/* Camera quality tags */}
                {(recordingState === 'idle' || recordingState === 'recording') && (
                    <div className="absolute bottom-4 left-0 w-full px-6 flex justify-between items-center text-white/80 text-xs italic z-10">
                        <span>Front Camera Active</span>
                        <span>HD Quality</span>
                    </div>
                )}
            </div>

            {/* Camera error */}
            {cameraError && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    <span className="material-symbols-outlined">error</span>
                    {cameraError}
                </div>
            )}

            {/* Guidelines */}
            <div className="grid grid-cols-1 gap-4 mb-8">
                <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-widest">Guidelines for success</h3>
                <div className="flex flex-col gap-3">
                    {[
                        { icon: 'light_mode', text: 'Ensure good natural lighting' },
                        { icon: 'face_6', text: 'Do not wear sunglasses or hats' },
                        { icon: 'sentiment_neutral', text: 'Keep a neutral expression' },
                    ].map(({ icon, text }) => (
                        <div key={icon} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
                            <span className="text-sm dark:text-slate-300">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-auto pb-8">
                {recordingState === 'done' && (
                    <button
                        onClick={retake}
                        className="w-full py-3 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">replay</span>
                        Retake Video
                    </button>
                )}
                <button
                    onClick={onFinish}
                    disabled={!formData.videoRecorded}
                    className={`w-full py-4 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
                        formData.videoRecorded
                            ? 'bg-primary hover:bg-primary/90 shadow-primary/20 active:scale-95'
                            : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
                    }`}
                    title={!formData.videoRecorded ? 'Please record your video selfie first' : ''}
                >
                    <span>Finish Verification</span>
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                </button>
                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="w-full py-4 bg-transparent border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <span className="material-symbols-outlined !text-base animate-spin">progress_activity</span>
                            Saving…
                        </>
                    ) : 'Save Progress'}
                </button>
                {!formData.videoRecorded && recordingState === 'idle' && (
                    <p className="text-center text-xs text-amber-500">
                        Record your video selfie to complete verification.
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerificationStep3;
