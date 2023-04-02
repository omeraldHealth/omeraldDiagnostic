import { UserCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { SET_DASHBOARD_ROUTE } from 'utils/store/types';
import moment from 'moment';
import React, { useContext } from 'react'
import { useAuthContext } from 'utils/context/auth.context';

export const DashActivity = () => {

  const {activeBranch} = useAuthContext()
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  //@ts-ignore
  let activities = diagnosticDetails?.activities.sort((a:any,b:any)=>new Date(b.updatedTime) - new Date(a.updatedTime)).slice(0,5)
  activities = activities?.filter((activity:any)=>activity?.branchId == activeBranch?._id)
  return (
  <section className="sm:w-[30%] h-[100%] bg-white rounded-sm px-4 py-2 mb-10 sm:mb-0 max-h-[50vh] overflow-auto">
        <p>Recent Activities</p>
        <p className="text-xs text-gray-400 font-light">Summary of the latest updated activities</p>
            <section>
                {activities.length>0 ? 
                <ActivityItem activityList={activities} /> :
                <p className="text-light text-sm text-gray-600 mt-8">No Activities....</p>}
            </section> 
</section>
)}

const ActivityItem = ({activityList}:any) => {
    const dispatch = useDispatch()
    const date = Date.now()
    return <section>
       {activityList.map((activity:any,index:any)=>{
        return (
            <section key={index} className="my-3 flex justify-between ">
                <span className="text-xs flex">
                    <UserCircleIcon className="w-8 h-8 self-center bg-blue-700 text-white rounded-full mr-2" />
                    <span>
                    <p className="text-light text-gray-600 mt-1"><span className='font-bold'>{activity.user.managerName} </span>{activity.activity}</p>
                        {activity?.updatedTime ? 
                            <span>{moment.utc(DateConverter(activity.updatedTime)).local().startOf('seconds').fromNow()}</span>:
                            <span>{moment.utc(DateConverter(date.toString())).local().startOf('seconds').fromNow()}</span>
                        }
                    </span>
                </span> 
            </section>
        )
        })}
    <a href="#" onClick={()=>{dispatch({type:SET_DASHBOARD_ROUTE,payload:{name:"Settings",href:"/settings",selectedTabIndex:"1"}})}} className='font-light text-xs text-blue-700'>Read More....</a>
    </section>
}

const DateConverter = (dateString:any) => {
    const date = new Date(dateString);
    return date
}  
