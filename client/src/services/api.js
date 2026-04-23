import axios from 'axios';
import { clearAuthSession, getStoredToken, persistAuthSession } from '../utils/authStorage';
import tokenManager from '../utils/tokenManager.js';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Retry configuration
const RETRY_CONFIG = {
    retries: 2,
    retryDelay: 1000,
    retryStatusCodes: [408, 429, 500, 502, 503, 504]
};

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json, text/plain, */*',
    },
    timeout: 30000, // 30 second timeout
});

// Track if token refresh is in progress to avoid multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

// Request interceptor to add token to headers
api.interceptors.request.use(
    (config) => {
        const token = getStoredToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add diagnostic info for debugging
        config.headers['X-Request-Time'] = new Date().toISOString();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally with retry logic
api.interceptors.response.use(
    (response) => {
        // Extract server time from response headers for clock sync validation
        const serverTime = response.headers['date'];
        if (serverTime && tokenManager) {
            const syncCheck = tokenManager.validateClockSync(serverTime);
            if (!syncCheck.isSynced && console.warn) {
                console.warn('[Auth Diagnostics] Device clock may be out of sync:', syncCheck);
            }
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Check if we should retry
        if (!originalRequest._retry) {
            originalRequest._retry = 0;
        }
        
        const shouldRetry = 
            error.code === 'ECONNABORTED' || // Timeout
            error.message?.includes('network') ||
            (error.response && RETRY_CONFIG.retryStatusCodes.includes(error.response.status));
        
        if (shouldRetry && originalRequest._retry < RETRY_CONFIG.retries) {
            originalRequest._retry += 1;
            console.log(`[API] Retrying request (${originalRequest._retry}/${RETRY_CONFIG.retries})...`);
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, RETRY_CONFIG.retryDelay * originalRequest._retry));
            return api(originalRequest);
        }

        // Handle cases where response might not be valid JSON
        if (error.response && typeof error.response.data === 'string') {
            try {
                const contentType = error.response.headers['content-type'];
                if (contentType && !contentType.includes('application/json')) {
                   console.warn('[API] Backend returned non-JSON response:', error.response.data);
                }
            } catch (e) {
                console.error('[API] Error in response interceptor:', e);
            }
        }

        // Handle 401 Unauthorized - attempt token refresh
        if (error.response && error.response.status === 401) {
            const originalRequestURL = originalRequest.url;
            
            // Don't try to refresh if the request itself is a refresh attempt
            if (originalRequestURL?.includes('/auth/refresh-token') || originalRequestURL?.includes('/auth/login')) {
                clearAuthSession();
                return Promise.reject(error);
            }

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    // Import dynamically to avoid circular dependency
                    const { refreshAuthToken } = await import('./authService.js');
                    const response = await refreshAuthToken();
                    const newToken = response.token;
                    
                    onRefreshed(newToken);
                    isRefreshing = false;

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    isRefreshing = false;
                    refreshSubscribers = [];
                    clearAuthSession();
                    console.error('[API] Token refresh failed:', refreshError.message);
                    return Promise.reject(refreshError);
                }
            } else {
                // If refresh is already in progress, queue this request
                return new Promise(resolve => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }
        }

        // Enhance error message for network errors
        if (!error.response) {
            // Network error (no response from server)
            const networkError = new Error(
                `Network error. Please check your internet connection and try again. (${error.code || 'UNKNOWN'})`
            );
            networkError.code = 'NETWORK_ERROR';
            networkError.isNetworkError = true;
            console.error('[API] Network Error:', networkError);
            return Promise.reject(networkError);
        }

        // Improve error messages based on status codes
        if (error.response && error.response.data?.message) {
            error.message = error.response.data.message;
        } else if (error.response) {
            const status = error.response.status;
            if (status === 400) {
                error.message = error.response.data?.message || 'Bad request. Please check your input.';
            } else if (status === 403) {
                error.message = 'Access denied. You do not have permission.';
            } else if (status === 404) {
                error.message = 'Resource not found.';
            } else if (status === 422) {
                error.message = 'Validation error. Please check your input.';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
