import React, { createContext } from 'react';
import { initialState } from './modules';

interface IStateDispatch {
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
}

const AppContext = createContext<IStateDispatch>({
  state: initialState,
  dispatch: () => null,
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
