import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { errorAlert2, successAlert } from '@components/atoms/alerts/alert';
import { useProfileValue } from '@components/common/constants/recoilValues';
import { useActivityLogger } from '@components/common/logger.tsx/activity';
import { usePersistedDCState } from '@components/common/recoil/hooks/usePersistedState';
import {
  useCreateDiagnosticBranch,
  useInvalidateQuery,
  useUpdateBranch,
  useUpdateDiagnostic,
} from '@utils/reactQuery';
import { Button } from 'antd';
import { useState } from 'react';

const AddBranch = ({ handleShowBranch }) => {
  const profileValue = useProfileValue();
  const [selectedDc] = usePersistedDCState();
  const [formData, setFormData] = useState({
    branchName: '',
    branchEmail: '',
    branchContact: '',
    branchAddress: '',
  });

  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const updateProfile = useUpdateDiagnostic({
    onSuccess: () => {
      successAlert('Branch added successfully');
      logActivity({ activity: 'Created New Branch' });
      handleShowBranch(false);
      invalidateQuery('diagnosticCenter');
    },
    onError: (err) => errorAlert2('Error updating branch: ' + err.message),
  });

  const createBranch = useCreateDiagnosticBranch({
    onSuccess: (resp) => {
      //@ts-ignore
      const branches = [...profileValue?.branches, resp?.data?._id];
      updateProfile.mutate({ data: { branches }, recordId: selectedDc });
    },
    onError: (err) => errorAlert2('Error creating branch: ' + err.message),
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      branchName: '',
      branchEmail: '',
      branchContact: '',
      branchAddress: '',
    });
    handleShowBranch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.branchName ||
      !formData.branchEmail ||
      !formData.branchContact ||
      !formData.branchAddress
    ) {
      return errorAlert2('Please fill in all required fields');
    }

    const branchExists = profileValue?.branches?.find(
      (branch) => branch?.branchName == formData.branchName,
    );
    if (branchExists) {
      errorAlert2('Branch already exisits');
      return;
    }

    createBranch.mutate({ data: formData });
  };

  return (
    <div className="my-2 max-w-full bg-white">
      <section className="m-auto xl:w-[50%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add Branch
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Stack spacing={4}>
            <FormControl id="branchName" isRequired>
              <FormLabel>Branch Name</FormLabel>
              <Input
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                placeholder="Add Branch Name"
              />
            </FormControl>
            <FormControl id="branchEmail" isRequired>
              <FormLabel>Branch Email</FormLabel>
              <Input
                name="branchEmail"
                value={formData.branchEmail}
                onChange={handleChange}
                placeholder="Add Branch Email"
              />
            </FormControl>
            <FormControl id="branchContact" isRequired>
              <FormLabel>Branch Contact</FormLabel>
              <Input
                name="branchContact"
                value={formData.branchContact}
                onChange={handleChange}
                placeholder="Add Branch Contact"
              />
            </FormControl>
            <FormControl id="branchAddress" isRequired>
              <FormLabel>Branch Address</FormLabel>
              <Input
                name="branchAddress"
                value={formData.branchAddress}
                onChange={handleChange}
                placeholder="Add Branch Address"
              />
            </FormControl>
          </Stack>
          <Button type="primary" htmlType="submit">
            Add Branch
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddBranch;
