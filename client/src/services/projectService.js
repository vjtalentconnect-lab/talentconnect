import api from './api';

export const getProjects = async (filters) => {
    const response = await api.get('/projects', { params: filters });
    return response.data;
};

export const getProject = async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
};

export const applyToProject = async (projectId) => {
    const response = await api.post(`/projects/${projectId}/apply`);
    return response.data;
};

export const getProjectApplications = async (projectId) => {
    const response = await api.get(`/projects/${projectId}/applications`);
    return response.data;
};
