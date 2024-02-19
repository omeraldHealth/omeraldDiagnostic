import { errorAlert } from "@components/atoms/alerts/alert";
import { BodyText_3 } from "@components/atoms/font"
import { getAdminReportTypesApi, getReportTypesApi } from "@utils";
import { Form, Input, Radio, SelectProps } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TEST } from "utils/store/types";
import { debounce } from 'lodash';
import { DynamicFormCreator } from "../form/dynamicForm";
import { selectForm } from "utils/types/molecules/forms.interface";
import { ShowTable } from "./showTable";
import { useQueryGetData } from "utils/reactQuery";
import axios from "axios";

export const TestDetail = ({handleSteps}:any) => {
    const [selectedValue,setSelectedValue] = useState(false)
  
    const [selectedReport,setSelectedReport] = useState()
    const [selectedReportId,setSelectedReportId] = useState()
    const [sampleName,setSampleName] = useState("")
    const [testName,setTestName] = useState("")
    const [showTable,setShowTable] = useState(false)
    const testDetail = useSelector((state:any)=>state.testReducer)
    const initialTestDetails = {
        "sampleName":sampleName,
        "testName":testName
    }

    let {data:reportTypes}  = useQueryGetData("reportTypes",getAdminReportTypesApi)
    // let reportTypes = axios.get(getReportTypesApi)
   
    const dispatch = useDispatch()
    reportTypes = reportTypes?.data;

    reportTypes = reportTypes?.map((report:any) => {
        return {
            "_id": report?._id,
            "testName":report?.name,
            "keywords": report?.parameters.map((param)=>{
                return {
                    "keyword": param?.name,
                    "unit": param?.units?.[0]?.value,
                    "minRange":param?.bioRefRange?.[0]?.min,
                    "maxRange":param?.bioRefRange?.[0]?.max,
                    "aliases": param?.aliases
                }
            })
        }
    })
    const [datas, setData] = useState<SelectProps['options']>(reportTypes);   

    useEffect(()=>{
        if(selectedValue && selectedReportId){
            let reports = reportTypes?.filter((rep:any) => rep._id == selectedReportId);
            setSelectedReport(reports[0]) 
            setShowTable(true)
        }else{
            setShowTable(false)
            setSelectedReportId(null)
        }
    },[selectedValue,selectedReportId])

    const handleSearch = (newValue: string) => {
        let temp = reportTypes?.filter((report:any)=> report.testName.toLowerCase().includes(newValue.toLowerCase()))
        setData(temp)
    };
    
    const debouncedSearch = debounce(handleSearch, 200);
    
    const handleReportChange = (value:any) => {
        setSelectedReportId(value)
    }

     const handleSubmit = () => {
            if( /^[0-9]+$/.test(sampleName) || /^[0-9]+$/.test(testName)){
                errorAlert("Please input valid string for the test or sample names")
            }else{
                delete testDetail.testDetails
                if(selectedReport && selectedValue){
                    dispatch({type:SET_TEST,payload:{"sampleName":sampleName,
                    "sampleType":{
                        "testName": selectedReport?.testName,
                        "keywords": selectedReport?.keywords
                    }}})
                    handleSteps(1)
                }else if(!selectedValue && sampleName.length>0 && testName.length>0){
                    dispatch({type:SET_TEST,payload:{
                    "sampleName":sampleName,
                    "sampleType":{
                        "testName": testName,
                        "keywords": []
                    }}})
                    handleSteps(1)
                }
                else{
                    errorAlert("Please fill all fields")
                }
            }
    }

    const handleBlur = (val:any) => {
        if (val === "sample" && sampleName.length>1 && /^[0-9]+$/.test(sampleName)) {
            errorAlert('Please input valid string for custom report!');
        } else if(val === "test" && testName.length>1 && /^[0-9]+$/.test(testName)){
            errorAlert('Please input valid string for test name!');
        }
    }
    return (
        <div className="my-5 w-[100%] sm:w-[70%] md:w-[100%] h-auto p-4 grid lg:flex">
            <section className='w-[80%] lg:w-[45%]'>
                <BodyText_3>You want to choose from existing reports?</BodyText_3>
                <section className='my-4 w-[100%]'>
                    <section className="my-6">
                        <Radio.Group onChange={(event)=>{setSelectedValue(event.target.value)}} value={selectedValue}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </section>
                    <section>
                    <BodyText_3 style='mb-4'>Please Enter Customised Test Name</BodyText_3>
                        <Input defaultValue={sampleName} className="w-full md:w-[32vw] lg:w-[16vw] border-gray-300 rounded-md" 
                        onChange={(e:any)=>{
                            setSampleName(e.target.value)
                            handleBlur("sample")
                        }} 
                        required placeholder="Custom Report Name" />
                    </section>
                        <section>
                            {
                                selectedValue ?
                                <section className="my-4">
                                    <BodyText_3 style='mb-4'>Please select the type of report</BodyText_3>
                                    <DynamicFormCreator initial={initialTestDetails} disableElement={sampleName=="" || sampleName ==" "} formProps={selectForm} handleImage={debouncedSearch} handleSubmit={handleReportChange} selectedValue={datas} button={false} />
                                </section>: 
                                <section className="my-4">
                                <BodyText_3 style='mb-4'>Please Enter Test Name</BodyText_3>
                                    <Input defaultValue={testName} className="w-full md:w-[32vw]  lg:w-[16vw] border-gray-300 rounded-md" onChange={(e:any)=>{
                                        setTestName(e.target.value)
                                        handleBlur("test")
                                    }} required placeholder="Test Name" />
                                </section>
                            }
                        </section>
                </section >
                <button onClick={handleSubmit} className="p-2 px-4 my-10 rounded-lg bg-indigo-500 text-white">Continue</button> 
            </section>
            {showTable && <section className='w-[100%]'><ShowTable selectedTest={selectedReport}/></section>}
        </div>
    )
}
