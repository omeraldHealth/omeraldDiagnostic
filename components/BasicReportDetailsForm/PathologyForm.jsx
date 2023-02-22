import { useAuth } from '@/lib/auth';
import { createQuery, updateTests, uploadImage } from '@/lib/db';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select } from 'antd';
import React, { useState } from 'react';
import { Spinner } from '../alerts/loader';


export function PathologyForm({toggleManager}) {
  const [loading,setLoading] = useState(false)
  const {diagnosticDetails,setDiagnosticDetails} = useAuth()
  const [signature, setSignature] = useState("");
  const [manager,setmanager] = useState(diagnosticDetails?.managersDetail[0])
  const handleChange = (event) => {
    console.log(event)
    setmanager(diagnosticDetails?.managersDetail?.filter(manager => manager.managerName === event)[0])
    console.log(manager)
  };

  const onSubmit = async (event) => { 

    event.preventDefault()
    setLoading(true)
    console.log(event.target[2].files[0])

    if(diagnosticDetails?.pathologistDetail.length < 1 ||  diagnosticDetails?.pathologistDetail.some(manager => manager.name !== event.target[0].value)){
        
        const signature = await uploadImage(event.target[2].files[0])
        if(signature){
          const query = {
            "name":event.target[0].value,
            "designation":event.target[1].value,
            "signature": signature
          }
          diagnosticDetails?.pathologistDetail.push(query)
          setDiagnosticDetails(diagnosticDetails)
          const resp = await updateTests(diagnosticDetails,diagnosticDetails?.phoneNumber)
          if(resp.status === 200){
            toggleManager(true)
          }
        }
      
      
    }
    else{
      console.log("pathologists already exists")
    }
    setLoading(false)
  };

  return (
    <form id='myForm' onSubmit={onSubmit} className="w-full max-w-lg mx-auto">

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Pathologist Name
        </label>
        <input
          type="text"
          required={true}
          name="name"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Pathologist Designation
        </label>
        <input
          type="text"
          required={true}
          name="designation"
          id="designation"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Pathologist Signature
        </label>
        <input
          type="file"
          required={true}
          name="signature"
          id="signature"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
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


