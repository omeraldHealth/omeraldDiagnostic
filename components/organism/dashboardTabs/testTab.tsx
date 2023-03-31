
import { Fragment, useState } from 'react'
import { getDiagnosticUserApi } from '@utils';
import { useAuthContext } from 'utils/context/auth.context';
import { TestTable } from '@components/molecules/test/testTable';
import { TestToggle } from '@components/molecules/test/testToggle';
import React from 'react'
import { AddTestComponent } from '@components/molecules/addReport/addTest';
import { useQueryGetData } from 'utils/reactQuery';

export default function TestTab() {
  const [showTest,setShowTest] = useState(false)

  const {diagnosticDetails} = useAuthContext();
  const {data:diagnostic,refetch}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
 
  return (
    <Fragment>
         <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner relative flex w-100 justify-center">
            <TestToggle showTest={showTest} setShowTest={setShowTest}  />
            <div className='w-[70vw] bg-white shadow-lg mt-14 h-[70vh] rounded-lg]'> 
            {!showTest ? <TestTable refetch={refetch} tests={diagnostic?.data?.tests}/> : <AddTestComponent setTest={setShowTest} refetch={refetch} />}
            </div>
        </div>
    </Fragment>   
  )
}
