import { useEffect, useState } from 'react';

import { useFetch } from './useRequests';

export interface MobileNumbersResp {
  result: {
    mobileNumber: string;
    networkName: string;
    isActive: boolean;
  }[];
  responseCode: number;
  message: string;
}

export const useGetMobileNumbers = () => {
  const { data, loading, error, refetch } = useFetch<MobileNumbersResp>(
    'Mobility.Onboarding/api/Onboarding/getsims',
  );

  const [mobileNumbers, setmobileNumbers] = useState<
    {
      label: string;
      value: string;
    }[]
  >();

  useEffect(() => {
    if (data?.result) {
      const result = data?.result.map((number) => ({
        label: number.mobileNumber,
        value: number.mobileNumber,
      }));

      setmobileNumbers(result);
    }
  }, [data]);

  return { mobileNumbers, loading, error, data, refetch };
};
