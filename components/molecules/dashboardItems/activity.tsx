import React from 'react'
import { useSelector } from 'react-redux'

export const DashActivity = () => {
 
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)

  return (<section className="sm:w-[30%] h-[100%] bg-white rounded-sm p-4 mb-10 sm:mb-0">
<p>Recent Activities</p>
<p className="text-xs my-2 text-gray-400 font-light">Summary of the latest updated activities</p>
    {
    diagnosticDetails?.activities ? diagnosticDetails?.activities?.map((activity,index) => {
        return ( 
        <section key={index} className="my-4 flex justify-between">
            <span className="text-xs flex">
                {/* <img src={doctorAvatar} alt="user-avatar" className="w-10 rounded-full mr-4" /> */}
                <span>
                <p className="text-light text-gray-600 mt-1">{activity.activity}</p>
                <p className="text-light text-indigo-600 mt-1">{activity.updatedTime}</p>
                </span>
            </span> 
        </section>
        )
    }):
    <>
    <p className="text-light text-sm text-gray-600 mt-8">No Activities....</p>
    </>
    }
</section>)}

