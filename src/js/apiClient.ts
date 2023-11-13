const serverUrl = import.meta.env.VITE_BACKEND_BASE_URL;

interface Config {
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  session?: string;
}

export async function apiClient(endpoint: string, {body, method, session, ...customConfig}: Config = {}) {
  const token = session ? session : {}

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

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}