import { types } from './types';
import { AuthUser } from './interface';

export const authInitialState: {
  isAuthenticated: boolean;
  user: AuthUser | null;
} = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (
  state = authInitialState,
  action: { type: string; payload: { user: AuthUser } },
) => {
  switch (action.type) {
    case types.SET_AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };

    case types.REMOVE_AUTH_USER:
      return {
        ...authInitialState,
      };

    default:
      return state;
  }
};
