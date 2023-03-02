import { dashboardBanner } from '@utils'
import React from 'react'
import { useSelector } from 'react-redux'

export const DashBanner = () => {
 
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)

  return (
    <section className="relative">
      <img src={dashboardBanner} className="w-[100%] h-[16vh] sm:h-[18vh]" alt="dashboard-banner" /> 
      <p className="absolute top-5 left-[25%] xl:left-80 font-light text-white">Welcome {diagnosticDetails?.fullName}!</p>
      <p className="absolute top-14 left-[25%] xl:left-80 font-light text-xs xl:text-sm text-gray-300">You have uploaded <span className="text-orange-400">{diagnosticDetails?.reports?.length ?? 0} report</span> till date, 
          please use our add reports section to share more reports<br/> with your patients directly. Also total tests listed are <span className="text-orange-400">{diagnosticDetails?.tests?.length ?? 0} </span> you can add more using the tests offered section.
       </p>
    </section>
  )
}
