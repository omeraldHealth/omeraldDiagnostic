import { DashboardTable } from '@components/molecules/dashboardItems/data-table'
import { Fragment, useState} from 'react'
import { ColumnsType } from 'antd/es/table';
import { ReportDetails, UserDetails } from '@utils';
import { usePDF } from "@react-pdf/renderer";
import dayjs from 'dayjs';
import { EyeIcon} from '@heroicons/react/20/solid';
import { ReportTableType } from 'utils/store/types';
import { useSelector } from 'react-redux';
import {getDiagnosticReports, getDiagnosticUserApi} from "utils/urls/app"
import { AddReportComponent } from '@components/molecules/addReport/addReport';
import { FaWhatsapp } from 'react-icons/fa';
import { sendWhatsAppText } from 'utils/hook/userDetail';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { useQueryGetData } from 'utils/reactQuery';
import PdfTesting from '@components/molecules/PdfTesting/PdfTesting';
import { useAuthContext } from 'utils/context/auth.context';
import { saveAs } from 'file-saver';


export default function ReportsTab() {
  const [addReports,setAddReports]=useState(false);
  const {diagnosticDetails,activeBranch} = useAuthContext();
  const {data:reports} = useQueryGetData("getReports",getDiagnosticReports+diagnosticDetails?.phoneNumber)

  let reportsList = reports?.data?.filter((report:any) => report?.branchId === activeBranch?._id)
  const columns: ColumnsType<ReportTableType> = [
    {
      key:"reportId",
      title: 'Report Id',
      dataIndex: 'reportId',
      sorter: (a, b) => a.reportId.length - b.reportId.length,
      // sortDirections: ['descend'],
    },
    {
      key:"name",
      title: 'Name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      // sortDirections: ['descend'],
    },
    {
      key:"email",
      title: 'Email',
      dataIndex: 'email',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.email - b.email,
    },
    {
      key:"userId",
      title: 'Contact',
      dataIndex: 'userId',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      key:"testName",
      title: 'Sample Type',
      dataIndex: 'testName',
      sorter: (a, b) => a.testName.length - b.testName.length,
    },
    {
      key:"reportDate",
      title: 'Report Date',
      dataIndex: 'reportDate',
      render: ((date:string) => dayjs(date).format("MMM D, YYYY, HH:mm:ss") ),
      sorter: (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime(),
      defaultSortOrder: ['ascend']
    },
    // {
    //   key:"updatedAt",
    //   title: 'Uploaded Date',
    //   dataIndex: 'updatedAt',
    //   render: ((date:string) => dayjs(date).format("MMM D, YYYY") ),
    //   sorter: (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime() 
    // },
    // {
    //   key:"click",
    //   title: 'Click to view',
    //   dataIndex: "isManualReport",
    //   render: ((stat:string,person: any) => 
    //   <>
    //   { 
    //     !stat ? (
    //     <a href={person.reportUrl} target="_blank" className="text-orange-700"><EyeIcon className='w-4'/></a>
    //   ) : (
    //     <ViewPdf
    //       report={person}
    //       diagnosticDetails={diagnosticDetails as UserDetails}
    //     />
    //   )}
    //   </>
    //   ),
    // },
    {
      key:"share",
      title: 'Click to Share',
      dataIndex: 'userName',
      render: ((userName:string,record) => <>
      <div className='flex justifty-between align-middle items-center h-[1vh]'>
          <section className='mr-4 '>
            <a href={record.reportUrl} type="application/pdf" download={false} rel="noopener noreferrer" target="_blank" className="text-orange-700"><EyeIcon className='w-4'/></a>
          </section>
          <section className='self-center'>
            <a onClick={()=>{handleWhatsapp(record)}}>
              <FaWhatsapp className='w-6 text-green-700'/>
            </a>
          </section>

      </div>
   </>),
    },
  ];

  const pdfBlob = new Blob(["blob:http://localhost:3000/fc9ff33c-a8c0-414b-b688-4b8db8c762d9"], { type: 'application/pdf' });


  const handleWhatsapp = async (record) => {
    let message = {
      "to":record?.userId,
      "text":`👋 Hi there!,  We hope this message finds you well.${diagnosticDetails?.diagnosticName} has shared your a report with you. 📁Please find the pdf attached, for any questions or concerns, please don't hesitate to reach out to us. 💬\n\n😊Thank you for trusting us with your healthcare needs. \n\nOmerald HealthCare🙌`,
      "pdfUrl": record?.reportUrl
    }

    let resp = await sendWhatsAppText(message);
    if(resp.status===200){
      successAlert("Report Shared on Whatsapp");
    }else{
      errorAlert("Error Sharing report")
    }
  }

  return (
    <Fragment>
        <span className='flex justify-end mt-8 mb-4 mr-32'>
          {!addReports ? 
            <button onClick={()=>setAddReports(!addReports)} className='bg-blue-500 text-white text-bold font-light rounded-md p-2'>Add Reports</button>:
           <button onClick={()=>setAddReports(!addReports)} className='bg-green-800 text-white text-bold font-light rounded-md p-2'>View Reports</button>}
        </span> 
         <div className="px-4 sm:px-6 xl:px-8 xl:py-3 bg-signBanner flex w-100 justify-center">
            <div className='w-[70vw] bg-white shadow-lg h-[70vh] rounded-lg p-4'> 
            {!addReports ?  
            <>{<DashboardTable pageSize={7} columns={columns} data={reportsList}/> }</>:<AddReportComponent setAddReports={setAddReports}/>}
            </div>
        </div>
    </Fragment>   
  )
}

const ViewPdf = ({
  report,
  diagnosticDetails,
}: {
  report: ReportDetails;
  diagnosticDetails: UserDetails;
}) => {
  const [instance, updateInstance] = usePDF({
    document: (
      <PdfTesting report={report} diagnosticDetails={diagnosticDetails} />
    ),
  });

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  return (
    <a
      href={instance.url as string}

      target={"_blank"}
      // download={`${report.userName}-${report.testName}.pdf`}
      className="text-indigo-600 hover:text-indigo-900"
    >
      <EyeIcon className='w-4'/>
    </a>
  );
};

