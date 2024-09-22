// @ts-nocheck
import { useActivityLogger } from "@/components/common/activity";
import { errorAlert, successAlert, warningAlert } from "@/components/common/alerts";
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
import AddEntityForm from "./create";
import UpdateEntityForm from "./update";

const pathologistFormSchema = [
  { label: "Name", name: "name", type: "input", placeholder: "Enter pathologist name", required: true },
  { label: "Designation", name: "designation", type: "input", placeholder: "Enter pathologist designation", required: true },
  { label: "Description", name: "description", type: "input", placeholder: "Enter description" },
];

function PathologistTab() {
  const [isAddingPathologist, setIsAddingPathologist] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pathologistId, setPathologistId] = useState<string>("");
  const [initialPathalogist, setInitialPathalogist] = useState();


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

  // useEffect(() => {
  //   invalidateQuery("diagnosticBranch");
  // }, [invalidateQuery]);

  const handleSwitchChange = (checked: boolean) => setIsAddingPathologist(checked);

  const handleEditPathologist = (editing: boolean) => {
    setIsEditing(editing);
    setIsAddingPathologist(editing);
  };

  const handleEdit = (record: any) => {
    setInitialPathalogist(record)
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

  const handleCancel = async () => {
    setIsAddingPathologist(false)
    setIsEditing(false)
  };

  const columns = PATHOLOGIST_COLUMNS({
    handleEdit,
    handleDelete,
  });

  // Add methods
  const handlePathologistSubmit = async (formData) => {
    if (!formData.name || !formData.designation) {
      return errorAlert2("Please fill in all required fields");
    }

    const pathList = [...currentBranch?.pathologistDetail, formData];

    updateBranch.mutate(
      { data: { pathologistDetail: pathList }, recordId: selectedBranch },
      {
        onSuccess: (resp) => {
          warningAlert("Path Added succesfully");
          invalidateQuery("diagnosticBranch");
          setCurrentBranch(resp?.data);
          logActivity({ activity: "Added Pathologist" });
          setIsAddingPathologist(false)
          setIsEditing(false)
        },
        onError: (resp) => {
          errorAlert2("Error adding Pathologist");
        },
      },
    );
  };
  // ***********
  const handleUpdateSubmit = (formData) => { 
    if (!formData.name || !formData.designation) {
      return errorAlert2("Please fill in all required fields");
    }
    const pathList = currentBranch?.pathologistDetail?.map((patho) => {
      if (patho?._id === pathologistId) {
        // Check if formData is different from the existing patho object
        const isDifferent = JSON.stringify(formData) !== JSON.stringify(patho);
    
        if (isDifferent) {
          return formData; // Replace with formData if there are changes
        } else { 
          return null
        }
      }
      return patho; // Keep the existing pathologistDetail if no match or no changes
    }); 

    if (pathList !== null) { 
      updateBranch.mutate(
        { data: { pathologistDetail: pathList }, recordId: selectedBranch },
        {
          onSuccess: (resp) => {
            warningAlert("Path updated succesfully");
            invalidateQuery("diagnosticBranch");
            setCurrentBranch(resp?.data);
            logActivity({ activity: "Updted Pathologist" });
            setIsAddingPathologist(false)
            setIsEditing(false)
          },
          onError: (resp) => {
            errorAlert2("Error updating Pathologist");
          },
        },
      );
    }
  }

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
          <UpdateEntityForm
            formSchema={pathologistFormSchema}
            handleSubmit={handleUpdateSubmit}
            handleCancel={handleCancel}
            initialData={initialPathalogist}
            entityType="Pathalogist"
          />
      ) : (
        <AddEntityForm
          formSchema={pathologistFormSchema}
          handleSubmit={handlePathologistSubmit}
          handleCancel={handleCancel}
          entityType="Pathalogist"
        />
      )}
    </div>
  );
}

export default PathologistTab;
