//@ts-nocheck
import { useActivityLogger } from "@/components/common/activity";
import { errorAlert, successAlert } from "@/components/common/alerts";
import { usePersistedBranchState, usePersistedDCState } from "@/hooks/localstorage";
import { BRANCH_DETAILS_COLUMNS } from "@/utils/forms/forms";
import { useDeleteBranch } from "@/utils/query/deleteQueries";
import { useInvalidateQuery } from "@/utils/query/getQueries";
import { useUpdateBranch, useUpdateDiagnostic, useUpdateUser } from "@/utils/query/updateQueries";
import { profileState } from "@/utils/recoil";
import { useCurrentBranch, useDCProfileValue } from "@/utils/recoil/values";
import { CommonSettingTable } from "@/utils/table";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import AddEntityForm from "./create";
import { useCreateDiagnosticBranch } from "@/utils/query/createQueries";
import UpdateEntityForm from "./update";

const branchFormSchema = [
  { label: "Branch Name", name: "branchName", type: "input", placeholder: "Enter branch name", required: true },
  { label: "Branch Email", name: "branchEmail", type: "input", placeholder: "Enter branch email", required: true },
  { label: "Branch Contact", name: "branchContact", type: "input", placeholder: "Enter contact number", required: true },
  { label: "Branch Address", name: "branchAddress", type: "input", placeholder: "Enter branch address", required: true },
];

function BranchTab() {
  const [isAddBranchMode, setIsAddBranchMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [initialBranchData, setInitialBranch] = useState()

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
  const updateBranch = useUpdateBranch({});

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
    setInitialBranch(record)
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

  //Add Methods

  const createBranch = useCreateDiagnosticBranch({
    onSuccess: (resp) => {
      //@ts-ignore
      const branches = [...profileValue?.branches, resp?.data?._id];
      updateProfile.mutate({ data: { branches }, recordId: selectedDc },
        {
          onSuccess: () => {
            successAlert("Branch added successfully");
            logActivity({ activity: "Created New Branch" });
            setIsAddBranchMode(false)
            setIsEditMode(false)
            invalidateQuery("diagnosticCenter");
          },
          onError: (err) => errorAlert2("Error updating branch: " + err.message),
      });
    },
    onError: (err) => errorAlert("Error creating branch: " + err.message),
  });

  const handleAddBranchSubmit = async (formData) => {
    if (
      !formData.branchName ||
      !formData.branchEmail ||
      !formData.branchContact ||
      !formData.branchAddress
    ) {
      return errorAlert("Please fill in all required fields");
    }

    const branchExists = profileValue?.branches?.find(
      (branch) => branch?.branchName == formData.branchName,
    );
    if (branchExists) {
      errorAlert("Branch already exisits");
      return;
    }

    createBranch.mutate({ ...formData });
  };

  const handleCancel = async () => {
    setIsAddBranchMode(false)
    setIsEditMode(false)
  };

  //Edit Methods
  const handleUpdateSubmit = (formData) => { 
    if (
      !formData.branchName ||
      !formData.branchEmail ||
      !formData.branchContact ||
      !formData.branchAddress
    ) {
      return errorAlert2("Please fill in all required fields");
    }
    updateBranch.mutate(
      { recordId: branchId, data: { ...formData } },
      {
        onSuccess: (resp) => {
          if (resp?.data) {
            successAlert("Updated Branch");
            logActivity({ activity: "Updated Branch" });
            invalidateQuery("diagnosticCenter");
            setIsAddBranchMode(false)
            setIsEditMode(false)
          }
        },
      },
    );
  }

  //Delete Methods

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
        <UpdateEntityForm
          formSchema={branchFormSchema}
          handleSubmit={handleUpdateSubmit}
          handleCancel={handleCancel}
          initialData={initialBranchData}
          entityType="Branch"
        />
      ) : (
          <AddEntityForm
            formSchema={branchFormSchema}
            handleSubmit={handleAddBranchSubmit}
            handleCancel={handleCancel}
            entityType="Branch"
          />
      )}
    </div>
  );
}

export default BranchTab;
