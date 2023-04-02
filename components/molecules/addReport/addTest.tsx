import { StepHeader } from '@components/atoms/fileUploder/stepHeader'
import {  addTestSteps } from 'utils/static'
import { SuccessTest } from '../addTest/successTest';
import { TestDetail } from '../addTest/testDetail';
import React, { useState } from 'react'
import { AddKeywords } from '../addTest/addKeywords';

export const AddTestComponent = ({setTest}:any) => {
  const [currentStep, setCurrentStep] = useState(addTestSteps[0]);

  const handleSuccess = ()=>{
    setTest(false)
  }

  return (
    <div >
        <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
            <StepHeader stepList={addTestSteps} currentStep={currentStep}  />
        </div>
        <div className="h-auto">
                {
                  currentStep?.id === 1 && <TestDetail handleSteps={()=>{setCurrentStep(addTestSteps[1])}}/>
                }
                {
                  currentStep?.id === 2 && <AddKeywords handleBack={()=>{setCurrentStep(addTestSteps[0])}} 
                  handleSucess={()=>{setCurrentStep(addTestSteps[2])}}/>
                }
                {
                  currentStep?.id === 3 && <SuccessTest handleSucess={handleSuccess} /> 
                }
        </div>
    </div>
  )
}


