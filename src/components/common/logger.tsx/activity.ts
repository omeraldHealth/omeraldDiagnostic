import { useEffect } from "react";
import {
  useGetDcProfile,
  useInvalidateQuery,
  useUpdateDiagnostic,
} from "@utils/reactQuery";
import { useUserValues } from "../constants/recoilValues";
import {
  usePersistedBranchState,
  usePersistedDCState,
} from "../recoil/hooks/usePersistedState";
import { useUpdatedBranch } from "@components/organism/dashboardTabs/utils";

export function useActivityLogger() {
  const user = useUserValues();
  const updateProfile = useUpdateDiagnostic({});
  const [selectedBranch] = usePersistedBranchState();
  const [selectedDc] = usePersistedDCState();
  const { data: profileData, refetch } = useGetDcProfile({
    selectedCenterId: selectedDc,
  });
  const invalidateQuery = useInvalidateQuery();
  const updateCurrentBranch = useUpdatedBranch();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const logActivity = ({ activity }) => {
    try {
      const currentBranch = profileData?.data?.branches.find(
        (branch) => branch._id === selectedBranch,
      );
      if (!currentBranch) return;

      const newActivity = { activity, user: user?._id };
      const updatedBranch = {
        ...currentBranch,
        activities: [...(currentBranch?.activities || []), newActivity],
      };
      const updatedBranches = profileData?.data?.branches?.map((branch) =>
        branch._id === selectedBranch ? updatedBranch : branch,
      );
      console.log(activity);
      console.log(updatedBranches);
      updateProfile.mutate(
        { data: { branches: updatedBranches }, recordId: selectedDc },
        {
          onSuccess: (resp) => {
            console.log(resp);
            updateCurrentBranch(resp?.data);
          },
          onError: (err) => console.error("Failed to log activity:", err),
        },
      );
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return logActivity;
}
