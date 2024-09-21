// @ts-nocheck
import { useActivityLogger } from "@/components/common/activity";
import { usePersistedBranchState, usePersistedDCState } from "@/hooks/localstorage";
import { BRANCH_EMPLOYEE_COLUMNS } from "@/utils/forms/forms";
import { useInvalidateQuery } from "@/utils/query/getQueries";
import { useUpdateBranch, useUpdateUser } from "@/utils/query/updateQueries";
import { useCurrentBranch, useDCProfileValue } from "@/utils/recoil/values";
import { CommonSettingTable } from "@/utils/table";
import { Switch } from "antd";
import { useState, useEffect } from "react";
import AddEntityForm from "./create";
import UpdateEntityForm from "./update";
import { errorAlert, successAlert, warningAlert } from "@/components/common/alerts";
import { phonePattern } from "@/utils/constants/common";
import axios from "axios";
import { getDiagnosticUserApi } from "@/utils/api";
import { useCreateUser } from "@/utils/query/createQueries";

const employeeFormSchema = [
  { label: "Name", name: "userName", type: "input", placeholder: "Enter name", required: true },
  { label: "Phone Number", name: "phoneNumber", type: "input", placeholder: "Enter phone number", required: true },
  { label: "Role", name: "roleName", type: "select", required: true, options: [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "SPOC", value: "spoc" },
    { label: "Operator", value: "operator" }
  ]},
];

