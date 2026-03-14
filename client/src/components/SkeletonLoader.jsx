import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
            <style>
                {`
                    @keyframes shimmer {
                        0% { background-position: -1000px 0; }
                        100% { background-position: 1000px 0; }
                    }
                    .animate-shimmer {
                        animation: shimmer 2s infinite linear;
                        background: linear-gradient(to right, rgba(201, 168, 76, 0.05) 4%, rgba(201, 168, 76, 0.15) 25%, rgba(201, 168, 76, 0.05) 36%);
                        background-size: 1000px 100%;
                    }
                `}
            </style>
            <div className="w-full max-w-4xl space-y-8">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-12">
                    <div className="h-10 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded animate-shimmer w-1/4"></div>
                    <div className="h-10 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-full animate-shimmer w-10"></div>
                </div>

                {/* Main Content Area Skeletons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="h-48 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-2xl animate-shimmer w-full"></div>
                        <div className="h-32 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-2xl animate-shimmer w-full"></div>
                        <div className="h-32 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-2xl animate-shimmer w-full"></div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-32 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-2xl animate-shimmer w-full"></div>
                        <div className="h-64 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-2xl animate-shimmer w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SkeletonLoader);
