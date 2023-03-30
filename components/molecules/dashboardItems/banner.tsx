import { dashboardBanner, getDiagnosticReports } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export const DashBanner = () => {
 
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  const {data:reports,isLoading:loading} = useQuery(["reports"],()=>{return axios.get(getDiagnosticReports+diagnosticDetails?.phoneNumber)})


  return (
    <section className="relative">
      <img src={dashboardBanner} className="w-[100%] h-[22vh] sm:h-[18vh]" alt="dashboard-banner" /> 
      <p className="absolute top-5 left-[25%] xl:left-80 font-light text-white">Welcome {diagnosticDetails?.managersDetail?.[0]?.managerName || ""}!</p>
      <p className="absolute top-14 left-[25%] xl:left-80 font-light text-xs xl:text-sm text-gray-300">You have uploaded <span className="text-orange-400">{reports?.data?.length || 0} report</span> till date, 
          please use our add reports section to share more reports<br/> with your patients directly. Also total tests offered are <span className="text-orange-400">{diagnosticDetails?.tests?.length || 0} </span> you can add more using the tests offered section.
       </p>
    </section>
  )
}
