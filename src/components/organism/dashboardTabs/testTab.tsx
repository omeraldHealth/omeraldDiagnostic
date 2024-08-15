import React, { useEffect, useState } from "react";
import { TestTable } from "@components/molecules/test/testTable";
import { AddTestComponent } from "@components/molecules/addReport/addTest";
import { Switch } from "antd";
import { useRecoilState } from "recoil";
import { testDataState } from "@components/common/recoil/testDetails/test";
import { reportState } from "@components/common/recoil/report";
import { getAdminReportTypesApi } from "@utils/urls/app";
import axios from "axios";

export default function TestTab() {
  const [showTest, setShowTest] = useState(false);
  const [testDetail, setTestDetail] = useRecoilState(testDataState);
  const [reportData, setReportData] = useRecoilState(reportState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAdminReportTypesApi, {});
        if (response.status === 200) {
          // successAlert("Fetched reports succesfully")
          setReportData(response?.data);
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-0 h-auto bg-signBanner">
      <span className="flex justify-end">
        <Switch
          style={{ fontSize: "10px" }}
          checkedChildren="Add"
          unCheckedChildren="View"
          checked={showTest}
          className="bg-black"
          onChange={() => {
            setTestDetail({});
            setShowTest(!showTest);
          }}
        />
      </span>

      <div className="h-auto bg-white my-4 sm:mt-4  min-h-[70vh] ">
        {!showTest ? <TestTable /> : <AddTestComponent setTest={setShowTest} />}
      </div>
    </div>
  );
}
