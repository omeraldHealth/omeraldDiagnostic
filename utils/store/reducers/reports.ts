import {GET_REPORT,SET_REPORT} from "utils/store/types"
import { initialReportState } from "utils/types/molecules/forms.interface";

//stores all reports created by user
export function reportReducer(state = initialReportState, action:any) {
    switch (action.type) {
      case GET_REPORT:
        return {...state};
      case SET_REPORT:
        return [ ...state, ...action.payload ];
      default:
        return state;
    }
}
  