import { initialReportFormState } from "utils/types/molecules/forms.interface";
import { GET_REPORT_FORM, SET_REPORT_FORM } from "../types";

//stores all reports created by user
export function reportFormReducer(state = initialReportFormState, action:any) {
    switch (action.type) {
      case GET_REPORT_FORM:
        return {...state};
      case SET_REPORT_FORM:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
  