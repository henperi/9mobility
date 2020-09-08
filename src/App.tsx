import React, { useEffect } from 'react';
import { Routes } from './routes';
import { AppProvider } from './store';
import { rootReducer, initialState } from './store/modules';
import { initialiseStore } from './store/modules/init/actions';
// import { dispatchHelper } from './utils/dispatchHelper';
import { AppContainer } from './components/AppContainer';
import { Spinner } from './components/Spinner';

/**
 * The App Component
 *
 * @returns Jsx Element
 */
export function App() {
  const [state, dispatchBase] = React.useReducer(rootReducer, initialState);
  // const dispatch = React.useCallback(dispatchHelper(dispatchBase, state), [
  //   dispatchBase,
  // ]);

  useEffect(() => {
    initialiseStore(dispatchBase);
  }, [dispatchBase]);

  return (
    <AppProvider state={state} dispatch={dispatchBase}>
      <AppContainer>
        {state.app.isReady ? <Routes /> : <Spinner isFixed />}
      </AppContainer>
    </AppProvider>
  );
}
