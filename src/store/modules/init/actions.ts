/* eslint-disable import/no-cycle */
import types from './types';
import { setAuthUser } from '../auth/actions';
import { AuthUser } from '../auth/interface';

/**
 * @description Method to start the app
 * @returns reducer action type and payload
 */
export const initApp = () => ({
  type: types.INIT_APP,
});

/**
 * @description method to set the status of network error
 * @param status
 * @returns reducer action type and payload
 */
export const setNetworkError = (status: boolean) => ({
  type: types.SET_NETWORK_ERROR,
  payload: {
    status,
  },
});

export const initialiseStore = (dispatch: React.Dispatch<any>) => {
  const authUser = localStorage.getItem('authUser');

  dispatch(initApp());
  if (authUser) {
    dispatch(setAuthUser(JSON.parse(authUser) as AuthUser));
  }
};
