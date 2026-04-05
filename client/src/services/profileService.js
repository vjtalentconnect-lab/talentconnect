import api from './api';

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
  // type: 'profilePicture' or 'portfolio'
  // mediaFile can be a File object or a FormData object
  // metadata: { title, description } - used for portfolio items
  const data = new FormData();
  
  if (mediaFile instanceof FormData) {
    // If already FormData, get the file and append it properly
    const file = mediaFile.get('media');
    if (file) {
      data.append('media', file);
    }
  } else {
    data.append('media', mediaFile);
  }
  data.append('type', type);
  
  // Add metadata for portfolio items
  if (metadata.title) {
    data.append('title', metadata.title);
  }
  if (metadata.description) {
    data.append('description', metadata.description);
  }

  const response = await api.post('/profile/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const submitForVerification = async () => {
  const response = await api.post('/profile/submit-verification');
  return response.data;
};
