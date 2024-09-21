// @ts-nocheck
import { useActivityLogger } from "@/components/common/activity";
import { usePersistedBranchState, usePersistedDCState } from "@/hooks/localstorage";
import { BRANCH_EMPLOYEE_COLUMNS } from "@/utils/forms/forms";
import { useInvalidateQuery } from "@/utils/query/getQueries";
import { useUpdateBranch, useUpdateUser } from "@/utils/query/updateQueries";
import { useCurrentBranch, useDCProfileValue } from "@/utils/recoil/values";
import { CommonSettingTable } from "@/utils/table";
import { Switch } from "antd";
import { useEffect, useState } from "react";

export const EmployeesTab = () => {
  const [addBranch, setAddBranch] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [operatorId, setOperatorId] = useState("");

  const [selectedDc] = usePersistedDCState();
  const [selectedBranch] = usePersistedBranchState();
  const currentBranch = useCurrentBranch();
  const profileValue = useDCProfileValue();

  const updateBranch = useUpdateBranch({});
  const updateUser = useUpdateUser({});
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  useEffect(() => {
    invalidateQuery("diagnosticBranch");
  }, [invalidateQuery]);

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

  const handleDelete = (record: any) => {
    removeUserFromBranch(record);
  };

  const removeUserFromBranch = (record: any) => {
    const updatedOperators = currentBranch?.branchOperator?.filter(
      (operator) => operator?._id !== record?._id
    );

    updateBranch.mutate(
      {
        data: { branchOperator: updatedOperators },
        recordId: selectedBranch,
      },
      {
        onSuccess: (resp) => {
          if (resp.status === 200) {
            warningAlert2("Deleted Employee successfully");
            logActivity({ activity: `Deleted Employee ${record?.userName}` });
            invalidateQuery("diagnosticBranch");
          }
          removeBranchFromUser(record);
        },
      }
    );
  };

  const removeBranchFromUser = (record: any) => {
    const updatedDiagCenters = removeBranchById(
      record,
      selectedDc,
      currentBranch?._id
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
          }
        },
        onError: () => errorAlert("Updating Employee failed"),
      }
    );
  };

  const columns = BRANCH_EMPLOYEE_COLUMNS({
    selectedBranch,
    handleEdit,
    handleDelete,
  });

  return (
    <div className="employees-tab">
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
        <></> 
        // Uncomment and use appropriate components here
        // <UpdateEmployee handleEditEmployee={handleEditEmployee} operatorId={operatorId} />
      ) : (
        <></> 
        // Uncomment and use appropriate components here
        // <AddEmployee handleShowBranch={setAddBranch} />
      )}
    </div>
  );
};
