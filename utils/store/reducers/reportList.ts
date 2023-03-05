import {SET_REPORT_LIST,GET_REPORT_LIST} from "utils/store/types"
import { ReportDetails } from "utils/types/molecules/users.interface";

const report:ReportDetails[] = []

export function reportListReducer(state = report, action:any) {
    switch (action.type) {
      case GET_REPORT_LIST:
        return {...state};
      case SET_REPORT_LIST:
        return [ ...state, ...action.payload ];
      default:
        return state;
    }
}
  