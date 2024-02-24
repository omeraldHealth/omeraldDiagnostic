import React, { useState } from 'react';
import { StepHeader } from '@components/atoms/fileUploder/stepHeader';
import { addTestSteps } from 'utils/static/static';
import { SuccessTest } from '../addTest/successTest';
import { TestDetail } from '../addTest/testDetail';
import { AddKeywords } from '../addTest/addKeywords';

export const AddTestComponent = ({ setTest, edit }: any) => {
  const [currentStep, setCurrentStep] = useState(addTestSteps[0]);

  const handleSuccess = () => {
    setTest(false);
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 1:
        return <TestDetail handleSteps={() => setCurrentStep(addTestSteps[1])} />;
      case 2:
        return <AddKeywords handleBack={() => setCurrentStep(addTestSteps[0])} handleSucess={() => setCurrentStep(addTestSteps[2])} />;
      case 3:
        return <SuccessTest handleSucess={handleSuccess} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
        <StepHeader stepList={addTestSteps} currentStep={currentStep} />
      </div>
      <div className="h-auto">{renderStepContent()}</div>
    </div>
  );
};

