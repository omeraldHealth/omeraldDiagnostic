import {GET_DASHBOARD_ROUTE,SET_DASHBOARD_ROUTE} from "utils/store/types"

const dashbordRoute =  { name: "Dashboard", href: "/dashboard", loading:false}

export function dashboardReducer(state = dashbordRoute, action:any) {
    switch (action.type) {
      case GET_DASHBOARD_ROUTE:
        return {...state};
      case SET_DASHBOARD_ROUTE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
  