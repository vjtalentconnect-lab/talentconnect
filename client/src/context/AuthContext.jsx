import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, logout as logoutRequest } from '../services/authService';
import { AUTH_STORAGE_EVENT, clearAuthSession, getStoredAuth, persistAuthSession, updateStoredUser } from '../utils/authStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const stored = getStoredAuth();
    return {
      user: stored.user,
      token: stored.token,
      loading: true,
      initialized: false,
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
      });
      return stored.user;
    }

    try {
      const response = await getMe();
      const user = response?.data || response?.user || null;
      persistAuthSession({ token: stored.token, user });
      setAuthState({
        user,
        token: stored.token,
        loading: false,
        initialized: true,
      });
      return user;
    } catch {
      clearAuthSession();
      setAuthState({
        user: null,
        token: null,
        loading: false,
        initialized: true,
      });
      return null;
    }
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = getStoredAuth();
      if (!stored.token && !stored.user) {
        setAuthState({
          user: null,
          token: null,
          loading: false,
          initialized: true,
        });
        return;
      }

      await refreshUser();
    };

    bootstrap();
  }, [refreshUser]);

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
    });
    setAuthState({
      user: payload?.user || null,
      token: payload?.token || null,
      loading: false,
      initialized: true,
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
    } finally {
      clearAuthSession();
      setAuthState({
        user: null,
        token: null,
        loading: false,
        initialized: true,
      });
    }
  }, []);

  const value = useMemo(() => ({
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    initialized: authState.initialized,
    isAuthenticated: Boolean(authState.user),
    refreshUser,
    setSessionFromAuthResponse,
    mergeUser,
    logout,
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
