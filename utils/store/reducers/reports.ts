import {GET_REPORT,SET_REPORT} from "utils/store/types"
import { ReportDetails } from "utils/types/molecules/users.interface";

const report:ReportDetails[] = []

export function reportReducer(state = report, action:any) {
    switch (action.type) {
      case GET_REPORT:
        return {...state};
      case SET_REPORT:
        return [ ...state, ...action.payload ];
      default:
        return state;
    }
}
  