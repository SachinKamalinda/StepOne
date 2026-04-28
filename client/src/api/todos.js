const BASE_URL = process.env.REACT_APP_API_URL || '/api/todos';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const todosApi = {
  getAll: () => request(BASE_URL),

  create: (title, description) =>
    request(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    }),

  update: (id, title, description) =>
    request(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
    }),

  toggleDone: (id) =>
    request(`${BASE_URL}/${id}/done`, { method: 'PATCH' }),

  delete: (id) =>
    request(`${BASE_URL}/${id}`, { method: 'DELETE' }),
};
