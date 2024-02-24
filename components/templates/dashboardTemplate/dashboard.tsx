import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "./dashboard.module.css"
import { Spinner } from "@components/atoms/loader";
import { UserLayout } from "../pageTemplate";
import { useRecoilValue } from "recoil";
import {dashTabs} from "components/common/recoil/dashboard/index"

const DashboardTab = dynamic(() => import('@components/organism/dashboardTabs/dashboardTab'),{ssr:false})
const TestTab = dynamic(() => import('@components/organism/dashboardTabs/testTab'),{ssr:false})
const ReportsTab = dynamic(() => import('@components/organism/dashboardTabs/reportsTab'),{ssr:false})
const ProfileTab = dynamic(() => import('@components/organism/dashboardTabs/profileTab'),{ssr:false})
const SettingsTab = dynamic(() => import('@components/organism/dashboardTabs/settingsTab'),{ssr:false})

const Dashboard_Tabs = {
  Dashboard: <DashboardTab />,
  Tests: <TestTab />,
  Reports: <ReportsTab />,
  Settings: <ProfileTab />,
  Vaccines: <SettingsTab />,
};


const DashboardTemplate = () => {
  const dashboard = useRecoilValue(dashTabs)

  return (
    <UserLayout tabName={`Admin Omerald | ${dashboard}`} tabDescription="Omerald is a health management platform to connect people and doctors with ease.">
      <DashboardLayout>{Dashboard_Tabs[dashboard]}</DashboardLayout>
    </UserLayout>
  )
};

export default DashboardTemplate