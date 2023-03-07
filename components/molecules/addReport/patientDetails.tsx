import { errorAlert } from '@components/atoms/alerts/alert';
import moment from 'moment';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addReportSteps } from 'utils/static';
import { SET_REPORT_FORM } from 'utils/store/types';
import { DynamicFormCreator } from '../form/dynamicForm'

export type ReportDetails = {
    dob: Date;
    email: string;
    gender: string;
    userId: string;
    userName: string;
    testName: string;
    reportDate: Date;
    reportId?: string;
    reportUrl?: string;
    doctorName?: string;
    isManualReport: boolean;
    status: "parsed" | "parsing";
    // parsedData?: ReportParamsData[];
};

const PatientDetailsForm = [
    {"name":"phoneNumber","type":"contact","label":"Phone Number","required":true,pattern:"^91[1-9][0-9]{9}$"},
    {"name":"userName","type":"text","label":"Patient Name","required":true,"pattern":"^[a-zA-Z ]*$"},
    {"name":"email","type":"text","label":"Email","required":true,pattern:"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    {"name":"gender","type":"gender","label":"Gender","required":true},
    {"name":"dob","type":"date","label":"Date of birth","required":true,},
    {"name":"reportDate","type":"date","label":"Report creation date","required":true},
    
    {"name":"doctorName","type":"pathologist","label":"Pathologist Name","required":false},
    {"name":"message","type":"textArea","label":"Message","required":false},
]

interface patientType {handleSteps?: (value:any) => void}

export const PatientDetails = ({handleSteps}:patientType) => {

  const diagnosticProfile = useSelector((state:any)=>state.diagnosticReducer)
  const [pathologist,setPathologist] = useState({})
  const dispatch = useDispatch()


  const handleForm =(value:any)=> {
    let notFilled:any = [];
    Object.keys(value).map((key)=>{
      if(!value[key]){
        notFilled.push(key)
      }
    })
 
    if(value.dob && value.reportDate && value.gender ){
      value["dob"] = moment(value.dob).format("YYYY-MM-DD")
      value["reportDate"] = moment(value.reportDate).format("YYYY-MM-DD")
      dispatch({type:SET_REPORT_FORM,payload:value})
      handleSteps && handleSteps(1)
    }
    else{
      errorAlert("Please fill all required fields "+notFilled.join(" "))
    }
  }
  
  const handleDate=(value:any)=>{
    if(typeof(value) != 'object'){ 
      let x = diagnosticProfile.pathologistDetail.filter((path:any)=>path._id == value)
      setPathologist(diagnosticProfile.pathologistDetail.filter((path:any)=>path._id == value)?.[0])
    }
  }

  return (
    <div className='flex'>
        <DynamicFormCreator disable={true} formStyle='grid grid-cols-2 gap-x-4 gap-y-4' handleDate={handleDate} buttonText="Continue" formProps={PatientDetailsForm} handleSubmit={handleForm}/>
    </div>
  )
}
