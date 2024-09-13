import { Tabs } from "antd";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function SettingsTabLayout() {
  const [activeKey, setActiveKey] = useRecoilState(settingTabState);
  const [selectedBranch] = usePersistedBranchState();
  const setCurrentBranch = useSetRecoilState(branchState);
  const {
    data: branchData,
    isLoading,
    refetch,
  } = useGetDcBranch({ selectedBranchId: selectedBranch });
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  useEffect(() => {
    if (branchData && !isLoading) {
      setCurrentBranch(branchData?.data);
    }
  }, [branchData]);

  useEffect(() => {
    refetch();
  }, []);

  const items = [
    {
      key: "1",
      label: "Billing",
      children: <Billing />,
    },
    {
      key: "2",
      label: "Activity",
      children: <Activity />,
    },
    {
      key: "3",
      label: "Employee Management",
      children: <EmployeesTab />,
    },
    {
      key: "4",
      label: "Branch Management",
      children: <BranchTab />,
    },
    {
      key: "5",
      label: "Pathologist Management",
      children: <PathologistTab />,
    },
  ];

  return (
    <div className="justify-center flex">
      <div className="bg-white p-8 w-full mt-4 min-h-[80vh]">
        <Tabs
          defaultActiveKey={activeKey}
          items={items}
          onChange={handleTabChange}
        />
      </div>
    </div>
  );
}