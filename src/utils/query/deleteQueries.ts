import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { deleteDiagBranchApi } from '../api';

// useQuery hook to set data
interface UseMutationProps<TData, TVariables> {
  onSuccess?: (data: AxiosResponse<TData>) => void;
  onError?: (error: any) => void;
}

function deleteMutation<TData, TVariables>(
  method: 'delete',
  url: string,
  { onSuccess, onError }: UseMutationProps<TData, TVariables>,
) {
  return useMutation((data: any) => axios[method](url + data?.recordId), {
    onSuccess,
    onError,
  });
}

export function useDeleteBranch<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return deleteMutation('delete', deleteDiagBranchApi, props);
}
