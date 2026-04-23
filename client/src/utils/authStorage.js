import tokenManager from './tokenManager.js';

const USER_KEY = 'tc_auth_user';
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

export const getStoredAuth = () => ({
  token: getStoredToken(),
  user: getStoredUser(),
  metadata: tokenManager.getTokenMetadata(),
});

export const persistAuthSession = ({ token, user, issuedAt, expiresIn }) => {
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

export const clearAuthSession = () => {
  tokenManager.clearToken();
  sessionStorage.removeItem(USER_KEY);
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
  };
};
