import { useCallback } from 'react';
import useAuthStore from '../stores/AuthStore';

const serverUrl = import.meta.env.VITE_BACKEND_BASE_URL;

interface Config {
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
}

export function apiClient() {
  const { logout, session } = useAuthStore();

  const apiClient = useCallback(async (endpoint: string, {body, method}: Config = {}) => {
    const token = session ? session : {};
    const config: Config & { body?: string } = {
      method: method ? method : body ? 'POST' : 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${serverUrl}/${endpoint}`, config);
    const data = await response.json();
    if (response.status === 401) {
      logout();
      window.location.href = '/auth/signin';
    }

    if (!response.ok) {
      return Promise.reject(data);
    }

    return data;
  }, [logout, session]);

  return apiClient;
}