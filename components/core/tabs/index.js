import { useAuth } from '@/lib/auth';
import { Radio, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import {SettingsTable} from "../../settings/activity/activityTable"
import { freeImage, mailImage } from '../images/image';
import {ContactForm} from "../../BasicReportDetailsForm/ContactForm"
import axios from 'axios';
import { getQueries } from '@/lib/db';
export const SettingsTab = () => {
  const [mode, setMode] = useState('top');
  const {diagnosticDetails} = useAuth();
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const [list,setList] = useState(true)
  const [query,setQuery] = useState()
  
  useEffect(()=>{
    getQueries(diagnosticDetails?.phoneNumber)
    .then(response => setQuery(response.data))
    .catch(error => console.log(error));
  },[list])

  const settings = ["Activity Feed","Employee Management","Branch Management","Pathologists","Billing","Support"]

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
       {!list ? <button onClick={()=>{setList(!list)}} className='border-2 border-gray-300 bg-gray-500 text-white rounded-lg px-2 py-2 justify-end'>View Operator List</button>:
       <button onClick={()=>{setList(!list)}} className='border-2 border-gray-300 bg-green-800 text-white rounded-lg px-2 py-2 justify-end'>Add New Operator</button>}       
      </section>
      {list ?
      <>
        <SettingsTable data={diagnosticDetails.managersDetail} ind={1}/>,
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

  const components = [
    <SettingsTable data={diagnosticDetails.activities} ind={0} />,
    <OperatorComp  />,
    <SettingsTable data={diagnosticDetails.branchDetails} ind={2} />,
    <SettingsTable data={diagnosticDetails.pathologistDetail} ind={3} />,
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