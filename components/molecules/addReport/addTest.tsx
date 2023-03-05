import { StepHeader } from '@components/atoms/form'
import { Spinner } from '@components/atoms/loader';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTests, updateUserDetails } from 'utils/hook/userDetail';
import { addReportSteps, addTestSteps } from 'utils/static'
import { SET_TEST } from 'utils/store/types';
import { AddKeyword } from '../addTest/createdKeyword';
import { SuccessTest } from '../addTest/successTest';
import { TestDetail } from '../addTest/testDetail';
import { DynamicFormCreator } from '../form/dynamicForm';
import { PatientDetails } from './patientDetails';
import { SuccessReport } from './successReport';
import { UploadReport } from './uploadReport';

const testForm = [
  {"name":"keyword","type":"text","label":"Keyword","required":true},
  {"name":"unit","type":"text","label":"unit","required":true},
  {"name":"normalRange","type":"contact","label":"normalRange","required":true},
  {"name":"aliases","type":"tags","label":"Aliases","required":true},
]


export const AddTestComponent = () => {
  const testDetails = useSelector((state:any)=>state.testReducer)
  const [currentStep, setCurrentStep] = useState(addTestSteps[0]);
  const {sampleName,selectedTest,testName} = useSelector((state:any)=>state.testReducer)
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  const [loading, setLoading] = useState(false);
  const [addKeyword, setAddKeywords] = useState(false);
  const dispatch = useDispatch()
  
  const handleStep = async(value:any) => {

      if(value==2){
          setLoading(true)
          let tests ={
            "sampleName":sampleName,
            "testName":selectedTest.testName ? selectedTest?.testName : testName,
            "keywords":selectedTest?.keywords
          }

          let test =  diagnosticDetails?.tests
          test.push(tests)


          let resp = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"tests":test})
          if(resp.status ===200){
          setLoading(false)
          setCurrentStep(addTestSteps[value])
          }
      }else{
        setCurrentStep(addTestSteps[value])
      }
  }

  const handleSubmit =(value:any) => {
    if(selectedTest){
      selectedTest.keywords.push(value)
      dispatch({type:SET_TEST,payload:{...testDetails,"selectedTest":selectedTest}})
   
    } 
    else{
      let selected = {
        "keywords":[value]
      }
      dispatch({type:SET_TEST,payload:{...testDetails,"selectedTest":selected}})
    }

    setAddKeywords(false)
  }

  
  return (
    <div>
        <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
            <StepHeader stepList={addTestSteps} currentStep={currentStep}  />
        </div>
        <div className="h-auto">
                {
                  currentStep?.id === 1 && <div className="my-10 w-[90%] sm:w-[70%] md:w-[100%] h-auto p-4">
                    <TestDetail handleSteps={handleStep}/>
                  </div>
                }
                {
                  currentStep?.id === 2 && 
                  <div className="my-2 w-[90%]  sm:w-[70%] md:w-[100%] h-auto p-4">
                    <section className='flex justify-between mb-2'>
                    <section className='flex'>
                      <p className='text-sm font-bold'>Sample Name :<span className='font-light mx-2'>{sampleName}</span></p>
                      <p className='text-sm font-bold'>Test Name :<span className='font-light mx-2'>{selectedTest ? selectedTest?.testName :testName}</span></p>
                    </section>
                    <button onClick={()=>{setAddKeywords(!addKeyword)}} className='p-1 px-2 bg-gray-300 text-black rounded-lg'>
                     {!addKeyword? "Add Keyword":"View Keyword"}
                    </button>
                    </section>
               
                    {!addKeyword ? 
                    <section>  
                      <AddKeyword handleSteps={handleStep}/>
                      <section className='flex justify-between my-2'>
                        <button className='ml-2 bg-gray-400 text-white px-4 py-2 rounded-lg' onClick={()=>{handleStep(0)}}>Back</button>
                        <button className='ml-2 bg-indigo-600 text-white px-4 py-2 rounded-lg' onClick={()=>{handleStep(2)}}>Submit</button>
                      </section>
                      </section>
                  
                    :<section className='w-[50%] my-10'>
                      <p className='my-4'>Add Test Parameters</p>
                         <DynamicFormCreator buttonText="Continue" handleSubmit={handleSubmit} formProps={testForm} />
                    </section>  }
                 
                  </div>
                }
                 {
                  currentStep?.id === 3 && <div className="my-10 w-[90%]  sm:w-[70%] md:w-[100%] h-auto p-4">
                    <SuccessTest />
                  </div>
                }{
                  loading && <Spinner/>
                }
        </div>
    </div>
  )
}


