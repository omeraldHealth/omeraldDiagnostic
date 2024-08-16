import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import {
  updateDiagProfileApi,
  createDiagReportsApi,
  uploadDiagnosticReportApi,
  uploadDiagnosticLogoApi,
  createDiagProfileApi,
  deleteDiagReportsApi,
  createDiagnosticUserApi,
  updateDiagnosticUserApi,
  getDiagnosticUserApi,
  getDiagnosticSetting,
  getDiagProfileByIdApi,
  createDiagBranchApi,
  getDiagBranchByIdApi,
  updateDiagBranchApi,
  deleteDiagBranchApi,
  uploadPathSignature,
  deleteDiagTestApi,
  getAdminReportTypesApi,
} from "@utils/urls/app";

// useQuery hook to get data
export function useQueryGetData<T>(
  queryName: string,
  query: string,
  options?: UseQueryOptions<T>,
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
  method: "put" | "post" | "delete",
  url: string,
  { onSuccess, onError }: UseMutationProps<TData, TVariables>,
) {
  return useMutation(
    (data: any) =>
      axios[method](url, method === "delete" ? null : data?.data, {
        headers:
          method === "post"
            ? { "Content-Type": "application/json" }
            : undefined,
      }),
    {
      onSuccess,
      onError,
    },
  );
}

// Functions for different mutations
export function useGetUser({ userPhoneNumber }: any) {
  return useQueryGetData("userData", getDiagnosticUserApi + userPhoneNumber, {
    enabled: !!userPhoneNumber,
  });
}

export function useGetAdminReports() {
  return useQueryGetData("adminReports", getAdminReportTypesApi);
}

export function useGetDcProfile({ selectedCenterId }: any) {
  return useQueryGetData(
    "diagnosticCenter",
    getDiagProfileByIdApi + selectedCenterId,
    { enabled: !!selectedCenterId },
  );
}

export function useGetDcBranch({ selectedBranchId }: any) {
  return useQueryGetData(
    "diagnosticBranch",
    getDiagBranchByIdApi + selectedBranchId,
    { enabled: !!selectedBranchId },
  );
}

export function useGetDcSettings() {
  return useQueryGetData("diagnosticSettings", getDiagnosticSetting);
}

export function useCreateUser<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("post", createDiagnosticUserApi, props);
}

// update
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

export function useCreateDiagnostic<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("post", createDiagProfileApi, props);
}

export function useCreateDiagnosticBranch<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("post", createDiagBranchApi, props);
}

export function useUpdateDiagnostic<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation("put", updateDiagProfileApi, props);
}

export function useUpdateBranch<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation("put", updateDiagBranchApi, props);
}

export function useDeleteReports<TData, TVariables>(
  id: string,
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("delete", deleteDiagReportsApi + id, props);
}

export function useCreatePathSignature<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("post", uploadPathSignature, props);
}

// Delete

function deleteMutation<TData, TVariables>(
  method: "delete",
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
  return deleteMutation("delete", deleteDiagBranchApi, props);
}

export function useDeleteTest<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return deleteMutation("delete", deleteDiagTestApi, props);
}


export function useUploadReportFile<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("post", uploadDiagnosticReportApi, props);
}

export function useUploadBranding<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("post", uploadDiagnosticLogoApi, props);
}

export function useCreateReport<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return createMutation("post", createDiagReportsApi, props);
}

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: string) => {
    queryClient.invalidateQueries(queryKey);
  };

  return invalidateQuery;
}
