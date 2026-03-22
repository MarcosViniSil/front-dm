import { api } from './api';

// Example model interface
export interface User {
  id: string;
  name: string;
  email: string;
}

// Example service — replace endpoints with your real API
export const userService = {
  getAll: () => api.get<User[]>('/users'),

  getById: (id: string) => api.get<User>(`/users/${id}`),

  create: (data: Omit<User, 'id'>) => api.post<User>('/users', data),

  update: (id: string, data: Partial<User>) => api.put<User>(`/users/${id}`, data),

  delete: (id: string) => api.delete<void>(`/users/${id}`),
};
