import { useAuth } from "@/lib/auth";
import React, { Fragment, useEffect, useReducer, useState } from "react";
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
import { LoaderComp, Spinner } from "@/components/alerts/loader";
import { useRouter } from "next/router";
import { BellAlertIcon, CheckBadgeIcon, CheckCircleIcon, LightBulbIcon, TicketIcon } from "@heroicons/react/20/solid";
import { successUpload } from "@/components/core/images/image";
import Link from "next/link";
import { errorAlert, successAlert } from "@/components/alerts/alert";
import { stat } from "fs";
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
const steps = [
  { id: 1, name: "Enter Patient Details" },
  { id: 2, name: "Upload Report" },
  { id: 3, name: "Success" },
];

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
  const [step,setStep] = useState(1)
  const router = useRouter()

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
    router.push("reports")
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
      setCurrentStep((current) =>
            current.id == 3 ? current : steps[current.id]
      );
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
    console.log(file)
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
        errorAlert("Error uploaded file")
      } else {
        reportDetails.reportId = uploadedReportDetail.result.id;
        const resp = await createReport(
          token,
          user?.phoneNumber as string,
          reportDetails
        );
        if (resp.status === 201) {
          setCurrentStep((current) =>
            current.id == 3 ? current : steps[current.id]
          );
          dispatch({ type: "success" });
          setSelectedType({ id: -1, name: "Select report type" });
        }
      }
    }
  };

  const handleBasicFormSubmit = (basicFormData: ReportUserDetails) => {
    setCurrentStep((current) =>
      current.id == 3 ? current : steps[current.id]
    );
    dispatch({ type: "addReportUserDetails", value: basicFormData });
  };

  const handleUploadReportChange = (e: any) => {
    setIsUploadReportSelected(e.target.value);
  };

  const handleBack = () => {
    setStep(1)
  }

  const [currentStep, setCurrentStep] = useState(steps[0]);

  return (
       <div className="w-[100%] h-[80vh] xl:h-[93vh] bg-signBanner flex p-4 sm:p-8 xl:p-2">
        <div className="max-h-auto h-[75vh] sm:h-[85vh] md:h-[80vh] w-[98%] sm:w-[94%] m-auto lg:w-[75vw] relative flex flex-col xl:w-[65vw] xl:h-[70vh] shadow-lg bg-white rounded-md border-2  xl:p-4 sm:p-10">
          <div id="steps" className="rounded-md bg-slate-50 w-full p-4 mb-4">
            {steps.map((step, index) => (
              <Fragment key={index}>
                <span
                  id="stepId"
                  className={`rounded-full font-bold text-lg shadow-sm sm:text-xs px-2 p-1 mx-1 sm:pl-1 lg:p-2 lg:px-3  ${
                    currentStep.id === step.id && "bg-blue-700 text-white"
                  }
                  ${currentStep.id < step.id && "bg-white text-blue-700"}
                  ${currentStep.id > step.id && "bg-primary text-white"}`}
                >
                  {step.id}
                </span>
                <span
                  id="stepName"
                  className={`mx-4 hidden sm:inline-block text-xs ${
                    currentStep.id === step.id && "text-blue-700"
                  }
                  ${currentStep.id < step.id && "text-black"}
                  ${currentStep.id > step.id && "text-primary"}`}
                >
                  {step.name}
                </span>
                {steps.length !== index + 1 && (
                  <div
                    id="line"
                    className={`border  mx-1 sm:m-0 lg:mx-2 h-0 w-6  lg:w-10 mb-1 inline-block ${
                      currentStep.id === step.id &&
                      "border-blue-700 border-dashed"
                    }
                    ${currentStep.id < step.id && "border-dashed"}
                    ${currentStep.id > step.id && "border-primary border-solid"}`}
                  ></div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="overflow-y-auto">
            {currentStep.id === 1 && (
              <BasicReportDetailsForm onBasicFormSubmit={handleBasicFormSubmit} />
            )}
            {currentStep.id === 2 && (
                <section  className="w-1md:w-[80%] h-auto min-h-[50vh] rounded-md p-8 bg-white relative">
                  <div className=" md:gap-10">
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
                      <div className=" pb-8 w-[90%] sm:w-[40%]">
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
                            <div className="w-[40%]">
                              <UploadInput
                                labelName="Upload Report"
                                file={file}
                                setFile={setFile}
                              />
                            </div>
                            {state.error && (
                              <span className="text-red-500">{state.error}</span>
                            )}
                            
                            <div className="w-[93%]  pl-10 sm:pl-5 xl:pl-0 flex justify-between pt-6 absolute bottom-10 right-10">
                              <button type="submit"  name="Upload Report"
                                onClick={handleBack} className="block w-auto sm:w-[130px] bg-gray-400 text-white p-2 text-sm rounded-md">Back</button>
                          
                                <button type="submit"   name="Upload Report"
                                onClick={handleUploadReport} className="block w-auto sm:w-[220px] bg-blue-800 text-white p-2 text-sm rounded-md">Continue</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {isUploadReportSelected === "no" && (
                      <div >
                        {selectedType.id > -1 && (
                          <CustomFormComponent
                            formType={state.reportTypes[selectedType.id]}
                            onReportSubmitForm={handleManualReportSubmit}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </section>
            )}
            {currentStep.id === 3 && (
               <section className="w-[40vh] h-auto xl:h-[40vh] m-auto xl:mt-12">
                 <img src={successUpload} alt="success-upload" className="w-40 xl:my-4 mx-auto mt-8" />
                 <span className="my-8 text-gray-500 flex justify-center"><CheckBadgeIcon className="w-10 text-green-800" /> 
                 <span className="mt-2">Report Uploaded Succesfully</span></span>
                 <Link href="/reports">
                 <button type="submit" name="Upload Report"
                 className="block w-[220px] m-auto bg-green-800 text-white p-2 text-sm rounded-md">View Report</button>
                 </Link>
               </section>
            )}
            {state.loading && <div className="w-[95%] h-[60%] flex justify-center bg-white absolute opacity-90 top-40"><Spinner /></div>}
          </div>
        </div>
      </div>
    );
  };

export default AddReports;
