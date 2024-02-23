import { errorAlert, successAlert } from '@components/atoms/alerts/alert'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { SET_TEST } from 'utils/store/types'
import { parameterForm, testForm } from 'utils/types/molecules/forms.interface'
import { Button, Popconfirm } from 'antd'
import { useUser } from '@clerk/clerk-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { profileState } from '../../common/recoil/profile'

import { testDetailsState } from '../../common/recoil/testDetails'
import DynamicFormGenerator from '../form/dynamicForm'
import { DashboardTable } from '../dashboardItems/data-table'
import { ParameterColumns } from 'utils/forms/form'
import { useUpdateDiagnostic } from 'utils/reactQuery'
import { useCurrentBranchValue } from '@components/common/constants/constants'

export const AddKeywords = ({handleSucess,handleBack,edit}:any) => {
  const [addKeyword,setAddKeyword] = useState(false)
  const [testDetailState,setTestDetail] = useRecoilState(testDetailsState)
  const [profile,setProfile] = useRecoilState(profileState)
  const currentBranch = useCurrentBranchValue()

  console.log(testDetailState)

  const handleAddKeyword = (value: any) => {
      if(addKeyword){
        setTestDetail({
          ...testDetailState,
          sampleType: {
            ...(testDetailState.sampleType || {}), // Ensure sampleType exists
            keywords: Array.isArray(testDetailState.sampleType?.keywords)
              ? [
                  ...(testDetailState.sampleType?.keywords || []),
                  value,
                ]
              : [value],
          },
        });
        
        setAddKeyword(!addKeyword)
      }
  };

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated sucessfully")
      setProfile(data?.data);
      handleSucess() 
    },
    onError: (error) => {
      errorAlert("Error updating profile")
    },
  });

  const handleSubmit = (data: any) => {
    updateDiagnostic.mutate({ data: { id: profile?._id, tests: [...profile?.tests,{...testDetailState,branchId: currentBranch?._id}] } });
  }

  return <section className="my-2 w-[100%] mx-0 sm:w-[70%] md:w-[100%] h-auto p-4">
    <AddKeyWordHeader addKeyword={addKeyword} setAddKeyword={setAddKeyword} />
    {addKeyword ? <AddParameter handleAddKeyword={handleAddKeyword} /> : <ViewParameter testDetailState={testDetailState} handleSubmit={handleSubmit} />}
  </section>
}

const AddKeyWordHeader = ({ addKeyword, setAddKeyword }: any) => {

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
        {!addKeyword ? "Add Parameter" : "View Parameter"}
      </button>
    </section>
  );
};

export const AddParameter = ({handleAddKeyword}:any) => {
  return <section>
    <section className='w-[100%] sm:w-[60%] my-4'>
      <DynamicFormGenerator formProps={parameterForm} buttonText="Add Keyword" handleSubmit={handleAddKeyword} />
    </section>
  </section>
}

export const ViewParameter = ({testDetailState,handleSubmit}:any) => { 
  return <section>
       <DashboardTable columns={ParameterColumns} data={testDetailState?.sampleType?.keywords || []} />
       <Button onClick={handleSubmit}>Submit</Button>
  </section>
}

