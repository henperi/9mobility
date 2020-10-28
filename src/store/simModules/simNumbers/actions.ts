import types from './types';

/**
 * @description method to set the status of network error
 * @param simNumber
 * @returns reducer action type and payload
 */
export const setSecondaryNumber = (simNumber: string) => ({
  type: types.SET_SECONDARY_NUMBER,
  payload: {
    simNumber,
  },
});
