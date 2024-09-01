import React, { useState } from 'react';
import { ReportToggle } from '@components/molecules/test/reportToggle';
import { DashboardTable } from '@components/molecules/dashboardItems/data-table';
import { ReportTableColumns } from '@utils/forms/form';
import { useDeleteReports, useQueryGetData } from '@utils/reactQuery';
import { getDiagReportsApi } from '@utils/index';
import { AddReportComponent } from '../../molecules/addReport/addReport';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';
import { Switch } from 'antd';
import PreviewComponent from './previewReport';

export default function ReportsTab() {
  const [showReport, setShowReport] = useState(false);
  const { data: reports, refetch } = useQueryGetData(
    'reports',
    getDiagReportsApi,
  );
  const [id, setDeleteId] = useState('');
  const [previewRecord, setPreviewRecord] = useState({});
  const currentBranch = useCurrentBranchValue();
  const [previewReportModalOpen, setPreviewReportModalOpen] = useState(false);
  const reportsList = reports?.data?.filter(
    (report: any) => report?.diagnosticCenter?.branch.id === currentBranch?._id,
  );

  const deleteMutation = useDeleteReports(id, {
    onSuccess: (data) => {
      successAlert('Deleted Report');
      refetch();
    },
    onError: (error) => {
      errorAlert('Error Deleting Report');
    },
  });

  const handleRemove = (value: any) => {
    setDeleteId(value?._id);
    deleteMutation.mutate();
  };

  const handlePreview = (record) => {
    setPreviewRecord(record);
    setPreviewReportModalOpen(true);
  };

  return (
    <div className="p-0 h-auto bg-signBanner">
      <span className="flex justify-end">
        <Switch
          style={{ fontSize: '10px' }}
          checkedChildren="Add"
          unCheckedChildren="View"
          checked={showReport}
          className="bg-black"
          onChange={() => setShowReport(!showReport)}
        />
      </span>
      <div className=" h-auto bg-white mt-4">
        <>
          {!showReport ? (
            <>
              {reports && reports.data && reports.data.length > 0 ? (
                <DashboardTable
                  pageSize={7}
                  columns={ReportTableColumns(handleRemove, handlePreview)}
                  data={reportsList}
                />
              ) : (
                <DashboardTable
                  pageSize={7}
                  columns={ReportTableColumns(handleRemove, handlePreview)}
                  data={[]}
                />
              )}
            </>
          ) : (
            <AddReportComponent
              refetch={refetch}
              setAddReports={setShowReport}
            />
          )}
        </>
        {previewReportModalOpen && (
          <PreviewComponent
            showPreview={previewReportModalOpen}
            onClose={() => setPreviewReportModalOpen(false)}
            record={previewRecord}
          />
        )}
      </div>
    </div>
  );
}
