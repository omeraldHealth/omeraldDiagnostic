import ReportsTable from "@/components/ReportsTable/ReportsTable.component";
import { getReports } from "@/lib/db";
import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { ReportDetails, UserDetails } from "middleware/models.interface";
import PdfTesting from "@/components/PdfTesting/PdfTesting";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Tabs } from "antd";
import {SettingsTab} from "../components/core/tabs/index"

const Setting = () => {

  return (
    <div className="w-[100%] h-[100%] bg-signBanner flex ">
      <div className="w-[80vw] bg-white rounded-lg h-[80vh] m-auto my-10 p-10">
        <SettingsTab />
      </div>
    </div>
  );
};

export default Setting;
