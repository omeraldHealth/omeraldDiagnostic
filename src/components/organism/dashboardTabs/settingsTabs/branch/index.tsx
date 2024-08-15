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
import { useEffect, useState } from "react";
import { removeBranchById } from "../utils/functions";
import { CommonSettingTable } from "../utils/table";
import { BRANCH_DETAILS_COLUMNS } from "../utils/tabs";

function BranchTab() {
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

  useEffect(() => { invalidateQuery("diagnosticBranch")},[])

  const handleSwitch = (checked: boolean) => setAddBranch(checked);

  const handleEditEmployee = (value: boolean) => {
    setIsEdit(value);
    setAddBranch(value);
  };

  const handleEdit = (record: any) => {
    setIsEdit(true);
    setAddBranch(true);
  };

  const handleDelete = (record: any) => removeUserFromBranch(record);

  const columns = BRANCH_DETAILS_COLUMNS({
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
        <CommonSettingTable data={profileValue?.branches} columns={columns} />
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
}

export default BranchTab;
