

import { reportState } from "@components/common/recoil/report";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { Button, DatePicker, Form, Input, Select, Switch, Upload } from "antd";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {reportDataState} from "../../common/recoil/report/reportData"
import { useProfileValue } from "@components/common/constants/recoilValues";

interface UploadReportProps {
  handleSteps?: () => void;
  next: () => void;
  setManualReport: ()=>void;
  manualReport: boolean
}

export const UploadReport: React.FC<UploadReportProps> = ({ next, setManualReport, manualReport }) => {
  // const [manualReport, setManualReport] = useState<boolean | null>(null);
  const handleSelect = (value: boolean): void => {
    setManualReport(value);
  };

  return (
        <div className="px-8 py-2">
          <section className="w-[70vh] h-auto xl:h-[40vh] xl:mt-4">
            <ReportHeader handleSelect={handleSelect} />
            {!manualReport ? <UploadReportFile next={next}/> : <GenerateReport next={next}/>}
          </section>
        </div>
  );
}

interface ReportHeaderProps {
  handleSelect: (value: boolean) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ handleSelect }) => {
  const uploadReportType = [
    { value: false, label: 'Upload Existing Report' },
    { value: true, label: 'Generate Omerald Powered Report' },
  ];

  return (
    <section>
      <section className="my-6">
        <Select
          placeholder="Select Report Creation Type"
          defaultValue={uploadReportType.length > 0 ? uploadReportType[0].value : undefined}
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

const UploadReportFile: React.FC<any> = ({next}) => {
  const [form] = Form.useForm();
  const [reportData,setReportData] = useRecoilState(reportDataState)  
  
  const onFinish = (values) => {
    let newValue = {...values, reportDate:values?.reportDate?.toDate()}
    // Check if `values` is not empty and update the state
    if (newValue) {
      const updatedData = {
        ...reportData,
        reportData: newValue // Convert reportDate to Date object
      };
      setReportData(updatedData);
    }
    next()
    // Check if `reportData.reportData` exists and if true, log the current state and proceed to the next step
    // if (reportData?.reportData) {
    //   console.log("Updated Report Data:", reportData);
    //   if (next) {
    //     next(); // Ensure `next` is defined or handled appropriately if not
    //   } else {
    //     console.error("Next step function is undefined.");
    //   }
    // }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return <div className="h-auto">
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        reportName: '',
        isManual: false,
        reportDate: null, // Date.now is handled on the server side for default values
      }}
      className="h-auto">
       <Form.Item
        name="reportName"
        label="Enter Report Name"
        rules={[{ required: true, message: 'Please input the report name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="file"
        label="Upload Report File"
        rules={[{ required: true, message: 'Please upload the report file!' }]}
      >
         <Upload
          name="file" // The name property for the file input
          listType="text" // Or other list types like 'picture'
          beforeUpload={() => false} // Return false so that antd doesn't upload the file right away
          customRequest={dummyRequest} // Replace with your actual upload logic
        >
          <Button className="flex align-center" icon={<ArrowUpIcon className="w-4" />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="reportDate"
        label="Report Date"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}

const GenerateReport:React.FC<any> = ({next}) => {
  const [form] = Form.useForm();
  const [reportData,setReportData] = useRecoilState(reportDataState)  
  const profile = useProfileValue()
  const testList = profile?.tests

    const onFinish = (values: any) => {
      if(reportData){
        setReportData({...reportData, ...values});
      }else{
        setReportData(values);
      }
      next()
    };

    // Function to handle when an item is selected
    const handleSelect = (value) => {
      if(value){
        // Filter the reportData to find the selected report based on the ID
        let selectedReport = testList?.filter((report) => report?._id === value);
        setReportData({...reportData,parsedData: selectedReport[0]})
        
      }
    };
  
    // Filter function for searching within the dropdown
    const filterOption = (inputValue, option) => option.children.toLowerCase().includes(inputValue.toLowerCase());

  return <div>
      <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        reportName: '',
        isManual: false,
        reportDate: null, // Date.now is handled on the server side for default values
      }}
      className="h-auto">
       <Form.Item
        name="reportName"
        label="Enter Report Name"
        className="w-[20vw]"
        rules={[{ required: true, message: 'Please input the report name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="reportDate"
        label="Report Date"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
          name="reportType"
          label="Choose Report Type"
          // initialValue={testList?.testName}
          rules={[{ required: true, message: 'Please input the test name!' }]} // Added rules for validation
        >
          {/* Ensure the input takes the full width of the form item */}
          {/* <Input className="w-[20vw]" /> */}
          <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a report type"
              optionFilterProp="children" // Tells Select component to filter on the children prop
              onChange={handleSelect}
              filterOption={filterOption} // Use custom filter function for search
            >
              {testList?.map(item => (
                <Option key={item._id} value={item?._id}>{item.testName}</Option>
              ))}
            </Select>
        </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}

// import React, { useState } from 'react';
// import { Select } from 'antd';
// import { useProfileValue } from '@components/common/constants/recoilValues';
// import { useRecoilState } from 'recoil';
// import DynamicFormGenerator from '../../common/form/dynamicForm';
// import { manualReportForm, reportUploadFormArray } from 'utils/types/molecules/forms.interface';
// import { reportState } from '@components/common/recoil/report';

// interface UploadReportProps {
//   handleSteps: () => void;
//   next: () => void;
// }

// export const UploadReport: React.FC<UploadReportProps> = ({ handleSteps, next }) => {
//   const profileValue = useProfileValue();
//   const [manualReport, setManualReport] = useState<boolean | null>(null);
//   const [reportValue, setReportState] = useRecoilState(reportState);
//   const [file, setFile] = useState();

//   const handleSubmit = (value: any): void => {
//     value = {...value, reportId: file}
//     setReportState({ ...reportValue, ...value });
//     next();
//   };

//   const handleSelect = (value: boolean): void => {
//     setManualReport(value);
//   };

//   const handleUpload = (value: any): void => {
//     setFile(value)
//   };

//   const handleDate = (value: any): void => {
//     // Handle upload logic if needed
//   };

//   const formProps = manualReport ? manualReportForm(profileValue) : reportUploadFormArray(handleDate, handleUpload);

//   return (
//     <div className="px-8 py-2">
//       <section className="w-[70vh] h-auto xl:h-[40vh] xl:mt-4">
//         <ReportHeader handleSelect={handleSelect} />
//         {manualReport !== null && (
//           <DynamicFormGenerator
//             key="manualReportForm"
//             formProps={formProps}
//             buttonText="Continue"
//             handleSubmit={handleSubmit}
//           />
//         )}
//       </section>
//     </div>
//   );
// };

