import Axios, { AxiosInstance } from 'axios';
import { AuthUser } from '../store/modules/auth/interface';
import { OnboardingAuthResponse } from '../pages/OnboardingPage/ConfirmOTP';
import { setAuthUser, removeAuthUser } from '../store/modules/auth/actions';
import { useGlobalStore } from '../store';
import { logger } from '../utils/logger';
import { initialState } from '../store/modules';

export const useInterceptor = async (
  httpService: AxiosInstance,
  state: typeof initialState,
  router: any,
) => {
  const { dispatch } = useGlobalStore();

  httpService.interceptors.response.use(
    (response) => {
      // Return a successful response back to the calling service
      return response;
    },
    async (error) => {
      // Return any error which is not due to authentication back to the calling service
      if (error.response.status !== 401) {
        return new Promise((_, reject) => {
          reject(error);
        });
      }

      // console.log(error.response.status);

      // Logout user if token refresh didn't work or user is disabled
      if (
        error.config.url ===
          'Mobility.Onboarding/api/Verification/refreshtoken' ||
        error.response.message === 'Account is disabled.'
      ) {
        logger.log('failed to refresh');

        dispatch(removeAuthUser());
        router.push('/');

        return new Promise((_, reject) => {
          reject(error);
        });
      }

      const { config } = error;

      if (state.auth.user) {
        logger.log('state.auth.user', state.auth.user);
        try {
          const result = await Axios.post<OnboardingAuthResponse>(
            'http://40.76.69.211/Mobility.Onboarding/api/Verification/refreshtoken',
            {
              refreshToken: state.auth.user.accesssToken,
            },
          );

          dispatch(setAuthUser(result.data.result));

          // config.headers.Authorization = `Bearer ${result.data.result.accesssToken}`;
        } catch (err) {
          logger.log(err);
        }
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
