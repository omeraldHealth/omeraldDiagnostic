import DashboardTab from "@components/organism/dashboardTabs/dashboardTab";
import AddReportsTab from "@components/organism/dashboardTabs/addReports";
import ReportsTab from "@components/organism/dashboardTabs/reports";
import DashboardLayout from "@components/organism/layout/dashboardLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestTab from "@components/organism/dashboardTabs/testTab";
import ProfileTab from "@components/organism/dashboardTabs/profileTab";
import SettingsTab from "@components/organism/dashboardTabs/settingsTab";
import { Spinner } from "@components/atoms/loader";
import { SET_DASHBOARD_ROUTE } from "utils/store/types";

const dashboardTabs = {
"/dashboard":<DashboardTab/>,
"/addReports":<AddReportsTab/>,
"/reports":<ReportsTab/>,
"/test":<TestTab/>,
"/profile":<ProfileTab/>,
"/settings":<SettingsTab/>
}

export const DashboardTemplate = () => {

  let [component,setComponent] = useState(dashboardTabs["/dashboard"]);
  const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)

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


