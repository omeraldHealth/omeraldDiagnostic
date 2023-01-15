
import AddTests from "@/components/TestTable/AddTests";
import TestTable from "@/components/TestTable/TestTable";
import React, { useEffect, useState } from "react";

const Tests = () => {

  const [addTest,setAddTest] = useState(true);

  const handleAddTests = () => {
    setAddTest(!addTest)
  }

  return (
    <div className="p-6">
      <div className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="sm:flex sm:items-center">
        {!addTest ?
          <> <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              List of Tests
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the tests offered in your lab with their parameters
            </p>
          </div>
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
          </>:
           <> <div className="sm:flex-auto">
           <h1 className="text-xl font-semibold text-gray-900">
            Add Tests
           </h1>
           <p className="mt-2 text-sm text-gray-700">
             Add list of tests offered in your lab with keywords along with its aliases and normal range
           </p>
         </div>
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
            </>
          }
        </div>
        <div className="sm:flex sm:items-center">
          {!addTest ? <TestTable /> : <AddTests />}
        </div>
      </div>
    </div>
  );
};

export default Tests;
