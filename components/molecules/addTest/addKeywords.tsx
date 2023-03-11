import { errorAlert, successAlert } from '@components/atoms/alerts/alert'
import { getDiagnosticUserApi } from '@utils'
import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from 'utils/context/auth.context'
import { updateUserDetails } from 'utils/hook/userDetail'
import { SET_TEST } from 'utils/store/types'
import { testForm } from 'utils/types/molecules/forms.interface'
import { DynamicFormCreator } from '../form/dynamicForm'
import { AddKeyword } from './createdKeyword'

export const AddKeywords = ({handleSucess,handleBack,edit}:any) => {

  const testDetails = useSelector((state:any)=>state.testReducer)
  const {diagnosticDetails} = useAuthContext();
  const {data:diagnostic,refetch} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})

  const [addKeyword,setAddKeyword] = useState(false)
  const dispatcher = useDispatch()

  const handleSubmit = (value:any) => {
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

  const handleUpdateTest =async() => {
    if(testDetails ){
      let updateTest = diagnostic?.data?.tests
      updateTest?.push(testDetails)
      let resp = await updateUserDetails({"phoneNumber":diagnostic?.data?.phoneNumber},{"tests":updateTest})
      if(resp){
        successAlert("Test Added succesfully")
        handleSucess()
      }
    }else{
      // errorAlert("Test with name already exists")
    }
  }

  return (
         <div className="my-2 w-[90%]  sm:w-[70%] md:w-[100%] h-auto p-4">
             <AddKeyWordHeader testDetails={testDetails} addKeyword={addKeyword} setAddKeyword={setAddKeyword}/>
             {!addKeyword ?
             <AddKeyword selectedTest={testDetails?.sampleType} action={true}/>:
             <section className='w-[60%] my-4'>
                 <DynamicFormCreator button={true} buttonText="Continue" handleSubmit={handleSubmit} formProps={testForm} />
             </section>}
             <section className='flex'>
              <button onClick={handleBack} className='bg-gray-400 mx-3 text-white px-2 py-2 rounded-lg'>Back</button>
              <button onClick={!edit ? handleUpdateTest : handleSucess} className='bg-green-700 text-white px-2 py-2 rounded-lg'>Submit</button>
             </section>
        </div>
  )
}

const AddKeyWordHeader= ({testDetails,addKeyword,setAddKeyword}:any)=>{
    return (
        <section className='flex w-[100%] mb-2 justify-between'>
        <section className='flex'>
          <p className='text-sm font-bold'>Sample Name :
            <span className='font-light mx-2'>{testDetails?.sampleName}</span>
          </p>
          <p className='text-sm font-bold'>Test Name :
            <span className='font-light mx-2'>{testDetails?.sampleType ? testDetails?.sampleType?.testName : "testName"}</span>
          </p>
        </section>
        <button onClick={()=>{setAddKeyword(!addKeyword)}} className='p-1 px-2 bg-gray-300 text-black rounded-lg'>
         {!addKeyword? "Add Parameter":"View Parameter"}
        </button>
    </section>
    )
}