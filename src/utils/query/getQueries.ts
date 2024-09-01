import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { getDiagnosticUserApi, getDiagnosticSetting } from '@/utils/api/index';
import axios from 'axios';

export function useQueryGetData<T>(
  queryName: string,
  query: string,
  options?: UseQueryOptions<T>,
) {
  const queryKey = [queryName];
  return useQuery<T>(queryKey, () => axios.get(query), options);
}

export function useGetDCInfo({ userPhoneNumber }: any) {
  return useQueryGetData('dcInfo', getDiagnosticSetting);
}

export function useGetUser({ userPhoneNumber }: any) {
  return useQueryGetData('userData', getDiagnosticUserApi + userPhoneNumber, {
    enabled: !!userPhoneNumber,
  });
}

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: string) => {
    queryClient.invalidateQueries(queryKey);
  };

  return invalidateQuery;
}
