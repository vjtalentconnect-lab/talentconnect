import tokenManager from './tokenManager.js';

const USER_KEY = 'tc_auth_user';
const PROFILE_KEY = 'tc_dashboard_profile';
const AUTH_EVENT = 'tc-auth-changed';

const safeParse = (value, fallback = null) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const getStoredToken = () => tokenManager.getToken();

export const getStoredUser = () => safeParse(sessionStorage.getItem(USER_KEY), null);
export const getStoredProfile = () => safeParse(sessionStorage.getItem(PROFILE_KEY), null);

export const getStoredAuth = () => ({
  token: getStoredToken(),
  user: getStoredUser(),
  metadata: tokenManager.getTokenMetadata(),
});

export const persistAuthSession = ({ token, user, issuedAt, expiresIn }) => {
  const previousUser = getStoredUser();

  if (token) {
    tokenManager.storeToken(token, issuedAt, expiresIn);
  } else {
    tokenManager.clearToken();
  }

  if (user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(USER_KEY);
  }

  if (!user || (previousUser?.id && user?.id && previousUser.id !== user.id)) {
    sessionStorage.removeItem(PROFILE_KEY);
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const updateStoredUser = (user) => {
  persistAuthSession({ 
    token: getStoredToken(), 
    user,
    issuedAt: sessionStorage.getItem('tc_token_issued_at'),
    expiresIn: sessionStorage.getItem('tc_token_expires_in'),
  });
};

export const updateStoredProfile = (profile) => {
  if (profile) {
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } else {
    sessionStorage.removeItem(PROFILE_KEY);
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuthSession = () => {
  tokenManager.clearToken();
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const AUTH_STORAGE_EVENT = AUTH_EVENT;
export const TOKEN_REFRESH_EVENT = 'tc-token-refresh';

/**
 * Get token diagnostics for troubleshooting
 */
export const getAuthDiagnostics = () => {
  return {
    token: tokenManager.getDiagnostics(),
    user: getStoredUser() ? { id: getStoredUser().id, email: getStoredUser().email, role: getStoredUser().role } : null,
    profile: getStoredProfile() ? { fullName: getStoredProfile().fullName, role: getStoredProfile().role } : null,
  };
};
