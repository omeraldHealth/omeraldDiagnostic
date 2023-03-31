import axios from 'axios';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';

//useQuery hook to get data
export function useQueryGetData<T>(
  queryName: string,
  query: string,
  options?: UseQueryOptions<T>
) {
  const queryKey = [queryName];
  return useQuery<T>(queryKey, () => { return axios.get(query)}, options);
}
//useQuery hook to set data
export function useQuerySetData<T>(
  queryName: string,
  queryFn: any,
) {
  const queryKey = [queryName];
  return useMutation<T>(queryKey, queryFn);
}

