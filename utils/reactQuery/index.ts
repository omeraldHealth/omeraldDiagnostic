import axios, { AxiosError, AxiosResponse } from 'axios';
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryOptions } from 'react-query';
import { useAuthContext } from 'utils/context/auth.context';
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
  const formData = new FormData();

  return useMutation((data:any) => axios.post(uploadReportApi, formData.append('file',data), {
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