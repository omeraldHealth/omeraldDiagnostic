// @ts-nocheck

import {
  errorAlert,
  successAlert,
  warningAlert2,
} from "@components/atoms/alerts/alert";
import {
  useCurrentBranchValue,
  useProfileValue,
} from "@components/common/constants/recoilValues";
import {
  usePersistedBranchState,
  usePersistedDCState,
} from "@components/common/recoil/hooks/usePersistedState";
import {
  useDeleteBranch,
  useDeleteReports,
  useInvalidateQuery,
  useUpdateDiagnostic,
  useUpdateUser,
} from "@utils/reactQuery";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { removeBranchById } from "../utils/functions";
import { CommonSettingTable } from "../utils/table";
import { BRANCH_DETAILS_COLUMNS } from "../utils/tabs";
import AddBranch from "./create";
import { useActivityLogger } from "@components/common/logger.tsx/activity";
import { useSetRecoilState } from "recoil";
import { profileState } from "@components/common/recoil/profile";
import UpdateBranch from "./create/update";

function BranchTab() {
  const [addBranch, setAddBranch] = useState(false);
  const [selectedBranch] = usePersistedBranchState();
  const [selectedDc] = usePersistedDCState();
  const [isEdit, setIsEdit] = useState(false);
  const [branchId, setBranchId] = useState("");
  const currentBranch = useCurrentBranchValue();
  const profileValue = useProfileValue();
  const updateProfile = useUpdateDiagnostic({});
  const updateUser = useUpdateUser({});
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();
  const setProfileData = useSetRecoilState(profileState);

  const deleteBranch = useDeleteBranch({});

  useEffect(() => {
     invalidateQuery("diagnosticCenter");
  }, []);

  const handleSwitch = (checked: boolean) => setAddBranch(checked);

  const handleEditBranch = (value: boolean) => {
    setIsEdit(value);
    setAddBranch(value);
  };

  const handleEdit = (record: any) => {
    setBranchId(record?._id);
    setIsEdit(true);
    setAddBranch(true);
  };

  const handleUpdateProfile = (record) => {
    const branches = profileValue?.branches.filter(
      (profil) => profil?._id !== record?._id,
    );
    updateProfile?.mutate(
      { data: { branches }, recordId: selectedDc },
      {
        onSuccess: (resp) => {
          invalidateQuery("diagnosticCenter");
          setProfileData(resp?.data);
          successAlert("Branch Deleted Successfully");
          logActivity({ activity: "Delete Branch " + record?.branchName });
        },
      },
    );
  };

  const handleDelete = (record: any) => {
    deleteBranch.mutate(
      { recordId: record?._id },
      {
        onSuccess: (resp) => {
          handleUpdateProfile(record);
        },
        onError: (resp) => {},
      },
    );
  };

  const columns = BRANCH_DETAILS_COLUMNS({
    selectedBranch,
    currentBranch,
    handleEdit,
    handleDelete,
  });

  return (
    <div className="sdsa">
      <section className="my-2 py-2 flex justify-end">
        <Switch
          checked={addBranch}
          style={{ backgroundColor: "orange" }}
          onChange={handleSwitch}
          checkedChildren="Add"
          unCheckedChildren="View"
        />
      </section>
      {!addBranch ? (
        <CommonSettingTable data={profileValue?.branches} columns={columns} />
      ) : isEdit ? (
        <UpdateBranch handleEditBranch={handleEditBranch} branchId={branchId} />
      ) : (
        <AddBranch handleShowBranch={setAddBranch} />
      )}
    </div>
  );
}

export default BranchTab;
