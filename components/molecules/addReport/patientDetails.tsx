import { errorAlert } from '@components/atoms/alerts/alert';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addReportSteps } from 'utils/static';
import { SET_REPORT_FORM, SET_REPORT_TYPE } from 'utils/store/types';
import { phonePattern } from 'utils/types/molecules/forms.interface';
import { DynamicFormCreator } from '../form/dynamicForm'
import { useQueryGetData } from 'utils/reactQuery';
import { getDiagnosticReports, getReportTypesApi } from '@utils';
import axios from 'axios';

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
    {"name":"phoneNumber","type":"patientContact","label":"Phone Number","required":true,pattern:phonePattern},
    {"name":"userName","type":"text","label":"Patient Name","required":true,"pattern":"^[a-zA-Z ]*$"},
    {"name":"email","type":"email","label":"Email","required":true,pattern:"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    {"name":"gender","type":"gender","label":"Gender","required":true},
    {"name":"dob","type":"date","label":"Date of birth","required":true,},
    {"name":"reportDate","type":"date","label":"Report creation date","required":true},
    {"name":"doctorName","type":"pathologist","label":"Pathologist Name","required":false},
    {"name":"message","type":"textArea","label":"Message","required":false},
]

interface patientType {handleSteps?: (value:any) => void}

export const PatientDetails = ({handleSteps}:patientType) => {

  const [phoneNumber,setPhoneNumber] = useState();
  const [found,setFound] = useState(false);
  const [formKey,setformKey] = useState(0);
  const [initialValue,setInitialValue] = useState(null);
  const diagnosticProfile = useSelector((state:any)=>state.diagnosticReducer)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function getReport(){
      if(phoneNumber){
        let resp = await axios.get(getDiagnosticReports+phoneNumber)
        let report = resp?.data[0];
        if(report){
          let initialValues={
            phoneNumber:phoneNumber,
            userName: report?.userName,
            email:report?.email,
            gender: report?.gender,
            doctorName: report?.doctorName
          }
          setInitialValue(initialValues)
          setFound(true)
          setformKey(formKey+1)
        }else{
          setInitialValue(null)
        }
       
      }
    }
    getReport()
  },[phoneNumber])

  const handleForm =(value:any)=> {

    let notFilled:any = [];

    Object.keys(value).map((key)=>{
      if(!value[key]){
        notFilled.push(key)
      }
    })
 
    if(value.dob && value.reportDate && value.gender ){
      value["phoneNumber"] = phoneNumber
      value["dob"] = moment(value.dob).format("YYYY-MM-DD")
      value["reportDate"] = moment(value.reportDate).format("YYYY-MM-DD")
   
      const date1 = new Date(value["dob"]);
      const date2 = new Date(value["reportDate"]);
      
      if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        console.error('Invalid date string');
        return;
      }
      
      if (date1 < date2) {
        errorAlert('reportDate cannot be earlier than dob');
      } 
      

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
        {!found ? <DynamicFormCreator key={0} selectedValue={phoneNumber} setSelectedValue={setPhoneNumber} disableElement={true} phoneNumber={phoneNumber} reportsValidation={true} formStyle='sm:grid sm:grid-cols-2 gap-x-4 gap-y-4' handleDate={handleDate} buttonText="Continue" formProps={PatientDetailsForm} handleSubmit={handleForm}/>
        :
        <DynamicFormCreator key={formKey} initial={initialValue} handleImage={()=>{}}
         selectedValue={phoneNumber} setSelectedValue={setPhoneNumber} 
         disableElement={true} phoneNumber={phoneNumber} 
         reportsValidation={true} formStyle='sm:grid sm:grid-cols-2 gap-x-4 gap-y-4' handleDate={handleDate} 
         buttonText="Continue" formProps={PatientDetailsForm} handleSubmit={handleForm}/>
        }
    </div>
  )
}
