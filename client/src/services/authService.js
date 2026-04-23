import api from './api';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { clearAuthSession, persistAuthSession } from '../utils/authStorage';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    persistAuthSession({ 
        token: response.data.token, 
        user: response.data.user,
        issuedAt: response.data.issuedAt,
        expiresIn: response.data.expiresIn,
    });
    return response.data;
};

export const loginAdmin = async (email, password) => {
    const response = await api.post('/auth/admin-login', { email, password });
    const user = { id: 'env-admin', email, role: 'admin' };
    persistAuthSession({ 
        token: response.data.token, 
        user,
        issuedAt: response.data.issuedAt,
        expiresIn: response.data.expiresIn,
    });
    return { ...response.data, user };
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    persistAuthSession({ 
        token: response.data.token, 
        user: response.data.user,
        issuedAt: response.data.issuedAt,
        expiresIn: response.data.expiresIn,
    });
    return response.data;
};

export const loginWithGoogle = async (role = 'talent') => {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    const idToken = await credential.user.getIdToken();

    const response = await api.post('/auth/login/google', { idToken, role });
    persistAuthSession({ 
        token: response.data.token, 
        user: response.data.user,
        issuedAt: response.data.issuedAt,
        expiresIn: response.data.expiresIn,
    });
    return response.data;
};

// Get consistent redirect URI for both auth URL and token exchange
const getLinkedInRedirectUri = () => {
    // If we're on localhost, always try to use localhost for redirect to avoid prod redirection
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return `${window.location.origin}/auth/linkedin/callback`;
    }
    return import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/auth/linkedin/callback`;
};

export const getLinkedInAuthUrl = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = getLinkedInRedirectUri();
    // Use OpenID Connect scopes supported by Sign In with LinkedIn using OpenID Connect.
    // If your app has legacy r_liteprofile/r_emailaddress permissions, you can include those too.
    const scope = encodeURIComponent('openid profile email');
    const state = Math.random().toString(36).substring(2, 15); // simple CSRF token

    if (!clientId) {
        throw new Error('LinkedIn client ID is not configured.');
    }

    sessionStorage.setItem('linkedin_oauth_state', state);
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
};

export const completeLinkedInLogin = async (code, state, role = 'talent') => {
    const storedState = sessionStorage.getItem('linkedin_oauth_state');
    sessionStorage.removeItem('linkedin_oauth_state');

    if (!storedState || storedState !== state) {
        throw new Error('Invalid OAuth state. Please restart LinkedIn sign-in.');
    }
    
    const redirectUri = getLinkedInRedirectUri();
    
    const response = await api.post('/auth/login/linkedin', { code, redirectUri, role });
    persistAuthSession({ token: response.data.token, user: response.data.user });
    return response.data;
};

export const autoLinkedInLogin = async (role = 'talent') => {
    const authUrl = getLinkedInAuthUrl();
    sessionStorage.setItem('linkedin_oauth_role', role);
    window.location.href = authUrl;
};

/**
 * Refresh the authentication token
 * Called automatically when token is nearing expiration
 */
export const refreshAuthToken = async () => {
    try {
        const response = await api.post('/auth/refresh-token');
        persistAuthSession({ 
            token: response.data.token, 
            user: response.data.user,
            issuedAt: response.data.issuedAt,
            expiresIn: response.data.expiresIn,
        });
        return response.data;
    } catch (err) {
        // If refresh fails, clear session and force re-login
        clearAuthSession();
        throw err;
    }
};

export const logout = async () => {
    try {
        await api.get('/auth/logout');
    } catch (e) {
        console.warn('Backend logout failed');
    } finally {
        clearAuthSession();
    }
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
};

export const requestPasswordReset = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const resendEmailVerification = async (email) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
};

