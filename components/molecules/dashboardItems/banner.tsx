import { dashboardBanner } from '@utils'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { profileState } from '../../common/recoil/profile'
import { operatorState } from '../../common/recoil/operator'

export const DashBanner = () => {
 
  const profile = useRecoilValue(profileState);
  const operator = useRecoilValue(operatorState);

  return (
    <section className="relative">
      <img src={dashboardBanner} className="w-[100%] h-[20vh] sm:h-[18vh]" alt="dashboard-banner" /> 
      <p className="absolute top-5 left-[25%] xl:left-80 font-light text-white">Welcome {operator?.managerName || ""}!</p>
      <p className="absolute top-14 left-[25%] xl:left-80 font-light text-[10px] sm:text-xs xl:text-sm text-gray-300">You have uploaded <span className="text-orange-400">{profile?.reports?.length || 0} report</span> till date,  
           please use our add reports section to share more reports<br/> with your patients directly. Also total of <span className="text-orange-400">{profile?.tests?.length || 0} tests </span> are offered, please add more using the tests offered section. 
       </p>
    </section>
  )
}
