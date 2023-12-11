import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../constants/global-constant';
import { getAccessToken } from '../utils/authUtils';

export const request: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${getAccessToken()}`
  },
});

export const formRequest: AxiosInstance= axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${getAccessToken()}`,
    'Content-Type': 'multipart/form-data',
  },
});
