import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { errorAlert2, successAlert } from "@components/atoms/alerts/alert";
import { useActivityLogger } from "@components/common/logger.tsx/activity";
import {
  useGetDcBranch,
  useInvalidateQuery,
  useUpdateBranch,
  useUpdateDiagnostic,
} from "@utils/reactQuery";
import { Button } from "antd";
import { useEffect, useState } from "react";

const UpdateBranch = ({ handleEditBranch, branchId }) => {
  const [formData, setFormData] = useState({
    branchName: "",
    branchEmail: "",
    branchContact: "",
    branchAddress: "",
  });
  const { data: branchData, isLoading } = useGetDcBranch({
    selectedBranchId: branchId,
  });
  const updateBranch = useUpdateBranch({});

  useEffect(() => {
    if (!isLoading && branchData) {
      if (branchData?.data) {
        const updatedBranch = {
          branchName: branchData?.data?.branchName,
          branchEmail: branchData?.data?.branchEmail,
          branchContact: branchData?.data?.branchContact,
          branchAddress: branchData?.data?.branchAddress,
        };
        setFormData(updatedBranch);
      }
    }
  }, [branchData, isLoading]);

  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      branchName: "",
      branchEmail: "",
      branchContact: "",
      branchAddress: "",
    });
    handleEditBranch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            handleEditBranch(false);
          }
        },
      },
    );
  };

  return (
    <div className="my-2 max-w-full bg-white">
      <section className="m-auto xl:w-[50%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Update Branch
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Stack spacing={4}>
            <FormControl id="branchName" isRequired>
              <FormLabel>Branch Name</FormLabel>
              <Input
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                placeholder="Edit Branch Name"
              />
            </FormControl>
            <FormControl id="branchEmail" isRequired>
              <FormLabel>Branch Email</FormLabel>
              <Input
                name="branchEmail"
                value={formData.branchEmail}
                onChange={handleChange}
                placeholder="Edit Branch Email"
              />
            </FormControl>
            <FormControl id="branchContact" isRequired>
              <FormLabel>Branch Contact</FormLabel>
              <Input
                name="branchContact"
                value={formData.branchContact}
                onChange={handleChange}
                placeholder="Edit Branch Contact"
              />
            </FormControl>
            <FormControl id="branchAddress" isRequired>
              <FormLabel>Branch Address</FormLabel>
              <Input
                name="branchAddress"
                value={formData.branchAddress}
                onChange={handleChange}
                placeholder="Edit Branch Address"
              />
            </FormControl>
          </Stack>
          <Button type="primary" htmlType="submit">
            Edit Branch
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default UpdateBranch;
