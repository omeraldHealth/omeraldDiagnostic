import { UserCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';

export const DashActivity = () => {
 
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  const date = new Date();

  return (<section className="sm:w-[30%] h-[100%] bg-white rounded-sm p-4 mb-10 sm:mb-0 max-h-[50vh] overflow-auto">
        <p>Recent Activities</p>
        <p className="text-xs my-2 text-gray-400 font-light">Summary of the latest updated activities</p>
            <section>
           {diagnosticDetails?.activities ? diagnosticDetails?.activities?.map((activity:any,index:any) => {
                return ( 
                <section key={index} className="my-4 flex justify-between ">
                    <span className="text-xs flex">
                        <UserCircleIcon className="w-8 h-8 self-center bg-blue-700 text-white rounded-full mr-2" />
                        <span>
                        <p className="text-light text-gray-600 mt-1"><span className='font-bold'>{activity.user.managerName} </span>{activity.activity}</p>
                            {activity?.updatedTime ? 
                                <span>{moment.utc(DateConverter(activity.updatedTime)).local().startOf('seconds').fromNow()}</span>:
                                <span>{moment.utc(DateConverter(date.toISOString())).local().startOf('seconds').fromNow()}</span>
                            }
                        </span>
                    </span> 
                </section>
                )
            }):<p className="text-light text-sm text-gray-600 mt-8">No Activities....</p>}
            </section> 
    </section>
)}

const DateConverter = (dateString:any) => {
    const date = new Date(dateString);
    return date
}  