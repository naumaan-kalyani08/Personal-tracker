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

export const setAuthData = (authData) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

export const clearAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => {
  const auth = getAuthData();
  return Boolean(auth?.access_token);
};

export const getCurrentUser = () => {
  const auth = getAuthData();
  return auth?.user || null;
};
