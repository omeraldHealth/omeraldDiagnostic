import { Form, Steps } from "antd";
import { useState } from "react";
import { PatientDetails } from "./patient";
import { UploadReport } from "./upload";
import ManualReport from "./manual";
import ReportSummary from "./summary";

export const AddReport = ({handleShowView}) => {
  const [currentStep, setStep] = useState(0);
  const [manualReport, setManualReport] = useState(false);
  const [form] = Form.useForm();

  const handleNext = () => setStep(currentStep + 1);
  const handlePrevious = () => setStep(currentStep - 1);

  const steps = [
    {
      title: "Patient Details",
      content: <PatientDetails form={form} handleNext={handleNext} />,
    },
    {
      title: "Upload / Generate Report",
      content: (
        <UploadReport
          manualReport={manualReport}
          setManualReport={setManualReport}
          form={form}
          next={handleNext}
        />
      ),
    },
    ...(manualReport
      ? [
          {
            title: "Manual Report Step",
            content: <ManualReport next={handleNext} form={form} />,
          },
        ]
      : []),
    {
      title: "Report Summary",
      content: <ReportSummary handleShowView={handleShowView} />,
    },
  ];

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="w-full">
        <Steps current={currentStep}>
          {steps.map((item, index) => (
            <Steps.Step key={index} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content mt-4">{steps[currentStep].content}</div>
      </div>
    </div>
  );
};
