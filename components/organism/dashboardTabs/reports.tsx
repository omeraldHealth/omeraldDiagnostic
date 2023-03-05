import { DashboardTable } from '@components/molecules/dashboardItems/data-table'
import { Fragment} from 'react'
import { ColumnsType } from 'antd/es/table';
import { ReportDetails, UserDetails } from '@utils';
import { usePDF } from "@react-pdf/renderer";
import dayjs from 'dayjs';
import { ShareIcon } from '@heroicons/react/20/solid';
import PdfTesting from '@components/molecules/PdfTesting/PdfTesting';
import { RWebShare } from 'react-web-share';
import { ReportTableType } from 'utils/store/types';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Spinner } from '@components/atoms/loader';
import {getDiagnosticReports} from "utils/urls/app"

export default function ReportsTab() {
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)

  const fetchReports = async () => {return await axios.get(getDiagnosticReports +diagnosticDetails?.phoneNumber)}
  const {data:reports,isLoading:loading} = useQuery(["reports"],fetchReports)

  const columns: ColumnsType<ReportTableType> = [
    {
      key:"name",
      title: 'Name',
      dataIndex: 'userName',
      // sorter: (a, b) => a.userName.length - b.userName.length,
      // sortDirections: ['descend'],
    },
    {
      key:"email",
      title: 'Email',
      dataIndex: 'email',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.email - b.email,
    },
    {
      key:"testName",
      title: 'Test Name',
      dataIndex: 'testName',
      // sorter: (a, b) => a.testName.length - b.testName.length,
    },
    {
      key:"reportDate",
      title: 'Report Date',
      dataIndex: 'reportDate',
      render: ((date:string) => dayjs(date).format("MMM D, YYYY") ),
      // sorter: (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime() }
    },
    {
      key:"updatedAt",
      title: 'Uploaded Date',
      dataIndex: 'updatedAt',
      render: ((date:string) => dayjs(date).format("MMM D, YYYY") ),
      sorter: (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime() 
    },
    {
      key:"click",
      title: 'Click to view',
      dataIndex: "isManualReport",
      render: ((stat:string,person: any) =>  <>{ 
        !stat ? (
        <a href={person.reportUrl} target="_blank" className="text-orange-700">View˝</a>
      ) : (
        <ViewPdf
          report={person}
          diagnosticDetails={diagnosticDetails as UserDetails}
        />
      )}</>
      ),
    },
    {
      key:"share",
      title: 'Click to Share',
      dataIndex: 'userName',
      render: ((userName:string) => <>
           <RWebShare
                data={{
                            text: `Hi ${userName}! Welcome to Omerald. Please login with us to get your report`,
                            url: "https://omerald.com",
                            title: "Omerald Diagnostic Centre",}}
                onClick={() => console.log("shared successfully!")}>
        <ShareIcon className="text-indigo-600 w-4 h-4 hover:text-indigo-900 active:shadow-lg" />
        </RWebShare>
   </>),
    },
  ];

  return (
    <Fragment>
         <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
            <div className='w-[70vw] bg-white shadow-lg mt-10 h-[70vh] rounded-lg]'> 
              {loading && reports?.data ? <Spinner/> :<DashboardTable columns={columns} data={reports?.data}/> }
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
      View
    </a>
  );
};
