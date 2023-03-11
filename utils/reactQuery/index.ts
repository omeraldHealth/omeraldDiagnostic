import { useMutation, useQuery, UseQueryOptions } from 'react-query';

//useQuery hook to get data
export function useQueryGetData<T>(
  queryName: string,
  queryFn: any,
  options?: UseQueryOptions<T>
) {
  const queryKey = [queryName];
  return useQuery<T>(queryKey, queryFn, options);
}
//useQuery hook to set data
export function useQuerySetData<T>(
  queryName: string,
  queryFn: any,
) {
  const queryKey = [queryName];
  return useMutation<T>(queryKey, queryFn);
}

