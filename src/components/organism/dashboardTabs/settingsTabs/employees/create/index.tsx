// @ts-nocheck

import { FormControl, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import {
  errorAlert2,
  successAlert
} from "@components/atoms/alerts/alert";
import {
  useCurrentBranchValue,
  useProfileValue,
} from "@components/common/constants/recoilValues";
import { useActivityLogger } from "@components/common/logger.tsx/activity";
import {
  usePersistedBranchState,
  usePersistedDCState,
} from "@components/common/recoil/hooks/usePersistedState";
import { getDiagnosticUserApi } from "@utils/index";
import {
  useCreateUser,
  useInvalidateQuery,
  useUpdateDiagnostic,
  useUpdateUser,
} from "@utils/reactQuery";
import { phonePattern } from "@utils/types/molecules/forms.interface";
import { Button } from "antd";
import axios from "axios";
import { useState } from "react";

const AddEmployee = ({ handleShowBranch }) => {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    roleName: "admin",
  });

  const [selectedDc] = usePersistedDCState();
  const [selectedBranch] = usePersistedBranchState();
  const currentBranch = useCurrentBranchValue();
  const profileValue = useProfileValue();
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const updateProfile = useUpdateDiagnostic({
    onSuccess: (resp) => {
      invalidateQuery("userData");
      invalidateQuery("diagnosticCenter");
      invalidateQuery("diagnosticSettings");
      // logActivity({activity: "Updated User to branch "})
      handleShowBranch(false);
    },
    onError: () => errorAlert2("Error updating diagnostic center"),
  });

  const updateUser = useUpdateUser({
    onSuccess: (resp) => {
      successAlert("User updated successfully");
      // logActivity({activity: "Created User "+resp?.data?.userName })
      handleShowBranch(false);
    },
    onError: () => errorAlert2("Error updating user"),
  });

  const createUser = useCreateUser({
    onSuccess: (resp) => {
      successAlert("Employee created successfully");
      const branches = getUpdatedBranch(resp.data._id);
      updateProfile.mutate({ data: { branches }, recordId: profileValue?._id });
    },
    onError: () => errorAlert2("Error creating employee"),
  });

  const getUpdatedBranch = (userId) => ({
    ...currentBranch,
    branchOperator: [...(currentBranch.branchOperator || []), userId],
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      userName: "",
      phoneNumber: "",
      roleName: "admin",
    });
    handleShowBranch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.phoneNumber) {
      return errorAlert2("Please fill in all required fields");
    }

    if (!phonePattern.test(formData.phoneNumber)) {
      return errorAlert2("Invalid phone number format");
    }

    await checkUser(formData);
  };

  const checkUser = async (user) => {
    try {
      const { data, status } = await axios.get(
        `${getDiagnosticUserApi}${user.phoneNumber}`,
      );
      if (status === 200) {
        const diagPresent = data.diagnosticCenters.some(
          (dc) => dc.diagnostic?._id === selectedDc,
        );
        const branchPresent = data.diagnosticCenters.some((dc) =>
          dc.branches.some((branch) => branch.branchId === selectedBranch),
        );

        if (branchPresent) {
          const branches = getUpdatedBranch(data._id);
          if (
            !currentBranch.branchOperator?.find((op) => op._id === data._id)
          ) {
            updateProfile.mutate({
              data: { branches },
              recordId: profileValue._id,
            });
          } else {
            errorAlert2("User already exists in the current branch");
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

  const createEmployee = (user) => {
    if (selectedBranch && selectedDc) {
      const newUser = {
        ...user,
        diagnosticCenters: [
          {
            diagnostic: selectedDc,
            branches: [
              { branchId: selectedBranch, roleName: formData.roleName },
            ],
          },
        ],
      };
      createUser.mutate({ data: newUser });
    }
  };

  const updateBranch = (userData) => {
    const updatedDiagnosticCenters = userData.diagnosticCenters.map((dc) =>
      dc.diagnostic?._id === selectedDc
        ? {
            ...dc,
            branches: [
              ...(dc.branches || []),
              { branchId: selectedBranch, roleName: formData.roleName },
            ],
          }
        : dc,
    );
    updateUser.mutate(
      {
        data: { diagnosticCenters: updatedDiagnosticCenters },
        recordId: userData._id,
      },
      {
        onSuccess: () => {
          const branches = getUpdatedBranch(userData._id);
          updateProfile.mutate({
            data: { branches },
            recordId: profileValue._id,
          });
        },
      },
    );
  };

  const updateDcAndBranch = (userData) => {
    userData.diagnosticCenters.push({
      diagnostic: selectedDc,
      branches: [{ branchId: selectedBranch, roleName: formData.roleName }],
    });
    updateUser.mutate(
      {
        data: { diagnosticCenters: userData.diagnosticCenters },
        recordId: userData._id,
      },
      {
        onSuccess: () => {
          const branches = getUpdatedBranch(userData._id);
          updateProfile.mutate({
            data: { branches },
            recordId: profileValue._id,
          });
        },
      },
    );
  };

  return (
    <div className="my-2 max-w-full bg-white">
      <section className="m-auto xl:w-[50%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add Branch
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Stack spacing={4}>
            <FormControl id="userName" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Add Operator Name"
              />
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>
                Phone Number (Please add country code with +)
              </FormLabel>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Add Operator Contact"
              />
            </FormControl>
            <FormControl id="roleName" isRequired>
              <FormLabel>Role</FormLabel>
              <Select
                name="roleName"
                value={formData.roleName}
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
            Add Operator
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddEmployee;
