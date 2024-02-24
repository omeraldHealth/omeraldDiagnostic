import React, { useState } from 'react';
import { StepHeader } from '@components/atoms/fileUploder/stepHeader';
import { addReportSteps } from 'utils/static/static';
import { PatientDetails } from './patientDetails';
import { ReportSummary } from './reportSummary';
import { useReportValue } from '@components/common/constants/recoilValues';
import { UploadReport } from './uploadReport';
import { SuccessReport } from './successReport';

interface AddReportComponentProps {
  setAddReports: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddReportComponent: React.FC<AddReportComponentProps> = ({ setAddReports }) => {
  const [currentStep, setCurrentStep] = useState(addReportSteps[0]);
  const reportValue = useReportValue();

  const handleSuccess = (): void => {
    setAddReports(false);
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 1:
        return <PatientDetails handleSteps={() => setCurrentStep(addReportSteps[1])} />;
      case 2:
        return <UploadReport handleSteps={() => setCurrentStep(addReportSteps[2])} />;
      case 3:
        return <ReportSummary style='' handleSuccess={() => setCurrentStep(addReportSteps[3])} report={reportValue} />;
      default:
        return <SuccessReport refetch={() => {}} setAddReports={handleSuccess} />;
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
};

