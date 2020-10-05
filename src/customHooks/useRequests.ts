import { useCallback, useEffect, useState } from 'react';
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

interface IParam {
  [x: string]: string | number;
}
const concatParams = (params?: IParam) => {
  let result = '';

  if (params) {
    const resultString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    if (resultString) {
      result = `?${resultString}`;
    }
  }

  return result;
};

// concatParams();

/**
 * This is a custom hook that is used to make api get requests
 * @param url
 * @param params
 *
 * @returns an object containg error, loading and data
 */
export function useFetch<T>(url: string, params?: IParam) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<{
    responseCode: number;
    message: string;
  } | null>(null);

  const refetch = useCallback(
    (fetchParams = params) =>
      httpService
        .get(url + concatParams(fetchParams))
        .then((result: AxiosResponse<T>) => {
          setLoading(false);
          setData(result.data);
        })
        .catch((err) => {
          const errorRes = handleAxiosError(err);
          setError(errorRes);
          setLoading(false);
        }),
    [params, url],
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { loading, data, error, refetch };
}

/**
 * This is a custom hook that is used to make a lazy api get requests
 * @param url
 * @param params
 *
 * @returns the lazy [method] to call
 */
export function useLazyFetch<T>(url: string, params?: IParam) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [errorResponse, setErrorResponse] = useState<{
    responseCode: number;
    message: string;
  } | null>(null);

  const callService = useCallback(
    async (fetchParams = params) => {
      setLoading(true);
      setErrorResponse(null);

      return httpService
        .get(url + concatParams(fetchParams))
        .then((result: AxiosResponse<T>) => {
          setLoading(false);
          setData(result.data);

          return { loading: false, data: result.data, error: null };
        })
        .catch((error: AxiosError<Error1 | Error2>) => {
          const errorRes = handleAxiosError(error);
          setErrorResponse(errorRes);
          setLoading(false);

          throw errorRes;
        });
    },
    [params, url],
  );

  const response = { loading, data, error: errorResponse };
  return [callService, response] as const;
}

/**
 * This is a custom hook that is used to make a lazy api post request
 * @param url: the url to post to
 * @param payload the data to post
 *
 * @returns the lazy [method] to call
 */
export function usePost<T>(url: string, payload?: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [errorResponse, setErrorResponse] = useState<{
    responseCode: number;
    message: string;
  } | null>(null);

  const callService = async (serviceData = payload) => {
    setLoading(true);
    setErrorResponse(null);

    return httpService
      .post(url, serviceData)
      .then((result: AxiosResponse<T>) => {
        setLoading(false);
        setData(result.data);

        return {
          loading: false,
          data: result.data,
          error: null,
          config: result.config,
        };
      })
      .catch((error: AxiosError<Error1 | Error2>) => {
        const errorRes = handleAxiosError(error);
        setErrorResponse(errorRes);
        setLoading(false);

        throw errorRes;
      });
  };

  const response = { loading, data, error: errorResponse };
  return [callService, response] as const;
}
