import axios from 'axios';
import type { Office, Floor, Wing, AdminDesk } from '../types/admin';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/admin',
});

export const getOffices = async (): Promise<Office[]> => {
  const { data } = await api.get('/offices');
  return data;
};

export const createOffice = async (office: Omit<Office, 'id'>): Promise<Office> => {
  const { data } = await api.post('/offices', office);
  return data;
};

export const getFloors = async (): Promise<Floor[]> => {
  const { data } = await api.get('/floors');
  return data;
};

export const createFloor = async (floor: Omit<Floor, 'id'>): Promise<Floor> => {
  const { data } = await api.post('/floors', floor);
  return data;
};

export const getWings = async (): Promise<Wing[]> => {
  const { data } = await api.get('/wings');
  return data;
};

export const createWing = async (wing: Omit<Wing, 'id'>): Promise<Wing> => {
  const { data } = await api.post('/wings', wing);
  return data;
};

export const getAdminDesks = async (): Promise<AdminDesk[]> => {
  const { data } = await api.get('/desks');
  return data;
};

export const createAdminDesk = async (desk: Omit<AdminDesk, 'id'>): Promise<AdminDesk> => {
  const { data } = await api.post('/desks', desk);
  return data;
};