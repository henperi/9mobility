import { Reducer } from 'react';

export const dispatchHelper = (dispatch: React.Dispatch<any>, state: any) => (
  action: Reducer<React.Dispatch<any>, any> | Function,
) => {
  if (typeof action === 'function') {
    return action(dispatch, state);
  }

  return dispatch(action);
};
