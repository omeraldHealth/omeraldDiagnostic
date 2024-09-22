import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { branchState, settingTabState } from '@/utils/recoil';
import { usePersistedBranchState } from '@/hooks/localstorage';
import { useGetDcBranch } from '@/utils/query/getQueries';
import { Billing } from './billing';
import { Activity } from './activity';
import { EmployeesTab } from './employee';
import BranchTab from './branch';
import PathologistTab from './pathologist';

const SettingsTabLayout = () => {
  const [activeKey, setActiveKey] = useRecoilState(settingTabState);
  const [selectedBranch] = usePersistedBranchState();
  const setCurrentBranch = useSetRecoilState(branchState);
  const {
    data: branchData,
    isLoading,
    refetch,
  } = useGetDcBranch({ selectedBranchId: selectedBranch });

  // useEffect(() => {
  //   // @ts-ignore
  //   if (branchData && !isLoading) setCurrentBranch(branchData?.data);
  // }, [branchData]);

  useEffect(() => {
    // refetch();
  }, []);

  const tabItems = [
    { key: '1', label: 'Billing', children: <Billing /> },
    { key: '2', label: 'Activity', children: <Activity /> },
    { key: '3', label: 'Employee Management', children: <EmployeesTab /> },
    { key: '4', label: 'Branch Management', children: <BranchTab /> },
    { key: '5', label: 'Pathologist Management', children: <PathologistTab /> },
  ];

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 w-full mt-4 min-h-[40vh]">
        <Tabs
          defaultActiveKey={activeKey}
          items={tabItems}
          onChange={setActiveKey}
        />
      </div>
    </div>
  );
};

export default SettingsTabLayout;
