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

export const getProfiles = async (filters) => {
    const response = await api.get('/profile', { params: filters });
    return response.data;
};

export const uploadMedia = async (formData) => {
  const response = await api.post('/profile/upload', formData, {
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
