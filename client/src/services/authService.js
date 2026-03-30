import api from './api';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const loginAdmin = async (email, password) => {
    const response = await api.post('/auth/admin-login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ id: 'env-admin', email, role: 'admin' }));
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const loginWithGoogle = async (role = 'talent') => {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    const idToken = await credential.user.getIdToken();

    const response = await api.post('/auth/login/google', { idToken, role });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

// Get consistent redirect URI for both auth URL and token exchange
const getLinkedInRedirectUri = () => {
    return import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/auth/linkedin/callback`;
};

export const getLinkedInAuthUrl = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = getLinkedInRedirectUri();
    // r_liteprofile ensures we can fetch a profile photo for auto-profiling
    const scope = encodeURIComponent('openid profile email r_liteprofile');
    const state = Math.random().toString(36).substring(2, 15); // simple CSRF token

    if (!clientId) {
        throw new Error('LinkedIn client ID is not configured.');
    }

    localStorage.setItem('linkedin_oauth_state', state);
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
};

export const completeLinkedInLogin = async (code, state, role = 'talent') => {
    const storedState = localStorage.getItem('linkedin_oauth_state');
    if (storedState && state && storedState !== state) {
        throw new Error('State mismatch. Please try again.');
    }
    const redirectUri = getLinkedInRedirectUri();
    const response = await api.post('/auth/login/linkedin', { code, redirectUri, role });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const autoLinkedInLogin = async (role = 'talent') => {
    const redirectUri = getLinkedInRedirectUri();
    console.log('🔵 LinkedIn - Starting login flow');
    console.log('🔵 LinkedIn - Redirect URI:', redirectUri);
    console.log('🔵 LinkedIn - Client ID:', import.meta.env.VITE_LINKEDIN_CLIENT_ID);
    
    const authUrl = getLinkedInAuthUrl();
    localStorage.setItem('linkedin_oauth_role', role);
    window.location.href = authUrl;
};

export const logout = async () => {
    await api.get('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
};

