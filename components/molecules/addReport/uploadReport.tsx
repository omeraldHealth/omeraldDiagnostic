import { useProfileValue } from "@components/common/constants/recoilValues";
import DynamicFormGenerator from "../form/dynamicForm";
import { useState } from "react";
import { Select } from "antd";
import { manualReportForm, patientDetailsForm, reportUploadFormArray } from "utils/types/molecules/forms.interface";
import { FileUploader } from "@components/atoms/fileUploder/fileUpload";
import { useRecoilState } from "recoil";
import { reportState } from "@components/common/recoil/report";

export const UploadReport = ({handleSteps}: any) => {
  
  const profileValue = useProfileValue();
  const [manualReport, setManualReport] = useState(null);
  const [reportValue,setReportState] = useRecoilState(reportState)
  
  const handleSubmit = (value:any):any => {
    setReportState({...reportValue,...value})
    handleSteps()
  }

  const handleSelect = (value: any) => {
    setManualReport(value);
  };  

  const handleUpload = (value: any) => {

  };  

  // const handleDate = (value: any) => {console.log(value)}

  const formProps = manualReport ? manualReportForm(profileValue) : reportUploadFormArray(handleDate, handleUpload);

  return (
    <div className="px-8 py-2">
      <section className="w-[70vh] h-auto xl:h-[40vh] xl:mt-4">
        <ReportHeader handleSelect={handleSelect} />
          {manualReport!=null && <DynamicFormGenerator
            key="manualReportForm"
            formProps={formProps}
            buttonText="Continue"
            handleSubmit={handleSubmit}
          />}
      </section>
    </div>
  );
};

const ReportHeader: React.FC<any> = ({ handleSelect }) => {
  const uploadReportType = [
    { value: true, label: 'Create Report with omerald' },
    { value: false, label: 'Upload Existing Report' },
  ]
  return (
    <section>
      <section className="my-6">
          <Select
                placeholder={"Select Report Creation Type"}
                onChange={handleSelect}
              >
                {uploadReportType && uploadReportType.map((option) => (
                  <Select.Option key={option?.value} value={option?.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
      </section>
    </section>
  );
};


