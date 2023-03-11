import { getDiagnosticUserApi, getQueriesApi } from '@utils';
import { Badge, Tabs } from 'antd';
import { Fragment } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { settingsTab } from 'utils/static';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Spinner } from '@components/atoms/loader';


const Billing = dynamic(() => import('@components/organism/settingsTabs/billing').then(res=>res.Billing),{loading: () => <Spinner/>})
const Activity = dynamic(() => import('@components/organism/settingsTabs/activity').then(res=>res.Activity),{loading: () => <Spinner/>})
const BranchManagement = dynamic(() => import('@components/organism/settingsTabs/branchMan').then(res=>res.BranchManagement),{loading: () => <Spinner/>})
const EmployeeManagement = dynamic(() => import('@components/organism/settingsTabs/employe').then(res=>res.EmployeeManagement),{loading: () => <Spinner/>})
const PathologistManagement = dynamic(() => import('@components/organism/settingsTabs/pathologis').then(res=>res.PathologistManagement),{loading: () => <Spinner/>})
const Support = dynamic(() => import('@components/organism/settingsTabs/support').then(res=>res.Support),{loading: () => <Spinner/>})

const components = [
  <Billing />,
  <Activity />,
  <EmployeeManagement  />,
  <BranchManagement  />,
  <PathologistManagement />,
  <Support/>
]

export default function SettingsTab({selectedTabId}:any) {
  return (
    <Fragment>
          <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
          <div className='w-[70vw] bg-white shadow-lg mt-10 h-[70vh] rounded-lg] p-8'>
            <Tabs
                defaultActiveKey={selectedTabId}
                style={{
                  height: 220,
                }}
                items={settingsTab.map((_, i) => {
                  const id = String(i);
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
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  const {data:queries} = useQuery("queries",()=>{return axios.get(getQueriesApi+diagnosticDetails?.phoneNumber)})
  let count = 0;
  if(index ==1){
    count = diagnosticDetails?.activities?.length;
  }else if(index == 2){
    count = diagnosticDetails?.managersDetail?.length;
  }else if(index == 3){
    count = diagnosticDetails?.branchDetails?.length;
  }else if(index == 4){
    count = diagnosticDetails?.pathologistDetail?.length;
  }else if(index == 5){
    count = queries?.data?.length || 10; 
  }

 return <p>
  {settingsTab[index]}
  {index!=0 &&<span className='mx-2'>
    <Badge showZero count={count}></Badge>
  </span>}
  </p>
}