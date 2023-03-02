import { Fragment, useEffect, useState } from 'react'
import { useAuthContext } from 'utils/context/auth.context';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';

import { DashBanner } from '@components/molecules/dashboardItems/banner';
import { DashCard } from '@components/molecules/dashboardItems/dashCard';
import ReportSharedVsTime2 from '@components/molecules/dashboardItems/chart';
import { DashActivity } from '@components/molecules/dashboardItems/activity';

export default function DashboardTab() {

  const {diagnosticDetails, signOut ,user} = useAuthContext();
  const [reportList, setReportList] = useState<any[]>([]);
  Chart.register(CategoryScale);

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();
    })();
  }, []);

  return (
    <Fragment>
    <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner">
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
