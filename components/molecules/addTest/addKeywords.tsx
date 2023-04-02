import { errorAlert, successAlert } from '@components/atoms/alerts/alert'
import { getDiagnosticUserApi } from '@utils'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from 'utils/context/auth.context'
import { useQueryGetData, useUpdateDiagnostic } from 'utils/reactQuery'
import { SET_TEST } from 'utils/store/types'
import { testForm } from 'utils/types/molecules/forms.interface'
import { DynamicFormCreator } from '../form/dynamicForm'
import { AddKeyword } from './createdKeyword'
import { ActivityLogger } from '../logger.tsx/activity'

export const AddKeywords = ({handleSucess,handleBack,edit}:any) => {

  const testDetails = useSelector((state:any)=>state.testReducer)
  const {diagnosticDetails,activeBranch,operator} = useAuthContext();
  const [addKeyword,setAddKeyword] = useState(false)
  const queryClient = useQueryClient();
  const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
  const dispatcher = useDispatch()

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Tests Added succesfully")
      queryClient.invalidateQueries('getDiagnostic');
  
      handleSucess()
    },
    onError: (error) => {
      successAlert("Error adding tests")
    },
  });

  const handleAddKeyword = (value:any) => {
        let count = 0
        testDetails?.sampleType?.keywords.forEach((keyword:any) =>{ 
          if(keyword.keyword == value.keyword){
              ++count;
          }
        } )
        if(count>1){
            errorAlert("Keyword by name already exists")
        }else{
            let keywords = testDetails?.sampleType.keywords;
            keywords?.push(value)
            let sampleType = {
                testName:testDetails?.sampleType?.testName,
                keywords:keywords
            }
            dispatcher({type:SET_TEST,payload:{testDetails,"sampleType":sampleType}})
            successAlert("Keyword Added succesfully")
            setAddKeyword(false)
        }
  }

  const handleAddTest =async() => {
  
    if(testDetails?.sampleType?.keywords.length==0){
      errorAlert("please add keywords to proceed")
    }else{
      if(testDetails ){
        testDetails.branchId = activeBranch?._id
        let updateTest = diagnostic?.data?.tests
        
        updateTest?.push(testDetails)

        //@ts-ignore
        updateDiagnostic?.mutate({phoneNumber:diagnostic?.data?.phoneNumber,data:{"tests":updateTest}})
        ActivityLogger("Added Test "+testDetails?.sampleName,diagnostic?.data,operator,activeBranch)
      }else{
        // errorAlert("Test with name already exists")
      }
    }
  }

  const handleSuccessTest =async() => {
      if(testDetails?.sampleType?.keywords.length==0){
        errorAlert("please add keywords to proceed")
      }
      handleSucess()
  }

  return (
         <div className="my-2 w-[100%] mx-0 sm:w-[70%] md:w-[100%] h-auto p-4">
             <AddKeyWordHeader testDetails={testDetails} addKeyword={addKeyword} setAddKeyword={setAddKeyword}/>
             {!addKeyword ?
             <AddKeyword selectedTest={testDetails?.sampleType} action={true}/>:
             <section className='w-[100%] sm:w-[60%] my-4'>
                 <DynamicFormCreator button={true} buttonText="Add Keyword" handleSubmit={handleAddKeyword} formProps={testForm} />
             </section>}
             <section className='flex  my-10 sm:my-4'>
              <button onClick={handleBack} className='bg-gray-400 mx-3 text-white px-2 py-2 rounded-lg'>Back</button>
              <button onClick={!edit ? handleAddTest : handleSuccessTest} className='bg-green-700 text-white px-2 py-2 rounded-lg'>Submit</button>
             </section>
        </div>
  )
}

const AddKeyWordHeader= ({testDetails,addKeyword,setAddKeyword}:any)=>{
    return (
        <section className='flex w-[100%] mb-2 justify-between'>
        <section className='flex'>
          <p className='text-xs sm:text-sm sm:font-bold'>Sample Name :
            <span className='font-light mx-2'>{testDetails?.sampleName}</span>
          </p>
          <p className='text-xs sm:text-sm sm:font-bold'>Test Name :
            <span className='font-light mx-2'>{testDetails?.sampleType ? testDetails?.sampleType?.testName : "testName"}</span>
          </p>
        </section>
        <button onClick={()=>{setAddKeyword(!addKeyword)}} className='p-1 text-xs sm:text-md sm:px-2 bg-gray-300 text-black rounded-lg'>
         {!addKeyword? "Add Parameter":"View Parameter"}
        </button>
    </section>
    )
}