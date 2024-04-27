// pages/index.js or wherever your form should live

import { useProfileValue } from '@components/common/constants/recoilValues';
import { reportState } from '@components/common/recoil/report';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { profile } from 'console';
import { useRecoilState } from 'recoil';
const { Option } = Select;
import {reportDataState} from "../../common/recoil/report/reportData"

export function PatientDetails({next}:any) {
  const profile = useProfileValue();
  const branchList = profile?.branchDetails;
  const pathologistList = profile?.pathologistDetail;
  const [reportData,setReportData] = useRecoilState(reportDataState)

  const onFinish = (values:any) => {
    if(values){
      setReportData({...values})
    }

    if(reportData){
      next() 
    }

  };

  return (
    <div className="container mx-auto">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="m-4"
      >
        <div className="grid grid-cols-2 gap-8 ">
          {/* Patient Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Patient Information</h2>
            <Form.Item
              name={['patient', 'name']}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Row className='grid grid-cols-2 gap-8 '>
              <Col>
                <Form.Item
                  name={['patient', 'dob']}
                  label="Date of Birth"
                  rules={[{ required: true }]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col>
              <Form.Item
                  name={['patient', 'gender']}
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name={['patient', 'contact', 'phone']}
              label="Phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['patient', 'contact', 'email']}
              label="Email"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
          
          {/* Diagnostic Center Information */}
          <div className="">
            <h2 className="text-xl font-bold mb-4">Diagnostic Center Information</h2>
            <Form.Item
              name={['diagnosticCenter', 'name']}
              label="Center Name"
              initialValue={profile?.diagnosticName || ""}
              rules={[{ required: true }]}
            >
              <Input disabled={!!profile?.diagnosticName} />
            </Form.Item>
            <Form.Item
              name={['diagnosticCenter', 'branch', 'name']}
              label="Branch Name"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select a branch"
                optionFilterProp="children"
              >
                {branchList?.map(branch => (
                  <Option key={branch._id} value={branch?.branchName}>{branch?.branchName}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={['diagnosticCenter', 'branch', 'details']}
              label="Branch Details"
            >
              <Input />
            </Form.Item>
            {/* <h2 className="text-xl font-bold mb-4">Pathologist Information</h2> */}
            <Form.Item
              name={['pathologist', 'name']}
              label="Pathalogist"
            >
              <Select
                showSearch
                placeholder="Select pathalogist"
                optionFilterProp="children"
              >
                {pathologistList?.map(path => (
                  <Option key={path._id} value={path?._id}>{path?.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}



// import { patientDetailsForm } from "utils/types/molecules/forms.interface";
// import { useProfileValue, useReportValue } from "@components/common/constants/recoilValues";
// import { useRecoilState } from "recoil";
// import { reportState } from "@components/common/recoil/report/index";
// import DynamicFormGenerator from "../../common/form/dynamicForm";
// import { useEffect, useState } from "react";
// import _, { isObject } from "lodash";
// import { useQueryGetData } from "utils/reactQuery";
// import { getAdminReportTypesApi } from "@utils";
// import { errorAlert } from "@components/atoms/alerts/alert";
// import axios from "axios";

// interface PatientDetailsProps {
//   handleSteps: () => void;
// }

// const PatientDetails: React.FC<PatientDetailsProps> = ({ handleSteps }) => {
//   const profileValue = useProfileValue();
//   const [reportValue, setReportState] = useRecoilState(reportState);
//   const [selectedValue, setSelectedValue] = useState();
//   const reportType = useQueryGetData('reportTypes', getAdminReportTypesApi);
//   const [reportList, setReportList] = useState<any[]>(reportType.data?.data || []);
//   const [testName,setTestName] = useState("")

//   const handleSubmit = (value: any): void => {
//     if(isObject(value)){
//       value = {...value, "testName":testName}
//       setReportState(value);
//       handleSteps();
//     }else{
//       const testName = reportList?.filter((report:any) => report?._id === value)[0]?.name
//       setTestName(testName)
//     }
//   };

//   const handleSearch = _.debounce(async (value: string) => {
//     try {
//       if (reportList.length > 0) {
//         const lowercasedValue = value.toLowerCase();

//         let filtered = reportList.filter((item) => item.name?.toLowerCase().includes(lowercasedValue));
//         setSelectedValue(filtered);
//       } else {
//         const response = await axios.get(getAdminReportTypesApi);
//         const reports = response.data;

//         if (response.status === 200) {
//           setReportList(reports);
//         } else {
//           errorAlert("Error fetching report list");
//         }
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       errorAlert("An error occurred while searching");
//     }
//   }, 50);

//     // Additional useEffect to handle cleanup of debounce function
//     useEffect(() => {
//       return () => handleSearch.cancel();
//     }, [handleSearch]);  
  

//   return (
//     <div className="p-8 h-auto">
//       <section className="w-[70vh] h-auto xl:min-h-[40vh] xl:mt-4">
//         <DynamicFormGenerator 
//           formProps={patientDetailsForm(profileValue)} 
//           handleSearch={handleSearch}
//           selectedValue={selectedValue}
//           buttonText="Continue" handleSubmit={handleSubmit} />
//       </section>
//     </div>
//   );
// };

// export { PatientDetails };
