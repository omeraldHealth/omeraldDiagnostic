import { errorAlert, successAlert, warningAlert } from '@components/atoms/alerts/alert';
import { Spinner } from '@components/atoms/loader';
import { useReportValue } from '@components/common/constants/constants';
import { reportState } from '@components/common/recoil/report';
import { uploadDiagnosticReportApi } from '@utils';
import { Card, Typography, Space, Tag, Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useCreateReport, useUpdateEmployee } from 'utils/reactQuery';

const { Title, Text } = Typography;

export const ReportSummary = ({handleSuccess, report, style }: any) => {

  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
         <ReportSummaryComp profile={report} style={style} handleSuccess={handleSuccess} />
      </div>
    </section>
  );
};

const ProfileSummaryCard = ({ title, value, link }: any) => {
  return (
    <div className="mb-6">
      { !link && <p className="font-bold text-sm">{title}: <span className="text-black font-light">{value}</span></p>}
      {link && (
        <p className="text-blue-800 font-bold text-sm">
          {title} URL: <a href={link} className="text-blue-900 font-light">{link}</a>
        </p>
      )}
    </div>
  );
};

const ReportSummaryComp = ({ profile, style, handleSuccess }: any) => {
  const [loading,setLoading] = useState(false)
  const [reportValue,setReportState] = useRecoilState(reportState)
  const [imageUrl, setImageUrl ] = useState()

  const formatDate = (date:any) => {
    const reportDate = new Date(date);
    return reportDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  const updateDiagnostic = useCreateReport({
    onSuccess: (data) => {
      successAlert("Report added sucessfully")
      setReportState(data?.data);
      handleSuccess()
    },
    onError: (error) => {
      errorAlert("Error creating report")
    },
  });

  const handleUpload = async (data: any) => {

    const file = reportValue?.reportId?.file;
    setLoading(true)
    if (file && file.originFileObj) {

      warningAlert("Uploading File, please wait");
      const formData = new FormData();
      formData.append('file', file.originFileObj);
    
      // Assuming uploadReportApi is your API endpoint
     let resp = await axios.post(uploadDiagnosticReportApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(resp)
      if(resp?.status === 200){
        setLoading(false);
        successAlert("Uploaded file successfully")
        setReportState({...reportValue,reportUrl:resp?.url})
        setLoading(false)
        warningAlert("Saving report")
      }

      const newUuid = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(value => value.toString(16).padStart(2, '0')).join('');

      const newProp = {
        reportUrl: resp?.data?.url,
        reportId: newUuid
      };
      
      let x = { ...reportValue, ...newProp };

      updateDiagnostic.mutate(x)
      setLoading(false);
    } else {
      // Handle the case where file or originFileObj is undefined
      console.error("File or originFileObj is undefined.");
      setLoading(false);
    }
  };

  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
        <section>
          {/* <img src={profile?.brandDetails?.brandLogo?.[0]?.thumbUrl } alt="logo" className='w-[5vw] rounded-full border-2' /> */}
          <section className="grid grid-cols-2 w-[70%]">
            <aside>
              <ProfileSummaryCard title="Diagnostic User" value={profile?.userName} />
              <ProfileSummaryCard title="User Contact" value={profile?.userId} />
              <ProfileSummaryCard title="Email" value={profile?.email} />
              <ProfileSummaryCard title="Gender" value={profile?.gender} />
              <ProfileSummaryCard title="Dob" value={formatDate(profile?.dob)} />
            </aside>
            <aside>
              <ProfileSummaryCard title="File Uploaded" value={profile.reportId?.file?.name} />
              <ProfileSummaryCard title="Pathologist" value={profile.doctorName} />
              <ProfileSummaryCard title="Report Date" value={formatDate(profile?.reportDate)} />
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