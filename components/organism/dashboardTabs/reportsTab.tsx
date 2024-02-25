import React, { useState } from 'react';
import { ReportToggle } from '@components/molecules/test/reportToggle';
import { DashboardTable } from '@components/molecules/dashboardItems/data-table';
import { ReportTableColumns } from 'utils/forms/form';
import { useDeleteReports, useQueryGetData } from 'utils/reactQuery';
import { getDiagReportsApi } from '@utils';
import { AddReportComponent } from '../../molecules/addReport/addReport';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';

export default function ReportsTab() {
  const [showReport, setShowReport] = useState(false);
  const { data: reports, refetch } = useQueryGetData("reports", getDiagReportsApi);
  const [id, setDeleteId] = useState("");

  const deleteMutation = useDeleteReports(id, {
    onSuccess: () => {
      successAlert("Deleted Report");
      refetch();
    },
    onError: (error) => {
      errorAlert("Error Deleting Report");
    },
  });

  const handleRemove = (value: any) => {
    setDeleteId(value?._id);
    deleteMutation.mutate();
  };

  return (
    <div className="p-0 sm:p-6 xl:p-8 h-auto bg-signBanner relative flex justify-center">
      <ReportToggle showTest={showReport} setShowTest={setShowReport} />
      <div className="w-[95vw] md:w-[90vw] xl:w-[70vw] h-auto bg-white shadow-2xl sm:shadow-lg my-24 sm:mt-14 rounded-lg">
        <>
          {!showReport ? (
            <>
              {reports && reports.data && reports.data.length > 0 ? (
                <DashboardTable pageSize={7} columns={ReportTableColumns(handleRemove)} data={reports.data} />
              ) : (
                <DashboardTable pageSize={7} columns={ReportTableColumns(handleRemove)} data={[]} />
              )}
            </>
          ) : (
            <AddReportComponent refetch={refetch} setAddReports={setShowReport} />
          )}
        </>
      </div>
    </div>
  );
}
