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
  useUpdateBranch,
  useUpdateDiagnostic,
  useUpdateUser,
} from "@utils/reactQuery";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { removeBranchById } from "../utils/functions";
import { CommonSettingTable } from "../utils/table";
import { BRANCH_EMPLOYEE_COLUMNS } from "../utils/tabs";
import AddEmployee from "./create";
import UpdateEmployee from "./create/update";
import { useActivityLogger } from "@components/common/logger.tsx/activity";

export const EmployeesTab = () => {
  const [addBranch, setAddBranch] = useState(false);
  const [selectedDc] = usePersistedDCState();
  const [selectedBranch] = usePersistedBranchState();
  const [isEdit, setIsEdit] = useState(false);
  const [operatorId, setOperatorId] = useState("");
  const currentBranch = useCurrentBranchValue();
  const profileValue = useProfileValue();
  const updateBranch = useUpdateBranch({});
  const updateUser = useUpdateUser({});
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  useEffect(() => {
    invalidateQuery("diagnosticBranch");
  }, []);

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
    const branchOperator = currentBranch?.branchOperator?.filter(
      (op) => op?._id !== record?._id,
    );
    updateBranch.mutate(
      {
        data: { branchOperator },
        recordId: selectedBranch,
      },
      {
        onSuccess: (resp) => {
          if (resp.status === 200) {
            warningAlert2("Deleted Employee successfully");
            logActivity({ activity: "Delete Employee " + record?.userName });
            invalidateQuery("diagnosticBranch");
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