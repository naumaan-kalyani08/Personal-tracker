const AUTH_STORAGE_KEY = 'auth';
const AUTH_CHANGE_EVENT = 'auth-change';

const notifyAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
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

export const isAuthenticated = () => Boolean(getAuthToken());

export const getCurrentUser = () => getAuthData()?.user || null;
