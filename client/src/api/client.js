/**
 * A lightweight wrapper around the native Fetch API.
 * This simplifies API calls by handling JSON headers and base URLs automatically.
 *
 * Usage:
 * import api from '@/api/client'
 *
 * const data = await api.get('/users')
 * const newUser = await api.post('/users', { name: 'John' })
 */

const BASE_URL = '/api'; // Vite proxy handles the redirect to http://localhost:4000

const api = {
  async request(endpoint, method = 'GET', body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  },

  get(endpoint) {
    return this.request(endpoint, 'GET');
  },

  post(endpoint, body) {
    return this.request(endpoint, 'POST', body);
  },

  put(endpoint, body) {
    return this.request(endpoint, 'PUT', body);
  },

  delete(endpoint) {
    return this.request(endpoint, 'DELETE');
  },
};

export default api;