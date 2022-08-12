import { useAuth } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { createReport, getReportTypes } from "@/lib/db";
import CustomFormComponent from "@/components/CustomForm/CustomForm.component";
import BasicReportDetailsForm from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.component";
import { BasicFormType } from "@/components/BasicReportDetailsForm/BasicReportDetailsForm.interface";
import {
  ReportDetails,
  ReportParamsData,
  ReportTypes,
} from "middleware/models.interface";

const Dashboard = () => {
  const { user, diagnosticDetails } = useAuth();
  const [isBasicFormVisible, setIsBasicFormVisible] = useState(true);
  const [reportTypes, setReportTypes] = useState<ReportTypes[]>([]);
  const [selectedType, setSelectedType] = useState(-1);
  const [basicFormData, setBasicFormData] = useState<BasicFormType>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(diagnosticDetails);
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

  const handleReportSubmitForm = async (reportData: ReportParamsData[]) => {
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
    const token = (await user?.getIdToken()) || "";
    const resp = await createReport(token, user?.phoneNumber, reportDetails);
    if (resp.status === 201) {
      setIsLoading(false);
      setIsBasicFormVisible(true);
    }
    console.log(reportDetails);
  };

  const handleBasicFormSubmit = (basicFormData: BasicFormType) => {
    setBasicFormData(basicFormData);
    setIsBasicFormVisible(false);
  };

  // const handleSignOut = async () => {
  //   await signOut();
  // };
  if (isLoading) {
    return <div className="grid h-screen place-content-center">Loading...</div>;
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
                onReportSubmitForm={handleReportSubmitForm}
              />
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Dashboard;
