import { Button, Steps } from 'antd';
import React, { useState } from 'react';
import { PatientDetails } from './patientDetails';
import { UploadReport } from './uploadReport';
import { ReportSummary } from './reportSummary';
import { reportDataState } from '@components/common/recoil/report/reportData';
import { useRecoilState } from 'recoil';
import { useCreateDiagnostic, useCreateReport, useUploadReportFile } from 'utils/reactQuery';
import axios from 'axios';
import { uploadDiagnosticLogoApi } from '@utils';
import { toast } from 'react-toastify';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { SuccessReport } from './successReport';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';
import { ManualReport } from './ManualReport';
interface AddReportComponentProps {
  setAddReports: React.Dispatch<React.SetStateAction<boolean>>;
  refetch:()=>{}
}

export const AddReportComponent: React.FC<AddReportComponentProps> = ({ setAddReports,refetch }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [manualReport, setManualReport] = useState(false  );
  const currentBranch = useCurrentBranchValue()
  const prev = () => {setCurrentStep(currentStep-1)}
  const next = () => {setCurrentStep(currentStep+1)}
  const [reportData,setReportData] = useRecoilState(reportDataState)
  const steps = [
    {
      title: 'Report Details',
      content: <PatientDetails next={next} />
    },
    {
      title: 'Upload / Generate Report',
      content:  <UploadReport manualReport={manualReport} setManualReport={setManualReport}  handleSteps={()=>{}} next={next} />
    },
    ...(manualReport
      ? [
          {
            title: 'Manual Report Step',
            content: <ManualReport next={next} />
          }
        ]
      : []),
    {
      title: 'Report Summary',
      content:<ReportSummary isManual={manualReport} style='' handleSuccess={() => next()} />
    },
    {
      title: 'Report Success',
      content: <SuccessReport refetch={refetch} setAddReports={()=>{setAddReports(false)}} />
    },
  ];

  const updateDiagnnosticReport = useCreateReport({
    onSuccess: (data) => {
      successAlert('Report added successfully');
      next()
    },
    onError: () => {
      errorAlert('Error updating report');
      // setLoading(false)
    },
  });

  const handleSubmitTest = async () => {
    if(!manualReport){
      let url = await customRequest({endpoint: uploadDiagnosticLogoApi, file: reportData?.reportData?.file, header:{
        'Content-Type': 'multipart/form-data',
      }})
      if(url?.status === 200){
        successAlert("File uploaded succesfully")
        // update reportData
        const updatedReportData = {
          ...reportData,
          reportData: {
            ...reportData.reportData,
            url: url?.data?.url,
            isManual: false
          },
          diagnosticCenter: {
            ...reportData.diagnosticCenter,
            branch: {
              ...reportData.diagnosticCenter.branch,
              id: currentBranch?._id
            }
          }
        };
        
        setReportData(updatedReportData)
        updateDiagnnosticReport.mutate({data:updatedReportData})
      }
    }
    else{
      const updatedReportData = {
        ...reportData,
        diagnosticCenter: {
            ...reportData.diagnosticCenter,
            branch: {
                ...reportData.diagnosticCenter.branch,
                id: currentBranch?._id // assuming currentBranch might be undefined
            }
        },
        reportData: {
            ...reportData.reportData,
            parsedData: {
                ...reportData.reportData?.parsedData,
                name: reportData.reportData?.parsedData?.testName,
                isManual: true
            },
          },
      };
    
      
      setReportData(updatedReportData)
      updateDiagnnosticReport.mutate({data:updatedReportData})
    }
  }

  const customRequest = async ({ endpoint, file, headers }: any) => {
    try {
      if (file && file.fileList && file.fileList.length > 0) {
        const formData = new FormData();
        formData.append('file', file.fileList[0].originFileObj);
        // Make the request with axios including the token in the headers and form data
        const response = await axios.post(endpoint, formData, { headers });
        setFileUrl(response.data?.url)
  
        // Return the response if needed
        return response;
      } else {
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error('File upload failed.');
    }
  };
  
  const submitStep = manualReport? 3 : 2
  return <div className="container mx-auto p-8 h-auto">
      <div className="w-[100%] h-auto min-h-[60vh]">
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Steps key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="mt-5">{steps[currentStep].content}</div>
            <div className='flex justify-end'>
               {(currentStep === 1 || currentStep === 2 || currentStep === 3) && <Button type="primary" onClick={prev} className="ml-5" >Previous</Button>}
               {currentStep === (submitStep) && <Button type="dashed" onClick={handleSubmitTest} className="ml-5" >Submit</Button>}
            </div>
      </div>
  </div>
}


// import React, { useState } from 'react';
// import { StepHeader } from '@components/atoms/fileUploder/stepHeader';
// import { addReportSteps } from 'utils/static/static';
// import { PatientDetails } from './patientDetails';
// import { ReportSummary } from './reportSummary';
// import { useReportValue } from '@components/common/constants/recoilValues';
// import { UploadReport } from './uploadReport';
// import { SuccessReport } from './successReport';

// interface AddReportComponentProps {
//   setAddReports: React.Dispatch<React.SetStateAction<boolean>>;
//   refetch:()=>{}
// }

// export const AddReportComponent: React.FC<AddReportComponentProps> = ({ setAddReports,refetch }) => {
//   const [currentStep, setCurrentStep] = useState(addReportSteps[0]);
//   const reportValue = useReportValue();

//   const handleSuccess = (): void => {
//     setAddReports(false);
//   };

//   const renderStepContent = () => {
//     switch (currentStep.id) {
//       case 1:
//         return <PatientDetails handleSteps={() => setCurrentStep(addReportSteps[1])} />;
//       case 2:
//         return <UploadReport handleSteps={() => setCurrentStep(addReportSteps[2])} />;
//       case 3:
//         return <ReportSummary style='' handleSuccess={() => setCurrentStep(addReportSteps[3])} report={reportValue} />;
//       default:
//         return <SuccessReport refetch={refetch} setAddReports={handleSuccess} />;
//     }
//   };

//   return (
//     <div>
//       <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
//         <StepHeader stepList={addReportSteps} currentStep={currentStep} />
//       </div>
//       <div className="h-auto">{renderStepContent()}</div>
//     </div>
//   );
// };

