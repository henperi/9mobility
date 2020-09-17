import axios from 'axios';
import { apiConstants } from '../config/apiConstants';

const httpService = axios.create({
  baseURL: apiConstants.apiUrl,
});

/**
 * This method sets the necessary authorization when a user is logged in
 * @param token
 * @param header
 * @returns null
 */
export const setAuthHeader = (token: string, header = 'authorization') => {
  if (token) {
    localStorage.setItem('authToken', token);
    httpService.defaults.headers.common[header] = `Bearer ${token}`;
  }
};

/**
 * This method removes the necessary authorization when a user logs out
 * @param header
 * @returns null
 */
export const removeAuthHeader = (header = 'authorization') => {
  localStorage.removeItem('authToken');
  httpService.defaults.headers.common[header] = '';
};

export default httpService;
