import React, { useEffect, useState } from 'react';
import { Table, Switch, Button } from 'antd';
import { REPORTS_COLUMNS } from '../settingsTabs/utils/tabs';
import {
  useDeleteReports,
  useGetDcBranch,
  useInvalidateQuery,
  useUpdateBranch,
} from '@utils/reactQuery';
import { usePersistedBranchState } from '@components/common/recoil/hooks/usePersistedState';
import { warningAlert2 } from '@components/atoms/alerts/alert';
import { AddReport } from './create';
import PreviewComponent from '../previewReport';
import { useActivityLogger } from '@components/common/logger.tsx/activity';
import { ArrowTurnRightUpIcon } from '@heroicons/react/20/solid';
import BulkUploadModal from './bulk';

const ReportsTable: React.FC = () => {
  const [selectedBranch] = usePersistedBranchState();
  const {
    data: currentBranch,
    isLoading,
    refetch,
  } = useGetDcBranch({
    selectedBranchId: selectedBranch,
  });
  const [reports, setReports] = useState([]);
  const [viewMode, setViewMode] = useState(true);
  const [previewRecord, setPreviewRecord] = useState({});
  const [previewReportModalOpen, setPreviewReportModalOpen] = useState(false);
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const deleteReport = useDeleteReports({});
  const updateBranch = useUpdateBranch({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleRemove = (report: any) => {
    refetch();

    deleteReport?.mutate(
      { recordId: report?._id },
      {
        onSuccess: (resp) => {
          if (resp?.data?._id) {
            const updatedReports = currentBranch?.data?.reports
              ?.filter((r) => r._id !== resp?.data?._id)
              ?.map((r) => r._id);

            updateBranch?.mutate(
              { data: { reports: updatedReports }, recordId: selectedBranch },
              {
                onSuccess: (resp) => {
                  invalidateQuery('diagnosticBranch');
                  refetch();
                  warningAlert2('Deleted report');
                  logActivity({
                    activity:
                      'Deleted Report ' +
                      (report?.reportData?.reportName || ''),
                  });
                },
                onError: (err) => {
                  alert('Error updating branch with deleted report');
                },
              },
            );
          }
        },
        onError: () => {
          alert('Error deleting report');
        },
      },
    );
  };

  const handlePreview = (record) => {
    setPreviewRecord(record);
    setPreviewReportModalOpen(true);
  };

  const handleShowView = (value) => {
    setViewMode(!viewMode);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    invalidateQuery('diagnosticBranch');
    refetch(); // Trigger refetch to reload the reports data
    setModalVisible(false);
  };

  useEffect(() => {
    if (currentBranch && !isLoading) {
      setReports(currentBranch.data.reports || []);
    }
  }, [currentBranch, isLoading]);

  useEffect(() => {
    refetch();
  }, [viewMode]);

  const columns = REPORTS_COLUMNS({ handleRemove, handlePreview });

  return (
    <div className="p-5">
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold">
          {viewMode ? 'View Reports' : 'Add Report'}
        </h2>
        <span className="flex">
          <Switch
            checked={viewMode}
            onChange={() => setViewMode(!viewMode)}
            checkedChildren="View"
            unCheckedChildren="Add"
          />
          {!viewMode && (
            <div className="ml-2">
              <Button
                type="primary"
                onClick={showModal}
                icon={<ArrowTurnRightUpIcon className="w-4 h-4" />}
              >
                Bulk Upload
              </Button>
              <BulkUploadModal visible={modalVisible} onClose={hideModal} />
            </div>
          )}
        </span>
      </div>
      {viewMode ? (
        <Table
          columns={columns}
          dataSource={currentBranch?.data.reports || []} // Ensure it reflects the latest data
          rowKey={(record) => record._id} // Use _id as the unique identifier
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: 'No data' }}
        />
      ) : (
        <AddReport handleShowView={handleShowView} />
      )}
      {previewReportModalOpen && (
        <PreviewComponent
          showPreview={previewReportModalOpen}
          onClose={() => setPreviewReportModalOpen(false)}
          record={previewRecord}
        />
      )}
    </div>
  );
};

export default ReportsTable;
