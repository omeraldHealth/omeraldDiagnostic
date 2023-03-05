import { getDiagnosticUserApi } from '@utils';
import { Tabs } from 'antd';
import axios from 'axios';
import { Fragment, useEffect } from 'react'
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useAuthContext } from 'utils/context/auth.context';
import { settingsTab } from 'utils/static';
import { SET_DIAGNOSTIC_DETAILS } from 'utils/store/types';
import { Activity } from '../settingsTabs/activity';
import { Billing } from '../settingsTabs/billing';
import { BranchManagement } from '../settingsTabs/branchMan';
import { EmployeeManagement } from '../settingsTabs/employe';
import { PathologistManagement } from '../settingsTabs/pathologis';
import { Support } from '../settingsTabs/support';

const components = [
  <Billing />,
  <Activity />,
  <EmployeeManagement  />,
  <BranchManagement  />,
  <PathologistManagement />,
  <Support/>
]

export default function SettingsTab() {

  const {diagnosticDetails} = useAuthContext()
  const dispatch = useDispatch()
  const fetchDiagnostic = async () => {return await axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)}
  const {data,isLoading} = useQuery(["diagnosticProfile",diagnosticDetails],fetchDiagnostic)
  dispatch({type:"SET_LOADING",payload:false})
  
  useEffect(() =>{
      if(!isLoading && data){
        dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":data.data})
      }
  },[isLoading,data])

  return (
    <Fragment>
          <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
          <div className='w-[70vw] bg-white shadow-lg mt-10 h-[70vh] rounded-lg] p-8'>
            <Tabs
                defaultActiveKey="0"
                style={{
                  height: 220,
                }}
                items={settingsTab.map((_, i) => {
                  const id = String(i);
                  return {
                    label: settingsTab[i],
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
