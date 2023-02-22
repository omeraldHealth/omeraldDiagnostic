import { useAuth } from '@/lib/auth';
import { createQuery, updateTests, uploadImage } from '@/lib/db';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Spinner } from '../alerts/loader';


export function   ManagerForm({toggleManager}) {
  const [loading,setLoading] = useState(false)
  const {diagnosticDetails,setDiagnosticDetails} = useAuth()
  const [selectedValue, setSelectedValue] = useState('Select Role');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const roles = {
    "selectRole":"Select Role",
    "spoc":"SPOC",
    "operator":"Lab Operator",
    "pathologist":"Lab Pathologist",
    "manager":"Lab Manger",
    "admin":"Lab Admin"
  }

  const onSubmit = async (event) => { 
    event.preventDefault()
    setLoading(true)
    console.log(diagnosticDetails?.managersDetail)
    if(diagnosticDetails?.managersDetail.length < 1 ||  diagnosticDetails?.managersDetail.some(manager => manager.managerName !== event.target[0].value)){
        const query = {
          "managerName":event.target[0].value,
          "managerRole":selectedValue,
          "managerContact": event.target[1].value
        }
        diagnosticDetails?.managersDetail.push(query)
        setDiagnosticDetails(diagnosticDetails)
        console.log(diagnosticDetails)
        const resp = await updateTests(diagnosticDetails,diagnosticDetails?.phoneNumber)
        if(resp.status === 200){
          toggleManager(true)
        }
    }
    else{
      console.log("manager already exists")
    }
    setLoading(false)
  };

  return (
    <form id='myForm' onSubmit={onSubmit} className="w-full max-w-lg mx-auto">

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Operator Name
        </label>
        <input
          type="text"
          required={true}
          name="managerName"
          id="managerName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Operator Contact
        </label>
        <input
          type="text"
          name="contact"
          id="contact"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Operator Role
        </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={selectedValue} onChange={handleChange}>

            {Object.keys(roles).map((key)=>{
              return <option value={key}>{roles[key]}</option>
            })}
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    
      {loading &&
      <div className='w-[10vw] absolute top-10'>
       <Spinner />
      </div>}
    </form>
  );
}


