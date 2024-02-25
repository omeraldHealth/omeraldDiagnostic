import React, { useState } from 'react';
import { Button } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileState } from '../../common/recoil/profile';
import { testDetailsState } from '../../common/recoil/testDetails';
import DynamicFormGenerator from '../../common/form/dynamicForm';
import { DashboardTable } from '../dashboardItems/data-table';
import { ParameterColumns } from 'utils/forms/form';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { parameterForm } from 'utils/types/molecules/forms.interface';
import { Spinner } from '@components/atoms/loader';

interface AddKeywordsProps {
  handleSuccess: () => void;
}

export const AddKeywords: React.FC<AddKeywordsProps> = ({handleSuccess}:AddKeywordsProps) => {
  const [addKeyword, setAddKeyword] = useState(false);
  const [testDetailState, setTestDetail] = useRecoilState(testDetailsState);
  const [profile, setProfile] = useRecoilState(profileState);
  const currentBranch = useCurrentBranchValue();
  const [loading, setLoading] = useState(false);

  const handleAddKeyword = (value: any) => {
    if (addKeyword) {
      setTestDetail({
        ...testDetailState,
        sampleType: {
          ...(testDetailState.sampleType || {}),
          keywords: Array.isArray(testDetailState.sampleType?.keywords)
            ? [...(testDetailState.sampleType?.keywords || []), value]
            : [value],
        },
      });

      setAddKeyword(!addKeyword);
    }
  };

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert('Profile updated successfully');
      setProfile(data?.data);
      handleSuccess();
      setLoading(false)
    },
    onError: () => {
      errorAlert('Error updating profile');
      setLoading(false)
    },
  });

  const handleSubmit = (data: any) => {
    setLoading(true)
    updateDiagnostic.mutate({
      data: { id: profile?._id, tests: [...profile?.tests, { ...testDetailState, branchId: currentBranch?._id }] },
    });
  };

  return (
    <section className="my-2 w-[100%] mx-0 sm:w-[70%] md:w-[100%] h-auto p-4">
      <AddKeyWordHeader addKeyword={addKeyword} setAddKeyword={setAddKeyword} />
      {addKeyword ? <AddParameter handleAddKeyword={handleAddKeyword} /> : <ViewParameter testDetailState={testDetailState} handleSubmit={handleSubmit} />}
      {loading && <Spinner/>}
    </section>
  );
};

interface AddKeyWordHeaderProps {
  addKeyword: boolean;
  setAddKeyword: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddKeyWordHeader: React.FC<AddKeyWordHeaderProps> = ({ addKeyword, setAddKeyword }) => {
  const testDetails = useRecoilValue(testDetailsState);

  const toggleAddKeyword = () => {
    setAddKeyword(!addKeyword);
  };

  return (
    <section className="flex w-full mb-2 justify-between">
      <section className="flex">
        <p className="text-xs sm:text-sm sm:font-bold">
          Custom Report Name:
          <span className="font-light mx-2">{testDetails?.sampleName}</span>
        </p>
        <p className="text-xs sm:text-sm sm:font-bold">
          Test Name:
          <span className="font-light mx-2">{testDetails?.sampleType?.testName}</span>
        </p>
      </section>
      <button onClick={toggleAddKeyword} className="p-1 text-xs sm:text-md sm:px-2 bg-gray-200 text-black">
        {!addKeyword ? 'Add Parameter' : 'View Parameter'}
      </button>
    </section>
  );
};

interface AddParameterProps {
  handleAddKeyword: (value: any) => void;
}

const AddParameter: React.FC<AddParameterProps> = ({ handleAddKeyword }) => (
  <section>
    <section className="w-[100%] sm:w-[60%] my-4">
      <DynamicFormGenerator formProps={parameterForm} buttonText="Add Keyword" handleSubmit={handleAddKeyword} />
    </section>
  </section>
);

interface ViewParameterProps {
  testDetailState: any;
  handleSubmit: () => void;
}

const ViewParameter: React.FC<ViewParameterProps> = ({ testDetailState, handleSubmit }:ViewParameterProps) => (
  <section>
    <DashboardTable columns={ParameterColumns} data={testDetailState?.sampleType?.keywords || []} />
    <Button onClick={handleSubmit}>Submit</Button>
  </section>
);

export default AddKeywords;
