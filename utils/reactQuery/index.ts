import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { updateDiagnosticUserApi,insertReportApi, uploadReportApi } from 'utils/urls/app';

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
interface UseMutationProps<TData, TVariables> {
  onSuccess?: (data: AxiosResponse<TData>) => void;
  onError?: (error: any) => void;
}

export function useUpdateDiagnostic<TData, TVariables>({
  onSuccess,
  onError,
}: UseMutationProps<TData, TVariables>) {
  return useMutation(
    (data:any) => axios.post(updateDiagnosticUserApi+data?.phoneNumber, data?.data), 
    {
      onSuccess: onSuccess,
      onError: onError,
    },
    
  );
}

export function useUpdateReports<TData, TVariables>({
  onSuccess,
  onError,
}: UseMutationProps<TData, TVariables>) {
  return useMutation(
    (data:any) => axios.post(insertReportApi, data), 
    {
      onSuccess: onSuccess,
      onError: onError,
    },
    
  );
}

export function useUploadReportFile<TData, TVariables>({
  onSuccess,
  onError,
}: UseMutationProps<TData, TVariables>) {
  return useMutation((data:any) => axios.post(uploadReportApi,data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }}
    ), 
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );
}