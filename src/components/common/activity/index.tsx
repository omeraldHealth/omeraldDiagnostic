import { usePersistedBranchState } from '@/hooks/localstorage';
import { useGetDcBranch } from '@/utils/query/getQueries';
import { useUpdateBranch } from '@/utils/query/updateQueries';
import { useUserRecoilValue } from '@/utils/recoil/values';
import { useEffect } from 'react';

export function useActivityLogger() {
  const user = useUserRecoilValue();
  const [selectedBranch] = usePersistedBranchState();
  const {
    data: branchData,
    isLoading,
    refetch,
  } = useGetDcBranch({ selectedBranchId: selectedBranch });
  const updateBranch = useUpdateBranch({});

  useEffect(() => {
    // Refetch branch data when component mounts
    refetch();
  }, [refetch]);

  const logActivity = async ({ activity }: any) => {
    if (isLoading) {
      console.warn('Branch data is still loading. Please wait.');
      return;
    }

    try {
      const newActivity = { activity, user: user?._id };
      const activities = [...(branchData?.data?.activities || []), newActivity];

      await updateBranch.mutateAsync({
        data: { activities },
        recordId: selectedBranch,
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return logActivity;
}
