import {
  simNumbersInitialState,
  simNumbersReducer,
} from './simNumbers/reducer';

export const simInitialState = {
  sim: simNumbersInitialState,
};

export const simReducer = (state: typeof simInitialState, action: any) => {
  return {
    sim: simNumbersReducer(simNumbersInitialState, action),
  };
};
