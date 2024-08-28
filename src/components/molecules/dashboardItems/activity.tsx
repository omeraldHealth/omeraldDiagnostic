import { UserCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileState } from "../../common/recoil/profile";
import { useCurrentBranchValue } from "@components/common/constants/recoilValues";
import { dashTabs } from "@components/common/recoil/dashboard";
import { settingTabState } from "@components/common/recoil/settings";
import { usePersistedBranchState } from "@components/common/recoil/hooks/usePersistedState";
import { useGetDcBranch } from "@utils/reactQuery";
import { Loader } from "@components/atoms/loader/loader";

interface DashActivityProps {}

const DashActivity: React.FC<DashActivityProps> = () => {
  const [activities, setActivities] = useState();
  const [selectedBranch] = usePersistedBranchState()
  const { data: branchData, isLoading, refetch } = useGetDcBranch({ selectedBranchId: selectedBranch })

  useEffect(() => {
    refetch()
  },[])
  
  useEffect(() => {
    if (!isLoading && branchData?.data) {
       const sortedActivities = [...branchData?.data?.activities].sort(
          // @ts-ignore
          (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime),
       );
       setActivities(sortedActivities)
    }
  }, [isLoading])
  
  // const currentBranch = useCurrentBranchValue();
  // // @ts-ignore
  // const activities = currentBranch && currentBranch?.activities;

  // const sortedActivities = [...activities].sort(
  //   // @ts-ignore
  //   (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime),
  // );

  
  return (
    <section className="w-[94vw] sm:w-[60vw] lg:w-[35vw] xl:w-[30vw] h-[100%] shadow-xl bg-white rounded-sm px-4 py-2 mb-10 sm:mb-0">
      <section className="">
        <p>Recent Activities</p>
        <p className="text-xs text-gray-400 font-light">
          Summary of the latest updated activities
        </p>
      </section>
      <section className="max-h-[35vh] overflow-auto my-4 sm:my-2">
        {activities?.length  > 0 ? (
          <ActivityItem activityList={activities} />
        ) : (
          <p className="text-light text-sm text-gray-600 mt-8">
            No Activities....
          </p>
        )}
      </section>
    </section>
  );
};

interface ActivityItemProps {
  activityList: any;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activityList }) => {
  const date = Date.now();
  const setDashTab = useSetRecoilState(dashTabs);
  const setActiveKey = useSetRecoilState(settingTabState);
  const sortedActivities = [...activityList].sort(
    // @ts-ignore
    (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime),
  );

  return (
    <section>
      {sortedActivities.map((activity, index) => {
        return (
          <section key={index} className="my-3 flex justify-between ">
            <span className="text-xs flex">
              <UserCircleIcon className="w-8 h-8 self-center bg-blue-700 text-white rounded-full mr-2" />
              <span>
                <p className="text-light text-gray-600 mt-1">
                  <span className="font-bold">{activity?.user?.userName} </span>
                  {activity.activity}
                </p>
                {activity?.updatedTime ? (
                  <span>
                    {moment
                      .utc(DateConverter(activity.updatedTime))
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </span>
                ) : (
                  <span>
                    {moment
                      .utc(DateConverter(date.toString()))
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </span>
                )}
              </span>
            </span>
          </section>
        );
      })}
      <a
        onClick={() => {
          setDashTab("Settings");
          setActiveKey("2");
        }}
        href="#"
        className="font-light text-xs text-blue-700"
      >
        Read More....
      </a>
    </section>
  );
};

const DateConverter = (dateString: string): Date => {
  const date = new Date(dateString);
  return date;
};

export default DashActivity;
