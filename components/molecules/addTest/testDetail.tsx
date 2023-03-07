import { errorAlert } from "@components/atoms/alerts/alert";
import { BodyText_3 } from "@components/atoms/font"
import { getReportTypeApi } from "@utils";
import { Input, Radio, Select, SelectProps } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SET_TEST } from "utils/store/types";
import { debounce, sample } from 'lodash';

export const TestDetail = ({handleSteps,setShowTable}:any) => {
    const manualOptions = [ {value:true,label:"Yes"},{value:false,label:"No"},];
    const [manual,setManual] = useState({value:false,label:"False"})
    const {isLoading,data} = useQuery(["reportTypes"],()=>{return axios.get(getReportTypeApi)})
    const [selectedReport,setSelectedReport] = useState()
    const [sampleName,setSampleName] = useState("")
    const [testName,setTestName] = useState("")
    let reportTypes = data && data.data
    const dispatch = useDispatch()
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  
    // dispatch({type:SET_TEST,payload:[]})

    const handleOnChange = (value:any) => {
        let x = reportTypes.filter((rep:any) => rep._id == value);
        setSelectedReport(reportTypes.filter((rep:any) => rep._id == value)[0]) 
        dispatch({type:SET_TEST,payload:{"selectedTest":x[0],"sampleName":sampleName}})
    }

    const handleSubmit = () => {

        let duplicate = diagnosticDetails?.tests.length>0 && diagnosticDetails?.tests?.some((test:any)=>test.testName !== sampleName) || true
        if(duplicate){
            if(selectedReport && sampleName.length > 0 || manual){
                dispatch({type:SET_TEST,payload:{"isManual":!manual,"selectedTest":selectedReport,"sampleName":sampleName,"testName":testName}})
                handleSteps(1)
            }else{
                errorAlert("Please fill all fields")
            }
        }else{
            errorAlert("Test by name already exists")
        }
    }

    useEffect(()=>{
        console.log(selectedReport)
        if(sampleName!="" && manual.value && selectedReport?._id){
            setShowTable(true)
        }else{
            setShowTable(false)
            dispatch({type:SET_TEST,payload:{"selectedTest":null}})
        }
    },[sampleName,manual,selectedReport])

    const [datas, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();

    useEffect(()=>{setData(reportTypes)},[])
   
    const handleSearch = (newValue: string) => {
            let temp = reportTypes?.filter((report:any)=> report.testName.includes(newValue))
            setData(temp)
    };
    
    const debouncedSearch = debounce(handleSearch, 500);

    return (
    <div className='p-8'>
           <BodyText_3>You want to choose from existing reports?</BodyText_3>
           <section className='my-4'>
            <Radio.Group options={manualOptions} onChange={(event)=>{if(event.target.value){setManual({value:true,label:"True"})}else{ setManual({value:false,label:"False"})}
            }} value={manual.value} />
            </section>
            <section className="my-4">
                <BodyText_3 style='mb-4'>Please Enter Customised Test Name</BodyText_3>
                <Input defaultValue={sampleName} className="w-[16vw] border-gray-300 rounded-md" onChange={(e:any)=>{setSampleName(e.target.value)}} required placeholder="Custom Report Name" />
            </section>
            {
                manual.value ?
                <section className="w-[]">
                        <BodyText_3 style='mb-4'>Please select the type of report</BodyText_3>
                            <Select
                                showSearch
                            // value={value}
                            disabled={sampleName.length=='' && sampleName.length==' '}
                            className="w-[16vw]"
                            placeholder={"Test Name"}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={debouncedSearch}
                            onChange={handleOnChange}
                            notFoundContent={null}
                            options={(datas || []).map((d) => ({
                                value: d._id,
                                label: d.testName,
                            }))}
                        />
                </section>:
                <section className="my-4">
                   <BodyText_3 style='mb-4'>Please Enter Test Name</BodyText_3>
                   <Input defaultValue={testName} className="w-[16vw] border-gray-300 rounded-md" onChange={(e:any)=>{setTestName(e.target.value)}} required placeholder="Test Name" />
               </section>
            }
            <button onClick={handleSubmit} className="p-2 px-4 my-10 rounded-lg bg-indigo-500 text-white">Continue</button>
    </div>
  )
}
