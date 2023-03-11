import Search from 'antd/es/transfer/search'
import React from 'react'

export const TestToggle = ({debouncedSearch,showTest,setShowTest}:any) => {
  return (
    <div>
        <section className='absolute left-20 ml-10'>
                <Search placeholder="input search text" onChange={debouncedSearch} style={{ width: 300 }} />
        </section>
            
        <section className='absolute right-10 mr-20'>
                {!showTest ? 
                <button onClick={()=>setShowTest(!showTest)} className='bg-blue-500 text-white text-bold font-light rounded-md p-2'>Add Test</button>:
                <button onClick={()=>setShowTest(!showTest)} className='bg-green-800 text-white text-bold font-light rounded-md p-2'>View Test</button>}
        </section>
    </div>
  )
}
