import { ReportDetails, UserDetails } from "middleware/models.interface";
import dayjs from "dayjs";
import Router, { useRouter } from "next/router";
import { ShareIcon } from "@heroicons/react/20/solid";
import { RWebShare } from "react-web-share";
import Link from "next/link";
import { usePDF } from "@react-pdf/renderer";
import PdfTesting from "../PdfTesting/PdfTesting";
import { useAuth } from "@/lib/auth";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";

type ReportTableProps = {
  reports: ReportDetails[];
  onSelectReport: (val: string) => void;
};

interface DataType {
  key: React.Key;
  userName: string;
  email: number;
  testName: string;
  reportDate: Date;
  status: string;
}

export default function ReportsTable({
  reports,
  onSelectReport,
}: ReportTableProps) {
  const router = useRouter();
  const { user, diagnosticDetails } = useAuth();
  
  
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns: ColumnsType<DataType> = [
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
      render: ((stat:string,person: any) =>  <>{stat.toLowerCase() === "parsing" ? (
        "Parsing..."
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
  
  const data = reports;
  
  const handleOnClick = () => {
    router.push("/addReports");
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            List of Reports
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the reports in your account including their name,
            email, booking date etc.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={handleOnClick}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Reports
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
      download={`${report.userName}-${report.testName}.pdf`}
      className="text-indigo-600 hover:text-indigo-900"
    >
      View
    </a>
  );
};
