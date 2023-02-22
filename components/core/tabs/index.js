import { useAuth } from '@/lib/auth';
import { Radio, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import {SettingsTable} from "../../settings/activity/activityTable"
import { freeImage, houseImage, mailImage, scientistImage } from '../images/image';
import {ContactForm} from "../../BasicReportDetailsForm/ContactForm"
import {ManagerForm} from "../../BasicReportDetailsForm/ManagerForm"
import {BranchForm} from "../../BasicReportDetailsForm/BranchForm"
import {PathologyForm} from "../../BasicReportDetailsForm/PathologyForm"

import axios from 'axios';
import { getQueries, getUserDetails, updateTests } from '@/lib/db';
export const SettingsTab = () => {
  const [mode, setMode] = useState('top');
  const {diagnosticDetails,setDiagnosticDetails} = useAuth();
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const [list,setList] = useState(true)
  const [managerList,setManagerList] = useState(true)
  const [branchList,setBranchList] = useState(true)
  const [pathList,setPathList] = useState(true)
  const [query,setQuery] = useState()
  const [operators,setOperators] = useState(diagnosticDetails?.managersDetail)
  const [branch,setBranch] = useState(diagnosticDetails?.branchDetails)
  const [pathologist,setPathologist] = useState(diagnosticDetails?.pathologistDetail)

  useEffect(()=>{
    getQueries(diagnosticDetails?.phoneNumber)
    .then(response => setQuery(response.data))
    .catch(error => console.log(error));
  },[list])

  const settings = ["Activity Feed","Employee Management","Branch Management","Pathologists","Billing","Support"]

  const handleDeleteOperator = async (data) =>{
    diagnosticDetails["managersDetail"] = diagnosticDetails?.managersDetail.filter(manager => manager._id !== data._id )
    setDiagnosticDetails(diagnosticDetails)
  
    const resp = await updateTests(diagnosticDetails,diagnosticDetails?.phoneNumber)  
    if(resp?.status === 200){
      setOperators(diagnosticDetails?.managersDetail)
    }
  }
  const handleDeleteBranch = async (data) =>{
    console.log(data)
    console.log(diagnosticDetails?.branchDetails.filter(manager => manager._id !== data._id ))
    diagnosticDetails["branchDetails"] = diagnosticDetails?.branchDetails.filter(manager => manager._id !== data._id )
    setDiagnosticDetails(diagnosticDetails)
  
    const resp = await updateTests(diagnosticDetails,diagnosticDetails?.phoneNumber)  
    if(resp?.status === 200){
      setBranch(diagnosticDetails?.branchDetails)
    }
  }

  const handleDeletePathologist = async (data) =>{
    diagnosticDetails["pathologistDetail"] = diagnosticDetails?.pathologistDetail.filter(manager => manager._id !== data._id )
    setDiagnosticDetails(diagnosticDetails)
  
    const resp = await updateTests(diagnosticDetails,diagnosticDetails?.phoneNumber)  
    if(resp?.status === 200){
      setPathologist(diagnosticDetails?.branchDetails)
    }
  }
 
  const BillingComp = () => {
    return <section className='w-[100%]'>
      <img src={freeImage} className='w-[15vw] m-auto my-10' />
      <p className='text-orange-500 text-lg text-center w-[50%] m-auto'><span className='font-bold text-green-800'>Great news! 
      Our service is completely free of charge</span><br/> We're happy to offer this service to you for free and we hope that you continue to find it helpful. </p>
    </section>
  }
  const ContactComp = () => {
    return <section>
       <section className='w-[100%] flex justify-end mb-6'>
       {!list ? <button onClick={()=>{setList(!list)}} className='border-2 border-gray-300 bg-gray-500 text-white rounded-lg px-2 py-2 justify-end'>View Queries</button>:
       <button onClick={()=>{setList(!list)}} className='border-2 border-gray-300 bg-green-800 text-white rounded-lg px-2 py-2 justify-end'>Create Queries</button>}       
      </section>
      {list ?
      <>
        <SettingsTable data={query ? query : []} ind={4} />,
      </>:<>
      <section  className='flex w-[100%] justify-center my-10 py-4'>
        <img src={mailImage} className="w-[25%]"/>
        <section className='w-[60%]'>
        <ContactForm {...diagnosticDetails} toggle={setList}/>
      </section>
      </section>
      </>
      }
    </section>
  }
  const OperatorComp = () => {
    return <section>
       <section className='w-[100%] flex justify-end mb-6'>
       {!managerList ? <button onClick={()=>{setManagerList(!managerList)}} className='border-2 border-gray-300 bg-gray-500 text-white rounded-lg px-2 py-2 justify-end'>View Operator List</button>:
       <button onClick={()=>{setManagerList(!managerList)}} className='border-2 border-gray-300 bg-green-800 text-white rounded-lg px-2 py-2 justify-end'>Add New Operator</button>}       
      </section>
      {managerList ?
      <section className='max-h-[55vh] overflow-y-auto'>
        <SettingsTable handle={handleDeleteOperator} data={operators} ind={1}/>,
      </section>:<>
      <section  className='flex w-[100%] justify-center my-10 py-4'>
        <img src={scientistImage} className="w-[25%]"/>
        <section className='w-[60%]'>
        <ManagerForm {...diagnosticDetails} toggleManager={setManagerList}/>
      </section>
      </section>
      </>
      }
    </section>
  }

  const BranchComp = () => {
    return <section>
       <section className='w-[100%] flex justify-end mb-6'>
       {!branchList ? <button onClick={()=>{setBranchList(!branchList)}} className='border-2 border-gray-300 bg-gray-500 text-white rounded-lg px-2 py-2 justify-end'>View Branch List</button>:
       <button onClick={()=>{setBranchList(!branchList)}} className='border-2 border-gray-300 bg-green-800 text-white rounded-lg px-2 py-2 justify-end'>Add New Branch</button>}       
      </section>
      {branchList ?
      <section className='max-h-[55vh] overflow-y-auto'>
        <SettingsTable handle={handleDeleteBranch} data={branch} ind={2}/>,
      </section>:<>
      <section  className='flex w-[100%] justify-center '>
        <img src={houseImage} className="w-[25%]"/>
        <section className='w-[60%]'>
        <BranchForm {...diagnosticDetails} toggleManager={setBranchList}/>
      </section>
      </section>
      </>
      }
    </section>
  }

  const PathComp = () => {
    return <section>
       <section className='w-[100%] flex justify-end mb-6'>
       {!pathList ? <button onClick={()=>{setPathList(!pathList)}} className='border-2 border-gray-300 bg-gray-500 text-white rounded-lg px-2 py-2 justify-end'>View Pathologist List</button>:
       <button onClick={()=>{setPathList(!branchList)}} className='border-2 border-gray-300 bg-green-800 text-white rounded-lg px-2 py-2 justify-end'>Add New Pathologist</button>}       
      </section>
      {pathList ?
      <section className='max-h-[55vh] overflow-y-auto'>
        <SettingsTable handle={handleDeletePathologist} data={pathologist} ind={3}/>,
      </section>:<>
      <section  className='flex w-[100%] justify-center '>
        <img src={houseImage} className="w-[25%]"/>
        <section className='w-[60%]'>
        <PathologyForm {...diagnosticDetails} toggleManager={setPathList}/>
      </section>
      </section>
      </>
      }
    </section>
  }


  const components = [
    <SettingsTable data={diagnosticDetails.activities} ind={0} />,
    <OperatorComp  />,
    <BranchComp  />,
    <PathComp  />,
    <BillingComp />,
    <ContactComp/>
  ]

  return (
    <div className='w-[100%]'>
      <Tabs
        defaultActiveKey="0"
        tabPosition={mode}
        style={{
          height: 220,
        }}
        items={settings.map((_, i) => {
          const id = String(i);
          return {
            label: settings[i],
            key: id,
            // disabled: i === 5,
            children: <>{components[i]}</>
          };
        })}
      />
    </div>
  );
};