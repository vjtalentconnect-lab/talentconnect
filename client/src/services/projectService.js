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

export const getMyApplications = async () => {
    const response = await api.get('/projects/my-applications');
    return response.data;
};

// --- Director Specific Endpoints ---

export const getMyProjects = async () => {
    const response = await api.get('/projects/my-projects');
    return response.data;
};

export const getDirectorApplications = async (status = '') => {
    const response = await api.get('/projects/my-applications/director', { params: { status } });
    return response.data;
};

export const updateApplicationStatus = async (appId, status) => {
    const response = await api.put(`/projects/applications/${appId}/status`, { status });
    return response.data;
};

export const scheduleAudition = async (appId, auditionData) => {
    const response = await api.put(`/projects/applications/${appId}/schedule-audition`, auditionData);
    return response.data;
};

export const updateProject = async (projectId, projectData) => {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
};
