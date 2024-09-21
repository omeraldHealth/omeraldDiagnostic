// @ts-nocheck
import { usePersistedBranchState } from "@/hooks/localstorage";
import { useGetDcBranch } from "@/utils/query/getQueries";
import { dashTabs } from "@/utils/recoil";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Empty, Skeleton } from "antd";

interface DashActivityProps {}

const DashActivity: React.FC<DashActivityProps> = () => {
  const [activities, setActivities] = useState([]);
  const [selectedBranch] = usePersistedBranchState();
  const { data: branchData, isLoading, refetch } = useGetDcBranch({
    selectedBranchId: selectedBranch,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!isLoading && branchData?.data) {
      const sortedActivities = [...branchData?.data?.activities].sort(
        // @ts-ignore
        (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime)
      );
      setActivities(sortedActivities);
    }
  }, [isLoading]);

  return (
    <section className="w-[94vw] sm:w-[60vw] lg:w-[35vw] xl:w-[30vw] h-[100%] shadow-xl bg-white rounded-md p-6">
      <header className="mb-4">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <p className="text-sm text-gray-400">Summary of the latest activities</p>
      </header>
      <section className="max-h-[35vh] overflow-auto">
        {isLoading ? (
          <Skeleton active />
        ) : activities?.length > 0 ? (
          <ActivityItem activityList={activities} />
        ) : (
          <Empty description="No Activities" />
        )}
      </section>
    </section>
  );
};

interface ActivityItemProps {
  activityList: any;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activityList }) => {
  const setDashTab = useSetRecoilState(dashTabs);
  const sortedActivities = [...activityList].sort(
    // @ts-ignore
    (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime)
  );

  return (
    <section>
      {sortedActivities.map((activity, index) => (
        <section key={index} className="my-4 flex justify-between items-start">
          <span className="flex items-start">
            <UserOutlined className="text-2xl text-blue-700 mr-3" />
            <span>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{activity?.user?.userName}</span> {activity.activity}
              </p>
              <p className="text-xs text-gray-400">
                {moment.utc(activity?.updatedTime || new Date()).local().fromNow()}
              </p>
            </span>
          </span>
        </section>
      ))}
      <a
        onClick={() => setDashTab("Settings")}
        href="#"
        className="font-light text-sm text-blue-700 mt-4 block text-center"
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
