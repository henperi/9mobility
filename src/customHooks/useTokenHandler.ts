import { useCallback, useEffect, useState } from 'react';

import { usePost } from './useRequests';
import { useGlobalStore } from '../store';
import { OnboardingAuthResponse } from '../pages/OnboardingPage/ConfirmOTP';
import { setAuthUser, removeAuthUser } from '../store/modules/auth/actions';
import { initialState } from '../store/modules';
import { useCountdown } from './useCountdown';
import { logger } from '../utils/logger';

export const useTokenRefresher = (state: typeof initialState) => {
  const { dispatch } = useGlobalStore();
  const [refreshToken] = usePost<OnboardingAuthResponse>(
    'Mobility.Onboarding/api/Verification/refreshtoken',
  );

  const [expiresIn, setExpiresIn] = useState<number | null>();

  const timeRemaining = useCountdown(expiresIn as number);

  useEffect(() => {
    if (state.auth.user) {
      const expiresAt = new Date(state.auth.user.expiresIn).getTime();
      const currentTime = Date.now();

      setExpiresIn(expiresAt - currentTime);
    }
  }, [state.auth.user]);

  useEffect(() => {
    if (state.auth.user) {
      // logger.log(timeRemaining);
    }
  }, [state.auth.user, timeRemaining]);

  const refresh = useCallback(async () => {
    if (!timeRemaining) {
      // dispatch(removeAuthUser());
    }

    if (
      state.auth.user?.refreshToken &&
      new Date(Date.now()).getTime() -
        new Date(state.auth.user.expiresIn).getTime() >
        -100 &&
      timeRemaining < 100
    ) {
      try {
        logger.log('timeRemaining', timeRemaining, state.auth);
        const result = await refreshToken({
          refreshToken: state.auth.user?.refreshToken,
        });
        dispatch(setAuthUser(result.data.result));
      } catch (error) {
        logger.log(error);
        dispatch(removeAuthUser());
      }
    }
  }, [dispatch, refreshToken, state.auth, timeRemaining]);

  return [refresh];
};
