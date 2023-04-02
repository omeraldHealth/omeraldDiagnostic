
import { Fragment, useState } from 'react'
import { TestTable } from '@components/molecules/test/testTable';
import { TestToggle } from '@components/molecules/test/testToggle';
import React from 'react'
import { AddTestComponent } from '@components/molecules/addReport/addTest';

export default function TestTab() {
  const [showTest,setShowTest] = useState(false)

  return (
    <Fragment>
         <div className="p-0 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner relative flex  justify-center">
            <TestToggle showTest={showTest} setShowTest={setShowTest}  />
            <div className='sm:w-[70vw] w-full bg-white sm:shadow-lg mt-14 h-[70vh] rounded-lg'> 
            {!showTest ? <TestTable /> : <AddTestComponent setTest={setShowTest} />}
            </div>
        </div>
    </Fragment>   
  )
}
