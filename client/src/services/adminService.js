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

export const verifyUser = async (userId, status) => {
    const response = await api.put(`/admin/verify/${userId}`, { status });
    return response.data;
};
