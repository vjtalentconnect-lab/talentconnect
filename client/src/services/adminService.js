import api from './api';

export const getAdminStats = async () => {
    const response = await api.get('/admin/stats');
    return response.data;
};

export const getAdminUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const getAdminProjects = async () => {
    const response = await api.get('/admin/projects');
    return response.data;
};

export const getPendingVerifications = async () => {
    const response = await api.get('/admin/verifications');
    return response.data;
};

export const verifyUser = async (userId, data) => {
    // data should be { verificationStatus: 'verified' | 'rejected' | 'pending' }
    const response = await api.put(`/admin/verify/${userId}`, data);
    return response.data;
};
export const updateProjectStatus = async (projectId, status) => {
    const response = await api.put(`/admin/projects/${projectId}/status`, { status });
    return response.data;
};

export const updateUserRole = async (userId, role) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
};
export const deleteProject = async (projectId) => {
    const response = await api.delete(`/admin/projects/${projectId}`);
    return response.data;
};

export const getAdminProjectDetails = async (projectId) => {
    const response = await api.get(`/admin/projects/${projectId}`);
    return response.data;
};

export const searchGlobal = async (query) => {
    const response = await api.get(`/admin/search?query=${query}`);
    return response.data;
};

export const getMediaAssets = async (params = {}) => {
    const response = await api.get('/admin/media', { params });
    return response.data;
};
