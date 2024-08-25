import { DashboardLayout } from "../components/organism/layout/dashboardLayout";
import { UserLayout } from "../components/templates/pageTemplate";
import { dashTabs } from "../components/common/recoil/dashboard";
import { useRecoilValue } from "recoil";
import { Spinner } from "@components/atoms/loader";
import dynamic from "next/dynamic";

const ReportsTab = dynamic(
  () => import("@components/organism/dashboardTabs/reports/index"),
  { loading: () => <Spinner /> },
);
const ProfileTab = dynamic(
  () => import("@components/organism/dashboardTabs/profile/index"),
  { loading: () => <Spinner /> },
);
const DashboardTab = dynamic(
  () => import("@components/organism/dashboardTabs/dashboardTab"),
  { loading: () => <Spinner /> },
);
const TestTab = dynamic(
  () =>
    import("@components/organism/dashboardTabs/tests/index").then(
      (res) => res.default,
    ),
  { loading: () => <Spinner /> },
);
const SettingsTab = dynamic(
  () =>
    import("@components/organism/layout/settingsLayout").then(
      (res) => res.default,
    ),
  { loading: () => <Spinner /> },
);

const DashboardTabsMap: {
  [key: string]: JSX.Element;
} = {
  Dashboard: <DashboardTab />,
  "Tests Offered": <TestTab />,
  "View Reports": <ReportsTab />,
  Profile: <ProfileTab />,
  Settings: <SettingsTab />,
};

export default function Dashboard() {
  const dashboard = useRecoilValue(dashTabs);

  return (
    <UserLayout
      tabName={`Admin Diagnostic | ${dashboard}`}
      tabDescription="Omerald is a health management platform to connect people and doctors with ease."
    >
    <DashboardLayout>{DashboardTabsMap[dashboard]}</DashboardLayout>
    </UserLayout>
  );
}
