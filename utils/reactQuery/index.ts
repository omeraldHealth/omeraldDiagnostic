import { QueryKey, useMutation, useQuery } from "react-query";

export async function useQueryGetData(queryKey:QueryKey,queryFunction:any) {
    return useQuery(queryKey, queryFunction);
}
  

export async function useQuerySetData(queryKey:QueryKey,queryFunction:any) {
    return useMutation(queryKey, queryFunction);
}
  