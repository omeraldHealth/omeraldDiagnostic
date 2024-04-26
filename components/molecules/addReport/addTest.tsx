import { testDetailsState } from "@components/common/recoil/testDetails";
import { Button, Form, Input, Radio, Steps, Tabs } from "antd";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {testDataState} from "../../common/recoil/testDetails/test"

const { Step } = Steps;
const { TabPane } = Tabs;

export const AddTestComponent: React.FC<any> = ({ setTest, edit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const prev = () => setCurrentStep(currentStep-1)
  const next = () => setCurrentStep(currentStep+1)

  const steps = [
    {
      title: 'Choose Test Type',
      content: <TestDetail next={next}/>
    },
    {
      title: 'Add Parameters',
      content: 'Content for adding parameters',
    },
    {
      title: 'Success Test',
      content: 'Content for success test',
    },
  ];



  return <div className="container mx-auto p-8">
      <div className="w-[100%]">
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Steps key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="mt-5">{steps[currentStep].content}</div>
            <div>
               {currentStep === 1 && <Button type="primary" onClick={prev} className="ml-5" >Previous</Button>}
               {currentStep === 1 && <Button type="dashed" onClick={next} className="ml-5" >Submit</Button>}
            </div>
      </div>
  </div>
}

const TestDetail = ({next}:any) => {
  const [selectedValue,setSelectedValue] = useState(false);
  return  <div>
    <TestDetailHeader selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
    {selectedValue?<p></p>:<CustomTestDetails next={next}/>}
  </div>
} 

const TestDetailHeader: React.FC<any> = ({ selectedValue, setSelectedValue }) => {
  return (
    <section>
      <section className="my-6">
        <p className="my-4 text-sm">You want to choose from existing reports?</p>
        <Radio.Group onChange={(event) => setSelectedValue(event.target.value)} value={selectedValue}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </section>
    </section>
  );
};

const CustomTestDetails: React.FC<any> = ({next}:any) => {

  const [testDetailState, setTestDetail] = useRecoilState(testDataState);
  
  const onFinish = (values: any) => {
    setTestDetail(values)
    next()
  };
  console.log(testDetailState)
  return (  
    <section>
      <Form
       layout="vertical" 
        onFinish={onFinish} // Set the function to handle form submission
      >
        <Form.Item
          name="testName"
          label="Enter Test Name"
          initialValue={testDetailState?.testName}
          rules={[{ required: true, message: 'Please input the test name!' }]} // Added rules for validation
        >
          {/* Ensure the input takes the full width of the form item */}
          <Input className="w-[20vw]" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </section>
  );
};













// 


// import React, { useState } from 'react';
// import { StepHeader } from '@components/atoms/fileUploder/stepHeader';
// import { addTestSteps } from 'utils/static/static';
// import { SuccessTest } from '../addTest/successTest';
// import { TestDetail } from '../addTest/testDetail';
// import { AddKeywords } from '../addTest/addKeywords';


// interface AddTestComponentProps {
//   setTest: React.Dispatch<React.SetStateAction<boolean>>;
//   edit?: any; // Adjust the type based on your requirements
// }

// export const AddTestComponent: React.FC<AddTestComponentProps> = ({ setTest, edit }) => {
//   const [currentStep, setCurrentStep] = useState(addTestSteps[0]);

//   const handleSuccess = () => {
//     setTest(false);
//   };

//   const renderStepContent = () => {
//     switch (currentStep.id) {
//       case 1:
//         return <TestDetail handleSteps={() => setCurrentStep(addTestSteps[1])} />;
//       case 2:
//         return <AddKeywords handleBack={()=>{setCurrentStep(addTestSteps[0])}} handleSuccess={() => setCurrentStep(addTestSteps[2])} />;
//       case 3:
//         return <SuccessTest handleSuccess={handleSuccess} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
//         <StepHeader stepList={addTestSteps} currentStep={currentStep} />
//       </div>
//       <div className="h-auto">{renderStepContent()}</div>
//     </div>
//   );
// };