import React, { useState } from 'react';
import { Modal } from 'antd';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';
import { DashboardTable } from '../dashboardItems/data-table';
import { TestTableColumns } from 'utils/forms/form';
import { testForm } from 'utils/types/molecules/forms.interface';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { useRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';
import { AddTestComponent } from '../addReport/addTest';
import { testDetailsState } from '@components/common/recoil/testDetails';
import { booleanState } from "@components/common/recoil/booleanAtom";
import { EditTestsProps, TestTableProps, ViewTestProps } from '../../../utils/types';
import { Spinner } from '@components/atoms/loader';

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

  const tests = profile?.tests.filter((test: any) => test?.branchId === currentBranch?._id);
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
  });

  const handleRemove = (record: any) => {
    setLoading(true)
    const updateData = profile?.tests.filter((item: any) => item._id !== record._id);
    updateDiagnostic.mutate({ data: { id: profile?._id, tests: updateData } });
  };

  const handleEdit = async (record: any) => {
    setTestDetail(record);
    setBooleanAtom(true);
    setEditTest(true);
  };

  const handleSubmit = async (values: any) => {};

  return (
    <div>
      {!editTest ? (
        <ViewTest columns={TestTableColumns(handleEdit, handleRemove, profile)} tests={tests} loading={loading} />
      ) : (
        <AddTests form={testForm} editElement={editTest} handleSubmit={handleSubmit} defaultValues={defaultValues} />
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

