import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { BodyText_3 } from "@components/atoms/font";
import { customTestForm, selectForm, templateTestForm } from "utils/types/molecules/forms.interface";
import { ShowTable } from "./showTable";
import { useRecoilState } from "recoil";
import { testDetailsState } from "components/common/recoil/testDetails/index";
import DynamicFormGenerator from "../form/dynamicForm";
import _ from "lodash";
import { useQueryGetData } from "utils/reactQuery";
import { getAdminReportTypesApi } from "@utils";
import { useBooleanValue } from "@components/common/constants/constants";

const formArrays = {
    customForm: customTestForm,
    templatedForm: templateTestForm,
};

export const TestDetail = ({handleSteps}:any) => {
    const [selectedValue,setSelectedValue] = useState(false)
    const [showTable,setShowTable] = useState(false)
    const [testDetailState,setTestDetail] = useRecoilState(testDetailsState)
    const reportType = useQueryGetData("reportTypes",getAdminReportTypesApi);
    const [reportList,setReportList] = useState(reportType.data?.data || [])
    const [selectedReport,setSelectedReport] = useState([])
    const [defaultValue,setDefaultValue] = useState({})
    const booleanValue = useBooleanValue()

    function transformData(inputArray: any) {
        return inputArray?.length>0 && inputArray?.map((item:any) => {
          const { _id, name, aliases, bioRefRange } = item;
      
          const keyword = {
            keyword: name,
            aliases: aliases,
            minRange: '',
            maxRange: '',
            unit: '',
            _id: _id,
          };
      
          if (bioRefRange && bioRefRange.length > 0) {
            const { min, max } = bioRefRange[0];
      
            keyword.minRange = min !== undefined ? min.toString() : '';
            keyword.maxRange = max !== undefined ? max.toString() : '';
          }
      
          return keyword;
        });
    }
      
    const handleFormSubmit = (value: any) => {
        if(!selectedValue){
            let testType = {
                sampleName: value.sampleName,
                sampleType: {testName: value.testName,}
            }
            // @ts-ignore
            setTestDetail(testType)
            handleSteps() 
        }else{
          
            let filteredReport = reportList.filter((item: any) => item._id === value?.testName)[0]
            let testType = {
                sampleName: value.sampleName,
                sampleType: {testName: filteredReport?.name || "",keywords: transformData(filteredReport    ?.parameters)}
            }
            // @ts-ignore
            setTestDetail(testType)
            handleSteps() 
        }
    };

    const handleSearch = _.debounce((value: any) => {
        let filtered = reportList.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()))
        setSelectedReport(filtered)
        // Add your search logic here
    }, 300);

    useEffect(()=>{
      if(booleanValue && testDetailState){
          setDefaultValue({"sampleName":testDetailState.sampleName, "testName":testDetailState.sampleType.testName})
        }
    },[booleanValue])

    return (
        <div className="my-5 w-[100%] sm:w-[70%] md:w-[100%] h-auto p-4 grid lg:flex">
            <section className='w-[80%] lg:w-[45%]'>
                {!booleanValue && <TestDetailHeader selectedValue={selectedValue} setSelectedValue={setSelectedValue} />}
                <section className='my-4 w-[100%]'>
                    {selectedValue ? <DynamicFormGenerator formProps={formArrays?.templatedForm || selectForm} 
                        buttonText={"Continue" || ""} handleSubmit={handleFormSubmit} defaultValues={defaultValue}
                        handleSearch={handleSearch} selectedValue={selectedReport} 
                        />:
                    <>
                        {
                          booleanValue ? <>
                             {defaultValue && <DynamicFormGenerator defaultValues={defaultValue} formProps={formArrays?.customForm || selectForm} buttonText={"Continue" || ""} handleSubmit={handleFormSubmit} />}
                             </>
                          : 
                          <DynamicFormGenerator formProps={formArrays?.customForm || selectForm} buttonText={"Continue" || ""} handleSubmit={handleFormSubmit} />
                        }
                    </>}
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

