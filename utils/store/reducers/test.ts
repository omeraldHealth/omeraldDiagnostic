import {GET_REPORT,GET_TEST,SET_REPORT, SET_TEST} from "utils/store/types"
import { ReportDetails } from "utils/types/molecules/users.interface";

const report = {

}

export function testReducer(state = report, action:any) {
    switch (action.type) {
      case GET_TEST:
        return {...state};
      case SET_TEST:
        return {...state, ...action.payload };
      default:
        return state;
    }
}
  