import React, { useState } from "react";
import { Radio } from "antd";
import { BodyText_3 } from "@components/atoms/font";
import { customTestForm, selectForm, templateTestForm } from "utils/types/molecules/forms.interface";
import { ShowTable } from "./showTable";
import { useRecoilState } from "recoil";
import { testDetailsState } from "components/common/recoil/testDetails/index";
import DynamicFormGenerator from "../form/dynamicForm";

const formArrays = {
    customForm: customTestForm,
    templatedForm: templateTestForm,
};

export const TestDetail = ({handleSteps}:any) => {
    const [selectedValue,setSelectedValue] = useState(false)
    const [showTable,setShowTable] = useState(false)
    const [testDetailState,setTestDetail] = useRecoilState(testDetailsState)
    
    const handleFormSubmit = (value: any) => {
        if(!selectedValue){
            let testType = {
                sampleName: value.testName,
                sampleType: {testName: value.sampleName,}
            }
            // @ts-ignore
            setTestDetail(testType)
            handleSteps() 
        }
    };

    return (
        <div className="my-5 w-[100%] sm:w-[70%] md:w-[100%] h-auto p-4 grid lg:flex">
            <section className='w-[80%] lg:w-[45%]'>
                <TestDetailHeader selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                <section className='my-4 w-[100%]'>
                    {selectedValue ? <DynamicFormGenerator formProps={formArrays?.templatedForm || selectForm} buttonText={"Continue" || ""} handleSubmit={handleFormSubmit} />:
                    <DynamicFormGenerator formProps={formArrays?.customForm || selectForm} buttonText={"Continue" || ""} handleSubmit={handleFormSubmit} />}
                </section >
            </section>
            {showTable && <section className='w-[100%]'><ShowTable selectedTest={""}/></section>}
        </div>
    )
}

const TestDetailHeader: React.FC<any> = ({ selectedValue, setSelectedValue }) => {
    return (
      <section>
        <section className="my-6">
          <BodyText_3>You want to choose from existing reports?</BodyText_3>
          <Radio.Group onChange={(event) => setSelectedValue(event.target.value)} value={selectedValue}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </section>
      </section>
    );
};

