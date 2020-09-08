import { AuthUser } from './interface';
import { setAuthHeader } from '../../../services/htttpService';
import { types } from './types';

/**
 * @description method to set the auth user
 * @param authUser
 * @returns reducer action type and payload
 */
export const setAuthUser = (authUser: AuthUser) => {
  setAuthHeader(authUser.accesssToken);

  return {
    type: types.SET_AUTH_USER,
    payload: {
      user: authUser,
    },
  };
};
