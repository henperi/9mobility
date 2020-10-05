import { useEffect, useRef, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import { AuthUser } from '../store/modules/auth/interface';
import { OnboardingAuthResponse } from '../pages/OnboardingPage/ConfirmOTP';
import { removeAuthUser, setAuthUser } from '../store/modules/auth/actions';
import { useGlobalStore } from '../store';
import { logger } from '../utils/logger';
import httpService from '../services/htttpService';
import { usePost } from './useRequests';

// authUser:"{"expiresIn":"2020-10-05T20:23:41.4992381+01:00","accesssToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy9hY3RvciI6IjA5MDgxMDEzNjIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOlsiNTQiLCIwOTA4MTAxMzYyMyJdLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiS2VsdmluIE9yaHVuZ3VsIiwiZW1haWwiOiJrZWx2aW4ub3JodW5ndWxAeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwOTA4MTAxMzYyMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlJlZ2lzdGVyZWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklkXCI6NTQsXCJVc2VyVHlwZVwiOlwiQ3VzdG9tZXJcIixcIk1vYmlsZU51bWJlclwiOlwiMDkwODEwMTM2MjNcIixcIldhbGxldEFjY291bnROb1wiOm51bGwsXCJDdXN0b21lck5hbWVcIjpcIktlbHZpbiBPcmh1bmd1bFwiLFwiVXNlckVtYWlsXCI6XCJrZWx2aW4ub3JodW5ndWxAeWFob28uY29tXCJ9IiwibmJmIjoxNjAxOTI2NzIxLCJleHAiOjE2MDE5Mjg1MjEsImlzcyI6Imh0dHA6Ly93d3cubW9iaWxpdHkubmciLCJhdWQiOiJodHRwOi8vd3d3Lm1vYmlsaXR5Lm5nIn0.jC9LDeQhw3-byAj_KT_NasGlKeO28X1aXOK2_0zWAwk","firstName":"Kelvin","lastName":"Orhungul","email":"kelvin.orhungul@yahoo.com","hasWallet":false,"dob":"","walletAccount":"","refreshToken":"SxGWjpBR4eKdGDc5PEvUdZ1xoBBFn4Dj6+ejs+l2ycg="}"

export const useInterceptor = async () => {
  const { dispatch, state } = useGlobalStore();
  const User = useRef<AuthUser | null>(state.auth.user || null);
  const authUser = localStorage.getItem('authUser');

  const [refreshToken] = usePost<OnboardingAuthResponse>(
    'Mobility.Onboarding/api/Verification/refreshtoken',
  );

  const interceptorHandler = useCallback(
    () =>
      httpService.interceptors.response.use(
        async (response) => {
          // Return a successful response back to the calling service
          logger.log(
            'Using interceptor to handle success',
            User.current?.refreshToken,
            User.current?.expiresIn,
          );

          return response;
        },
        async (error) => {
          logger.log('error.status', User.current?.expiresIn);
          // Return any error which is not due to authentication back to the calling service
          if (error.response.status !== 401) {
            logger.log('Not a 401 error');

            return new Promise((_, reject) => {
              reject(error);
            });
          }

          const { config } = error;
          const { headers, ...rest } = config as AxiosRequestConfig;

          // Logout user if token refresh didn't work or user is disabled
          if (
            error.config.url ===
              'Mobility.Onboarding/api/Verification/refreshtoken' ||
            error.response.message === 'Account is disabled.'
          ) {
            logger.log('failed to refresh, logging user out');
            dispatch(removeAuthUser());

            return new Promise((_, reject) => {
              reject(error);
            });
          }

          if (User.current && error.response.status === 401) {
            logger.log('attempting to refresh token', User);

            try {
              const result = await refreshToken({
                refreshToken: User.current?.refreshToken,
              });

              dispatch(setAuthUser(result.data.result));

              httpService.defaults.headers.common.authorization = `Bearer ${User.current?.accesssToken}`;

              logger.log('refresh token successful setting auth user');
            } catch (err) {
              logger.log(err);
              logger.log('refresh token failed removing auth user');
              // dispatch(removeAuthUser())

              return new Promise((_, reject) => {
                reject(err);
              });
            }
          }

          return new Promise((resolve, reject) => {
            return httpService
              .request(rest)
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          });
        },
      ),
    [dispatch, refreshToken],
  );

  useEffect(() => {
    if (authUser) {
      User.current = JSON.parse(authUser) as AuthUser;

      // logger.log('refreshToken', User.current.refreshToken);
      interceptorHandler();
    }
  }, [authUser, interceptorHandler]);
};

/*
export const helper = async (httpService: AxiosInstance) => {
  httpService.interceptors.response.use(
    (response) => {
      // Return a successful response back to the calling service
      logger.log('res');
      return response;
    },
    async (error) => {
      logger.log('res');
      // Return any error which is not due to authentication back to the calling service
      if (error.response.status !== 401) {
        return new Promise((_, reject) => {
          reject(error);
        });
      }

      // Logout user if token refresh didn't work or user is disabled
      if (
        error.config.url.contains(
          'Mobility.Onboarding/api/Verification/refreshtoken',
        ) ||
        error.response.message === 'Account is disabled.'
      ) {
        // TokenStorage.clear();
        // router.push({ name: 'root' });

        return new Promise((_, reject) => {
          reject(error);
        });
      }

      const user = localStorage.getItem('authUser');

      const { config } = error;

      if (user) {
        const authUser: AuthUser = JSON.parse(user);
        const accessToken = authUser.accesssToken;

        const result = await httpService.post<OnboardingAuthResponse>(
          'Mobility.Onboarding/api/Verification/refreshtoken',
          {
            refreshtoken: accessToken,
          },
        );

        // dispatch(setAuthUser(result.data.result));

        config.headers.Authorization = `Bearer ${result.data.result.accesssToken}`;
      }

      return new Promise((resolve, reject) => {
        Axios.request(config)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  );
};
*/
