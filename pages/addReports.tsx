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
import SelectComponent from "../components/core/SelectComponent/SelectComponent";
import { LoaderComp } from "@/components/alerts/loader";
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
const AddReports = () => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(UserReportReducer, intialState);
  const [selectedType, setSelectedType] = useState<{
    id: number;
    name: string;
  }>({ id: -1, name: "Select report type" });
  const [file, setFile] = useState<string>("");
  const [isUploadReportSelected, setIsUploadReportSelected] = useState<
    string | null
  >(null);

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
  const handleManualReportSubmit = async (reportData: ReportParamsData[]) => {
    dispatch({ type: "loading" });
    const { phoneNumberInput, ...restBasicForm } =
      state.reportUserDetails as ReportUserDetails;
    const reportDetails: ReportDetails = {
      userId: phoneNumberInput,
      reportUrl: "addUrl",
      status: "parsed",
      testName: selectedType.name,
      // testName: state.reportTypes[selectedType].testName,
      parsedData: reportData,
      isManualReport: true,
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
      setSelectedType({ id: -1, name: "Select report type" });
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
    // console.log(response);
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
        testName: selectedType.name,
        isManualReport: false,
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
          setSelectedType({ id: -1, name: "Select report type" });
        }
      }
    }
  };

  const handleBasicFormSubmit = (basicFormData: ReportUserDetails) => {
    dispatch({ type: "addReportUserDetails", value: basicFormData });
  };

  const handleUploadReportChange = (e: any) => {
    setIsUploadReportSelected(e.target.value);
  };

  if (state.loading) {
    return <LoaderComp />;
  } else if (state.success) {
    return (
      <div className="grid h-screen bg-primary place-content-center">
        <span>Success</span>
        <Button name="Go To Home" onClick={handleGoToHome} />
      </div>
    );
  } else {
    return (
      <div className="p-8">
        {state.reportUserDetails == null && (
          <div className="px-4 sm:px-6 lg:px-8 mt-12">
            <div className="sm:flex sm:items-center pb-8">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Step 1</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Add User Details to be updated in the report.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
            </div>
            <BasicReportDetailsForm onBasicFormSubmit={handleBasicFormSubmit} />
          </div>
        )}
        {state.reportUserDetails && (
          <div className="px-4 sm:px-6 lg:px-8 mt-12">
            <div className="sm:flex sm:items-center pb-8">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Step 2</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Select report type and fill the data or upload already
                  existing report and we will parse it for you.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
            </div>
            <div className="grid md:grid-cols-3 md:gap-10">
              <div className="col-span-1">
                <div id="" className="pb-8">
                  <label
                    htmlFor="query1"
                    className="block text-sm font-medium text-gray-700 pb-3"
                  >
                    Do you want to upload a report?
                  </label>
                  <div className="-mt-1 ml-2">
                    <span className="mr-8">
                      <input
                        className=""
                        type="radio"
                        value="yes"
                        id="yes"
                        name="query1"
                        onChange={handleUploadReportChange}
                      />{" "}
                      <label className=" text-xs font-medium " htmlFor="yes">
                        Yes
                      </label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        value="no"
                        id="no"
                        name="query1"
                        onChange={handleUploadReportChange}
                      />{" "}
                      <label className=" text-xs font-medium " htmlFor="no">
                        No
                      </label>
                    </span>
                  </div>
                </div>
                <div className=" pb-8">
                  <SelectComponent
                    labelName="Please select the type of report"
                    selected={selectedType}
                    setSelected={setSelectedType}
                    data={state.reportTypes.map((val, index) => {
                      return {
                        id: index,
                        name: val.testName,
                      };
                    })}
                  />
                </div>
              </div>
              {isUploadReportSelected === "yes" && (
                <div className="col-span-2">
                  {selectedType.id > -1 && (
                    <div className="">
                      <div className="">
                        <UploadInput
                          labelName="Upload Report"
                          file={file}
                          setFile={setFile}
                        />
                      </div>
                      {state.error && (
                        <span className="text-red-500">{state.error}</span>
                      )}
                      <div className="flex justify-center pt-6 ">
                        <Button
                          name="Upload Report"
                          onClick={handleUploadReport}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {isUploadReportSelected === "no" && (
                <div className="col-span-2">
                  {selectedType.id > -1 && (
                    <CustomFormComponent
                      formType={state.reportTypes[selectedType.id]}
                      onReportSubmitForm={handleManualReportSubmit}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default AddReports;
