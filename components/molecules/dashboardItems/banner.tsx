import { dashboardBanner, getDiagnosticReports, getDiagnosticUserApi } from '@utils'
import React from 'react'
import { useQueryGetData } from 'utils/reactQuery'
import { useAuthContext } from 'utils/context/auth.context'

export const DashBanner = () => {
 
  const {diagnosticDetails} = useAuthContext();
  const {data:diagnostic,isLoading}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
  const {data:reports,isLoading:loading} = useQueryGetData("getReports",getDiagnosticReports+diagnosticDetails?.phoneNumber)

  return (
    <section className="relative">
      <img src={dashboardBanner} className="w-[100%] h-[16vh] sm:h-[18vh]" alt="dashboard-banner" /> 
      <p className="absolute top-5 left-[25%] xl:left-80 font-light text-white">Welcome {diagnostic?.data?.managersDetail?.[0]?.managerName || ""}!</p>
      <p className="absolute top-14 left-[25%] xl:left-80 font-light text-xs xl:text-sm text-gray-300">You have uploaded <span className="text-orange-400">{reports?.data?.length || 0} report</span> till date, 
          please use our add reports section to share more reports<br/> with your patients directly. Also total tests offered are <span className="text-orange-400">{diagnostic?.data?.tests?.length || 0} </span> you can add more using the tests offered section.
       </p>
    </section>
  )
}
