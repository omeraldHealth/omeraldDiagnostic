// @ts-nocheck

import {
  errorAlert,
  errorAlert2,
  successAlert,
  warningAlert2,
} from "@components/atoms/alerts/alert";
import {
  useCurrentBranchValue,
  useCurrentPathologistValue,
  useProfileValue,
} from "@components/common/constants/recoilValues";
import {
  usePersistedPathologistState,
  usePersistedDCState,
  usePersistedBranchState,
} from "@components/common/recoil/hooks/usePersistedState";
import {
  useDeletePathologist,
  useDeleteReports,
  useInvalidateQuery,
  useUpdateBranch,
  useUpdateDiagnostic,
  useUpdateUser,
} from "@utils/reactQuery";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { removePathologistById } from "../utils/functions";
import { CommonSettingTable } from "../utils/table";
import { PATHOLOGIST_COLUMNS } from "../utils/tabs";
import { useActivityLogger } from "@components/common/logger.tsx/activity";
import { useSetRecoilState } from "recoil";
import { profileState } from "@components/common/recoil/profile";
import AddPathologist from "./create";
import { branchState } from "@components/common/recoil/branch/branch";

function PathologistTab() {
  const [addPathologist, setAddPathologist] = useState(false);
  const [selectedBranch] = usePersistedBranchState();
  const [selectedDc] = usePersistedDCState();
  const [isEdit, setIsEdit] = useState(false);
  const [PathologistId, setPathologistId] = useState("");
  const currentBranch = useCurrentBranchValue();
  const profileValue = useProfileValue();
  const updateProfile = useUpdateDiagnostic({});
  const updateUser = useUpdateUser({});
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();
  const setProfileData = useSetRecoilState(profileState);
  const setCurrentBranch = useSetRecoilState(branchState);

  const updateBranch = useUpdateBranch({});

  useEffect(() => {
    invalidateQuery("diagnosticBranch");
  }, []);

  const handleSwitch = (checked: boolean) => setAddPathologist(checked);

  const handleEditPathologist = (value: boolean) => {
    setIsEdit(value);
    setAddPathologist(value);
  };

  const handleEdit = (record: any) => {
    setPathologistId(record?._id);
    setIsEdit(true);
    setAddPathologist(true);
  };

  const handleDelete = (record: any) => {
    const filteredPaths = currentBranch?.pathologistDetail?.filter(
      (path) => path?._id !== record?._id,
    );
    updateBranch?.mutate(
      { data: { pathologistDetail: filteredPaths }, recordId: selectedBranch },
      {
        onSuccess: (resp) => {
          successAlert("Deleted path succesfully");
          invalidateQuery("diagnosticBranch");
          logActivity({ activity: "Deleted Pathologist " + record?.name });
          setCurrentBranch(resp?.data);
        },
        onError: (err) => {
          errorAlert2("Error deleting pathologist");
        },
      },
    );
  };

  const columns = PATHOLOGIST_COLUMNS({
    handleEdit,
    handleDelete,
  });

  return (
    <div className="sdsa">
      <section className="my-2 py-2 flex justify-end">
        <Switch
          checked={addPathologist}
          style={{ backgroundColor: "orange" }}
          onChange={handleSwitch}
          checkedChildren="Add"
          unCheckedChildren="View"
        />
      </section>
      {!addPathologist ? (
        <CommonSettingTable
          data={currentBranch?.pathologistDetail}
          columns={columns}
        />
      ) : isEdit ? (
        <UpdatePathologist
          handleEditPathologist={handleEditPathologist}
          PathologistId={PathologistId}
        />
      ) : (
        <AddPathologist handleShowPathologist={setAddPathologist} />
      )}
    </div>
  );
}

export default PathologistTab;
