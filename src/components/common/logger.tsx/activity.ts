import { useUpdateDiagnostic } from '@utils/reactQuery';
import { useCurrentBranchValue, useProfileValue, useUserValues } from '../constants/recoilValues';
import { usePersistedBranchState } from '../recoil/hooks/usePersistedState';

// Example activity logger hook
export function useActivityLogger() {
    const profileValue = useProfileValue()
    const currentBranch = useCurrentBranchValue()
    const user = useUserValues()
    const updateProfile = useUpdateDiagnostic({})
    const [selectedBranch] = usePersistedBranchState()

    const logActivity = ({ activity }) => {
            const activities = {
                activity,
                user,
            }
            const updatedBranch = {...currentBranch, activities: currentBranch?.activities.push(activities) }
            const updatedDiagnosticCenters = profileValue?.branches?.map((branch) => {
                if (branch?._id === selectedBranch) {
                    return updatedBranch
                }
                return branch;
            });

            updateProfile.mutate({data: {branches: updatedDiagnosticCenters, recordId: profileValue?._id}},{
                onSuccess:(resp)=>{},
                onError:(err)=>{},
            })
    };

  return logActivity;
}
