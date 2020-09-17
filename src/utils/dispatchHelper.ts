import { Reducer } from 'react';

export const dispatchHelper = (dispatch: React.Dispatch<any>, state: any) => (
  action: Reducer<React.Dispatch<any>, any> | React.Dispatch<any>,
) => {
  if (typeof action === 'function') {
    return action(dispatch, state);
  }

  return dispatch(action);
};
