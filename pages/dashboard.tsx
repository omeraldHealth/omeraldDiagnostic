import { DashboardLayout } from '../components/organism/layout/dashboardLayout';
import { UserLayout } from '../components/templates/pageTemplate';
import { dashTabs } from '../components/common/recoil/dashboard';
import { useRecoilValue } from 'recoil';
import { Spinner } from '@components/atoms/loader';
import dynamic from 'next/dynamic';

// Dynamic import 
const ReportsTab = dynamic(() => import('@components/organism/dashboardTabs/reportsTab'), { loading:() => <Spinner /> });
const ProfileTab = dynamic(() => import('@components/organism/dashboardTabs/profileTab'), { loading:() => <Spinner /> });
const DashboardTab = dynamic(() => import('@components/organism/dashboardTabs/dashboardTab'), { loading:() => <Spinner /> });
const TestTab = dynamic(() => import('@components/organism/dashboardTabs/testTab').then((res) => res.default), { loading:() => <Spinner /> });
const SettingsTab = dynamic(() => import('@components/organism/dashboardTabs/settingsTab').then((res) => res.default), { loading:() => <Spinner /> });

// Define a map of Dashboard tabs
const DashboardTabsMap: {
  [key: string]: JSX.Element; // Define the key as string
} = {
  "Dashboard": <DashboardTab />,
  "Tests Offered": <TestTab />,
  "View Reports": <ReportsTab />,
  "Profile": <ProfileTab />,
  "Settings": <SettingsTab />,
};

export default function Dashboard() {
  // Get the selected dashboard tab from Recoil state
  const dashboard = useRecoilValue(dashTabs);

  return (
    <UserLayout tabName={`Admin Omerald | ${dashboard}`} tabDescription="Omerald is a health management platform to connect people and doctors with ease.">
      {/* Render the selected dashboard tab inside DashboardLayout */}
      <DashboardLayout>{DashboardTabsMap[dashboard]}</DashboardLayout>
    </UserLayout>
  );
}
