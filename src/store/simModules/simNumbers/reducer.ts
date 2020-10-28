import types from './types';

export const simNumbersInitialState: {
  secondarySim: string;
} = {
  secondarySim: '',
};

export const simNumbersReducer = (
  state = simNumbersInitialState,
  action: { type: string; payload: { simNumber: string } },
) => {
  switch (action.type) {
    case types.SET_SECONDARY_NUMBER:
      return {
        ...state,
        secondarySim: action.payload.simNumber,
      };

    default:
      return state;
  }
};
