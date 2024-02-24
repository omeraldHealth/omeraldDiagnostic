import React from 'react'
import { BeakerIcon,ChartBarIcon,InformationCircleIcon, ShareIcon } from '@heroicons/react/20/solid';
import { Tooltip } from 'antd';
import {DashCardTyes} from "utils/types/atoms/atoms"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { profileState } from '../../common/recoil/profile';
import { branchState } from '../../common/recoil/branch/branch';
import { dashTabs } from '../../common/recoil/dashboard';

export const DashCard = () => {
    
const profile = useRecoilValue(profileState);
const currentBranch = useRecoilValue(branchState)
const setDashTab = useSetRecoilState(dashTabs);

let testList = profile?.tests?.filter((test:any) => test?.branchId === currentBranch?._id)
let reportList = profile?.reports?.data?.filter((report:any) => report?.branchId === currentBranch?._id)
let employeeList = profile?.managersDetail?.filter((emp:any) => emp.branchId === currentBranch?._id || emp?.managerRole.toLowerCase() =="owner")

const dashCard: DashCardTyes[] = [
    {
        href:"/test",
        style:" bg-blue-900",
        icon:  <BeakerIcon className="w-10" />,
        tipInfo:"The number of tests your laboratory offers.",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Tests Offered",
        value: testList?.length
    },
    {
        href:"/reports",
        style:" bg-indigo-900",
        icon:  <ChartBarIcon className="w-10" />,
        tipInfo:"The number of tests your laboratory offers",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Reports Uploaded",
        value: reportList?.length
    },
    {
        href:"/reports",
        style:"bg-gray-500 ",
        icon:    <ShareIcon className="w-10" />,
        tipInfo:"The number of tests shared by your laboratory",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Reports Shared",
        value: 0
    },
    {
        href:"/settings",
        style:"bg-green-900",
        icon:   <BeakerIcon className="w-10" />,
        tipInfo:"The number of users in your diagnostic center",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Total Users",
        value: employeeList?.length
    }
]

return (
    <section className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex justify-between" >
        {
            dashCard?.map((dash,index) => {
                return (
                    <a key={index} href="#" onClick={()=>{setDashTab(dash.title)}}>
                    <section className={`md:w-[47vw] lg:w-[20vw] xl:w-[15vw] h-[12vh] sm:h-[14vh] p-2 flex justify-between rounded-md text-white ${dash.style}`}>
                        {dash.icon}
                        <span className="">
                            <Tooltip color={'#e3a909'} title={dash.tipInfo}>
                                {dash.icon2}
                            </Tooltip>
                            <p className="font-bold text-2xl flex justify-center my-2 mt-4">{dash.value ?? 0 }</p>
                            <p className="font-light text-xs xl:text-sm -mt-2">{dash.title}</p>
                        </span>
                    </section>
                    </a>
                )
            })
        }
    </section>
)}