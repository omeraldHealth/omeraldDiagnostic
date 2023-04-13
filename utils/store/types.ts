export const GET_DIAGNOSTIC_DETAILS = 'GET_DIAGNOSTIC_DETAILS';
export const SET_DIAGNOSTIC_DETAILS = 'SET_DIAGNOSTIC_DETAILS';

export const GET_DASHBOARD_ROUTE = 'GET_DASHBOARD_ROUTE';
export const SET_DASHBOARD_ROUTE = 'SET_DASHBOARD_ROUTE';

export const SET_REPORT = 'SET_REPORT'
export const GET_REPORT = 'GET_REPORT'

export const SET_REPORT_TYPE = 'SET_REPORT_TYPE'
export const GET_REPORT_TYPE = 'GET_REPORT_TYPE'

export const SET_REPORT_LIST = 'SET_REPORT_LIST'
export const GET_REPORT_LIST = 'GET_REPORT_LIST'

export const SET_TEST = 'SET_TEST'
export const GET_TEST = 'GET_TEST'

export const GET_REPORT_FORM = 'GET_REPORT_FORM'
export const SET_REPORT_FORM = 'SET_REPORT_FORM'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

export type LoginReducer = {isLoggedIn: false, user: null, error: null}
export type rootReducerType = {"loginReducer":LoginReducer}

export interface ReportTableType {
    key: React.Key;
    userName: string;
    email: number;
    testName: string;
    reportDate: Date;
    status: string;
}

export interface phoneNumberType  {
    isPhoneNumberDisabled: boolean | undefined,
    phoneNumber: string,
    handleDisable?: ()=>{},
    setPhoneNumber: (phone:string) => void
  }
  export interface otpInputType  {
    otp: string,
    setOtp: (phone:string) => void
  }

export interface DataType {
  key: string;
  testName: string;
  sampleType: SampleType;
}

export interface SampleType {
  sampleName: string,
  keywords: any[];
}