import { useAuth } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { createReport, getReportTypes, uploadReport } from "@/lib/db";
import CustomFormComponent from "@/components/CustomForm/CustomForm.component";
import BasicReportDetailsForm from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.component";
import { BasicFormType } from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.interface";
import {
  ReportDetails,
  ReportParamsData,
  ReportTypes,
} from "middleware/models.interface";
import Button from "@/components/core/Button/Button.component";
import UploadInput from "@/components/UploadReport/UploadReport.component";
import { randomUUID } from "crypto";
const crypto = require("crypto");

const Dashboard = () => {
  const { user } = useAuth();
  const [isBasicFormVisible, setIsBasicFormVisible] = useState(true);
  const [reportTypes, setReportTypes] = useState<ReportTypes[]>([]);
  const [selectedType, setSelectedType] = useState(-1);
  const [basicFormData, setBasicFormData] = useState<BasicFormType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();
      if (token) {
        const resp = await getReportTypes(token);
        console.log(resp);
        if (resp.status == 200) {
          setReportTypes(resp.data.reportTypes);
        }
      }
    })();
  }, [user]);

  const handleManualReportSubmitForm = async (
    reportData: ReportParamsData[]
  ) => {
    setIsLoading(true);
    const { phoneNumberInput, ...restBasicForm } = basicFormData;
    const reportDetails: ReportDetails = {
      userId: phoneNumberInput,
      reportUrl: "addUrl",
      status: "parsed",
      testName: reportTypes[selectedType].testName,
      parsedData: reportData,
      ...restBasicForm,
    };
    reportDetails.reportId = crypto.randomBytes(20).toString("hex");

    const token = (await user?.getIdToken()) || "";
    const resp = await createReport(token, user?.phoneNumber, reportDetails);
    if (resp.status === 201) {
      setIsLoading(false);
      setIsBasicFormVisible(true);
      setIsSuccess(true);
      setSelectedType(-1);
    }
    console.log(reportDetails);
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
      setIsUploadError(true);
      return;
    }

    if (file) {
      setIsUploadError(false);
      setIsLoading(true);
      const { phoneNumberInput, ...restBasicForm } = basicFormData;
      const reportDetails: ReportDetails = {
        userId: phoneNumberInput,
        status: "parsing",
        testName: "Blodd Report",
        ...restBasicForm,
      };
      const token = (await user?.getIdToken()) || "";
      const userId = user?.phoneNumber || "";
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
          user?.phoneNumber,
          reportDetails
        );
        if (resp.status === 201) {
          setIsLoading(false);
          setIsBasicFormVisible(true);
          setIsSuccess(true);
          setSelectedType(-1);
        }
      }
    }
  };

  const handleBasicFormSubmit = (basicFormData: BasicFormType) => {
    setBasicFormData(basicFormData);
    setIsBasicFormVisible(false);
  };

  if (isLoading) {
    return <div className="grid h-screen place-content-center">Loading...</div>;
  } else if (isSuccess) {
    return (
      <div className="grid h-screen bg-primary place-content-center">
        <span>Success</span>
        <Button name="Go To Home" onClick={() => setIsSuccess(false)} />
      </div>
    );
  } else {
    return (
      <div className="grid h-screen place-content-center">
        {isBasicFormVisible && (
          <BasicReportDetailsForm onBasicFormSubmit={handleBasicFormSubmit} />
        )}
        {!isBasicFormVisible && (
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
              <CustomFormComponent
                formType={reportTypes[selectedType]}
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
                {isUploadError && (
                  <span className="text-red-500">Please select pdf file</span>
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
