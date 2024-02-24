import React, { useState } from 'react';
import { Select } from 'antd';
import { useProfileValue } from '@components/common/constants/recoilValues';
import { useRecoilState } from 'recoil';
import DynamicFormGenerator from '../../common/form/dynamicForm';
import { manualReportForm, reportUploadFormArray } from 'utils/types/molecules/forms.interface';
import { reportState } from '@components/common/recoil/report';

interface UploadReportProps {
  handleSteps: () => void;
}

export const UploadReport: React.FC<UploadReportProps> = ({ handleSteps }) => {
  const profileValue = useProfileValue();
  const [manualReport, setManualReport] = useState<boolean | null>(null);
  const [reportValue, setReportState] = useRecoilState(reportState);

  const handleSubmit = (value: any): void => {
    setReportState({ ...reportValue, ...value });
    handleSteps();
  };

  const handleSelect = (value: boolean): void => {
    setManualReport(value);
  };

  const handleUpload = (value: any): void => {
    // Handle upload logic if needed
  };

  const handleDate = (value: any): void => {
    // Handle upload logic if needed
  };

  const formProps = manualReport ? manualReportForm(profileValue) : reportUploadFormArray(handleDate, handleUpload);

  return (
    <div className="px-8 py-2">
      <section className="w-[70vh] h-auto xl:h-[40vh] xl:mt-4">
        <ReportHeader handleSelect={handleSelect} />
        {manualReport !== null && (
          <DynamicFormGenerator
            key="manualReportForm"
            formProps={formProps}
            buttonText="Continue"
            handleSubmit={handleSubmit}
          />
        )}
      </section>
    </div>
  );
};

interface ReportHeaderProps {
  handleSelect: (value: boolean) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ handleSelect }) => {
  const uploadReportType = [
    { value: true, label: 'Create Report with Omerald' },
    { value: false, label: 'Upload Existing Report' },
  ];

  return (
    <section>
      <section className="my-6">
        <Select
          placeholder="Select Report Creation Type"
          onChange={(value) => handleSelect(value as boolean)}
        >
          {uploadReportType.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </section>
    </section>
  );
};

