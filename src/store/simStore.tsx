import React, { createContext } from 'react';
import { simInitialState } from './simModules';

interface ISimStateDispatch {
  state: typeof simInitialState;
  dispatch: React.Dispatch<any>;
}

const SimContext = createContext<ISimStateDispatch>({
  state: simInitialState,
  dispatch: () => null,
});

const SimProvider: React.FC<ISimStateDispatch> = ({
  children,
  state,
  dispatch,
}) => {
  return (
    <SimContext.Provider value={{ state, dispatch }}>
      {children}
    </SimContext.Provider>
  );
};

const useSimStore = () => React.useContext(SimContext);

export { SimProvider, useSimStore };
