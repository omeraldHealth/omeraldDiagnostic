import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeakerIcon,ChartBarIcon,InformationCircleIcon, ShareIcon } from '@heroicons/react/20/solid';
import { SET_DASHBOARD_ROUTE } from 'utils/store/types';
import { Tooltip } from 'antd';
import {DashCardTyes} from "utils/types/atoms/atoms"
import { getDiagnosticReports, getDiagnosticUserApi } from '@utils';
import { useQueryGetData } from 'utils/reactQuery';
import { useAuthContext } from 'utils/context/auth.context';

export const DashCard = () => {
    
const {diagnosticDetails,activeBranch} = useAuthContext();
const dispatch = useDispatch()
const {data:reports} = useQueryGetData("getReports",getDiagnosticReports+diagnosticDetails?.phoneNumber)
const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
const {operator} = useAuthContext()

let testList = diagnostic?.data?.tests?.filter((test:any) => test?.branchId === activeBranch?._id)
let reportList = reports?.data?.filter((report:any) => report?.branchId === activeBranch?._id)
let employeeList = diagnostic?.data?.managersDetail?.filter((emp:any) => emp.branchId === activeBranch?._id || emp?.managerRole.toLowerCase() =="owner")

const dashCard: DashCardTyes[] = [
    {
        href:"/test",
        style:" bg-blue-900",
        icon:  <BeakerIcon className="w-10" />,
        tipInfo:"Shows the count of tests offered by your laboratory",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Tests Offered",
        value: testList?.length
    },
    {
        href:"/reports",
        style:" bg-indigo-900",
        icon:  <ChartBarIcon className="w-10" />,
        tipInfo:"Shows the count of tests offered by your laboratory",
        icon2: <InformationCircleIcon className="w-4 float-right" />,
        title: "Reports Uploaded",
        value: reportList?.length
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
        value: employeeList?.length
    }
]

let owner = operator?.managerRole?.toLowerCase() === "owner"

return (
    <section className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex justify-between" >
        {
            dashCard?.map((dash,index) => {
                return (
                    <a key={index} href="#" onClick={()=> dispatch({ type: SET_DASHBOARD_ROUTE,payload: {name:dash.title,href:dash.href,loading:false,selectedTabIndex:"2"} })}>
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
