import ReportsTable from "@/components/ReportsTable/ReportsTable.component";
import { getReports } from "@/lib/db";
import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { ReportDetails, UserDetails } from "middleware/models.interface";
import PdfTesting from "@/components/PdfTesting/PdfTesting";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Setting = () => {

  return (
    <div className="bg-signBanner">

    </div>
  );
};

export default Setting;
