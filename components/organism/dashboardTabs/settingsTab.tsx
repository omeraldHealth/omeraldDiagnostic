import { getDiagnosticUserApi } from '@utils';
import { Avatar, Badge, Tabs } from 'antd';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'utils/context/auth.context';
import { getQueries } from 'utils/hook/userDetail';
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

export default function SettingsTab({selectedTabId}:any) {

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
  const { TabPane } = Tabs;  
  
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
                    label: <Return index={i}/>,
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

const Return = ({index}:any) => {
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  let count = 0;

  const [queries,setQueries] = useState([]);
  const [query,setQuery] = useState(false);

  useEffect(()=>{
    getQueries({"phoneNumber": diagnosticDetails?.phoneNumber})
    .then(response => setQueries(response.data))
    .catch(error => console.log(error));
  },[query])

  if(index ==1){
    count = diagnosticDetails?.activities.length;
  }else if(index == 2){
    count = diagnosticDetails?.brandDetails.length;
  }else if(index == 3){
    count = diagnosticDetails?.branchDetails.length;
  }else if(index == 4){
    count = diagnosticDetails?.pathologistDetail?.length;
  }else if(index == 4){
    count = queries?.length;
  }


  


 return <p>
  {settingsTab[index]}
  {index!=0 &&<span className='mx-2'>
    <Badge showZero count={count}></Badge>
  </span>}
  </p>
}