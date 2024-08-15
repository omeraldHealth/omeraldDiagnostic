// @ts-nocheck

import { FormControl, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { errorAlert2, warningAlert2 } from "@components/atoms/alerts/alert";
import { useCurrentBranchValue } from "@components/common/constants/recoilValues";
import { useActivityLogger } from "@components/common/logger.tsx/activity";
import {
  usePersistedBranchState,
  usePersistedDCState,
} from "@components/common/recoil/hooks/usePersistedState";
import { useInvalidateQuery, useUpdateUser } from "@utils/reactQuery";
import { phonePattern } from "@utils/types/molecules/forms.interface";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { getRoleNameByBranchId } from "../../utils/functions";

const UpdateEmployee = ({ handleEditEmployee, operatorId }) => {
  const initialFormData = { userName: "", phoneNumber: "", roleName: "admin" };
  const [selectedDc] = usePersistedDCState();
  const [selectedBranch] = usePersistedBranchState();
  const currentBranch = useCurrentBranchValue();
  const [formData, setFormData] = useState(initialFormData);
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  useEffect(() => {
    const user = currentBranch?.branchOperator?.find(
      (emp) => emp?._id === operatorId,
    );
    const role = getRoleNameByBranchId([user], selectedBranch);
    if (user) {
      setFormData({
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        roleName: role || "spoc",
      });
    }
  }, [currentBranch, operatorId, selectedBranch]);

  const updateUser = useUpdateUser({
    onSuccess: (resp) => {
      warningAlert2("User updated successfully");
      invalidateQuery("diagnosticBranch")
      logActivity({activity: 'Updated Role For: '+resp?.data?.userName})
      handleEditEmployee(false);
    },
    onError: () => errorAlert2("Error updating employee"),
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    handleEditEmployee(false);
  };

  const handleUpdateEmployee = (user) => {
    const updatedDiagnosticCenters = user?.diagnosticCenters?.map((center) =>
      center.diagnostic === selectedDc
        ? {
            ...center,
            branches: center.branches?.map((branch) =>
              branch.branchId === selectedBranch
                ? { ...branch, roleName: formData.roleName }
                : branch,
            ),
          }
        : center,
    );
    updateUser.mutate({
      data: { diagnosticCenters: updatedDiagnosticCenters },
      recordId: operatorId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.phoneNumber) {
      return errorAlert2("Invalid Data, please edit all details");
    }

    if (!phonePattern.test(formData.phoneNumber)) {
      return errorAlert2("Invalid phone number, please add country code");
    }

    const user = currentBranch?.branchOperator?.find(
      (emp) => emp._id === operatorId,
    );
    if (!user) {
      return errorAlert2("Error updating user");
    }

    handleUpdateEmployee(user);
  };

  return (
    <div className="my-2 max-w-full bg-white">
      <section className="m-auto xl:w-[50%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Edit Branch
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Stack spacing={4}>
            <FormControl id="userName" className="my-2" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                disabled
                placeholder="Edit Operator Name"
                className="border-2 p-2"
              />
            </FormControl>
            <FormControl id="phoneNumber" className="my-2" isRequired>
              <FormLabel>
                Phone Number (Please Edit country code with +)
              </FormLabel>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                disabled
                onChange={handleChange}
                placeholder="Edit Operator Contact"
                className="border-2 p-2"
              />
            </FormControl>
            <FormControl id="roleName" className="my-2" isRequired>
              <FormLabel>Role</FormLabel>
              <Select
                name="roleName"
                value={formData.roleName}
                placeholder="Edit Operator Role"
                className="border-2 p-2"
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="spoc">SPOC</option>
                <option value="operator">Operator</option>
              </Select>
            </FormControl>
          </Stack>
          <Button type="primary" htmlType="submit">
            Edit Operator
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default UpdateEmployee;
