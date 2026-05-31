const BASE_URL = 'https://jsonplaceholder.typicode.com';

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const tasksAPI = {
  getAll: () => request('/todos'),
  getById: (id) => request(`/todos/${id}`),
  create: (data) => request('/todos', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/todos/${id}`, { method: 'DELETE' }),
};

export const usersAPI = {
  getAll: () => request('/users'),
  getById: (id) => request(`/users/${id}`),
};

export const postsAPI = {
  getAll: () => request('/posts'),
  create: (data) => request('/posts', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
};
