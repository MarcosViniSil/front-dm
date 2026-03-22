import { api } from './api';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export const userService = {
  register: (data: CreateUserPayload) =>
    api.post<User>('/user', data),

  login: (data: LoginPayload) =>
    api.post<User>('/user/login', data),
};
