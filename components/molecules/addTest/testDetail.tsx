import { errorAlert } from "@components/atoms/alerts/alert";
import { BodyText_3 } from "@components/atoms/font"
import { getReportTypeApi } from "@utils";
import { Input, Radio, Select } from "antd"
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { SET_TEST } from "utils/store/types";


export const TestDetail = ({handleSteps}:any) => {
    const manualOptions = [ {value:true,label:"Yes"},{value:false,label:"No"},];
    const [manual,setManual] = useState({value:false,label:"False"})
    const {isLoading,data} = useQuery(["reportTypes"],()=>{return axios.get(getReportTypeApi)})
    const [selectedReport,setSelectedReport] = useState()
    const [testName,setTestName] = useState("")
    let reportTypes = data && data.data
    const dispatch = useDispatch()


    const handleOnChange = (value:any) => {
        setSelectedReport(reportTypes.filter((rep:any) => rep._id == value)[0]) 
    }

    const handleSubmit = () => {
        if(selectedReport && testName.length>0){
            dispatch({type:SET_TEST,payload:{"isManual":!manual,"selectedTest":selectedReport,"testName":testName}})
            handleSteps(1)
        }else{
            errorAlert("Please fill all fields")
        }
   
    }

    return (
    <div className='p-8'>
           <BodyText_3>You want to choose from existing reports?</BodyText_3>
           <section className='my-4'>
            <Radio.Group options={manualOptions} onChange={(event)=>{if(event.target.value){setManual({value:true,label:"True"})}else{ setManual({value:false,label:"False"})}
            }} value={manual.value} />
            </section>
            <section className="my-4">
                <BodyText_3 style='mb-4'>Please Enter Test Name</BodyText_3>
                <Input defaultValue={testName} className="w-[25%] border-gray-300 rounded-md" onChange={(e:any)=>{setTestName(e.target.value)}} required placeholder="Test Name" />
            </section>
            {
                manual.value && 
                <section>
                <BodyText_3 style='mb-4'>Please select the type of report</BodyText_3>
                        <Select
                            style={{ width: 280 }}
                            className="mt-4"
                            defaultValue={"Select Report type"}
                            onChange={handleOnChange}
                            options={reportTypes && reportTypes.map((reportType:any) => ({ label: reportType.testName, value: reportType._id }))}
                        />
                </section>
            }
             <button onClick={handleSubmit} className="p-2 px-4 my-10 rounded-lg bg-indigo-500 text-white">Submit</button>
    </div>
  )
}
