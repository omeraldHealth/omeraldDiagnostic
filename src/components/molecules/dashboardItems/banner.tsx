import { dashboardBanner } from "@utils/index";
import React from "react";
import {
  useCurrentBranchValue,
  useUserValues,
} from "@components/common/constants/recoilValues";

interface DashBannerProps {}

const DashBanner: React.FC<DashBannerProps> = () => {
  const user = useUserValues();
  const currentBranch = useCurrentBranchValue();

  return (
    <section className="relative">
      <img
        src={dashboardBanner}
        className="w-[100%] h-[20vh] sm:h-[18vh]"
        alt="dashboard-banner"
      />
      <p className="absolute top-5 left-[25%] xl:left-80 font-light text-white">
        Welcome {user?.userName || ""}!
      </p>
      <p className="absolute top-14 left-[25%] xl:left-80 font-light text-[10px] sm:text-xs xl:text-sm text-gray-300">
        You have uploaded{" "}
        <span className="text-orange-400">
          {currentBranch?.reports?.length || 0} report
        </span>{" "}
        till date, please use our add reports section to share more reports
        <br /> with your patients directly. Also, a total of{" "}
        <span className="text-orange-400">
          {currentBranch?.tests?.length || 0} tests{" "}
        </span>{" "}
        are offered; please add more using the tests offered section.
      </p>
    </section>
  );
};

export default DashBanner;
