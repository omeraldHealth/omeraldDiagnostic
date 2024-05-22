import React, { useState } from 'react';
import { Modal } from 'antd';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';
import { DashboardTable } from '../dashboardItems/data-table';
import { TestTableColumns } from 'utils/forms/form';
import { testForm } from 'utils/types/molecules/forms.interface';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';
import { AddTestComponent } from '../addReport/addTest';
import { testDetailsState } from '@components/common/recoil/testDetails';
import { booleanState } from "@components/common/recoil/booleanAtom";
import { EditTestsProps, TestTableProps, ViewTestProps } from '../../../utils/types';
import { Spinner } from '@components/atoms/loader';
import { testDataState } from '@components/common/recoil/testDetails/test';
import { branchState } from '@components/common/recoil/branch/branch';

export const TestTable: React.FC<TestTableProps> = () => {
  const [editTest, setEditTest] = useState(false);
  const [profile, setProfile] = useRecoilState(profileState);
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
  const [booleanAtom, setBooleanAtom] = useRecoilState(booleanState);
  const currentBranch = useCurrentBranchValue();
  const [defaultValues, setDefaultValue] = useState({});
  const [testEdited, setTestEdited] = useState({});
  const [loading, setLoading] = useState(false);
  const { confirm } = Modal;
  const [testDetailState, setTestDetails] = useRecoilState(testDataState);

  const tests = currentBranch?.tests;
  const setCurrentBranch = useSetRecoilState(branchState)

  console.log("tests",tests)
  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated successfully");
      setProfile(data?.data);
      setLoading(false)
    },
    onError: (error) => {
      errorAlert("Error updating profile");
      setLoading(false)
    },
  }, profile?._id);

  const handleRemove = (record: any) => {
    setLoading(true)
    const SampleType = currentBranch?.tests.filter((item: any) => item?._id !== record._id);
    const updatedBranch = { ...currentBranch, tests: SampleType };
      localStorage.setItem("selectedBranch", JSON.stringify(updatedBranch));
      setCurrentBranch(updatedBranch)
      const updatedBranches = profile?.branches.map(branch => {
        if (branch._id === updatedBranch._id) {
            return updatedBranch;
        }
        return branch;
      });

      try {
        const updatedProfile = { data: { branches: updatedBranches } };
        updateDiagnostic.mutate(updatedProfile);
      } catch (error) {
          console.error("Error logging activity:", error);
      }
    // const updateData = currentBranch?.tests.filter((item: any) => item?._id !== record._id);
    // updateDiagnostic.mutate({ data: { id: profile?._id, tests: updateData } });
  };

  const handleEdit = async (record: any) => {
    setTestDetails(record);
    setBooleanAtom(true);
    setEditTest(true);
  };

  const handleSubmit = async (values: any) => {setEditTest(false)};

  return (
    <div>
      {!editTest ? (
        <ViewTest columns={TestTableColumns(handleEdit, handleRemove, profile)} tests={tests} loading={loading} />
      ) : (
        <AddTestComponent edit={true} setTest={handleSubmit}/>
      )}
    </div>
  );
};

const ViewTest: React.FC<ViewTestProps> = ({ columns, tests, loading }) => {
  return <section>
    <DashboardTable pageSize={10} columns={columns} data={tests} />
    {loading && <Spinner/>}
    </section>
};

const AddTests: React.FC<EditTestsProps> = ({ form, editElement, handleSubmit, defaultValues }) => {
  return (
    <section className='p-2 sm:p-8 w-[100%] h-auto sm:max-h-[70vh] sm:overflow-y-scroll'>
      <AddTestComponent setTest={handleSubmit}/>
    </section>
  );
};

