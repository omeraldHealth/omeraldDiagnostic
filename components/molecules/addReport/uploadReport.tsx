import { errorAlert } from '@components/atoms/alerts/alert';
import { BodyText_3 } from '@components/atoms/font';
import { BodyStyled_2 } from '@components/atoms/font/font.style';
import { getReportTypeApi } from '@utils';
import { Input, Radio, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from 'utils/hook/userDetail';
import { SET_REPORT_FORM } from 'utils/store/types';
import { DynamicFormCreator } from '../form/dynamicForm'

const PatientDetailsForm = [
    {"name":"userName","type":"text","label":"Patient Name","required":true},
    {"name":"email","type":"text","label":"Email","required":true},
    {"name":"phoneNumber","type":"contact","label":"Phone Number","required":true},
    {"name":"dob","type":"date","label":"Date of birth","required":true},
    {"name":"reportDate","type":"date","label":"Report creation date","required":true},
    {"name":"gender","type":"gender","label":"Gender","required":true},
    {"name":"doctorName","type":"pathologist","label":"Pathologist Name","required":true},
    {"name":"message","type":"textArea","label":"Message","required":true},
]

interface patientType {handleSteps?: (value:any) => void}

export const UploadReport = ({handleSteps}:patientType) => {


  const {data} = useQuery(["reportTypes"],()=>{return axios.get(getReportTypeApi)})
  let reportTypes = data && data.data
  const [selectedReport,setSelectedReport] = useState()

  const [manual,setManual] = useState({value:false,label:"False"})
  const manualOptions = [ {value:true,label:"Yes"},{value:false,label:"No"},];

  const handleOnChange = (value:any) => {
    setSelectedReport(reportTypes.filter((rep:any) => rep._id == value)[0])
    console.log(selectedReport)
  }


  return (
    <div className='p-2'>
        <BodyText_3>Do you want to upload a report?</BodyText_3>
        <section className='my-6'>
            <Radio.Group options={manualOptions} onChange={(event)=>{if(event.target.value){setManual({value:true,label:"True"})}else{ setManual({value:false,label:"False"})}
            }} value={manual.value} />
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
                    options={reportTypes.map((reportType:any) => ({ label: reportType.testName, value: reportType._id }))}
                />
            </section>
        }
   
    </div>  
  )
}
