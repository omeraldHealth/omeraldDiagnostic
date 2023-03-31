import { Fragment, useEffect } from 'react'
import {CategoryScale} from 'chart.js';
import { Spinner } from '@components/atoms/loader';
import dynamic from 'next/dynamic';
import Chart from 'chart.js/auto';
import { useAuthContext } from 'utils/context/auth.context';
import { useQuery } from 'react-query';
import { getDiagnosticReports, getDiagnosticUserApi } from '@utils';
import { useDispatch } from 'react-redux';
import { SET_DIAGNOSTIC_DETAILS, SET_REPORT } from 'utils/store/types';
import axios from 'axios';

Chart.register(CategoryScale);
const DashActivity = dynamic(() => import('@components/molecules/dashboardItems/activity').then(res=>res.DashActivity),{loading:()=><Spinner/>})
const ReportSharedVsTime2 = dynamic(() => import('@components/molecules/dashboardItems/chart'))
const DashCard = dynamic(() => import('@components/molecules/dashboardItems/dashCard').then(res=>res.DashCard),{loading:()=><Spinner/>})
const DashBanner = dynamic(() => import('@components/molecules/dashboardItems/banner').then(res=>res.DashBanner),{loading:()=><Spinner/>})

export default function DashboardTab() {

  const {diagnosticDetails} = useAuthContext();
  const dispatch = useDispatch()
  const {data:diagnostic,isLoading} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})
  const {data:reports,isLoading:loading} = useQuery(["reports"],()=>{return axios.get(getDiagnosticReports+diagnosticDetails?.phoneNumber)})

  useEffect(()=>{
    if(diagnostic?.data){
      dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:diagnostic?.data})
    }
  },[diagnostic,reports])

  return (
    <Fragment>
    <div className="p-4 xl:px-8 pt-6 bg-signBanner">
      <DashBanner/>
      <DashCard/>
      <section className="grid grid-cols-1 gap-4 sm:flex justify-between h-[45vh] my-4">
          <ReportSharedVsTime2 />
          <DashActivity/>
      </section>
    </div>
    {isLoading && <Spinner/>}
    </Fragment>
  )
}
