import { useAuth } from "@/lib/auth";
import React, { Fragment, useEffect, useReducer, useState } from "react";
import { createReport, getReportTypes, uploadReport } from "@/lib/db";
import { ReportUserDetails } from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.interface";
import {
  ReportDetails,
  ReportParamsData,
  ReportTypes,
  TestTypes
} from "middleware/models.interface";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LoaderComp, Spinner } from "@/components/alerts/loader";
import { useRouter } from "next/router";
import SelectComponent from "../core/SelectComponent/SelectComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicReportDetailsForm from "../BasicReportDetailsForm/BasicReportDetailsForm.component";
import UploadInput from "../UploadReport/UploadReport.component";
import CustomFormComponent from "../CustomForm/CustomForm.component";
import { successUpload } from "../core/images/image";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import AddTestDetailsForm from "../BasicReportDetailsForm/AddTestDetailsForm";
import ReportsTable from "../ReportsTable/ReportsTable.component";
import KeywordTable from "./KeywordTable";
const crypto = require("crypto");
interface stateType {
  loading: boolean;
  success: boolean;
  error: string;
  reportUserDetails: ReportUserDetails | null;
  reportTypes: ReportTypes[];
  testTypes: TestTypes[];
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
  { id: 1, name: "Enter Test Details" },
  { id: 2, name: "Enter Keywords & aliases" },
  { id: 3, name: "Success" },
];


const   AddTests = () => {
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
  const [reportTypes,setReportTypes] = useState({});

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();
      if (token) {
        const resp = await getReportTypes(token);
        console.log(resp)
        if (resp.status == 200) {
          dispatch({ type: "addReportTypes", value: resp.data });
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

  const testingSchema = {};
  // state.reportTypes[selectedType.id]?.keywords.forEach((params) => {
  //   testingSchema[params.keyword] = yup.string().required();
  // });

  const schema = yup.object().shape(testingSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleBasicFormSubmit = (basicFormData: ReportUserDetails) => {
    dispatch({ type: "addReportUserDetails", value: basicFormData });
    setStep(2)
  };

  const handleUploadReportChange = (e: any) => {
    setIsUploadReportSelected(e.target.value);
   
    setReportTypes(state.reportTypes[selectedType?.id])
  };

  const handleBack = () => {
    setCurrentStep((current) =>
      current.id == 3 ? current : steps[0]
    );
  }

  function handleNext() {
    setCurrentStep((current) =>
      current.id == 3 ? current : steps[current.id]
    );
  }


  const handleTestChange = (e:any) =>{
    setSelectedType(e)
    setReportTypes(state?.reportTypes[selectedType?.id])
  }

  const [currentStep, setCurrentStep] = useState(steps[0]);

    return (
      <div className="max-h-auto h-[75vh] sm:h-[85vh] md:h-[80vh] w-[100%] sm:w-[94%] mt-6 lg:w-[75vw] relative flex flex-col xl:w-[65vw] xl:h-[70vh] shadow-lg bg-white rounded-md border-2 p-4 sm:p-10">
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
        <div>
          {currentStep.id === 1 && (
               <div className="w-[100%] h-[40vh]">
               <div className="p-8 md:gap-10">
                           <div className="col-span-1">
                             <div id="" className="pb-8">
                               <label
                                 htmlFor="query1"
                                 className="block text-sm font-medium text-gray-700 pb-3"
                               >
                                 You want to choose from existing reports
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
                           </div>
                           {isUploadReportSelected === "yes" && (
                                 <div className=" pb-8 w-[90%] sm:w-[40%]">
                                          <SelectComponent
                                            labelName="Please select the type of test"
                                            selected={selectedType}
                                            setSelected={handleTestChange}
                                            data={state.reportTypes.map((val, index) => {
                                              return {
                                                id: index,
                                                name: val.testName,
                                              };
                                            })}
                                          />
                                 </div>
                           )}
                           {isUploadReportSelected === "no" && (
                             <div >
                                 <button className="bg-gray-200 rounded-md border-2 px-2 py-1 text-sm">Add test</button>
                             </div>
                           )}
                           {selectedType?.id > -1 &&
                             <section className="flex justify-end">
                                   <button onClick={handleNext} className="bg-indigo-700 text-white px-4 py-2 text-sm rounded-md">Next</button>
                             </section>
                           }
               </div>
           </div>
          )}
          {currentStep.id === 2 && (
             <>
                 {/* <button onClick={handleBack} className="bg-indigo-700 text-white px-4 py-2 text-sm rounded-md">Back</button> */}
                 <div>  
                    <KeywordTable keywords={reportTypes} />
                    <section className="flex justify-between">
                      <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 text-sm rounded-md">Back</button>
                      <button onClick={handleNext} className="bg-indigo-700 text-white px-4 py-2 text-sm rounded-md">Save Test type</button>
                    </section>
                 </div>
             </>
          )}
          {currentStep.id === 3 && (
               <button onClick={handleBack} className="bg-indigo-700 text-white px-4 py-2 text-sm rounded-md">Back</button>
          )}
          {state.loading && <div className="w-[95%] h-[60%] flex justify-center bg-white absolute opacity-90 top-40"><Spinner /></div>}
        </div>
      </div>
    );
  };

export default AddTests;
