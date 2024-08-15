// @ts-nocheck
import { useEffect } from "react";
import {
  useGetDcBranch,
  useGetDcProfile,
  useInvalidateQuery,
  useUpdateBranch,
  useUpdateDiagnostic,
} from "@utils/reactQuery";
import { useCurrentBranchValue, useUserValues } from "../constants/recoilValues";
import {
  usePersistedBranchState,
  usePersistedDCState,
} from "../recoil/hooks/usePersistedState";

export function useActivityLogger() {
  const user = useUserValues()
  const [selectedBranch] = usePersistedBranchState();
  const { data: branchData, isLoading, refetch } = useGetDcBranch({ selectedBranchId: selectedBranch });
  const updateBranch = useUpdateBranch({});

  useEffect(() => {
    // Refetch branch data when component mounts
    refetch();
  }, [refetch]);

  const logActivity = async ({ activity }) => {
    if (isLoading) {
      console.warn("Branch data is still loading. Please wait.");
      return;
    }
    
    try {
      const newActivity = { activity, user: user?._id };
      const activities = [...(branchData?.data?.activities || []), newActivity];

      await updateBranch.mutateAsync({
        data: { activities },
        recordId: selectedBranch,
      });

      console.log("Activity logged successfully");
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return logActivity;
}
