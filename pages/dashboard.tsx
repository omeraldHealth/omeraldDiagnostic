import { useAuth } from "@/lib/auth";
import React, { useEffect, useReducer, useState } from "react";
import { ReportUserDetails } from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.interface";
import { ReportDetails, ReportTypes } from "middleware/models.interface";
import Button from "@/components/core/Button/Button.component";
import Loading from "@/components/core/LoadingIcon/Loading.component";
import {
  CartesianGrid,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getReports } from "@/lib/db";
import ReportSharedVsTime from "@/components/Graphs/ReportSharedVsTime";
interface stateType {
  loading: boolean;
  success: boolean;
  error: string;
  manualReportVSuploadReport: {
    name: "Manual Reports" | "Upload Reports";
    value: number;
  }[];
  noOfReportTypes: {
    name: string;
    value: number;
  }[];
}
interface actionType {
  type: string;
  value?: any;
}


//TODO: Update Types
function UserReportReducer(state: stateType, action: actionType): stateType {
  if (action.type === "success") {
    return {
      ...state,
      loading: false,
      success: true, //can be change to something like report successfully created.
      error: "",
      // reportUserDetails: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.value as string,
    };
  } else if (action.type === "loading") {
    return {
      ...state,
      loading: true,
      error: "",
    };
  } else if (action.type === "manualReportVSuploadReport") {
    return {
      ...state,
      manualReportVSuploadReport: action.value,
      loading: false,
      error: "",
    };
  } else if (action.type === "noOfReportTypes") {
    return {
      ...state,
      noOfReportTypes: action.value,
      loading: false,
      error: "",
    };
  } else if (action.type === "reset") {
    return {
      ...intialState,
      noOfReportTypes: state.noOfReportTypes,
    };
  } else {
    return state;
  }
}
const intialState: stateType = {
  loading: false,
  success: false,
  error: "",
  manualReportVSuploadReport: [
    {
      name: "Manual Reports",
      value: 0,
    },
    {
      name: "Upload Reports",
      value: 0,
    },
  ],
  noOfReportTypes: [],
};
const Dashboard = () => {
  const { user } = useAuth();
  const [reportList, setReportList] = useState<ReportDetails[]>([]);
  const [state, dispatch] = useReducer(UserReportReducer, intialState);

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();

      const resp = await getReports(
        token as string,
        user?.phoneNumber as string
      );
      if (resp.status === 200) {
        setReportList(resp.data);
      }
    })();
  }, []);

  useEffect(() => {
    let noOfManualReports = 0;
    let noOfUploadReports = 0;
    let noOftypesOfReports: { name: string; value: number }[] = [];
    let noOfReportsShared: { date: number; value: number }[] = [];
    reportList.forEach((report) => {
      if (report.isManualReport) {
        noOfManualReports++;
      } else {
        noOfUploadReports++;
      }
      let item = noOftypesOfReports.find(
        (type) => type.name === report.testName
      );
      if (item) {
        item.value++;
      } else {
        noOftypesOfReports.push({ name: report.testName, value: 1 });
      }
      // let reportsShared = noOfReportsShared.find()
    });
    dispatch({
      type: "manualReportVSuploadReport",
      value: [
        { name: "Manual Reports", value: noOfManualReports },
        { name: "Upload Reports", value: noOfUploadReports },
      ],
    });
    dispatch({
      type: "noOfReportTypes",
      value: noOftypesOfReports,
    });
  }, [reportList]);

  if (state.loading) {
    return <Loading />;
  } else if (state.success) {
    return (
      <div className="grid h-screen bg-primary place-content-center">
        <span>Success</span>
        {/* <Button name="Go To Home" onClick={handleGoToHome} /> */}
      </div>
    );
  } else {
    return (
      <div className="grid h-screen place-content-center">
        <div id="manualReportVSuploadReport">
          <PieChart width={1000} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={state.manualReportVSuploadReport}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
          <PieChart width={1000} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={state.noOfReportTypes}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
          <ReportSharedVsTime reports={reportList} />
          {/* <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis ticks={ticks} />
            <YAxis />
            <Tooltip />
          </LineChart> */}
        </div>
      </div>
    );
  }
};;

export default Dashboard;
