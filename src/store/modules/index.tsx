import { appReducer, appInitialState } from './init/reducer';
import { authReducer, authInitialState } from './auth/reducer';

export const initialState = {
  app: appInitialState,
  auth: authInitialState,
};

export const rootReducer = (state: typeof initialState, action: any) => {
  const { app } = state;

  return {
    app: appReducer(app, action),
    auth: authReducer(authInitialState, action),
  };
};
