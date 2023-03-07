import DashboardTab from "@components/organism/dashboardTabs/dashboardTab";
import AddReportsTab from "@components/organism/dashboardTabs/addReports";
import ReportsTab from "@components/organism/dashboardTabs/reports";
import DashboardLayout from "@components/organism/layout/dashboardLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestTab from "@components/organism/dashboardTabs/testTab";
import ProfileTab from "@components/organism/dashboardTabs/profileTab";
import SettingsTab from "@components/organism/dashboardTabs/settingsTab";
import { SET_DIAGNOSTIC_DETAILS, SET_REPORT_LIST } from "utils/store/types";
import { useAuthContext } from "utils/context/auth.context";
import { useQuery } from "react-query";
import axios from "axios";
import { getDiagnosticReports, getDiagnosticUserApi } from "@utils";
import AddTestTab from "@components/organism/dashboardTabs/addTest";


export const DashboardTemplate = () => {

  const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)
  const {diagnosticDetails} = useAuthContext()
  const dispatch = useDispatch()
  const fetchDiagnostic = async () => {return await axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)}
  const {data,isLoading} = useQuery(["diagnosticProfile",diagnosticDetails],fetchDiagnostic)
  const fetchReports = async () => {return await axios.get(getDiagnosticReports +diagnosticDetails?.phoneNumber)}
  const [reportList,setReportList] = useState([])
  const {data:reports,isLoading:loading} = useQuery(["reports",reportList],fetchReports)

  const dashboardTabs = {
    "/dashboard":<DashboardTab/>,
    "/reports":<ReportsTab/>,
    "/test":<TestTab/>,
    "/profile":<ProfileTab/>,
    "/settings":<SettingsTab selectedTabId={dashboardRoute.selectedTabIndex} />
  }

  let [component,setComponent] = useState(dashboardTabs["/dashboard"]);
  

  useEffect(() =>{
    console.log("queyr key"+data)
      if(!isLoading && data){
        dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":data.data})
      }
  },[isLoading])

  useEffect(() =>{  
    if(!loading && reports){
      setReportList(reports.data)
      dispatch({"type":SET_REPORT_LIST,"payload":reportList})
    }
},[loading])

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


