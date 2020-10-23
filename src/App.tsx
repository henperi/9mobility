import React, { useEffect } from 'react';
import { Routes } from './routes';
import { AppProvider } from './store';
import { SimProvider } from './store/simStore';
import { rootReducer, initialState } from './store/modules';
import { simInitialState, simReducer } from './store/simModules';
import { initialiseStore } from './store/modules/init/actions';

import { AppContainer } from './components/AppContainer';
import { Spinner } from './components/Spinner';

/**
 * The App Component
 *
 * @returns Jsx Element
 */
export function App() {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const [simState, simDispatch] = React.useReducer(simReducer, simInitialState);

  useEffect(() => {
    initialiseStore(dispatch);
  }, [dispatch]);

  return (
    <AppProvider state={state} dispatch={dispatch}>
      <SimProvider state={simState} dispatch={simDispatch}>
        <AppContainer>
          {state.app.isReady ? <Routes /> : <Spinner isFixed />}
        </AppContainer>
      </SimProvider>
    </AppProvider>
  );
}
