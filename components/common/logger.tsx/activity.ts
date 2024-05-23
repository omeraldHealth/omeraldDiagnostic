import { useGetDcProfile, useUpdateDiagnostic } from "utils/reactQuery";
import { useCurrentBranchValue, useProfileValue, useUserValues } from "../constants/recoilValues";
import { successAlert } from "@components/atoms/alerts/alert";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { branchState } from "../recoil/branch/branch";

export const useActivityLogger = () => {
    let selectedCenterId = localStorage.getItem("selectedDc") ?? {};
    const userData = useUserValues();
    const { data: profileData } = useGetDcProfile(selectedCenterId);

    const updateProfile = useUpdateDiagnostic({
        onSuccess: () => {
            // successAlert("Activity logged successfully");
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
        },
    },selectedCenterId);

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

export const useCurrentBranch = () => {
    const currentBranch = useCurrentBranchValue()
    const setCurrentBranch = useSetRecoilState(branchState)

    const updateCurrentBranch = async (profileData) => {
        let updatedBranch = profileData?.branches.find((branch) => branch?._id === currentBranch?._id); 
        localStorage.setItem("selectedBranch", JSON.stringify(updatedBranch))
        console.log(updatedBranch)
        setCurrentBranch(updatedBranch)
        successAlert('Current Branch updated successfully');
    };

    return { updateCurrentBranch };

};