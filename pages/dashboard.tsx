import { useAuth } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { getReportTypes, testWorking } from "@/lib/db";
import { ObjectId } from "mongodb";
import CustomFormComponent from "@/components/CustomForm/CustomForm.component";

//TODO: Centralized this types.
export type ReportTypes = {
  _id: ObjectId;
  testName: string;
  keywords: Reportparams[];
};
export type Reportparams = {
  _id: ObjectId;
  keyword: string;
  aliases: string[];
  normalRange: string;
  unit: string;
};

const Dashboard = () => {
  const auth = useAuth();
  const [reportTypes, setReportTypes] = useState<ReportTypes[]>([]);
  const [selectedType, setSelectedType] = useState(-1);
  useEffect(() => {
    (async () => {
      const token = await auth?.user?.getIdToken();
      if (token) {
        const resp = await getReportTypes(token);
        console.log(resp);
        if (resp.status == 200) {
          setReportTypes(resp.data.reportTypes);
        }
      }
    })();
  }, [auth]);
  return (
    <div className="grid h-screen place-content-center">
      <div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(Number(e.target.value))}
          className="border-2 border-black-2 block"
        >
          <option value={-1}>Select Report Type</option>
          {reportTypes.map((val, index) => (
            <option key={val.testName} value={index}>
              {val.testName}
            </option>
          ))}
        </select>
        {selectedType > -1 && (
          <CustomFormComponent form={reportTypes[selectedType]} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
