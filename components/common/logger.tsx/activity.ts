import { useGetDcProfile, useUpdateDiagnostic } from "utils/reactQuery";
import { useProfileValue, useUserValues } from "../constants/recoilValues";
import { successAlert } from "@components/atoms/alerts/alert";

export const useActivityLogger = () => {
    const selectedCenterId = localStorage.getItem("selectedDc");
    const userData = useUserValues();
    const { data: profileData } = useGetDcProfile(selectedCenterId);

    const updateProfile = useUpdateDiagnostic({
        onSuccess: () => {
            // successAlert("Activity logged successfully");
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
        },
    }, profileData?.data?._id);

    const logActivity = async (activity) => {
        const selectedBranch = JSON.parse(localStorage.getItem("selectedBranch"));

        if (!selectedBranch) {
            console.error("No selectedBranch found in localStorage");
            return;
        }

        const updatedActivity = {
            user: { id: userData?._id, name: userData?.userName },
            activity: activity,
        };

        selectedBranch.activities = selectedBranch.activities || [];
        selectedBranch.activities.push(updatedActivity);
        localStorage.setItem("selectedBranch", JSON.stringify(selectedBranch));

        const updatedBranches = profileData?.data?.branches.map(branch => {
            if (branch._id === selectedBranch._id) {
                return selectedBranch;
            }
            return branch;
        });

        try {
            const updatedProfile = { data: { branches: updatedBranches } };
            updateProfile.mutate(updatedProfile);
        } catch (error) {
            console.error("Error logging activity:", error);
        }
    };

    return { logActivity };
};
