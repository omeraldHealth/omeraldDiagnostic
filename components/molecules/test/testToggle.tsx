import React from 'react'

export const TestToggle = ({debouncedSearch,showTest,setShowTest}:any) => {
  return (
    <div>            
        <section className='absolute right-10 sm:mr-2 lg:mr-3 xl:mr-24 mt-2'>
                {!showTest ? 
                <button onClick={()=>setShowTest(!showTest)} className='bg-blue-500 text-white text-bold font-light rounded-md p-2'>Add Test</button>:
                <button onClick={()=>setShowTest(!showTest)} className='bg-green-800 text-white text-bold font-light rounded-md p-2'>View Test</button>}
        </section>
    </div>
  )
}
