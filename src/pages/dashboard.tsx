'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboardLayout';
import { useRecoilValue } from 'recoil';
import { dashTabs } from '@/utils/recoil';
import DashboardTab from '@/components/dashboard';

const Dashboard: React.FC = () => {
  const dashboard = useRecoilValue(dashTabs);

  const DashboardTabsMap: {
    [key: string]: JSX.Element;
  } = {
    Dashboard: <DashboardTab />,
    // "Tests Offered": <TestTab />,
    // "View Reports": <ReportsTab />,
    // Profile: <ProfileTab />,
    // Settings: <SettingsTab />,
  };

  return (
    <DashboardLayout
      tabName="Dashboard"
      tabDescription= "Diagnostic Dashboard"
    >
      {DashboardTabsMap[dashboard]}
    </DashboardLayout>
  );
};

export default Dashboard;
