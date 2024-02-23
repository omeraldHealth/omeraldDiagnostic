import React, { useState } from 'react';
import { Modal, Space, Tag, Popover } from 'antd';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { ColumnsType } from 'antd/es/table';
import { DataType } from 'utils/store/types';
import { useCurrentBranchValue, useProfileValue } from '@components/common/constants/constants';
import { DashboardTable } from '../dashboardItems/data-table';
import { TestTableColumns } from 'utils/forms/form';
import DynamicFormGenerator from '../form/dynamicForm';
import { testForm } from 'utils/types/molecules/forms.interface';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { useRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';


export const TestTable = () => {
  const [editTest,setEdit] = useState(false);
  const [profile,setProfile] = useRecoilState(profileState);
  const currentBranch = useCurrentBranchValue();
  const [defaultValues, setDefaultValue] = useState({});
  const [testEdited, setTestEdited] = useState({});
  const { confirm } = Modal;

  //@ts-ignore
  let tests = profile?.tests.filter((test:any) => test?.branchId === currentBranch?._id)

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated sucessfully")
      setProfile(data?.data);
    },
    onError: (error) => {
      errorAlert("Error updating profile")
    },
  });

  const handleRemove = ( record: any) => {
    let updateData = profile?.tests.filter((item: any) => item._id !== record._id);
    updateDiagnostic.mutate({ data: { id: profile?._id, tests: updateData } })
  };
  
  const handleEdit = async (record:any) => { 
    console.log(record)
    setTestEdited(record)
    setDefaultValue({...record,...record?.sampleType});
    setEdit(true);
  }

  const handleSubmit = async (values:any) => {
    console.log(values)
  }
  
  return (
      <div>
          {!editTest ? <ViewTest columns={TestTableColumns(handleEdit,handleRemove,profile)} tests={tests}/> : 
          <EditTests form={testForm} editElement={editTest} handleSubmit={handleSubmit} defaultValues={defaultValues} />}
      </div>
  )
}

const ViewTest = ({columns, tests}:any) => {
  return <DashboardTable pageSize={5} columns={columns} data={tests}/>
}

const EditTests = ({form, editElement, handleSubmit,defaultValues}:any) => {
  return <section className='p-2 sm:p-8 w-[100%] h-auto sm:max-h-[70vh] sm:overflow-y-scroll'>
    <DynamicFormGenerator formProps={form} buttonText={editElement ? "update":"submit"} handleSubmit={handleSubmit} defaultValues={defaultValues} />
  </section>
}
