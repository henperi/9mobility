import { useEffect, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import httpService from '../services/htttpService';
import { handleAxiosError } from '../utils/handleAxiosError';

interface Error1 {
  errors: {
    [x: string]: string[];
  };
  status: number;
  title: string;
  traceId: string;
  type: string;
}

interface Error2 {
  message: string;
  responseCode: number;
}

/**
 * This is a custom hook that is used to make api get requests
 * @param url
 *
 * @returns an object containg error, loading and data
 */
export function useFetch<T>(url: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState();

  useEffect(() => {
    httpService
      .get(url)
      .then((result: AxiosResponse<T>) => {
        setLoading(false);
        setData(result.data);
      })
      .catch((err) => setError(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { loading, data, error };
}

/**
 * This is a custom hook that is used to make a lazy api get requests
 * @param url
 *
 * @returns the lazy [method] to call
 */
export function useLazyFetch<T>(url: string) {
  const callService = async () => {
    return httpService.get(url).then((result: AxiosResponse<T>) => {
      return { loading: false, data: result.data };
    });
  };

  return [callService];
}

/**
 * This is a custom hook that is used to make a lazy api post request
 * @param url: the url to post to
 * @param data the data to post
 *
 * @returns the lazy [method] to call
 */
export function usePost<T>(url: string, data?: any) {
  const callService = async (serviceData?: any) => {
    return httpService
      .post(url, data || serviceData)
      .then((result: AxiosResponse<T>) => {
        return { loading: false, data: result.data };
      })
      .catch((error: AxiosError<Error1 | Error2>) => {
        const errorRes = handleAxiosError(error);

        throw errorRes;
      });
  };

  return [callService];
}
