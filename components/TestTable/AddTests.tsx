import { useAuth } from "@/lib/auth";
import React, { useEffect, useReducer, useState } from "react";
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
import { LoaderComp } from "@/components/alerts/loader";
import { useRouter } from "next/router";
import SelectComponent from "../core/SelectComponent/SelectComponent";
import { yupResolver } from "@hookform/resolvers/yup";
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

const AddTests = () => {
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
  console.log(state.reportTypes)
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
  state.reportTypes[selectedType.id]?.keywords.forEach((params) => {
    testingSchema[params.keyword] = yup.string().required();
  });

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
  };

  const handleBack = () => {
    setStep(1)
  }

  if (state.loading) {
    return <LoaderComp />;
  }else {
    return (
      <div className="w-[100%] h-auto my-10">
        <section className="w-[100%] h-auto rounded-md p-8 bg-white relative">
            <div className=" md:gap-10">
              <div className="col-span-1">
                <div id="" className="pb-8">
                  <label
                    htmlFor="query1"
                    className="block text-sm font-medium text-gray-700 pb-3"
                  >
                    Do you choose from omerald tests?
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
                <>
                <div className=" pb-8 w-[40%]">
                  <SelectComponent
                    labelName="Please select the type of test"
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
                {selectedType.id > -1 && (
                   <></>
                  )}
                </>
              )}
              {isUploadReportSelected === "no" && (
                <div className="grid">
                  {selectedType.id > -1 && (
                    <></>
                  )}
                </div>
              )}
            </div>
        </section>
      </div>
    );
  }
};

export default AddTests;
