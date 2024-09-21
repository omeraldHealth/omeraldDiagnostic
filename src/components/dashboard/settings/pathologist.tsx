// @ts-nocheck
import { useActivityLogger } from "@/components/common/activity";
import { errorAlert, successAlert } from "@/components/common/alerts";
import { usePersistedBranchState, usePersistedDCState } from "@/hooks/localstorage";
import { PATHOLOGIST_COLUMNS } from "@/utils/forms/forms";
import { useInvalidateQuery } from "@/utils/query/getQueries";
import { useUpdateBranch, useUpdateDiagnostic, useUpdateUser } from "@/utils/query/updateQueries";
import { branchState, profileState } from "@/utils/recoil";
import { useCurrentBranch, useDCProfileValue } from "@/utils/recoil/values";
import { CommonSettingTable } from "@/utils/table";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

function PathologistTab() {
  const [isAddingPathologist, setIsAddingPathologist] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pathologistId, setPathologistId] = useState<string>("");

  const [selectedBranch] = usePersistedBranchState();
  const [selectedDc] = usePersistedDCState();
  
  const currentBranch = useCurrentBranch();
  const profileValue = useDCProfileValue();

  const updateProfile = useUpdateDiagnostic({});
  const updateUser = useUpdateUser({});
  const updateBranch = useUpdateBranch({});
  const invalidateQuery = useInvalidateQuery();

  const logActivity = useActivityLogger();
  const setProfileData = useSetRecoilState(profileState);
  const setCurrentBranch = useSetRecoilState(branchState);

  useEffect(() => {
    invalidateQuery("diagnosticBranch");
  }, [invalidateQuery]);

  const handleSwitchChange = (checked: boolean) => setIsAddingPathologist(checked);

  const handleEditPathologist = (editing: boolean) => {
    setIsEditing(editing);
    setIsAddingPathologist(editing);
  };

  const handleEdit = (record: any) => {
    setPathologistId(record?._id);
    handleEditPathologist(true);
  };

  const handleDelete = (record: any) => {
    const updatedPathologists = currentBranch?.pathologistDetail?.filter(
      (path) => path?._id !== record?._id
    );

    updateBranch.mutate(
      { data: { pathologistDetail: updatedPathologists }, recordId: selectedBranch },
      {
        onSuccess: (resp) => {
          successAlert("Pathologist deleted successfully");
          invalidateQuery("diagnosticBranch");
          logActivity({ activity: `Deleted Pathologist: ${record?.name}` });
          setCurrentBranch(resp?.data);
        },
        onError: () => {
          errorAlert("Error deleting pathologist");
        },
      }
    );
  };

  const columns = PATHOLOGIST_COLUMNS({
    handleEdit,
    handleDelete,
  });

  return (
    <div className="pathologist-tab">
      <section className="my-2 py-2 flex justify-end">
        <Switch
          checked={isAddingPathologist}
          onChange={handleSwitchChange}
          style={{ backgroundColor: "orange" }}
          checkedChildren="Add"
          unCheckedChildren="View"
        />
      </section>

      {!isAddingPathologist ? (
        <CommonSettingTable
          data={currentBranch?.pathologistDetail}
          columns={columns}
        />
      ) : isEditing ? (
        // Uncomment and add the component for editing pathologist
        // <UpdatePathologist
        //   handleEditPathologist={handleEditPathologist}
        //   pathologistId={pathologistId}
        // />
        <></>
      ) : (
        // Uncomment and add the component for adding a new pathologist
        // <AddPathologist handleShowPathologist={setIsAddingPathologist} />
        <></>
      )}
    </div>
  );
}

export default PathologistTab;
