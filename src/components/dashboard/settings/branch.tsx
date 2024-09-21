//@ts-nocheck
import { useActivityLogger } from "@/components/common/activity";
import { successAlert } from "@/components/common/alerts";
import { usePersistedBranchState, usePersistedDCState } from "@/hooks/localstorage";
import { BRANCH_DETAILS_COLUMNS } from "@/utils/forms/forms";
import { useDeleteBranch } from "@/utils/query/deleteQueries";
import { useInvalidateQuery } from "@/utils/query/getQueries";
import { useUpdateDiagnostic, useUpdateUser } from "@/utils/query/updateQueries";
import { profileState } from "@/utils/recoil";
import { useCurrentBranch, useDCProfileValue } from "@/utils/recoil/values";
import { CommonSettingTable } from "@/utils/table";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

function BranchTab() {
  const [isAddBranchMode, setIsAddBranchMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [branchId, setBranchId] = useState("");

  const [selectedBranch] = usePersistedBranchState();
  const [selectedDc] = usePersistedDCState();
  const currentBranch = useCurrentBranch();
  const profileValue = useDCProfileValue();

  const updateProfile = useUpdateDiagnostic({});
  const updateUser = useUpdateUser({});
  const deleteBranch = useDeleteBranch({});
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();
  const setProfileData = useSetRecoilState(profileState);

  useEffect(() => {
    invalidateQuery("diagnosticCenter");
  }, [invalidateQuery]);

  const handleSwitchChange = (checked: boolean) => setIsAddBranchMode(checked);

  const handleEditBranchMode = (value: boolean) => {
    setIsEditMode(value);
    setIsAddBranchMode(value);
  };

  const handleEditBranch = (record: any) => {
    setBranchId(record?._id);
    setIsEditMode(true);
    setIsAddBranchMode(true);
  };

  const updateProfileAfterDeletion = (record: any) => {
    const updatedBranches = profileValue?.branches?.filter(
      (branch) => branch?._id !== record?._id
    );

    updateProfile.mutate(
      { data: { branches: updatedBranches }, recordId: selectedDc },
      {
        onSuccess: (resp) => {
          invalidateQuery("diagnosticCenter");
          setProfileData(resp?.data);
          successAlert("Branch Deleted Successfully");
          logActivity({ activity: `Deleted Branch: ${record?.branchName}` });
        },
      }
    );
  };

  const handleDeleteBranch = (record: any) => {
    deleteBranch.mutate(
      { recordId: record?._id },
      {
        onSuccess: () => updateProfileAfterDeletion(record),
        onError: () => {
          // Handle error if needed
        },
      }
    );
  };

  const columns = BRANCH_DETAILS_COLUMNS({
    selectedBranch,
    currentBranch,
    handleEdit: handleEditBranch,
    handleDelete: handleDeleteBranch,
  });

  return (
    <div className="branch-tab">
      <section className="my-2 py-2 flex justify-end">
        <Switch
          checked={isAddBranchMode}
          onChange={handleSwitchChange}
          checkedChildren="Add"
          unCheckedChildren="View"
          style={{ backgroundColor: "orange" }}
        />
      </section>

      {!isAddBranchMode ? (
        <CommonSettingTable data={profileValue?.branches} columns={columns} />
      ) : isEditMode ? (
        <></> 
        // Uncomment the below component when needed
        // <UpdateBranch handleEditBranch={handleEditBranchMode} branchId={branchId} />
      ) : (
        <></> 
        // Uncomment the below component when needed
        // <AddBranch handleShowBranch={setIsAddBranchMode} />
      )}
    </div>
  );
}

export default BranchTab;
