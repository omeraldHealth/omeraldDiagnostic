import DashboardLayout from "@components/organism/layout/dashboardLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import "./dashboard.module.css"

const DashboardTab = dynamic(() => import('@components/organism/dashboardTabs/dashboardTab'))
const TestTab = dynamic(() => import('@components/organism/dashboardTabs/testTab'))
const ReportsTab = dynamic(() => import('@components/organism/dashboardTabs/reportsTab'))
const ProfileTab = dynamic(() => import('@components/organism/dashboardTabs/profileTab'))
const SettingsTab = dynamic(() => import('@components/organism/dashboardTabs/settingsTab'))

const DashboardTemplate = () => {
  const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)
  const dashboardTabs = {
    "/dashboard":<DashboardTab/>,
    "/reports":<ReportsTab/>,
    "/test":<TestTab/>,
    "/profile":<ProfileTab/>,
    "/settings":<SettingsTab selectedTabId={dashboardRoute.selectedTabIndex} />
  }
  let [component,setComponent] = useState(dashboardTabs["/dashboard"]);
    
  useEffect(()=>{
    //@ts-ignore
    setComponent(dashboardTabs[dashboardRoute.href])
  },[dashboardRoute])

  return (
    <div className="w-{100vw} h-[100vh] flex justify-start bg-gray-100">
      <DashboardLayout>
        {component}
      </DashboardLayout>
    </div>
  )
};;

export default DashboardTemplate