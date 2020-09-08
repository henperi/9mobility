import { AxiosError } from 'axios';
import { logger } from './logger';

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

export const handleAxiosError = (error: AxiosError<Error1 | Error2>) => {
  let errorRes = {
    responseCode: 0,
    message: '',
  };

  if (error.response) {
    if ((error.response?.data as Error1)?.status) {
      errorRes = {
        responseCode: (error.response?.data as Error1).status,
        message: Object.values((error.response?.data as Error1).errors)[0][0],
      };

      logger.log(errorRes, 'Error1');
    }

    if ((error.response?.data as Error2)?.message) {
      errorRes = {
        responseCode: (error.response?.data as Error2).responseCode,
        message: (error.response?.data as Error2).message,
      };

      logger.log(errorRes, 'Error2');
    }
  }

  return errorRes;
};
