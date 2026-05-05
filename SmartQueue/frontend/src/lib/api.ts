import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

// Auth
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  profile: () => api.get('/auth/profile'),
};

// Jobs
export const jobsApi = {
  create: (data: any) => api.post('/jobs', data),
  list: (params?: any) => api.get('/jobs', { params }),
  get: (id: string) => api.get(`/jobs/${id}`),
  stats: () => api.get('/jobs/stats'),
  retry: (id: string) => api.post(`/jobs/${id}/retry`),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

// Queue
export const queueApi = {
  stats: () => api.get('/queue/stats'),
};

export default api;
