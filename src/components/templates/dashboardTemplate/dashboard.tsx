import { DashboardLayout } from "@components/organism/layout/dashboardLayout";
import { dashTabs } from "components/common/recoil/dashboard/index";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import { UserLayout } from "../pageTemplate";

// Dynamic imports with loading spinner
const DashboardTab = dynamic(() => import('@components/organism/dashboardTabs/dashboardTab'), { ssr: false });
const ReportsTab = dynamic(() => import('@components/organism/dashboardTabs/reportsTab'), { ssr: false });
const ProfileTab = dynamic(() => import('@components/organism/dashboardTabs/profileTab'), { ssr: false });
const SettingsTab = dynamic(() => import('@components/organism/dashboardTabs/settingsTab'), { ssr: false });
const TestTab = dynamic(() => import('@components/organism/dashboardTabs/testTab'), { ssr: false });

// Mapping of dashboard tabs to their respective components
const DashboardTabs: Record<string, JSX.Element> = {
  Dashboard: <DashboardTab />,
  Tests: <TestTab />,
  Reports: <ReportsTab />,
  Settings: <ProfileTab />,
  Vaccines: <SettingsTab />,
};

/**
 * DashboardTemplate component renders the appropriate dashboard tab based on the selected tab from Recoil state.
 */
export const DashboardTemplate = () => {
  const selectedDashboardTab = useRecoilValue(dashTabs);

  return (
    <UserLayout tabName={`Admin Diagnostic | ${selectedDashboardTab}`} tabDescription="Omerald is a health management platform to connect people and doctors with ease.">
      {/* Dashboard layout with selected tab content */}
      <DashboardLayout>{DashboardTabs[selectedDashboardTab]}</DashboardLayout>
    </UserLayout>
  );
};

