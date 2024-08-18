import { errorAlert, successAlert, warningAlert2 } from "@components/atoms/alerts/alert";
import { useCurrentBranchValue, useReportDetailsValue } from "@components/common/constants/recoilValues";
import { usePersistedBranchState, usePersistedDCState } from "@components/common/recoil/hooks/usePersistedState";
import { useCreateReport, useInvalidateQuery, useUpdateBranch } from "@utils/reactQuery";
import { Button } from "antd";
import { useEffect } from "react";

export default function ReportSummary({handleShowView}) {
  const incomingData = useReportDetailsValue();
  const [selectedBranch] = usePersistedBranchState();
  const [selectedDc] = usePersistedDCState();
  const currentBranch = useCurrentBranchValue()
  const invalidateQuery = useInvalidateQuery()

  const addReport = useCreateReport({})
  const updateBranch = useUpdateBranch({})

  const transformedData = {
    pathologist: {
      name: incomingData?.reportData?.pathologist?.name || "",
      id: incomingData?.reportData?.reportType || "",
    },
    patient: {
      name: incomingData?.patient?.name || "Unknown Patient",
      dob: incomingData?.patient?.dob || null,
      gender: incomingData?.patient?.gender?.toLowerCase() || "other",
      contact: {
        phone: incomingData?.patient?.contact?.phone || "N/A",
        email: incomingData?.patient?.contact?.email || "N/A",
      },
    },
    diagnosticCenter: {
      diagnostic: selectedDc || null,
      branch: selectedBranch || null,
    },
    reportData: {
      reportName: incomingData?.reportData?.reportName || "Unnamed Report",
      isManual: incomingData?.reportData?.isManual || false,
      parsedDAta: {
        test: incomingData?.reportData?.reportType,
        parameters: incomingData?.parsedData || [],
      },
      url: incomingData?.reportData?.url || "",
    },
  };

  const handleSubmit = () => {
    if (transformedData) {
      addReport.mutate(
        { data: transformedData },
        {
          onSuccess: (resp) => {
            console.log(resp);
            if (resp?.status === 201) {
              try {
                // Ensure you're creating a new array with the updated report IDs
                const updatedReportIds = [...(currentBranch?.reports || []), resp?.data?._id];
  
                updateBranch.mutate(
                  { data: { reports: updatedReportIds }, recordId: selectedBranch },
                  {
                    onSuccess: (res) => {
                      if (res.status === 200) {
                        warningAlert2("Report added successfully");
                        invalidateQuery("diagnosticBranch");
                        handleShowView(false)
                      }
                    },
                    onError: (err) => {
                      errorAlert("Branch update failed");
                    },
                  }
                );
              } catch (error) {
                errorAlert("Report adding failed");
              }
            }
          },
          onError: (err) => {
            errorAlert("Report adding failed");
          },
        }
      );
    }
  };
  
  return (
    <div className="bg-gray-100 py-10 px-5">
      <h1 className="text-2xl font-semibold mb-6">Summary</h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* Patient Info */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-bold mb-3">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{transformedData.patient.name}</p>
            </div>
            <div>
              <p className="font-semibold">Date of Birth:</p>
              <p>{transformedData.patient.dob}</p>
            </div>
            <div>
              <p className="font-semibold">Gender:</p>
              <p>{transformedData.patient.gender}</p>
            </div>
            <div>
              <p className="font-semibold">Contact:</p>
              <p>Phone: {transformedData.patient.contact.phone}</p>
              <p>Email: {transformedData.patient.contact.email}</p>
            </div>
          </div>
        </div>

        {/* Diagnostic Center Info */}
        {/* <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-bold mb-3">Diagnostic Center Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Diagnostic Center:</p>
              <p>{selectedDc || "Not Selected"}</p>
            </div>
            <div>
              <p className="font-semibold">Branch:</p>
              <p>{selectedBranch || "Not Selected"}</p>
            </div>
          </div>
        </div> */}

        {/* Report Details */}
        <div>
          <h2 className="text-xl font-bold mb-3">Report Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Report Name:</p>
              <p>{transformedData.reportData.reportName}</p>
            </div>
            <div>
              <p className="font-semibold">Pathologist:</p>
              <p>{transformedData.pathologist.name}</p>
            </div>
            {/* <div>
              <p className="font-semibold">Report Type ID:</p>
              <p>{transformedData.pathologist.id}</p>
            </div>
            <div>
              <p className="font-semibold">Report URL:</p>
              <p>{transformedData.reportData.url}</p>
            </div> */}
          </div>
        </div>

        {/* Parameters and Bio Ref Range */}
        {
          (transformedData.reportData?.url == "" || !transformedData.reportData?.url) ?
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3">Parameters and Reference Ranges</h2>
              {transformedData.reportData?.parsedData?.parameters?.map((param, index) => (
                <div key={index} className="border-t pt-4 mt-4 grid grid-cols-2">
                  <h3 className="text-lg font-semibold">{param.name}</h3>
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="font-semibold">Age Range:</p>
                      {param.bioRefRange.advanceRange.ageRange.map((range, i) => (
                        <p key={i}>{`${range.ageRangeType} (${range.min}-${range.max} ${range.unit}): ${range.value}`}</p>
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold">Gender Range:</p>
                      {param.bioRefRange.advanceRange.genderRange.map((range, i) => (
                        <p key={i}>{`${range.genderRangeType} (${range.min}-${range.max} ${range.unit}): ${range.value}`}</p>
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold">Basic Range:</p>
                      {param.bioRefRange.basicRange.map((range, i) => (
                        <p key={i}>{`(${range.min}-${range.max} ${range.unit}): ${range.value}`}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div> :
            <div className="my-6">
              <h2 className="text-xl font-bold mb-3">Report URl</h2>
              <p>{transformedData.reportData?.url}</p>
            </div>
        }
        
        <Button onClick={handleSubmit}>
            Submit
          </Button>
      </div>
    </div>
  );
}
