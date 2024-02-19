import dynamic from 'next/dynamic'
import { UserLayout } from '../components/templates/pageTemplate'
import { useRecoilValue } from 'recoil'
import { dashTabs } from '../components/common/recoil/dashboard'
import { DashboardLayout } from '../components/organism/layout/dashboardLayout'
import { Spinner } from '@components/atoms/loader'

const DashboardTab = dynamic(() => import('@components/organism/dashboardTabs/dashboardTab'),{ssr:false})
const TestTab = dynamic(() => import('@components/organism/dashboardTabs/testTab').then(res=>res.TestTab),{loading:()=><Spinner/>})
const ReportsTab = dynamic(() => import('@components/organism/dashboardTabs/reportsTab'),{ssr:false})
const ProfileTab = dynamic(() => import('@components/organism/dashboardTabs/profileTab'),{ssr:false})
const SettingsTab = dynamic(() => import('@components/organism/dashboardTabs/settingsTab'),{ssr:false})

const Dashboard_Tabs = {
  "Dashboard": <DashboardTab />,
  "Tests Offered": <TestTab />,
  "View Reports": <ReportsTab />,
  "Profile": <ProfileTab />,
  "Settings": <SettingsTab />,
};

export default function Dashboard() {

  const dashboard = useRecoilValue(dashTabs)
  
  return (
    <UserLayout tabName={`Admin Omerald | ${dashboard}`} tabDescription="Omerald is a health management platform to connect people and doctors with ease.">
      <DashboardLayout>{Dashboard_Tabs[dashboard]}</DashboardLayout>
    </UserLayout>
  )
}
