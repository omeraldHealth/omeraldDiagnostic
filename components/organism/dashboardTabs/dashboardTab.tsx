import { Fragment} from 'react'
import {CategoryScale} from 'chart.js';
import { Spinner } from '@components/atoms/loader';
import dynamic from 'next/dynamic';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);
const DashActivity = dynamic(() => import('@components/molecules/dashboardItems/activity').then(res=>res.DashActivity),{loading:()=><Spinner/>})
const ReportSharedVsTime2 = dynamic(() => import('@components/molecules/dashboardItems/chart'))
const DashCard = dynamic(() => import('@components/molecules/dashboardItems/dashCard').then(res=>res.DashCard),{loading:()=><Spinner/>})
const DashBanner = dynamic(() => import('@components/molecules/dashboardItems/banner').then(res=>res.DashBanner),{loading:()=><Spinner/>})

export default function DashboardTab() {
  return (
    <Fragment>
    <div className="p-4 xl:px-8 pt-6 bg-signBanner">
      <DashBanner/>
      <DashCard/>
      <section className="lg:grid  lg:grid-cols-2 gap-4 lg:justify-between h-[45vh] my-4">
          <ReportSharedVsTime2 />
          <hr className='my-[1vh]' />
          <DashActivity/>
      </section>
    </div>
    </Fragment>
  )
}
