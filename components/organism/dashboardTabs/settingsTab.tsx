import { getDiagnosticUserApi, getQueriesApi } from '@utils';
import { Badge, Tabs } from 'antd';
import { Fragment, useEffect } from 'react'
import { useQuery } from 'react-query';
// import { settingsTab } from 'utils/static';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Spinner } from '@components/atoms/loader';
import { useAuthContext } from 'utils/context/auth.context';
import { settingsTab } from 'utils/static';
import { useQueryGetData } from 'utils/reactQuery';


const Billing = dynamic(() => import('@components/organism/settingsTabs/billing').then(res=>res.Billing),{loading: () => <Spinner/>})
const Activity = dynamic(() => import('@components/organism/settingsTabs/activity').then(res=>res.Activity),{loading: () => <Spinner/>})
const BranchManagement = dynamic(() => import('@components/organism/settingsTabs/branchMan').then(res=>res.BranchManagement),{loading: () => <Spinner/>})
const EmployeeManagement = dynamic(() => import('@components/organism/settingsTabs/employe').then(res=>res.EmployeeManagement),{loading: () => <Spinner/>})
const PathologistManagement = dynamic(() => import('@components/organism/settingsTabs/pathologist').then(res=>res.PathologistManagement),{loading: () => <Spinner/>})
const Support = dynamic(() => import('@components/organism/settingsTabs/support').then(res=>res.Support),{loading: () => <Spinner/>})

let components = [
  <Billing />,
  <Activity />,
  <EmployeeManagement  />,
  <BranchManagement  />,
  <PathologistManagement />,
  <Support/>
]

export default function SettingsTab({selectedTabId}:any) {

  const {operator} = useAuthContext();

  return (
    <Fragment>
          <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
          <div className='sm:w-[70vw] w-[100%] bg-white shadow-lg mt-10 h-[70vh] rounded-lg] sm:p-8 p-4'>
            <Tabs
                defaultActiveKey={selectedTabId}
                style={{
                  height: 220,
                }}
                items={settingsTab.map((_, i) => {
                  const id = String(i);
                  if(operator?.managerRole?.toLowerCase() == "admin" && [0,2,3].includes(i)) return null
                  // if((operator?.managerRole?.toLowerCase() !== "owner" || operator?.managerRole?.toLowerCase() !== "admin") && [0,1,2,3,4,5,6].includes(i)) return null
                  return {
                    label: <SettingsBadeCount index={i}/>,
                    key: id,
                    children: <>{components[i]}</>
                  };
                })}
              />
          </div>
        </div>
    </Fragment>   
  )
}

const SettingsBadeCount = ({index}:any) => {
  const {diagnosticDetails,activeBranch} = useAuthContext()
  const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
  const {data:queries} = useQuery("queries",()=>{return axios.get(getQueriesApi+diagnosticDetails?.phoneNumber)})
  let count = 0;

  let activities = diagnostic?.data.activities?.filter((activity:any) => activity?.branchId === activeBranch?._id)
  let employees = diagnostic?.data.managersDetail?.filter((emp:any) => emp?.branchId === activeBranch?._id || emp?.managerRole.toLowerCase() === "owner")
  let query =  queries?.data?.filter((activity:any) => activity?.branchId === activeBranch?._id)
  let pathList = diagnostic?.data?.pathologistDetail?.filter((activity:any) => activity?.branchId === activeBranch?._id)

  if(index ==1){
    count = activities?.length || 0;
  }else if(index == 2){
    count = employees?.length || 0;
  }else if(index == 3){
    count = diagnostic?.data?.branchDetails?.length;
  }else if(index == 4){
    count =  pathList?.length || 0;
  }else if(index == 5){
    count = query?.length
  }

  useEffect(()=>{
  
  },[diagnostic])

 return <p>
  {settingsTab[index]}
  {index!=0 &&<span className='mx-2'>
    {/* <Badge showZero count={count}></Badge> */}
  </span>}
  </p>
}