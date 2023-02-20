
import AddTests from "@/components/TestTable/AddTests";
import TestTable from "@/components/TestTable/TestTable";
import { useAuth } from "@/lib/auth";
import { updateTests } from "@/lib/db";
import { useAmp } from "next/amp";
import React, { useEffect, useState } from "react";

const Tests = () => {

  const [addTest,setAddTest] = useState(false);
  const {diagnosticDetails} = useAuth()
  const [tests,setTests] = useState(diagnosticDetails?.tests)

  const handleAddTests = () => {
    setAddTest(!addTest)
  }

  const handleRemove = async (e:any) => {
    let x = diagnosticDetails?.tests.filter(test => test._id !== e._id)
    diagnosticDetails["tests"] = x;

    const resp = await updateTests(diagnosticDetails,diagnosticDetails?.phoneNumber)  
    if(resp?.status === 200){
      setTests(diagnosticDetails?.tests)
    }
  }

  return (
    <div className="p-2 xl:p-6 bg-signBanner">
      <div className="xl:px-4 p-4 sm:p-2 lg:px-8 mt-2 xl:mt-12">
        <div className="sm:flex sm:items-center justify-between">
          {!addTest ? <p className="font-bold text-lg ">List of Test</p>:<p className="font-bold text-lg ">Add Test</p>}
         <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
           {!addTest ?
           <button
             onClick={handleAddTests}
             type="button"
             className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
           >
             Add Tests
           </button>:
           <button
           onClick={handleAddTests}
           type="button"
           className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:w-auto"
         >
           View Tests
         </button>
           }
         </div>
        </div>
        <div className="sm:flex sm:items-center">
          {!addTest ? <TestTable handleRemove={handleRemove} tests={tests} /> : <AddTests setAddTest={setAddTest} />}
        </div>
      </div>
    </div>
  );
};

export default Tests;
