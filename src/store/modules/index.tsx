import { appReducer, appInitialState } from './init/reducer';

export const initialState = {
  app: appInitialState,
};

export const rootReducer = (state: typeof initialState, action: any) => {
  const { app } = state;

  return {
    app: appReducer(app, action),
  };
};
