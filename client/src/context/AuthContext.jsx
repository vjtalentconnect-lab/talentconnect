import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, logout as logoutRequest, refreshAuthToken } from '../services/authService';
import { AUTH_STORAGE_EVENT, TOKEN_REFRESH_EVENT, clearAuthSession, getStoredAuth, persistAuthSession, updateStoredUser, getAuthDiagnostics } from '../utils/authStorage';
import tokenManager from '../utils/tokenManager.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const stored = getStoredAuth();
    return {
      user: stored.user,
      token: stored.token,
      loading: true,
      initialized: false,
      error: null,
    };
  });

  const syncFromStorage = useCallback(() => {
    const stored = getStoredAuth();
    setAuthState((prev) => ({
      ...prev,
      user: stored.user,
      token: stored.token,
    }));
  }, []);

  const refreshUser = useCallback(async () => {
    const stored = getStoredAuth();

    // Env-admin currently relies on bearer fallback, so keep the stored session
    // when we cannot hydrate it via /auth/me.
    if (stored.user?.role === 'admin' && stored.token) {
      setAuthState({
        user: stored.user,
        token: stored.token,
        loading: false,
        initialized: true,
        error: null,
      });
      return stored.user;
    }

    try {
      const response = await getMe();
      const user = response?.data || response?.user || null;
      persistAuthSession({ 
        token: stored.token, 
        user,
        issuedAt: stored.metadata?.issuedAt,
        expiresIn: stored.metadata?.expiresIn,
      });
      setAuthState({
        user,
        token: stored.token,
        loading: false,
        initialized: true,
        error: null,
      });
      return user;
    } catch (err) {
      console.error('[Auth] Failed to refresh user:', err);
      clearAuthSession();
      setAuthState({
        user: null,
        token: null,
        loading: false,
        initialized: true,
        error: 'Session expired. Please login again.',
      });
      return null;
    }
  }, []);

  const handleTokenRefresh = useCallback(async () => {
    try {
      console.log('[Auth] Token auto-refresh triggered');
      await refreshAuthToken();
      const stored = getStoredAuth();
      setAuthState((prev) => ({
        ...prev,
        token: stored.token,
      }));
    } catch (err) {
      console.error('[Auth] Token refresh failed:', err);
      clearAuthSession();
      setAuthState({
        user: null,
        token: null,
        loading: false,
        initialized: true,
        error: 'Session expired. Please login again.',
      });
    }
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = getStoredAuth();
      
      // Check if token is already expired
      if (stored.token && tokenManager.isTokenExpired()) {
        console.warn('[Auth] Stored token is expired');
        clearAuthSession();
        setAuthState({
          user: null,
          token: null,
          loading: false,
          initialized: true,
          error: 'Session expired. Please login again.',
        });
        return;
      }

      if (!stored.token && !stored.user) {
        setAuthState({
          user: null,
          token: null,
          loading: false,
          initialized: true,
          error: null,
        });
        return;
      }

      await refreshUser();
    };

    bootstrap();
  }, [refreshUser]);

  // Listen for token refresh events
  useEffect(() => {
    window.addEventListener(TOKEN_REFRESH_EVENT, handleTokenRefresh);
    return () => window.removeEventListener(TOKEN_REFRESH_EVENT, handleTokenRefresh);
  }, [handleTokenRefresh]);

  useEffect(() => {
    const handleAuthChanged = () => {
      syncFromStorage();
    };

    window.addEventListener(AUTH_STORAGE_EVENT, handleAuthChanged);
    return () => window.removeEventListener(AUTH_STORAGE_EVENT, handleAuthChanged);
  }, [syncFromStorage]);

  const setSessionFromAuthResponse = useCallback((payload) => {
    persistAuthSession({
      token: payload?.token || null,
      user: payload?.user || null,
      issuedAt: payload?.issuedAt,
      expiresIn: payload?.expiresIn,
    });
    setAuthState({
      user: payload?.user || null,
      token: payload?.token || null,
      loading: false,
      initialized: true,
      error: null,
    });
  }, []);

  const mergeUser = useCallback((partialUser) => {
    setAuthState((prev) => {
      const nextUser = prev.user ? { ...prev.user, ...partialUser } : partialUser;
      updateStoredUser(nextUser);
      return { ...prev, user: nextUser };
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error('[Auth] Logout request failed:', err);
    } finally {
      clearAuthSession();
      setAuthState({
        user: null,
        token: null,
        loading: false,
        initialized: true,
        error: null,
      });
    }
  }, []);

  const value = useMemo(() => ({
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    initialized: authState.initialized,
    error: authState.error,
    isAuthenticated: Boolean(authState.user),
    refreshUser,
    setSessionFromAuthResponse,
    mergeUser,
    logout,
    getDiagnostics: getAuthDiagnostics,
  }), [authState, logout, refreshUser, setSessionFromAuthResponse, mergeUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
