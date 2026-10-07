import { clearAuthData, getAuthToken } from '../Utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';

const buildUrl = (endpoint = '', params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const baseUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

const getErrorMessage = (response, payload) => {
  if (payload?.message) return payload.message;
  if (payload?.error) return payload.error;
  if (payload?.errors) {
    const firstError = Object.values(payload.errors)?.[0];
    return Array.isArray(firstError) ? firstError[0] : firstError || 'Request failed';
  }

  return `Request failed with status ${response.status}`;
};

export const apiClient = async (endpoint = '', options = {}) => {
  const {
    method = 'GET',
    body,
    params = {},
    headers = {},
    signal,
  } = options;

  const token = getAuthToken();
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const requestHeaders = {
    Accept: 'application/json',
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const fetchOptions = {
    method,
    headers: requestHeaders,
    ...(body !== undefined ? { body: isFormData ? body : JSON.stringify(body) } : {}),
    ...(signal ? { signal } : {}),
  };

  try {
    const response = await fetch(buildUrl(endpoint, params), fetchOptions);
    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : await response.text().catch(() => null);

    if (!response.ok) {
      const errorMessage = getErrorMessage(response, payload);

      if (response.status === 401) {
        clearAuthData();
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload ?? {};
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API Error [${method}] ${endpoint}:`, error.message);
    }
    throw error;
  }
};

export const getApi = (endpoint, params = {}, options = {}) =>
  apiClient(endpoint, { ...options, method: 'GET', params });

export const postApi = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: 'POST', body });

export const putApi = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: 'PUT', body });

export const patchApi = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: 'PATCH', body });

export const deleteApi = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: 'DELETE' });
