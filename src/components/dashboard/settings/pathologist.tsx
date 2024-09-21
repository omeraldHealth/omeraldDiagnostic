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
    const [addPathologist, setAddPathologist] = useState(false);
    const [selectedBranch] = usePersistedBranchState();
    const [selectedDc] = usePersistedDCState();
    const [isEdit, setIsEdit] = useState(false);
    const [PathologistId, setPathologistId] = useState("");
    const currentBranch = useCurrentBranch();
    const profileValue = useDCProfileValue();
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
            errorAlert("Error deleting pathologist");
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
        //   <UpdatePathologist
        //     handleEditPathologist={handleEditPathologist}
        //     PathologistId={PathologistId}
                    //   />
            <></>
        ) : (
        //   <AddPathologist handleShowPathologist={setAddPathologist} />
            <></>
        )}
      </div>
    );
  }
  
  export default PathologistTab;