const serverUrl = import.meta.env.VITE_BACKEND_BASE_URL;

interface Config {
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  session?: string;
}

export async function apiClient(endpoint: string, {body, method, session, ...customConfig}: Config = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(session ? { 'Authorization': `Bearer ${session}` } : {}),
    ...customConfig.headers,
  };

  const config: Config & { body?: string } = {
    method: method ? method : body ? 'POST' : 'GET',
    ...customConfig,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${serverUrl}/${endpoint}`, config);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}