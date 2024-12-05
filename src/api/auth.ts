import axios from 'axios';
import type { LoginCredentials, AuthResponse } from '../types/auth';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Authentication failed');
    }
    throw error;
  }
};