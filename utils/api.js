import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://zi-affiliates-backend.onrender.com';

export const loginUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/user/login`, { email, password });
  return res.data;
};

export const getDashboardData = async (token) => {
  const res = await axios.get(`${BASE_URL}/leads/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getLeads = async (token, employeeId) => {
  const res = await axios.get(`${BASE_URL}/leads/by-employee/${employeeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createLead = async (token, employeeId, leadData) => {
  const res = await axios.post(`${BASE_URL}/leads`, leadData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'employee-id': employeeId,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const saveAuthData = async (data) => {
  await AsyncStorage.setItem('auth', JSON.stringify(data));
};

export const getAuthData = async () => {
  const data = await AsyncStorage.getItem('auth');
  return data ? JSON.parse(data) : null;
};

export const logout = async () => {
  await AsyncStorage.removeItem('auth');
};
