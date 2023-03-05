import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { SignInButton } from '@components/atoms/button/button';
import { BodyText_3 } from '@components/atoms/font';
import { BodyStyled_2 } from '@components/atoms/font/font.style';
import { ArrowUpIcon, BookOpenIcon } from '@heroicons/react/20/solid';
import { getReportTypeApi } from '@utils';
import { Button, Input, Radio, Select, Upload, UploadProps } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { createReport, uploadImage, uploadReport } from 'utils/hook/userDetail';
import LogoUploader from "components/atoms/file/logoUploaders"
import { FileUploader } from '@components/atoms/file/fileUpload';
import { Spinner } from '@components/atoms/loader';
import { useDispatch, useSelector } from 'react-redux';
import { SET_REPORT_FORM } from 'utils/store/types';
import useSelection from 'antd/es/table/hooks/useSelection';
import { DynamicFormCreator } from '../form/dynamicForm';
const crypto = require("crypto");

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
  const {isLoading,data} = useQuery(["reportTypes"],()=>{return axios.get(getReportTypeApi)})
  let reportTypes = data && data.data
  const [selectedReport,setSelectedReport] = useState()
  const reportDetails = useSelector((state:any)=> state.reportFormReducer)
  const diagnosticDetails = useSelector((state:any)=> state.diagnosticReducer)
  const [reportFile,setUploadedReport] = useState(null)
  const [manual,setManual] = useState({value:false,label:"False"})
  const manualOptions = [ {value:true,label:"Yes"},{value:false,label:"No"},];
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  
  const handleOnChange = (value:any) => {
    setSelectedReport(reportTypes.filter((rep:any) => rep._id == value)[0])
  }

  const handleSubmit = async () => {

    if(selectedReport && reportFile && selectedReport.testName.length>1){
      setLoading(true)
     
      const resp = await uploadReport(reportFile)
      if(resp?.status==200){
        dispatch({type:SET_REPORT_FORM,payload:{
          ...reportDetails,
          reportUrl:resp.data.location,
          isManualReport:!manual,
          testName:selectedReport?.testName,
          status:"parsing",
          userId:diagnosticDetails?.phoneNumber
        }
        })
        const resp2 = await createReport(
          diagnosticDetails?.phoneNumber as string,
          reportDetails
        );
        if(resp.status==200){
          console.log(resp2)
          handleSteps && handleSteps(2)
          setLoading(false)
        }
      }
    }else{
      errorAlert("please select report type and upload file")
    }
    setLoading(false)
  }

  const handleImage = (value:any) => {
    console.log(value)
    setUploadedReport(value.logo)
  }

  const handleForm =async (value:any)=>{
   
    if(selectedReport &&selectedReport.testName.length>1){
      setLoading(true)
        dispatch({type:SET_REPORT_FORM,payload:{
          ...reportDetails,
          testName:selectedReport?.testName,
          userId:diagnosticDetails?.phoneNumber,
          parsedData: value,
          status:"parsed",
          isManualReport: true,
          reportId:crypto.randomBytes(20).toString("hex")
        }
        })  
        const resp2 = await createReport(
          diagnosticDetails?.phoneNumber as string,
          reportDetails
        );
        if(resp2.status==200){
          handleSteps && handleSteps(2)
          setLoading(false)
        }
    }else{
      errorAlert("please select report type")
    }
  }

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        if(info.file.originFileObj ){
          setUploadedReport(info.fileList[0].originFileObj)
        }
      }
      if(info.fileList.length!==1){
        setUploadedReport(null)
      }
      if (info.file.status === 'done') {
        successAlert(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        errorAlert(`${info.file.name} file upload failed.`);
      }
    },
  };


  return (
    <div className='p-8 relative h-[50vh]'>
        <BodyText_3>Do you want to upload a report?</BodyText_3>
        <section className='my-4'>
            <Radio.Group options={manualOptions} onChange={(event)=>{if(event.target.value){setManual({value:true,label:"True"})}else{ setManual({value:false,label:"False"})}
            }} value={manual.value} />
        </section>
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
        {
            manual.value ?
            <section className='w-[15vw]'>
                <section className='my-6'>
                  {/* <Upload  multiple={false} style={{width:20,display:"flex"}} {...props}>
                    <Button disabled={reportFile !== null} style={{width:200,display:"flex"}} className="bg-blue-100"><ArrowUpIcon className='w-[10%] mt-[2%] mx-2 ' /> Click to Upload</Button>
                  </Upload> */}
                  <FileUploader handleImage={handleImage}/>
                </section>
            </section>
            :
            <div >
            {selectedReport && (
                <DynamicFormCreator formStyle='grid grid-cols-3 my-4 gap-x-4 gap-y-4'  buttonText="Continue" formProps={getFormType(selectedReport?.keywords)} handleSubmit={handleForm}/>
            )}
          </div>
       
        }
        {manual.value && 
        <section className='my-4 flex justify-between'>
          <button onClick={()=>{handleSteps && handleSteps(0)}} className="p-2 bg-gray-400 text-white w-[8vw] rounded-lg">Back</button>
          <button onClick={handleSubmit} className="p-2 bg-secondary text-white w-[8vw] rounded-lg">Continue</button>
        </section>}

        {loading && <Spinner/>}
    </div>  
  )
}

function getFormType(keywords:any){
   let form = keywords && keywords.map((key:any) => ({ name: key.keyword,type:"text",label:`${key.keyword} (${key.normalRange},${key.unit})`,required:true,pattern:"^[0-9]*$"}))
   return form
}