import React from 'react'
import { AddKeyword } from './createdKeyword'

export const ShowTable = ({selectedTest}:any) => {
  return (
    <div>
        <section className='w-[90vw] md:w-[100%]'>
            <p className='mb-8'>Parameters for {selectedTest?.testName}</p>
            <AddKeyword selectedTest={selectedTest} action={false}/>
        </section> 
    </div>
  )
}
