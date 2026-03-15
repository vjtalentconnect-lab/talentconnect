import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle cases where response might not be valid JSON
        if (error.response && typeof error.response.data === 'string') {
            try {
                // If it's a string that should have been JSON, it might trigger the 'unexpected token' error
                // in some axios versions or usage patterns. We check headers.
                const contentType = error.response.headers['content-type'];
                if (contentType && !contentType.includes('application/json')) {
                   console.warn('Backend returned non-JSON response:', error.response.data);
                }
            } catch (e) {
                console.error('Error in API response interceptor:', e);
            }
        }

        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login or clear storage)
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api;
