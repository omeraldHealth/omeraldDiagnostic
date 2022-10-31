import { ReportDetails, UserDetails } from "middleware/models.interface";
import dayjs from "dayjs";
import Router, { useRouter } from "next/router";
import { ShareIcon } from "@heroicons/react/20/solid";
import { RWebShare } from "react-web-share";
import Link from "next/link";
import { usePDF } from "@react-pdf/renderer";
import PdfTesting from "../PdfTesting/PdfTesting";
import { useAuth } from "@/lib/auth";

type ReportTableProps = {
  reports: ReportDetails[];
  onSelectReport: (val: string) => void;
};

export default function ReportsTable({
  reports,
  onSelectReport,
}: ReportTableProps) {
  const router = useRouter();
  const { user, diagnosticDetails } = useAuth();

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
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Test Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Report Date
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Click to View</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Click to Share</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reports.map((person) => (
                    <tr key={person.reportId}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.userName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.testName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {dayjs(person.reportDate).format("MMM D, YYYY")}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <ViewPdf
                          report={person}
                          diagnosticDetails={diagnosticDetails as UserDetails}
                        />
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {/* <button
                          // onClick={() => onSelectReport(person.reportId)}
                          className="text-indigo-600 hover:text-indigo-900"
                        > */}
                        <RWebShare
                          data={{
                            text: `Hi ${person.userName}! Welcome to Omerald. Please login with us to get your report`,
                            url: "https://omerald.com",
                            title: "Omerald Diagnostic Centre",
                          }}
                          onClick={() => console.log("shared successfully!")}
                        >
                          <ShareIcon className="text-indigo-600 w-4 h-4 hover:text-indigo-900 active:shadow-lg" />
                        </RWebShare>
                        {/* <span className="sr-only">, {person.userName}</span>
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
