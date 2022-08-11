import ReportsTable from "@/components/ReportsTable/ReportsTable.component";
import { getReports } from "@/lib/db";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { ReportDetails } from "middleware/models.interface";

const Reports = () => {
  const { user } = useAuth();
  const [reportList, setReportList] = useState<ReportDetails[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportDetails | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();

      const resp = await getReports(token, user?.phoneNumber);
      console.log(resp);
      if (resp.status === 200) {
        setReportList(resp.data);
      }
    })();
  }, []);

  const handleSelectReport = (val: string) => {
    setSelectedReport(reportList.find((rep) => rep.reportId === val) || null);
  };

  return (
    <div>
      <ReportsTable reports={reportList} onSelectReport={handleSelectReport} />
      {selectedReport && <span>{JSON.stringify(selectedReport)}</span>}
    </div>
  );
};

export default Reports;
