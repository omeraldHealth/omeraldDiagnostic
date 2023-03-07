import {GET_DIAGNOSTIC_DETAILS,SET_DIAGNOSTIC_DETAILS} from "utils/store/types"

const diagnosticState = {
  tests: [],
  sharedReport: [],
  phoneNumber: "",
  diagnosticName: "",
  email: "",
  brandDetails: [
      {
          facebookUrl: "",
          instaUrl: "",
          brandLogo: ""
      }
  ],
  managersDetail: [
      {
          managerName: "",
          managerRole: "",
          managerContact: ""
      }
  ],
  activities: []
}

export function diagnosticReducer(state = diagnosticState, action:any) {
    switch (action.type) {
      case GET_DIAGNOSTIC_DETAILS:
        return {...state};
      case SET_DIAGNOSTIC_DETAILS:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
  