import { useAuth } from '@/lib/auth';
import { createQuery, updateTests, uploadImage } from '@/lib/db';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select } from 'antd';
import React, { useState } from 'react';
import { Spinner } from '../alerts/loader';


export function BranchForm({toggleManager}) {
  const [loading,setLoading] = useState(false)
  const {diagnosticDetails,setDiagnosticDetails} = useAuth()
  const [selectedValue, setSelectedValue] = useState({managerName:"Select Branch Operator"});
  const [manager,setmanager] = useState(diagnosticDetails?.managersDetail[0])
  const handleChange = (event) => {
    console.log(event)
    setmanager(diagnosticDetails?.managersDetail?.filter(manager => manager.managerName === event)[0])
    console.log(manager)
  };

  const onSubmit = async (event) => { 
    event.preventDefault()
    setLoading(true)
    if(diagnosticDetails?.branchDetails.length < 1 ||  diagnosticDetails?.branchDetails.some(manager => manager.managerName !== event.target[0].value)){
        const query = {
          "branchName":event.target[0].value,
          "branchEmail":event.target[1].value,
          "branchAddress": event.target[2].value,
          "branchContact": event.target[3].value,
          "branchManager": manager
        }
        diagnosticDetails?.branchDetails.push(query)
    
        const resp = await updateTests(diagnosticDetails,diagnosticDetails?.phoneNumber)
        if(resp.status === 200){
          setDiagnosticDetails(diagnosticDetails)
          toggleManager(true)
        }
    }
    else{
      console.log("branch already exists")
    }
    setLoading(false)
  };

  return (
    <form id='myForm' onSubmit={onSubmit} className="w-full max-w-lg mx-auto">

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Branch Name
        </label>
        <input
          type="text"
          required={true}
          name="branchName"
          id="branchName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Branch Email
        </label>
        <input
          type="text"
          required={true}
          name="branchEmail"
          id="branchEmail"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Branch Address
        </label>
        <input
          type="text"
          required={true}
          name="branchAddress"
          id="branchAddress"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Branch Contact
        </label>
        <input
          type="text"
          required={true}
          name="branchContact"
          id="branchContact"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Branch Manager
        </label>
        {/* <input
          type="text"
          required={true}
          name="branchContact"
          id="branchContact"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        /> */}
        <Select
        defaultValue={diagnosticDetails?.managersDetail[0].managerName}
        style={{
          width: 220,
        }}
        // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleChange}
        options={diagnosticDetails?.managersDetail.map((province) => ({
          label: province.managerName,
          value: province.managerName,
        }))}
      />
      </div>
      {/* <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Branch Manager
        </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={selectedValue} onChange={handleChange}>
            {diagnosticDetails?.managersDetail.map((key)=>{
              return <option value={key}>{key.managerName}</option>
            })}
        </select>
      </div> */}
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


