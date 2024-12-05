import axios from 'axios';
import type { Desk, DeskBooking } from '../types/desk';
import type { User } from '../types/user';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getDesks = async (): Promise<Desk[]> => {
  const { data } = await api.get('/desks');
  return data;
};

export const createBooking = async (booking: Omit<DeskBooking, 'id'>): Promise<DeskBooking> => {
  const { data } = await api.post('/bookings', booking);
  return data;
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users');
  return data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const { data } = await api.post('/users', user);
  return data;
};