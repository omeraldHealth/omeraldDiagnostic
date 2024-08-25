import React, { useEffect, useState } from "react";
import { Table, Switch } from "antd";
import { REPORTS_COLUMNS } from "../settingsTabs/utils/tabs";
import {
  useDeleteReports,
  useGetDcBranch,
  useInvalidateQuery,
  useUpdateBranch,
} from "@utils/reactQuery";
import { usePersistedBranchState } from "@components/common/recoil/hooks/usePersistedState";
import { warningAlert2 } from "@components/atoms/alerts/alert";
import { AddReport } from "./create";
import PreviewComponent from "../previewReport";
import { useActivityLogger } from "@components/common/logger.tsx/activity";

const ReportsTable: React.FC = () => {
  const [selectedBranch] = usePersistedBranchState();
  const { data: currentBranch, isLoading, refetch } = useGetDcBranch({
    selectedBranchId: selectedBranch,
  });
  const [reports, setReports] = useState([]);
  const [viewMode, setViewMode] = useState(true);
  const [previewRecord, setPreviewRecord] = useState({});
  const [previewReportModalOpen, setPreviewReportModalOpen] = useState(false);
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger()

  const deleteReport = useDeleteReports({});
  const updateBranch = useUpdateBranch({});

  const handleRemove = (report: any) => {
    deleteReport?.mutate(
      { recordId: report?._id },
      {
        onSuccess: (resp) => {
          if (resp?.data?._id) {
            const updatedReports = currentBranch?.data?.reports?.filter(
              (report) => report?._id !== resp?.data?._id,
            );
            updateBranch?.mutate(
              { data: { reports: updatedReports }, recordId: selectedBranch },
              {
                onSuccess: (resp) => {
                  invalidateQuery("diagnosticBranch");
                  refetch()
                   warningAlert2("Deleted report");
                  logActivity({ activity: "Deleted Report " + report?.reportData?.reportName || "" });
                },
                onError: (err) => {
                  alert("Error deleting report");
                },
              },
            );
          }
        },
        onError: () => {
          alert("Error deleting report");
        },
      },
    );
    invalidateQuery("diagnosticBranch");
  };

  const handlePreview = (record) => {
    setPreviewRecord(record);
    setPreviewReportModalOpen(true);
  };

  const handleShowView = (value) => { 
    console.log(value)
    setViewMode(!viewMode)
  }


  useEffect(() => {
    if (currentBranch && !isLoading) {
      setReports(currentBranch.data.reports || []);
    }
  }, [currentBranch, isLoading]);

  const columns = REPORTS_COLUMNS({ handleRemove, handlePreview });

  return (
    <div className="p-5">
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold">
          {viewMode ? "View Reports" : "Add Report"}
        </h2>
        <Switch
          checked={viewMode}
          onChange={() => setViewMode(!viewMode)}
          checkedChildren="View"
          unCheckedChildren="Add"
        />
      </div>
      {viewMode ? (
        <Table
          columns={columns}
          dataSource={reports}
          rowKey={(record) => record.email || record.id} // Adjust based on your unique identifier
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: "No data" }}
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
