import { StepHeader } from '@components/atoms/fileUploder/stepHeader'
import React, { useState } from 'react'
import { addReportSteps } from 'utils/static'
import { PatientDetails } from './patientDetails';
import { ReportSummary } from './reportSummary';
import { SuccessReport } from './successReport';
import { UploadReport } from './uploadReport';

export const AddReportComponent = ({setAddReports}:any) => {

  const [currentStep, setCurrentStep] = useState(addReportSteps[0]);

  const handleStep = (value:any) => {
    setCurrentStep(addReportSteps[value])
  }

  return (
    <div>
        <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
            <StepHeader stepList={addReportSteps} currentStep={currentStep}  />
        </div>
        <div className="h-auto">
                {
                  currentStep?.id === 1 && <div className="my-10 w-[90%] sm:w-[100%] md:w-[100%] h-auto p-4">
                    <PatientDetails handleSteps={handleStep}/>
                  </div>
                }
                {
                  currentStep?.id === 2 && <div className="my-10 w-[90%]  sm:w-[70%] md:w-[100%] h-auto p-4">
                    <UploadReport handleSteps={handleStep}/>
                  </div>
                }
                 {
                  currentStep?.id === 3 && <div className="my-4 w-[90%]  sm:w-[70%] md:w-[100%] h-auto p-4">
                    <ReportSummary handleSteps={handleStep}/>
                  </div>
                }
                 {
                  currentStep?.id === 4 && <div className="my-10 w-[90%]  sm:w-[70%] md:w-[100%] h-auto p-4">
                    <SuccessReport  setAddReports={setAddReports} />
                  </div>
                }
        </div>
    </div>
  )
}
