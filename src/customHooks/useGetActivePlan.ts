import { useFetch } from './useRequests';

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
