import {SET_REPORT_TYPE,GET_REPORT_TYPE,SET_REPORT} from "utils/store/types"

//stores all reports created by user
export function reportTypeReducer(state = [], action:any) {
    switch (action.type) {
      case GET_REPORT_TYPE:
        return {...state};
      case SET_REPORT_TYPE:
        return [ ...state, ...action.payload ];
      default:
        return state;
    }
}
  