import { AuthUser } from './interface';
import {
  setAuthHeader,
  removeAuthHeader,
} from '../../../services/htttpService';
import { types } from './types';
import { logger } from '../../../utils/logger';

/**
 * @description method to set the auth user
 * @param authUser
 * @returns reducer action type and payload
 */
export const setAuthUser = (authUser: AuthUser) => {
  setAuthHeader(authUser.accesssToken);
  localStorage.setItem('authUser', JSON.stringify(authUser));

  logger.log('setting auth user');

  return {
    type: types.SET_AUTH_USER,
    payload: {
      user: authUser,
    },
  };
};

export const removeAuthUser = () => {
  removeAuthHeader();
  localStorage.removeItem('authUser');

  return {
    type: types.REMOVE_AUTH_USER,
  };
};
