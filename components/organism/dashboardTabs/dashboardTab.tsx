import { Fragment, useEffect } from 'react'
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';

import { DashBanner } from '@components/molecules/dashboardItems/banner';
import { DashCard } from '@components/molecules/dashboardItems/dashCard';
import ReportSharedVsTime2 from '@components/molecules/dashboardItems/chart';
import { DashActivity } from '@components/molecules/dashboardItems/activity';


export default function DashboardTab() {
  
  Chart.register(CategoryScale);
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
    </Fragment>
  )
}
