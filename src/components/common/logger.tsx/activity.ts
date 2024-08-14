import { useGetDcProfile, useInvalidateQuery, useUpdateDiagnostic } from '@utils/reactQuery';
import { useCurrentBranchValue, useProfileValue, useUserValues } from '../constants/recoilValues';
import { usePersistedBranchState, usePersistedDCState } from '../recoil/hooks/usePersistedState';
import { useEffect } from 'react';

// Example activity logger hook
export function useActivityLogger() {
    const profileValue = useProfileValue();
    const user = useUserValues();
    const updateProfile = useUpdateDiagnostic({});
    const [selectedBranch] = usePersistedBranchState();
    const [ selectedDc ] = usePersistedDCState();
    const {data: profileData, isLoading, refetch} = useGetDcProfile({selectedCenterId: selectedDc})
    const invalidateQuery  = useInvalidateQuery()

    useEffect(()=>{
        refetch()
    },[])

    const logActivity = ({ activity }) => {
        try {
            const currentBranch = profileData?.data?.branches.find((branch) => branch?._id === selectedBranch)
            if(profileData?.data){
                 // Create the new activity object
            const newActivity = {
                activity,
                user: user?._id
            };

            // Create a new branch object with the updated activities
            const updatedBranch = {
                ...currentBranch,
                activities: [...(currentBranch?.activities || []), newActivity],
            };

            // Update the branches array in the profile by replacing the selected branch with the updated branch
            const updatedBranches = profileData?.data?.branches?.map((branch) => {
                return branch?._id === selectedBranch ? updatedBranch : branch;
            });

            // Perform the mutation to update the profile with the new branches data
            updateProfile.mutate(
                { data: { branches: updatedBranches }, recordId: selectedDc },
                {
                    onSuccess: () => {
                        invalidateQuery("diagnosticCenter")
                        // console.log("Activity logged successfully");
                    },
                    onError: (err) => {
                        console.error("Failed to log activity:", err);
                    },
                }
            );
            }
           
        } catch (error) {
            console.error("Error logging activity:", error);
        }
    };

    return logActivity;
}
