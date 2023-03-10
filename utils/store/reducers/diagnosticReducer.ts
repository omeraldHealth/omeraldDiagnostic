import {GET_DIAGNOSTIC_DETAILS,SET_DIAGNOSTIC_DETAILS} from "utils/store/types"
import { intialDiagnosticState } from "utils/types/molecules/forms.interface";

//stores all diagnostic profile created by user
export function diagnosticReducer(state = intialDiagnosticState, action:any) {
    switch (action.type) {
      case GET_DIAGNOSTIC_DETAILS:
        return {...state};
      case SET_DIAGNOSTIC_DETAILS:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
  