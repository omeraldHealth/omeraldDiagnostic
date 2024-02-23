import React, { useState } from 'react';
import { ReportToggle } from '@components/molecules/test/reportToggle';
import { DashboardTable } from '@components/molecules/dashboardItems/data-table';
import { ReportTableColumns } from 'utils/forms/form';
import { useQueryGetData } from 'utils/reactQuery';
import { getDiagReportsApi } from '@utils';
import { AddReportComponent } from '@components/molecules/addReport/addReport';

export default function ReportsTab() {
  const [showReport, setShowReport] = useState(false);

  const {data:reports} = useQueryGetData("reports", getDiagReportsApi);

  return (
    <div className="p-0 sm:p-6 xl:p-8 h-auto bg-signBanner relative flex justify-center">
      <ReportToggle showTest={showReport} setShowTest={setShowReport} />
      <div className="w-[95vw] md:w-[90vw] xl:w-[70vw] h-auto bg-white shadow-2xl sm:shadow-lg my-24 sm:mt-14 rounded-lg">
             {!showReport ?  <DashboardTable pageSize={7} columns={ReportTableColumns} data={reports?.data || []}/> : <AddReportComponent setShowReport={setShowReport} />}
      </div>
    </div>
  );
}

