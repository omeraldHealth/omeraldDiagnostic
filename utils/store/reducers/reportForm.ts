import {GET_DASHBOARD_ROUTE,SET_DASHBOARD_ROUTE} from "utils/store/types"
import { ReportDetails, UserDetails } from "utils/types/molecules/users.interface";

const reportInitial:ReportDetails =  { 
    //@ts-ignore
    dob: "",
    email: "",
    gender: "",
    userId: "",
     //@ts-ignore
    createdAt: "",
     //@ts-ignore
    updatedAt: "",
    userName: "",
    testName: "",
     //@ts-ignore
    reportDate: "",
    reportId: "",
    reportUrl: "",
    doctorName: "",
    isManualReport: false,
    //@ts-ignore
    status: "parsing",
    //@ts-ignore
    parsedData: []
}

export function reportFormReducer(state = reportInitial, action:any) {
    switch (action.type) {
      case "GET_REPORT_FORM":
        return {...state};
      case "SET_REPORT_FORM":
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
  