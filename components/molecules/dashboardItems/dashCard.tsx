import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link';
import { BeakerIcon,ChartBarIcon,InformationCircleIcon, ShareIcon } from '@heroicons/react/20/solid';
import { SET_DASHBOARD_ROUTE } from 'utils/store/types';
import { report } from 'process';
import { Tooltip } from 'antd';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getDiagnosticReports } from '@utils';

interface DashCardTye {
    href:string,
    style:string,
    icon: any,
    tipInfo:string,
    icon2:any,
    title:string,
    value: number
}

export const DashCard = () => {
 
const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
const reportList = useSelector((state:any)=>state.reportListReducer)
const fetchReports = async () => {return await axios.get(getDiagnosticReports +diagnosticDetails?.phoneNumber)}
const {data:reports,isLoading:loading} = useQuery(["reports"],fetchReports)
const dispatch = useDispatch()

const dashCard: DashCardTye[] = [
    {
        href:"/test",
        style:" bg-blue-900",
        icon:  <BeakerIcon className="w-10" />,
        tipInfo:"Shows the count of tests offered by your laboratory",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Tests Offered",
        value: diagnosticDetails?.tests?.length
    },
    {
        href:"/reports",
        style:" bg-indigo-900",
        icon:  <ChartBarIcon className="w-10" />,
        tipInfo:"Shows the count of tests offered by your laboratory",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Reports Uploaded",
        value: reports?.data?.length
    },
    {
        href:"/reports",
        style:"bg-gray-500 ",
        icon:    <ShareIcon className="w-10" />,
        tipInfo:"Shows the count of tests offered by your laboratory",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Reports Shared",
        value: 0
    },
    {
        href:"/settings",
        style:"bg-green-900",
        icon:   <BeakerIcon className="w-10" />,
        tipInfo:"Shows the count of tests offered by your laboratory",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Total Users",
        value: diagnosticDetails.managersDetail?.length
    }
]

return (
    <section className="my-6 grid grid-cols-2 gap-4 sm:flex justify-between" >
        {
            dashCard?.map((dash,index) => {
                return (
                    <a key={index} href="#" onClick={()=> dispatch({ type: SET_DASHBOARD_ROUTE,payload: {name:dash.title,href:dash.href,loading:false,selectedTabIndex:"2"} })}>
                    <section className={`sm:w-[23%] xl:w-[15vw] h-[12vh] sm:h-[14vh] p-2 flex justify-between rounded-md text-white ${dash.style}`}>
                        {dash.icon}
                        <span className="">
                            <Tooltip color={'#e3a909'} title={dash.tipInfo}>
                                {dash.icon2}
                            </Tooltip>
                            <p className="font-bold text-2xl flex justify-center my-2 mt-4">{dash.value ?? 0 }</p>
                            <p className="font-light text-xs xl:text-sm">{dash.title}</p>
                        </span>
                    </section>
                    </a>
                )
            })
        }
    </section>
)}
