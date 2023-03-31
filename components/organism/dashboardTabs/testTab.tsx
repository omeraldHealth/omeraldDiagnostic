
import { Fragment, useState } from 'react'
import { TestTable } from '@components/molecules/test/testTable';
import { TestToggle } from '@components/molecules/test/testToggle';
import React from 'react'
import { AddTestComponent } from '@components/molecules/addReport/addTest';

export default function TestTab() {
  const [showTest,setShowTest] = useState(false)

  return (
    <Fragment>
         <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner relative flex w-100 justify-center">
            <TestToggle showTest={showTest} setShowTest={setShowTest}  />
            <div className='w-[70vw] bg-white shadow-lg mt-14 h-[70vh] rounded-lg]'> 
            {!showTest ? <TestTable /> : <AddTestComponent setTest={setShowTest} />}
            </div>
        </div>
    </Fragment>   
  )
}
