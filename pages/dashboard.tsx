import { DashboardLayout } from '../components/organism/layout/dashboardLayout';
import { UserLayout } from '../components/templates/pageTemplate';
import { dashTabs } from '../components/common/recoil/dashboard';
import { useRecoilValue } from 'recoil';
import { LoadableComponent } from 'utils/common/loadbale';

// Loadable components with the improved loading approach
const ReportsTab = LoadableComponent(() => import('@components/organism/dashboardTabs/reportsTab'));
const ProfileTab = LoadableComponent(() => import('@components/organism/dashboardTabs/profileTab'));
const DashboardTab = LoadableComponent(() => import('@components/organism/dashboardTabs/dashboardTab'));
const TestTab = LoadableComponent(() => import('@components/organism/dashboardTabs/testTab').then((res) => res.TestTab));
const SettingsTab = LoadableComponent(() => import('@components/organism/dashboardTabs/settingsTab').then((res) => res.SettingsTab));

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
