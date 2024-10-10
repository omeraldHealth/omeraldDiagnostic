import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import ReportSharedVsTime2 from './home/reportShared';
import DashActivity from './home/dashActivity';
import DashCard from './home/dashCard';
import DashBanner from './home/dashBanner';

Chart.register(CategoryScale);

export default function DashboardTab() {
  return (
    <div className="bg-signBanner">
      <DashBanner />
      <DashCard />
      <section className="grid lg:flex gap-4 justify-between h-[45vh] my-4">
        <ReportSharedVsTime2 />
        <DashActivity />
      </section>
    </div>
  );
}
