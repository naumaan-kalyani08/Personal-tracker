import { useState } from 'react';
import { getApi, postApi, putApi, patchApi, deleteApi } from './apiClient';

export const getApiData = async (endpoint = '', params = {}) => getApi(endpoint, params);
export const postApiData = async (endpoint, data) => postApi(endpoint, data);
export const putApiData = async (endpoint, data) => putApi(endpoint, data);
export const patchApiData = async (endpoint, data) => patchApi(endpoint, data);
export const deleteApiData = async (endpoint) => deleteApi(endpoint);

export const useApiForm = (endpoint, initialFormData = {}) => {
  const [formData, setFormData] = useState(() => ({ ...initialFormData }));
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormData = () => {
    setFormData({ ...initialFormData });
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    setLoading(true);
    setResponseMessage('');

    try {
      const result = await postApiData(endpoint, formData);

      if (result?.status) {
        setResponseMessage(result.message || 'Submitted successfully');
        resetFormData();
      } else {
        setResponseMessage(result?.message || 'Failed to submit');
      }

      return result;
    } catch (error) {
      setResponseMessage(error.message || 'Something went wrong');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    responseMessage,
    resetFormData,
  };
};

export const useDeleteApiData = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setResponseMessage('');

    try {
      const result = await deleteApiData(endpoint);
      if (result?.status) {
        setResponseMessage(result.message || 'Deleted successfully');
      } else {
        setResponseMessage(result?.message || 'Failed to delete');
      }
      return result;
    } catch (error) {
      setResponseMessage(error.message || 'Something went wrong');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDelete,
    loading,
    responseMessage,
  };
};

export const useApiCall = (method = 'GET') => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (endpoint, payload = null, params = null) => {
    setLoading(true);
    setError(null);

    try {
      let result;

      if (method === 'GET') {
        result = await getApiData(endpoint, params);
      } else if (method === 'POST') {
        result = await postApiData(endpoint, payload);
      } else if (method === 'PUT') {
        result = await putApiData(endpoint, payload);
      } else if (method === 'PATCH') {
        result = await patchApiData(endpoint, payload);
      } else if (method === 'DELETE') {
        result = await deleteApiData(endpoint);
      }

      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    data,
    error,
  };
};
