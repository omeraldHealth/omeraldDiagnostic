import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { updateDiagProfileApi, createDiagReportsApi, uploadDiagnosticReportApi, uploadDiagnosticLogoApi } from 'utils/urls/app';

// useQuery hook to get data
export function useQueryGetData<T>(
  queryName: string,
  query: string,
  options?: UseQueryOptions<T>
) {
  const queryKey = [queryName];
  return useQuery<T>(queryKey, () => axios.get(query), options);
}

// useQuery hook to set data
interface UseMutationProps<TData, TVariables> {
  onSuccess?: (data: AxiosResponse<TData>) => void;
  onError?: (error: any) => void;
}

function createMutation<TData, TVariables>(
  method: 'put' | 'post' | 'delete',
  url: string,
  { onSuccess, onError }: UseMutationProps<TData, TVariables>
) {
  return useMutation(
    (data: any) => axios[method](url, method === 'delete' ? null : data?.data, {
      headers: method === 'post' ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),
    {
      onSuccess,
      onError,
    }
  );
}

// Functions for different mutations
export function useUpdateDiagnostic<TData, TVariables>(props: UseMutationProps<TData, TVariables>) {
  return createMutation('put', updateDiagProfileApi, props);
}

export function useUpdateReports<TData, TVariables>(props: UseMutationProps<TData, TVariables>) {
  return createMutation('post', createDiagReportsApi, props);
}

export function useUploadReportFile<TData, TVariables>(props: UseMutationProps<TData, TVariables>) {
  return createMutation('post', uploadDiagnosticReportApi, props);
}

export function useUploadBranding<TData, TVariables>(props: UseMutationProps<TData, TVariables>) {
  return createMutation('post', uploadDiagnosticLogoApi, props);
}

export function useCreateReport<TData, TVariables>(props: UseMutationProps<TData, TVariables>) {
  return createMutation('post', createDiagReportsApi, props);
}
