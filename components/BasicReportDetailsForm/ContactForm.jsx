import { createQuery } from '@/lib/db';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoaderComp, Spinner } from '../alerts/loader';
import * as yup from "yup";


export function   ContactForm({phoneNumber,diagnosticName,branchDetails,email,toggle}) {
  const [loading,setLoading] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const query = {
      "phoneNumber":phoneNumber,
      "name":diagnosticName,
      "branch":branchDetails[0].branchName,
      "email":email,
      "subject":event.target[1].value,
      "message":event.target[2].value,
    }
    const resp = await createQuery(query)
    if(resp.status == 200){
      toggle(true)
    }
    setLoading(false)
  };

  return (
    <form id='myForm' onSubmit={onSubmit} className="w-full max-w-lg mx-auto">

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Diagnostic Center Branch
        </label>
        <input
         disabled={branchDetails}
          type="text"
          name="branch"
          value={branchDetails[0]?.branchName}
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message
        </label>
        <textarea
          name="message"
          id="message"
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
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


