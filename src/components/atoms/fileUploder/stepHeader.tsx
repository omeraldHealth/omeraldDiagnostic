import React, { Fragment } from "react";
import { OnboardStepsType } from "@utils/index";

interface StepHeaderProps {
  stepList: OnboardStepsType[];
  currentStep: OnboardStepsType;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  stepList,
  currentStep,
}) => {
  return (
    <>
      {stepList.map((step, index) => (
        <Fragment key={index}>
          <span
            id="stepId"
            className={`rounded-full font-bold text-lg shadow-sm sm:text-xs px-2 p-1 mx-1 sm:pl-1 lg:p-2 lg:px-3  
              ${currentStep.id === step.id && "bg-blue-700 text-white"}
              ${currentStep.id < step.id && "bg-white text-blue-700"}
              ${currentStep.id > step.id && "bg-green-900 text-white"}`}
          >
            {step.id}
          </span>
          <span
            id="stepName"
            className={`mx-4 self-center hidden sm:inline-block text-xs 
              ${currentStep.id === step.id && "text-blue-700"}
              ${currentStep.id < step.id && "text-black"}
              ${currentStep.id > step.id && "text-primary"}`}
          >
            {step.name}
          </span>
          {stepList.length !== index + 1 && (
            <div
              id="line"
              className={`border self-center mx-1 sm:m-0 lg:mx-2 h-0 w-6 lg:w-10 mb-1 inline-block 
                ${currentStep.id === step.id && "border-blue-700 border-dashed"}
                ${currentStep.id < step.id && "border-dashed"}
                ${currentStep.id > step.id && "border-primary border-solid"}`}
            ></div>
          )}
        </Fragment>
      ))}
    </>
  );
};
