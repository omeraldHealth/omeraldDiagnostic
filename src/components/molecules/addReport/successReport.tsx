import React from "react";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { successUpload } from "@utils/index";
import { useProfileValue } from "@components/common/constants/recoilValues";

interface SuccessReportProps {
  setAddReports: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export const SuccessReport: React.FC<SuccessReportProps> = ({
  setAddReports,
  refetch,
}) => {
  const profileValue = useProfileValue();

  const handleViewReport = () => {
    refetch();
    if (profileValue) {
      setAddReports(false);
    }
  };

  return (
    <div>
      <section className="w-[40vh] h-auto xl:h-[40vh] m-auto xl:mt-4">
        <img
          src={successUpload}
          alt="success-upload"
          className="w-40 xl:my-4 mx-auto mt-8"
        />
        <div className="my-8 text-gray-500 flex justify-center items-center">
          <CheckBadgeIcon className="w-10 text-green-800" />
          <span className="ml-2 mt-2">Report Generated successfully</span>
        </div>
        <a onClick={handleViewReport}>
          <button
            type="button"
            name="View Report"
            className="block w-[220px] m-auto bg-green-800 text-white p-2 text-sm rounded-md"
          >
            View Report
          </button>
        </a>
      </section>
    </div>
  );
};
