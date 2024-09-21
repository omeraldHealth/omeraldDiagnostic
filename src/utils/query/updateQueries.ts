import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { updateDiagnosticUserApi } from "../api";



interface UseMutationProps<TData, TVariables> {
    onSuccess?: (data: AxiosResponse<TData>) => void;
    onError?: (error: any) => void;
}
  
function UpdateMutation<TData, TVariables>(
    method: "put",
    url: string,
    { onSuccess, onError }: UseMutationProps<TData, TVariables>,
  ) {
    return useMutation(
      (data: any) =>
        axios[method](url + data?.recordId, data?.data, {
          headers: { "Content-Type": "application/json" },
        }),
      {
        onSuccess,
        onError,
      },
    );
}
  
export function useUpdateUser<TData, TVariables>(
    props: UseMutationProps<TData, TVariables>,
  ) {
    return UpdateMutation("put", updateDiagnosticUserApi, props);
}