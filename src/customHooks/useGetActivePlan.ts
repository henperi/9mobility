import { useFetch, useLazyFetch } from './useRequests';

export interface ActivePlan {
  result: {
    id: string;
    name: string;
    description: string;
    icon: string;
    isRoamingEnabled: boolean;
    amount: string;
    frequency: string;
  };
}

export const useGetActivePlan = () => {
  const { data, loading, error, refetch } = useFetch<ActivePlan>(
    'Mobility.Account/api/Plans/GetActivePlan',
  );

  return { data, loading, error, refetch };
};

export const useLazyGetActivePlan = () => {
  const [refetch, { data, loading, error }] = useLazyFetch<ActivePlan>(
    'Mobility.Account/api/Plans/GetActivePlan',
  );

  return { data, loading, error, refetch };
};
