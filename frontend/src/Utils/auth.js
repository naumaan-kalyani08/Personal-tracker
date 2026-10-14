const AUTH_STORAGE_KEY = 'auth';
const AUTH_CHANGE_EVENT = 'auth-change';

const notifyAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(atob(padded));
  } catch (error) {
    return null;
  }
};

export const getAuthData = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Failed to parse auth data:', error);
    return {};
  }
};

export const getAuthToken = () => getAuthData()?.access_token || null;

export const hasTokenExpired = () => {
  const token = getAuthToken();
  const auth = getAuthData();

  if (auth?.expires_at) {
    return new Date(auth.expires_at).getTime() <= Date.now();
  }

  if (!token || !token.includes('.')) {
    return false;
  }

  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return false;
  }

  return Number(payload.exp) * 1000 <= Date.now();
};

export const setAuthData = (authData) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  notifyAuthChange();
};

export const clearAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  notifyAuthChange();
};

export const subscribeToAuthChanges = (callback) => {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};

export const isAuthenticated = () => Boolean(getAuthToken()) && !hasTokenExpired();

export const getCurrentUser = () => getAuthData()?.user || null;
