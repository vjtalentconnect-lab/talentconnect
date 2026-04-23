import api from './api';
import { validateFileForUpload } from '../utils/fileValidation';

export const getMyProfile = async () => {
    const response = await api.get('/profile/me');
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
};

export const getProfileById = async (id) => {
    const response = await api.get(`/profile/${id}`);
    return response.data;
};

export const getProfileByUser = async (userId) => {
    const response = await api.get(`/profile/by-user/${userId}`);
    return response.data;
};

export const getProfiles = async (filters) => {
    const response = await api.get('/profile', { params: filters });
    return response.data;
};

export const uploadMedia = async (mediaFile, type, metadata = {}) => {
  let data;
  
  if (mediaFile instanceof FormData) {
    // Ensure validateFileForUpload has a file to run if possible, though if we use FormData it might be tricky.
    // Let's extract file for validation only, but send the original FormData.
    const fileToUpload = mediaFile.get('media');
    if (!fileToUpload) {
        throw new Error('No media file selected.');
    }
    
    // Validate file
    const acceptedTypes = type === 'profilePicture'
        ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        : ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm', 'application/pdf'];
        
    await validateFileForUpload(fileToUpload, acceptedTypes);
    
    data = mediaFile;
    if (type && !data.has('type')) {
        data.append('type', type);
    }
  } else {
    data = new FormData();
    const acceptedTypes = type === 'profilePicture'
        ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        : ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm', 'application/pdf'];

    if (!mediaFile) {
        throw new Error('No media file selected.');
    }

    await validateFileForUpload(mediaFile, acceptedTypes);
    data.append('media', mediaFile);

    if (type) {
        data.append('type', type);
    }

    Object.keys(metadata).forEach(key => {
        data.append(key, metadata[key]);
    });
  }
  
  // Debug: Log all form data entries
  console.log('[uploadMedia] Final FormData entries:');
  for (const [key, value] of data.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: File(${value.name}, ${value.type}, ${value.size})`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
  
  // Add metadata for portfolio items
  if (metadata.title) {
    data.append('title', metadata.title);
  }
  if (metadata.description) {
    data.append('description', metadata.description);
  }

  const response = await api.post('/profile/upload', data);
  return response.data;
};

export const submitForVerification = async () => {
  const response = await api.post('/profile/submit-verification');
  return response.data;
};

export const exportMyData = async () => {
  const response = await api.get('/profile/export-data', {
    responseType: 'blob',
  });

  const blob = new Blob([response.data], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const contentDisposition = response.headers['content-disposition'] || '';
  const matchedName = contentDisposition.match(/filename=\"?([^"]+)\"?/i);
  const filename = matchedName?.[1] || `my-talentconnect-data-${new Date().toISOString().split('T')[0]}.json`;
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