export const EmployeesTab = () => {
  const [addBranch, setAddBranch] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [operatorId, setOperatorId] = useState("");
  const [initialEmployeeData, setEmployData] = useState();
  const [editEmployeeId, setEmployeeId] = useState();

  const [selectedDc] = usePersistedDCState();
  const [selectedBranch] = usePersistedBranchState();
  const currentBranch = useCurrentBranch();
  const profileValue = useDCProfileValue();

  const updateBranch = useUpdateBranch({});
  const updateUser = useUpdateUser({});
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  // Handle adding an employee
  const handleEmployeeSubmit = async (data) => {
    if (!data.userName || !data.phoneNumber) {
      return errorAlert("Please fill in all required fields");
    }

    if (!phonePattern.test(data.phoneNumber)) {
      return errorAlert("Invalid phone number format");
    }
    await checkUser(data);
  };

  const checkUser = async (user) => {
    try {
      const { data, status } = await axios.get(`${getDiagnosticUserApi}${user.phoneNumber}`);
      if (status === 200) {
        const diagPresent = data.diagnosticCenters.some((dc) => dc.diagnostic?._id === selectedDc);
        const branchPresent = data.diagnosticCenters.some((dc) => dc.branches.some((branch) => branch.branchId === selectedBranch));

        if (branchPresent) {
          const branchOperator = [...currentBranch.branchOperator, data._id];
          if (!currentBranch.branchOperator?.find((op) => op._id === data._id)) {
            updateBranchMut.mutate({
              data: { branchOperator },
              recordId: selectedBranch,
            });
          } else {
            errorAlert("User already exists in the current branch");
          }
        } else if (!diagPresent) {
          updateDcAndBranch(data);
        } else {
          updateBranch(data);
        }
      }
    } catch {
      createEmployee(user);
    }
  };

  const createUser = useCreateUser({
    onSuccess: async (resp) => {
      successAlert("Employee created successfully");

      if (currentBranch && resp?.data?._id) {
        const branchOperator = [...currentBranch.branchOperator, resp.data._id];
        await updateBranchMut.mutateAsync({
          data: { branchOperator },
          recordId: selectedBranch,
        });
      } else {
        errorAlert("Failed to update branch due to missing data");
      }
    },
    onError: (err) => errorAlert(`Error creating employee: ${err.message}`),
  });

  const createEmployee = (user) => {
    if (selectedBranch && selectedDc) {
      const newUser = {
        ...user,
        diagnosticCenters: [
          {
            diagnostic: selectedDc,
            branches: [{ branchId: selectedBranch, roleName: user.roleName }],
          },
        ],
      };
      createUser.mutate(newUser);
    }
  };

  const updateDcAndBranch = (userData) => {
    userData.diagnosticCenters.push({
      diagnostic: selectedDc,
      branches: [{ branchId: selectedBranch, roleName: userData.roleName }],
    });
    updateUser.mutate(
      {
        data: { diagnosticCenters: userData.diagnosticCenters },
        recordId: userData._id,
      },
      {
        onSuccess: () => {
          const branchOperator = [...currentBranch.branchOperator, userData._id];
          updateBranchMut.mutate({
            data: { branchOperator },
            recordId: profileValue._id,
          });
        },
      }
    );
  };

  const updateBranchMut = useUpdateBranch({
    onSuccess: () => {
      setAddBranch(false);
      setIsEdit(false)
      invalidateQuery("diagnosticBranch");
      logActivity({ activity: "Added New Employee" });
    },
    onError: () => errorAlert("Error updating diagnostic center"),
  });

  // Handle updating an employee
  const handleUpdateSubmit = (data) => {
    if (!data?.userName || !data?.phoneNumber) {
      return errorAlert("Invalid Data, please edit all details");
    }

    if (!phonePattern.test(data?.phoneNumber)) {
      return errorAlert("Invalid phone number, please add country code");
    }

    const user = currentBranch?.branchOperator?.find((emp) => emp?._id === editEmployeeId);
    if (!user) {
      return errorAlert("Error updating user");
    }

    const updatedDiagnosticCenters = user?.diagnosticCenters?.map((center) =>
      center.diagnostic === selectedDc
        ? {
            ...center,
            branches: center.branches?.map((branch) =>
              branch.branchId === selectedBranch ? { ...branch, roleName: data.roleName } : branch
            ),
          }
        : center
    );
    updateUser.mutate(
      {
        data: { diagnosticCenters: updatedDiagnosticCenters },
        recordId: editEmployeeId,
      },
      {
        onSuccess: (resp) => {
          successAlert("User updated successfully");
          invalidateQuery("diagnosticBranch");
          logActivity({ activity: "Updated Role For: " + resp?.data?.userName });
          setIsEdit(false);
          setAddBranch(false)
        },
        onError: () => errorAlert("Error updating employee"),
      }
    );
  };

  // Handle deleting an employee
  const handleDelete = (record) => {
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
            warningAlert("Deleted Employee successfully");
            logActivity({ activity: `Deleted Employee ${record?.userName}` });
            invalidateQuery("diagnosticBranch");
          }
          removeBranchFromUser(record);
        },
      }
    );
  };

  const removeBranchFromUser = (record) => {
    const updatedDiagCenters = record.diagnosticCenters.filter(
      (dc) => dc.diagnostic._id !== selectedDc
    );
    updateUser.mutate(
      {
        data: { diagnosticCenters: updatedDiagCenters },
        recordId: record?._id,
      },
      {
        onSuccess: () => {
          invalidateQuery("userData");
          invalidateQuery("diagnosticCenter");
        },
        onError: () => errorAlert("Updating Employee failed"),
      }
    );
  };

  const handleEdit = (record) => {
    setEmployeeId(record?._id);
    const roleName = getRoleName(record?.diagnosticCenters, selectedBranch);
    setEmployData({
      userName: record?.userName,
      phoneNumber: record?.phoneNumber,
      roleName: roleName || "",
    });
    setIsEdit(true);
    setAddBranch(true);
  };

  const handleSwitch = (checked) => setAddBranch(checked);

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
        <CommonSettingTable data={currentBranch?.branchOperator} columns={columns} />
      ) : isEdit ? (
        <UpdateEntityForm
          formSchema={employeeFormSchema}
          handleSubmit={handleUpdateSubmit}
          handleCancel={() => setAddBranch(false)}
          initialData={initialEmployeeData}
          entityType="Employee"
        />
      ) : (
        <AddEntityForm
          formSchema={employeeFormSchema}
          handleSubmit={handleEmployeeSubmit}
          handleCancel={() => setAddBranch(false)}
          entityType="Employee"
        />
      )}
    </div>
  );
};

function getRoleName(data, branchId) {
  const diagnostic = data?.find((d) =>
    d.branches.some((branch) => branch.branchId === branchId)
  );

  if (diagnostic) {
    const branch = diagnostic?.branches.find(
      (branch) => branch.branchId === branchId
    );
    return branch ? branch?.roleName : null;
  }

  return null;
}
