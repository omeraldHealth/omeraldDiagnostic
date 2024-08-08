import {CategoryScale} from 'chart.js';
import { Spinner } from '@components/atoms/loader';
import dynamic from 'next/dynamic';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);
const DashActivity = dynamic(() => import('@components/molecules/dashboardItems/activity').then(res=>res.default),{loading:()=><Spinner/>})
const ReportSharedVsTime2 = dynamic(() => import('@components/molecules/dashboardItems/chart'))
const DashCard = dynamic(() => import('@components/molecules/dashboardItems/dashCard').then(res=>res.DashCard),{loading:()=><Spinner/>})
const DashBanner = dynamic(() => import('@components/molecules/dashboardItems/banner').then(res=>res.default),{loading:()=><Spinner/>})

export default function DashboardTab() {
  return (
    <div className="bg-signBanner">
      <DashBanner/>
      <DashCard/>
      <section className="grid lg:flex gap-4 justify-between h-[45vh] my-4">
          <ReportSharedVsTime2 />
          <DashActivity/>
      </section>
    </div> 
  )
}
