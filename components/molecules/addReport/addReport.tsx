import { StepHeader } from '@components/atoms/fileUploder/stepHeader';
import React, { useState } from 'react'
import { addReportSteps } from 'utils/static';
import { PatientDetails } from './patientDetails';
import { UploadReport } from './uploadReport';
import { ReportSummary } from './reportSummary';
import { useProfileValue, useReportValue, useTestDataValue } from '@components/common/constants/constants';
import { SuccessReport } from './successReport';

export const AddReportComponent = ({setAddReports}:any) => {
  const [currentStep, setCurrentStep] = useState(addReportSteps[0]);
  const reportValue = useReportValue()

  const handleSuccess = () => {
    setAddReports(false);
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 1:
        return <PatientDetails handleSteps={() => setCurrentStep(addReportSteps[1])} />
      case 2:
        return <UploadReport handleBack={() => setCurrentStep(addReportSteps[0])} handleSteps={() => setCurrentStep(addReportSteps[2])} />
      case 3:
        return <ReportSummary handleSuccess={() => setCurrentStep(addReportSteps[3])} report={reportValue}/>
      default:
        return <SuccessReport setAddReports={handleSuccess} />;
    }
  };

  return (
    <div>
      <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
        <StepHeader stepList={addReportSteps} currentStep={currentStep} />
      </div>
      <div className="h-auto">{renderStepContent()}</div>
    </div>
  );
}
