import React, { useState } from 'react';
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

const { Title } = Typography;

export const ReportSummary: React.FC<ReportSummaryProps> = ({ handleSuccess, report, style }) => {
  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
        <ReportSummaryComp profile={report} style={style} handleSuccess={handleSuccess} />
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

const ReportSummaryComp: React.FC<ReportSummaryCompProps> = ({ profile, style, handleSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [reportValue, setReportState] = useRecoilState(reportState);
  const currentBranch = useCurrentBranchValue()

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
      console.log(reportValue)
      console.log("s",file)
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
          console.log(updatedReport)
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

  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
        <section>
          <section className="grid grid-cols-2 w-[70%]">
            <aside>
            <ProfileSummaryCard title="Test Name" value={profile?.testName} />
              <ProfileSummaryCard title="Diagnostic User" value={profile?.userName} />
              <ProfileSummaryCard title="User Contact" value={profile?.userId} />
              <ProfileSummaryCard title="Email" value={profile?.email} />
              <ProfileSummaryCard title="Gender" value={profile?.gender} />
              <ProfileSummaryCard title="Dob" value={formatTimeFromDate(profile?.dob)} />
            </aside>
            <aside>
              <ProfileSummaryCard title="File Uploaded" value={profile.reportId?.file?.name} />
              <ProfileSummaryCard title="Pathologist" value={profile.doctorName} />
              <ProfileSummaryCard title="Report Date" value={formatTimeFromDate(profile?.reportDate)} />
              <ProfileSummaryCard title="Status" value={profile.doctorName} />
            </aside>
          </section>
          <Button onClick={handleUpload} >Upload Report</Button>
          {loading && <Spinner />}
        </section>
      </div>
    </section>
  );
};
