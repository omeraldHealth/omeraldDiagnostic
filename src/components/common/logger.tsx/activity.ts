import { useUpdateDiagnostic } from '@utils/reactQuery';
import { useCurrentBranchValue, useProfileValue } from '../constants/recoilValues';

// Example activity logger hook
export function useActivityLogger() {
    const profileValue = useProfileValue()
    const currentBranch = useCurrentBranchValue()

    const updateProfile = useUpdateDiagnostic({})

    const logActivity = ({ activity, user }) => {
            const activities = {
                activity,
                user,
            }
            const updatedActivities = {...currentBranch, activities: currentBranch?.activities.push(activities) }
            const updatedBranches = {...profileValue, branches: 
                profileValue?.branches((branch) => {
                    if(branch?._id === updatedActivities?._id){
                        return updatedActivities
                    }
                    return branch
                })
            }

            updateProfile.mutate({data: {branches: updatedBranches, recordId: profileValue?._id}},{
                onSuccess:(resp)=>{},
                onError:(err)=>{},
            })
    };

  return logActivity;
}
