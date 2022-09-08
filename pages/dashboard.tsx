import { useAuth } from "@/lib/auth";
import React, { useEffect, useReducer, useState } from "react";
import { createReport, getReportTypes, uploadReport } from "@/lib/db";
import CustomFormComponent from "@/components/CustomForm/CustomForm.component";
import BasicReportDetailsForm from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.component";
import { ReportUserDetails } from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.interface";
import {
  ReportDetails,
  ReportParamsData,
  ReportTypes,
} from "middleware/models.interface";
import Button from "@/components/core/Button/Button.component";
import UploadInput from "@/components/UploadReport/UploadReport.component";
const crypto = require("crypto");
interface stateType {
  loading: boolean;
  success: boolean;
  error: string;
  reportUserDetails: ReportUserDetails | null;
  reportTypes: ReportTypes[];
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
      reportUserDetails: null,
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
  } else if (action.type === "addReportUserDetails") {
    return {
      ...state,
      reportUserDetails: action.value as ReportUserDetails,
      loading: false,
      error: "",
    };
  } else if (action.type === "addReportTypes") {
    return {
      ...state,
      reportTypes: action.value,
      loading: false,
      error: "",
    };
  } else if (action.type === "reset") {
    return {
      ...intialState,
      reportTypes: state.reportTypes,
    };
  } else {
    return state;
  }
}
const intialState: stateType = {
  loading: false,
  success: false,
  error: "",
  reportUserDetails: null,
  reportTypes: [],
};
const Dashboard = () => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(UserReportReducer, intialState);
  const [selectedType, setSelectedType] = useState(-1);
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();
      if (token) {
        const resp = await getReportTypes(token);
        console.log(resp);
        if (resp.status == 200) {
          dispatch({ type: "addReportTypes", value: resp.data.reportTypes });
        }
      }
    })();
  }, [user]);
  const handleGoToHome = () => {
    dispatch({ type: "reset" });
  };
  const handleManualReportSubmitForm = async (
    reportData: ReportParamsData[]
  ) => {
    dispatch({ type: "loading" });
    const { phoneNumberInput, ...restBasicForm } =
      state.reportUserDetails as ReportUserDetails;
    const reportDetails: ReportDetails = {
      userId: phoneNumberInput,
      reportUrl: "addUrl",
      status: "parsed",
      testName: state.reportTypes[selectedType].testName,
      parsedData: reportData,
      ...restBasicForm,
    };
    reportDetails.reportId = crypto.randomBytes(20).toString("hex");

    const token = (await user?.getIdToken()) || "";
    const resp = await createReport(
      token,
      user?.phoneNumber as string,
      reportDetails
    );
    if (resp.status === 201) {
      dispatch({ type: "success" });
      setSelectedType(-1);
    }
    // console.log(reportDetails);
  };
  const getUploadedReportDetails = async (
    token: string,
    userId: string,
    file: string,
    testName: string
  ) => {
    const response = await uploadReport(token, userId, file, testName);
    console.log(response);
    if (response.status == 200 && response.data.success) {
      return response.data;
    } else {
      return null;
    }
  };

  const handleUploadReport = async () => {
    if (!file) {
      dispatch({ type: "error", value: "Please select PDF file! " });
      return;
    }

    if (file) {
      dispatch({ type: "loading" });
      const { phoneNumberInput, ...restBasicForm } =
        state.reportUserDetails as ReportUserDetails;
      const reportDetails: ReportDetails = {
        userId: phoneNumberInput,
        status: "parsing",
        testName: "Blodd Report",
        ...restBasicForm,
      };
      const token = (await user?.getIdToken()) || "";
      const userId = user?.phoneNumber as string;
      const uploadedReportDetail = await getUploadedReportDetails(
        token,
        userId,
        file,
        reportDetails.testName
      );
      if (!uploadedReportDetail) {
        //some error occured, TODO:handle error here
      } else {
        reportDetails.reportId = uploadedReportDetail.result.id;
        const resp = await createReport(
          token,
          user?.phoneNumber as string,
          reportDetails
        );
        if (resp.status === 201) {
          dispatch({ type: "success" });
          setSelectedType(-1);
        }
      }
    }
  };

  const handleBasicFormSubmit = (basicFormData: ReportUserDetails) => {
    dispatch({ type: "addReportUserDetails", value: basicFormData });
  };

  if (state.loading) {
    return <div className="grid h-screen place-content-center">Loading...</div>;
  } else if (state.success) {
    return (
      <div className="grid h-screen bg-primary place-content-center">
        <span>Success</span>
        <Button name="Go To Home" onClick={handleGoToHome} />
      </div>
    );
  } else {
    return (
      <div className="grid h-screen place-content-center">
        {state.reportUserDetails == null && (
          <BasicReportDetailsForm onBasicFormSubmit={handleBasicFormSubmit} />
        )}
        {state.reportUserDetails && (
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(Number(e.target.value))}
              className="border-2 border-black-2 block"
            >
              <option value={-1}>Select Report Type</option>
              {state.reportTypes.map((val, index) => (
                <option key={val.testName} value={index}>
                  {val.testName}
                </option>
              ))}
            </select>
            {selectedType > -1 && (
              <CustomFormComponent
                formType={state.reportTypes[selectedType]}
                onReportSubmitForm={handleManualReportSubmitForm}
              />
            )}
            {selectedType === -1 && <span>OR</span>}
            {selectedType === -1 && (
              <div className="flex flex-col space-between">
                <UploadInput
                  labelName="Upload Report"
                  file={file}
                  setFile={setFile}
                />
                {state.error && (
                  <span className="text-red-500">{state.error}</span>
                )}
                <div className="block pt-2">
                  <Button name="Upload Report" onClick={handleUploadReport} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Dashboard;
