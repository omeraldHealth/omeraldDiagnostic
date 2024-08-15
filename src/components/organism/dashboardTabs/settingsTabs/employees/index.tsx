// @ts-nocheck

import { errorAlert, warningAlert2 } from "@components/atoms/alerts/alert";
import {
  useCurrentBranchValue,
  useProfileValue,
} from "@components/common/constants/recoilValues";
import {
  usePersistedBranchState,
  usePersistedDCState,
} from "@components/common/recoil/hooks/usePersistedState";
import {
  useInvalidateQuery,
  useUpdateDiagnostic,
  useUpdateUser,
} from "@utils/reactQuery";
import { Switch } from "antd";
import { useState } from "react";
import { removeBranchById } from "../utils/functions";
import { CommonSettingTable } from "../utils/table";
import { BRANCH_EMPLOYEE_COLUMNS } from "../utils/tabs";
import AddEmployee from "./create";
import UpdateEmployee from "./create/update";

export const EmployeesTab = () => {
  const [addBranch, setAddBranch] = useState(false);
  const [selectedBranch] = usePersistedBranchState();
  const [selectedDc] = usePersistedDCState();
  const [isEdit, setIsEdit] = useState(false);
  const [operatorId, setOperatorId] = useState("");
  const currentBranch = useCurrentBranchValue();
  const profileValue = useProfileValue();
  const updateProfile = useUpdateDiagnostic({});
  const updateUser = useUpdateUser({});
  const invalidateQuery = useInvalidateQuery();
  // const logActivity = useActivityLogger()

  const handleSwitch = (checked: boolean) => setAddBranch(checked);

  const handleEditEmployee = (value: boolean) => {
    setIsEdit(value);
    setAddBranch(value);
  };

  const handleEdit = (record: any) => {
    setOperatorId(record?._id);
    setIsEdit(true);
    setAddBranch(true);
  };

  const handleDelete = (record: any) => removeUserFromBranch(record);

  const removeUserFromBranch = (record: any) => {
    const updatedBranch = {
      ...currentBranch,
      branchOperator: currentBranch?.branchOperator?.filter(
        (op) => op?._id !== record?._id,
      ),
    };

    const updatedBranches = profileValue?.branches?.map((branch) =>
      branch?._id === updatedBranch?._id ? updatedBranch : branch,
    );

    updateProfile.mutate(
      {
        data: { branches: updatedBranches },
        recordId: profileValue?._id,
      },
      {
        onSuccess: (resp) => {
          if (resp.status === 200) {
            warningAlert2("Deleted Employee successfully");
          }
          removeBranchFromUser(record);
        },
      },
    );
  };

  const removeBranchFromUser = (record: any) => {
    const updatedDiagCenters = removeBranchById(
      record,
      selectedDc,
      currentBranch?._id,
    );
    updateUser.mutate(
      {
        data: { diagnosticCenters: updatedDiagCenters },
        recordId: record?._id,
      },
      {
        onSuccess: (resp) => {
          if (resp.status === 200) {
            invalidateQuery("userData");
            invalidateQuery("diagnosticCenter");
            // logActivity({activity: "Delete User "+record?.userName})
          }
        },
        onError: () => errorAlert("Updating Employee failed"),
      },
    );
  };

  const columns = BRANCH_EMPLOYEE_COLUMNS({
    selectedBranch,
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
        <CommonSettingTable
          data={currentBranch?.branchOperator}
          columns={columns}
        />
      ) : isEdit ? (
        <UpdateEmployee
          handleEditEmployee={handleEditEmployee}
          operatorId={operatorId}
        />
      ) : (
        <AddEmployee handleShowBranch={setAddBranch} />
      )}
    </div>
  );
};
