import axios, { AxiosResponse } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import {
  createDiagBranchApi,
  createDiagnosticUserApi,
  createDiagProfileApi,
} from '../api';
import OnboardNewComponents from '@/components/onboard';

// useQuery hook to set data
interface UseMutationProps<TData, TVariables> {
  onSuccess?: (data: AxiosResponse<TData>) => void;
  onError?: (error: any) => void;
}

function createMutation<TData, TVariables>(
  method: 'put' | 'post' | 'delete',
  url: string,
  { onSuccess, onError }: UseMutationProps<TData, TVariables>,
): UseMutationResult<AxiosResponse<TData>, any, TVariables> {
  return useMutation(
    (variables: TVariables) =>
      axios[method]<TData>(url, method === 'delete' ? null : variables, {
        headers:
          method === 'post'
            ? { 'Content-Type': 'application/json' }
            : undefined,
      }),
    {
      onSuccess,
      onError,
    },
  );
}

export function useCreateUser<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
): UseMutationResult<AxiosResponse<TData>, any, TVariables> {
  return createMutation('post', createDiagnosticUserApi, props);
}

export function useCreateDiagnostic<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
): UseMutationResult<AxiosResponse<TData>, any, TVariables> {
  return createMutation('post', createDiagProfileApi, props);
}

export function useCreateDiagnosticBranch<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
): UseMutationResult<AxiosResponse<TData>, any, TVariables> {
  return createMutation('post', createDiagBranchApi, props);
}
