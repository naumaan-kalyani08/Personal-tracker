const AUTH_STORAGE_KEY = 'auth';

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
};

export const clearAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => Boolean(getAuthToken());

export const getCurrentUser = () => getAuthData()?.user || null;
