import api from './api';

export const getMyNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}`);
  return response.data;
};

export const markAllRead = async () => {
  const response = await api.put('/notifications/read-all');
  return response.data;
};
