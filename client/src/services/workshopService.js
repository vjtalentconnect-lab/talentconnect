import api from './api';

export const getWorkshops = async (params = {}) => {
  const response = await api.get('/workshops', { params });
  return response.data;
};

export const getFeaturedWorkshops = async (params = {}) => {
  const response = await api.get('/workshops/featured', { params });
  return response.data;
};

export const getWorkshop = async (id) => {
  const response = await api.get(`/workshops/${id}`);
  return response.data;
};

export const getOnDemandClasses = async (params = {}) => {
  const response = await api.get('/workshops/on-demand', { params });
  return response.data;
};

export const bookWorkshop = async (id, payload = {}) => {
  const response = await api.post(`/workshops/${id}/book`, payload);
  return response.data;
};
