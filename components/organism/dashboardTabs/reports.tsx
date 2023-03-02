import { DashboardTable } from '@components/molecules/dashboardItems/data-table'
import { Fragment, useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table';
import { getReports } from 'utils/hook/userDetail';
import { ReportDetails, UserDetails } from '@utils';
import { useAuthContext } from 'utils/context/auth.context';
import { useSelector } from 'react-redux';
import { usePDF } from "@react-pdf/renderer";
import dayjs from 'dayjs';
import { ShareIcon } from '@heroicons/react/20/solid';
import PdfTesting from '@components/molecules/PdfTesting/PdfTesting';
import { RWebShare } from 'react-web-share';
import { ReportTableType } from 'utils/store/types';

export default function ReportsTab() {
  const {user,diagnosticDetails} = useAuthContext()
  const [reportList, setReportList] = useState<ReportDetails[]>([]);

  const columns: ColumnsType<ReportTableType> = [
    {
      title: 'Name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: 'Test Name',
      dataIndex: 'testName',
      sorter: (a, b) => a.testName.length - b.testName.length,
    },
    {
      title: 'Report Date',
      dataIndex: 'reportDate',
      render: ((date:string) => dayjs(date).format("MMM D, YYYY") ),
      sorter: (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime() }
    ,
    {
      title: 'Click to view',
      dataIndex: "status",
      render: ((stat:string,person: any) =>  <>{
        
        stat.toLowerCase() === "parsing" ? (
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
  
  useEffect(() => {
    (async () => {
      const resp = await getReports({"phoneNumber": user?.phoneNumber as string});
      if (resp.status === 200) {
        setReportList(resp.data);
      }
    })();
  }, []);

  return (
    <Fragment>
         <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
            <div className='w-[70vw] bg-white shadow-lg mt-10 h-[70vh] rounded-lg]'>
              <DashboardTable columns={columns} data={reportList}/>
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
  console.log(instance)
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
