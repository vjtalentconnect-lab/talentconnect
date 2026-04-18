const TOKEN_KEY = 'tc_auth_token';
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

export const getStoredToken = () => sessionStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => safeParse(sessionStorage.getItem(USER_KEY), null);

export const getStoredAuth = () => ({
  token: getStoredToken(),
  user: getStoredUser(),
});

export const persistAuthSession = ({ token, user }) => {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  if (user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(USER_KEY);
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const updateStoredUser = (user) => {
  persistAuthSession({ token: getStoredToken(), user });
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const AUTH_STORAGE_EVENT = AUTH_EVENT;
