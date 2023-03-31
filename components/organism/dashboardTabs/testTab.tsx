
import { Fragment, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { getDiagnosticUserApi } from '@utils';
import { useAuthContext } from 'utils/context/auth.context';
import { debounce } from 'lodash';
import { TestTable } from '@components/molecules/test/testTable';
import { TestToggle } from '@components/molecules/test/testToggle';
import React from 'react'
import axios from 'axios';
import { AddTestComponent } from '@components/molecules/addReport/addTest';

export default function TestTab() {
  const [showTest,setShowTest] = useState(false)

  const {diagnosticDetails} = useAuthContext();
  // const {data:diagnostic,refetch} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})
  const [tests,setTestData] = useState([])

  // useEffect(()=>{setTestData(diagnostic?.data?.tests)},[])

  const handleSearch = (event:any) => {
    let x = diagnostic?.data.tests.filter((test:any)=>{return test?.sampleName?.includes(event.target.value) || test?.sampleType?.testName.includes(event.target.value)})
    setTestData(x)
  }
  const debouncedSearch = debounce(handleSearch, 200);

  return (
    <Fragment>
         <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner relative flex w-100 justify-center">
            <TestToggle showTest={showTest} setShowTest={setShowTest} debouncedSearch={debouncedSearch} />
            <div className='w-[70vw] bg-white shadow-lg mt-14 h-[70vh] rounded-lg]'> 
            {/* {
              !showTest ? <TestTable refetch={refetch} tests={tests}/> : <AddTestComponent setTest={setShowTest} refetch={refetch} />
            } */}
            </div>
        </div>
    </Fragment>   
  )
}
