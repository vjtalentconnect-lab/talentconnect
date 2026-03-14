import React, { useState } from 'react';
import { uploadMedia } from '../../services/profileService';

const MediaUpload = ({ type, onUploadSuccess, title = '', description = '' }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('media', file);
        formData.append('type', type);
        if (title) formData.append('title', title);
        if (description) formData.append('description', description);

        try {
            const result = await uploadMedia(formData);
            if (result.success) {
                onUploadSuccess(result.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative">
            <input
                type="file"
                id={`file-upload-${type}`}
                className="hidden"
                onChange={handleFileChange}
                accept={type === 'profilePicture' ? 'image/*' : '*'}
                disabled={uploading}
            />
            <label
                htmlFor={`file-upload-${type}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all ${
                    uploading 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                }`}
            >
                {uploading ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                        Uploading...
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined text-sm">cloud_upload</span>
                        {type === 'profilePicture' ? 'Change Photo' : 'Upload to Portfolio'}
                    </>
                )}
            </label>
            {error && <p className="text-red-500 text-[10px] mt-1 font-bold">{error}</p>}
        </div>
    );
};

export default MediaUpload;
