import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Typography, Button } from 'antd';
import { errorAlert, successAlert, warningAlert } from '@components/atoms/alerts/alert';
import { Spinner } from '@components/atoms/loader';
import { reportState } from '@components/common/recoil/report';
import { uploadDiagnosticReportApi } from '@utils';
import { useCreateReport } from 'utils/reactQuery';
import axios from 'axios';
import { formatTimeFromDate } from '../../../utils/static/static';
import { ProfileSummaryCardProps, ReportSummaryCompProps, ReportSummaryProps } from '../../../utils/types';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';
import { reportDataState } from '@components/common/recoil/report/reportData';

const { Title } = Typography;

export const ReportSummary: React.FC<ReportSummaryProps> = ({ handleSuccess, style, isManual }) => {

  const [reportData,setReportData] = useRecoilState(reportDataState) 

  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
        <ReportSummaryComp isManual={isManual} profile={reportData} style={style} handleSuccess={handleSuccess} />
      </div>
    </section>
  );
};

const ProfileSummaryCard: React.FC<ProfileSummaryCardProps> = ({ title, value, link }) => {
  return (
    <div className="mb-6">
      {!link && <p className="font-bold text-sm">{title}: <span className="text-black font-light">{value}</span></p>}
      {link && (
        <p className="text-blue-800 font-bold text-sm">
          {title} URL: <a href={link} className="text-blue-900 font-light">{link}</a>
        </p>
      )}
    </div>
  );
};

const ReportSummaryComp: React.FC<ReportSummaryCompProps> = ({ profile, style, handleSuccess, isManual }) => {
  const [loading, setLoading] = useState(false);
  const [reportData,setReportData] = useRecoilState(reportDataState)
  const currentBranch = useCurrentBranchValue();

  useEffect(()=>{
    if(isManual){
       // Creating a new object with reportDetails nested
       const updatedReportData = {
        ...reportData,
        reportData: {
            reportName: reportData.reportName,
            reportDate: reportData.reportDate,
            parsedData: reportData?.parsedData
        }
    };

    // Removing old keys
    delete updatedReportData.reportName;
    delete updatedReportData.reportDate;
    delete updatedReportData.reportType;
    delete updateDiagnostic?.parsedData
    console.log(updatedReportData)
    setReportData(updatedReportData);
   }
  },[])

  const updateDiagnostic = useCreateReport({
    onSuccess: (data) => {
      successAlert("Report added successfully");
      setReportState(data?.data);
      handleSuccess();
    },
    onError: () => {
      errorAlert("Error creating report");
    },
  });

  const handleUpload = async () => {
    setLoading(true);

    try {
      const file = reportValue?.reportId?.file;
      if (file && file.originFileObj) {
        warningAlert("Uploading File, please wait");

        const formData = new FormData();
        formData.append('file', file.originFileObj);

        const resp = await axios.post(uploadDiagnosticReportApi, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (resp?.status === 200) {
          setLoading(false);
          successAlert("Uploaded file successfully");

          const newUuid = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(value => value.toString(16).padStart(2, '0')).join('');
          const newProp = {
            reportUrl: resp?.data?.url,
            reportId: newUuid,
            branchId: currentBranch?._id
          };

          const updatedReport = { ...reportValue, ...newProp };
          updateDiagnostic?.mutate({ data: updatedReport });
        } else {
          errorAlert("Error uploading file");
        }
      } else {
        console.error("File or originFileObj is undefined.");
        errorAlert("Error uploading file");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      errorAlert("An error occurred while uploading file");
    } finally {
      setLoading(false);
      warningAlert("Saving report");
    }
  };

  const moment = require('moment');

  const formattedDate = moment(reportData ?.reportData?.reportDate).format('MM-DD-YYYY');

  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
        <section>
          <section className="grid grid-cols-3 gap-2">
            <aside>
              <h2 className='font-bold text-2xl mb-6'>Report Details</h2>
              <ProfileSummaryCard title="Report Name" value={reportData?.reportData?.reportName} />
              <ProfileSummaryCard title="Report Date" value={formattedDate} />
              {!isManual ? <ProfileSummaryCard title="Report Uploaded" 
              value={reportData?.reportData?.file?.fileList[0].name} />:
               <ProfileSummaryCard title="Report Uploaded" value={reportData?.reportData?.parsedData?.testName} />}

            </aside>
            <aside>
              <h2 className='font-bold text-2xl mb-6'>Patient Details</h2>
              <ProfileSummaryCard title="Patient Name" value={reportData?.patient?.name} />
              <ProfileSummaryCard title="Patient Gender" value={reportData?.patient?.gender} />
              <ProfileSummaryCard title="Patient Contact" value={reportData?.patient?.contact?.phone} />
              <ProfileSummaryCard title="Patient Email" value={reportData?.patient?.contact?.email} />
            </aside>
            <aside>
              <h2 className='font-bold text-2xl mb-6'>Diagnostic Center Details</h2>
              <ProfileSummaryCard title="Diagnostic Name" value={reportData?.diagnosticCenter?.name} />
              <ProfileSummaryCard title="Diagnostic Branch" value={reportData?.diagnosticCenter?.branch?.name} />
              <ProfileSummaryCard title="Diagnostic Pathalogist" value={reportData?.pathologist?.name} />
            </aside>
          </section>
        </section>
      </div>
    </section>
  );
};
