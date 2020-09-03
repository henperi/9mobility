import React, { createContext } from 'react';
import { initialState } from './modules';

import { dispatchHelper } from '../utils/dispatchHelper';

interface IStateDispatch {
  state: typeof initialState;
  dispatch: React.Dispatch<any> | typeof dispatchHelper;
}

const AppContext = createContext<IStateDispatch>({
  state: initialState,
  dispatch: dispatchHelper,
});

const AppProvider: React.FC<IStateDispatch> = ({
  children,
  state,
  dispatch,
}) => {
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalStore = () => React.useContext(AppContext);

export { AppProvider, useGlobalStore };
