import ReportsTable from "@/components/ReportsTable/ReportsTable.component";
import { getReports } from "@/lib/db";
import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { ReportDetails, UserDetails } from "middleware/models.interface";
import PdfTesting from "@/components/PdfTesting/PdfTesting";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Reports = () => {
  const { user, diagnosticDetails } = useAuth();
  const [reportList, setReportList] = useState<ReportDetails[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportDetails | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();

      const resp = await getReports(
        token as string,
        user?.phoneNumber as string
      );
      // console.log(resp);
      if (resp.status === 200) {
        setReportList(resp.data);
      }
    })();
  }, []);

  const handleSelectReport = (val: string) => {
    setSelectedReport(reportList.find((rep) => rep.reportId === val) || null);
  };

  return (
    <div className="p-8 sm:p-2 xl:p-6 bg-signBanner">
      <ReportsTable reports={reportList} onSelectReport={handleSelectReport} />
    </div>
  );
};

export default Reports;
